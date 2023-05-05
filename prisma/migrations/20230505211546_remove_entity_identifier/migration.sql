/*
  Warnings:

  - You are about to drop the column `identifier` on the `entities` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "entities_user_id_identifier_key";

-- AlterTable
ALTER TABLE "entities"
    DROP COLUMN "identifier";
