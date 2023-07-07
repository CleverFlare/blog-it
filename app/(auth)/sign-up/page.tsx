import Container from "@/components/container";
import Form from "./form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Container>
        <Form />
      </Container>
    </main>
  );
}
