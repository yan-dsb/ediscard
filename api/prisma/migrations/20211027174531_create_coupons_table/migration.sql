-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "isUsed" BOOLEAN NOT NULL,
    "isCancelled" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "balance_id" TEXT NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "balances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
