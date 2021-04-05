/*
  Warnings:

  - You are about to drop the column `split` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `semester` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Settings.dark_unique` ON `Settings`;

-- DropIndex
DROP INDEX `Settings.startTime_unique` ON `Settings`;

-- DropIndex
DROP INDEX `Settings.split_unique` ON `Settings`;

-- AlterTable
ALTER TABLE `Item` MODIFY `time` CHAR(6) NOT NULL;

-- AlterTable
ALTER TABLE `Settings` DROP COLUMN `split`,
    ADD COLUMN     `semester` BOOLEAN NOT NULL,
    MODIFY `startTime` CHAR(6) NOT NULL,
    ALTER COLUMN `dark` DROP DEFAULT;
