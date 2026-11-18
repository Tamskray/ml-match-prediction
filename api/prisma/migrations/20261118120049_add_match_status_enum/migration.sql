/*
  Warnings:

  - The `status` column on the `matches` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('SCHEDULED', 'PLAYING', 'FINISHED');

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "status",
ADD COLUMN     "status" "MatchStatus" NOT NULL DEFAULT 'SCHEDULED';
