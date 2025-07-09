import { NextResponse } from "next/server";
import { ChallengeService } from "@/_services/challenge";
import { getServerSession } from "next-auth";
import { TestCaseService } from "@/_services/test-case";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.token.user.role || session.token.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    const testCase = await TestCaseService.deleteTestCase(id);

    return NextResponse.json(
      { message: "Test case deleted successfully", testCase },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during test case deletion" },
      { status: 500 }
    );
  }
}
