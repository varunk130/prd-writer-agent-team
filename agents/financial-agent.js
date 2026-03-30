// ============================================================================
// Financial Analysis Agent — PRD Writer Agent Team
// ALL DATA IS SYNTHETIC/MOCK. No real financial data, companies, or figures.
// Fictional company names and numbers are used throughout.
// ============================================================================

const fs = require("fs");
const path = require("path");

const AGENT_NAME = "financial-agent";

// Context injection: data sources the agent would consult in production
const contextSources = {
  regulatory: ["SEC EDGAR filings database", "FINRA regulatory feed"],
  market: ["Bloomberg Terminal API", "Reuters Eikon data feed"],
  models: ["Discounted Cash Flow (DCF) engine", "Monte Carlo simulation API"],
  compliance: ["SOX control matrix", "MiFID II reporting templates"],
};

// Target personas this PRD serves
const personas = [
  {
    role: "Buy-Side Analyst",
    goal: "Screen 500+ equities daily with AI-assisted signals",
    pain: "Manual spreadsheet analysis limits coverage to ~40 tickers/day",
  },
  {
    role: "Portfolio Manager",
    goal: "Real-time risk-adjusted portfolio rebalancing",
    pain: "Batch-mode risk reports arrive 4 hours after market close",
  },
  {
    role: "Compliance Officer",
    goal: "Automated pre-trade compliance checks",
    pain: "Manual review bottleneck delays 12% of time-sensitive trades",
  },
];

// PRD section generators (each returns a markdown string)
function buildExecutiveSummary() {
  return `## Executive Summary\nNovaCrest Capital (fictional) requires an AI-powered investment research platform to increase analyst coverage from 40 to 500+ tickers/day while maintaining SOX and MiFID II compliance. The platform integrates DCF models, sentiment analysis on SEC EDGAR filings, and real-time Bloomberg data feeds to deliver actionable buy/sell/hold signals.\n`;
}

function buildProblemStatement() {
  return `## Problem Statement\nAnalysts at NovaCrest spend 6.2 hours/day on manual data gathering, leaving only 1.8 hours for actual analysis. Portfolio managers receive risk reports with a 4-hour lag, missing intraday volatility events. Compliance reviews add 23 minutes per trade, causing 12% of time-sensitive orders to miss optimal execution windows.\n`;
}

function buildGoals() {
  return `## Goals & Non-Goals\n### Goals\n- Reduce data-gathering time by 80% (from 6.2h to 1.2h/day)\n- Deliver real-time risk dashboards with <15-second latency\n- Automate 95% of routine pre-trade compliance checks\n- Achieve 87% precision on AI-generated buy/sell signals (backtested)\n\n### Non-Goals\n- Replacing human judgment in final investment decisions\n- Supporting cryptocurrency or derivatives in v1.0\n- Building a client-facing portal (internal tool only)\n`;
}

function buildUserStories() {
  return personas
    .map(
      (p) =>
        `### ${p.role}\n**As a** ${p.role},\n**I want to** ${p.goal.toLowerCase()},\n**So that** I can focus on high-value analysis instead of manual data processing.\n\n**Acceptance Criteria:**\n- System processes requests within documented SLA\n- Output includes confidence score and source attribution\n- Audit trail captured for every generated recommendation\n`
    )
    .join("\n");
}

function buildTechnicalArchitecture() {
  return `## Technical Architecture\n- **Data Ingestion:** Apache Kafka pipelines consuming SEC EDGAR, Bloomberg B-PIPE, and Reuters Elektron feeds\n- **Processing:** Python microservices on Kubernetes (EKS) running NLP models (FinBERT) for sentiment extraction\n- **Storage:** TimescaleDB for time-series pricing; PostgreSQL for structured entity data\n- **API Layer:** GraphQL gateway with JWT authentication and rate limiting (1000 req/min)\n- **ML Pipeline:** MLflow-managed DCF and Monte Carlo models retrained weekly on 10 years of synthetic historical data\n- **Compliance Engine:** Rule-based engine with 247 pre-configured SOX/MiFID II checks\n`;
}

function buildMetricsRisksTimeline() {
  return `## Success Metrics\n| Metric | Baseline | Target | Timeframe |\n|---|---|---|---|\n| Analyst coverage | 40 tickers/day | 500 tickers/day | 6 months |\n| Risk report latency | 4 hours | 15 seconds | 3 months |\n| Pre-trade compliance auto-rate | 0% | 95% | 6 months |\n| Signal precision (backtested) | N/A | 87% | 9 months |\n\n## Risks & Mitigations\n| Risk | Likelihood | Impact | Mitigation |\n|---|---|---|---|\n| Model drift on volatile markets | High | High | Weekly retraining + drift detection alerts |\n| Bloomberg API rate-limit changes | Medium | High | Local caching layer + fallback to Reuters |\n| SOX audit findings on AI decisions | Medium | Critical | Full decision audit trail + human-in-the-loop |\n| Data pipeline latency spikes | Low | Medium | Auto-scaling Kafka consumers + circuit breakers |\n\n## Timeline\n| Phase | Duration | Deliverables |\n|---|---|---|\n| Discovery & Design | Weeks 1-4 | Architecture doc, data contracts, UX wireframes |\n| MVP (Screening Engine) | Weeks 5-12 | Ticker screening, basic signals, compliance v1 |\n| Beta (Risk Dashboard) | Weeks 13-20 | Real-time dashboard, advanced signals, SOX integration |\n| GA Launch | Weeks 21-26 | Full platform, monitoring, runbooks |\n\n## Open Questions\n1. Will NovaCrest license Bloomberg B-PIPE or use the cheaper Data License product?\n2. Should the compliance engine support custom rule authoring in v1.0?\n3. What is the acceptable false-positive rate for AI-generated sell signals?\n`;
}

function generate() {
  const sections = [
    "# PRD: AI-Powered Investment Research Platform\n> **DISCLAIMER:** All data in this document is synthetic/mock. NovaCrest Capital is a fictional company. All financial figures are fabricated for demonstration purposes.\n",
    buildExecutiveSummary(),
    buildProblemStatement(),
    buildGoals(),
    `## User Stories\n${buildUserStories()}`,
    buildTechnicalArchitecture(),
    buildMetricsRisksTimeline(),
  ];
  const markdown = sections.join("\n");
  const outPath = path.join(__dirname, "..", "output", `prd-${AGENT_NAME}.md`);
  fs.writeFileSync(outPath, markdown, "utf-8");
  return { agent: AGENT_NAME, markdown, outputPath: outPath };
}

module.exports = { generate, AGENT_NAME, personas, contextSources };
