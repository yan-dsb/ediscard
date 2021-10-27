/*
  Warnings:

  - You are about to drop the column `balance` on the `balances` table. All the data in the column will be lost.
  - Added the required column `amount` to the `balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id_admin` to the `recycled_materials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "balances" DROP COLUMN "balance",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "recycled_materials" ADD COLUMN     "user_id_admin" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "recycled_materials" ADD CONSTRAINT "recycled_materials_user_id_admin_fkey" FOREIGN KEY ("user_id_admin") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
