# Ezra QA Assignment  
## Part 1 – Booking Flow

This document outlines the most important test cases for the first three steps of the booking flow:

1. Select Plan  
2. Schedule Scan  
3. Payment  

Test cases are ordered from highest business risk to lowest.

---

# Part 1 – 15 Most Important Test Cases (Ranked)

## TC01 – Successful End-to-End Booking (Happy Path)

**Preconditions**
- User has access to the application

**Test Steps**
1. Login to https://myezra-staging.ezra.com/
2. Click on **Book A Scan**
3. Select eligible scan (e.g., MRI Scan)
4. Click Continue
5. Verify redirect to https://myezra-staging.ezra.com/book-scan/schedule-scan
6. Select location
7. Select date
8. Select time
9. Enter valid Stripe test card (4242 4242 4242 4242), Exp, CVV
10. Click Continue
11. Return back to the dashboard

**Expected Result**
1. Dashboard is displayed after login
2. Redirects to https://myezra-staging.ezra.com/book-scan/select-plan
3. Selected plan is highlighted
4. Redirects to schedule page
5. Calendar is populated
6. Selected date is highlighted and opens time slots
7. Selected time slot is highlighted and Continue button is enabled
8. 
9. Payment is processed successfully
10. Confirmation page is displayed
11. Appointment visible on Dashboard and Medical Questionnaire task created

---

## TC02 – Payment Decline Does Not Create Appointment

**Preconditions**
- User has access to the application

**Test Steps**
1. Login to https://myezra-staging.ezra.com/
2. Click on **Book A Scan**
3. Select eligible scan (e.g., MRI Scan)
4. Click Continue
5. Verify redirect to https://myezra-staging.ezra.com/book-scan/schedule-scan
6. Select location
7. Select date
8. Select time
9. Enter Stripe decline card (4000 0000 0000 0002), Exp, CVV
10. Click Continue
11. Return back to the dashboard

**Expected Result**
1. Dashboard is displayed after login
2. Redirects to https://myezra-staging.ezra.com/book-scan/select-plan
3. Selected plan is highlighted
4. Redirects to schedule page
5. Calendar is populated
6. Selected date is highlighted and opens time slots
7. Selected time slot is highlighted and Continue button is enabled
8. 
9. Error message “Your card was declined” is displayed
   - User remains on payment page
   - No confirmation page is shown
11.  No appointment appears on Dashboard

---

## TC03 – Duplicate Booking Prevention

**Preconditions**
- User already has confirmed appointment (**Follow TC01 to book an appointment)** 

**Test Steps**
1. Start a new booking
2. Select same date and time as existing booking
3. Complete payment
4. Navigate to dashboard

**Expected Result**
1. System prevents duplicate booking OR clearly allows multiple bookings intentionally
2. No silent override of existing appointment
3. Dashboard reflects accurate booking state

---

## TC04 – Payment Validation (Incomplete Fields)

**Preconditions**
- User is on payment page(**Follow TC01 to book an appointment)**

**Test Steps**
1. Leave card number blank
2. Leave expiry blank
3. Leave CVV blank
4. Click Continue

**Expected Result**
1. Inline validation appears for each required field
2. Booking does not proceed
3. No confirmation page is displayed

---

## TC05 – Time Slot Required Before Continue

**Preconditions**
- Location selected((**Follow TC01 to book an appointment)**)

**Test Steps**
1. Select date only
2. Do not select time
3. Observe Continue button

**Expected Result**
1. Continue button remains disabled
2. User cannot proceed without selecting time

---

## TC06 – 3 Time Slot Requirement (Request-Based Centers)

**Preconditions**
- **Lookupfield > healthcenter or labs > Configure the settings or enable Multi select option to 3 slots**
- (**Follow TC01 to book an appointment)**

**Test Steps**
1. Select fewer than 3 time slots
2. Attempt to proceed
3. Select exactly 3 time slots
4. Continue booking

**Expected Result**
1. System blocks progression until 3 slots selected
2. Exactly 3 slots required
3. Confirmation reflects selected time slots

---

