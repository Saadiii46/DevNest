import { R2 } from "@/lib/cloudfare/r2";
import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import admin from "firebase-admin";

export async function POST(req: Request) {
  try {
    // Parse form data from the request
    const formData = await req.formData();

    // Extract the file and userId from the form data
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    // If no file provided return the error response
    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    // Convert the file to a buffer for uploading
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Creating a unique file name to prevent conflicts
    const fileName = `${Date.now()}-${file.name}`;

    // Upload the file to cloudfare R2
    await R2.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // Public URL of the uploaded files
    const fileUrl = `https://${process.env.CLOUDFLARE_BUCKET_PUBLIC_URL}/${fileName}`;

    // Saving file metadata to the database
    await adminDb.collection("files").add({
      userId,
      fileName,
      fileUrl,
      contentType: file.type,
      size: file.size,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Returning success response
    return NextResponse.json({
      success: true,
      messages: "File uploaded successfully",
      url: fileUrl,
    });
  } catch (error) {
    console.log("Uploading error", error);
    return NextResponse.json(
      { success: false, error: "Error while uploading the file" },
      { status: 500 }
    );
  }
}
