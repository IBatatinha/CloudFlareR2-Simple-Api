-- CreateTable
CREATE TABLE "file" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "link" TEXT NOT NULL DEFAULT '',
    "linkLife" TEXT NOT NULL DEFAULT '',
    "creatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);
