"use client";

import { Button } from "@/components/ui/button";
import {
  Form as FormWrapper,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import GoogleAuthButton from "@/components/googleAuthButton";
import DiscordAuthButton from "@/components/discordAuthButton";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/lib/db";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormProps {}

const formSchema = z
  .object({
    firstName: z.string().nonempty("this field is required"),
    lastName: z.string().nonempty("this field is required"),
    email: z
      .string()
      .nonempty("this field is required")
      .email("invaild email address"),
    password: z
      .string()
      .nonempty("this field is required")
      .min(8, "at least 8 characters long")
      .regex(/[A-Z]{1,}/g, "must contain at least one capital letter")
      .regex(
        /(~|`|!| |@|#|\$|%|\^|&|\*|\(|\)|_|-|\+|=|\{|\[|\}|\]|\||\\|:|;|"|'|<|,|>|\.|\?|\/){1,}/g,
        "must contain at least one symbol"
      ),
    confirmPassword: z
      .string()
      .nonempty("this field is required")
      .min(8, "at least 8 characters long")
      .regex(/[A-Z]{1,}/g, "must contain at least one capital letter")
      .regex(
        /(~|`|!| |@|#|\$|%|\^|&|\*|\(|\)|_|-|\+|=|\{|\[|\}|\]|\||\\|:|;|"|'|<|,|>|\.|\?|\/){1,}/g,
        "must contain at least one symbol"
      ),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "passwords don't match",
    path: ["confirmPassword"],
  });

export default function Form({}: FormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await axios.post("/api/auth/register", {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });

    if (res.status > 299 || res.status < 200) throw Error(res.data.message);

    router.push("/sign-in");
  }

  return (
    <FormWrapper {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 max-w-[350px] w-screen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
        </svg>
        <div>
          <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
            Welcome to BlogIt
          </h1>
          <p className="text-muted-foreground text-sm">
            fill in the following fields to register
          </p>
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel aria-required>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="first name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel aria-required>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="last name..." autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={loading}>
          {loading && (
            <AiOutlineLoading3Quarters className="me-2 w-4 h-4 animate-spin" />
          )}
          Register
        </Button>
      </form>
    </FormWrapper>
  );
}
