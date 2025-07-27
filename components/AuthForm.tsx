"use client";

// Imports

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OtpModal from "./OtpModal";
import { Mail, User, ArrowRight, Network } from "lucide-react";
import { createUserAccount, signInUsers } from "@/app/server-actions/users";

// Form Type

type FormType = "sign-up" | "sign-in";

// Define schema based on type

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z
      .string()
      .nonempty()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

// Auth Form Function

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  const [accountId, setAccountId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  // On Submit Handler

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Check If Type Is Sign Up Then Create Account Else Sign In User

      const user =
        type === "sign-up"
          ? await createUserAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUsers({
              email: values.email,
            });

      setAccountId(user.accountId);
    } catch (error) {
      console.log("Failed to create account", error);
      throw new Error("Failed to create account");
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
                        placeholder="Enter your email"
                        className="auth-input"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="auth-submit-btn">
              {type === "sign-up" ? "Create Account" : "Sign In"}
              <ArrowRight size={18} />
            </Button>
          </form>
        </Form>

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

      {/* OTP Modal */}
      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </div>
  );
};

export default AuthForm;
