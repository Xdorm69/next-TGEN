import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/MongoDB/db";
import { signupSchema } from "@/lib/validator/auth";
import { User } from "@/MongoDB/models/user.model";


export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const data = signupSchema.parse(body);

    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json({ errors: err.errors }, { status: 400 });
    }

    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
