/*
  Warnings:

  - The values [OFFICER] on the enum `admin_admin_role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[telephone]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `admin_role` ENUM('SUPERADMIN', 'OPERATOR') NOT NULL;

-- AlterTable
ALTER TABLE `item` ADD COLUMN `price` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `admin_telephone_key` ON `admin`(`telephone`);
