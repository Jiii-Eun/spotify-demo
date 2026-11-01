import type { SearchRequest, SearchResponse } from "../types/searchType";
import { fetchData } from "./fatchData";

export const getSearch = async (
  clientCredentialToken: string,
  params: SearchRequest,
) => {
  const { q, type, ...rest } = params;

  let queryString = new URLSearchParams(
    Object.entries(rest)
      .map(([key, value]) => [key, value?.toString() ?? ""])
      .filter(([_, value]) => value !== ""),
  ).toString();
  if (queryString) {
    queryString = `&${queryString}`;
  }
  return await fetchData<SearchResponse>(
    `/search?q=${q}&type=${type}${queryString}`,
    clientCredentialToken,
  );
};
