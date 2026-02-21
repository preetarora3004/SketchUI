/*
  Warnings:

  - You are about to drop the column `message` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Project` table. All the data in the column will be lost.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "message",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "code";

-- CreateTable
CREATE TABLE "Fragments" (
    "id" TEXT NOT NULL,
    "sandboxUrl" TEXT NOT NULL,
    "files" JSONB NOT NULL,
    "summary" TEXT NOT NULL,
    "messageId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Fragments_id_key" ON "Fragments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Fragments_messageId_key" ON "Fragments"("messageId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fragments" ADD CONSTRAINT "Fragments_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
