import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { secret } from "../validation/env";
import { PrismaClient } from "@prisma/client";
import cloudFlare from "../libs/cloudFlare";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient()

export const generateLink = async (id:string) => {
  if (!id || id.length === 0) throw new Error('Invalid id')

  const image = await prisma.file.findFirst({ where: { id } })

  if (!image) throw new Error('This file ins`t exist')

  const signedUrl = await getSignedUrl(cloudFlare, new GetObjectCommand({
    Bucket: secret.CLOUDFLARE_BUCKET_NAME, 
    Key: image.key
  }), { expiresIn: 7 * 24 * 60 * 60 })

  await prisma.file.update({ 
    where: { 
      id 
    },
    data: { 
      public: `https://pub-bff8f448ece84d1f9e857edc61a839be.r2.dev/${image.key}`,
      private: signedUrl,
      linkLife: '1 week'
    }
  })

  return { url: signedUrl, expires: '1 week' }
  
    
}
