# 🚀 Guia Rápido - GitHub Actions Playwright

## ✅ Workflow Implementado

Este projeto possui **1 workflow GitHub Actions totalmente funcional e executável**:

| Workflow | Arquivo | Status |
|----------|---------|--------|
| **Testes Playwright** | `playwright.yml` | ✅ Ativo |

---

## 🎯 O que é o Workflow

**Playwright Tests** (`playwright.yml`) é um workflow de **automação de testes end-to-end** que:

✅ Executa automaticamente toda vez que há **push** ou **pull request**  
✅ Testa aplicação em **múltiplos navegadores** (Chromium, Firefox, Mobile)  
✅ Gera **relatório HTML interativo** com resultados  
✅ Armazena **artefatos por 30 dias**  
✅ Executa **diariamente às 2 AM UTC** (agendado)

---

## 🔄 Quando Executa

O workflow dispara automaticamente em:

| Evento | Branches | Frequência |
|--------|----------|-----------|
| **Push (Commit)** | main, master, develop | Imediato |
| **Pull Request** | main, master, develop | Imediato |
| **Agendado** | Qualquer branch | Diariamente 2 AM UTC |

---

## 📋 Passo a Passo da Execução

```
1️⃣  Checkout do repositório
        ↓
2️⃣  Instalar Node.js LTS
        ↓
3️⃣  Instalar dependências (npm ci)
        ↓
4️⃣  Instalar navegadores Playwright
        ↓
5️⃣  Executar testes (npm test)
        ↓
6️⃣  Gerar relatório HTML
        ↓
7️⃣  Fazer upload de artefatos
```

---

## 📊 Artefatos Gerados

O workflow cria dois tipos de artefatos:

### 🎨 Relatório Interativo
- **Local**: `playwright-report/`
- **Arquivo**: `index.html`
- **Conteúdo**: 
  - Testes executados com status
  - Screenshots/vídeos de falhas
  - Logs detalhados
  - Timeline de execução

### 📄 Resultados Estruturados
- **Local**: `test-results/`
- **Formato**: XML/JSON
- **Uso**: Integração com ferramentas (SonarQube, Jenkins, etc)

**Retenção**: 30 dias, depois deletados automaticamente

---

## 🚀 Como Usar

### Opção 1: Execução Automática ⚡ (Padrão)
```
1. Faça commit e push para main/master/develop
2. GitHub Actions executa automaticamente
3. Acesse GitHub > Actions para monitorar
```

### Opção 2: Execução Manual 🎮
```
1. Vá para GitHub > Actions
2. Clique em "Playwright Tests"
3. Clique em "Run workflow"
4. Escolha a branch
5. Clique em "Run workflow"
```

### Opção 3: Execução Agendada ⏰
```
Toda noite às 2 AM UTC, o workflow executa automaticamente
(Útil para detectar problemas intermitentes)
```

---

## 📥 Baixar Resultados

### Pelo GitHub

1. **Acesse o workflow**:
   - GitHub > Actions > Playwright Tests

2. **Selecione a execução**:
   - Clique na execução desejada (ou mais recente)

3. **Baixe artefatos**:
   - Seção "Artifacts" mostra downloads disponíveis
   - Clique em cada artefato para baixar
   - Podem levar alguns segundos para compactar

4. **Extraia e visualize**:
   - Descompacte o arquivo `.zip`
   - Abra `index.html` no navegador

### Via Terminal (API GitHub)

```bash
# Ver workflows
gh run list --workflow=playwright.yml

# Baixar artefato
gh run download <run-id> -n playwright-report-ubuntu-latest
```

---

## 🔍 Interpretar Resultados

### Status de Execução

| Status | Significado | Ação |
|--------|-------------|------|
| ✅ Passed | Todos testes passaram | Nenhuma ação necessária |
| ❌ Failed | Alguns testes falharam | Revisar logs e corrigir |
| ⏱️ Timeout | Execução ultrapassou 60 min | Otimizar testes |
| 🚫 Cancelled | Cancelado manualmente | Verificar motivo |

### Revisar Falhas

1. Clique na execução com falha
2. Veja **Logs** para erro específico
3. Baixe **Artefatos** (screenshots/vídeos)
4. Corrija o teste ou aplicação

---

## ⚙️ Configuração

### Arquivo de Configuração
```
.github/workflows/playwright.yml
```

### Parâmetros Principais

```yaml
# Versão do Node
node-version: 'lts/*'       # Sempre LTS mais recente

# Branches monitoradas
branches: [ main, master, develop ]

# Timeout
timeout-minutes: 60         # 1 hora

# Retenção
retention-days: 30          # 30 dias
```

### Modificar Workflow

Para adicionar branch, alterar schedule ou timeout:

1. Edite `.github/workflows/playwright.yml`
2. Faça commit e push
3. Próximas execuções usarão nova configuração

---

## 🛠️ Executar Localmente

Teste os mesmos passos no seu computador:

```bash
# Instalar dependências
npm ci

# Instalar navegadores Playwright
npx playwright install --with-deps

# Executar testes
npm test

# Ver relatório gerado
npm run test:report
```

Isso permite testar antes de fazer push!

---

## ❌ Problemas Comuns

### "Testes passam local mas falham no CI"

**Causa**: Diferença de ambiente  
**Solução**:
```bash
npm ci                                      # Usar lock file
npx playwright install --with-deps         # Instalar browsers com deps
npm test                                   # Testar
```

### "Workflow não encontra arquivos"

**Causa**: `playwright-report/` ou `test-results/` não criados  
**Solução**: Verificar `playwright.config.ts` tem os reporters configurados

### "Timeout de 60 minutos"

**Causa**: Testes muito lentos  
**Solução**:
- Paralelizar mais testes
- Reduzir retry
- Otimizar waitFor

---

## 📈 Exemplo de Resultado

**Relatório HTML contém**:
```
┌─────────────────────────────┐
│ Playwright Test Report      │
├─────────────────────────────┤
│ Total tests: 45             │
│ Passed: 43 ✅              │
│ Failed: 2  ❌              │
│ Skipped: 0 ⏭️              │
│ Duration: 5m 23s ⏱️        │
└─────────────────────────────┘

Screenshots & Videos de Falhas
Logs detalhados
Timeline executada
```

---

## 🎓 Próximas Ações

1. **Fazer push de código** para disparar workflow
2. **Monitorar em GitHub Actions** durante execução
3. **Baixar relatório** após conclusão
4. **Revisar resultados** no HTML interativo

---

## 📚 Recursos

- [README.md](./README.md) - Documentação completa
- [Documentação Playwright](https://playwright.dev)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Playwright Config](../playwright.config.ts)

---

## ✅ Resumo

| Aspecto | Status |
|--------|--------|
| Workflow implementado | ✅ Sim |
| Totalmente funcional | ✅ Sim |
| Documentado | ✅ Sim |
| Pronto para usar | ✅ Sim |

**Próximo passo**: Fazer push e ver workflow executando! 🚀
