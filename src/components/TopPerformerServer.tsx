import prisma from "@/lib/prisma";
import TopPerformer from "./TopPerformer";

const TopPerformerServer = async () => {
  const students = await prisma.student.findMany({
    include: {
      class: true,
      grade: true,
      attendance: {
        select: {
          id: true,
          studentId: true,
          date: true,
          present: true,
          lessonId: true,
        },
      },
    },
  });
  // Calculate attendance percentage for each student
  const studentsWithAttendancePercentage = students.map((student) => {
    const totalSessions = student.attendance.length;
    const presentSessions = student.attendance.filter((a) => a.present).length;
    const attendancePercentage =
      totalSessions > 0 ? (presentSessions / totalSessions) * 100 : 0;

    return { ...student, attendancePercentage };
  });

  // Sort by attendancePercentage and select the top 3
  const topThreeStudents = studentsWithAttendancePercentage
    .sort((a, b) => b.attendancePercentage - a.attendancePercentage)
    .slice(0, 5);

  return <TopPerformer students={topThreeStudents} />;
};

export default TopPerformerServer;
