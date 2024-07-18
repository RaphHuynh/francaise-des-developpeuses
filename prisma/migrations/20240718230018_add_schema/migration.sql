-- AlterTable
ALTER TABLE "users" ADD COLUMN     "description" TEXT,
ADD COLUMN     "firstname" VARCHAR(50),
ADD COLUMN     "imagePortfolio" BYTEA,
ADD COLUMN     "lastname" VARCHAR(50),
ADD COLUMN     "urlPortfolio" VARCHAR(320),
ADD COLUMN     "userId" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);
