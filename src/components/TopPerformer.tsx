"use client";

import { useState } from "react";
import Image from "next/image";
import { Student, Class, Grade, Attendance } from "@prisma/client";
import Table from "./Table";

// Define types for the student list
type StudentList = Student & { grade: Grade } & { class: Class } & {
  attendance: Attendance[];
  attendancePercentage?: number;
};

type TopPerformerProps = {
  students: StudentList[]; // Accept students data as props
};

const TopPerformer = ({ students }: TopPerformerProps) => {
  const [activeTab, setActiveTab] = useState<string>("week");

  // Function to filter attendance records based on the selected time period (week, month, year)
  const filterAttendanceByTimePeriod = (
    tabId: string,
    studentAttendances: Attendance[]
  ) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Start of the current week
    const startOfMonth = new Date(now.setDate(1)); // Start of the current month
    const startOfYear = new Date(new Date().getFullYear(), 0, 1); // Start of the current year

    switch (tabId) {
      case "week":
        return studentAttendances.filter(
          (attendance) => new Date(attendance.date) >= startOfWeek
        );
      case "month":
        return studentAttendances.filter(
          (attendance) => new Date(attendance.date) >= startOfMonth
        );
      case "year":
        return studentAttendances.filter(
          (attendance) => new Date(attendance.date) >= startOfYear
        );
      default:
        return studentAttendances;
    }
  };

  // Function to calculate attendance percentage for each student
  const calculateAttendance = (studentAttendances: Attendance[]) => {
    const totalSessions = studentAttendances.length;
    const attendedSessions = studentAttendances.filter(
      (attendance) => attendance.present
    ).length;
    return totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0;
  };

  // Sorting students based on attendance percentage (highest first)
  const sortedStudents = students
    .map((student) => {
      const filteredAttendances = filterAttendanceByTimePeriod(
        activeTab,
        student.attendance
      );
      const attendancePercentage = calculateAttendance(filteredAttendances);

      return {
        ...student,
        attendancePercentage,
        attendance: filteredAttendances,
      };
    })
    .sort((a, b) => b.attendancePercentage - a.attendancePercentage); // Sort by attendance percentage

  const studentsWithRank = sortedStudents.map((student, index) => ({
    ...student,
    rank: index + 1, // Rank is 1-based
  }));

  // Table columns definition
  const columns = [
    { header: "Info", accessor: "info" },
    { header: "Student ID", accessor: "studentId" },
    { header: "Rank", accessor: "rank" },
  ];

  const studentsWithAttendance = students.map((student) => {
    const totalSessions = student.attendance.length;
    const presentSessions = student.attendance.filter((a) => a.present).length;
    const attendancePercentage =
      totalSessions > 0 ? (presentSessions / totalSessions) * 100 : 0;

    return { ...student, attendancePercentage };
  });

  // Render table row for each student
  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 cursor-pointer text-sm hover:bg-purplelight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/rabbit.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class.name}</p>
        </div>
      </td>
      <td>{item.username}</td>
      <td>{item.attendancePercentage?.toFixed(2) || "0.00"}%</td>
      {/* Display attendance percentage */}
    </tr>
  );

  // Tabs for selecting time period
  const tabs = [
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
  ];

  return (
    <div className="bg-white rounded-lg p-4 h-full overflow-x-hidden">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Top Performer</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* Custom Tab Navigation */}
      <div className="border-b flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 ${
              activeTab === tab.id
                ? "border-b-2 border-[#16425b] text-[#16425b]"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-1">
        <Table columns={columns} renderRow={renderRow} data={sortedStudents} />
      </div>
    </div>
  );
};

export default TopPerformer;
