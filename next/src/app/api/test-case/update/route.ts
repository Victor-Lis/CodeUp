import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { TestCaseService } from "@/_services/test-case";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.token.user.role || session.token.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const challengeId = parseInt(url.searchParams.get("challengeId") || "", 10);
    const id = parseInt(url.searchParams.get("id") || "", 10);

    const body = await request.json();
    const { input, expectedOutput } = body;

    if (!challengeId || isNaN(challengeId) || !id || isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid or missing challengeId or id" },
        { status: 400 }
      );
    }

    if (!input || !expectedOutput) {
      return NextResponse.json(
        { error: "Input and expectedOutput are required" },
        { status: 400 }
      );
    }

    const testCase = await TestCaseService.updateTestCase(id, {
      challengeId,
      expectedOutput,
      input,
    });

    return NextResponse.json(
      { message: "Test case updated successfully", testCase },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during test case update" },
      { status: 500 }
    );
  }
}
