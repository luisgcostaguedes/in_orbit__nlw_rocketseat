import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)

//este arquivo garante que as variáveis de ambiente estão corretas e que elas existem