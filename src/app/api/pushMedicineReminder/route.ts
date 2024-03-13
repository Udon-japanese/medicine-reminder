import { prisma } from '@/lib/prismadb';
import { format, getHours, getMinutes } from 'date-fns';
import { getImageUrlByIdServer } from '../lib/cloudinary';
import { webPush } from '@/lib/webPush';
import { NextResponse } from 'next/server';
import { getDateInTimezone } from '@/utils/getDateInTimezone';

export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    // const currentDate = getDateInTimezone(new Date());
    // console.log('currentDate', currentDate)
    // const currentHours = getHours(currentDate);
    // const currentMinutes = getMinutes(currentDate);
    // const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    // const completedOrSkippedMedicineRecords = await prisma.medicineRecord.findMany({
    //   where: {
    //     OR: [{ isCompleted: true }, { isSkipped: true }],
    //     scheduledIntakeTime: currentTimeInMinutes,
    //   },
    //   select: {
    //     medicineId: true,
    //   },
    // });
    // const completedOrSkippedMedicineIds = completedOrSkippedMedicineRecords.map(
    //   (m) => m.medicineId,
    // );
    // const currentMedicines = await prisma.medicine.findMany({
    //   where: {
    //     NOT: {
    //       id: {
    //         in: completedOrSkippedMedicineIds,
    //       },
    //     },
    //     notify: true,
    //     intakeTimes: {
    //       some: {
    //         time: currentTimeInMinutes,
    //       },
    //     },
    //   },
    //   include: {
    //     intakeTimes: true,
    //     memo: true,
    //   },
    // });

    // const userMedicines = new Map<
    //   string,
    //   {
    //     name: string;
    //     imageUrl?: string;
    //   }[]
    // >();
    // for (const medicine of currentMedicines) {
    //   const userId = medicine.userId;
    //   const medicineName = medicine.name;
    //   const imageId = medicine?.memo?.imageId;
    //   let imageUrl: string | undefined;

    //   if (!userMedicines.has(userId)) {
    //     userMedicines.set(userId, []);
    //   }

    //   const userMedicineList = userMedicines.get(userId);
    //   const userHasMedicineWithImage = userMedicineList?.some((m) => m.imageUrl);

    //   if (imageId && !userHasMedicineWithImage) {
    //     const imgUrl = await getImageUrlByIdServer(imageId);
    //     if (imgUrl) imageUrl = imgUrl;
    //   }

    //   userMedicines.get(userId)?.push({ imageUrl, name: medicineName });
    // }

    // for (const [userId, medicines] of userMedicines) {
    //   const pushSubscriptions = await prisma.pushSubscription.findMany({
    //     where: {
    //       userId,
    //     },
    //   });
    //   const formattedCurrentDate = format(currentDate, 'M月dd日 H:mm');
    //   if (!pushSubscriptions || pushSubscriptions.length === 0) continue;

    //   for (const subscription of pushSubscriptions) {
    //     const pushSubscription = {
    //       endpoint: subscription.endpoint,
    //       keys: {
    //         auth: subscription.authKey,
    //         p256dh: subscription.p256dhkey,
    //       },
    //     };

    //     const payload = JSON.stringify({
    //       body: `${medicines.map((m) => m.name).join(' ')} ${formattedCurrentDate}`,
    //       image: medicines.find((m) => m.imageUrl)?.imageUrl,
    //     });

    //     webPush.sendNotification(pushSubscription, payload);
    //   }
    // }

      const pushSubscriptions = await prisma.pushSubscription.findMany();

      for (const subscription of pushSubscriptions) {
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            auth: subscription.authKey,
            p256dh: subscription.p256dhkey,
          },
        };

        const payload = JSON.stringify({
          body: `てすと`,
        });

        webPush.sendNotification(pushSubscription, payload);
    }


    return new NextResponse('OK', { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

