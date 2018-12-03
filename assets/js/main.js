function filter(type, url) {
  window.location = type ? `${url}/?type=${type}` : url
}