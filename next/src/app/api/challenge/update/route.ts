import { NextResponse } from "next/server";
import { ChallengeService } from "@/_services/challenge";
import { getServerSession } from "next-auth";

export async function PUT(request: Request) {
  try {
    const user = await getServerSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id") || "", 10);

    const body = await request.json();
    const { fileUrl } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields [id]" },
        { status: 400 }
      );
    }

    const challenge = await ChallengeService.updateChallenge(id, {
      fileUrl,
    });

    return NextResponse.json(
      { message: "Challenge updated successfully", challenge },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during challenge update" },
      { status: 500 }
    );
  }
}
