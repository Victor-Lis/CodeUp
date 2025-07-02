import { NextResponse } from "next/server";
import { RunService } from "@/_services/run";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const user = await getServerSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get("id") || "", 10);

    const run = await RunService.getRunById(id);

    if (!run) {
      return NextResponse.json({ error: "Run not found" }, { status: 404 });
    }

    return NextResponse.json({ run }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during run retrieval" },
      { status: 500 }
    );
  }
}