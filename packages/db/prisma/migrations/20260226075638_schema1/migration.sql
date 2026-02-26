/*
  Warnings:

  - You are about to drop the column `sandboxUrl` on the `Fragments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fragments" DROP COLUMN "sandboxUrl";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "summary" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;
