/*
  Warnings:

  - You are about to drop the column `content` on the `runs` table. All the data in the column will be lost.
  - Added the required column `bucketPath` to the `runs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `runs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "runs" DROP COLUMN "content",
ADD COLUMN     "bucketPath" TEXT NOT NULL,
ADD COLUMN     "fileUrl" TEXT NOT NULL;
