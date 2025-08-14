-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."aadharDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "aadharNumber" TEXT NOT NULL,

    CONSTRAINT "aadharDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."panDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "orgType" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "holderName" TEXT NOT NULL,
    "dob" TEXT NOT NULL,

    CONSTRAINT "panDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aadharDetails_userId_key" ON "public"."aadharDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "aadharDetails_aadharNumber_key" ON "public"."aadharDetails"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "panDetails_userId_key" ON "public"."panDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "panDetails_panNumber_key" ON "public"."panDetails"("panNumber");

-- AddForeignKey
ALTER TABLE "public"."aadharDetails" ADD CONSTRAINT "aadharDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."panDetails" ADD CONSTRAINT "panDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