## TC07 – Plan Substitution Logic

**Preconditions**
- Selected plan not available at chosen facility

**Test Steps**
1. Select MRI Scan
2. Select facility that does not support it
3. Observe substitution modal
4. Click Continue

**Expected Result**
1. Modal clearly explains substitution
2. Plan updates automatically
3. Updated price reflected correctly

---

## TC08 – Back Navigation State Handling

**Preconditions**
- DOB and sex entered
- Plan selected
- User on schedule page

**Test Steps**
1. Click Back
2. Observe plan page

**Expected Result**
1. Redirects back to select plan page
2. DOB and sex persist
3. Plan selection cleared
4. Continue disabled until plan re-selected

---

## TC09 – Cancel Flow Resets Booking State

**Preconditions**
- User on select plan page

**Test Steps**
1. Click Cancel
2. Restart booking

**Expected Result**
1. Redirects to dashboard
2. Session remains active
3. Booking fields cleared when restarted

---

## TC10 – Age-Based CT Restrictions

**Preconditions**
- Enter DOB for age 18–34

**Test Steps**
1. View CT scan options
2. Hover over tooltip

**Expected Result**
1. CT scans disabled
2. Tooltip explains restriction
3. Plans cannot be selected

---

## TC11 – DOB and Sex Field Visibility

**Preconditions**
- User navigates to select plan page

**Test Steps**
1. Open https://myezra-staging.ezra.com/sign-up/select-plan
2. Open https://myezra-staging.ezra.com/book-scan/select-plan
3. Test in incognito

**Expected Result**
1. DOB and sex fields consistently visible
2. No route-specific disappearance

---

## TC12 – Saved Card (Stripe Link) Checkout

**Preconditions**
1. Card previously saved 
   - **Navigate to Accounts > Payment > Enter the card details and save** 
   *There is a bug that after clicking on save, you see an error message but the card details are stored in the backend*
   <img width="2306" height="580" alt="image" src="https://github.com/user-attachments/assets/a46268af-a21a-4709-90a4-974cb8e240cc" />


**Test Steps**
1. Start new booking
2. Reach payment page
3. Confirm masked saved card appears
4. Complete payment

**Expected Result**
1. Saved card appears masked
2. Payment completes successfully
3. Confirmation page displayed
4. Booking appears on Dashboard

---

## TC13 – Save Card Error vs Actual Save Behavior

**Preconditions**
- User attempts to save card

**Test Steps**
1. Trigger save card
2. Observe error message
3. Restart booking

**Expected Result**
1. If error shown, card should not be saved
2. If card saved, no error should be displayed
3. UI state matches backend state

Note: 
*There is a bug that after clicking on save, you see an error message but the card details are stored in the backend*
   <img width="2306" height="580" alt="image" src="https://github.com/user-attachments/assets/a46268af-a21a-4709-90a4-974cb8e240cc" />
---

## TC14 – Reschedule Flow Integrity

**Preconditions**
- Confirmed appointment exists

**Test Steps**
1. Click Reschedule
2. Select new time
3. Submit
4. Return to dashboard

**Expected Result**
1. Appointment updated
2. No duplicate appointment created
3. Dashboard reflects updated time

---

## TC15 – Cancel Appointment Removes Linked Data

**Preconditions**
- Confirmed appointment exists

**Test Steps**
1. Click Cancel
2. Select cancellation reason
3. Confirm cancellation
4. Return to dashboard

**Expected Result**
1. Appointment removed
2. Related Medical Questionnaire removed
3. Other appointments unaffected

---

# Additional Test Cases Considered

The following were tested but not included in the Top 15 due to prioritization of revenue and booking integrity risks.

- Mandatory DOB and Sex validation for new users
- Boundary age validation (17, 18, 34, 35 edge cases)
- Multi-language translation verification across booking flow
- Session timeout and automatic logout behavior
- Direct URL access restriction without completing prior steps

---

# Execution Observations

- No console errors observed while executing the 15 primary test cases.
- Network requests completed successfully with expected status codes.
- User session automatically logs out after predefined inactivity duration.
