import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { uploadStart } from "../utils/uploadProcess"
import { generateLink } from "../utils/generateLink"

const prisma = new PrismaClient()

export const files = async (fastify:any) => { 
  fastify.get('/cloud', async () => { 
    const cloud:any = []
    const cloudFiles = await prisma.file.findMany()

    if (!cloudFiles || cloudFiles.length === 0) throw new Error('Don`t exist files in the cloud')

    cloudFiles.map((data) => { 
      cloud.push({ id: data.id, file: data.file, type: data.contentType, createAt: data.createAt })
    })

    return cloud
  })

  fastify.post('/cloud/upload', async (request:any) => { 
    const getBodySchema = z.object({ 
      file: z.string().min(1), 
      type: z.string().min(1)
    })

    const { file, type } = getBodySchema.parse(request.body)
    const startUpload = await uploadStart(file, type)

    return startUpload
  })

  fastify.get('/cloud/:id', async (request:any) => { 
    const getParamsSchema = z.object({ 
      id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)
    const startLink = await generateLink(id)

    return startLink
  })

  fastify.get('/cloud/link', async (request:any) => { 
    const cloud:any = []
    const cloudFiles = await prisma.file.findMany()

    if (!cloudFiles || cloudFiles.length === 0) throw new Error('Don`t exist files in the cloud')

    cloudFiles.map((data) => { 
      cloud.push({ file: data.file, public: data.public, private: data.private, expires: data.linkLife })
    })

    return cloud
  })

  fastify.post('/cloud', async (request:any) => { 
    const getBodySchema = z.object({ 
      url: z.string().min(1)
    })

    const { url } = getBodySchema.parse(request.body)

    try {
      const response = await fetch(url);
  
      if (response.ok) {
        return { validate: true };
      } else {
        return { validate: false };
      }
    } catch (err) {
      return err;
    }
  })

  fastify.delete('/cloud/:id', async (request:any) => { 
    const getParamsSchema = z.object({ 
      id: z.string().uuid()
    })

    const { id } = getParamsSchema.parse(request.params)

    const cloudFiles = await prisma.file.delete({ where: { id } })

    if (!cloudFiles) throw new Error('It was not possible delete this file.')

    return { res: 'success' }
  })
}