import { LINK, ARTICLEINFO, ARTICLE, APISEARH } from './interface';

export const SUBTITLE : LINK[] = [
  {link:'/all-products', name: 'Products'},
  {link:'/blogs', name: 'Blog'},
]

export const PRODUCTS : LINK[] = [
  // {link:'/all-products', name: 'TOP'},
  {link:'/spotify-api', name: 'Spotify API'},
  // {link:'/web-app', name: 'Web Applications'},
  {link:'/others-products', name: 'Others'},
]



export const ARTICLES : ARTICLEINFO[] = [
//   { id: '', title: '', category: '', content: ''},
//   { id: '01', title: 'Good morning, Wrold', category: 'portfolios' },
//   { id: '02', title: 'Hello, Wrold', category: 'blogs' },
//   { id: '03', title: 'Good night, Wrold', category: 'blogs' },

]

export const  SPOTIFYAPISEARCH: APISEARH[] = [
  { active: 'active', page: '', name: 'Search Top', val: 'top', index: '0', disable: false, },
  { active: '', page: '', name: '', val: '', index: '0', disable: false, },
  // { active: '', page: '', name: '', val: '', index: '-1', disable: true, },
  // { active: '', page: '', name: '', val: '', index: '-1', disable: true, },
]