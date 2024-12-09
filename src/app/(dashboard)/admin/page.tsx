import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import TopPerformer from "@/components/TopPerformer";
import TopPerformerServer from "@/components/TopPerformerServer";
import UserCard from "@/components/UserCard";
const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col">
      {/* user card */}
      <div className="flex gap-4 justify-between flex-wrap capitalize">
        <UserCard type={"admin"} />
        <UserCard type={"student"} />
        <UserCard type={"teacher"} />
        <UserCard type={"parent"} />
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        {/* left */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* chart */}
          <div className="w-full h-[300px]">
            <FinanceChart />
          </div>
          {/* bottomchart */}
          <div className="flex justify-between gap-4 flex-col md:flex-row">
            {/* count chart */}
            <div className="w-full lg:w-1/3 h-[400px]">
              <CountChart />
            </div>
            {/* attendence chart */}
            <div className="w-full lg:w-2/3 h-[400px]">
              {/* <AttendanceChart /> */}
              <TopPerformerServer />
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <EventCalendar />
          {/* <Announcements /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
