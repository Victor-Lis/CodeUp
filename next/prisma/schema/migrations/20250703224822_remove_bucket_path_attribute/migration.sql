/*
  Warnings:

  - You are about to drop the column `bucketPath` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `bucketPath` on the `runs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "bucketPath";

-- AlterTable
ALTER TABLE "runs" DROP COLUMN "bucketPath";
