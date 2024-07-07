import { z } from "zod";

const envSchema = z.object({ 
  CLOUDFLARE_ENDPOINT: z.string().url(),
  CLOUDFLARE_PUBLIC_KEY: z.string(),
  CLOUDFLARE_SECRET_KEY: z.string(),
  CLOUDFLARE_BUCKET_NAME: z.string(),
  DATABASE_URL: z.string().url()
})

export const secret = envSchema.parse(process.env)
