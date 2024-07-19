/*
  Warnings:

  - You are about to drop the `_NetworkToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NetworkToUser" DROP CONSTRAINT "_NetworkToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_NetworkToUser" DROP CONSTRAINT "_NetworkToUser_B_fkey";

-- DropTable
DROP TABLE "_NetworkToUser";

-- CreateTable
CREATE TABLE "UserNetwork" (
    "userId" TEXT NOT NULL,
    "networkId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "UserNetwork_pkey" PRIMARY KEY ("userId","networkId")
);

-- AddForeignKey
ALTER TABLE "UserNetwork" ADD CONSTRAINT "UserNetwork_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNetwork" ADD CONSTRAINT "UserNetwork_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
