import { NextResponse } from 'next/server';
import { RunService } from "@/_services/run";
import { getServerSession } from 'next-auth';

export async function PUT(request: Request) {
  try {
    const user = await getServerSession();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, content, approved, challengeId } = body;

    const run = await RunService.updateRun(id, {
      userId: user.user.id,
      content,
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
