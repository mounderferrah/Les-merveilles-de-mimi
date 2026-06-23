# ADR 0001 — Adopt AI Operating Model

**Date:** 2026-06-20  
**Status:** Accepted

## Context

Les Merveilles de Mimi predates any structured AI-assisted development workflow. It was built in a single session and committed as a finished baseline. There are no tests, no architectural decision records, no product documentation, and no shared conventions for future work. Future sessions risk inconsistent style, repeated mistakes, and undocumented decisions.

## Decision

Adopt the AI operating model without migrating the existing codebase:

- Install `AGENTS.md` as the single entry point for every AI session.
- Add `docs/` covering architecture, conventions, debt, and product intent.
- Install `.claude/skills/` to encode the core workflow as reusable commands.
- Describe the existing code as it is; do not silently "correct" it in documentation.
- New code follows target conventions (see `docs/conventions/code-style.md` section b); existing code is left alone unless the task is specifically about it.

## Consequences

**Positive:**
- Future sessions start with a shared understanding of the codebase.
- Mistakes get encoded into docs/tests rather than repeated.
- Architectural choices get ADRs going forward — this folder is the record.

**Negative / accepted trade-offs:**
- The existing code does not immediately benefit from target conventions.
- Docs can go stale if sessions skip the Encode step.

## Future ADRs

Any architectural choice that affects more than one file or that a future session might reverse belongs here. Naming: `000N-slug.md`, status: `Proposed | Accepted | Superseded`.
