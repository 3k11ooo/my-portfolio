import { TOKEN, APISEARHSTYLE, SEARCH, HTMLSTYLE, USERINFO } from '../interface';

export const HTMLNONE: HTMLSTYLE = {
  display: 'none',
  active: 'none'
}

export const HTMLBLOCK: HTMLSTYLE = {
  display: 'block',
  active: 'active',
}

export const HTMLTABLE: HTMLSTYLE = {
  display: 'table',
  active: 'active',
}

export const HTMLGRID: HTMLSTYLE = {
  display: 'grid',
  active: 'active',
}
export const SPOTIFYAPISEARCHSTYLE: APISEARHSTYLE[] = [
  { name: 'Search Top', val: 'myTopStyle', style: HTMLBLOCK },
  { name: 'Search Tracks', val: 'tracksStyle', style: HTMLNONE },
  { name: 'Recently played tracks', val: 'recentlyPlayed', style: HTMLNONE },
  { name: 'Playlists', val: 'myPlaylist', style: HTMLNONE },
]

export const SEARCHTOP: SEARCH = {
  name: [ 'artists', 'tracks' ],
  term: [ '1 month', '6 months', 'Life time' ]
}

export const TOKENDATA: TOKEN = {
  access_token: null, refresh_token: null, 
}

export const SEARCHSTYLE: any[] = [
  HTMLBLOCK, 
  HTMLNONE, 
  HTMLNONE,
  HTMLNONE, 
  HTMLNONE, 
  HTMLNONE,
]

export const USERDATA: USERINFO = {
  user_name: null, 
  user_id: null, 
  user_img: null,
  error: false,
} 