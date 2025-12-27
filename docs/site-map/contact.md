# Contact (/contact) - "Let's Build Something Together"

**Route:** `/contact`

**File:** `src/routes/contact/+page.svelte`

**Last Updated:** 2025-12-26

---

## Purpose & Ethos

### Primary Purpose
**Convert interested visitors into conversations** through a frictionless, routing-aware contact form that handles multiple inquiry types.

### Page Ethos
**"Tell us what you're building. We'll figure out the right approach together."**

- No pressure, no sales pitch
- Flexible engagement (not forcing one model)
- Clear routing based on inquiry type
- Multiple contact methods (form, email, LinkedIn, GitHub)

---

## Target Audiences & Inquiry Types

| Audience | Inquiry Type | Expected Response |
|----------|-------------|-------------------|
| **Enterprise Buyer** | Enterprise Transformation | Assessment call, proposal |
| **Startup Founder (advisory)** | Startup Technology Strategy | Consultation call, retainer discussion |
| **Startup Founder (co-build)** | Venture Building / Co-Building | Partnership call, equity discussion |
| **Seed-Stage Founder** | Incubator Application | Application review, interview |
| **Venture Partner** | Partnership Opportunity | Exploratory call, NDA, diligence |
| **General Inquiry** | General Inquiry | Routing call to right offering |

---

## Form Structure

### 1. Hero
```
Let's Build Something Together

Enterprise platform? New venture? Somewhere in between?
Tell us what you're building, and let's figure it out together.
```

**Ethos:** Inclusive, non-judgmental, flexible

---

### 2. Contact Form

**Field 1: What brings you here?** (Required - Dropdown)
- Enterprise Transformation
- Startup Technology Strategy
- Venture Building / Co-Building
- Incubator Application
- Partnership Opportunity
- General Inquiry

**Field 2: Name** (Required - Text)

**Field 3: Email** (Required - Email)

**Field 4: Company** (Optional - Text)
- For enterprises/startups
- Not required (venture partners might not have company yet)

**Field 5: What are you building?** (Required - Textarea, 6 rows)
- Prompt: "Tell us about your challenge, idea, or project..."
- Minimum characters: 50 (force some detail)

**Submit Button:** "Send Message"

---

### 3. Alternative Contact Methods

```
Prefer a different way?

Email: lussier.romain@gmail.com
LinkedIn: Connect on LinkedIn →
GitHub: View GitHub Profile →

Response time: Usually within 24-48 hours
```

**Ethos:** Some people hate forms—give alternatives

---

### 4. What Happens Next (Process Transparency)

```
What Happens Next?

1. We Review
   We'll read your inquiry and assess how we can help.

2. Initial Call
   If it's a good fit, we'll schedule a 30-minute discovery call.

3. Proposal
   We'll outline an approach, timeline, and how we'd work together.

4. Build
   We start building—whether it's strategy, architecture, or product.
```

**Ethos:** Transparency reduces anxiety, sets expectations

---

## Form Backend Implementation

### Option 1: Formspree (Recommended for MVP)

**Pros:**
- No backend code needed
- Free tier: 50 submissions/month
- Email notifications automatic
- Spam protection built-in

**Setup:**
```svelte
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="hidden" name="_subject" value="New inquiry from zerotoone.solutions" />
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <select name="inquiry_type" required>
    <option value="enterprise">Enterprise Transformation</option>
    <!-- ... -->
  </select>
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

### Option 2: Netlify Forms

**Pros:**
- Free, unlimited submissions
- Integrates with Netlify deployment
- Spam filtering with Akismet

**Setup:**
```svelte
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- form fields -->
</form>
```

### Option 3: Custom API (Future)

**When to use:**
- Need CRM integration (HubSpot, Salesforce)
- Want routing automation
- Need custom validation/logic

**Not needed for MVP**

---

## URL Pre-Fill Support

Allow other pages to pre-select inquiry type:

**Examples:**
- `/contact?type=incubator` → Pre-selects "Incubator Application"
- `/contact?type=enterprise` → Pre-selects "Enterprise Transformation"
- `/contact?type=venture` → Pre-selects "Venture Building / Co-Building"

**Implementation:**
```svelte
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let inquiryType = '';

  onMount(() => {
    const typeParam = $page.url.searchParams.get('type');
    if (typeParam === 'incubator') {
      inquiryType = 'Incubator Application';
    } else if (typeParam === 'enterprise') {
      inquiryType = 'Enterprise Transformation';
    }
    // ... etc
  });
</script>

<select bind:value={inquiryType}>
  <!-- options -->
</select>
```

---

## Form Validation

### Client-Side (Immediate Feedback)
- Name: Required, min 2 characters
- Email: Required, valid format
- Inquiry type: Required
- Message: Required, min 50 characters

### Server-Side (Spam Protection)
- Honeypot field (hidden, should stay empty)
- reCAPTCHA (if spam becomes issue)
- Rate limiting (max 5 submissions per IP per hour)

---

## Success & Error States

### Success State
```
✓ Message Sent!

Thanks for reaching out. We'll review your inquiry and
get back to you within 24-48 hours.

