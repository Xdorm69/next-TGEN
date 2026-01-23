"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/Wrappers/MaxWidthWrapper";
import { loginSchema } from "@/lib/validator/auth";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/urlUtils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type LoginSchema = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/login`, data, {withCredentials: true});
      toast.success("User logged in successfully");
      router.push("/test");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="heading text-center">Login to TGEN</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              Login
            </Button>
          </form>
        </Form>

        <Link href="/signup" className="font-mono text-sm text-blue-500">
          Don't have an account? Sign up
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default LoginPage;
