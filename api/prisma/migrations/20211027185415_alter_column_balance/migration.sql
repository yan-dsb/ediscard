/*
  Warnings:

  - You are about to alter the column `balance` on the `balances` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "balances" ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;