[Back to Home]  [View Portfolio]
```

### Error State
```
✗ Oops! Something went wrong.

Please try again, or email us directly at:
lussier.romain@gmail.com

[Try Again]
```

---

## Email Notification Template

### To: lussier.romain@gmail.com
### Subject: New inquiry from zerotoone.solutions

```
New Contact Form Submission

Inquiry Type: [Enterprise Transformation]
Name: [John Doe]
Email: [john@example.com]
Company: [Acme Corp]

Message:
[User's message here...]

---
Reply directly to this email to respond.
Submitted: [Date/Time]
Source: zerotoone.solutions/contact
```

**Ethos:** All info in one email, easy to respond

---

## Auto-Response Email (Optional)

### To: User's email
### Subject: Thanks for reaching out to Zero to One Solutions

```
Hi [Name],

Thanks for reaching out! We received your inquiry about [inquiry type].

We'll review your message and get back to you within 24-48 hours.
In the meantime, feel free to explore:

- Our Portfolio: https://zerotoone.solutions/portfolio
- How We Work: https://zerotoone.solutions/services
- Our Story: https://zerotoone.solutions/studio

Best,
Romain Lussier
Zero to One Solutions
```

**Ethos:** Immediate acknowledgment, set expectations, provide value (links)

---

## Success Metrics

### Form Performance
- **Form starts:** Track when user begins filling out form
- **Form completion:** > 60% of starts result in submission
- **Field abandonment:** Which field causes most drop-offs?
- **Time to complete:** Average time (expect 2-3 minutes)

### Inquiry Quality
- **Qualified inquiries:** > 75% match an offering
- **Response rate:** 100% get response within 48 hours
- **Conversion to call:** > 40% result in discovery call
- **Spam rate:** < 5% of submissions

### Alternative Methods
- **Email clicks:** > 10% click email link
- **LinkedIn clicks:** > 15% click LinkedIn
- **GitHub clicks:** > 5% click GitHub

---

## Tone & Voice

### Do's ✅
- **Welcoming:** "Tell us what you're building"
- **Flexible:** "Enterprise platform? New venture? Somewhere in between?"
- **Transparent:** "What Happens Next" section
- **No pressure:** "If it's a good fit, we'll schedule a call"

### Don'ts ❌
- **Sales-y:** "Act now!" or "Limited availability!"
- **Demanding:** Requiring phone number, company size, budget
- **Vague:** Not explaining what happens after submission
- **Intimidating:** Making it feel like high-stakes

---

## Mobile Considerations

### Form UX
- Full-width fields on mobile
- Large touch targets (min 44px)
- Native select dropdowns (better UX than custom)
- Textarea auto-expands as user types
- Submit button sticky at bottom (always visible)

### Performance
- Form loads fast (no heavy JS frameworks)
- Validation is instant (client-side first)
- Error messages clear and helpful

---

## Privacy & Data Handling

### Privacy Statement (Below Form)
```
We respect your privacy. Your information will only be used to
respond to your inquiry. We never share or sell contact information.
See our Privacy Policy for details.
```

### Data Storage
- Formspree/Netlify: 30-day retention by default
- Email inbox: Archive after response
- No CRM (yet): Manual tracking in email/spreadsheet

### GDPR Compliance (If Needed)
- Checkbox: "I agree to be contacted about my inquiry"
- Privacy policy link
- Data deletion request process

---

## Related Pages

**Common Paths:**
- Contact → Success → Homepage (satisfied)
- Contact → Success → Portfolio (want to see more)
- Contact → Error → Alternative methods (email, LinkedIn)

**Incoming Links:**
- Homepage → Contact (multiple CTAs)
- Services → Contact (after understanding offerings)
- Portfolio → Contact (after seeing proof)
- Studio → Contact (after learning about approach/incubator)
- Insights → Contact (interested after reading)

**Pre-Fill Links:**
- `/services` (Incubator section) → `/contact?type=incubator`
- `/services` (Enterprise section) → `/contact?type=enterprise`
- `/studio#incubator` → `/contact?type=incubator`

---

## A/B Testing Opportunities

### Test 1: CTA Button Text
- **Version A:** "Send Message"
- **Version B:** "Let's Talk"
- **Metric:** Form submission rate

### Test 2: Message Field Prompt
- **Version A:** "Tell us about your challenge, idea, or project..."
- **Version B:** "What are you building?"
- **Metric:** Field completion rate, message quality

### Test 3: Alternative Contact Placement
- **Version A:** After form (current)
- **Version B:** Before form (some prefer email first)
- **Metric:** Email clicks vs. form submissions

---

## Common Questions & Answers

### Q: "Should we ask for budget/timeline?"
**A:** No, not in initial form. Creates friction. Discuss in discovery call.

### Q: "Should we require phone number?"
**A:** No. Some people prefer email-only initially. Can request in follow-up.

### Q: "What if someone submits spam?"
**A:** Formspree/Netlify have spam protection. If it becomes issue, add honeypot or reCAPTCHA.

### Q: "Should we have separate forms for each inquiry type?"
**A:** No. One form with routing dropdown is cleaner. Separate forms fragment the experience.

---

**Last Updated:** 2025-12-26
