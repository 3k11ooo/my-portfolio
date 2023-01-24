export interface LINK {
  link: string,
  name: string,
  id?: string,
}

export interface ARTICLE {
  content : string,
}

export interface ARTICLEINFO/* extends ARTICLE*/ {
  id : string,
  category : string,
  title : string,
}
