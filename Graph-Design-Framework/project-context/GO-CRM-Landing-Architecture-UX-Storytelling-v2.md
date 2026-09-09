# GO CRM — Information Architecture, UX Storytelling & Landing Rationale
## Version 2 — September 9 CRM walkthrough grounded

## 1. Product position

**GO CRM is the sales layer inside GO Hub.** Its proven territory is Contacts, Opportunities, Pipeline, Tasks, Follow-up, Conversations, Calendar/Appointments, Workflow Automation and reporting/visibility.

The central product distinction is **Contact ≠ Opportunity**: a Contact is the person record; an Opportunity is a specific sales process attached to that person. One Contact can have multiple Opportunities for different products.

### Core promise
> **Your book of business, one control center.**

### Product idea
> **See your day, not just your list.**

The landing therefore sells continuity across the sales process rather than a list of CRM features.

---

## 2. Verified product story from the walkthrough

The September 9 walkthrough gives us concrete product behavior that should become the basis of the landing:

```text
SOURCE / INTERACTION
      ↓
CONTACT
      ↓
OPPORTUNITY
      ↓
PIPELINE
      ↓
TASK / NOTE / ACTIVITY
      ↓
FOLLOW-UP / CONVERSATION / APPOINTMENT
      ↓
WORKFLOW AUTOMATION
      ↓
OUTCOME
```

Key product truths:

- Contacts can be created automatically through interactions and manually.
- Opportunities may be created through configured workflows from campaigns/channels.
- One Contact can have several Opportunities.
- Opportunities move through customizable pipeline stages.
- SmartTags can update or disappear after time/actions.
- Tasks are reminders/next actions and can be assigned to closers.
- Calendar can connect to an external calendar to avoid scheduling conflicts.
- Workflows can send configurable appointment reminders.
- Conversations unify connected communication channels.
- Contact, Opportunity, Activity, Task and Conversation context can remain linked.
- Workflow automation is a verified product territory.

---

## 3. Positioning guardrails

Do **not** market GO CRM as an AI sales advisor. The walkthrough mentioned AI-related surfaces, but some were described as external, untested, additional-cost or not yet implemented.

Avoid claims around:

- predictive sales intelligence
- AI recommendations
- next-best-action intelligence
- autonomous selling
- AI-powered pipeline decisions

Stay inside:

**pipeline + tasks + follow-up + conversations + calendar + automation.**

---

# 4. Information architecture

```text
01 HERO
02 THE SALES JOURNEY
03 WHERE OPPORTUNITIES COME FROM
04 CONTACT ≠ OPPORTUNITY
05 THE PIPELINE
06 THE WORK BEHIND A SALE
07 YOUR DAY, NOT JUST YOUR LIST
08 CONVERSATIONS
09 CALENDAR + APPOINTMENTS
10 AUTOMATION
11 FROM OPPORTUNITY TO OUTCOME
12 FOR AGENTS
13 FOR AGENCIES
14 THE CONTROL CENTER
15 CAPABILITY SUMMARY
16 EMOTIONAL STATEMENT
17 BEFORE / AFTER
18 GO HUB POSITIONING
19 FINAL CTA
20 FOOTER
```

The ordering follows a learning sequence: **understand the problem → learn the product model → see the work → see the system → resolve the story**.

---

# 5. Section architecture and rationale

## 01 — HERO

### Copy
**GO CRM**

# Your book of business, one control center.

> La capa de venta de GO Hub. Todo lo que pasa antes de que un prospecto se vuelva póliza, en un solo lugar.

CTA: **Avísame cuando esté disponible**

Microcopy: **En construcción. Se libera en go.epicare.com.**

### Layout
12-column editorial composition. Copy on the left, large real dashboard media on the right, cropped and slightly oblique.

### UX reason
The visitor must understand product, territory and value before being asked to explore a long page. Long pages need strong information scent and a reason to continue scrolling.

### Interaction
Cinematic product reveal; slow depth/parallax; no decorative motion unrelated to the UI.

---

## 02 — THE SALES JOURNEY

### Headline
# A sale doesn't happen in one step.

### Layout
Full-screen pinned sequence. The journey advances horizontally while the viewport remains stable.

```text
CONTACT → OPPORTUNITY → PIPELINE → TASK → FOLLOW-UP → APPOINTMENT → OUTCOME
```

### UX reason
This establishes the core mental model before introducing detailed interface controls. The visitor learns the process first.

### Interaction
Each stage activates on scroll. The final stage transitions into many live opportunities, creating the first tension arc: **one sale is a sequence; an agent manages many sequences.**

---

## 03 — WHERE OPPORTUNITIES COME FROM

### Headline
# Every opportunity starts somewhere.

Sources to represent:

**Facebook / Google / WhatsApp / Calls / Forms / Manual**

### Visual
Different input signals converge into Contact and then Opportunity.

### UX reason
Shows that GO CRM is not merely a database. It receives and organizes sales work from multiple sources.

