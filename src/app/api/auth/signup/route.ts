import { NextResponse } from 'next/server';
import { AuthService } from "@/_services/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { credential, password } = body;

    console.log("Sign-up request received:", { credential, password });

    const user = await AuthService.createUser({ credential, password });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during sign-up" },
      { status: 500 }
    );
  }
}