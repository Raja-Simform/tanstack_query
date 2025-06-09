import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../config/axios.config";
import { apiPaths } from "../../constants/apiPath";
import userPhoto from "../../assets/user.png";
import dayjs from "dayjs";
import rupee from "../../assets/rupee.png";
import type {  UsersData } from "./UserDetailTypes";
import type { AxiosResponse } from "axios";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<AxiosResponse<UsersData>, Error>({
    queryKey: ["user", id],
    queryFn: () => {
      return axiosInstance.get(apiPaths.userDetail(String(id)));
    },
  });

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  if (!data || !data?.data?.data) {
    return <div className="text-center text-lg">User not found.</div>;
  }


  return (
    <div className="flex">
      <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg border-1 p-6 max-w-2xl w-full mx-auto my-20">
        <img
          src={userPhoto}
          alt="User Profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-md mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-1">
          <div className="mb-2">
            <span className="font-semibold">Username:</span>{" "}
            {data.data.data.username}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Email:</span> {data?.data?.data?.email}
          </div>
        </div>
        <div className="flex-1">
          <div className=" flex  items-center gap-1  mb-2 font-bold text-blue-600">
            <img src={rupee} alt="" className="h-5" />{" "}
            <span>{data.data.data.mobileNumber.slice(-3)}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Added:</span>{" "}
            {dayjs(data.data.data.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
}
