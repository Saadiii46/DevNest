"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifySecret } from "@/lib/actions/user.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OtpModal = ({
  email,
  accountId,
}: {
  email: string;
  accountId: string;
}) => {
  const [open, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const sessionId = await verifySecret({
        accountId,
        password,
      });

      if (sessionId) router.push("/");
    } catch (error) {
      console.error("Failed to submit OTP", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center">
            Enter your OTP
            <Image
              src="/assets/icons/close.png"
              alt="close"
              width={25}
              height={25}
              onClick={() => setIsOpen(false)}
              className="top-4 right-4 absolute cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="flex items-center justify-center">
            We&apos;ve sent a code to <span>{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center">
          <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <AlertDialogFooter>
          <div className="flex items-center justify-center w-full">
            <AlertDialogAction onClick={handleSubmit} className="w-full">
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
