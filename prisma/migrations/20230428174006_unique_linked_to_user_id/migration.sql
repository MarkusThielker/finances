/*
  Warnings:

  - A unique constraint covering the columns `[user_id,name]` on the table `entities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,identifier]` on the table `entities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "entities_identifier_key";

-- DropIndex
DROP INDEX "entities_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "entities_user_id_name_key" ON "entities"("user_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "entities_user_id_identifier_key" ON "entities"("user_id", "identifier");
