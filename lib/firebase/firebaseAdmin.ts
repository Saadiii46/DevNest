// lib/firebaseAdmin.ts
"use server";

import * as admin from "firebase-admin";

let app: admin.app.App | null = null;

export function initAdmin() {
  if (!admin.apps.length) {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } else {
    app = admin.app(); // use existing app
  }

  return app;
}
