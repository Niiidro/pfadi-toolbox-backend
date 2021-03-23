/*
  Warnings:

  - You are about to drop the column `activityId` on the `Leader` table. All the data in the column will be lost.
  - You are about to drop the column `activityId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `activityId` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `activityId` on the `Type` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Leader` DROP FOREIGN KEY `Leader_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Location` DROP FOREIGN KEY `Location_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Step` DROP FOREIGN KEY `Step_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Type` DROP FOREIGN KEY `Type_ibfk_1`;

-- AlterTable
ALTER TABLE `Activity` ADD COLUMN     `typeId` INTEGER,
    ADD COLUMN     `locationId` INTEGER,
    ADD COLUMN     `stepId` INTEGER,
    ADD COLUMN     `chiefId` INTEGER,
    MODIFY `date` CHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Item` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `Leader` DROP COLUMN `activityId`;

-- AlterTable
ALTER TABLE `Location` DROP COLUMN `activityId`;

-- AlterTable
ALTER TABLE `Step` DROP COLUMN `activityId`;

-- AlterTable
ALTER TABLE `Type` DROP COLUMN `activityId`;

-- AddForeignKey
ALTER TABLE `Activity` ADD FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD FOREIGN KEY (`stepId`) REFERENCES `Step`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD FOREIGN KEY (`chiefId`) REFERENCES `Leader`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
