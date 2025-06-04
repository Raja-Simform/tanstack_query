//import useFetch from "../../hooks/useFetch";
import { apiPaths } from "../../constants/apiPath";
import { axiosInstance } from "../../config/axios.config";
import Card from "../../components/Card/Card";
//import type ApiResponse from "./HomeType";
import Filter from "../../components/Filter/Filter";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "../../components/NotFound/NotFound";
import { useQuery } from "@tanstack/react-query";
import type { UsersAPIResponse } from "./HomeType";

export default function Home() {
  const [searchData] = useSearchParams();
  const search = searchData.get("search") || "";
  const { data, isLoading, error, refetch } = useQuery<UsersAPIResponse, Error>(
    {
      queryKey: ["users", search],
      queryFn: () => {
        return axiosInstance
          .get(apiPaths.user, { params: { search: searchData } })
          .then((res) => res.data);
      },
    }
  );
  useEffect(() => {
    refetch();
  }, [refetch, search]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <NotFound />;

  return (
    <div className="flex ">
      <Filter />
      <Card products={data.data} />;
    </div>
  );
}
