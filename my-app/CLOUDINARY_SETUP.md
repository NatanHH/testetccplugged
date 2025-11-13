Guia rápido para configurar o Cloudinary (projeto: my-app)

O que o código espera

- Você pode fornecer as credenciais de duas formas:
  1. Uma variável única: CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
  2. Ou as variáveis separadas: CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME

Passos recomendados (Windows PowerShell)

1. Criar um arquivo `.env.local` na raiz do diretório `my-app` (onde está o package.json).

   - Copie o arquivo `.env.local.example` existente e preencha com seus valores reais.

   Exemplo (substitua pelos seus valores reais):
   CLOUDINARY_URL=cloudinary://SEU_API_KEY:SEU_API_SECRET@SEU_CLOUD_NAME

   Ou (forma separada):
   CLOUDINARY_API_KEY=SEU_API_KEY
   CLOUDINARY_API_SECRET=SEU_API_SECRET
   CLOUDINARY_CLOUD_NAME=SEU_CLOUD_NAME

2. Reiniciar o servidor de desenvolvimento:

   - No PowerShell, dentro de `my-app`:

     npm run dev

   - Se o servidor já estava rodando, finalize e inicie novamente para que o Next.js carregue as novas variáveis.

3. Teste prático (criar atividade com anexos):
   - Abra a página de administração (`/pginicialadm`) no navegador.
   - Preencha os campos e anexe arquivos, então envie.
   - No console do servidor (onde você executou `npm run dev`) você deverá ver logs relacionados ao upload e, se tudo der certo, os URLs retornados pelo Cloudinary.

Dicas de debugging

- Se os uploads falharem e o log indicar ausência de variáveis (o código imprime a presença booleana das variáveis), verifique se o `.env.local` está na raiz correta e se você reiniciou o servidor.
- Para testar temporariamente sem criar `.env.local`, você pode executar no PowerShell (substitua os valores):

  $env:CLOUDINARY_URL = 'cloudinary://SEU_API_KEY:SEU_API_SECRET@SEU_CLOUD_NAME'; npm run dev

  ou, para variáveis separadas:

  $env:CLOUDINARY_API_KEY = 'SEU_API_KEY'; $env:CLOUDINARY_API_SECRET = 'SEU_API_SECRET'; $env:CLOUDINARY_CLOUD_NAME = 'SEU_CLOUD_NAME'; npm run dev

Observação sobre segurança

- Não commit o arquivo `.env.local` com valores reais para o repositório.
- Use `.env.local` apenas localmente; para produção, configure variáveis de ambiente no provedor (Vercel, Netlify, etc.).

Quer que eu faça alguma verificação adicional?

- Posso abrir os arquivos `src/pages/api/atividades/atividade-com-upload.ts` e `src/pages/api/atividades/upload-arquivos-atividade.ts` e mostrar os trechos de configuração/ upload para você confirmar (sem expor segredos).
- Posso também aguardar você colocar as variáveis e, então, tentar um teste de upload e analisar os logs.
