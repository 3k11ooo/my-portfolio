export interface LINK {
  link: string;
  name: string;
  id?: string;
}

export interface ARTICLEINFO {
  id : string;
  title : string;
}

export interface ARTICLE {
  article : ARTICLEINFO;
  content : string;
}