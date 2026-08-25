-- AlterTable
ALTER TABLE `Project`
    ADD COLUMN `repositoryUrl` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NULL,
    ADD COLUMN `challenge` TEXT NULL,
    ADD COLUMN `solution` TEXT NULL,
    ADD COLUMN `impact` TEXT NULL;
