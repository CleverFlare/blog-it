"use client";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { FaDiscord, FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("this field is required")
    .email("invaild email address"),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("email", {
      email: values.email,
      callbackUrl: "/home",
    });
  }

  function onGoogleClick() {
    signIn("google", {
      callbackUrl: "/home",
    });
  }

  function onFacebookClick() {
    signIn("discord", {
      callbackUrl: "/home",
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Container className="flex flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-[350px]"
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
            <h1 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
              Welcome to BlogIt
            </h1>
            <p className="text-muted-foreground text-sm">
              enter your email to login to your account
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel aria-required>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the email you'll use to login
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Proceed</Button>
            <div className="flex items-center w-full">
              <Separator className="flex-1" />
              <p className="mx-4">or use a provider</p>
              <Separator className="flex-1" />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onGoogleClick}
            >
              <FaGoogle className="me-2 w-4 h-4" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onFacebookClick}
            >
              <FaDiscord className="me-2 w-4 h-4" />
              Discord
            </Button>
          </form>
        </Form>
      </Container>
    </main>
  );
}
