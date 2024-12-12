"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null; // Avoid rendering on the server
  // }
  // const formattedDate =
  //   value instanceof Date ? format(value, "MMMM yyyy", { locale: enUS }) : "";
  const router = useRouter();
  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toLocaleDateString("en-US")}`);
    }
  }, [value, router]);
  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
