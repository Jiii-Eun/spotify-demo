export interface ExternalUrls {
  spotify: string;
}

export interface Restrictions {
  reason: string;
}

export interface BaseItem {
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface BaseItemName extends BaseItem {
  name: string;
}

export interface Artist extends BaseItemName {
  external_urls: ExternalUrls;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface Owner extends BaseItem {
  external_urls: ExternalUrls;
  display_name: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ResumePoint {
  fully_played: boolean;
  resume_position_ms: number;
}

export interface Options {
  offset: number;
  limit: number;
}
