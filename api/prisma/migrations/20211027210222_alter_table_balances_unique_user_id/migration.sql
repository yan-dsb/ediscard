/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `balances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "balances_user_id_key" ON "balances"("user_id");
