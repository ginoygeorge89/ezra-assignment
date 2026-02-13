# Question 2 – Privacy & Security Testing

## Part 1 – Integration Test Case  
### Prevent members from accessing other members’ medical data

**Test Objective**  
Verify that a logged-in member cannot access another member’s medical questionnaire by manipulating URLs or request parameters.

**Preconditions**
- Member A exists with a booked appointment and questionnaire
- Member B exists with a booked appointment and questionnaire
- Each member has a unique encounterId(can be found in the url)
- Both users can log into the member portal

**Test Steps**

1. Login as Member A in the member portal  
2. Navigate to dashboard  
3. Click **Begin Medical Questionnaire**  
4. Copy the URL parameter containing `encounterId`  
5. Logout  
6. Login as Member B  
7. Replace Member B’s questionnaire URL with Member A’s encounterId  
8. Open the modified URL  

**Expected Result**

- System blocks access and logs out from the session 
- One of the following should occur:
  
**Security Risk Covered**

This test prevents:
- IDOR (Insecure Direct Object Reference)
- Medical data exposure
- Cross-member data leaks

### Security Rationale

Medical questionnaire data contains sensitive health information.  
If access control is not enforced at the API level, it could allow exposure of protected medical data between members, which would be a critical privacy violation.

This test ensures authorization is validated server-side, not just in the UI.

---

## Part 2 – HTTP Requests to Validate Privacy Enforcement

**The following HTTP requests simulate an attempt to access another member’s questionnaire data.**

# Prerequisite:
1. install postman
2. - Member A exists with a booked appointment and questionnaire
   - Member B exists with a booked appointment and questionnaire
   - Each member has a unique encounterId(can be found in the url)
3. using POST /oauth/token get the following details for both the members:
   - access_token (Bearer token)


### Request 1 – Valid questionnaire access

GET /medical-questionnaire?encounterId={MEMBER_A_ENCOUNTER_ID}
Host: myezra-staging.ezra.com
Authorization: Bearer {MemberA_Token}

Expected Response:
200 OK  
Questionnaire data returned for Member A.

---

### Request 2 – Unauthorized questionnaire access attempt

GET /medical-questionnaire?encounterId={MEMBER_A_ENCOUNTER_ID}
Host: myezra-staging.ezra.com
Authorization: Bearer {MemberB_Token}

Expected Response:
403 Forbidden OR 401 Unauthorized  
No medical data returned.

---

### Request 3 – Backend API validation 

GET /api/encounters/{MEMBER_A_ENCOUNTER_ID}/questionnaire
Authorization: Bearer {MemberB_Token}

Expected Response:
403 Forbidden  
System validates ownership of encounterId.

---

### Security Assertion

The backend must enforce access control based on:
- authenticated user identity
- ownership of encounterId
- role permissions

The frontend alone must not control access.

All sensitive endpoints should validate authorization server-side.

----


