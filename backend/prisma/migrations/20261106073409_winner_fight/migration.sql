/*
  Warnings:

  - You are about to drop the column `isActive` on the `fight` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `fight` DROP FOREIGN KEY `Fight_winnerId_fkey`;

-- AlterTable
ALTER TABLE `fight` DROP COLUMN `isActive`,
    MODIFY `winnerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Fight` ADD CONSTRAINT `Fight_winnerId_fkey` FOREIGN KEY (`winnerId`) REFERENCES `Clan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
