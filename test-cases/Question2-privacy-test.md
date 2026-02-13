# Question 2 – Privacy & Security

## Part 1 – Integration Test Case: Prevent Access to Other Members’ Medical Data

### Objective

Verify that a logged-in member cannot access another member’s medical questionnaire, even if they attempt to manipulate the URL or request parameters.

---

### Test Scenario

Two members exist in the system:

- **Member A** → has appointment and questionnaire  
- **Member B** → has appointment and questionnaire  

---

### Preconditions

1. Member A has a valid appointment and questionnaire.
2. Member B has a valid appointment and questionnaire.
3. Member B is logged into the member portal.

---

### Test Steps

1. Login as **Member A**.
2. Open Medical Questionnaire.
3. Copy the questionnaire URL containing the `encounterId`.
4. Logout.

5. Login as **Member B**.
6. Paste Member A’s questionnaire URL into the browser.
7. Attempt to load the page.

---

### Expected Result

The system must prevent access.

Acceptable secure behaviors include:

- Redirect to dashboard
- Show authorization error
- Return HTTP 403 / 401
- Display generic error message

The system **must not**:

- Display Member A’s questionnaire
- Reveal medical answers
- Reveal appointment details
- Return identifiable patient data

---

### Security Rationale

Medical questionnaire data contains sensitive health information.  
If access control is not enforced at the API level, it could allow exposure of protected medical data between members, which would be a critical privacy violation.

This test ensures authorization is validated server-side, not just in the UI.
