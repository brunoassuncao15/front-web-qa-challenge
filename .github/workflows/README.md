# GitHub Actions Workflows

Este diretório contém o workflow do GitHub Actions configurado para automação de testes.

## 📋 Workflow Disponível

### **playwright.yml** - Testes Playwright Automatizados ✅
- **Status**: ✅ Totalmente funcional
- **Trigger**: Push e Pull Requests nas branches `main`, `master` e `develop`
- **Agendamento**: Executa diariamente às 2 AM UTC
- **O que faz**:
  - Faz checkout do código
  - Instala dependências Node.js (LTS - versão mais recente)
  - Instala navegadores Playwright com dependências do sistema
  - Executa todos os testes Playwright
  - Gera relatórios de teste (HTML interativo)
  - Faz upload dos artefatos para visualização posterior

## 🚀 Como Usar

### Execução Automática
1. Faça **push** de código para `main`, `master` ou `develop`
2. O workflow executará automaticamente
3. Acompanhe em GitHub > **Actions**

### Execução Manual
1. Vá para GitHub > **Actions**
2. Selecione **Playwright Tests**
3. Clique em **Run workflow**
4. Escolha a branch
5. Clique em **Run workflow**

### Agendado
- Executa diariamente às **2 AM UTC**
- Útil para detectar problemas intermitentes

## 📊 Visualizar Resultados

### Durante a execução:
1. GitHub Actions → Workflow
2. Clique no job para ver logs detalhados
3. Veja cada step e seu resultado

### Após conclusão:
1. Acesse aba **Artifacts**
2. Baixe relatórios
3. Abra `index.html` no navegador para interação completa

### Arquivos de saída
- `playwright-report/`: Relatório HTML interativo dos testes
- `test-results/`: Resultados em XML/JSON para integração

## 🔧 Configurações

### Versão do Node.js
- ✅ Usa `lts/*` (Latest LTS)
- ✅ Automaticamente sincronizado
- ✅ Evita problemas de deprecação

### Branches Monitorizadas
```yaml
branches: [ main, master, develop ]
```

### Timeouts
- Timeout: **60 minutos**

### Retenção de Artefatos
- ✅ Artefatos retidos por **30 dias**
- ✅ Artefatos antigos deletados automaticamente
- ✅ Sem custo adicional

## 📊 Status dos Workflows

Badge de status para adicionar ao README:

```markdown
![Playwright Tests](https://github.com/user/repo/actions/workflows/playwright.yml/badge.svg)
```

## 📝 Customização

Para modificar o workflow:
1. Edite `playwright.yml`
2. Faça push para a branch principal
3. O workflow será atualizado automaticamente

### Adicionar nova branch ao trigger
```yaml
on:
  push:
    branches: [ main, master, develop, staging ]
  pull_request:
    branches: [ main, master, develop, staging ]
```

### Alterar schedule
```yaml
schedule:
  - cron: '0 2 * * *'  # 2 AM UTC todos os dias
  - cron: '0 14 * * 1'  # 2 PM UTC toda segunda-feira
```

## ⚠️ Troubleshooting

### Workflow não executa
- ✅ Verifique se a branch existe
- ✅ Confirme que o gatilho (on) está correto
- ✅ Valide a sintaxe YAML

### Testes falham no CI mas passam localmente
- ✅ Verifique se está usando a mesma versão de Node.js
- ✅ Instale dependências: `npm ci`
- ✅ Instale browsers: `npx playwright install --with-deps`

### Timeout de testes
- ✅ Aumente `timeout-minutes` no workflow
- ✅ Otimize os testes para executar mais rápido
- ✅ Verifique se há testes lentos

### Artefatos não salvos
- ✅ Testes devem criar `playwright-report/` e `test-results/`
- ✅ Verifique configuração em `playwright.config.ts`
- ✅ Logs mostram aviso se diretório não existir

## 🔐 Segurança

- Workflow executa em Ubuntu latest (imagem oficial)
- Não compartilha segredos entre jobs por padrão
- Artefatos são retidos por 30 dias e depois deletados automaticamente
- Checkout usa token automático do GitHub (seguro)
- Nenhuma credencial armazenada em arquivo de configuração

## 🎯 Execução Local

Para testar os mesmos passos localmente:

```bash
# Instalar dependências
npm ci

# Instalar navegadores Playwright
npx playwright install --with-deps

# Executar testes
npm test

# Ver relatório
npm run test:report
```

## 📖 Mais Informações

Documentação GitHub Actions: https://docs.github.com/en/actions


