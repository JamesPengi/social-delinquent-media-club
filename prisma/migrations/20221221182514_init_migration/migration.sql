-- CreateEnum
CREATE TYPE "Genres" AS ENUM ('Drama', 'Comedy', 'Horror', 'Animated', 'Action', 'Adventure');

-- CreateTable
CREATE TABLE "Media" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "genre" "Genres"[],
    "watchedAt" TIMESTAMP(3) NOT NULL,
    "watched" BOOL NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "People" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaPeopleWatched" (
    "mediaId" STRING NOT NULL,
    "peopleId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaPeopleWatched_pkey" PRIMARY KEY ("mediaId","peopleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_name_key" ON "Media"("name");

-- CreateIndex
CREATE UNIQUE INDEX "People_name_key" ON "People"("name");

-- AddForeignKey
ALTER TABLE "MediaPeopleWatched" ADD CONSTRAINT "MediaPeopleWatched_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaPeopleWatched" ADD CONSTRAINT "MediaPeopleWatched_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "People"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
