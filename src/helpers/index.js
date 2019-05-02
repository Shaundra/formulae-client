export const formatDate = (dateStr) => {
  const newDate = new Date(Date.parse(dateStr))
  const options = {year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true}

  return newDate.toLocaleString('en-GB', options)
}
