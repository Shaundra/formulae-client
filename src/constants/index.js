export const API_ROOT = 'http://localhost:3000'

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const YTAPILoaded = new Promise( resolve => {
  window.onYouTubeIframeAPIReady = () => resolve(window.YT)
})
