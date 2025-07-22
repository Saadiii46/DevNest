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
      <AlertDialogContent className="bg-white/10 border border-white/20 backdrop-blur-lg shadow-xl rounded-2xl px-6 py-8 transition-all duration-500 ease-in-out">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center text-white text-2xl font-semibold">
            Enter your OTP
            <Image
              src="/assets/icons/close.png"
              alt="close"
              width={25}
              height={25}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform duration-300"
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
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-12 h-12 text-xl text-white bg-white/20 border-white/30 rounded-xl mx-1 focus:ring-2 focus:ring-white/60 transition-all duration-300 ease-in-out hover:scale-105"
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {[3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-12 h-12 text-xl text-white bg-white/20 border-white/30 rounded-xl mx-1 focus:ring-2 focus:ring-white/60 transition-all duration-300 ease-in-out hover:scale-105"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <AlertDialogFooter className="mt-6">
          <AlertDialogAction
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl transition-all duration-500 hover:opacity-90 hover:shadow-lg"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
