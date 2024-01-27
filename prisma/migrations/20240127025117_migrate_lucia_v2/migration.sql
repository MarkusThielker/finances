-- DropColumn
ALTER TABLE "auth_key" DROP COLUMN "expires",
                       DROP COLUMN "primary_key";

-- RenameTable
ALTER TABLE "auth_key" RENAME TO "lucia_key";

-- AddPrimaryKey
ALTER TABLE "lucia_key"
    DROP CONSTRAINT "auth_key_pkey",
    ADD CONSTRAINT "lucia_key_pkey" PRIMARY KEY ("id");

-- RenameTable
ALTER TABLE "auth_session" RENAME TO "lucia_session";

-- AddPrimaryKey
ALTER TABLE "lucia_session"
    DROP CONSTRAINT "auth_session_pkey",
    ADD CONSTRAINT "lucia_session_pkey" PRIMARY KEY ("id");

-- RenameTable
ALTER TABLE "auth_user" RENAME TO "lucia_user";

-- AddPrimaryKey
ALTER TABLE "lucia_user"
    DROP CONSTRAINT "auth_user_pkey",
    ADD CONSTRAINT "lucia_user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "lucia_user_id_key" ON "lucia_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "lucia_user_username_key" ON "lucia_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "lucia_session_id_key" ON "lucia_session"("id");

-- CreateIndex
CREATE INDEX "lucia_session_user_id_idx" ON "lucia_session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "lucia_key_id_key" ON "lucia_key"("id");

-- CreateIndex
CREATE INDEX "lucia_key_user_id_idx" ON "lucia_key"("user_id");

-- AddForeignKey
ALTER TABLE "lucia_session" ADD CONSTRAINT "lucia_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "lucia_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lucia_key" ADD CONSTRAINT "lucia_key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "lucia_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;