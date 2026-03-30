// ============================================================================
// Legal Document Review Agent — PRD Writer Agent Team
// ALL DATA IS SYNTHETIC/MOCK. No real legal cases, firms, or client data.
// Fictional entity names and regulatory references are illustrative only.
// ============================================================================

const fs = require("fs");
const path = require("path");

const AGENT_NAME = "legal-agent";

// Context injection: regulatory and legal knowledge bases
const contextSources = {
  privacy: ["GDPR Articles 1-99", "CCPA/CPRA regulatory text"],
  financial: ["SOX Section 302/404 controls", "Dodd-Frank whistleblower provisions"],
  health: ["HIPAA Privacy Rule (45 CFR 164)", "HITECH Act breach notification"],
  contractLaw: ["UCC Article 2 (Sales)", "Restatement (Second) of Contracts"],
};

// Target personas this PRD serves
const personas = [
  {
    role: "Legal Associate",
    goal: "Review 50+ contracts/week with AI clause extraction",
    pain: "Manual review averages 3.5 hours per contract with 8% miss rate",
  },
  {
    role: "General Counsel",
    goal: "Real-time compliance posture across all jurisdictions",
    pain: "Quarterly manual audits miss emerging regulatory changes",
  },
  {
    role: "Compliance Team Lead",
    goal: "Automated GDPR/CCPA data-subject request fulfillment",
    pain: "Average DSR response time is 18 days vs. 30-day regulatory deadline",
  },
];

function buildExecutiveSummary() {
  return `## Executive Summary\nIronbridge Legal Group (fictional) needs an AI-powered contract review and compliance platform to reduce manual review time by 70%, improve clause detection accuracy to 96%, and automate data-subject request (DSR) processing across GDPR, CCPA, and HIPAA jurisdictions.\n`;
}

function buildProblemStatement() {
  return `## Problem Statement\nIronbridge attorneys manually review an average of 12 contracts/week per associate, with a clause miss rate of 8%. The firm handles 340 DSRs/month with a mean response time of 18 days. Cross-jurisdictional compliance tracking is managed via spreadsheets updated quarterly, creating a 90-day blind spot for regulatory changes.\n`;
}

function buildGoals() {
  return `## Goals & Non-Goals\n### Goals\n- Reduce per-contract review time from 3.5 hours to 45 minutes\n- Achieve 96% clause detection accuracy (indemnity, limitation of liability, IP assignment)\n- Automate 80% of routine DSR fulfillment within 5 business days\n- Provide daily regulatory change alerts across 14 tracked jurisdictions\n\n### Non-Goals\n- Providing legal advice or replacing attorney judgment\n- Handling litigation document discovery (separate product roadmap)\n- Supporting languages other than English and German in v1.0\n`;
}

function buildUserStories() {
  return personas
    .map(
      (p) =>
        `### ${p.role}\n**As a** ${p.role},\n**I want to** ${p.goal.toLowerCase()},\n**So that** I can reduce risk exposure and meet regulatory deadlines consistently.\n\n**Acceptance Criteria:**\n- Extracted clauses are highlighted with confidence scores ≥ 0.85\n- All actions are logged in an immutable audit trail\n- System flags non-standard clauses for human review\n`
    )
    .join("\n");
}

function buildTechnicalArchitecture() {
  return `## Technical Architecture\n- **NLP Engine:** Transformer-based clause extraction model fine-tuned on 50,000 synthetic contract samples\n- **Regulatory Tracker:** Web scraper + NLP pipeline monitoring 14 jurisdiction RSS feeds for regulatory updates\n- **DSR Automation:** Workflow engine (Temporal.io) orchestrating data discovery, redaction, and response generation\n- **Storage:** Encrypted PostgreSQL (AES-256) with row-level security; S3-compatible object store for document originals\n- **API Layer:** REST API with OAuth 2.0 + RBAC; separate admin and reviewer permission tiers\n- **Compliance Dashboard:** React SPA with real-time WebSocket updates on compliance posture scores\n`;
}

function buildMetricsRisksTimeline() {
  return `## Success Metrics\n| Metric | Baseline | Target | Timeframe |\n|---|---|---|---|\n| Contract review time | 3.5 hours | 45 minutes | 4 months |\n| Clause detection accuracy | 92% | 96% | 6 months |\n| DSR response time | 18 days | 5 days | 5 months |\n| Regulatory blind-spot window | 90 days | 1 day | 3 months |\n\n## Risks & Mitigations\n| Risk | Likelihood | Impact | Mitigation |\n|---|---|---|---|\n| NLP model misses critical clause | Medium | Critical | Human-in-the-loop for all high-risk contract types |\n| GDPR regulatory text ambiguity | High | Medium | Legal advisory board reviews AI interpretations quarterly |\n| Document OCR quality on scanned PDFs | Medium | Medium | Confidence threshold; route low-quality scans to manual review |\n| Cross-jurisdiction conflict of laws | Low | High | Jurisdiction-specific rule engines with override capability |\n\n## Timeline\n| Phase | Duration | Deliverables |\n|---|---|---|\n| Requirements & Data Prep | Weeks 1-4 | Annotated training corpus, clause taxonomy, UX designs |\n| MVP (Clause Extraction) | Weeks 5-14 | Contract upload, AI clause highlighting, basic reporting |\n| Beta (DSR Automation) | Weeks 15-22 | DSR workflow, regulatory tracker, compliance dashboard |\n| GA Launch | Weeks 23-28 | Multi-jurisdiction support, audit integrations, SLA monitoring |\n\n## Open Questions\n1. Should the platform support redline generation or only clause extraction in v1.0?\n2. What is the acceptable false-negative rate for indemnity clause detection?\n3. Will Ironbridge require on-premises deployment or is cloud (SOC 2 Type II) acceptable?\n`;
}

function generate() {
  const sections = [
    "# PRD: AI Contract Review & Compliance Platform\n> **DISCLAIMER:** All data in this document is synthetic/mock. Ironbridge Legal Group is a fictional entity. All figures and regulatory scenarios are fabricated for demonstration purposes.\n",
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
