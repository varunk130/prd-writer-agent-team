// ============================================================================
// Risk Coverage Rubric — checks for identified risks with mitigations,
// likelihood/impact ratings, and specificity of risk descriptions
// ============================================================================

const RISK_TABLE_ROW = /\|\s*[^|]+\|\s*(High|Medium|Low|Critical)\s*\|\s*(High|Medium|Low|Critical)\s*\|\s*[^|]+\|/gi;
const RISK_HEADING = /##\s*Risks?(\s*&\s*Mitigations?|\s*and\s*Mitigations?)?/gi;
const MITIGATION_KEYWORDS = /\b(mitigat|fallback|workaround|contingency|rollback|safeguard|circuit.?breaker|human.?in.?the.?loop|redundan|monitor|alert|audit)\b/gi;

/**
 * Score a PRD for risk identification and mitigation coverage.
 * @param {string} markdown
 * @returns {{ score: number, riskCount: number, mitigationKeywords: number, hasRiskSection: boolean }}
 */
function score(markdown) {
  const hasRiskSection = RISK_HEADING.test(markdown);
  RISK_HEADING.lastIndex = 0; // reset regex state

  const riskRows = markdown.match(RISK_TABLE_ROW) || [];
  const riskCount = riskRows.length;

  const mitigationMatches = markdown.match(MITIGATION_KEYWORDS) || [];
  const mitigationKeywords = mitigationMatches.length;

  if (!hasRiskSection) return { score: 0, riskCount: 0, mitigationKeywords: 0, hasRiskSection: false };

  // Scoring: 20% for section presence, 40% for risk count, 40% for mitigation quality
  let sectionScore = 20;
  let countScore = Math.min(40, riskCount * 10); // 4+ risks = full marks
  let qualityScore = Math.min(40, mitigationKeywords * 5); // 8+ keywords = full marks

  const total = Math.round(sectionScore + countScore + qualityScore);

  return { score: Math.min(100, total), riskCount, mitigationKeywords, hasRiskSection };
}

module.exports = { score, RISK_TABLE_ROW, MITIGATION_KEYWORDS };
