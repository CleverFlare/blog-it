import Container from "@/components/container";
import Form from "./form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authConfig);
  if (session) return redirect("/");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Container className="flex flex-col items-center justify-center">
        <Form />
      </Container>
    </main>
  );
}
