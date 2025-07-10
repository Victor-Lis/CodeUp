import { Table } from "@/components/ui/table";
import TestCaseTableHeader from "./table-header";
import { TestCaseTableBody } from "./table-body";

export default function TestCaseTable() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TestCaseTableHeader />
        <TestCaseTableBody />
      </Table>
    </div>
  );
}
