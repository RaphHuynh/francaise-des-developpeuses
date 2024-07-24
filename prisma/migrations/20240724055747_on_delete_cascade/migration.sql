-- DropForeignKey
ALTER TABLE "UserNetwork" DROP CONSTRAINT "UserNetwork_networkId_fkey";

-- AddForeignKey
ALTER TABLE "UserNetwork" ADD CONSTRAINT "UserNetwork_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE CASCADE ON UPDATE CASCADE;
