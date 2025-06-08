-- CreateTable
CREATE TABLE `item_balance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `initial_stock` INTEGER NOT NULL,
    `final_stock` INTEGER NOT NULL,
    `news` ENUM('TRUE', 'FALSE') NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `item_balance` ADD CONSTRAINT `item_balance_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_balance` ADD CONSTRAINT `item_balance_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
