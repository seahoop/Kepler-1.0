# Kepler – Request Flow

The following shows the end-to-end lifecycle of a single request through Kepler.
The same flow applies to both **external (public)** and **internal (authenticated)** access.
Only access policy differs.

---

### 1. User
A user submits a natural-language question.


### 2. Frontend (Website or App)
The frontend:
- Collects the user question
- Optionally includes an `Authorization` JWT
- Does **not** select data
- Does **not** send `tenant_id`

*(question, optional Authorization JWT)*


### 3. API Gateway
- Terminates HTTPS
- Forwards the request to Kepler


### 4. Kepler Backend (AWS Lambda)

#### 4.1 Context Resolution (`resolveContext`)
Kepler determines **who and what this request is allowed to see**:
- Verify JWT (if present)
- Determine access mode:
  - `external` (no JWT)
  - `internal` (valid JWT)
- Resolve `tenant_id`
- Determine access level

If context cannot be resolved, the request **fails closed**.

#### 4.2 Access Policy
Kepler enforces document visibility rules:
- Filter documents by tenant
- Filter documents by access level

#### 4.3 Retrieval Engine
Kepler performs retrieval:
- Vector search scoped to `tenant_id`
- Top-K relevant chunks selected

#### 4.4 Prompt Assembly
Kepler builds a grounded prompt:
- Uses retrieved content only
- Ignores instructions embedded in documents
- Prevents cross-tenant leakage

#### 4.5 Foundation Model API
Kepler:
- Calls the model using tenant-specific credentials
- Streams the response


### 5. Response
The generated answer is streamed back to the frontend.

---
---