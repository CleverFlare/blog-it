import Layout from "@/components/layout";
import AuthSessionProvider from "@/components/uthSessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSessionProvider>
      <Layout>{children}</Layout>
    </AuthSessionProvider>
  );
}
