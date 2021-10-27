/*
  Warnings:

  - You are about to alter the column `amount` on the `coupons` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `weight_base` on the `recycled_materials` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `weight_amount` on the `recycled_materials` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `balance_generated` on the `recycled_materials` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "coupons" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "recycled_materials" ALTER COLUMN "weight_base" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "weight_amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "balance_generated" SET DATA TYPE DOUBLE PRECISION;
