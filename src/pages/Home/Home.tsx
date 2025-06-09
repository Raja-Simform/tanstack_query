import { apiPaths } from "../../constants/apiPath";
import { axiosInstance } from "../../config/axios.config";
import Card from "../../components/Card/Card";

import Filter from "../../components/Filter/Filter";
import { useSearchParams } from "react-router-dom";

import NotFound from "../../components/NotFound/NotFound";
import { useQuery } from "@tanstack/react-query";
import type { UserApiResponse } from "./HomeType";

export default function Home() {
  const [searchData] = useSearchParams();
  const search = searchData.get("search") || "";
  const { data, isLoading, error } = useQuery<UserApiResponse, Error>({
    queryKey: ["users", search],
    queryFn: () => {
      return axiosInstance.get(apiPaths.user, {
        params: { search },
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !Array.isArray(data.data.data)) {
    console.error("Expected data.data to be an array", data);
    return <NotFound />;
  }

  console.log("Products:", data.data.data);
  return (
    <div className="flex ">
      <Filter />
      <Card products={data.data.data} />;
    </div>
  );
}
