interface RunType {
  id: number;

  approved: boolean;

  fileUrl: string;

  challengeId: number;
  userId: string;
  
  updatedAt: Date;
  createdAt: Date;
}

interface CreateRunType {
  file: File;
  challengeId: number;
  approved?: boolean;
}