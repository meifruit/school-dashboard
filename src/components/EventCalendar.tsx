"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering on the server
  }
  const formattedDate =
    value instanceof Date ? format(value, "MMMM yyyy", { locale: enUS }) : "";
  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <div className="">
        <h1 className="text-xl font-semibold">Calendar</h1>
        <div className="flex justify-between gap-2 xl:gap-4 w-full">
          <div className="bg-white p-4 my-2 flex flex-row justify-between items-center gap-2 xxl:gap-6 w-1/2">
            <div className="">
              <span className="before:content-['•'] before:text-[#00b4d8] pr-1"></span>
              <span className="text-[0.6rem] md:text-xs text-gray-400">
                08 Oct, 2024
              </span>
              <h1 className="font-semibold pl-4 pt-2 md:text-sm">
                School Event
              </h1>
            </div>
            <div className="flex justify-between">
              <ArrowRight width={20} height={20} className="text-gray-500" />
            </div>
          </div>
          <div className="bg-white p-4 my-2 flex flex-row justify-between items-center gap-2 xxl:gap-6 w-1/2">
            <div className="">
              <span className="before:content-['•'] before:text-[#00b4d8] pr-1"></span>
              <span className="text-[0.6rem] md:text-xs text-gray-400">
                08 Oct, 2024
              </span>
              <h1 className="font-semibold pl-4 pt-2 md:text-sm">
                School Event
              </h1>
            </div>
            <div className="">
              <ArrowRight width={20} height={20} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <Calendar locale={enUS} onChange={onChange} value={value} />

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src={"/moreDark.png"} alt={""} height={20} width={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky even:border-t-purple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
