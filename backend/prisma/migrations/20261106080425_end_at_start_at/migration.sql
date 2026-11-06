/*
  Warnings:

  - You are about to drop the column `date` on the `fight` table. All the data in the column will be lost.
  - Added the required column `endAt` to the `Fight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Fight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fight` DROP COLUMN `date`,
    ADD COLUMN `endAt` DATETIME(3) NOT NULL,
    ADD COLUMN `startAt` DATETIME(3) NOT NULL;
