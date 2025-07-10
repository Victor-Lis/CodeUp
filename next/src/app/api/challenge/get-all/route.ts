import { NextResponse } from "next/server";
import { ChallengeService } from "@/_services/challenge";
import { getServerSession } from "next-auth";
import { AuthService } from "@/_services/auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session)

    if (
      !session ||
      !session.token ||
      !session.token.user ||
      !session.token.user.email
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.token.user;

    const challenges = await ChallengeService.getChallenges(user.email as string);

    if (!challenges) {
      return NextResponse.json({ error: "No challenges found" }, { status: 404 });
    }

    return NextResponse.json(challenges, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during challenge retrieval" },
      { status: 500 }
    );
  }
}