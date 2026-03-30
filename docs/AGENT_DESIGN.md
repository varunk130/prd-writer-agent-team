# Agent Design: Specialization Approach

## Core Principle

Generic agents produce generic output. Specialized agents produce output that domain experts take seriously.

## Specialization Strategy

Each agent is specialized through **context injection** — a structured prompt layer that gives the agent domain-specific knowledge before it begins generating.

### Context Injection Components

```
┌──────────────────────────────┐
│     Agent Context Window      │
│                               │
│  ┌─────────────────────────┐  │
│  │ Regulatory Standards     │  │
│  │ (e.g., HIPAA, SOX, GDPR)│  │
│  ├─────────────────────────┤  │
│  │ Industry Terminology     │  │
│  │ (domain-specific vocab)  │  │
│  ├─────────────────────────┤  │
│  │ User Personas            │  │
│  │ (realistic stakeholders) │  │
│  ├─────────────────────────┤  │
│  │ Risk Frameworks          │  │
│  │ (MITRE, COSO, etc.)     │  │
│  ├─────────────────────────┤  │
│  │ Success Patterns         │  │
│  │ (industry KPIs/metrics)  │  │
│  └─────────────────────────┘  │
│                               │
│  ┌─────────────────────────┐  │
│  │ PRD Template Structure   │  │
│  │ (shared across agents)   │  │
│  └─────────────────────────┘  │
└──────────────────────────────┘
```

## Agent Profiles

### Financial Analysis Agent
- **Domain**: Investment research automation
- **Standards**: SEC EDGAR filings, Bloomberg API, DCF valuation models
- **Personas**: Buy-side analysts, portfolio managers, compliance officers
- **Risk lens**: Model accuracy, data staleness, regulatory compliance
- **Differentiator**: Understands the tension between analysis speed and accuracy in investment workflows

### Legal Document Review Agent
- **Domain**: Contract analysis and compliance
- **Standards**: GDPR, CCPA, SOX, HIPAA frameworks
- **Personas**: Legal associates, general counsel, compliance teams
- **Risk lens**: Missed clauses, inconsistent playbook application, renewal deadlines
- **Differentiator**: Treats "configurable playbooks" as a first-class feature — legal teams need customizable rules, not one-size-fits-all extraction

### Healthcare Clinical Trials Agent
- **Domain**: Clinical trial management and regulatory submission
- **Standards**: HL7 FHIR, FDA 21 CFR, CDISC
- **Personas**: Clinical research coordinators, principal investigators, regulatory affairs
- **Risk lens**: Patient safety (adverse events), data integrity, submission timeline compliance
- **Differentiator**: Prioritizes patient safety as a non-negotiable constraint that shapes every technical decision

### Cybersecurity Threat Intel Agent
- **Domain**: Threat monitoring, vulnerability analysis, incident response
- **Standards**: MITRE ATT&CK, SIEM/SOAR integration, Zero Trust architecture
- **Personas**: SOC analysts, CISOs, security engineers, compliance auditors
- **Risk lens**: False positives/negatives, response time, coverage gaps
- **Differentiator**: Understands that cybersecurity PRDs must address both the technical detection problem and the organizational response problem

## What Specialization Changes

| PRD Element | Generic Agent | Specialized Agent |
|-------------|---------------|-------------------|
| Problem Statement | "Companies need better document processing" | "Buy-side analysts spend 67% of prep time on data gathering rather than generating alpha" |
| User Story | "As a user, I want to analyze documents" | "As a clinical research coordinator, I want automated adverse event detection so that I can file IND safety reports within the 15-day FDA deadline" |
| Technical Requirements | "Must integrate with APIs" | "Must support HL7 FHIR R4 resources with SMART on FHIR authorization" |
| Risk | "AI might make errors" | "DCF model hallucination could produce valuations outside 2 standard deviations of analyst consensus, requiring human verification gates" |

## Adding New Agents

The system is designed for agent extensibility:

1. Create a new agent file in `/agents/`
2. Define the context injection (standards, personas, risk frameworks)
3. The orchestrator auto-discovers and runs new agents in parallel
4. Quality scoring applies the same 5-dimension rubric

No changes needed to the orchestrator, dashboard, or scoring engine.
