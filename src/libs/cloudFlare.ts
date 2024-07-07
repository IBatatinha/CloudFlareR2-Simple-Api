import { secret } from "../validation/env"
import { S3Client } from "@aws-sdk/client-s3";

const cloudFlare = new S3Client({ 
  region: 'auto', 
  endpoint: secret.CLOUDFLARE_ENDPOINT,
  credentials: { 
    accessKeyId: secret.CLOUDFLARE_PUBLIC_KEY,
    secretAccessKey: secret.CLOUDFLARE_SECRET_KEY
  }
})

export default cloudFlare