import BlogCard from "@/components/blogCard";

import { loginIsRequiredServer } from "@/lib/auth";

export default async function Page() {
  await loginIsRequiredServer();
  return (
    <main className="flex flex-col gap-1 h-full">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <BlogCard
              key={index}
              thumbnail="/thumbnail.jpg"
              href="/something"
              user={{
                name: "Muhammad Maher",
                image:
                  "https://cdn.discordapp.com/avatars/930580557878947911/e8ad4a23a091e813cc4b4bec52c20806.png",
              }}
              title="How powerful ultra instinct is?"
              date="4 days ago"
              reads={50000}
            />
          ))}
      </div>
    </main>
  );
}
