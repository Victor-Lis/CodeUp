"use client";

import TestCaseHeader from "@/modules/test-case/test-header";
import TestCaseTable from "@/modules/test-case/table";

export default function AdminTestCasePage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <TestCaseHeader />
      <TestCaseTable />
    </div>
  );
}
