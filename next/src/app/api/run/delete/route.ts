import { NextResponse } from 'next/server';
import { RunService } from "@/_services/run";
import { getServerSession } from 'next-auth';

export async function DELETE(request: Request) {
  try {
    const user = await getServerSession();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id } = body;

    const run = await RunService.deleteRun(id);

    return NextResponse.json(
      { message: "Run deleted successfully", run },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during run deletion" },
      { status: 500 }
    );
  }
}
