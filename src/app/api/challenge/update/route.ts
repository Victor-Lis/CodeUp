import { NextResponse } from 'next/server';
import { ChallengeService } from "@/_services/challenge";
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
    const { id, fileUrl, bucketPath } = body;

    const challenge = await ChallengeService.updateChallenge(id, {
      fileUrl,
      bucketPath
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
