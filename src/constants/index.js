
export const API_ROOT = 'http://localhost:3000'
// export const API_ROOT = 'https://formulae-app-api.herokuapp.com'

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const AUTH_HEADERS = (accessToken) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  // Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).userToken}`
  Authorization: `Bearer ${accessToken}`
})

export const YTAPILoaded = new Promise( resolve => {
  window.onYouTubeIframeAPIReady = () => resolve(window.YT)
})
