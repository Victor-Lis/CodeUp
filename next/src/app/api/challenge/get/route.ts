import { NextResponse } from "next/server";
import { ChallengeService } from "@/_services/challenge";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const user = await getServerSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id") || "", 10);

    const challenge = await ChallengeService.getChallengeById(id);

    if (!challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    return NextResponse.json({ challenge }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during challenge retrieval" },
      { status: 500 }
    );
  }
}