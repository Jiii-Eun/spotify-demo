import { useQuery } from "@tanstack/react-query";
import { getRizeMusic } from "../apis/AlbumApi";

export const useGetRizeMusic = () => {
  return useQuery({
    queryKey: ["getRizeMusic"],
    queryFn: getRizeMusic,
  });
};
