
import dotenv from 'dotenv'

dotenv.config()

const adr = 'https://shielded-ridge-70614.herokuapp.com/';
console.log(process.env)
const header = { 
    "Content-Type": "application/x-www-form-urlencoded"
  }

export { adr, header }