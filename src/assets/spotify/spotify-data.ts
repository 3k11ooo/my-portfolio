import { TOKEN, APISEARHSTYLE, SEARCH, HTMLSTYLE } from '../interface';

export const SPOTIFYAPISEARCHSTYLE: APISEARHSTYLE[] = [
  { active: 'active', page: 'page', name: 'Search Top', val: 'top', index: '0', disable: false, },
  { active: '', page: '', name: 'Search Tracks', val: 'tracks', index: '0', disable: false, },
]

export const SEARCHTOP: SEARCH = {
  name: [ 'artists', 'tracks' ],
  term: [ '1 month', '6 months', 'Life time' ]
}

export const TOKENDATA: TOKEN = {
  access_token: null, refresh_token: null, 
}

export const HTMLNONE: HTMLSTYLE = {
  display: 'none',
}

export const HTMLBLOCK: HTMLSTYLE = {
  display: 'block',
}