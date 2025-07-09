import { NextResponse } from "next/server";
import { ChallengeService } from "@/_services/challenge";
import { getServerSession } from "next-auth";
import { AuthService } from "@/_services/auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.token.user.role || session.token.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fileUrl } = body;

    const challenge = await ChallengeService.createChallenge({
      fileUrl,
    });

    return NextResponse.json(
      { message: "Challenge created successfully", challenge },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during challenge creation" },
      { status: 500 }
    );
  }
}
