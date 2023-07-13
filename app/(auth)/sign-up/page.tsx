import Container from "@/components/container";
import Form from "./form";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Container>
        <Form />
      </Container>
    </main>
  );
}
