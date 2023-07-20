import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { User } from "@prisma/client";

interface BlogCardProps {
  thumbnail: string;
  href: string;
  user: any;
  title: string;
  date: string;
  reads: number;
}

export default function BlogCard({
  thumbnail,
  href,
  user,
  title,
  date,
  reads,
}: BlogCardProps) {
  return (
    <Link href={href} className="flex flex-col gap-2">
      <Image
        src={thumbnail}
        alt="Blog Card"
        width={2000}
        height={1000}
        className="rounded-lg"
      />
      <div className="flex gap-2">
        <div className="flex flex-col">
          <Avatar>
            <AvatarImage
              src={user?.image || undefined}
              alt={user?.name || undefined}
            />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <p className="className">{title}</p>
          <p className="text-sm text-muted-foreground">{user?.name}</p>
          <p className="text-sm text-muted-foreground">
            {reads} reads . {date}
          </p>
        </div>
      </div>
    </Link>
  );
}
