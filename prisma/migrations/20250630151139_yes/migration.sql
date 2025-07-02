/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `item_balance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `item_out` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `item_restock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `item_balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `item_out` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `item_restock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `admin_role` ENUM('SUPERADMIN', 'INSPECTOR', 'OPERATOR') NOT NULL;

-- AlterTable
ALTER TABLE `item_balance` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `item_out` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `item_restock` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `item_balance_code_key` ON `item_balance`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `item_out_code_key` ON `item_out`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `item_restock_code_key` ON `item_restock`(`code`);