### Media
Short product video or animated flow ending with a newly created opportunity entering the pipeline.

---

## 04 — CONTACT ≠ OPPORTUNITY

### Headline
# One person can mean more than one opportunity.

### Visual narrative
Start with one Contact. Then branch to several Opportunities.

```text
                 CARLOS MARTÍNEZ
                        │
             ┌──────────┼──────────┐
             │          │          │
           Dental      Auto       Life
         Opportunity Opportunity Opportunity
```

### UX reason
This is a genuine product-specific concept. It creates the correct mental model for why Contacts and Opportunities exist as separate objects.

### Interaction
Pinned. Reveal the Contact first, then the opportunities, then the pipeline context.

---

## 05 — THE PIPELINE

### Headline
# See where every opportunity stands.

### Visual
Use the real pipeline interface.

Highlight actual stages, filters and status states where possible.

### Interaction
Pinned product demonstration: selected opportunity → focused stage → status → filters → wider pipeline view.

### UX reason
Move from conceptual model to direct product proof. This is the main functional anchor.

---

## 06 — THE WORK BEHIND A SALE

### Headline
# Every opportunity creates work.

### Visual
Open one real Opportunity and progressively reveal Task, Note, Activity, Call and Follow-up states.

### UX reason
A CRM is valuable because it supports the work around the sale, not just the record itself.

### Media
Real Opportunity-detail screen recording.

---

## 07 — YOUR DAY, NOT JUST YOUR LIST

### Headline
# See your day, not just your list.

### Supporting idea
> Tu pipeline no vive separado de las tareas y seguimientos que hacen avanzar cada oportunidad.

### Visual
Pinned day narrative using real Tasks + Calendar UI.

```text
MORNING → FOLLOW-UPS
MIDDAY → NEW OPPORTUNITIES
AFTERNOON → APPOINTMENTS
LATER → TASKS / NEXT ACTIONS
END OF DAY → PIPELINE
```

### UX reason
This is the emotional product promise. It moves the story from database management to the daily reality of the agent.

### Guardrail
Do not imply AI prioritization. The value is visibility and execution.

---

## 08 — CONVERSATIONS

### Headline
# Every conversation stays connected to the sale.

### Visual
Real Conversations UI with connected channels where actually configured.

### Interaction
Short video: conversation list → open thread → contact context → opportunity context.

### UX reason
The important message is not “we have chat”; it is **the conversation belongs to the sales context**.

---

## 09 — CALENDAR + APPOINTMENTS

### Headline
# Your pipeline meets your calendar.

### Visual narrative
Opportunity → appointment → calendar availability → reminder.

### Interaction
Pinned mini sequence or real calendar video.

### UX reason
Connects the CRM to the agent's actual schedule and demonstrates that appointments are part of the workflow, not isolated events.

---

## 10 — AUTOMATION

### Headline
# Let repeatable work run itself.

### Visual
Real workflow builder.

```text
TRIGGER → CONDITION → ACTION → FOLLOW-UP
```

### Interaction
Pinned build-up. Each node enters as the user scrolls.

### UX reason
Automation is easier to understand as a sequence than as a feature label. This keeps the copy accurate and product-led.

---

## 11 — FROM OPPORTUNITY TO OUTCOME

### Headline
# Follow the whole journey.

Bring back the Opportunity from earlier.

Show accumulated context:

**Source → Contact → Stage → Activity → Task → Conversation → Appointment → Outcome**

### UX reason
Narrative closure. The landing has followed a single sales object across multiple areas of the product.

---

## 12 — FOR AGENTS

### Headline
# Built for agents who need to keep business moving.

Focus on personal pipeline, tasks, follow-up, conversations and calendar.

### UX reason
Translate product architecture into the primary user's day-to-day benefit.

---

## 13 — FOR AGENCIES

### Headline
# Give the whole team visibility.

Focus on assignment, ownership, followers and pipeline visibility.

### UX reason
Shift the scale from **my work → our business**.

---

## 14 — THE CONTROL CENTER

### Headline
# Your business, at a glance.

### Visual
Largest real dashboard moment after the hero.

### Interaction
Slow pull-back / zoom-out revealing the areas introduced earlier.

### UX reason
This is the payoff: the previously separated parts recombine into one coherent control center.

---

## 15 — CAPABILITY SUMMARY

Avoid a generic six-card marketing grid.

Use an editorial summary:

**CONTACTS** — The people entering your system.

**OPPORTUNITIES** — The sales processes attached to them.

**PIPELINE** — Where every opportunity stands.

**TASKS & FOLLOW-UP** — What keeps work moving.

**CONVERSATIONS & CALENDAR** — Where interactions and appointments happen.

**AUTOMATION** — The repeatable workflows behind the process.

### UX reason
By this point the visitor understands why each capability exists, so the summary is consolidation rather than education.

---

## 16 — EMOTIONAL STATEMENT

# You shouldn't have to remember every sale.

Then:

# Your CRM should.

### UX reason
Create a low-density memory anchor after high-density product demonstrations.

