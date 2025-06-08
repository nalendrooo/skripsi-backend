/*
  Warnings:

  - You are about to drop the column `is_active` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `category` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gid` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_creator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_logging` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exam_question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_content_attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_content_file` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_content_learning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_content_test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_content_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `option_questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `syllabus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `syllabus_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `division_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `course_creator` DROP FOREIGN KEY `course_creator_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `course_creator` DROP FOREIGN KEY `course_creator_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `course_logging` DROP FOREIGN KEY `course_logging_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `course_logging` DROP FOREIGN KEY `course_logging_exam_id_fkey`;

-- DropForeignKey
ALTER TABLE `course_logging` DROP FOREIGN KEY `course_logging_material_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `course_logging` DROP FOREIGN KEY `course_logging_syllabus_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `course_logging` DROP FOREIGN KEY `course_logging_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `course_topic` DROP FOREIGN KEY `course_topic_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `course_topic` DROP FOREIGN KEY `course_topic_topic_id_fkey`;

-- DropForeignKey
ALTER TABLE `exam` DROP FOREIGN KEY `exam_syllabus_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `exam_question` DROP FOREIGN KEY `exam_question_exam_id_fkey`;

-- DropForeignKey
ALTER TABLE `material_content` DROP FOREIGN KEY `material_content_material_content_type_fkey`;

-- DropForeignKey
ALTER TABLE `material_content` DROP FOREIGN KEY `material_content_syllabus_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `material_content_attachment` DROP FOREIGN KEY `material_content_attachment_material_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `material_content_file` DROP FOREIGN KEY `material_content_file_material_content_id_fkey`;

-- DropForeignKey
ALTER TABLE `material_content_learning` DROP FOREIGN KEY `material_content_learning_material_id_fkey`;

-- DropForeignKey
ALTER TABLE `material_content_test` DROP FOREIGN KEY `material_content_test_material_id_fkey`;

-- DropForeignKey
ALTER TABLE `option_questions` DROP FOREIGN KEY `option_questions_exam_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `sub_category` DROP FOREIGN KEY `sub_category_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `syllabus` DROP FOREIGN KEY `syllabus_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `syllabus_content` DROP FOREIGN KEY `syllabus_content_syllabus_id_fkey`;

-- DropForeignKey
ALTER TABLE `topic` DROP FOREIGN KEY `topic_sub_category_id_fkey`;

-- DropIndex
DROP INDEX `category_slug_key` ON `category`;

-- DropIndex
DROP INDEX `idx_title` ON `category`;

-- DropIndex
DROP INDEX `users_email_key` ON `users`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `is_active`,
    DROP COLUMN `order`,
    DROP COLUMN `slug`,
    MODIFY `title` VARCHAR(191) NOT NULL,
    ALTER COLUMN `created_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `full_name`,
    DROP COLUMN `gid`,
    DROP COLUMN `phone`,
    DROP COLUMN `school`,
    DROP COLUMN `user_type`,
    ADD COLUMN `division_id` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `nip` VARCHAR(191) NOT NULL,
    ADD COLUMN `telephone` VARCHAR(191) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL,
    MODIFY `updated_at` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `course`;

-- DropTable
DROP TABLE `course_creator`;

-- DropTable
DROP TABLE `course_logging`;

-- DropTable
DROP TABLE `course_topic`;

-- DropTable
DROP TABLE `exam`;

-- DropTable
DROP TABLE `exam_question`;

-- DropTable
DROP TABLE `material_content`;

-- DropTable
DROP TABLE `material_content_attachment`;

-- DropTable
DROP TABLE `material_content_file`;

-- DropTable
DROP TABLE `material_content_learning`;

-- DropTable
DROP TABLE `material_content_test`;

-- DropTable
DROP TABLE `material_content_type`;

-- DropTable
DROP TABLE `option_questions`;

-- DropTable
DROP TABLE `sub_category`;

-- DropTable
DROP TABLE `syllabus`;

-- DropTable
DROP TABLE `syllabus_content`;

-- DropTable
DROP TABLE `topic`;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telephone` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `admin_role` ENUM('SUPERADMIN', 'OFFICER') NOT NULL,
    `division_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `division` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `supplier` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `unit_id` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_restock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `news` ENUM('TRUE', 'FALSE') NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_out` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `news` ENUM('TRUE', 'FALSE') NOT NULL,
    `user_id` INTEGER NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `division`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `division`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_restock` ADD CONSTRAINT `item_restock_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_restock` ADD CONSTRAINT `item_restock_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_out` ADD CONSTRAINT `item_out_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_out` ADD CONSTRAINT `item_out_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_out` ADD CONSTRAINT `item_out_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
