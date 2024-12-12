import { ArrowRight } from "lucide-react";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import Image from "next/image";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = searchParams;
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
      <EventCalendar />

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src={"/moreDark.png"} alt={""} height={20} width={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
