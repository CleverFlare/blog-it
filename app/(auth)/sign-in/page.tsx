import Container from "@/components/container";
import Form from "./form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authConfig);
  if (session) return redirect("/");
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Container className="flex flex-col justify-center items-center">
        <Form />
      </Container>
    </main>
  );
}
