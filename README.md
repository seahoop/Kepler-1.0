# Kepler - AI Knowledge Backend

**Kepler** is the backend service powering the Seattle AI Developers AI Knowledge System. 

Kepler enables organizations to interact with their own approved data(documents, policies, websites, contracts, and internal resources) through natural language in a way that is **secure, predictable, and suitable fo daily business operations**.

This system is not a generic chabot.
Kepler is designed as **knowledge infrastructure**: reliable, auditable, and built to operate quietly in real production environments. 


---

## What Kepler Does

Kepler is responsible for:

- Verifying user authentication (AWS Cognito JWTs)
- Resolving tenant identity (`tenant_id`) server-side
- Enforcing tenant isolation and access control
- Retrieving company-approved knowledge using vector search
- Assembling grounded prompts from approved sources only
- Calling foundation model APIs using tenant-specific keys
- Streaming responses to clients
- Logging usage, latency, and retrieval metadata
- Enforcing rate limits and usage tracking

Every request handled by Kepler must include a resolvable organization_id.
Requests without a valid tenant context are rejected and no data is read or written.


---

## What Kepler Does Not Do

Kepler does **not**
- store raw customer documents long-term
- Expose or manage frontend UI
- Train or fine-tune foundation models
- Act as a general-purpose chatbot
- Allow unrestricted browsing or external data access

All responses are grounded **only** in company-approved knowledge. 

---

## High-Level Architecture
Customer Frontend (Vercel) → AWS API Gateway → AWS Lambda (Kepler backend) → Postgres (RDS + pgvector) → S3 (tenant-scoped JSONL data) → AWS Secrets Manager (tenant API keys) → Foundation Model API




## Repository Structure
Kepler-1.0/
- README.md
- docs/
  - overview.md







## Core Design Principles
- **Tenant-first architecture**  
  Every request resolves a server-trusted `tenant_id`. Client-supplied
  tenant identifiers are never trusted.

- **Fail-closed security model**  
  If authentication, tenant resolution, or retrieval fails, Kepler refuses
  to answer.

- **Approved knowledge only**  
  Responses are generated exclusively from curated, approved data sources.

- **Separation of concerns**  
  - Frontend handles UI and user experience
  - Kepler enforces security, retrieval, and generation
  - Storage services hold data and secrets

- **Built for long-term operation**  
  Kepler is designed to be monitored, audited, updated, and maintained
  as long-lived infrastructure.

---
