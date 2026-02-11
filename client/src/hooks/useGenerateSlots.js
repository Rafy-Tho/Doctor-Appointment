// hooks/appointments/useGenerateSlots.js
import { useEffect, useState, useMemo } from 'react';

export default function useGenerateSlots({ appointments, doctorId }) {
  const [docSlots, setDocSlots] = useState([]);
  console.log({ appointments });
  // Create booked timestamp set (memoized for performance)
  const bookedSet = useMemo(() => {
    if (!appointments) return new Set();

    return new Set(
      appointments.map((app) => new Date(app.slotDate).setSeconds(0, 0)),
    );
  }, [appointments]);

  useEffect(() => {
    if (!appointments || !doctorId) return;

    const generateSlots = () => {
      let today = new Date();
      let allDaysSlots = [];

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0); // 9 PM

        // Start from 10 AM
        if (i === 0) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
            currentDate.getMinutes() > 30 ? 30 : 0,
            0,
            0,
          );
        } else {
          currentDate.setHours(10, 0, 0, 0);
        }

        let timeSlots = [];

        while (currentDate < endTime) {
          const slotTimestamp = new Date(currentDate).setSeconds(0, 0);

          const isAvailable = !bookedSet.has(slotTimestamp);

          if (isAvailable) {
            timeSlots.push({
              datetime: new Date(currentDate),
              time: currentDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            });
          }

          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }

        allDaysSlots.push(timeSlots);
      }

      setDocSlots(allDaysSlots);
    };

    generateSlots();
  }, [appointments, doctorId, bookedSet]);

  return { docSlots };
}
