// ============================================================================
// Orchestrator — Parallel Agent Coordinator
// Runs all 4 domain agents in parallel, collects outputs, and scores quality.
// ALL DATA IS SYNTHETIC/MOCK.
// ============================================================================

const financialAgent = require("./financial-agent");
const legalAgent = require("./legal-agent");
const healthcareAgent = require("./healthcare-agent");
const cybersecurityAgent = require("./cybersecurity-agent");
const { scoreOutput } = require("../scoring/quality-engine");

const agents = {
  financial: financialAgent,
  legal: legalAgent,
  healthcare: healthcareAgent,
  cybersecurity: cybersecurityAgent,
};

/**
 * Run a single agent by name, score its output, and return the result.
 * @param {string} agentName — one of: financial, legal, healthcare, cybersecurity
 * @returns {Promise<{agent, markdown, scores, outputPath}>}
 */
async function generateSingle(agentName) {
  const agent = agents[agentName];
  if (!agent) {
    throw new Error(
      `Unknown agent "${agentName}". Valid names: ${Object.keys(agents).join(", ")}`
    );
  }

  const start = Date.now();
  const result = agent.generate();
  const elapsed = Date.now() - start;
  const scores = scoreOutput(result.markdown);

  console.log(`[${result.agent}] Generated in ${elapsed}ms — overall score: ${scores.overall}`);
  return { ...result, scores, elapsedMs: elapsed };
}

/**
 * Run ALL agents in parallel, score each output, and return aggregated results.
 * @returns {Promise<{results: Array, summary: Object}>}
 */
async function generateAll() {
  console.log("=== PRD Writer Agent Team — Parallel Generation ===\n");
  const start = Date.now();

  const results = await Promise.all(
    Object.keys(agents).map((name) => generateSingle(name))
  );

  const totalElapsed = Date.now() - start;

  const summary = {
    totalAgents: results.length,
    totalElapsedMs: totalElapsed,
    averageScore:
      Math.round(
        (results.reduce((sum, r) => sum + r.scores.overall, 0) / results.length) * 10
      ) / 10,
    perAgent: results.map((r) => ({
      agent: r.agent,
      overall: r.scores.overall,
      elapsedMs: r.elapsedMs,
      outputPath: r.outputPath,
    })),
  };

  console.log("\n=== Generation Summary ===");
  console.log(`Agents run   : ${summary.totalAgents}`);
  console.log(`Total time   : ${summary.totalElapsedMs}ms`);
  console.log(`Average score: ${summary.averageScore}/100`);
  console.log("\nPer-agent results:");
  summary.perAgent.forEach((a) => {
    console.log(`  ${a.agent.padEnd(16)} score=${a.overall}  time=${a.elapsedMs}ms  → ${a.outputPath}`);
  });

  return { results, summary };
}

// CLI entry point
if (require.main === module) {
  const target = process.argv[2];
  if (target) {
    generateSingle(target).catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
  } else {
    generateAll().catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
  }
}

module.exports = { generateAll, generateSingle, agents };
