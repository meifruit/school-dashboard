import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl p-4 flex-1 min-w-[130px] bg-white">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="bg-[#bfd7ea] rounded-full px-2 py-1 text-[10px] text-gray-500">
            2024/25
          </span>
          <Image src={"/more.png"} alt={""} width={20} height={20} />
        </div>
        <h1 className="text-2xl font-semibold my-4">1,234</h1>
        <h2 className="text-sm font-medium text-gray-500">{type}s</h2>
      </div>
    </div>
  );
};

export default UserCard;
