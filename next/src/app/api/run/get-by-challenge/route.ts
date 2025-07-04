import { NextResponse } from "next/server";
import { RunService } from "@/_services/run";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const user = await getServerSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const challengeId = parseInt(url.searchParams.get("challengeId") || "", 10);

    const runs = await RunService.getRunsByChallengeId(challengeId);

    if (!runs) {
      return NextResponse.json({ error: "No runs found" }, { status: 404 });
    }

    return NextResponse.json({ runs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during run retrieval" },
      { status: 500 }
    );
  }
}