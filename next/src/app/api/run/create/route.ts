import { NextResponse } from "next/server";
import { RunService } from "@/_services/run";
import { getServerSession } from "next-auth";
import { AuthService } from "@/_services/auth";

export async function POST(request: Request) {
  try {
    const userSession = await getServerSession();
    if (!userSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await AuthService.getUserByCredential(userSession.user.email);

    const body = await request.json();
    const { challengeId, fileUrl } = body;

    if (!user?.id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const run = await RunService.createRun({
      challengeId,
      fileUrl,
      userId: user.id,
    });

    return NextResponse.json(
      { message: "Run created successfully", run },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during run creation" },
      { status: 500 }
    );
  }
}
