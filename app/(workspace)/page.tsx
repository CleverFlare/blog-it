// import BlogCard from "@/components/blogCard";

import { loginIsRequiredServer } from "@/lib/auth";

export default async function Page() {
  await loginIsRequiredServer();
  return (
    <main className="flex flex-col gap-1 h-full">
      {/* <div className="grid grid-cols-3 gap-2">
        <BlogCard thumbnail="" />
      </div> */}
    </main>
  );
}
