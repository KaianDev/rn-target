# Target - App de Gerenciamento de Metas Financeiras

## 📱 Sobre o Projeto

O **Target** é um aplicativo móvel desenvolvido em React Native que permite aos usuários gerenciar suas metas financeiras de forma simples e intuitiva. Com ele, você pode:

- ✅ Criar e gerenciar metas financeiras
- 💰 Acompanhar o progresso de cada meta
- 📊 Visualizar resumo de entradas e saídas
- 💳 Registrar transações associadas às metas
- 📈 Acompanhar a porcentagem de conclusão das metas

O app oferece uma interface limpa e moderna para ajudar você a manter o controle das suas finanças e alcançar seus objetivos financeiros.

## 🚀 Tecnologias Utilizadas

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Principais Tecnologias

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Linguagem de programação tipada
- **SQLite** - Banco de dados local
- **Expo Router** - Sistema de navegação baseado em arquivos

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (para desenvolvimento Android)
- **Xcode** (para desenvolvimento iOS - apenas macOS)

## 🛠️ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/KaianDev/rn-target.git
cd target
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Execute o projeto

#### Para desenvolvimento geral:

```bash
npm start
# ou
yarn start
```

#### Para Android:

```bash
npm run android
# ou
yarn android
```

#### Para iOS:

```bash
npm run ios
# ou
yarn ios
```

### 4. Acesse o app

- **Mobile**: Use o development build no seu dispositivo ou emulador
- **Android**: Certifique-se de ter o Android Studio configurado
- **iOS**: Certifique-se de ter o Xcode configurado (apenas macOS)

## 📱 Funcionalidades Principais

### 🎯 Gerenciamento de Metas

- Criar novas metas com nome e valor
- Editar metas existentes
- Excluir metas
- Visualizar progresso em tempo real

### 💰 Transações

- Registrar transações (entradas e saídas)
- Associar transações às metas
- Visualizar histórico de transações

### 📊 Dashboard

- Resumo geral das finanças
- Lista de metas ordenadas por progresso
- Percentual de conclusão de cada meta

## 🗂️ Estrutura do Projeto

```
src/
├── app/                 # Páginas da aplicação (Expo Router)
├── components/          # Componentes reutilizáveis
├── database/           # Configuração e hooks do banco de dados
├── enum/               # Enumerações do sistema
├── theme/              # Configurações de tema
└── utils/              # Utilitários e helpers
```

## 🗄️ Banco de Dados

O projeto utiliza **SQLite** local através do Expo SQLite para armazenar:

- **Metas**: nome, valor, data de criação/atualização
- **Transações**: valor, tipo, data, associação com meta

## 📱 Compatibilidade

- **Android**: API 21+ (Android 5.0+)
- **iOS**: iOS 13.0+
- **Web**: Navegadores modernos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido por **Kaian Vasconcelos** - [GitHub](https://github.com/kaiandev)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
