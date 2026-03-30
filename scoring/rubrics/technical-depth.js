// ============================================================================
// Technical Depth Rubric — checks for architecture, APIs, constraints,
// and technology-specific references
// ============================================================================

// Indicators of genuine technical depth
const TECH_INDICATORS = [
  { pattern: /\b(API|REST|GraphQL|gRPC|WebSocket)\b/gi, label: "API references", weight: 10 },
  { pattern: /\b(Kafka|RabbitMQ|Redis|Elasticsearch|PostgreSQL|TimescaleDB|Neo4j|S3)\b/gi, label: "Infrastructure components", weight: 15 },
  { pattern: /\b(Kubernetes|EKS|GKE|AKS|Docker|container)/gi, label: "Container/orchestration", weight: 10 },
  { pattern: /\b(JWT|OAuth|TLS|mTLS|RBAC|AES-256|encryption)\b/gi, label: "Security mechanisms", weight: 15 },
  { pattern: /\b(microservice|pipeline|ingestion|ETL|streaming)\b/gi, label: "Architecture patterns", weight: 10 },
  { pattern: /\b(ML|NLP|model|training|inference|FinBERT|BioBERT|transformer)\b/gi, label: "ML/AI specifics", weight: 10 },
  { pattern: /\b(latency|throughput|SLA|rate.?limit|circuit.?breaker|auto.?scal)/gi, label: "Non-functional requirements", weight: 15 },
  { pattern: /\b(FHIR|STIX|TAXII|CDISC|SDTM|HL7)\b/gi, label: "Domain standards", weight: 15 },
];

/**
 * Score a PRD for technical depth.
 * @param {string} markdown
 * @returns {{ score: number, findings: Array<{label: string, count: number}> }}
 */
function score(markdown) {
  let totalWeight = 0;
  let earnedWeight = 0;
  const findings = [];

  for (const indicator of TECH_INDICATORS) {
    totalWeight += indicator.weight;
    const matches = markdown.match(indicator.pattern) || [];
    const count = matches.length;

    if (count > 0) {
      // Partial credit: 1 match = 60% weight, 2 = 80%, 3+ = 100%
      const credit = count >= 3 ? 1.0 : count >= 2 ? 0.8 : 0.6;
      earnedWeight += indicator.weight * credit;
    }

    findings.push({ label: indicator.label, count });
  }

  const score = Math.round((earnedWeight / totalWeight) * 100);
  return { score: Math.min(100, score), findings };
}

module.exports = { score, TECH_INDICATORS };
