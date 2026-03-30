// ============================================================================
// Specificity Rubric — checks for concrete numbers, standards, and metrics
// vs. vague language like "improve", "better", "fast"
// ============================================================================

// Patterns that indicate concrete, specific language
const SPECIFIC_PATTERNS = [
  /\d+%/g,                          // percentages
  /\d+\s*(ms|seconds?|minutes?|hours?|days?|weeks?|months?)/gi, // time metrics
  /\d+\s*(req\/min|tps|qps|rps)/gi, // throughput metrics
  /\b(SLA|SLO|SLI)\b/g,            // service level references
  /\b[A-Z]{2,}\s+\d+/g,            // standard references (e.g., "CFR 11", "SOX 302")
  /\b(GDPR|CCPA|HIPAA|SOX|MiFID|FHIR|CDISC|MITRE)\b/g, // named standards
  /\$[\d,.]+[MBKmk]?\b/g,          // dollar amounts
  /\b\d{1,3}(,\d{3})+\b/g,         // large numbers with commas
];

// Patterns that indicate vague, non-specific language
const VAGUE_PATTERNS = [
  /\b(significantly|substantially|greatly|considerably)\b/gi,
  /\b(fast|quick|slow|better|worse|improve|enhance)\b(?!\s*\d)/gi,
  /\b(various|several|many|some|few)\b/gi,
  /\b(as needed|as appropriate|if necessary|where applicable)\b/gi,
  /\b(etc|and so on|and more)\b/gi,
];

/**
 * Score a PRD for specificity of language.
 * @param {string} markdown
 * @returns {{ score: number, specificCount: number, vagueCount: number }}
 */
function score(markdown) {
  let specificCount = 0;
  let vagueCount = 0;

  for (const pattern of SPECIFIC_PATTERNS) {
    const matches = markdown.match(pattern);
    specificCount += matches ? matches.length : 0;
  }

  for (const pattern of VAGUE_PATTERNS) {
    const matches = markdown.match(pattern);
    vagueCount += matches ? matches.length : 0;
  }

  const total = specificCount + vagueCount;
  if (total === 0) return { score: 50, specificCount: 0, vagueCount: 0 };

  const ratio = specificCount / total;
  const score = Math.min(100, Math.round(ratio * 100));

  return { score, specificCount, vagueCount };
}

module.exports = { score, SPECIFIC_PATTERNS, VAGUE_PATTERNS };