---

## 17 — BEFORE / AFTER

### Headline
# Less hunting. More selling.

Before:

Prospects · Tasks · Messages · Notes · Follow-ups

After:

**ONE PIPELINE · ONE WORKFLOW · ONE CONTEXT · ONE CONTROL CENTER**

### Interaction
The fragmented elements physically converge into a single system.

---

## 18 — GO HUB POSITIONING

# GO CRM is the sales layer of GO Hub.

Keep short. GO CRM remains the protagonist.

---

## 19 — FINAL CTA

# Turn every opportunity into a next step.

> A better way to manage the journey from prospect to policy.

CTA: **Avísame cuando esté disponible**

Microcopy: **En construcción. Se libera en go.epicare.com.**

### UX reason
Close on a transformation statement, not a generic “Get started”.

---

# 6. Motion / scroll architecture

The page deliberately alternates interaction patterns.

### Pinned sections

- Sales Journey
- Contact ≠ Opportunity
- Pipeline
- Agent's Day
- Automation

### Product videos

- Opportunity detail
- Conversations
- Calendar

### Cinematic reveals

- Hero
- Control Center
- Final CTA

### Typographic pause

- Emotional Statement

This avoids making every section behave identically.

---

# 7. Tension architecture

## ARC 01 — COMPLEXITY
A sale is not one event.

↓

Many moments.

## ARC 02 — FRAGMENTATION
Many sources and operational actions.

↓

Contact / Opportunity / Task / Conversation / Calendar.

## ARC 03 — CONTROL
GO CRM turns those actions into a visible sales workflow.

↓

Pipeline / Follow-up / Automation.

## ARC 04 — RESOLUTION
The agent sees the whole business.

↓

Control Center.

---

# 8. Product-media strategy

Use the actual UI wherever possible.

| Section | Preferred media |
|---|---|
| Hero | dashboard screenshot / 5–8s product video |
| Sources | opportunity creation video |
| Contact ≠ Opportunity | contact + opportunities screenshots |
| Pipeline | pipeline screen recording |
| Opportunity | opportunity detail recording |
| Agent Day | tasks + calendar recording |
| Conversations | conversations recording |
| Calendar | calendar recording |
| Automation | workflow recording |
| Control Center | full dashboard screenshot/video |

### Rule
The marketing page may crop, zoom, mask, scale or move the UI, but it should not redesign the product UI.

---

# 9. Layout system

Use a 12-column desktop grid.

**Hero:** copy 1–6 / UI 7–12

**Editorial product:** copy 2–5 / UI 6–12

**Pinned focus:** copy 1–4 / UI 5–12

**Full product:** UI 1–12

**Agent / Agency:** 6 columns each

**Final CTA:** copy 1–8 / UI 8–12

Do not center every composition. Asymmetry creates hierarchy and keeps a product-led page from feeling like a template.

---

# 10. UX principles behind the page

### Progressive disclosure
Introduce the primary mental model first and expose secondary complexity later. This follows NN/g guidance that progressive disclosure reduces cognitive load and helps users focus on the most important options.

### Strong information scent
The hero and every section should make it obvious why scrolling reveals the next meaningful piece of the story.

### Scroll as narrative control
Pinned sections are reserved for places where keeping a visual object on-screen while its state changes helps explain the product.

### Motion with purpose
Animation should reveal relationships, transitions or state changes—not decorate otherwise static content.

### Product truth
Whenever a screen is shown, it should represent real product behavior or clearly be marked as a placeholder during prototyping.

---

# 11. Research references

- Nielsen Norman Group — Progressive Disclosure: https://www.nngroup.com/articles/progressive-disclosure/
- Nielsen Norman Group — The Fold Manifesto: https://www.nngroup.com/articles/page-fold-manifesto/
- Nielsen Norman Group — Scroll Fading 101: https://www.nngroup.com/articles/scroll-fading-101/
- Awwwards — Storytelling / interaction / scrolling references: https://www.awwwards.com/websites/

Awwwards examples show storytelling, scrolling, animation, microinteractions, parallax, video and UI design being combined into one experience. The design goal here is not to copy a site but to use the same interaction grammar for a real product narrative.

---

# 12. Success criterion

A first-time visitor should be able to say:

> **GO CRM organizes the sales process from contact to opportunity, pipeline, follow-up and automation in one place.**

And ideally:

> **It lets agents see the work behind every opportunity and the state of their business.**

If the visitor only remembers “nice dashboard”, the landing failed.

---

# 13. The complete story in one line

```text
WHERE OPPORTUNITIES BEGIN
→ CONTACT VS OPPORTUNITY
→ HOW THE OPPORTUNITY MOVES
→ WHAT WORK HAPPENS AROUND IT
→ HOW IT FITS INTO THE DAY
→ HOW CONVERSATIONS + CALENDAR CONNECT
→ WHAT CAN BE AUTOMATED
→ HOW EVERYTHING RETURNS TO ONE CONTROL CENTER
```
