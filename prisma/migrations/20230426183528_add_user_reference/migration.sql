/* BREAKING CHANGE - To apply this mandatory migration, an empty table is required */

-- AlterTable
ALTER TABLE "categories"
    ADD COLUMN "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "entities"
    ADD COLUMN "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments"
    ADD COLUMN "date"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN "user_id" TEXT         NOT NULL;
