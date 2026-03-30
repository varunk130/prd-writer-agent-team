// ============================================================================
// Cybersecurity Threat Intelligence Agent — PRD Writer Agent Team
// ALL DATA IS SYNTHETIC/MOCK. No real threat data, IOCs, or organizations.
// Fictional company names, CVE-like IDs, and attack scenarios throughout.
// ============================================================================

const fs = require("fs");
const path = require("path");

const AGENT_NAME = "cybersecurity-agent";

// Context injection: threat intelligence and security frameworks
const contextSources = {
  frameworks: ["MITRE ATT&CK v14 Enterprise matrix", "NIST CSF 2.0", "CIS Controls v8"],
  platforms: ["SIEM integration (Splunk, Sentinel)", "SOAR playbook engine (Cortex XSOAR)"],
  architecture: ["Zero Trust Architecture (NIST SP 800-207)", "CARTA (Gartner)"],
  feeds: ["STIX/TAXII 2.1 threat feeds", "OSINT aggregation (Shodan, GreyNoise)"],
};

// Target personas this PRD serves
const personas = [
  {
    role: "SOC Analyst (Tier 2)",
    goal: "Triage 300+ daily alerts with AI-prioritized severity scoring",
    pain: "85% of alerts are false positives; mean-time-to-triage is 47 minutes per alert",
  },
  {
    role: "CISO",
    goal: "Executive risk dashboard mapping threats to business impact",
    pain: "Monthly PDF reports lack real-time visibility and board-ready metrics",
  },
  {
    role: "Security Engineer",
    goal: "Automated IOC enrichment and SOAR playbook triggering",
    pain: "Manual IOC lookup across 6 tools averages 12 minutes per indicator",
  },
];

function buildExecutiveSummary() {
  return `## Executive Summary\nSentinelForge Inc. (fictional) requires an AI-powered threat intelligence platform to reduce SOC alert fatigue by 75%, cut mean-time-to-respond (MTTR) from 4.2 hours to 30 minutes, and provide executive-level risk dashboards mapped to MITRE ATT&CK techniques. The platform ingests STIX/TAXII feeds, enriches IOCs via OSINT, and orchestrates response through SOAR playbooks.\n`;
}

function buildProblemStatement() {
  return `## Problem Statement\nSentinelForge's SOC processes 12,000 alerts/week with an 85% false-positive rate. Tier 2 analysts spend 47 minutes triaging each escalated alert, with MTTR at 4.2 hours. IOC enrichment requires manual pivoting across 6 disparate tools. The CISO receives monthly static PDF reports that lack real-time threat-to-business-impact mapping, limiting board-level risk communication.\n`;
}

function buildGoals() {
  return `## Goals & Non-Goals\n### Goals\n- Reduce false-positive rate from 85% to <20% using ML-based alert correlation\n- Cut MTTR from 4.2 hours to 30 minutes via automated triage and SOAR integration\n- Deliver real-time MITRE ATT&CK heat maps with business-impact overlay for executive reporting\n- Automate IOC enrichment to <10 seconds per indicator (from 12 minutes manual)\n\n### Non-Goals\n- Replacing existing SIEM infrastructure (augmentation, not replacement)\n- Offensive security or red-team tooling\n- Endpoint detection and response (EDR) — integrate with existing CrowdStrike deployment\n`;
}

function buildUserStories() {
  return personas
    .map(
      (p) =>
        `### ${p.role}\n**As a** ${p.role},\n**I want to** ${p.goal.toLowerCase()},\n**So that** I can reduce organizational risk and respond to threats faster.\n\n**Acceptance Criteria:**\n- AI severity scores correlate with analyst-confirmed severity ≥ 90% of the time\n- All automated actions are logged with rollback capability\n- Dashboard data refreshes within 60 seconds of new intelligence ingestion\n`
    )
    .join("\n");
}

function buildTechnicalArchitecture() {
  return `## Technical Architecture\n- **Ingestion:** STIX/TAXII 2.1 collectors + Kafka message bus for real-time log streaming from Splunk/Sentinel\n- **ML Correlation Engine:** Graph neural network mapping alert clusters to ATT&CK techniques; trained on 2M synthetic alert records\n- **IOC Enrichment:** Parallel lookup across VirusTotal, Shodan, GreyNoise, AbuseIPDB with <10s SLA via async workers\n- **SOAR Integration:** Bidirectional API with Cortex XSOAR; 45 pre-built playbooks for common ATT&CK techniques\n- **Storage:** Elasticsearch for alert/log indexing; Neo4j graph DB for threat-actor relationship mapping\n- **Zero Trust Layer:** All internal APIs use mutual TLS + SPIFFE identity; no implicit trust between services\n`;
}

function buildMetricsRisksTimeline() {
  return `## Success Metrics\n| Metric | Baseline | Target | Timeframe |\n|---|---|---|---|\n| Alert false-positive rate | 85% | <20% | 6 months |\n| Mean-time-to-respond (MTTR) | 4.2 hours | 30 minutes | 4 months |\n| IOC enrichment time | 12 minutes | <10 seconds | 3 months |\n| ATT&CK technique coverage | 34% | 85% | 9 months |\n\n## Risks & Mitigations\n| Risk | Likelihood | Impact | Mitigation |\n|---|---|---|---|\n| ML model suppresses true-positive alert | Low | Critical | Confidence threshold tuning + mandatory human review for critical assets |\n| STIX/TAXII feed provider outage | Medium | High | Multi-provider redundancy + 72-hour local IOC cache |\n| SOAR playbook triggers unintended block | Medium | High | Dry-run mode for new playbooks + rollback automation |\n| Adversarial evasion of ML detection | Low | High | Adversarial training datasets + quarterly red-team model testing |\n\n## Timeline\n| Phase | Duration | Deliverables |\n|---|---|---|\n| Threat Modeling & Integration Design | Weeks 1-4 | ATT&CK mapping, SIEM/SOAR integration specs, data contracts |\n| MVP (Alert Correlation + IOC Enrichment) | Weeks 5-14 | ML triage engine, IOC lookup service, basic dashboard |\n| Beta (SOAR Playbooks + Executive Dashboard) | Weeks 15-24 | Automated response, ATT&CK heat maps, risk scoring |\n| GA + Purple Team Validation | Weeks 25-30 | Full platform, purple-team exercises, runbooks, training |\n\n## Open Questions\n1. Should the ML model support custom ATT&CK technique weighting per business unit?\n2. Will SentinelForge allow automated blocking actions or require analyst approval for all responses?\n3. What is the retention policy for enriched IOC data (regulatory vs. storage cost trade-off)?\n`;
}

function generate() {
  const sections = [
    "# PRD: AI Threat Intelligence Platform\n> **DISCLAIMER:** All data in this document is synthetic/mock. SentinelForge Inc. is a fictional company. All threat data, IOCs, and security metrics are fabricated for demonstration purposes.\n",
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
