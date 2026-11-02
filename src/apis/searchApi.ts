import type { SearchRequest, SearchResponse } from "../types/searchType";
import { fetchData } from "./fatchData";

export const getSearch = async (
  clientCredentialToken: string,
  params: SearchRequest,
) => {
  const { q, type, ...rest } = params;

  const queryString = Object.entries(rest)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `&${k}=${v}`)
    .join("&");

  return await fetchData<SearchResponse>(
    `/search?q=${q}&type=${type}${queryString}`,
    clientCredentialToken,
  );
};
