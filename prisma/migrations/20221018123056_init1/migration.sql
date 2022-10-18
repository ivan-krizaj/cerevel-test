-- CreateTable
CREATE TABLE "Trial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "trialDrug" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Trial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "pin_code" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT,
    "is_active" BOOLEAN NOT NULL,
    "password_reset" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "consented" BOOLEAN NOT NULL,
    "logged_in" BOOLEAN NOT NULL,
    "login_count" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TrialToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SiteToTrial" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SiteToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PatientToTrial" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PatientToSite" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_TrialToUser_AB_unique" ON "_TrialToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TrialToUser_B_index" ON "_TrialToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SiteToTrial_AB_unique" ON "_SiteToTrial"("A", "B");

-- CreateIndex
CREATE INDEX "_SiteToTrial_B_index" ON "_SiteToTrial"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SiteToUser_AB_unique" ON "_SiteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SiteToUser_B_index" ON "_SiteToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PatientToTrial_AB_unique" ON "_PatientToTrial"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientToTrial_B_index" ON "_PatientToTrial"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PatientToSite_AB_unique" ON "_PatientToSite"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientToSite_B_index" ON "_PatientToSite"("B");

-- AddForeignKey
ALTER TABLE "_TrialToUser" ADD CONSTRAINT "_TrialToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Trial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrialToUser" ADD CONSTRAINT "_TrialToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToTrial" ADD CONSTRAINT "_SiteToTrial_A_fkey" FOREIGN KEY ("A") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToTrial" ADD CONSTRAINT "_SiteToTrial_B_fkey" FOREIGN KEY ("B") REFERENCES "Trial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToUser" ADD CONSTRAINT "_SiteToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SiteToUser" ADD CONSTRAINT "_SiteToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToTrial" ADD CONSTRAINT "_PatientToTrial_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToTrial" ADD CONSTRAINT "_PatientToTrial_B_fkey" FOREIGN KEY ("B") REFERENCES "Trial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToSite" ADD CONSTRAINT "_PatientToSite_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToSite" ADD CONSTRAINT "_PatientToSite_B_fkey" FOREIGN KEY ("B") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
