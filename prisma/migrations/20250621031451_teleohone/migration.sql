/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `admin_telephone_key` ON `admin`;

-- CreateIndex
CREATE UNIQUE INDEX `users_telephone_key` ON `users`(`telephone`);
