"use client";
import { AlertCircle, ArrowLeft, Mail, X } from "lucide-react";
import { useRouter } from "next/navigation";

const styles = {
  main: "fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50",
  background:
    "bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white border-opacity-20 p-8 text-center relative",
  cancelBtn:
    "absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors",
  iconDiv:
    "w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6",
  actionBtn:
    "w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center",
  createAccountBtn:
    "w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200",
};

interface Props {
  errorDialogue?: boolean;
  setErrorDialogue: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail?: string;
}

export const AlertDialogue = ({
  errorDialogue,
  setErrorDialogue,
  userEmail,
}: Props) => {
  const router = useRouter();

  if (!errorDialogue) return null;

  return (
    // Modal overlay with glassmorphism effect
    <div className={styles.main}>
      <div className="w-full max-w-md">
        <div className={styles.background}>
          {/* Close button */}
          <button
            onClick={() => setErrorDialogue(false)}
            className={styles.cancelBtn}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className={styles.iconDiv}>
            <AlertCircle className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Account Not Found
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mb-8">
            We couldn't find an account with that email address
          </p>

          {/* Email input (readonly/display) */}
          <div className="mb-6">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email Address
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="w-full px-4 py-3 border border-red-200 rounded-xl bg-red-50 text-gray-700">
              {userEmail}
            </div>
            <p className="text-sm text-red-600 mt-2 text-left max-[354]:text-[12px]">
              No account found with this email address
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setErrorDialogue(false)}
              className={styles.actionBtn}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try Different Email
            </button>

            <button
              onClick={() => router.push("/sign-up")}
              className={styles.createAccountBtn}
            >
              Create New Account
            </button>
          </div>

          {/* Security indicators */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Secure</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Encrypted</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Protected</span>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="text-center mt-4 text-gray-300 text-sm">
          Need help? Contact Support
        </div>
      </div>
    </div>
  );
};
