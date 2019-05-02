export const formatDate = (dateStr) => {
  const newDate = new Date(Date.parse(dateStr))
  const options = {year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true}

  return newDate.toLocaleString('en-GB', options)
}

export const fetchJWT = ({url, method='GET', reqBody={}, jwt=''}) => {
  const init = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    method: method,
    body: JSON.stringify(reqBody)
  }

  method = method.toLowerCase()

  if (method === 'get' || method === 'delete') {
    delete init.body;
  } else if (method === 'post' && init.body.id) {
    delete init.body.id;
  }

  if (jwt === '') {
    delete init.headers['Authorization']
  }
  // console.log("HTTPR", url, init)
  return fetch( url, init);
}

export const formatVidTime = (seconds) => {
  seconds = parseInt(seconds)

  let min = Math.floor(seconds / 60).toString()
  min = min.length > 1 ?  min : `0${min}`

  let remSec = (seconds % 60).toString()
  remSec = remSec.length > 1 ?  remSec : `0${remSec}`

  return `${min}:${remSec}`
}
