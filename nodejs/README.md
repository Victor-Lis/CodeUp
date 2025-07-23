# Node.js Fastify Prisma Project

Este projeto é uma aplicação Node.js que utiliza Fastify como framework web e Prisma como ORM para interagir com o banco de dados. A estrutura do projeto é organizada em várias pastas para facilitar a manutenção e escalabilidade.

## Estrutura do Projeto

```
nodejs
├── prisma
│   ├── schema.prisma       # Definição do esquema do banco de dados
│   └── migrations           # Migrações do banco de dados
├── src
│   ├── config               # Configurações da aplicação
│   │   └── database.ts      # Configuração da conexão com o banco de dados
│   ├── errors               # Tratamento de erros personalizados
│   │   └── index.ts         # Classes de erro personalizadas
│   ├── lib                  # Bibliotecas auxiliares
│   │   └── prisma.ts        # Inicialização do cliente Prisma
│   ├── middlewares          # Middlewares da aplicação
│   │   └── auth.ts          # Middleware de autenticação
│   ├── routes               # Definição das rotas da aplicação
│   │   └── index.ts         # Rotas da aplicação
│   ├── schemas              # Esquemas de validação
│   │   └── user.ts          # Esquemas de validação para dados do usuário
│   ├── services             # Lógica de negócios
│   │   └── userService.ts    # Serviços relacionados a usuários
│   ├── types                # Tipos e interfaces
│   │   └── index.ts         # Tipos utilizados na aplicação
│   └── app.ts               # Ponto de entrada da aplicação
├── package.json             # Configuração do npm
├── tsconfig.json            # Configuração do TypeScript
└── README.md                # Documentação do projeto
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd nodejs
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure o banco de dados no arquivo `prisma/schema.prisma`.

4. Execute as migrações:
   ```
   npx prisma migrate dev
   ```

5. Inicie a aplicação:
   ```
   npm run dev
   ```

## Uso

A aplicação está configurada para rodar em `http://localhost:3000`. Você pode acessar as rotas definidas no arquivo `src/routes/index.ts`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Abra um pull request ou crie uma issue para discutir mudanças.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.