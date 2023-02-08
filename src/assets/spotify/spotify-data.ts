import { TOKEN, APISEARHSTYLE, SEARCH, HTMLSTYLE } from '../interface';

export const HTMLNONE: HTMLSTYLE = {
  display: 'none',
}

export const HTMLBLOCK: HTMLSTYLE = {
  display: 'block',
}

export const SPOTIFYAPISEARCHSTYLE: APISEARHSTYLE[] = [
  { active: 'active', page: 'page', name: 'Search Top', val: 'myTopStyle', index: '0', style: HTMLBLOCK },
  { active: '', page: '', name: 'Search Tracks', val: 'tracksStyle', index: '0', style: HTMLNONE },
  { active: '', page: '', name: 'Recently played tracks', val: 'recentlyPlayed', index: '-1', style: HTMLNONE },
  // { active: '', page: '', name: 'Playlists', val: 'myPlaylist', index: '0', style: HTMLNONE },
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

export const user: any = {
  user_name: '', user_id: '', access_token: '', error: false,
} 