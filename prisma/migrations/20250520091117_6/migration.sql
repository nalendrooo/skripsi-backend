/*
  Warnings:

  - You are about to drop the column `nip` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `item_out` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `item_restock` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `nip`,
    ADD COLUMN `code` VARCHAR(191) NULL,
    MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;
