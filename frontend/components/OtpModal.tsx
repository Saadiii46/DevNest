"use client";

import { verifyUserSecret } from "@/app/server-actions/users";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const styles = {
  alertContent:
    "bg-white/10 border border-white/20 backdrop-blur-lg shadow-xl rounded-2xl px-6 py-8 transition-all duration-500 ease-in-out",
  inputOtp:
    "w-12 h-12 text-xl text-white bg-white/20 border-white/30 rounded-xl mx-1 focus:ring-2 focus:ring-white/60 transition-all duration-300 ease-in-out hover:scale-105 max-[459px]:text-lg max-[459px]:w-10 max-[459px]:h-10 max-[417px]:text-md max-[417px]:w-8 max-[417px]:h-8 max-[354px]:w-7 max-[354px]:h-7 max-[354]:text-sm",
  errorOtp:
    "w-12 h-12 text-xl text-white bg-white/20 border-red-600 rounded-xl mx-1 focus:ring-2 focus:ring-white/60 transition-all duration-300 ease-in-out hover:scale-105",
};

const OtpModal = ({
  email,
  accountId,
}: {
  email: string;
  accountId: string;
}) => {
  const [open, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [otpError, setOtpError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const sessionId = await verifyUserSecret({
        accountId,
        password,
      });

      if (sessionId) router.push("/");
    } catch (error) {
      setOtpError("Failed to verify");
      console.error("Failed to submit OTP", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent className={styles.alertContent}>
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
          <AlertDialogDescription className="text-center text-white/80 mt-2 max-[425px]:text-[12px] max-sm:text-center">
            We&apos;ve sent a code to{" "}
            <span className="font-medium text-white max-[425px]:text-[12px]">
              {email}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-center mt-6">
          <div className={otpError ? "border border-red-500 rounded-xl" : ""}>
            <InputOTP maxLength={6} value={password} onChange={setPassword}>
              <InputOTPGroup>
                {[0, 1, 2].map((i) => (
                  <InputOTPSlot key={i} index={i} className={styles.inputOtp} />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {[3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} className={styles.inputOtp} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
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
