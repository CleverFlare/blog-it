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
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";

interface FormProps {}

const formSchema = z.object({
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
});

export default function Form({}: FormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error === "CredentialsSignin")
          toast({
            title: "Credentials Error",
            description: "Email or password are not correct",
            variant: "destructive",
          });
        else router.push("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <FormWrapper {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 max-w-[350px] w-screen"
      >
        <Logo />
        <div>
          <h1 className="pb-2 text-3xl font-semibold tracking-tight transition-colors scroll-m-20">
            Welcome to BlogIt
          </h1>
          <p className="text-sm text-muted-foreground">
            enter your email to login to your account
          </p>
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
        <p className="text-sm text-muted-foreground">
          You don&apos;t already have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <Button className="w-full" disabled={loading}>
          {loading && (
            <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin me-2" />
          )}
          Proceed
        </Button>
        <div className="flex items-center w-full">
          <Separator className="flex-1" />
          <p className="mx-4 text-sm text-muted-foreground">
            or use a provider
          </p>
          <Separator className="flex-1" />
        </div>
        <GoogleAuthButton />
        <DiscordAuthButton />
      </form>
    </FormWrapper>
  );
}
