export interface AudioFile {
  id: string;
  title: string;
  artist: string;
  duration: string;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: AudioFile[];
}
