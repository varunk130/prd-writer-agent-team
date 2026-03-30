// ============================================================================
// Completeness Rubric — checks that all required PRD sections are present
// ============================================================================

const REQUIRED_SECTIONS = [
  { heading: "Executive Summary", weight: 15 },
  { heading: "Problem Statement", weight: 15 },
  { heading: "Goals", weight: 10 },
  { heading: "Non-Goals", weight: 5 },
  { heading: "User Stories", weight: 15 },
  { heading: "Technical Architecture", weight: 15 },
  { heading: "Success Metrics", weight: 10 },
  { heading: "Risks", weight: 5 },
  { heading: "Timeline", weight: 5 },
  { heading: "Open Questions", weight: 5 },
];

/**
 * Score a PRD markdown string for section completeness.
 * @param {string} markdown
 * @returns {{ score: number, missing: string[], present: string[] }}
 */
function score(markdown) {
  const lower = markdown.toLowerCase();
  let earned = 0;
  const missing = [];
  const present = [];

  for (const section of REQUIRED_SECTIONS) {
    if (lower.includes(section.heading.toLowerCase())) {
      earned += section.weight;
      present.push(section.heading);
    } else {
      missing.push(section.heading);
    }
  }

  return { score: earned, missing, present };
}

module.exports = { score, REQUIRED_SECTIONS };
