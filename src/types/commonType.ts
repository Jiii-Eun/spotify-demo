export interface ExternalUrls {
  spotify: string;
}

export interface Restrictions {
  reason: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}
