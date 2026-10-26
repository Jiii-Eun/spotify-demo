import type { ExternalUrls, Image } from "./commonType";

export interface UserProfileResponse {
  account_id?: string;
  display_name?: string;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  type?: string;
  uri?: string;
}
