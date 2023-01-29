export interface LINK {
  link: string,
  name: string,
  id?: string,
}

export interface ARTICLE extends ARTICLEINFO {
  content : string,
}

export interface ARTICLEINFO/* extends ARTICLE*/ {
  id : string,
  category : string,
  title : string,
}

export interface ARTISTDATA {
  name: string,
  ex_url: string,
  img: string,
  id: string,
  hover: boolean,
  style: any,
}

export interface USERINFO {
  name: string,
  img: string,
}

export interface APISEARHSTYLE {
  active: string,
  page: string,
  name: string,
  val: string,
  index: string,
  disable: boolean,
}


export interface TOKEN {
  access_token: string | null,
  refresh_token: string | null,
}


export interface SEARCH {
  name: string[],
  term: string[],
}