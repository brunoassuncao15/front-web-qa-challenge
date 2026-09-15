# PlayLab — Front Web Quality Engineering Challenge


## Descrição da solução

A suíte automatizada foi desenhada para priorizar fluxos de alto valor de negócio e componentes de maior risco técnico, mantendo o código limpo, sustentável e imune a *flakiness*.

---

## Aplicação utilizada

A aplicação [PlayLab](https://playwrightlab.github.io/) é um ambiente administrativo que contém componentes interativos complexos como tabelas de dados paginadas, formulários com validação, componentes assíncronos e interfaces responsivas. 

---

## Escopo e Cenários Automatizados

Conforme os requisitos do desafio, foram selecionados **7 cenários estratégicos** cobrindo todas as categorias obrigatórias:

| ID | Categoria | Cenário | Prioridade | Impacto | Justificativa Técnica |
|---|---|---|---|---|---|
| **USR-03** | Tabela de Usuários | Localizar usuário via campo de busca/filtro | **P0** | Crítico | Core business: garante a filtragem e atualização reativa da tabela. |
| **USR-05** | Tabela de Usuários | Ordenar registros clicando no cabeçalho | **P1** | Alto | Valida a manipulação dinâmica do DOM e a reordenação correta dos dados. |
| **USR-08** | Tabela de Usuários | Criar/Editar/Deletar um registro na tabela | **P0** | Crítico | Valida o ciclo de ações diretas na listagem e alteração de estado. |
| **FRM-01** | Formulário | Submeter o formulário com dados válidos | **P0** | Crítico | Garante que a funcionalidade de registro está submetendo sem perda de cadastro de novos usuarios.
| **FRM-02** | Formulário | Submissão inválida sem campos obrigatórios | **P0** | Crítico | **Cenário Negativo**: garante que os alertas de erro e bloqueio funcionam. |
| **DYN-01** | Assíncrono | Aguardar e interagir com elemento dinâmico | **P1** | Alto | Valida a sincronização reativa sem esperas fixas (`sleep`). |
| **A11Y-06**| Acessibilidade | Auditoria automatizada de regras WCAG 2.1 AA | **P1** | Alto | Varredura de conformidade e inclusão utilizando o engine Axe-core. |
| **RSP-02** | Responsividade | Executar jornada crítica sob resolução Mobile | **P1** | Alto | Garante a usabilidade da tabela e busca em emulação do Pixel 5. |
| **LOG-01** | Autenticação | Fazer login com credenciais válidas | **P0** | Crítico | Valida a autenticação bem-sucedida e a exibição das mensagens de boas-vindas e sessão ativa.
| **LOG-02** | Autenticação | Tentar login com credenciais inválidas | **P0** | Crítico | Garantia de segurança e validação da exibição da mensagem de erro de autenticação. 

---

## Stacks Utilizadas

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Framework E2E:** [Playwright Test](https://playwright.dev/)
* **Análise de Acessibilidade:** [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright)
* **Design Pattern:** Page Object Model (POM)
* **CI/CD:** GitHub Actions
* **Gerenciamento de Código:** Git e GitHub

---

## Pré Requisitos

* Node.js: Versão 18.0.0 ou superior
* npm: Versão 9.0.0 ou superior

---

## Instrução de instalação

* Clone este repositório
* Instale as dependências da aplicação: npm install
* Instale os navegadores gerenciados pelo Playwright: npm run test:install

---

## Instrução de execução

* Executar todos os testes: npm run test
* Executar os testes em modo interativo: npm run test:ui
* Executar testes em um navegador específico (Chromium/Firefox): npm run test:chromium/ npm run test:firefox
* Executar apenas testes em resolução Mobile: npm run test:mobile
---

## Geração e Abertura de Relatório

* Abrir o relatório de testes HTML: npm run test:report
---

## Arquitetura do Projeto

A estrutura foi organizada seguindo o padrão **Page Object Model (POM)** com separação clara de responsabilidades:

```text
front-web-qa-challenge/
├── .github/
│   └── workflows/
│       └── tests.yml
├── docs/
│   ├── estrategia-de-testes.md
│   └── matriz-de-cenarios.md
├── src/
│   ├── data/
│   └── pages/
│       ├── base.page.ts
│       ├── dynamic-content.page.ts
│       ├── form.page.ts
│       ├── login.page.ts
│       └── users.page.ts
├── tests/
│   ├── accessibility.spec.ts
│   ├── dynamic.spec.ts
│   ├── form.spec.ts
│   ├── login.spec.ts
│   ├── responsive.spec.ts
│   └── users.spec.ts
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```
--- 

## Estratégia de Seletores

Para evitar a fragilidade causada por alterações no layout CSS ou na estrutura HTML, adota-se a seguinte ordem de preferência:

* Padrão de Acessibilidade / Roles: page.getByRole(), page.getByLabel(), page.getByPlaceholder()
* Identificadores Dedicados: page.getByTestId()
* Texto Significativo: page.getByText()

---

## Estratégia de Sincronização

* Zero Esperas Estáticas: O uso de waitForTimeout() é estritamente proibido.
* Auto-Waiting: Utilização nativa das Web-First Assertions do Playwright (ex: expect(locator).toBeVisible()), que realizam retries automáticos aguardando o elemento estar no estado pronto/operável.

--- 

## Estratégia de Dados de Teste

A estratégia de dados de teste foi definida para garantir cobertura realista e representativa dos cenários esperados em produção, combinando validações positivas e negativas de forma equilibrada. 

Os dados válidos são utilizados para verificar fluxos de sucesso e comportamentos esperados do sistema, como autenticação bem-sucedida, preenchimento correto de formulários e execução normal de regras de negócio. 

Já os dados inválidos são aplicados em cenários de erro, validação e proteção contra entradas inconsistentes, incluindo campos obrigatórios vazios, e-mails malformados, credenciais incorretas, valores fora do padrão esperado e casos de uso que simulam falhas de usuário ou inconsistências de dados. 

Essa abordagem permite validar não apenas o comportamento correto do sistema, mas também sua capacidade de responder de maneira segura, clara e consistente diante de entradas inadequadas.

---

## Decisões Técnicas.

A solução foi implementada utilizando Playwright com TypeScript, escolhendo uma stack que oferece automação web robusta, recursos nativos de auto-waiting, execução em múltiplos navegadores e integração eficiente com testes de interface e comportamento.

O padrão Page Object Model foi adotado para estruturar a automação de forma organizada, separando responsabilidades entre regras de negócio, interações com a interface e os cenários de teste, o que reduz duplicação de código, melhora a manutenção e facilita a escalabilidade da suíte.

Além disso, foram priorizados seletores acessíveis e semânticos, como getByRole, getByPlaceholder e getByTestId, reduzindo a fragilidade dos testes diante de alterações visuais e promovendo maior aderência às boas práticas de acessibilidade e usabilidade.

 A validação de acessibilidade também foi incorporada por meio do Axe, permitindo a verificação automatizada de critérios WCAG em fluxos críticos e fortalecendo a qualidade da experiência para usuários com diferentes necessidades. 
 
 Por fim, os testes foram organizados por fluxo funcional, contemplando autenticação, formulários, gestão de usuários, dinamicidade da interface e responsividade, assegurando uma cobertura mais completa e alinhada aos requisitos de negócio e às expectativas de uso real.
---

## Limitações conhecidas

Ferramentas automatizadas identificam entre 30% e 50% dos problemas de acessibilidade. Validações funcionais de ordem lógica e navegação com leitores de tela reais (NVDA/JAWS) ainda exigem verificação manual suplementar.
---

## Uso de Inteligencia Artificial

A Inteligência Artificial foi empregada como ferramenta de apoio técnico durante o desenvolvimento das seguintes etapas:

* Refatoração e Estruturação de Documentação: Apoio na formatação dos documentos.
* Mensagem de commit: Refatoração da mensagem de commit deixando mais coeso.
* Teste: Apoio no teste dinamico onde a pagina estava abrindo anuncios e perdendo o foco assim quebrando o teste.

### Ferramentas utilizadas

* Gemini - 
* Copilot - 

---

## Próximos Passos

* Implementar testes de Regressão Visual utilizando snapshots estáticos (toHaveScreenshot).
* Adicionar suporte ao navegador WebKit (Safari) na matriz da pipeline.
* Configurar alertas automáticos de falhas na pipeline para canais do Slack/Teams.

---