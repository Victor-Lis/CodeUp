import { NextResponse } from "next/server";
import { ChallengeService } from "@/_services/challenge";
import { getServerSession } from "next-auth";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.token.user.role || session.token.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    const challenge = await ChallengeService.deleteChallenge(id);

    return NextResponse.json(
      { message: "Challenge deleted successfully", challenge },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during challenge deletion" },
      { status: 500 }
    );
  }
}
