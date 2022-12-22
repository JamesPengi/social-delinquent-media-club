/*
  Warnings:

  - Added the required column `type` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MediaTypes" AS ENUM ('Movie', 'TV');

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "type" "MediaTypes" NOT NULL;
