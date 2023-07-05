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
import { FaFacebook, FaGoogle } from "react-icons/fa6";

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
    console.log(values);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Container className="flex flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-[350px]"
          >
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
            <Separator />
            <Button type="button" variant="outline" className="w-full">
              <FaGoogle className="me-2" />
              Google
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <FaFacebook className="me-2" />
              Facebook
            </Button>
          </form>
        </Form>
      </Container>
    </main>
  );
}
