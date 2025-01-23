import "dotenv/config"
import {z} from "zod"


export const {ADMIN_EMAIL,ADMIN_PASSWORD,HOST,PORT} = z.object({
    HOST:z.string(),
    PORT:z.string(),
    ADMIN_EMAIL:z.string().email(),
    ADMIN_PASSWORD:z.string()
}).parse(process.env)