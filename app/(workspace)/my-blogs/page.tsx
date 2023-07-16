import { loginIsRequiredServer } from "@/lib/auth";

export default async function Page() {
  await loginIsRequiredServer();
  return <></>;
}
