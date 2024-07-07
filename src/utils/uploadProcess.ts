import { randomUUID } from "node:crypto"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { secret } from "../validation/env";
import { PrismaClient } from "@prisma/client";
import cloudFlare from "../libs/cloudFlare";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient()

export const uploadStart = async (file:string, type:string) => { 
  if (!file || file.length === 0 && !type || type.length === 0) throw new Error('This application require the following information (file,type) in the body')

  const identity = randomUUID().concat('-').concat(file)
  const signedUrl = await getSignedUrl(cloudFlare, new PutObjectCommand({ 
    Bucket: secret.CLOUDFLARE_BUCKET_NAME,
    Key: identity,
    ContentType: type,
  }), { expiresIn: 600 })
  
  await prisma.file.create({ 
    data: { 
      key: identity,
      file, 
      contentType: type
    }
  })

  return { url: signedUrl, expires: '10 minutes' }
}