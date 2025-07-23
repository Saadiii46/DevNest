"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
      <AlertDialogContent className="alert-dialogue-content">
        <AlertDialogHeader>
          <AlertDialogTitle className="alert-dialogue-title">
            Enter your OTP
            <Image
              src="/assets/icons/close.png"
              alt="close"
              width={25}
              height={25}
              onClick={() => setIsOpen(false)}
              className="otp-close"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-white/80 mt-2">
            We&apos;ve sent a code to{" "}
            <span className="font-medium text-white">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-center mt-6">
          <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup>
              {[0, 1, 2].map((i) => (
                <InputOTPSlot key={i} index={i} className="-input-otp" />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {[3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} className="input-otp" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <AlertDialogFooter className="mt-6">
          <AlertDialogAction onClick={handleSubmit} className="otp-submit">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
