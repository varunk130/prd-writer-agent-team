// ============================================================================
// Healthcare Clinical Trials Agent — PRD Writer Agent Team
// ALL DATA IS SYNTHETIC/MOCK. No real patient data, trial IDs, or institutions.
// Fictional organization names, trial identifiers, and clinical figures throughout.
// ============================================================================

const fs = require("fs");
const path = require("path");

const AGENT_NAME = "healthcare-agent";

// Context injection: clinical and regulatory knowledge bases
const contextSources = {
  interoperability: ["HL7 FHIR R4 resource definitions", "SMART on FHIR launch framework"],
  regulatory: ["FDA 21 CFR Part 11 (electronic records)", "ICH E6(R2) GCP guidelines"],
  dataStandards: ["CDISC CDASH v2.2", "CDISC SDTM v2.0", "MedDRA v26.0 coding"],
  trialRegistries: ["ClinicalTrials.gov API", "EU Clinical Trials Register"],
};

// Target personas this PRD serves
const personas = [
  {
    role: "Clinical Research Coordinator",
    goal: "Manage 15+ concurrent trial sites with automated visit scheduling",
    pain: "Manual scheduling across sites causes 22% visit-window violations",
  },
  {
    role: "Principal Investigator",
    goal: "Real-time safety signal detection across all enrolled subjects",
    pain: "Adverse event reports are aggregated monthly, delaying signal detection by 30 days",
  },
  {
    role: "Data Manager",
    goal: "Automated CDISC-compliant data transforms for FDA submission",
    pain: "Manual SDTM mapping takes 6 weeks per study and has a 14% query rate",
  },
];

function buildExecutiveSummary() {
  return `## Executive Summary\nMeridian Health Sciences (fictional) seeks an AI-powered clinical trial management system to reduce visit-window violations by 80%, enable real-time adverse-event signal detection, and automate CDISC SDTM/ADaM dataset generation for FDA submissions. The platform integrates HL7 FHIR for EHR interoperability and complies with FDA 21 CFR Part 11.\n`;
}

function buildProblemStatement() {
  return `## Problem Statement\nMeridian currently manages 23 active trials across 187 global sites. Coordinators manually track 4,200 subject visits/month, resulting in a 22% visit-window violation rate. Safety signals from adverse events are reviewed in monthly aggregate reports, creating a 30-day detection lag. CDISC dataset preparation requires 6 weeks of manual mapping per study with a 14% post-mapping query rate from the FDA.\n`;
}

function buildGoals() {
  return `## Goals & Non-Goals\n### Goals\n- Reduce visit-window violations from 22% to <5% via automated scheduling and reminders\n- Enable real-time (within 4 hours) adverse-event signal detection using NLP on narrative AE reports\n- Automate 90% of SDTM/ADaM dataset generation, reducing preparation time from 6 weeks to 5 days\n- Achieve FDA 21 CFR Part 11 compliance for all electronic records and signatures\n\n### Non-Goals\n- Replacing electronic data capture (EDC) systems (integration, not replacement)\n- Supporting pre-clinical or animal study workflows\n- Providing direct patient-facing interfaces (clinician-only in v1.0)\n`;
}

function buildUserStories() {
  return personas
    .map(
      (p) =>
        `### ${p.role}\n**As a** ${p.role},\n**I want to** ${p.goal.toLowerCase()},\n**So that** I can improve patient safety and accelerate study timelines.\n\n**Acceptance Criteria:**\n- System enforces protocol-defined visit windows with automated alerts\n- All data transformations produce CDISC-compliant output validated by Pinnacle 21\n- Complete audit trail meets 21 CFR Part 11 requirements\n`
    )
    .join("\n");
}

function buildTechnicalArchitecture() {
  return `## Technical Architecture\n- **EHR Integration:** HL7 FHIR R4 APIs connecting to Epic, Cerner, and Medidata Rave via SMART on FHIR\n- **Safety Signal Engine:** NLP pipeline (BioBERT) processing narrative AE reports; statistical disproportionality analysis (PRR, EBGM)\n- **CDISC Automation:** Rule-based + ML mapping engine converting raw CRF data to SDTM/ADaM with Pinnacle 21 validation\n- **Storage:** HIPAA-compliant PostgreSQL with TDE; audit logs in append-only TimescaleDB\n- **Compute:** HIPAA-eligible AWS (GovCloud) with dedicated VPC, KMS encryption, and BAA coverage\n- **API Layer:** RESTful APIs with mutual TLS, OAuth 2.0 + SMART scopes, and RBAC per study/site\n`;
}

function buildMetricsRisksTimeline() {
  return `## Success Metrics\n| Metric | Baseline | Target | Timeframe |\n|---|---|---|---|\n| Visit-window violations | 22% | <5% | 6 months |\n| AE signal detection lag | 30 days | 4 hours | 4 months |\n| SDTM prep time per study | 6 weeks | 5 days | 8 months |\n| FDA query rate on datasets | 14% | <3% | 8 months |\n\n## Risks & Mitigations\n| Risk | Likelihood | Impact | Mitigation |\n|---|---|---|---|\n| EHR FHIR endpoint downtime | Medium | High | Offline queue with retry + manual fallback workflow |\n| NLP misclassifies serious AE as non-serious | Low | Critical | Dual-review: AI flags + mandatory clinician confirmation |\n| 21 CFR Part 11 audit finding | Medium | Critical | Pre-launch mock FDA audit + quarterly compliance reviews |\n| CDISC standard version update mid-study | Low | Medium | Version-pinned mapping configs + migration tooling |\n\n## Timeline\n| Phase | Duration | Deliverables |\n|---|---|---|\n| Discovery & Compliance Mapping | Weeks 1-6 | 21 CFR gap analysis, FHIR integration specs, UX prototypes |\n| MVP (Visit Scheduling + FHIR) | Weeks 7-18 | Automated scheduling, EHR connectivity, basic AE capture |\n| Beta (Safety Signals + CDISC) | Weeks 19-30 | NLP safety engine, SDTM automation, Pinnacle 21 validation |\n| GA + FDA Submission Support | Weeks 31-38 | Full platform, submission-ready datasets, SOPs, training |\n\n## Open Questions\n1. Will Meridian require GxP-validated cloud infrastructure or accept qualified infrastructure?\n2. Should the NLP safety engine support languages beyond English for global trial sites?\n3. What EDC systems beyond Medidata Rave require integration in v1.0?\n`;
}

function generate() {
  const sections = [
    "# PRD: AI Clinical Trial Management System\n> **DISCLAIMER:** All data in this document is synthetic/mock. Meridian Health Sciences is a fictional organization. All trial data, patient counts, and clinical figures are fabricated for demonstration purposes.\n",
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
