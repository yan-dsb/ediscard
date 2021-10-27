-- CreateTable
CREATE TABLE "recycled_materials" (
    "id" TEXT NOT NULL,
    "weight_base" DECIMAL(10,2) NOT NULL,
    "weight_amount" DECIMAL(10,2) NOT NULL,
    "balance_generated" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "recycled_materials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recycled_materials" ADD CONSTRAINT "recycled_materials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
