export interface LINK {
  link: string,
  name: string,
  id?: string,
}

export interface ARTICLE extends ARTICLEINFO {
  content : string | null,
}

export interface ARTICLEINFO/* extends ARTICLE*/ {
  id : string,
  category : string[],
  title : string,
  image : string,
}

export interface RESULTDATA {
  display_name: string,
  ex_url: string,
  img: string,
  id: string,
  hover: boolean,
  style: any,
  sub_info?: string,
}

export interface USERINFO {
  user_name: string | null,
  user_id: string | null,
  user_img: string | null,
  error: boolean,
}

export interface APISEARHSTYLE {
  val: string, 
  name: string,
  style: HTMLSTYLE,
}

export interface TOKEN {
  access_token: string | null,
  refresh_token: string | null,
}


export interface SEARCH {
  name: string[],
  term: string[],
}

export interface HTMLSTYLE {
  display: string;
  active?: string;
}

export interface PLAYLIST {
  name: string,
  user_name: string,
  id: string,
  img_url: string,
  url: string,
  tracks_endpoint: string,
}

export interface TRACKS_IN_PLAYLIST {
  playlist_data: PLAYLIST,
  track_name: string,
  popularity: number,
  genres: string[],
  track_image: string,
  acousticness: number,
  danceability: number,
  energy: number,
  key: number,
  tempo: number,
  valence: number,

}