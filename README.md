# CodeUp 🚀

Uma plataforma completa para desenvolvedores aprimorarem suas habilidades de programação através de desafios práticos.

## 📖 Sobre o Projeto

O CodeUp é uma plataforma educacional que permite aos desenvolvedores:
- Resolver problemas de programação
- Submeter soluções em Python
- Receber feedback automático através de casos de teste
- Acompanhar seu progresso

## 🛠️ Tecnologias Utilizadas

### Frontend (Next.js)
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/UI** - Componentes de interface
- **React Hook Form** - Gerenciamento de formulários
- **TanStack Query** - Gerenciamento de estado servidor
- **Prisma** - ORM para banco de dados

### Backend (PHP)
- **PHP** - Processamento e execução de código Python
- **Python3** - Execução das soluções dos usuários

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de contêineres
- **Firebase Emulator** - Desenvolvimento local

## 🏗️ Estrutura do Projeto

```
codeup/
├── next/                    # Aplicação Frontend (Next.js)
│   ├── src/
│   │   ├── app/            # App Router do Next.js
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── modules/        # Módulos da aplicação
│   │   │   ├── auth/       # Autenticação
│   │   │   ├── challenge/  # Gerenciamento de desafios
│   │   │   ├── dashboard/  # Dashboard principal
│   │   │   └── test-case/  # Casos de teste
│   │   └── hooks/          # Custom hooks
│   ├── prisma/             # Schema do banco de dados
│   └── public/             # Arquivos estáticos
├── php/                     # Serviço de execução de código
│   └── index.php           # API para executar código Python
├── docker-compose.yml       # Configuração dos serviços
└── entrypoint.sh           # Script de inicialização do Firebase
```

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local)
- pnpm (gerenciador de pacotes)

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd codeup
```

### 2. Configure as variáveis de ambiente
```bash
# Copie os arquivos de exemplo
cp .env.example .env
cp next/.env.example next/.env
cp php/.env.example php/.env
```

### 3. Execute com Docker
```bash
docker-compose up --build
```

### 4. Acesse a aplicação
- **Frontend:** http://localhost:3000
- **API PHP:** http://localhost:8080
- **Firebase Emulator:** http://localhost:4000

## 📱 Funcionalidades

### 🔐 Autenticação
- Sistema de login e cadastro
- Proteção de rotas autenticadas
- Gerenciamento de sessão

### 🎯 Desafios
- Criação e gerenciamento de desafios
- Upload de arquivos de problema
- Visualização de desafios disponíveis

### ✅ Casos de Teste
- Criação de casos de teste para cada desafio
- Definição de entrada e saída esperada
- Validação automática das soluções

### 🏃‍♂️ Execução de Código
- Submit de soluções em Python
- Execução segura em container isolado
- Comparação automática com casos de teste
- Feedback detalhado dos resultados

### 📊 Dashboard
- Visualização dos desafios disponíveis
- Histórico de submissões
- Status dos desafios (resolvido/pendente)
- Download de arquivos de problema e soluções

## 🎨 Interface

A aplicação utiliza um tema escuro moderno com:
- Paleta de cores roxa/violeta
- Design responsivo
- Componentes acessíveis
- Animações suaves

## 🔧 Desenvolvimento

### Executar apenas o frontend
```bash
cd next
pnpm install
pnpm dev
```

### Executar testes
```bash
cd next
pnpm test
```

### Build para produção
```bash
cd next
pnpm build
```

## 📝 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Gera build de produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa o linter

## 🌐 Deploy

O projeto está configurado para deploy fácil no Vercel. Consulte a [documentação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença [inserir licença]. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

Desenvolvido com ❤️ para ajudar desenvolvedores a aprimorarem suas habilidades.

---

**CodeUp** - Sua jornada no mundo dev melhora aqui! 🚀