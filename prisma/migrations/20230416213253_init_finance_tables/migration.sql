-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('Entity', 'Account');

-- CreateTable
CREATE TABLE "entities"
(
    "id"         SERIAL       NOT NULL,
    "name"       TEXT         NOT NULL,
    "identifier" TEXT         NOT NULL,
    "type"       "EntityType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments"
(
    "id"          SERIAL       NOT NULL,
    "amount"      BIGINT       NOT NULL,
    "currency"    TEXT         NOT NULL DEFAULT 'EUR',
    "payor_id"    INTEGER      NOT NULL,
    "payee_id"    INTEGER      NOT NULL,
    "category_id" INTEGER,
    "created_at"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories"
(
    "id"         SERIAL       NOT NULL,
    "name"       TEXT         NOT NULL,
    "color"      TEXT         NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entities_name_key" ON "entities" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "entities_identifier_key" ON "entities" ("identifier");
