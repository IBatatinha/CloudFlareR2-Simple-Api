/*
  Warnings:

  - You are about to drop the column `link` on the `file` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "link",
ADD COLUMN     "private" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "public" TEXT NOT NULL DEFAULT '';
