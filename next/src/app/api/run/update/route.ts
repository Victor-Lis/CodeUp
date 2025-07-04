import { NextResponse } from "next/server";
import { RunService } from "@/_services/run";
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
    const { fileUrl, approved, challengeId } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields [id]" },
        { status: 400 }
      );
    }

    const run = await RunService.updateRun(id, {
      userId: user.user.id,
      fileUrl,
      approved,
      challengeId,
    });

    return NextResponse.json(
      { message: "Run updated successfully", run },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during run update" },
      { status: 500 }
    );
  }
}
