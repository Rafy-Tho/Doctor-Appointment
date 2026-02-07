import { useMemo, useState } from 'react';

export const useDoctorSlots = (doctor, days = 7) => {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTime, setActiveTime] = useState('');

  const slots = useMemo(() => {
    if (!doctor) return [];

    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const daySlots = [];

      while (currentDate < endTime) {
        const time = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isAvailable = !doctor.slots_booked?.[slotDate]?.includes(time);

        if (isAvailable) {
          daySlots.push({
            datetime: new Date(currentDate),
            time,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(daySlots);
    }

    return allSlots;
  }, [doctor, days]);

  return {
    slots,
    activeDay,
    setActiveDay,
    activeTime,
    setActiveTime,
  };
};
