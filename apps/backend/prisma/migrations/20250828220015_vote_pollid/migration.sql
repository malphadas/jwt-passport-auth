/*
  Warnings:

  - You are about to drop the column `pollId` on the `Vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[voterId,optionId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Vote_voterId_optionId_pollId_key";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "pollId";

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterId_optionId_key" ON "Vote"("voterId", "optionId");
