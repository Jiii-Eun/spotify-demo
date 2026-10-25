export interface UserProfileResponse {
  account_id?: string;
  display_name?: string;
  external_urls?: {
    spotify: string;
  };
  href?: string;
  id?: string;
  images?: UserImage[];
  type?: string;
  uri?: string;
}

export interface UserImage {
  url: string;
  height: number | null;
  width: number | null;
}
