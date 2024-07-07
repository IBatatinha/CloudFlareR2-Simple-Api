import fastify from "fastify";
import { files } from "./routes";

const app = fastify({ logger: true })

app.register(files)

app.listen({ 
  port: 3333, 
  host: '0.0.0.0'
}).then(() => { 
  console.log(`🔥 The application is online in the port :3333`)
})