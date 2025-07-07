"use client";

import ChallengeHeader from "@/modules/challenge/header";
import ChallengeTable from "@/modules/challenge/table";

export default function AdminChallengesPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <ChallengeHeader />
      <ChallengeTable />
    </div>
  );
}
