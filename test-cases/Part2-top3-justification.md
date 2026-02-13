# Question 1 – Part 2   
## Justification for Top 3 Most Important Test Cases

Below are the three most important test cases from Part 1, along with the reasoning behind their prioritization.

---

## 1. TC01 – Successful End-to-End Booking (Happy Path)

This test case validates the complete booking journey from plan selection through payment and dashboard confirmation.

Why this is critical:

- This is the core business flow.
- If this fails, the company cannot generate revenue.
- It validates integration between:
  - Plan selection
  - Scheduling system
  - Payment provider (Stripe)
  - Appointment creation
  - Medical questionnaire trigger

If this flow breaks at any point, the user experience is impacted directly and revenue is lost. That is why this is ranked as the highest priority.

---

## 2. TC02 – Payment Decline Does Not Create Appointment

This test ensures that when a payment fails, the system does not accidentally create an appointment.

Why this is critical:

- Prevents revenue leakage.
- Protects against unpaid bookings.
- Maintains booking data integrity.
- Avoids operational confusion at imaging centers.

If an appointment is created without a successful payment, it creates financial and scheduling risks. From a business and compliance perspective, this scenario must behave correctly.

---

## 3. TC03 – Duplicate Booking Prevention

This test verifies whether the system prevents or properly handles multiple bookings for the same time slot.

Why this is critical:

- Protects scheduling accuracy.
- Prevents slot conflicts.
- Avoids double-booking imaging centers.
- Reduces operational and customer service issues.

During testing, I was able to attempt booking multiple appointments for similar time windows. The system allowed multiple bookings, which may be intentional. However, this behavior must be clearly defined and validated to avoid operational risk.

---

These three scenarios were prioritized based on business impact, financial risk, data integrity, and operational stability.
