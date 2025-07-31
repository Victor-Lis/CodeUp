interface ChallengeType {
  id: number;

  fileUrl: string;

  createdAt: Date;
  updatedAt: Date;

  run: RunType | null;
  runs: RunType[] | undefined;

  testCases: TestCaseType[];
}

interface CreateChallengeType {
  file: File;
}

// model Challenge {
//   id         Int      @id @default(autoincrement())
  
//   fileUrl       String   
//   bucketPath    String

//   createdAt     DateTime @default(now())

//   runs         Run[]

//   @@map("challenges")
// }