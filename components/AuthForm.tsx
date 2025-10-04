"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User, ArrowRight, Network, Lock } from "lucide-react";
import Link from "next/link";
import { AlertDialogue } from "@/components/auth-form/AlertDialogue";
import { signInUsers } from "@/lib/firebase/users";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Loader } from "./Loader";
import { signUpUsers } from "@/lib/firebase/users";
import { useRouter } from "next/navigation";

// ------ Form Type ------ //

type FormType = "sign-up" | "sign-in";

// ------ Define schema based on type ------ //

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .nonempty()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty(),
    fullName:
      formType === "sign-up"
        ? z.string().min(1, "Full name is required").max(50)
        : z.string().optional(),
  });
};

// ------ Auth Form Function ------ //

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type); // Setting the type of form

  // Use states

  const [accountId, setAccountId] = useState<string | null>(null); // Use state to handle user's account Id
  const [errorDialogue, setErrorDialogue] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // ------ On Submit Handler ------ //

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Check If Type Is Sign Up Then Create Account Else Sign In User

      const user =
        type === "sign-up"
          ? await signUpUsers({
              fullName: values.fullName || "",
              email: values.email,
              password: values.password,
            })
          : await signInUsers({
              email: values.email,
              password: values.password,
            });

      if (!user.success) {
        setErrorMessage(user.error || "");
      }

      console.log("User:", user);

      router.push("/");
    } catch (error) {
      console.log("Failed to sign in or create account", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Google Sign-In clicked");
  
  };
  
  const handleMicrosoftSignIn = async () => {
    console.log("Microsoft Sign-In clicked");
    
  };
  
  return (
    <div className="auth-main">
      {/* Soft blurry gradient circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="auth-blur-one"></div>
        <div className="auth-blur-two"></div>
      </div>

      <div className="header-main">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="auth-network-icon">
            <Network size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {type === "sign-up" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-600">
            {type === "sign-up"
              ? "Join us and start your journey today"
              : "Sign in to continue to your account"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name (only for sign-up) */}
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="auth-form-label">
                      <User size={16} className="text-gray-500" />
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="auth-input"
                        />
                      </div>
                    </FormControl>
                    {form.formState.errors.fullName && (
                      <FormMessage>
                        {form.formState.errors.fullName.message as string}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            )}

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="auth-form-label">
                    <Mail size={16} className="text-gray-500" />
                    Email Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="auth-input"
                      />
                    </div>
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message as string}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/** Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="auth-form-label">
                    <Lock size={16} className="text-gray-500" />
                    Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="auth-input"
                      />
                    </div>
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message as string}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="auth-submit-btn">
  {type === "sign-up" ? "Create Account" : "Sign In"}
  <ArrowRight size={18} />
</Button>

{/* Divider */}
<div className="flex items-center my-6">
  <div className="flex-grow h-px bg-gray-300"></div>
  <span className="px-3 text-gray-500 text-sm">or continue with</span>
  <div className="flex-grow h-px bg-gray-300"></div>
</div>

{/* Social Login Buttons */}
<div className="flex flex-col gap-3">
  {/* Google Button */}
  <button
    type="button"
    onClick={handleGoogleSignIn}
    className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
  >
    <img
      src="https://www.svgrepo.com/show/355037/google.svg"
      alt="Google"
      className="w-5 h-5"
    />
  
  {type === "sign-up" ? "Sign up with Google" : "Sign in with Google"}</button>

  {/* Microsoft Button */}
  <button
    type="button"
    onClick={handleMicrosoftSignIn}
    className="flex items-center justify-center gap-3 bg-[#2F2F2F] text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-[#1e1e1e] transition-all duration-300"
  >
    <img
      src="data:image/jpeg;base64,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"
      alt=""
      className="w-6 h-6 bg-white rounded-sm"
    />
 
  {type === "sign-up" ? "Sign up with Microsoft" : "Sign in with Microsoft"}
  </button>
</div>

          </form>
        </Form>

        <div>
          {type === "sign-up" ? (
            <div className="text-center mt-2 text-gray-600 text-md max-sm:text-sm">
              {" "}
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-blue-500 font-semibold max-sm:text-sm"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <div className="text-center mt-2 text-gray-600 text-md max-sm:text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-blue-500 font-semibold max-sm:text-sm"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Secure</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Encrypted</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Protected</span>
          </div>
        </div>
      </div>

      <div>
        <AlertDialogue
          errorDialogue={errorDialogue}
          setErrorDialogue={setErrorDialogue}
          userEmail={email}
        />
      </div>
      {/** Loader */}
      {isLoading && <Loader isLoading={isLoading} />}
    </div>
  );
};

export default AuthForm;
