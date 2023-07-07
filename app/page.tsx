import SignOutButton from "@/components/signOutButton";
import { authConfig, loginIsRequiredServer } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-1">
      <img
        src={
          session?.user?.image ||
          "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
        }
        alt="profile picture"
        className="rounded-full mb-4 w-[100px] h-[100px]"
      />
      <p>{session?.user?.name}</p>
      <p className="text-sm text-muted-foreground mb-4">
        {session?.user?.email}
      </p>
      <SignOutButton />
    </main>
  );
}
