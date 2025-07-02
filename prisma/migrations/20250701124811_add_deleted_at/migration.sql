-- AlterTable
ALTER TABLE `item_balance` ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `item_out` ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `item_restock` ADD COLUMN `deleted_at` DATETIME(3) NULL;
