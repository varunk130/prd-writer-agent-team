// ============================================================================
// User Stories Rubric — validates "As a / I want / So that" format
// and checks for acceptance criteria
// ============================================================================

const STORY_PATTERN = /\*\*As a\*\*\s+.+[\s\S]*?\*\*I want to\*\*\s+.+[\s\S]*?\*\*So that\*\*\s+.+/gi;
const ACCEPTANCE_PATTERN = /\*\*Acceptance Criteria:?\*\*/gi;
const CRITERIA_ITEM_PATTERN = /^-\s+.{10,}/gm; // bullet items with at least 10 chars

/**
 * Score a PRD for user story quality.
 * @param {string} markdown
 * @returns {{ score: number, storyCount: number, withAcceptanceCriteria: number, criteriaItems: number }}
 */
function score(markdown) {
  const stories = markdown.match(STORY_PATTERN) || [];
  const storyCount = stories.length;

  const acceptanceSections = markdown.match(ACCEPTANCE_PATTERN) || [];
  const withAcceptanceCriteria = acceptanceSections.length;

  const criteriaItems = (markdown.match(CRITERIA_ITEM_PATTERN) || []).length;

  if (storyCount === 0) return { score: 0, storyCount: 0, withAcceptanceCriteria: 0, criteriaItems: 0 };

  // Scoring: 40% for having stories, 30% for acceptance criteria sections, 30% for criteria detail
  let storyScore = Math.min(40, storyCount * 13); // 3+ stories = full marks
  let acScore = Math.min(30, (withAcceptanceCriteria / Math.max(storyCount, 1)) * 30);
  let detailScore = Math.min(30, criteriaItems * 5); // 6+ criteria items = full marks

  const total = Math.round(storyScore + acScore + detailScore);

  return { score: Math.min(100, total), storyCount, withAcceptanceCriteria, criteriaItems };
}

module.exports = { score, STORY_PATTERN, ACCEPTANCE_PATTERN };
