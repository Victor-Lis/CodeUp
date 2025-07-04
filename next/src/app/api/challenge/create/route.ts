import { NextResponse } from "next/server";
import { ChallengeService } from "@/_services/challenge";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const user = await getServerSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fileUrl, bucketPath } = body;

    const challenge = await ChallengeService.createChallenge({
      fileUrl,
      bucketPath,
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
