import type { SearchRequest, SearchResponse } from "../types/searchType";
import { fetchData } from "./fatchData";

export const getSearch = async (
  params: SearchRequest,
  clientCredentialToken: string,
) => {
  const queryString = Object.entries(params)
    .filter(([, v]) => v != null && v !== "")
    .map(([k, v]) => `&${k}=${v}`)
    .join("&");

  return await fetchData<SearchResponse>(
    `/search?q=${params.q}&type=${params.type}${queryString}`,
    clientCredentialToken,
  );
};
