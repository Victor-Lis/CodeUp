import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { TestCaseService } from "@/_services/test-case";
import { authOptions } from "@/lib/auth";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.token.user.role || session.token.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    console.log("Deleting test case with ID:", id);

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
