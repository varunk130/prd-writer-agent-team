// ============================================================================
// Quality Scoring Engine — aggregates rubric scores across 5 dimensions
// ALL DATA IS SYNTHETIC/MOCK.
// ============================================================================

const completeness = require("./rubrics/completeness");
const specificity = require("./rubrics/specificity");
const userStories = require("./rubrics/user-stories");
const technicalDepth = require("./rubrics/technical-depth");
const riskCoverage = require("./rubrics/risk-coverage");

const DIMENSION_WEIGHTS = {
  completeness: 0.25,
  specificity: 0.20,
  userStories: 0.20,
  technicalDepth: 0.20,
  riskCoverage: 0.15,
};

/**
 * Score a PRD markdown string across all 5 quality dimensions.
 * @param {string} markdown — full PRD content
 * @returns {{ overall: number, dimensions: Object }}
 */
function scoreOutput(markdown) {
  if (!markdown || typeof markdown !== "string") {
    throw new Error("scoreOutput requires a non-empty markdown string");
  }

  const dimensions = {
    completeness: completeness.score(markdown),
    specificity: specificity.score(markdown),
    userStories: userStories.score(markdown),
    technicalDepth: technicalDepth.score(markdown),
    riskCoverage: riskCoverage.score(markdown),
  };

  const overall = Math.round(
    dimensions.completeness.score * DIMENSION_WEIGHTS.completeness +
    dimensions.specificity.score * DIMENSION_WEIGHTS.specificity +
    dimensions.userStories.score * DIMENSION_WEIGHTS.userStories +
    dimensions.technicalDepth.score * DIMENSION_WEIGHTS.technicalDepth +
    dimensions.riskCoverage.score * DIMENSION_WEIGHTS.riskCoverage
  );

  return { overall, dimensions };
}

// CLI entry point: score all existing PRD files in output/
if (require.main === module) {
  const fs = require("fs");
  const path = require("path");
  const outputDir = path.join(__dirname, "..", "output");

  if (!fs.existsSync(outputDir)) {
    console.log("No output/ directory found. Run `npm run generate` first.");
    process.exit(1);
  }

  const files = fs.readdirSync(outputDir).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    console.log("No PRD files found in output/. Run `npm run generate` first.");
    process.exit(1);
  }

  console.log("=== PRD Quality Scores ===\n");
  for (const file of files) {
    const content = fs.readFileSync(path.join(outputDir, file), "utf-8");
    const result = scoreOutput(content);
    console.log(`${file}`);
    console.log(`  Overall: ${result.overall}/100`);
    for (const [dim, data] of Object.entries(result.dimensions)) {
      console.log(`  ${dim.padEnd(18)} ${data.score}/100`);
    }
    console.log();
  }
}

module.exports = { scoreOutput, DIMENSION_WEIGHTS };
