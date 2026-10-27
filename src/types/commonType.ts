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

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface Owner {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
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

export interface Author {
  name: string;
}
