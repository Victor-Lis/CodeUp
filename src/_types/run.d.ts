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
  fileUrl: string;
  challengeId: number;
  userId: string;
}