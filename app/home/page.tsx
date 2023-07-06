import SignOutButton from "@/components/signOutButton";
import { loginIsRequiredServer } from "@/lib/auth";

export default async function Page() {
  await loginIsRequiredServer();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      Hello World
      <SignOutButton />
    </main>
  );
}
