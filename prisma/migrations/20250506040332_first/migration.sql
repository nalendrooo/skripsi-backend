-- CreateTable
CREATE TABLE `users` (
    `gid` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `school` VARCHAR(191) NULL,
    `user_type` INTEGER NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`gid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `information` TEXT NULL,
    `cover` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `price` INTEGER NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `free` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `course_slug_key`(`slug`),
    INDEX `idx_title`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_creator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `as` ENUM('OWNER', 'COLLABORATOR') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_logging` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `syllabus_content_id` INTEGER NOT NULL,
    `material_content_id` INTEGER NULL,
    `exam_id` INTEGER NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `category_slug_key`(`slug`),
    INDEX `idx_title`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `category_id` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sub_category_slug_key`(`slug`),
    INDEX `idx_title`(`title`),
    INDEX `sub_category_category_id_fkey`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `topic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `sub_category_id` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `topic_slug_key`(`slug`),
    INDEX `idx_title`(`title`),
    INDEX `topic_sub_category_id_fkey`(`sub_category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_topic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `topic_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `course_topic_course_id_fkey`(`course_id`),
    INDEX `course_topic_topic_id_fkey`(`topic_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `syllabus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `course_id` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `idx_title`(`title`),
    INDEX `syllabus_course_id_fkey`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `syllabus_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `syllabus_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` ENUM('EXAM', 'MATERIAL') NOT NULL,
    `order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `syllabus_content_slug_key`(`slug`),
    INDEX `idx_slug`(`slug`),
    INDEX `syllabus_content_syllabus_id_fkey`(`syllabus_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `syllabus_content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `description` TEXT NOT NULL,

    INDEX `exam_syllabus_content_id_fkey`(`syllabus_content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam_question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_active` BOOLEAN NOT NULL,
    `exam_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `description` TEXT NULL,
    `question_text` TEXT NOT NULL,
    `type_question` ENUM('MULTIPLE_CHOICE', 'MULTIPLE_CHOICE_COMPLEX') NOT NULL,

    INDEX `exam_question_exam_id_fkey`(`exam_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `option_questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_text` TEXT NOT NULL,
    `is_true` BOOLEAN NULL DEFAULT false,
    `reason` TEXT NULL,
    `order` INTEGER NULL,
    `attachment` VARCHAR(255) NULL,
    `exam_question_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `option_questions_exam_question_id_idx`(`exam_question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_content_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` ENUM('VIDEO', 'READING', 'PRE_TEST', 'POST_TEST') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `material_content_type` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `syllabus_content_id` INTEGER NOT NULL,
    `estimated_time` INTEGER NOT NULL,

    UNIQUE INDEX `material_content_slug_key`(`slug`),
    INDEX `material_content_material_content_type_fkey`(`material_content_type`),
    INDEX `material_content_syllabus_content_id_fkey`(`syllabus_content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_content_learning` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,

    UNIQUE INDEX `material_content_learning_material_id_key`(`material_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_content_test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_id` INTEGER NOT NULL,

    UNIQUE INDEX `material_content_test_material_id_key`(`material_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_content_file` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `material_content_file_material_content_id_key`(`material_content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material_content_attachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumbnail` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `material_content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `material_content_attachment_material_content_id_fkey`(`material_content_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course_creator` ADD CONSTRAINT `course_creator_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_creator` ADD CONSTRAINT `course_creator_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`gid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_logging` ADD CONSTRAINT `course_logging_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_logging` ADD CONSTRAINT `course_logging_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`gid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_logging` ADD CONSTRAINT `course_logging_syllabus_content_id_fkey` FOREIGN KEY (`syllabus_content_id`) REFERENCES `syllabus_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_logging` ADD CONSTRAINT `course_logging_material_content_id_fkey` FOREIGN KEY (`material_content_id`) REFERENCES `material_content`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_logging` ADD CONSTRAINT `course_logging_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_category` ADD CONSTRAINT `sub_category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `topic` ADD CONSTRAINT `topic_sub_category_id_fkey` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_topic` ADD CONSTRAINT `course_topic_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_topic` ADD CONSTRAINT `course_topic_topic_id_fkey` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `syllabus` ADD CONSTRAINT `syllabus_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `syllabus_content` ADD CONSTRAINT `syllabus_content_syllabus_id_fkey` FOREIGN KEY (`syllabus_id`) REFERENCES `syllabus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `exam_syllabus_content_id_fkey` FOREIGN KEY (`syllabus_content_id`) REFERENCES `syllabus_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam_question` ADD CONSTRAINT `exam_question_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `option_questions` ADD CONSTRAINT `option_questions_exam_question_id_fkey` FOREIGN KEY (`exam_question_id`) REFERENCES `exam_question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_content` ADD CONSTRAINT `material_content_material_content_type_fkey` FOREIGN KEY (`material_content_type`) REFERENCES `material_content_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_content` ADD CONSTRAINT `material_content_syllabus_content_id_fkey` FOREIGN KEY (`syllabus_content_id`) REFERENCES `syllabus_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_content_learning` ADD CONSTRAINT `material_content_learning_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `material_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_content_test` ADD CONSTRAINT `material_content_test_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `material_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_content_file` ADD CONSTRAINT `material_content_file_material_content_id_fkey` FOREIGN KEY (`material_content_id`) REFERENCES `material_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `material_content_attachment` ADD CONSTRAINT `material_content_attachment_material_content_id_fkey` FOREIGN KEY (`material_content_id`) REFERENCES `material_content`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
