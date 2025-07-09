import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { TestCaseService } from "@/_services/test-case";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.token.user.role || session.token.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const challengeId = parseInt(url.searchParams.get("challengeId") || "", 10);

    const body = await request.json();
    const { input, expectedOutput } = body;

    if (!challengeId || isNaN(challengeId)) {
      return NextResponse.json(
        { error: "Invalid or missing challengeId" },
        { status: 400 }
      );
    }

    if (!input || !expectedOutput) {
      return NextResponse.json(
        { error: "Input and expectedOutput are required" },
        { status: 400 }
      );
    }

    const testCase = await TestCaseService.createTestCase({
      challengeId,
      expectedOutput,
      input,
    });

    return NextResponse.json(
      { message: "Test case created successfully", testCase },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during test case creation" },
      { status: 500 }
    );
  }
}
