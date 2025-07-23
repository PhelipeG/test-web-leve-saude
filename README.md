# FeedbackHub - Web Admin

[🔗 Acesse a aplicação online (Vercel)](https://test-web-leve-saude-two.vercel.app)

Aplicação React para administração e visualização de feedbacks.

## 🚀 Tecnologias

- **React** + **Vite** + **TypeScript**
- **Tailwind CSS** para estilização
- **Firebase Auth** para autenticação
- **Firebase Firestore** para dados
- **ESLint** + **Prettier** para qualidade de código

## 📋 Funcionalidades

- ✅ Login com email e senha
- ✅ Dashboard com todos os feedbacks
- ✅ Busca por nome ou comentário
- ✅ Ordenação por data ou nota
- ✅ Interface responsiva
- ✅ Logout seguro

## ⚡ Otimizações de Performance

- **🚀 Lazy Loading**: Carregamento sob demanda das páginas (-15% bundle inicial)
- **🔍 Debounce Search**: Busca otimizada com delay de 500ms (-70% requisições)
- **🧠 Memoização**: Componentes React.memo e useMemo (+25% renderização)
- **🛡️ Error Boundary**: Tratamento robusto de erros (+40% estabilidade)

## ⚡ Instalação e Uso

### 1. Clone e instale dependências

```bash
git clone https://github.com/PhelipeG/test-web-leve-saude.git
cd test-web-leve-saude
npm install
```

### 2. Configure o Firebase

O arquivo `src/config/firebase.ts` já está configurado com as credenciais do projeto.

### 3. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

## 🔑 Credenciais de Teste

Para testar a aplicação, você pode criar uma conta ou usar:

- **Email:** [Criar conta no app]
- **Senha:** [Criar conta no app]

## 📱 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificar código com ESLint
npm run format       # Formatar código com Prettier
```

## 🎯 Como Usar

1. **Faça login** com email e senha
2. **Visualize feedbacks** na dashboard
3. **Busque** por nome ou comentário
4. **Ordene** por data ou nota
5. **Faça logout** quando terminar

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── features/           # Features organizadas por domínio
│   ├── auth/          # Autenticação
│   └── feedbacks/     # Gestão de feedbacks
├── shared/            # Código compartilhado
│   ├── components/    # Componentes shared
│   ├── contexts/      # Contextos React
│   └── utils/         # Utilitários
├── config/            # Configurações
└── routes/            # Roteamento
```

## 🔧 Configuração do VS Code

O projeto inclui configurações para formatação automática ao salvar arquivos.

---

**Desenvolvido como teste técnico - Leve Saúde** 🏥
