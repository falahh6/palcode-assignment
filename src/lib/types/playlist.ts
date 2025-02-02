export interface Playlist {
  id: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  thumbnail: string;
  videos: {
    id: string | null | undefined;
    title: string | null | undefined;
    description: string | null | undefined;
    thumbnail: string | null | undefined;
    duration: string | null | undefined;
  }[];
}

export interface DragItem {
  type: string;
  id: string;
  index: number;
}
