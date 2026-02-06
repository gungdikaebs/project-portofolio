/*
  Warnings:

  - You are about to alter the column `year` on the `Certification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `year` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `stack` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `techStack` on the `Project` table. All the data in the column will be lost.
  - You are about to alter the column `year` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `category` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `startYear` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Certification` ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0,
    MODIFY `year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Education` DROP COLUMN `year`,
    ADD COLUMN `endYear` INTEGER NULL,
    ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `startYear` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Experience` DROP COLUMN `date`,
    DROP COLUMN `stack`,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `isCurrent` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `availableForHi` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `techStack`,
    ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    MODIFY `year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `category`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `SkillCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectSkill` (
    `projectId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`projectId`, `skillId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `SkillCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectSkill` ADD CONSTRAINT `ProjectSkill_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectSkill` ADD CONSTRAINT `ProjectSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
