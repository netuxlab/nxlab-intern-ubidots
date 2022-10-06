import dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import {join} from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname,'/../.env') })
const config = {
  port: process.env.PORT ?? 8000,
  ubidotsToken: process.env.UBIDOTS_TOKEN,
}

export { config }
