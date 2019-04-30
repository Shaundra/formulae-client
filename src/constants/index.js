export const API_ROOT = 'http://localhost:3000'

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export const YTAPILoaded = new Promise( resolve => {
  window.onYouTubeIframeAPIReady = () => resolve(window.YT)
})

export const formatDate = (dateStr) => {
  const newDate = new Date(Date.parse(dateStr))
  const options = {year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true}

  return newDate.toLocaleString('en-GB', options)
}
