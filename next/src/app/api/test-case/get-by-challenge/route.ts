import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { TestCaseService } from "@/_services/test-case";

export async function GET(request: Request) {
  try {
    const userSession = await getServerSession();
    if (
      !userSession ||
      !userSession.token ||
      !userSession.token.user ||
      !userSession.token.user.email
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id") || "", 10);

    const testCases = await TestCaseService.getTestCasesByChallengeId(id);

    if (!testCases) {
      return NextResponse.json(
        { error: "No test cases found" },
        { status: 404 }
      );
    }

    return NextResponse.json(testCases, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during challenge retrieval" },
      { status: 500 }
    );
  }
}
