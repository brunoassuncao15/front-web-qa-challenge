# Estratégia de Testes — PlayLab

## 1. Objetivo

Estabelecer uma abordagem estruturada, sustentável e automatizada para mitigar riscos de negócio e funcionais na camada de apresentação Web, garantindo a confiabilidade da aplicação através de feedback rápido no ciclo de desenvolvimento (SDLC).

---

## 2. Escopo

### 2.1 Dentro do escopo
* **Jornada do Gerenciamento de Usuários:**
  * Busca e filtragem dinâmica de registros.
  * Reordenação de dados por coluna.
  * Validação da paginação e integridade de exibição.
  * Deletar dado e validar resultado.

* **Validações de Formulário:**
  * Validação de campos obrigatórios e mensagens de erro (Cenário Negativo).
  * Submissão com dados válidos e isolamento de massa.

* **Componentes Assíncronos e Dinâmicos:**
  * Sincronização via observação de estado (Web-First Assertions) em componentes com tempo de carregamento variável.

* **Acessibilidade (a11y):**
  * Varredura automatizada contra as diretrizes WCAG 2.1 AA via Axe-core.

* **Responsividade e Cross-Browser:**
  * Execução em resolução Mobile (*Viewport*: Pixel 5 / iPhone 12).
  * Execução multi-navegador nos motores Chromium e Firefox.

* **CI/CD & Evidências:**
  * Execução automatizada via GitHub Actions com geração de relatórios HTML, capturas de tela e gravação de traces sob falha.

### 2.2 Fora do Escopo
* Testes de Carga, Performance ou Estresse (SLA de resposta de servidor).
* Varreduras de Segurança e Penetração (DAST/SAST/OWASP).
* Testes de contrato de API REST (foco exclusivo em camada Front Web).
* Suporte a navegadores legados (ex: Internet Explorer 11).

---

## 3. Riscos Identificados
* Falha na busca ou paginação da tabela impede a localização e gestão de usuários.
* Falha no feedback de erros em formulários leva à frustração e abandono do usuário.
* Componentes que dependem de chamadas de rede ou *timers* podem gerar falhas intermitentes (*flakiness*) caso a sincronização seja frágil.
* Inconformidade com padrões de acessibilidade bloqueia usuários com necessidades especiais e pode violar diretrizes regulatórias.
* Campos sem mascará como numero do cartão tem vulnerabilidade a ataques de injeção de código, especialmente o SQL Injection

---

## 4. Estratégia de Cobertura
* Foco exclusivo nos fluxos críticos do usuário (Busca na Tabela, Submissão Erros em Formulários).
* Validação do layout adaptativo sob *viewports* mimetizando dispositivos móveis.
* Varredura estática e dinâmica de acessibilidade integrada ao fluxo E2E.

---

## 5. Critérios de Priorização
* **Impacto no Negócio / Usuário (Alto, Médio, Baixo):** Qual a severidade caso a funcionalidade falhe completamente em produção?
* **Probabilidade de Falha / Complexidade Técnica (Alta, Média, Baixa):** Qual a frequência de alteração do componente ou complexidade de sua renderização e estado?

### Níveis de Prioridade
* **P0 (Crítico):** Testes de fumaça e regressão primária (*Blockers*). Devem ser automatizados obrigatoriamente e rodar a cada PR.
* **P1 (Alto):** Fluxos de validação de dados, cenários negativos relevantes e componentes com estados dinâmicos.
* **P2 (Médio/Baixo):** Detalhes visuais e cenários marginais que possuem alto custo de manutenção para a automação na camada E2E.

---

## 6. Estratégia de Automação
* Design Pattern: Page Object Model (POM)
* Sincronização e Prevenção de Flakiness
* Seletores de com Atributos de Acessibilidade, Atributos Dedicados a Testes e Texto Visível Significativo.

---

## 7. Navegadores e Resoluções
* Desktop Chromium
* Desktop Firefo
* Mobile Chrome

---

## 8. Critérios de Entrada e Saída

### 8.1 Critérios de Entrada
* A aplicação PlayLab estar acessível via protocolo HTTPS.
* Ambiente Node.js e dependências devidamente instalados no executor.
* Pipeline do GitHub Actions configurada com permissões de leitura/escrita para publicação de artefatos.

### 8.2 Critérios de Saída 
* **100% de aprovação** na execução dos testes automatizados na branch `main`.
* **Zero falhas por flakiness** (testes intermitentes reexecutados e validados).
* **Ausência de violações críticas de Acessibilidade** reportadas pelo `@axe-core/playwright`.
* Relatório HTML e evidências (vídeos/traces) anexados com sucesso nos artefatos da pipeline.

---

## 9. Limitações Conhecidas
* **Acessibilidade Automatizada:** A ferramenta Axe-core identifica entre 30% e 50% dos problemas visuais/estruturais de acessibilidade. A validação manual com leitores de tela (ex: NVDA/JAWS) ainda é indispensável.
* **Massa Dinâmica no Servidor:** Por ser uma aplicação estática hospedada via GitHub Pages, os testes interagem com dados simulados no lado do cliente.

---

## 10. Próximos Passos

### 10.1 Criar matriz de outros cenarios encontrados.
* **Validação login:**
  * Submissão com dados válidos
  * Submissão com dados inválidos (Cenário Negativo).
* **Carrinho de compra:**
  * Adicionar ao carrinho, aplicar cupom de desconto e concluir compra preenchendo dados do cartão.

### 10.2 Implementar o teste automatizado desses cenarios.

---