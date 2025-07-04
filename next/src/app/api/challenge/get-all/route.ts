import { NextResponse } from "next/server";
import { ChallengeService } from "@/_services/challenge";
import { getServerSession } from "next-auth";
import { AuthService } from "@/_services/auth";

export async function GET(request: Request) {
  try {
    const userSession = await getServerSession();
    if (!userSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await AuthService.getUserByCredential(userSession.user.email);

    const challenges = await ChallengeService.getChallenges(user.id);

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