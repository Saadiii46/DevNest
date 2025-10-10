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
import { signInUsers, signInWithGoogle } from "@/lib/firebase/users";

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
import AppAlert from "./AppAlert";

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

  const [appAlert, setAppAlert] = useState(false);
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
        setAppAlert(true);
        return;
      }

      router.push("/");
    } catch (error) {
      console.log("Failed to sign in or create account", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const signInUser = await signInWithGoogle();

      if (!signInUser) throw new Error("Failed to sign in with google");

      router.push("/");
    } catch (error) {
      console.log("Error: ", error);
    }
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

                  {form.formState.errors.password && (
                    <FormMessage>
                      {form.formState.errors.password.message as string}
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
              <span className="px-3 text-gray-500 text-sm">
                or continue with
              </span>
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

                {type === "sign-up"
                  ? "Sign up with Google"
                  : "Sign in with Google"}
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
        <AppAlert
          open={appAlert}
          onOpenChange={setAppAlert}
          title="Something went wrong"
          description={errorMessage}
        />
      </div>

      {/** Loader */}
      {isLoading && <Loader isLoading={isLoading} />}
    </div>
  );
};

export default AuthForm;
