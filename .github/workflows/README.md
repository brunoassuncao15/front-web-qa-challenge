# GitHub Actions Workflows

Este diretório contém os workflows do GitHub Actions configurados para automação de testes e CI/CD.

## 📋 Workflows Disponíveis

### 1. **playwright.yml** - Testes Playwright Automatizados
- **Trigger**: Push e Pull Requests nas branches `main`, `master` e `develop`
- **Agendamento**: Executa diariamente às 2 AM UTC
- **O que faz**:
  - Faz checkout do código
  - Instala dependências Node.js
  - Instala navegadores Playwright
  - Executa todos os testes Playwright
  - Gera e publica relatórios de teste
  - Faz upload dos artefatos (relatório e resultados)

### 2. **accessibility-tests.yml** - Testes de Acessibilidade
- **Trigger**: Push e Pull Requests nas branches `main`, `master` e `develop`
- **O que faz**:
  - Instala dependências
  - Executa testes marcados com `@accessibility`
  - Gera relatório de acessibilidade
  - Permite continuação mesmo com falhas (continue-on-error)

### 3. **quality-check.yml** - Verificação de Qualidade de Código
- **Trigger**: Push e Pull Requests nas branches `main`, `master` e `develop`
- **Componentes**:
  - **Quality Job**: Verifica tipos TypeScript, compila código
  - **Build Job**: Valida instalação Playwright, imprime informações do projeto
- **O que faz**:
  - Verifica compilação TypeScript
  - Valida estrutura do projeto
  - Gera relatórios de cobertura

### 4. **cross-browser.yml** - Testes em Múltiplos Navegadores
- **Trigger**: Push, Pull Requests nas branches `main`, `master` e `develop`
- **Disparo Manual**: Disponível com `workflow_dispatch`
- **Navegadores testados**:
  - 🔵 Chromium
  - 🔴 Firefox
  - 📱 Mobile Chrome
- **O que faz**:
  - Executa testes separados por navegador
  - Coleta resultados de cada navegador
  - Gera sumário consolidado

## 🚀 Como Usar

### Executar um workflow manualmente
1. Vá para a aba **Actions** no repositório GitHub
2. Selecione o workflow desejado
3. Clique em **Run workflow**
4. Escolha a branch e clique em **Run workflow**

### Visualizar resultados
- Cada workflow gera **artefatos** que podem ser baixados
- Os relatórios ficam disponíveis por **30 dias**
- Clique na execução do workflow para ver logs detalhados

### Arquivos de saída
- `playwright-report/`: Relatório HTML interativo dos testes
- `test-results/`: Resultados em XML/JSON para integração

## 📊 Status dos Workflows

Os badges de status podem ser adicionados ao README do projeto:

```markdown
![Playwright Tests](https://github.com/user/repo/actions/workflows/playwright.yml/badge.svg)
![Accessibility Tests](https://github.com/user/repo/actions/workflows/accessibility-tests.yml/badge.svg)
![Quality Check](https://github.com/user/repo/actions/workflows/quality-check.yml/badge.svg)
![Cross-Browser Tests](https://github.com/user/repo/actions/workflows/cross-browser.yml/badge.svg)
```

## 🔧 Configurações

### Variáveis de Ambiente (opcional)
Adicione secrets no Settings > Secrets and variables > Actions:
- `PLAYWRIGHT_TIMEOUT` - Timeout padrão dos testes
- `CI_WEBHOOK_URL` - URL para notificações (opcional)

### Cache de Dependências
Os workflows utilizam cache automático do npm para:
- Acelerar instalações
- Reduzir tempo de execução
- Diminuir uso de banda

## 📝 Customização

Para modificar os workflows:
1. Edite os arquivos `.yml` no diretório `.github/workflows/`
2. Faça push para a branch principal
3. Os workflows serão atualizados automaticamente

## ⚠️ Troubleshooting

### Workflow não executa
- Verifique se a branch existe
- Confirme que o gatilho (on) está correto
- Valide a sintaxe YAML

### Testes falham no CI mas passam localmente
- Verifique versão do Node.js (`node-version: '20.x'`)
- Confira dependências do Playwright
- Valide variáveis de ambiente

### Timeout de testes
- Aumente `timeout-minutes` no workflow
- Otimize os testes para executar mais rápido
- Considere dividir testes em jobs paralelos

## 🔐 Segurança

- Workflows executam em Ubuntu latest (imagem oficial)
- Não compartilham segredos entre jobs por padrão
- Artefatos são retidos por 30 dias e depois deletados automaticamente
- Checkout usa token automático do GitHub (seguro)
