const adr = process.env.VUE_APP_API_HTTP + '://' + process.env.VUE_APP_API_HOST + '/';

const header = {
  "Content-Type": "application/x-www-form-urlencoded",
}

export { adr, header }