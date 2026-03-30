# Architecture: PRD Writer Agent Team

## System Overview

The PRD Writer Agent Team is a multi-agent orchestration system designed to generate production-grade Product Requirements Documents for regulated industries. The system coordinates 4 specialized agents running in parallel, each producing a complete PRD tailored to its domain.

## Design Philosophy

**Why multi-agent over single-agent?**

A single LLM prompt generating PRDs across industries produces generic documents that lack domain depth. By specializing agents, each one carries:
- Industry-specific regulatory knowledge (e.g., HL7 FHIR for healthcare, MITRE ATT&CK for cybersecurity)
- Domain-appropriate user personas and user stories
- Relevant technical integration points
- Industry-standard risk frameworks

This mirrors how product teams actually work — specialized domain expertise combined with shared quality standards.

## Agent Architecture

### Orchestration Layer

The orchestrator manages the lifecycle of all agents:

```
1. Initialize agents with domain-specific context
2. Execute all agents in parallel (Promise.all)
3. Collect outputs as structured markdown
4. Run quality scoring engine on each output
5. Assemble dashboard data model
```

Key property: **agents are stateless and independent**. No agent references another agent's output. This enables:
- True parallel execution
- Independent failure handling (one agent failing doesn't block others)
- Easy addition of new agents without modifying existing ones

### Agent Specialization

Each agent receives a context injection containing:

| Context Component | Purpose |
|-------------------|---------|
| Regulatory standards | Ensures compliance references are accurate |
| Industry terminology | Produces documents that read naturally to domain experts |
| Typical user personas | Generates realistic user stories |
| Risk frameworks | Identifies domain-appropriate risks |
| Success metric patterns | Defines measurable outcomes relevant to the industry |

### Quality Scoring Engine

Every generated PRD is evaluated across 5 dimensions:

1. **Completeness** (0-100): Are all expected PRD sections present and substantive?
2. **Specificity** (0-100): Does the PRD use concrete numbers, standards, and frameworks rather than vague language?
3. **User Stories** (0-100): Are user stories well-formed (As a... I want... So that...) with acceptance criteria?
4. **Technical Depth** (0-100): Does the technical section address architecture, integrations, and constraints?
5. **Risk Coverage** (0-100): Are risks identified with mitigation strategies and ownership?

Scores are computed independently — there is no overall score that hides dimensional weaknesses.

## Data Flow

```
User triggers generation
        │
        ▼
┌─────────────────┐
│   Orchestrator   │
│                  │
│  ┌──┐┌──┐┌──┐┌──┐  (parallel)
│  │FA││LG││HC││CS│
│  └──┘└──┘└──┘└──┘
│        │         │
│        ▼         │
│  Quality Scoring  │
│        │         │
│        ▼         │
│  Dashboard Data  │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│   React Dashboard │
│                   │
│  • Agent Cards    │
│  • Score Cards    │
│  • PRD Viewer     │
│  • Compare View   │
│  • Export         │
└───────────────────┘
```

## Dashboard Architecture

The dashboard is a React application with these key components:

- **AgentCards**: Overview of all 4 agents with status, word count, and domain tags
- **QualityScorecard**: Visual display of 5-dimension scores per agent
- **PRDViewer**: Full PRD rendering with section navigation
- **CompareView**: Side-by-side comparison with synchronized scrolling
- **ExportButtons**: PDF and Word document generation from markdown source

### State Management

Dashboard state is minimal and local:
- Selected agent (for single view)
- Selected agents pair (for comparison view)
- Active section (synchronized across views)
- View mode (single vs. compare)

No external state management needed — the data is static once generated.

## Extension Points

The architecture supports several planned extensions:

1. **New agents**: Add a new agent file + context injection. No orchestrator changes needed.
2. **Custom scoring rubrics**: Swap or extend the 5-dimension model.
3. **Human-in-the-loop**: Insert an approval step between generation and dashboard display.
4. **MCP integration**: Connect agents to live data sources for real-time context.
