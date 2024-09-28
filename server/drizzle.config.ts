import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})

/*aqui se define o arquivo de schema, o arquivo de saída, o dialeto e as credenciais do banco de dados
lembrando que ele vai pegar as credenciais do arquivo env.ts que está na pasta src, credenciais essas que são as variáveis de ambiente e estão no arquivo .env, que não está no repositório por questões de segurança.

*/
