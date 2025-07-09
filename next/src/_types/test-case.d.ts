interface TestCaseType {
  id: number;

  input: string;

  expectedOutput: string;

  challengeId: number;

  createdAt: Date;
}

interface CreateTestCaseType {
  input: string;

  expectedOutput: string;

  challengeId: number;
}