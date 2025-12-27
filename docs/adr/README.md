# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records for the zerotoone.solutions project.

## What is an ADR?

An Architecture Decision Record (ADR) captures an important architectural decision made along with its context and consequences. ADRs help teams:

- Understand why decisions were made
- Onboard new team members
- Revisit and validate past decisions
- Prevent repeating past discussions

## Format

Each ADR follows this structure:

- **Title**: Short, descriptive name
- **Status**: Proposed | Accepted | Deprecated | Superseded
- **Context**: The issue motivating this decision
- **Decision**: The change we're proposing or have agreed to
- **Consequences**: The results of applying this decision
- **Alternatives Considered**: Other options evaluated

## Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [0001](./0001-visitor-experience-quality-measurement-framework.md) | Visitor Experience Journey Quality Measurement Framework | Accepted | 2025-12-26 |

## Creating a New ADR

1. Copy the template from an existing ADR
2. Number it sequentially (next number in sequence)
3. Use format: `NNNN-title-with-hyphens.md`
4. Update this README index
5. Commit with message: `docs: add ADR-NNNN [title]`
