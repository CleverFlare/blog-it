import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  const { firstName, lastName, email, password } = await req.json();

  const doesUserExit = await db.user.findUnique({ where: { email } });

  if (doesUserExit)
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );

  const saltPassword = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, saltPassword);

  const user = await db.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    },
    select: {
      email: true,
      id: true,
      image: true,
      name: true,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
