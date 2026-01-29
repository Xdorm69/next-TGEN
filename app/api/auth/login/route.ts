import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/MongoDB/db";
import { loginSchema } from "@/lib/validator/auth";
import { User } from "@/MongoDB/models/user.model";
import { signToken } from "@/lib/jwt";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const data = loginSchema.parse(body);

    const user = await User.findOne({ email: data.email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 🔐 Create JWT
    const token = signToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    // 🍪 Set cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
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
