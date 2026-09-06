-- AlterTable
ALTER TABLE `Project`
    ADD COLUMN `role` VARCHAR(191) NULL,
    ADD COLUMN `challenge` TEXT NULL,
    ADD COLUMN `contribution` TEXT NULL,
    ADD COLUMN `result` TEXT NULL,
    ADD COLUMN `sourceCodeUrl` VARCHAR(191) NULL;
