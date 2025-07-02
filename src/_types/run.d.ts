interface RunType {
  id: number;

  approved: boolean;

  content: string;

  challengeId: number;
  userId: string;
  
  updatedAt: Date;
  createdAt: Date;
}

interface CreateRunType {
  content: string;
  challengeId: number;
  userId: string;
}