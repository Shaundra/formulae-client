export const API_ROOT = 'http://localhost:3000'

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const AUTH_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).userToken}`
}

export const YTAPILoaded = new Promise( resolve => {
  window.onYouTubeIframeAPIReady = () => resolve(window.YT)
})
