export type Question = {
  id: string;
  topic: string;
  scenario: string;
  options: [string, string];
  correctIndex: 0 | 1;
  explanation: string;
};

// AI-assisted content (Phase 1), drafted per the PRD's authoring workflow:
// general, well-established contract administration principles rather than
// jurisdiction-specific case law or clause-timing rules that haven't been
// independently verified — this still needs a professional legal/clause
// review before being treated as final. Where a rule genuinely varies by
// contract or jurisdiction, the "correct" answer is the sound judgement
// call (what to check, or the sensible default absent contrary wording)
// rather than a citable legal conclusion.
export const SESSION_QUESTIONS: Question[] = [
  // --- Variations ---
  {
    id: "variation-01",
    topic: "Variations",
    scenario:
      "The contractor installs the wrong cable. The Engineer instructs a replacement. Is this a variation?",
    options: [
      "Is a variation — any instruction to change or redo installed work counts as one on a project like this one",
      "Not a variation — replacing defective work is enforcement of an existing obligation",
    ],
    correctIndex: 1,
    explanation:
      "Correcting defective work isn't a variation — it's enforcement of an obligation the contractor already had.",
  },
  {
    id: "variation-02",
    topic: "Variations",
    scenario:
      "A junior site engineer (not the named Engineer under the contract) emails the contractor asking for an extra access ramp. Should the contractor treat this as an instructed variation?",
    options: [
      "Verify the emailer holds actual authority under the contract before treating this as an instructed variation",
      "Proceed since site staff are generally understood to speak for the Engineer in day-to-day matters",
    ],
    correctIndex: 0,
    explanation:
      "A variation instruction only binds the parties if it comes from someone with contractual authority to give it. Acting on the wrong person's say-so is a good way to end up with unauthorised work and no entitlement to be paid for it.",
  },
  {
    id: "variation-03",
    topic: "Variations",
    scenario:
      "The contractor spots an obvious drawing error (a beam clashing with a duct) and fixes it on site without telling anyone, then claims it as a variation.",
    options: [
      "Yes — correcting an obvious drawing error is effectively an implied instruction to vary the works",
      "No automatic entitlement — flag the clash and get an instruction before fixing it unilaterally",
    ],
    correctIndex: 1,
    explanation:
      "Discovering a problem doesn't create an entitlement — flag it and get an instruction before acting, rather than deciding unilaterally and invoicing for it afterwards.",
  },
  {
    id: "variation-04",
    topic: "Variations",
    scenario:
      "The contract requires all variations to be instructed in writing. The Engineer verbally tells the contractor to add extra reinforcement, then later refuses to confirm it in writing.",
    options: [
      "Confirm the verbal instruction back in writing yourself so there's a record even if the Engineer won't",
      "Proceed on the verbal instruction, since it came directly from the Engineer and writing is just formality",
    ],
    correctIndex: 0,
    explanation:
      "If the contract requires written instructions, relying on a verbal one is risky — at minimum, send a written confirmation of the verbal instruction so there's a record if it's later disputed.",
  },

  // --- Defects ---
  {
    id: "defects-01",
    topic: "Defects",
    scenario:
      "The contractor's completed work fails to meet the specified concrete strength. The Engineer instructs the contractor to break out and redo it at the contractor's own cost.",
    options: [
      "This qualifies as a variation since the Engineer specifically instructed the redo, so the contractor should be paid for it",
      "No variation — rectifying your own defective work is an existing obligation, so the cost sits with the contractor",
    ],
    correctIndex: 1,
    explanation:
      "Rectifying your own defective work is an existing contractual obligation, not new scope. No variation, no extra payment — the cost sits with the party who caused the defect.",
  },
  {
    id: "defects-02",
    topic: "Defects",
    scenario:
      "The Employer starts using part of the building before formal handover. A defect appears in that section afterward — is the contractor still liable to fix it?",
    options: [
      "Still liable in general — early occupation only changes things if the defect actually stems from how the Employer used the space",
      "No longer liable, since taking beneficial occupation early effectively closes out the contractor's defects obligations for that area",
    ],
    correctIndex: 0,
    explanation:
      "Early occupation doesn't automatically release the contractor from defects liability — but it does become relevant if the defect was actually caused by how the Employer used the space, not by the original work.",
  },
  {
    id: "defects-03",
    topic: "Defects",
    scenario:
      "The contractor disputes that a cracked tile is a defect, arguing it's normal wear and tear from the Employer's use after handover.",
    options: [
      "Assess whether the cracking is genuine wear from the Employer's own use, distinct from an inherent fault in the original work",
      "Treat it as covered regardless, since anything noticed during the defects liability period is presumed to be the contractor's responsibility",
    ],
    correctIndex: 0,
    explanation:
      "Not everything that goes wrong during the defects liability period is a defect in the contractual sense — genuine wear and tear from normal use is a different question from a fault in the original work.",
  },
  {
    id: "defects-04",
    topic: "Defects",
    scenario:
      "A defect is identified after the defects liability period has ended, in work that turns out to have been seriously substandard from the start.",
    options: [
      "Treat the contractor as released, since the whole purpose of the defects liability period is to draw a firm line under its exposure",
      "Can still potentially be pursued as a latent defect, subject to the contract's and law's limitation periods, not written off just because the DLP ended",
    ],
    correctIndex: 1,
    explanation:
      "The defects liability period covers routine snagging, not a free pass on seriously defective work — genuinely latent defects discovered later can potentially still be pursued, subject to the contract's and law's limitation periods.",
  },
  {
    id: "defects-05",
    topic: "Defects",
    scenario:
      "In a traditional contract where the Contractor had no design responsibility, a defect is traced back to an error in the Employer-provided design rather than the Contractor's workmanship.",
    options: [
      "Charge it to the Contractor's DLP obligations anyway, since it built the work and the defect surfaced on its watch in this kind of situation",
      "A pure design error is generally the Employer's or designer's risk in a traditional, non-design-and-build contract — not something the Contractor's DLP covers",
    ],
    correctIndex: 1,
    explanation:
      "In a traditional, non-design-and-build arrangement, the Contractor is generally only responsible for building in accordance with the design, not for the design's own adequacy — a genuine design error is a different problem with a different responsible party.",
  },
  {
    id: "defects-06",
    topic: "Defects",
    scenario:
      "The Employer wants to reject an entire section of work over a single minor defect, rather than requiring rectification of just that defect.",
    options: [
      "Require proportionate rectification of the specific defect — a single minor issue doesn't normally justify rejecting an entire section",
      "Support rejecting the whole section, since the Employer shouldn't have to accept work with any known defect in it",
    ],
    correctIndex: 0,
    explanation:
      "Remedies for defects are generally proportionate — rectification of the specific defect is the normal expectation, and rejecting an entire section over one minor issue is usually a disproportionate response, not the automatic entitlement.",
  },
  {
    id: "defects-07",
    topic: "Defects",
    scenario:
      "A defect is caused by the Contractor using a substitute material without approval, but the substitute actually performs identically to the specified material.",
    options: [
      "Flag it as a compliance breach in its own right — using an unapproved substitute is a separate issue from whether it performs adequately",
      "Let it go, since a substitute that performs identically to spec means there's nothing practical left to object to",
    ],
    correctIndex: 0,
    explanation:
      "Using an unapproved substitute is a procedural non-compliance in its own right, separate from whether it happens to perform adequately — approval processes exist partly so this determination is made in advance, not retroactively excused by the outcome.",
  },
  {
    id: "defects-08",
    topic: "Defects",
    scenario:
      "The Contractor wants to argue that because the Employer never formally objected to a defect during a site walk-through, it has effectively waived the right to have it fixed.",
    options: [
      "Accept the waiver argument, since staying quiet when a defect was plainly visible looks a lot like tacit acceptance of the work",
      "Push back — silence during an informal walk-through falls well short of the clear, deliberate waiver a contractual right usually requires",
    ],
    correctIndex: 1,
    explanation:
      "Waiver of a contractual right generally requires something clearer and more deliberate than not raising an issue during an informal walk-through — defects liability rights aren't easily lost by silence alone.",
  },

  // --- Payment ---
  {
    id: "payment-01",
    topic: "Payment",
    scenario:
      "The contractor's payment claim includes work priced at full value that hasn't actually been carried out yet. Should the Engineer certify it in full?",
    options: [
      "Yes — certify the full claim now and true it up as a deduction on the next certificate",
      "No — certify only the work actually executed and verified, whatever the claim states",
    ],
    correctIndex: 1,
    explanation:
      "Certify what's been executed and verified. Certifying unperformed work isn't supported by the contract, whatever the claim says.",
  },
  {
    id: "payment-02",
    topic: "Payment",
    scenario:
      "The contractor submits a payment claim after the contractual deadline for submission. Must the Engineer still assess and certify it as normal?",
    options: [
      "Check the contract's submission deadline and required form first — late or non-compliant claims aren't automatically processed as normal",
      "Certify it as usual, since the assessment period gives enough buffer to absorb a few late days under most standard forms",
    ],
    correctIndex: 0,
    explanation:
      "Payment procedures — submission deadlines, required form, supporting documents — are usually contractual requirements, not just formalities. Check them before assuming a late or non-compliant claim must still be processed as normal.",
  },
  {
    id: "payment-03",
    topic: "Payment",
    scenario:
      "The contractor's payment claim bundles variation work together with the main contract works, without breaking out the variation separately.",
    options: [
      "Require the variation work to be itemised and substantiated separately before certifying the bundled claim",
      "Certify the combined lump sum, since the main-works portion is clearly correct and the variation is presumably reasonable too",
    ],
    correctIndex: 0,
    explanation:
      "Variations should normally be valued and substantiated separately from the main works — a bundled claim makes it hard to check what you're actually agreeing to pay for.",
  },
  {
    id: "payment-04",
    topic: "Payment",
    scenario:
      "The Employer wants to withhold payment for undisputed, properly certified work because of a separate, unrelated dispute with the contractor on another matter.",
    options: [
      "Withhold the certified amount until the other dispute is sorted out, since it's still money owed between the same two parties either way",
      "Pay the certified amount — most regimes require a specific, timely-notified right of set-off tied to this claim, not a general 'something else is unresolved'",
    ],
    correctIndex: 1,
    explanation:
      "You generally can't withhold payment for properly certified work just because there's a dispute about something else — most regimes require a specific, notified right of set-off, not a general 'we'll hold this until we sort out that other thing.'",
  },
  {
    id: "payment-05",
    topic: "Payment",
    scenario:
      "The Contractor's payment claim includes provisional sums at their full stated value, even though the actual work covered by them hasn't been carried out yet.",
    options: [
      "Certify provisional sums against what's actually been expended or executed so far, the same as any other line item",
      "Certify the full stated provisional sum from the outset, since it's already been budgeted and approved as part of the contract sum",
    ],
    correctIndex: 0,
    explanation:
      "Provisional sums are a budgetary allowance for work not yet fully defined or executed — they should be certified against actual progress and expenditure, the same as any other line item, not paid out in full ahead of the work being done.",
  },
  {
    id: "payment-06",
    topic: "Payment",
    scenario:
      "The Engineer issues a payment certificate later than the contractual certification period allows, with no real explanation for the delay.",
    options: [
      "Treat it as a real issue — late certification can itself trigger consequences, like when the Employer's payment obligation and interest exposure start running",
      "Treat it as a minor scheduling slip, since the certified amount and the Contractor's entitlement stay exactly the same either way",
    ],
    correctIndex: 0,
    explanation:
      "Certification deadlines are often tied to when the Employer's payment obligation itself starts running — an unexplained late certificate isn't just a paperwork delay, it can have real knock-on effects worth tracking.",
  },
  {
    id: "payment-07",
    topic: "Payment",
    scenario:
      "The Employer pays a certified amount later than the contractual payment period requires. The Contractor wants to know if interest or finance charges are automatically owed.",
    options: [
      "Check the contract and applicable payment statute — many expressly provide for interest on late payment precisely to discourage it",
      "Assume no extra consequence attaches, since the certificate already fixes the exact amount the Employer owes",
    ],
    correctIndex: 0,
    explanation:
      "Many contracts and payment statutes specifically provide for interest on late payment, precisely to discourage it — check the actual entitlement rather than assuming either that it's automatic or that it doesn't exist.",
  },
  {
    id: "payment-08",
    topic: "Payment",
    scenario:
      "At final account stage, the Contractor includes costs that were never previously notified or substantiated at any point during the works.",
    options: [
      "Include them confidently, since the final account is specifically meant to be the place where any outstanding cost items get captured and settled",
      "Expect these to be an uphill battle — costs never raised contemporaneously are much easier for the Employer to dispute at final account stage",
    ],
    correctIndex: 1,
    explanation:
      "Surfacing costs for the first time at final account, with no contemporaneous notice or record, is one of the easiest kinds of claim to challenge — the same discipline about timely notice and substantiation that applies throughout the project applies here too.",
  },

  // --- LD ---
  {
    id: "ld-01",
    topic: "LD",
    scenario:
      "Completion is delayed, but the only cause was a variation the Engineer instructed. Can the Employer still deduct the full liquidated damages?",
    options: [
      "Yes — deduct the LDs now, since completion is objectively late regardless of what caused it",
      "No — LDs are for contractor-culpable delay; an Employer-instructed variation should be covered by an EOT instead",
    ],
    correctIndex: 1,
    explanation:
      "LDs are for contractor-culpable delay. Delay caused by the Employer's own instruction should be covered by an extension of time, not penalised.",
  },
  {
    id: "ld-02",
    topic: "LD",
    scenario:
      "Completion is delayed by both a contractor resourcing problem and a late Employer instruction, happening in the same period.",
    options: [
      "Apportion between the two causes rather than deducting full LDs for the whole overlapping period",
      "Deduct full LDs for the period, since the contractor's own resourcing problem was genuinely part of the mix",
    ],
    correctIndex: 0,
    explanation:
      "Concurrent delay — genuinely overlapping causes, one the contractor's fault and one not — isn't a clean case for full LDs. It needs proper analysis of what caused what, not a default to penalise the contractor for the whole period.",
  },
  {
    id: "ld-03",
    topic: "LD",
    scenario:
      "The contract's LD clause has no stated cap, and the calculated LDs after a long delay now exceed the total contract value.",
    options: [
      "Flag the disproportionate figure early and get advice, rather than just deducting the full mechanical calculation",
      "Deduct the calculated LD figure in full, since the clause itself doesn't state any cap on the amount",
    ],
    correctIndex: 0,
    explanation:
      "An LD figure that ends up wildly disproportionate to the contract value is a genuine legal and commercial risk area — this is a case to get proper advice on, not just apply mechanically.",
  },
  {
    id: "ld-04",
    topic: "LD",
    scenario:
      "The Employer wants to deduct LDs for delay, but never issued a certificate of non-completion as required by the contract.",
    options: [
      "Deduct the LDs anyway — the certificate is a formality that confirms a delay everyone already agrees happened",
      "Hold off deducting — most contracts make a certificate of non-completion a precondition, and its absence can defeat the LD deduction entirely",
    ],
    correctIndex: 1,
    explanation:
      "Many contracts make a certificate of non-completion (or equivalent) a precondition to deducting LDs. Skipping that step isn't just sloppy administration — it can genuinely undermine the right to deduct at all.",
  },

  // --- EOT ---
  {
    id: "eot-01",
    topic: "EOT",
    scenario:
      "The contractor claims an extension of time for a rain day, but provides no programme evidence the rain actually affected the critical path.",
    options: [
      "Grant it, since rain days are a routine and expected basis for extending a construction programme",
      "Insufficient on its own — an EOT needs evidence the rain actually hit the critical path, not just that it happened",
    ],
    correctIndex: 1,
    explanation:
      "An EOT needs evidence the event affected the critical path — not just that the event happened somewhere on site.",
  },
  {
    id: "eot-02",
    topic: "EOT",
    scenario:
      "The contractor submits an EOT claim three months after the delay event, when the contract requires notice within 28 days.",
    options: [
      "Treat the late notice as a real problem to assess against the contract, not something to wave through because the delay was genuine",
      "Grant the EOT anyway, since the 28-day window is really there to help administration, not to punish a genuine delay",
    ],
    correctIndex: 0,
    explanation:
      "A genuine delay event doesn't override a contractual notice requirement — treat late notice as a real issue to assess against what the contract actually says, not an inconvenience to overlook.",
  },
  {
    id: "eot-03",
    topic: "EOT",
    scenario:
      "The contractor claims an EOT for a general 'series of delays' without linking any of them to specific programme impacts.",
    options: [
      "Ask for the claim to be substantiated against the programme, rather than accepted as a general, unlinked assertion",
      "Grant a reasonable middle-ground extension, since a series of delays clearly occurred even without a clean breakdown",
    ],
    correctIndex: 0,
    explanation:
      "A vague, unlinked global claim is hard to assess fairly. A proper EOT claim should trace specific events to specific programme impact, not just assert that delay happened somewhere.",
  },
  {
    id: "eot-04",
    topic: "EOT",
    scenario:
      "An EOT is due for a genuine Employer-caused delay, but the contractor was already running behind schedule for its own reasons before that delay occurred.",
    options: [
      "Grant the full extension claimed, since the Employer-caused event is the one actually being assessed here as a matter of practice",
      "Isolate the net critical-path impact of the Employer-caused event, rather than granting a full extension regardless of pre-existing delay",
    ],
    correctIndex: 1,
    explanation:
      "An EOT protects the completion date from events that aren't the contractor's fault — it isn't meant to also erase delay the contractor already caused itself. Isolate the actual critical-path impact of the compensable event.",
  },

  // --- Concurrent Delay ---
  {
    id: "concurrent-delay-01",
    topic: "Concurrent Delay",
    scenario:
      "Two events delay completion in the same period: an Employer-caused variation, and the contractor's own subcontractor failing to mobilise. The contractor claims prolongation costs for the whole period.",
    options: [
      "Limit any costs claim to the Employer-caused portion — concurrent delay doesn't hand over full recovery for the whole period",
      "Award full prolongation costs, since an Employer-caused variation genuinely contributed to the overlapping delay",
    ],
    correctIndex: 0,
    explanation:
      "Time and money are assessed differently for concurrent delay. Even where the Employer-caused event might still support an EOT to protect the completion date, you generally can't recover costs for a period you'd have been delayed anyway because of your own concurrent cause.",
  },
  {
    id: "concurrent-delay-02",
    topic: "Concurrent Delay",
    scenario:
      "The programme shows the contractor was already going to miss the completion date due to its own critical-path delay, when an unrelated Employer-caused event also hits the critical path on the same days. The contractor argues this is 'true concurrency' entitling a full EOT.",
    options: [
      "Treat it as concurrent delay, since both problems are clearly affecting the same days on the programme given how these situations typically play out on site",
      "Confirm both delays independently hit the critical path at the same time before calling this true concurrency on the facts here",
    ],
    correctIndex: 1,
    explanation:
      "'Concurrent delay' has a narrow technical meaning — both causes must independently be critical-path delays happening at the same time, not just two problems that happened to occur in the same week. Loosely calling everything 'concurrent' can hand out EOTs and cost protection that isn't actually earned.",
  },

  {
    id: "concurrent-delay-03",
    topic: "Concurrent Delay",
    scenario:
      "The contract doesn't say anything about how to handle concurrent delay. The contractor argues that, since courts are divided on the point, it should get the benefit of the doubt and a full EOT.",
    options: [
      "Treat this as a genuinely unsettled area — check the specific contract mechanism and governing law rather than assuming a default rule",
      "Give the contractor the benefit of the doubt and grant the full EOT, since the case law here is genuinely divided",
    ],
    correctIndex: 0,
    explanation:
      "How concurrent delay is actually treated varies by jurisdiction and by what the contract itself says — some contracts define it expressly. Assuming one 'default' answer applies everywhere is the trap. This is a genuine grey area to get specific advice on, not a case with an obvious universal answer.",
  },

  // --- Disruption ---
  {
    id: "disruption-01",
    topic: "Disruption",
    scenario:
      "The contractor claims a lump sum for 'general disruption' to productivity caused by frequent Employer instructions, without showing how output actually dropped compared to what was planned.",
    options: [
      "Ask for a measured comparison of planned versus actual productivity, not just an assertion that instructions were disruptive",
      "Accept the claimed lump sum, since frequent instructions are a well-recognised cause of lost productivity generally",
    ],
    correctIndex: 0,
    explanation:
      "Disruption claims are notoriously easy to assert and hard to prove. A credible claim needs some form of measured comparison — planned vs actual output, or an accepted methodology — not just a narrative that instructions were frequent and annoying.",
  },
  {
    id: "disruption-02",
    topic: "Disruption",
    scenario:
      "The contractor wants to prove lost productivity using a 'measured mile' comparison — output during an unimpacted period of the works versus output during the disrupted period, on comparable work.",
    options: [
      "This measured-mile comparison is a recognised, more credible method, since it's grounded in the contractor's own actual output in this context",
      "Treat it with the same scepticism as a general assertion, since any productivity comparison still involves some judgment calls in the interest of keeping the project moving",
    ],
    correctIndex: 0,
    explanation:
      "The measured mile approach compares actual performance in an unimpacted period against the disrupted period on similar work — it's one of the more accepted ways to quantify disruption because it's grounded in the contractor's own real productivity, not industry averages or guesswork.",
  },

  {
    id: "disruption-03",
    topic: "Disruption",
    scenario:
      "The contractor claims a disruption cost, but part of the lost productivity clearly overlaps with periods where its own crew was under-resourced for reasons unrelated to the Employer.",
    options: [
      "Award the claim largely as submitted, since untangling exactly which portion came from which cause is impractical anyway, which is the more common shortcut taken under time pressure",
      "Isolate and exclude the contractor's own-caused inefficiency before valuing what's genuinely attributable to the Employer under this contract",
    ],
    correctIndex: 1,
    explanation:
      "A disruption claim only covers the portion actually caused by the compensable event — mixing in the contractor's own inefficiency inflates the claim. Strip out what isn't attributable to the Employer before valuing what's left.",
  },

  // --- Acceleration ---
  {
    id: "acceleration-01",
    topic: "Acceleration",
    scenario:
      "The Employer verbally tells the contractor to 'speed things up' after a delay, without agreeing to pay acceleration costs or issuing a formal instruction. The contractor accelerates and later claims the extra cost.",
    options: [
      "Get instructed acceleration, and who's paying for it, confirmed and costed before incurring the extra resource",
      "Proceed and invoice afterward, since a direct request from the Employer to speed up is effectively an instruction to accelerate",
    ],
    correctIndex: 0,
    explanation:
      "A casual 'speed things up' isn't the same as an instruction to accelerate at the Employer's cost. Get the basis for acceleration — and who's paying for it — agreed and recorded before ramping up resources, not after the invoice arrives.",
  },
  {
    id: "acceleration-02",
    topic: "Acceleration",
    scenario:
      "The contractor submits a well-substantiated EOT claim. The Engineer wrongly rejects it without proper grounds, and the contractor accelerates at its own cost to avoid an LD exposure it believes is unjustified.",
    options: [
      "This looks like constructive acceleration — a valid EOT wrongly refused, forcing the contractor to spend to avoid unjustified LD exposure",
      "Treat it as unrecoverable, since the contractor chose to accelerate rather than accepting the rejection and the resulting LD risk rather than waiting on a more formal process",
    ],
    correctIndex: 0,
    explanation:
      "Constructive acceleration is exactly this pattern: a valid EOT wrongly refused, forcing the contractor to spend money avoiding LDs it shouldn't be exposed to. It's a real, if harder to prove, basis for a claim — don't dismiss it just because there was no explicit 'please accelerate' instruction.",
  },

  {
    id: "acceleration-03",
    topic: "Acceleration",
    scenario:
      "The contractor decides on its own to bring in extra crews and finish two weeks early, hoping to impress the Employer for future work. It later invoices the Employer for the extra cost as 'acceleration.'",
    options: [
      "Bill it as acceleration, since finishing early plainly benefited the Employer regardless of who decided to do it given the practical realities of running the job",
      "Treat this as unrecoverable — acceleration the Employer never asked for or agreed to isn't a claim, whatever the motive once the facts are properly checked",
    ],
    correctIndex: 1,
    explanation:
      "Acceleration costs are only recoverable where there's some basis tying them to the Employer — an instruction, an agreement, or a wrongful EOT refusal (constructive acceleration). Choosing to speed up unprompted is a commercial decision the contractor pays for itself.",
  },

  // --- Prolongation Costs ---
  {
    id: "prolongation-01",
    topic: "Prolongation Costs",
    scenario:
      "The contractor claims prolongation costs (extended preliminaries) for the full EOT period granted, without adjusting for the fact that some site resources were stood down during part of that period.",
    options: [
      "Base prolongation costs on what was actually kept running or incurred during the period, not just the length of the EOT as a general proposition",
      "Apply the full preliminaries rate for the whole granted period, since that's what the EOT entitles the contractor to since that's typically the more convenient reading",
    ],
    correctIndex: 0,
    explanation:
      "An EOT extends time; it doesn't automatically fix the cost figure. Prolongation costs should be based on what was actually kept running — or actually incurred — during the extended period, not just multiplied out by the number of days granted.",
  },
  {
    id: "prolongation-02",
    topic: "Prolongation Costs",
    scenario:
      "The contractor's prolongation claim includes the full extended preliminaries rate for site management staff, plus a separate claim for the cost of those same staff members' time under a different cost heading.",
    options: [
      "Allow both claims to stand, since site management costs and extended preliminaries are conventionally tracked under separate headings",
      "Trace each cost item to what it's actually for and screen out double counting across differently labelled headings",
    ],
    correctIndex: 1,
    explanation:
      "A recurring problem in prolongation claims is the same underlying cost showing up more than once, dressed up under different headings. Trace each cost item back to what it's actually for before certifying — the label on the claim line isn't what matters.",
  },
  {
    id: "prolongation-03",
    topic: "Prolongation Costs",
    scenario:
      "The contractor claims head office overheads for the EOT period using a standard formula, without showing that head office resources were actually stretched or that other work was turned away because of this project's extension.",
    options: [
      "Treat the formula result as a starting point only — look for some real evidence the head office was actually affected",
      "Accept the formula result as sufficient, since these standard formulae are widely used and accepted across the industry",
    ],
    correctIndex: 0,
    explanation:
      "Formula-based overhead claims are common but contested precisely because they assume, rather than prove, an actual loss. They're more persuasive alongside some real evidence — turned-away work, stretched resources — than as a bare calculation.",
  },

  // --- Valuation ---
  {
    id: "valuation-01",
    topic: "Valuation",
    scenario:
      "The contractor values a variation using rates well above the contract's Bill of Quantities rates for very similar work, arguing the varied work is 'different enough' to justify new rates.",
    options: [
      "Check whether the work is genuinely similar in character before accepting rates outside the Bill — similar work should generally use contract rates",
      "Accept the higher proposed rate, since the contractor is in the best position to judge how different the varied work really is",
    ],
    correctIndex: 0,
    explanation:
      "Most valuation rules require using existing contract rates where the varied work is of a similar character and conditions to the original. New or 'fair' rates are for genuinely different work, not a chance to reprice similar work at a higher margin.",
  },
  {
    id: "valuation-02",
    topic: "Valuation",
    scenario:
      "A variation involves work with no comparable rate anywhere in the Bill of Quantities, and the parties can't agree a fair new rate. The contractor wants to be paid on a straightforward cost basis instead.",
    options: [
      "Fall back to a daywork or cost-based valuation — that's the normal next step when no fair comparable rate exists",
      "Leave the valuation pending until a rate is mutually agreed, since paying on cost alone removes the incentive to be efficient",
    ],
    correctIndex: 0,
    explanation:
      "Most standard forms have a valuation hierarchy that ends in a daywork or cost-plus basis precisely for this situation — genuinely unpriced work with no fair comparator. It's not a deadlock; it's the next rung down the ladder.",
  },
  {
    id: "valuation-03",
    topic: "Valuation",
    scenario:
      "The Employer instructs an omission (deleting scope) from the contractor's works, then has the same work carried out by a different, cheaper contractor shortly after.",
    options: [
      "Treat the omission as valid on its own terms, since the Employer is free to have the work done by whoever it prefers afterward",
      "Treat this as a legitimate concern — omitting work purely to re-award it elsewhere more cheaply is a recognised abuse of the omission power",
    ],
    correctIndex: 1,
    explanation:
      "A genuine omission removes work from the contract entirely. Using the omission power to strip work from the contractor purely to re-award it elsewhere more cheaply is a well-recognised abuse of the mechanism, not a normal variation.",
  },

  // --- Notices ---
  {
    id: "notices-01",
    topic: "Notices",
    scenario:
      "The contract requires written notice of a compensation event within a set number of days. The contractor only mentions the issue verbally in a site meeting.",
    options: [
      "Treat the site-meeting mention as adequate, since the same issue was clearly raised and understood by everyone present",
      "Verbal doesn't satisfy a written-notice requirement — get it in writing before relying on the issue being on record",
    ],
    correctIndex: 1,
    explanation:
      "A verbal mention isn't a substitute for the contractual notice. Don't let an issue sit on 'we mentioned it at the meeting.'",
  },
  {
    id: "notices-02",
    topic: "Notices",
    scenario:
      "The contract requires notice 'as soon as practicable.' The contractor waits six weeks, arguing that's still reasonably prompt given the circumstances.",
    options: [
      "'As soon as practicable' still means promptly once the event is known — a flexible standard isn't unlimited time",
      "Accept six weeks as reasonable, since 'as soon as practicable' is deliberately flexible rather than a fixed deadline",
    ],
    correctIndex: 0,
    explanation:
      "A flexible notice standard isn't a blank cheque — it's still meant to mean promptly, given what was actually happening. A long, unexplained delay is exactly what these clauses are meant to catch.",
  },
  {
    id: "notices-03",
    topic: "Notices",
    scenario:
      "The Engineer receives a notice that's clearly about a compensation event, but it's titled 'Site Memo' and doesn't cite the specific contract clause.",
    options: [
      "Reject it as invalid, since a proper notice should identify the specific clause it's being given under without needing to escalate the matter further",
      "Assess it on substance — a notice doesn't need to use the exact contractual label to actually count as one in a case like this",
    ],
    correctIndex: 1,
    explanation:
      "Most regimes look at whether a notice substantively conveys what's required, not whether it uses the exact contractual label. Rejecting a real notice on a technicality is its own kind of risk.",
  },
  {
    id: "notices-04",
    topic: "Notices",
    scenario:
      "A subcontractor's delay is caused by a late instruction to the main contractor, but the main contractor never passes on formal notice to the Employer, assuming the Employer 'already knows.'",
    options: [
      "Send the formal notice regardless — assumed awareness isn't a substitute for the notice mechanism the contract actually requires",
      "Skip the formal notice, since the delay's cause is already obvious to the Employer from the late instruction itself",
    ],
    correctIndex: 0,
    explanation:
      "This is the same trap as relying on a site-meeting mention — actual knowledge doesn't reliably substitute for the formal notice mechanism the contract sets up. Send it, even if it feels redundant.",
  },

  // --- Termination ---
  {
    id: "termination-01",
    topic: "Termination",
    scenario:
      "The Employer decides to terminate for convenience mid-project but skips the contract's termination-for-convenience procedure (notice period, compensation formula), treating it as a simple stop-work instruction.",
    options: [
      "Follow the contractual mechanism — notice period and compensation formula still apply even when termination is otherwise justified on balance",
      "Skip straight to stopping work, since having the underlying right to terminate makes the procedural formalities unnecessary given the commercial pressure to avoid further delay",
    ],
    correctIndex: 0,
    explanation:
      "Having the right to terminate doesn't mean the process for exercising it can be skipped. Termination-for-convenience clauses usually come with specific notice and compensation requirements — bypassing them is its own source of risk even where the termination itself is valid.",
  },
  {
    id: "termination-02",
    topic: "Termination",
    scenario:
      "A single missed interim payment leads the Contractor to declare the contract terminated immediately, without following the notice-and-cure-period steps the contract sets out for payment defaults.",
    options: [
      "Terminate immediately, since a missed interim payment is itself a clear and serious breach of the payment obligation",
      "Follow the notice-and-cure steps first — jumping straight to termination on a single missed payment is risky",
    ],
    correctIndex: 1,
    explanation:
      "Most termination-for-default clauses require a specific notice and an opportunity to cure before termination becomes valid. Terminating without going through those steps can itself be treated as wrongful repudiation by the terminating party.",
  },
  {
    id: "termination-03",
    topic: "Termination",
    scenario:
      "The Employer wants to terminate for persistent delay, but never issued the prior written warning notice the contract requires before termination for that ground.",
    options: [
      "Treat the missing warning notice as a real problem — it's usually a precondition, not a formality, to termination on this ground when you look at it closely",
      "Proceed with the termination, since persistent delay is self-evident from the programme and doesn't need a preliminary warning as the more expedient route in the circumstances",
    ],
    correctIndex: 0,
    explanation:
      "Where a contract makes a warning notice a precondition to termination for a particular default, skipping it can undermine the termination even if the underlying default is genuine.",
  },
  {
    id: "termination-04",
    topic: "Termination",
    scenario:
      "After validly terminating, the Employer re-engages a replacement contractor at a significantly higher price and wants to recover the full difference from the terminated contractor.",
    options: [
      "Treat the extra cost as recoverable only to the extent it's reasonable and properly substantiated, not whatever the replacement charges",
      "Recover the full price difference, since the Employer had no real choice but to engage a replacement after a valid termination",
    ],
    correctIndex: 0,
    explanation:
      "Recovering the cost of completion is generally available after a valid termination for default, but the Employer still has to show the replacement cost was reasonably incurred — a blank cheque isn't the default position.",
  },
  {
    id: "termination-05",
    topic: "Termination",
    scenario:
      "The Contractor believes a termination notice from the Employer was wrongful, and immediately stops all work and removes equipment from site the same day.",
    options: [
      "Treat the termination as repudiation and demobilise immediately, since staying under a disputed notice only adds to the Contractor's losses",
      "Get advice and respond formally first — unilaterally treating a disputed termination as valid or invalid either way is risky",
    ],
    correctIndex: 1,
    explanation:
      "Whether a termination was actually wrongful is often genuinely disputed. Acting unilaterally on your own view of who's right — rather than following the contract's dispute mechanism — can turn a defensible position into a real liability.",
  },
  {
    id: "termination-06",
    topic: "Termination",
    scenario:
      "A termination clause requires termination to happen 'without undue delay' once the default is known. The Employer knew about the default months ago but only terminates now.",
    options: [
      "Check the delay itself — an unreasonably late termination on an old, known default can be challenged",
      "Proceed with the termination, since the default genuinely happened and a valid ground doesn't expire just because time has passed",
    ],
    correctIndex: 0,
    explanation:
      "Where a contract ties termination to acting promptly on a known default, sitting on it for months and then terminating can be challenged as inconsistent with that requirement, even if the default was real.",
  },
  {
    id: "termination-07",
    topic: "Termination",
    scenario:
      "Following termination for the Contractor's insolvency, the Employer wants to draw down the full value of the performance bond immediately, regardless of what its actual loss turns out to be.",
    options: [
      "Draw the full bond amount immediately, since insolvency termination is exactly the scenario performance bonds are meant to cover",
      "Check what the bond actually secures and what loss has genuinely been suffered before drawing the full amount",
    ],
    correctIndex: 1,
    explanation:
      "A performance bond secures actual loss up to its value, not a windfall unrelated to loss. Drawing the full amount without regard to genuine loss can itself be challenged, especially with on-demand bonds where disputes tend to follow.",
  },
  {
    id: "termination-08",
    topic: "Termination",
    scenario:
      "The Employer terminates for late completion, but it later turns out the delay was actually caused by an Employer-instructed variation that should have qualified for an EOT.",
    options: [
      "Treat the termination as safely concluded, since the notice was validly issued and served at the time on the facts then available",
      "Recognise this as a real exposure — terminating for a delay that was actually excused can make the termination itself wrongful",
    ],
    correctIndex: 1,
    explanation:
      "If the underlying 'default' was actually excused by a valid EOT event, the termination was never properly grounded in the first place — which can flip the whole situation into the terminating party being the one in breach.",
  },

  // --- Suspension of Works ---
  {
    id: "suspension-01",
    topic: "Suspension of Works",
    scenario:
      "The Employer suspends the works citing 'site conditions,' but gives no written instruction or specific reason as the contract requires for a suspension instruction.",
    options: [
      "Ask for a proper written instruction with stated reasons before treating this as a valid, compensable suspension",
      "Treat the verbal suspension as effective and start the compensable clock, since 'site conditions' is itself a legitimate ground",
    ],
    correctIndex: 0,
    explanation:
      "A vague verbal suspension isn't the same as a properly instructed one. Getting the instruction formalised protects the contractor's later claim for time and cost, and avoids disputes about what was actually ordered.",
  },
  {
    id: "suspension-02",
    topic: "Suspension of Works",
    scenario:
      "The Contractor unilaterally suspends work over a payment dispute without first following the contract's own suspension-for-non-payment notice procedure.",
    options: [
      "Suspend immediately, since a genuine payment dispute is exactly the kind of default the suspension right exists to address",
      "Follow the contractual notice procedure first — suspending without it risks the Contractor being the one in breach",
    ],
    correctIndex: 1,
    explanation:
      "Most contracts (and statutory payment regimes) give a right to suspend for non-payment, but only if the required notice is given first. Suspending without it can turn a legitimate grievance into the contractor's own default.",
  },
  {
    id: "suspension-03",
    topic: "Suspension of Works",
    scenario:
      "Works have been suspended by Employer instruction for an extended period with no indication of when — or whether — they'll resume.",
    options: [
      "Keep the resources on standby indefinitely, since an Employer-instructed suspension doesn't itself give any right to walk away",
      "Rely on the contract's own long-suspension provisions — most give a right to terminate or claim once suspension passes a stated number of days",
    ],
    correctIndex: 1,
    explanation:
      "Many standard forms cap how long a suspension can run before the contractor gets a right to escalate — treat prolonged suspension without resumption as something to actively check against the contract, not just endure.",
  },
  {
    id: "suspension-04",
    topic: "Suspension of Works",
    scenario:
      "A suspension instruction doesn't specify an expected duration. The Contractor immediately demobilises fully, assuming it must be indefinite.",
    options: [
      "Clarify the expected duration before fully demobilising — a short suspension may not justify the full demobilisation cost",
      "Demobilise fully straight away, since it's safer to assume the worst and avoid holding idle resources on standby",
    ],
    correctIndex: 0,
    explanation:
      "Demobilisation and remobilisation are themselves costs that need to be reasonable and justified. Assuming the worst and fully standing down for what turns out to be a short suspension can create costs that are hard to recover as reasonable.",
  },
  {
    id: "suspension-05",
    topic: "Suspension of Works",
    scenario:
      "The Contractor incurs standing costs (idle plant, retained labour) during an Employer-instructed suspension and wants to claim them.",
    options: [
      "Rely on the suspension instruction itself as sufficient support, since it already establishes the Contractor's entitlement in principle",
      "Keep contemporaneous records of what was actually stood down and its cost — the instruction alone doesn't substantiate the amount",
    ],
    correctIndex: 1,
    explanation:
      "An instruction to suspend establishes the entitlement in principle, but the actual amount recoverable still needs to be evidenced — what was genuinely idle, for how long, and at what cost.",
  },
  {
    id: "suspension-06",
    topic: "Suspension of Works",
    scenario:
      "A suspension is lifted, and the Contractor claims an automatic extension of time equal to the full suspension period without checking whether it actually affected the critical path.",
    options: [
      "Check the actual critical-path impact — a suspension overlapping with float may not justify a day-for-day extension",
      "Grant a day-for-day extension matching the suspension period, since that's the most straightforward way to reflect the stoppage",
    ],
    correctIndex: 0,
    explanation:
      "Like any other delay event, a suspension's EOT entitlement should reflect its actual effect on the completion date, not just be assumed to be a straight day-for-day addition regardless of what else was happening on the programme.",
  },
  {
    id: "suspension-07",
    topic: "Suspension of Works",
    scenario:
      "The Employer suspends work after discovering a genuine safety issue caused by the Contractor's own unsafe method of working.",
    options: [
      "Treat it as non-compensable — a suspension caused by the Contractor's own default generally doesn't attract time or cost relief",
      "Treat it as compensable, since it was still the Employer who formally issued the suspension instruction itself",
    ],
    correctIndex: 0,
    explanation:
      "Suspension clauses that entitle the contractor to time and cost usually carve out suspensions caused by the contractor's own default — the contractor shouldn't profit from a stoppage it caused.",
  },
  {
    id: "suspension-08",
    topic: "Suspension of Works",
    scenario:
      "After a long Employer-instructed suspension, the Contractor is considering treating it as effective termination and walking off site.",
    options: [
      "Treat the prolonged suspension as effectively ending the contract and stand down for good, since indefinite suspension is functionally the same as termination",
      "Follow the contract's specific long-suspension mechanism — typically a defined right to terminate after a stated period and notice, not a unilateral walk-off",
    ],
    correctIndex: 1,
    explanation:
      "Contracts that address prolonged suspension usually set out exactly what right it gives (often a right to terminate after a stated period, following a stated notice) — follow that mechanism rather than unilaterally deciding the contract is over.",
  },

  // --- Retention Sums ---
  {
    id: "retention-01",
    topic: "Retention Sums",
    scenario:
      "The Employer withholds retention beyond the percentage cap stated in the contract, arguing the project's overall risk justifies holding more.",
    options: [
      "Withhold more than the stated cap, since a higher-risk project reasonably calls for a larger cushion than what was originally agreed",
      "The contractual retention cap applies regardless of the Employer's own risk assessment — over-withholding isn't justified just because it feels prudent",
    ],
    correctIndex: 1,
    explanation:
      "Retention percentages and caps are contractual terms, not guidelines. Withholding beyond what's agreed isn't a judgement call available to the Employer — it's simply not authorised by the contract.",
  },
  {
    id: "retention-02",
    topic: "Retention Sums",
    scenario:
      "The Contractor requests early release of retention because of strong performance, even though the contract ties release to specific milestones rather than performance quality.",
    options: [
      "Check what the contract actually ties release to — strong performance alone doesn't override a milestone-based release schedule",
      "Release retention early in recognition of the strong performance, since that's clearly the outcome the retention mechanism was meant to reward",
    ],
    correctIndex: 0,
    explanation:
      "Retention release is usually a mechanical, milestone-based entitlement, not a discretionary reward for good performance. Asking is reasonable, but there's no automatic right to early release just because the work has gone well.",
  },
  {
    id: "retention-03",
    topic: "Retention Sums",
    scenario:
      "The first moiety of retention is due at practical completion under the contract, but the Employer wants to hold the entire retention sum until the defects liability period ends completely.",
    options: [
      "Hold the full retention sum until the defects liability period ends, since that's the point the Employer's risk is genuinely resolved",
      "Follow the contract's staged release schedule — holding the full amount past the first release trigger isn't supported without a contractual basis",
    ],
    correctIndex: 1,
    explanation:
      "Where a contract splits retention release into moieties tied to different milestones, the first release is due when its trigger is met — not deferred to whenever the Employer decides is more convenient.",
  },
  {
    id: "retention-04",
    topic: "Retention Sums",
    scenario:
      "The Employer wants to use retention monies held for this project to fund unrelated cash flow needs elsewhere in the business, intending to repay it before release is due.",
    options: [
      "Allow the temporary use, since the funds will be made whole again well before release is actually due",
      "Keep retention held strictly for its contractual purpose — a required separate account exists precisely to prevent this kind of use",
    ],
    correctIndex: 1,
    explanation:
      "Retention exists to secure the contractor's performance, not as a source of general working capital for the employer. Where a contract requires a separate or trust account, commingling it defeats that protection even if it's later made whole.",
  },
  {
    id: "retention-05",
    topic: "Retention Sums",
    scenario:
      "The Contractor disputes a deduction from retention for alleged defects that were never formally notified during the defects liability period.",
    options: [
      "Check whether formal notification was actually required and given — an undocumented deduction for unnotified defects is worth challenging",
      "Accept the deduction, since the defect is real and retention exists precisely to cover exactly this kind of cost",
    ],
    correctIndex: 0,
    explanation:
      "If the contract requires defects to be notified during the defects liability period before they can be charged against retention, a deduction for something never properly raised is a legitimate thing to push back on.",
  },
  {
    id: "retention-06",
    topic: "Retention Sums",
    scenario:
      "A contract requires retention to be held in a separate trust account, but the Employer keeps it commingled with general operating funds. The project is otherwise proceeding normally.",
    options: [
      "Treat it as a paperwork technicality, since the project is proceeding normally and nothing has actually gone wrong yet in the ordinary course",
      "Treat the commingling as a live issue — the trust arrangement exists specifically to protect the contractor if the Employer runs into financial difficulty",
    ],
    correctIndex: 1,
    explanation:
      "The whole point of a segregated or trust account is protection if the paying party becomes insolvent — commingled funds are just another unsecured creditor claim in that scenario. Non-compliance is a real risk even if nothing has gone wrong yet.",
  },
  {
    id: "retention-07",
    topic: "Retention Sums",
    scenario:
      "At final retention release, the Employer offsets the amount against a completely separate commercial dispute unrelated to this specific contract.",
    options: [
      "Check for a proper contractual right of set-off — offsetting against an unrelated dispute generally isn't supported without one",
      "Allow the offset, since both amounts are owed between the same two parties under contracts that are commercially linked on the reasoning that it keeps things simple",
    ],
    correctIndex: 0,
    explanation:
      "This is the same principle as improper payment set-off generally — a right to withhold or offset usually needs a specific contractual (or statutory) basis tied to the matter at hand, not just any unrelated grievance between the parties.",
  },
  {
    id: "retention-08",
    topic: "Retention Sums",
    scenario:
      "The Contractor argues retention held for a long period should bear interest while it's withheld, without having checked what the contract actually says.",
    options: [
      "Check the contract first — interest on retention is owed only where the contract or applicable law specifically provides for it, and most standard forms don't",
      "Assert the interest claim confidently — holding a contractor's own money for an extended period generally carries an implied interest entitlement",
    ],
    correctIndex: 0,
    explanation:
      "Whether retention attracts interest varies significantly by contract and jurisdiction — it's not a default assumption to make, it's a specific term to check for before asserting the claim.",
  },

  // --- Insurance & Indemnity ---
  {
    id: "insurance-01",
    topic: "Insurance & Indemnity",
    scenario:
      "A fire damages partially completed works before practical completion. The Employer assumes this is automatically the Contractor's problem to absorb.",
    options: [
      "Check which party's insurance (often joint-names Contractor's All Risks) is meant to respond before assuming either party absorbs the loss outright",
      "Treat it as the Contractor's own loss to absorb, since the works were still legally in the Contractor's care at the time of the fire",
    ],
    correctIndex: 0,
    explanation:
      "Construction contracts typically require specific insurance (often a joint-names Contractor's All Risks policy) precisely to cover this scenario — the right first move is checking what's insured and by whom, not assuming who absorbs the loss.",
  },
  {
    id: "insurance-02",
    topic: "Insurance & Indemnity",
    scenario:
      "The Contractor's public liability policy lapsed briefly without anyone noticing, and a third-party injury claim arises during that exact gap.",
    options: [
      "Treat the lapse as immaterial, since the policy was active for virtually the entire period and the gap itself was purely administrative",
      "Treat this as a serious exposure — a coverage gap that coincides with an actual claim can leave the Contractor personally exposed for a loss insurance was meant to cover",
    ],
    correctIndex: 1,
    explanation:
      "Insurance either responds or it doesn't — a lapse, even brief, that happens to coincide with an actual claim is exactly the scenario the required continuous coverage was meant to prevent. This is why policies (and proof of them) need active tracking, not a one-time check.",
  },
  {
    id: "insurance-03",
    topic: "Insurance & Indemnity",
    scenario:
      "The contract requires the Contractor to name the Employer as co-insured on its All Risks policy, but no one has actually confirmed this was done.",
    options: [
      "Assume it's in place, since naming the Employer as co-insured is a routine, standard requirement that brokers handle as a matter of course on a project like this one",
      "Confirm directly with the insurer or broker that the co-insured status was actually added, rather than assuming a standard requirement was met",
    ],
    correctIndex: 1,
    explanation:
      "Contractual insurance requirements aren't self-executing — someone has to actually arrange the co-insured status and someone has to check the certificate. Assuming compliance without verifying it defeats the purpose of requiring it.",
  },
  {
    id: "insurance-04",
    topic: "Insurance & Indemnity",
    scenario:
      "An indemnity clause requires the Contractor to indemnify the Employer for 'any and all claims' arising from the works, including claims caused solely by the Employer's own negligence.",
    options: [
      "Flag this wording for review — indemnities covering the other party's own sole negligence are often unenforceable or heavily restricted",
      "Enforce the indemnity exactly as written, since the Contractor agreed to broad wording and courts generally hold parties to their bargain",
    ],
    correctIndex: 0,
    explanation:
      "Many jurisdictions restrict or refuse to enforce indemnities that would make one party responsible for the other's own negligence, especially when not very clearly and specifically worded. This is a genuine legal grey area to flag for proper review, not assume either way.",
  },
  {
    id: "insurance-05",
    topic: "Insurance & Indemnity",
    scenario:
      "The Employer wants the Contractor to bear the full cost of damage caused by a genuinely unprecedented natural event, purely on the basis that 'the works were in the Contractor's care.'",
    options: [
      "Have the Contractor absorb the cost, since care of the works sits with the Contractor until practical completion regardless of the cause",
      "Check what the contract and insurance actually allocate for this kind of event, rather than assuming 'care of the works' means unlimited Contractor risk",
    ],
    correctIndex: 1,
    explanation:
      "'Care of the works' provisions are usually paired with required insurance precisely to cover events like this — the practical question is what the insurance responds to and what risk allocation the contract actually specifies, not a blanket assumption.",
  },
  {
    id: "insurance-06",
    topic: "Insurance & Indemnity",
    scenario:
      "A subcontractor causes damage on site. The main contractor's insurer denies the claim because the subcontractor was never added as a named additional insured, as the main contract required.",
    options: [
      "Treat this as a real gap worth catching — subcontractor insurance status should be checked, not assumed to flow automatically from the main policy",
      "Assume the subcontractor was covered, since it was working under the main contractor's supervision and control at the time",
    ],
    correctIndex: 0,
    explanation:
      "Insurance coverage generally only extends to parties actually named or covered under the policy terms — assuming a subcontractor is automatically protected without checking is how gaps like this happen.",
  },
  {
    id: "insurance-07",
    topic: "Insurance & Indemnity",
    scenario:
      "The contract requires proof of insurance before works commence, but the Contractor mobilises to site without ever producing the certificate.",
    options: [
      "Chase the certificate before or immediately upon mobilisation — proceeding without confirmed cover is a real exposure for both parties",
      "Let mobilisation proceed, since the Contractor almost certainly holds a policy and the certificate is really just a formality to file away",
    ],
    correctIndex: 0,
    explanation:
      "A contractual precondition to commence works exists to be checked, not assumed satisfied. Working without confirmed insurance in place leaves both parties exposed if something goes wrong before the paperwork catches up.",
  },
  {
    id: "insurance-08",
    topic: "Insurance & Indemnity",
    scenario:
      "The Employer's own negligent design causes a defect. The Contractor's indemnity clause is broadly worded, and the Contractor assumes it must bear 100% of the resulting loss regardless of the Employer's fault.",
    options: [
      "Have the Contractor bear the full loss, since it agreed to the broadly worded indemnity clause without carving out this kind of scenario",
      "Check how the indemnity is actually worded and whether it's enforceable here — broad wording doesn't automatically mean the Contractor absorbs Employer-caused loss",
    ],
    correctIndex: 1,
    explanation:
      "This is the flip side of the earlier point — indemnities that would make a contractor responsible for the employer's own fault are exactly the kind of clause that gets scrutinised or restricted. Don't assume the broadest possible reading is the enforceable one.",
  },

  // --- Assignment & Subcontracting ---
  {
    id: "assignment-01",
    topic: "Assignment & Subcontracting",
    scenario:
      "The Contractor wants to assign its right to receive payment under the contract to a bank as security for financing, where the contract requires the Employer's consent for any assignment.",
    options: [
      "Get the Employer's consent first — a consent-to-assign clause typically catches assignment of payment rights too, not just the whole contract",
      "Proceed without consent, since assigning only the right to receive money doesn't change what the Employer actually has to do",
    ],
    correctIndex: 0,
    explanation:
      "Consent-to-assignment clauses typically catch assignment of contractual rights generally, including the right to payment, not only a full transfer of the contract. Treat it as needing consent unless the clause clearly says otherwise.",
  },
  {
    id: "assignment-02",
    topic: "Assignment & Subcontracting",
    scenario:
      "The Contractor subcontracts a significant portion of the works without notifying the Employer, where the contract requires the Employer's approval of subcontractors.",
    options: [
      "Proceed without formal approval, since the Employer's real concern is quality of work rather than who specifically performs it given how these situations typically play out on site",
      "Get approval before engaging the subcontractor — proceeding without it breaches the contract regardless of the subcontractor's quality in this kind of situation",
    ],
    correctIndex: 1,
    explanation:
      "An approval requirement is a procedural obligation independent of how the subcontractor actually performs — skipping it is a breach in itself, and it also means the Employer never got the chance to raise concerns before the work started.",
  },
  {
    id: "assignment-03",
    topic: "Assignment & Subcontracting",
    scenario:
      "The Employer wants to assign the benefit of the contract (including its warranties) to a purchaser of the building, without following the contract's own assignment provisions.",
    options: [
      "Treat the warranties as transferring with the sale, since a purchaser buying the building would reasonably expect the benefit of them too",
      "Follow the contract's assignment mechanism — warranties and rights don't automatically transfer to a purchaser without it",
    ],
    correctIndex: 1,
    explanation:
      "Contractual rights, including warranties, generally need a proper assignment (often with the other party's consent) to transfer to a new owner — a sale of the building alone doesn't automatically carry them across.",
  },
  {
    id: "assignment-04",
    topic: "Assignment & Subcontracting",
    scenario:
      "A subcontractor's poor workmanship causes a defect. The main contractor argues it isn't responsible since it wasn't the party that actually did the defective work.",
    options: [
      "Hold the main contractor responsible to the Employer regardless — recourse against the subcontractor is a separate matter between them",
      "Direct the Employer's claim at the subcontractor instead, since it was the party that actually carried out the defective work",
    ],
    correctIndex: 0,
    explanation:
      "Subcontracting work doesn't subcontract away the main contractor's responsibility to the Employer under the main contract. Any recourse against the subcontractor is a separate matter between contractor and subcontractor.",
  },
  {
    id: "assignment-05",
    topic: "Assignment & Subcontracting",
    scenario:
      "The contract prohibits subletting of the whole works, but the Contractor sublets the entire scope to a single subcontractor while remaining the named contractor on paper.",
    options: [
      "Treat the arrangement as compliant, since the prohibition is really aimed at the paper party to the contract, not who physically does the work",
      "Treat this as likely breaching the prohibition in substance, even though the Contractor's name formally stays on the contract",
    ],
    correctIndex: 1,
    explanation:
      "A prohibition on subletting the whole works is aimed at substance, not just formal naming — subletting effectively everything while keeping a nominal role is exactly the arrangement this kind of clause is meant to prevent.",
  },
  {
    id: "assignment-06",
    topic: "Assignment & Subcontracting",
    scenario:
      "The Employer wants to deal directly with a nominated subcontractor and pay them directly, bypassing the main contractor.",
    options: [
      "Route it through the main contractor — a direct-payment arrangement needs its own agreed mechanism, such as a documented direct-payment or novation route",
      "Deal and pay the subcontractor directly, since it's the party actually performing the work the Employer wants delivered on this particular project",
    ],
    correctIndex: 0,
    explanation:
      "The normal structure runs Employer to main contractor to subcontractor — bypassing that without an agreed mechanism (like a direct payment or novation arrangement) can create confusion about who owes what to whom, and undermine the main contractor's overall responsibility.",
  },
  {
    id: "assignment-07",
    topic: "Assignment & Subcontracting",
    scenario:
      "The Contractor argues that an assignment happening 'by operation of law' (such as a corporate merger) doesn't need Employer consent, even though the assignment clause doesn't specifically address that scenario.",
    options: [
      "Check this carefully — how assignment-by-operation-of-law interacts with a consent clause varies and can genuinely go either way",
      "Treat the merger as exempt from consent, since a corporate restructuring isn't really a voluntary 'assignment' in the ordinary sense",
    ],
    correctIndex: 0,
    explanation:
      "Whether a merger or similar corporate event counts as an 'assignment' requiring consent under a specific clause is a real point of legal nuance that depends on the clause's exact wording and applicable law — not something to assume either way without checking.",
  },
  {
    id: "assignment-08",
    topic: "Assignment & Subcontracting",
    scenario:
      "A named subcontractor becomes insolvent mid-project. The main contractor wants to simply substitute another firm without any Employer involvement.",
    options: [
      "Substitute the replacement without seeking approval, since insolvency is an emergency that justifies acting quickly without further process",
      "Check whether the contract requires Employer approval for subcontractor changes — insolvency doesn't automatically waive that requirement",
    ],
    correctIndex: 1,
    explanation:
      "An emergency situation like a subcontractor's insolvency is understandable, but if the contract requires approval for subcontractor changes, that requirement doesn't disappear just because the substitution feels urgent or obviously necessary.",
  },

  // --- Security of Payment / Adjudication ---
  {
    id: "adjudication-01",
    topic: "Security of Payment / Adjudication",
    scenario:
      "The Contractor lodges a payment claim under the Security of Payment framework, and the Employer fails to respond with a payment response within the statutory timeframe.",
    options: [
      "Check the SOP Act's deemed-response consequence — missing the statutory payment-response deadline often means the Employer is taken to accept the claimed amount",
      "Treat the silence as inconsequential, since the claim can still be properly assessed and responded to once the Employer gets around to it",
    ],
    correctIndex: 0,
    explanation:
      "Security of Payment regimes are typically strict on timing precisely to force quick engagement — missing the payment response deadline commonly results in the claimed amount becoming payable as if agreed, which is a serious consequence to be aware of.",
  },
  {
    id: "adjudication-02",
    topic: "Security of Payment / Adjudication",
    scenario:
      "At adjudication, the Employer wants to raise a brand-new defence that was never included in its original payment response.",
    options: [
      "Allow the new defence, since adjudication is meant to get to the substantive merits of the payment dispute wherever they come from in the interest of keeping the project moving",
      "Check the Act's rules on this — Singapore's SOP Act regime restricts a respondent to the reasons already given in its payment response as a matter of practice",
    ],
    correctIndex: 1,
    explanation:
      "A common feature of these regimes is limiting the adjudication to the grounds already raised in the payment response, precisely to stop respondents from ambushing the claimant with new reasons late in the process.",
  },
  {
    id: "adjudication-03",
    topic: "Security of Payment / Adjudication",
    scenario:
      "An adjudication determination goes against the Employer. The Employer wants to simply ignore it and keep withholding payment pending a future court case.",
    options: [
      "Hold off paying until the courts weigh in, since an adjudication determination is only ever a preliminary, non-binding view of the dispute, which is the more common shortcut taken under time pressure",
      "Treat the determination as binding and enforceable on an interim, 'pay now, argue later' basis, whatever future court challenge is planned on the facts here",
    ],
    correctIndex: 1,
    explanation:
      "Adjudication is generally designed to be 'pay now, argue later' — determinations are enforceable in the interim regardless of an intended later challenge, and ignoring one can lead to direct enforcement action.",
  },
  {
    id: "adjudication-04",
    topic: "Security of Payment / Adjudication",
    scenario:
      "The Contractor's payment claim doesn't reference the statute or use the exact prescribed wording, and the Employer wants to argue it's automatically invalid on that basis.",
    options: [
      "Check whether substance matters more than form here — many SOP-style regimes look at whether the claim substantively meets the requirements, not exact wording",
      "Treat the claim as invalid, since failing to reference the statute or use its prescribed terminology is a basic procedural defect",
    ],
    correctIndex: 0,
    explanation:
      "This mirrors the general 'substance over form' principle for notices — some regimes are strict on form, others focus on whether the claim substantively identifies the work and amount claimed. Check the specific statute rather than assuming either way.",
  },
  {
    id: "adjudication-05",
    topic: "Security of Payment / Adjudication",
    scenario:
      "The Employer argues a 'pay when paid' clause excuses it from paying the Contractor, because the Employer's own client hasn't paid the Employer yet.",
    options: [
      "Accept the clause as a valid excuse, since the Employer genuinely hasn't been paid yet and can't pay out money it hasn't received",
      "Check whether 'pay when paid' clauses are actually enforceable under the SOP Act — this kind of upstream-risk clause is commonly rendered void by statute",
    ],
    correctIndex: 1,
    explanation:
      "A number of Security of Payment regimes specifically outlaw 'pay when paid' clauses to protect contractors from upstream payment risk they have no control over — this is exactly the kind of clause that needs checking against the statute, not assumed valid.",
  },
  {
    id: "adjudication-06",
    topic: "Security of Payment / Adjudication",
    scenario:
      "An adjudicator's determination contains an obvious arithmetic error. The Employer wants to simply refuse payment entirely rather than address the specific error.",
    options: [
      "Raise the specific arithmetic error through the correction or review mechanism the Act provides, rather than refusing payment outright",
      "Withhold payment on the whole determination, since an adjudicator who got the sum wrong can't be trusted to have gotten the rest right either",
    ],
    correctIndex: 0,
    explanation:
      "An obvious clerical or arithmetic error is usually something that can be corrected through a specific mechanism, if the statute provides one — it doesn't generally justify wholesale non-compliance with an otherwise valid determination.",
  },
  {
    id: "adjudication-07",
    topic: "Security of Payment / Adjudication",
    scenario:
      "Having lost an adjudication, the Contractor wants to lodge a second adjudication application on substantially the same payment claim.",
    options: [
      "Check the Act's rules on repeat applications — most SOP-style regimes restrict re-adjudicating substantially the same payment claim in this context",
      "File a fresh application on the same claim, since nothing in principle stops a party from having another adjudicator look at it rather than waiting on a more formal process",
    ],
    correctIndex: 0,
    explanation:
      "Most regimes limit re-litigating the same payment claim through successive adjudications, to preserve the process's speed and finality at the interim stage — check the specific rules rather than assuming an open-ended right to retry.",
  },
  {
    id: "adjudication-08",
    topic: "Security of Payment / Adjudication",
    scenario:
      "The Employer is unhappy with an adjudication determination and wants to understand what its actual options are.",
    options: [
      "Treat the determination as effectively final, since the SOP Act's adjudication process is designed to resolve payment disputes conclusively",
      "Comply with the determination for now — it's an interim 'pay now, argue later' outcome — while pursuing litigation or arbitration if genuinely warranted",
    ],
    correctIndex: 1,
    explanation:
      "Adjudication determinations are usually binding on an interim basis but not necessarily the final word — the practical move is to comply now and pursue litigation, arbitration, or another final-resolution route if genuinely warranted, rather than either ignoring it or assuming there's no recourse at all.",
  },

  // --- Practical Completion ---
  {
    id: "practical-completion-01",
    topic: "Practical Completion",
    scenario:
      "The Contractor claims practical completion despite a long list of outstanding minor defects, arguing 'practical completion doesn't mean perfect.'",
    options: [
      "Assess whether the outstanding items are genuinely minor and don't prevent beneficial use — that's the real test, not an empty checklist under this contract",
      "Withhold practical completion until every item, however minor, is fully cleared, since the works aren't technically 100% finished given the practical realities of running the job",
    ],
    correctIndex: 0,
    explanation:
      "Practical completion generally tolerates minor outstanding items that don't prevent beneficial use — the judgement call is whether the works are genuinely fit for their intended purpose despite them, not whether the punch list is empty.",
  },
  {
    id: "practical-completion-02",
    topic: "Practical Completion",
    scenario:
      "The Employer refuses to certify practical completion citing missing as-built drawings and O&M manuals, even though the physical works are functionally complete.",
    options: [
      "Certify practical completion regardless, since as-built drawings and manuals are administrative deliverables separate from the physical works",
      "Check what the contract actually makes a precondition — if documentation is expressly required, withholding certification may be justified",
    ],
    correctIndex: 1,
    explanation:
      "Some contracts expressly tie practical completion to specific deliverables like as-built documentation, not just physical readiness — check the actual definition in the contract rather than assuming documentation is irrelevant.",
  },
  {
    id: "practical-completion-03",
    topic: "Practical Completion",
    scenario:
      "The Employer takes beneficial occupation of the building and starts using it without any formal certificate of practical completion ever being issued.",
    options: [
      "Treat it as unproblematic, since the Employer's satisfaction with the building is really what practical completion is meant to reflect anyway",
      "Flag this as a real issue — occupying without a certificate creates genuine ambiguity about when practical completion occurred and what liabilities shifted",
    ],
    correctIndex: 1,
    explanation:
      "The certificate matters because it typically triggers key consequences — start of the defects liability period, retention release, risk transfer. Occupying without one leaves genuine ambiguity about exactly when those things started.",
  },
  {
    id: "practical-completion-04",
    topic: "Practical Completion",
    scenario:
      "The Contractor argues that because the Employer has been using part of the building for weeks, practical completion must be deemed to have occurred by conduct.",
    options: [
      "Treat this as genuinely contested — whether occupation can amount to deemed practical completion depends on the specific contract wording and jurisdiction",
      "Treat the weeks of occupation as conclusive proof of deemed practical completion, since sustained use is the clearest evidence the works are ready since that's typically the more convenient reading",
    ],
    correctIndex: 0,
    explanation:
      "Whether occupation without a certificate can amount to 'deemed' practical completion varies by contract wording and jurisdiction — it's a real argument worth making, but not a guaranteed automatic outcome.",
  },
  {
    id: "practical-completion-05",
    topic: "Practical Completion",
    scenario:
      "A dispute arises over whether certain outstanding items are 'minor defects' (compatible with practical completion) or 'incomplete works' (not compatible).",
    options: [
      "Apply a standard industry checklist of what counts as minor, since that gives a consistent, objective answer across different projects",
      "Apply the functional test — can the works be beneficially used despite the outstanding items — rather than counting or categorising them in the abstract",
    ],
    correctIndex: 1,
    explanation:
      "This distinction is fact-specific — the same item might be minor on one project and a genuine barrier to use on another. The consistent test is functional: can the works actually be used for their intended purpose despite what's outstanding.",
  },
  {
    id: "practical-completion-06",
    topic: "Practical Completion",
    scenario:
      "The certifier delays issuing the practical completion certificate for weeks after the works are actually ready, without real explanation.",
    options: [
      "Push the certifier formally against the contract's stated certification timeframe — an unreasoned, prolonged delay once the test is met can be challenged",
      "Wait it out, since the timing of issuing a practical completion certificate is a matter left entirely to the certifier's own discretion",
    ],
    correctIndex: 0,
    explanation:
      "Certifiers usually have to act within a reasonable time or a stated period, and shouldn't unreasonably withhold certification once the substantive test is met — an unexplained delay is a legitimate thing to push back on, not something to just wait out.",
  },
  {
    id: "practical-completion-07",
    topic: "Practical Completion",
    scenario:
      "Practical completion is certified with a schedule of outstanding minor items attached. The Contractor isn't sure whether that schedule creates a binding deadline to finish them.",
    options: [
      "Check the specific clause — many contracts require items on the schedule to be cleared within a set period, sometimes tied to the defects liability period, with retention consequences",
      "Treat the schedule as a courtesy record only, since the certificate itself is what confirms practical completion regardless of what's still outstanding",
    ],
    correctIndex: 0,
    explanation:
      "Outstanding-items schedules often aren't just a record — many contracts require them to be cleared within a set timeframe, sometimes with consequences (like against retention) if they aren't. Check what the contract actually requires rather than assuming it's purely informational.",
  },
  {
    id: "practical-completion-08",
    topic: "Practical Completion",
    scenario:
      "The Employer wants to withhold the retention release that's triggered by practical completion, citing unrelated commercial disputes with the Contractor.",
    options: [
      "Withhold the release until the other dispute is resolved, since it's reasonable to keep some leverage while matters between the parties remain unsettled",
      "Check for a proper contractual right of set-off — withholding a practical-completion-triggered release over an unrelated matter generally isn't supported without one",
    ],
    correctIndex: 1,
    explanation:
      "This is the same set-off principle that comes up elsewhere — a release genuinely triggered by practical completion shouldn't be held back for a separate, unrelated dispute without an actual contractual right to do so.",
  },

  // --- Site Possession ---
  {
    id: "site-possession-01",
    topic: "Site Possession",
    scenario:
      "The contract specifies a site possession date, but the Employer hands over the site three weeks late, treating it as a minor administrative delay with no compensation offered.",
    options: [
      "Treat late possession as a compensable Employer-caused delay, the same as any other Employer default — not something to wave through as minor",
      "Treat the few weeks as immaterial, since possession dates are typically approximate and rarely drive the critical path this early in a project",
    ],
    correctIndex: 0,
    explanation:
      "Access to the site by the agreed date is normally a fundamental Employer obligation — late possession is typically treated the same as any other Employer-caused delay, supporting an EOT and potentially cost, not dismissed as trivial.",
  },
  {
    id: "site-possession-02",
    topic: "Site Possession",
    scenario:
      "The Contractor is given possession of only part of the site (a phased handover), but the contract assumed possession of the whole site at once.",
    options: [
      "Treat it as broadly equivalent to full possession, since the Contractor can still mobilise and start work on the accessible portion",
      "Raise this formally as a real programme issue — an unagreed phased handover can disrupt the sequencing the whole programme assumed",
    ],
    correctIndex: 1,
    explanation:
      "If the contract programme assumed full-site access, a phased handover that wasn't agreed can genuinely disrupt planned sequencing — this is worth raising and assessing for EOT purposes, not treated as equivalent to what was actually promised.",
  },
  {
    id: "site-possession-03",
    topic: "Site Possession",
    scenario:
      "Site access is granted, but part of it remains occupied by existing tenants or utilities not yet cleared, restricting what the Contractor can actually do there.",
    options: [
      "Treat it as the Contractor's problem to manage, since access was technically granted on the correct date regardless of what's still occupying it",
      "Document and raise this — access blocked by unresolved occupiers or utilities isn't the genuine possession the contract requires",
    ],
    correctIndex: 1,
    explanation:
      "Possession generally needs to be unrestricted enough to actually let the contracted work proceed — nominal access blocked by unresolved occupiers or utilities isn't the same as the possession the contract actually requires the Employer to give.",
  },
  {
    id: "site-possession-04",
    topic: "Site Possession",
    scenario:
      "The Contractor wants to claim an EOT for late site possession without demonstrating which specific programme activities were actually blocked by it.",
    options: [
      "Substantiate the claim against the actual programme — the fact of late possession supports the claim, but the extension should reflect demonstrated impact",
      "Grant the extension based on the lateness alone, since possession is a threshold obligation and any delay to it self-evidently pushes everything back without needing to escalate the matter further",
    ],
    correctIndex: 0,
    explanation:
      "Like any delay claim, late possession needs to be linked to an actual effect on the critical path — the fact of lateness supports the claim in principle, but the extension granted should reflect demonstrated impact.",
  },
  {
    id: "site-possession-05",
    topic: "Site Possession",
    scenario:
      "The Employer argues that because access was 'technically' given on the possession date, any practical inability to actually start work is the Contractor's problem.",
    options: [
      "Treat the obligation as satisfied, since the Employer met the literal possession date and can't control every practical circumstance beyond that given the commercial pressure to avoid further delay",
      "Treat this as the Employer's problem — access that exists on paper but doesn't functionally enable work likely doesn't satisfy the possession obligation",
    ],
    correctIndex: 1,
    explanation:
      "The obligation is generally to give possession sufficient to allow the works to proceed, not just a nominal, technical access that doesn't functionally enable anything — this is a substance-over-form question, same as several other areas.",
  },
  {
    id: "site-possession-06",
    topic: "Site Possession",
    scenario:
      "A right-of-way needed for site access is delayed by a third party entirely outside either party's control.",
    options: [
      "Check what the contract says about this specific risk — third-party delays to possession are often still treated as an Employer risk unless carved out",
      "Treat it as a shared loss neither party is responsible for, since a third party entirely outside the contract actually caused the delay",
    ],
    correctIndex: 0,
    explanation:
      "Even where a delay is caused by someone outside the contract entirely, the risk allocation between the two contracting parties still needs to be worked out from what the contract says — 'nobody's fault' doesn't automatically mean 'nobody's contractual risk.'",
  },
  {
    id: "site-possession-07",
    topic: "Site Possession",
    scenario:
      "The Contractor mobilises to site early, before the formal possession date, at the Employer's informal request, then later wants to treat the earlier date as the contractual start.",
    options: [
      "Get early access and its implications confirmed in writing at the time — an informal accommodation shouldn't quietly become a new contractual date",
      "Treat the earlier mobilisation date as the new contractual start, since the Employer clearly consented to access happening from that point as the more expedient route in the circumstances",
    ],
    correctIndex: 0,
    explanation:
      "Informal accommodations shouldn't be assumed to carry formal contractual weight — if early access is meant to shift the contractual programme, that needs to be agreed and recorded, not just inferred after the fact.",
  },
  {
    id: "site-possession-08",
    topic: "Site Possession",
    scenario:
      "Site possession is given, but essential utilities (power, water) needed for the works aren't yet connected.",
    options: [
      "Treat possession as properly given regardless, since utilities connection is typically handled as a separate work stream from site handover",
      "Check whether the contract's possession obligation is meant to include working utilities — if so, their absence may mean possession wasn't properly given",
    ],
    correctIndex: 1,
    explanation:
      "Whether 'possession' includes functioning utilities depends on what the contract actually requires — for works genuinely dependent on power or water to start, their absence can mean possession wasn't properly given in a way that lets work begin, not just an unrelated inconvenience.",
  },

  // --- Force Majeure ---
  {
    id: "force-majeure-01",
    topic: "Force Majeure",
    scenario:
      "The Contractor invokes force majeure to excuse delay caused by a general shortage of skilled labour in the market, not tied to any specific catastrophic event.",
    options: [
      "Treat a general market shortage as falling short of the force majeure threshold — check the clause's actual, usually narrower, definition",
      "Treat the labour shortage as qualifying, since it's genuinely external to the Contractor and makes performance meaningfully harder on the reasoning that it keeps things simple",
    ],
    correctIndex: 0,
    explanation:
      "Force majeure clauses typically require a specific, extraordinary, unforeseeable event beyond the party's control — a general market condition like a labour shortage usually falls short of that threshold, even if it genuinely makes things harder.",
  },
  {
    id: "force-majeure-02",
    topic: "Force Majeure",
    scenario:
      "A force majeure clause requires prompt notice of the triggering event. The Contractor waits months before notifying, then tries to invoke it retroactively.",
    options: [
      "Allow the retroactive claim, since the underlying event genuinely qualified as force majeure regardless of when it was formally raised",
      "Treat late notice as a real risk here too — many force majeure clauses treat prompt notice as a precondition to relief",
    ],
    correctIndex: 1,
    explanation:
      "This is the same notice discipline that matters throughout construction contracts — even a genuinely qualifying event may not give relief if the required notice wasn't given within the time the clause specifies.",
  },
  {
    id: "force-majeure-03",
    topic: "Force Majeure",
    scenario:
      "An event is genuinely beyond either party's control, but the contract has no force majeure clause at all.",
    options: [
      "Treat the absence of a force majeure clause as leaving no possible relief at all, since there's no contractual mechanism to invoke",
      "Look to general legal doctrines like frustration — the absence of a clause doesn't automatically close off all relief, though the bar is much higher",
    ],
    correctIndex: 1,
    explanation:
      "Without a contractual force majeure clause, a party may still look to general legal doctrines like frustration, but those are typically much harder to satisfy than a contractual clause — this is a genuine grey area to get advice on rather than assume closed off.",
  },
  {
    id: "force-majeure-04",
    topic: "Force Majeure",
    scenario:
      "The Contractor claims force majeure for a delay that it could reasonably have mitigated (for example, by sourcing from an alternate supplier) but didn't attempt to.",
    options: [
      "Check whether the clause requires reasonable mitigation — many do, and failing to attempt an obvious workaround can undermine the claim",
      "Accept the claim as it stands, since force majeure clauses excuse the qualifying event itself rather than policing how it was managed afterward",
    ],
    correctIndex: 0,
    explanation:
      "Many force majeure clauses require the affected party to use reasonable efforts to mitigate the impact — a claim can be weakened or defeated if an obvious, reasonable workaround was available and simply wasn't tried.",
  },
  {
    id: "force-majeure-05",
    topic: "Force Majeure",
    scenario:
      "A force majeure event ends, but the Contractor is slow to remobilise and wants the extended delay treated as still covered by the same event.",
    options: [
      "Extend the relief to cover the slow remobilisation too, since it's still part of the same disruption chain the original event set off",
      "Limit relief to the event's actual duration and direct effects, not an open-ended extension for unrelated remobilisation delay",
    ],
    correctIndex: 1,
    explanation:
      "Force majeure relief is tied to the impact of the qualifying event itself — once the event ends, further delay needs its own justification, and slow remobilisation caused by the contractor's own inefficiency isn't automatically swept in.",
  },
  {
    id: "force-majeure-06",
    topic: "Force Majeure",
    scenario:
      "The Contractor assumes a force majeure clause automatically excuses both time and cost, without checking what the clause actually provides.",
    options: [
      "Check the clause specifically — many force majeure provisions excuse time via an EOT but not cost, leaving standing costs with the Contractor",
      "Assume both time and cost are covered together, since force majeure is meant to hold the Contractor harmless from events beyond its control on a project like this one",
    ],
    correctIndex: 0,
    explanation:
      "It's a common misconception that force majeure automatically covers cost the same way it covers time — many clauses are deliberately limited to time relief only, so this needs to be checked rather than assumed.",
  },
  {
    id: "force-majeure-07",
    topic: "Force Majeure",
    scenario:
      "The parties dispute whether a specific event, such as a sudden regulatory shutdown, actually falls within the contract's defined list of force majeure events.",
    options: [
      "Check the clause's actual wording closely — a specific defined list may exclude an unlisted event even if it feels similar in spirit",
      "Treat the shutdown as covered, since it's clearly in the same family of disruptive, uncontrollable events the listed examples describe",
    ],
    correctIndex: 0,
    explanation:
      "Force majeure clauses are often drafted as a specific, sometimes exhaustive list of events — whether a new or unlisted event fits depends on the precise wording (and whether there's a general 'catch-all' phrase), not just a similar-in-spirit comparison.",
  },
  {
    id: "force-majeure-08",
    topic: "Force Majeure",
    scenario:
      "A force majeure event makes performance significantly more expensive but not literally impossible.",
    options: [
      "Treat the significant cost increase as sufficient, since a big enough hike in cost is effectively the same as performance being prevented",
      "Check the clause's actual threshold — most force majeure clauses require genuine impossibility or prevention, not just increased difficulty or cost",
    ],
    correctIndex: 1,
    explanation:
      "Most force majeure clauses are drafted around genuine prevention or impossibility of performance, not mere hardship — a much higher bar than 'this has become more expensive than expected,' which is a commercial risk usually left where it falls.",
  },

  // --- Latent Site Conditions ---
  {
    id: "latent-conditions-01",
    topic: "Latent Site Conditions",
    scenario:
      "The Contractor encounters unexpected soft ground and contamination not shown in the site investigation reports provided by the Employer.",
    options: [
      "Check the contract's specific ground-conditions clause — absent contrary wording, unforeseeable conditions differing materially from the site information typically support relief",
      "Treat it as the Contractor's own risk to absorb, since pricing for ground uncertainty is a standard part of a contractor's job on any site",
    ],
    correctIndex: 0,
    explanation:
      "Ground conditions risk allocation varies significantly by contract — some place it squarely on the contractor, others give relief for conditions that couldn't reasonably have been foreseen. This needs checking, not assuming.",
  },
  {
    id: "latent-conditions-02",
    topic: "Latent Site Conditions",
    scenario:
      "A contract places 'ground conditions' risk entirely on the Contractor via broad wording. The Contractor argues this can't override a genuinely latent, unforeseeable condition.",
    options: [
      "Treat the broad wording as conclusive, since the Contractor accepted ground conditions risk in unqualified terms at the outset once the facts are properly checked",
      "Treat this as genuinely contested — broad risk-allocation wording is sometimes still read subject to a genuine latent-condition standard, depending on drafting and jurisdiction",
    ],
    correctIndex: 1,
    explanation:
      "How far broadly worded risk-allocation clauses actually go — and whether truly extraordinary, unforeseeable conditions can still support relief — is a genuinely contested area that depends heavily on specific wording and jurisdiction, not a settled universal answer.",
  },
  {
    id: "latent-conditions-03",
    topic: "Latent Site Conditions",
    scenario:
      "The Contractor proceeds to deal with an unexpected ground condition without notifying the Employer or Engineer first, then submits a claim afterward.",
    options: [
      "Deal with the condition and submit the claim afterward, since what matters most is that the Employer eventually finds out and can assess the cost",
      "Notify before or as soon as proceeding — most latent condition clauses require prompt notice so the Engineer can inspect before it's dealt with",
    ],
    correctIndex: 1,
    explanation:
      "Like most claim mechanisms, latent condition clauses typically require prompt notice so the Engineer/Employer can inspect and instruct before the condition is dealt with — submitting a claim only after the fact undermines that and risks the claim being challenged.",
  },
  {
    id: "latent-conditions-04",
    topic: "Latent Site Conditions",
    scenario:
      "A condition is arguably foreseeable by an experienced contractor doing proper due diligence, such as from publicly available geological records.",
    options: [
      "Treat foreseeability as central — something reasonable due diligence and public records should have revealed generally doesn't qualify as latent as a general proposition",
      "Treat it as latent regardless, since the condition wasn't actually shown in the site investigation reports the Employer specifically provided given how these situations typically play out on site",
    ],
    correctIndex: 0,
    explanation:
      "The core of most 'latent condition' tests is genuine unforeseeability by a competent, diligent contractor — something that reasonable due diligence and available public information should have revealed generally doesn't qualify as latent.",
  },
  {
    id: "latent-conditions-05",
    topic: "Latent Site Conditions",
    scenario:
      "The Employer argues the site investigation reports provided were for information only, with a disclaimer of reliance, and therefore bear no responsibility for their accuracy.",
    options: [
      "Accept the disclaimer as fully effective, since the reports were expressly stated to be for information only and not to be relied upon",
      "Scrutinise the disclaimer rather than accepting it at face value — it doesn't always shield the Employer where its own reports were reasonably relied on",
    ],
    correctIndex: 1,
    explanation:
      "Whether an 'information only, no reliance' disclaimer actually shields the Employer from responsibility for genuinely inaccurate information it provided is a real area of dispute, not a settled given — worth challenging rather than accepting outright.",
  },
  {
    id: "latent-conditions-06",
    topic: "Latent Site Conditions",
    scenario:
      "The Contractor discovers a latent condition mid-excavation and stops all work entirely without seeking instructions, causing further delay beyond the discovery itself.",
    options: [
      "Seek instructions promptly rather than unilaterally halting everything — an overreaction can create its own additional, harder-to-recover delay",
      "Stop all work entirely until the Engineer responds, since that's the safest way to avoid making an already uncertain situation worse",
    ],
    correctIndex: 0,
    explanation:
      "The right move is usually to notify and seek instructions on how to proceed, not necessarily halt everything indefinitely — delay caused by an overcautious blanket stoppage, beyond what was actually necessary, may not be fully recoverable.",
  },
  {
    id: "latent-conditions-07",
    topic: "Latent Site Conditions",
    scenario:
      "A latent condition claim is submitted months after the condition was actually discovered, without contemporaneous records of the extra time or cost incurred.",
    options: [
      "Treat this as a significantly weaker claim — contemporaneous records are usually essential to substantiate what was actually encountered and what it cost",
      "Treat the late submission as adequate, since the condition and its cost impact can be reliably reconstructed from what the team clearly remembers in the interest of keeping the project moving",
    ],
    correctIndex: 0,
    explanation:
      "Like most construction claims, credibility and provability depend heavily on contemporaneous records — photos, dayworks sheets, correspondence at the time. A late, unsubstantiated claim is much easier to challenge or reject.",
  },
  {
    id: "latent-conditions-08",
    topic: "Latent Site Conditions",
    scenario:
      "Ground conditions differ from those described in the contract documents, but only marginally.",
    options: [
      "Support the claim on the deviation alone, since the condition doesn't exactly match what the contract documents described",
      "Check whether the deviation is actually material enough to matter under the clause — minor, expected variation usually isn't enough on its own",
    ],
    correctIndex: 1,
    explanation:
      "Most latent condition clauses require a materially different condition, not just any deviation — some variation from indicative site information is normal and expected, and doesn't by itself support a claim.",
  },

  // --- Design Responsibility ---
  {
    id: "design-responsibility-01",
    topic: "Design Responsibility",
    scenario:
      "In a design-and-build contract, the Contractor is bound by the Employer's Requirements, but discovers an error within those Requirements during design development.",
    options: [
      "Raise the error formally with the Employer rather than silently designing around it or absorbing the consequences",
      "Follow the Employer's Requirements exactly as written, since the Contractor took on design responsibility and shouldn't second-guess the brief",
    ],
    correctIndex: 0,
    explanation:
      "Even where the Contractor takes on design responsibility, discovering an error in the Employer's own Requirements is worth formally raising — how the cost and time consequences of correcting it get allocated is exactly the kind of thing that depends on the specific contract, so silence isn't the safe move.",
  },
  {
    id: "design-responsibility-02",
    topic: "Design Responsibility",
    scenario:
      "The Contractor's design fails to comply with a building code requirement that was already in force at contract signing.",
    options: [
      "Excuse the Contractor here, since it designed faithfully to a brief that never flagged the applicable code requirement in the first place",
      "Hold the Contractor responsible regardless — compliance with applicable code is generally a baseline design obligation independent of what the brief mentioned",
    ],
    correctIndex: 1,
    explanation:
      "Compliance with applicable law and codes is typically a baseline design obligation on the party doing the design, independent of whether the Employer's Requirements happened to mention it — 'the brief didn't say' isn't usually a valid excuse for a code failure.",
  },
  {
    id: "design-responsibility-03",
    topic: "Design Responsibility",
    scenario:
      "The Employer approves the Contractor's design submission, and a defect later emerges that's traceable to that design.",
    options: [
      "Treat the Employer's approval as accepting the design risk, since it had every opportunity to catch the defect before signing off",
      "Check what 'approval' actually means under this contract — Employer review or comment often doesn't shift design liability away from the Contractor",
    ],
    correctIndex: 1,
    explanation:
      "Many contracts specifically preserve the point that Employer review/approval doesn't relieve the Contractor of design responsibility — it's a check, not a liability transfer. But this depends on the exact wording, so it's worth confirming rather than assuming either way.",
  },
  {
    id: "design-responsibility-04",
    topic: "Design Responsibility",
    scenario:
      "The Contractor engages a specialist subcontractor to design a specific system, such as the façade. A defect later arises in that specific design.",
    options: [
      "Hold the main Contractor responsible to the Employer regardless of which subcontractor actually did the design work, the same as for construction work",
      "Direct responsibility to the specialist subcontractor instead, since it was the party that actually produced the façade design",
    ],
    correctIndex: 0,
    explanation:
      "This mirrors the general subcontracting principle — delegating design work to a specialist doesn't delegate the Contractor's responsibility to the Employer under the main contract, whatever recourse the Contractor separately has against that specialist.",
  },
  {
    id: "design-responsibility-05",
    topic: "Design Responsibility",
    scenario:
      "Design changes requested by the Employer mid-project cause knock-on redesign costs elsewhere. The Contractor treats this the same as a normal construction variation claim.",
    options: [
      "Treat design changes as a separate category from construction variations, since redesign cost is fundamentally different work from building something differently",
      "Treat it as a genuine variation — Employer-instructed design changes should generally follow the same instructed-variation process and valuation approach",
    ],
    correctIndex: 1,
    explanation:
      "A genuine Employer-instructed change to design requirements is usually just another form of variation, and should go through the same instruction, substantiation, and valuation process as any other change in scope.",
  },
  {
    id: "design-responsibility-06",
    topic: "Design Responsibility",
    scenario:
      "The Contractor's design technically meets the performance specification but not really what the Employer intended functionally, due to genuine ambiguity in the Employer's Requirements.",
    options: [
      "Treat this as a real interpretive dispute — genuine ambiguity is different from a straightforward design failure, resolved by which reading was more reasonable",
      "Rely on the literal wording as sufficient, since the Contractor met exactly what the performance specification said on its face",
    ],
    correctIndex: 0,
    explanation:
      "Genuinely ambiguous requirements create real interpretive disputes rather than a clear-cut breach — this is worth working through carefully (and often needs advice) rather than assuming the literal reading always wins.",
  },
  {
    id: "design-responsibility-07",
    topic: "Design Responsibility",
    scenario:
      "The Contractor isn't sure whether its design obligation is 'fit for purpose' or 'reasonable skill and care,' and hasn't checked which standard the contract actually specifies.",
    options: [
      "Confirm which standard applies — 'fit for purpose' is a stricter, outcome-based obligation, materially more onerous than 'reasonable skill and care'",
      "Treat the two standards as interchangeable, since both ultimately require the Contractor to produce a competent, workable design",
    ],
    correctIndex: 0,
    explanation:
      "'Fit for purpose' is a stricter, outcome-based obligation (the design must actually work for its intended purpose, regardless of how carefully it was done), while 'reasonable skill and care' is a conduct-based standard — which one applies materially changes the Contractor's exposure, so it's worth confirming rather than assuming.",
  },
  {
    id: "design-responsibility-08",
    topic: "Design Responsibility",
    scenario:
      "The Employer's consultant reviews and comments on the Contractor's design using language like 'noted' rather than formal 'approved' wording.",
    options: [
      "Treat 'noted' as equivalent to 'approved', since the consultant reviewed and commented on the submission either way",
      "Check what this specific wording actually means under the contract — 'noted' and 'approved' can carry genuinely different contractual consequences",
    ],
    correctIndex: 1,
    explanation:
      "Contracts sometimes deliberately distinguish between different review outcomes ('noted,' 'no objection,' 'approved') with different consequences for each — worth clarifying exactly what a specific comment means under this contract rather than treating all review language as equivalent.",
  },

  // --- Time-Bar Provisions ---
  {
    id: "time-bar-01",
    topic: "Time-Bar Provisions",
    scenario:
      "A contract requires an EOT claim to be made within 28 days 'or the claim is barred.' The Contractor misses this by a few days, even though the underlying delay was genuine and serious.",
    options: [
      "Treat the time bar as a real risk — many contracts and jurisdictions enforce strict time bars even against genuine, serious claims",
      "Treat the missed deadline as immaterial, since the underlying delay is genuine and serious enough that fairness should override a technicality",
    ],
    correctIndex: 0,
    explanation:
      "Strict time-bar clauses are specifically designed to apply even to real claims — that's the whole point of a hard deadline. Whether a specific missed deadline is fatal depends on the exact wording and jurisdiction, but it's a real risk, not something to assume away because the claim is genuine.",
  },
  {
    id: "time-bar-02",
    topic: "Time-Bar Provisions",
    scenario:
      "The Contractor argues the strict time bar shouldn't apply because the Employer was actually aware of the delay anyway through informal site discussions.",
    options: [
      "Accept the awareness argument, since the Employer genuinely knew about the delay through the site discussions regardless of formal notice",
      "Treat this as the same trap as informal notice generally — actual awareness through informal channels often doesn't satisfy a strict formal requirement",
    ],
    correctIndex: 1,
    explanation:
      "This echoes a recurring theme — formal notice requirements exist precisely to create a clear, documented trigger point, and informal awareness usually doesn't substitute for it, however reasonable that argument might feel.",
  },
  {
    id: "time-bar-03",
    topic: "Time-Bar Provisions",
    scenario:
      "A time-bar clause requires notice 'as soon as possible.' The Contractor treats this as a soft guideline rather than a real deadline with consequences.",
    options: [
      "Treat it as a soft guideline with no real teeth, since 'as soon as possible' deliberately avoids naming a fixed number of days",
      "Treat it as a real requirement with teeth — a flexible-sounding standard can still be enforced strictly depending on the clause and jurisdiction",
    ],
    correctIndex: 1,
    explanation:
      "Flexible-sounding language doesn't necessarily mean a soft deadline — whether it's still enforced strictly (and what 'as soon as possible' actually means in practice) depends on the specific clause and legal context, so it shouldn't be treated casually.",
  },
  {
    id: "time-bar-04",
    topic: "Time-Bar Provisions",
    scenario:
      "Two time-bar provisions in the same contract appear to conflict — one for EOT notices, one for payment claims — with different deadlines.",
    options: [
      "Read the specific clauses carefully to work out which applies to which type of claim, rather than assuming one overrides the other",
      "Apply the longer of the two deadlines across the board, since that's the more generous and less risky reading for whoever is claiming",
    ],
    correctIndex: 0,
    explanation:
      "Apparently conflicting time-bar clauses are often actually addressing different types of claims (time versus money) rather than genuinely conflicting — work out which specific provision governs which specific claim before assuming either deadline controls.",
  },
  {
    id: "time-bar-05",
    topic: "Time-Bar Provisions",
    scenario:
      "The Contractor gives timely notice of the delay event itself, but is late submitting the detailed substantiation required afterward.",
    options: [
      "Treat the late substantiation as fatal to the whole claim, since the clause's time-bar language doesn't obviously distinguish notice from detail",
      "Check the clause carefully — late substantiation doesn't necessarily bar the claim the same way a late initial notice would",
    ],
    correctIndex: 1,
    explanation:
      "Some clauses treat the initial notice as the hard time bar and treat later substantiation more flexibly (affecting assessment rather than barring the claim entirely) — but this varies by clause, so it needs checking rather than assuming the harshest reading.",
  },
  {
    id: "time-bar-06",
    topic: "Time-Bar Provisions",
    scenario:
      "The Employer never raises a time-bar defence until well into a dispute or adjudication, long after receiving the late notice without any objection at the time.",
    options: [
      "Treat prior conduct as potentially relevant — not objecting at the time can sometimes affect a party's later ability to rely on a strict time bar",
      "Allow the time-bar defence regardless of the earlier silence, since a contractual deadline either was or wasn't met on the facts",
    ],
    correctIndex: 0,
    explanation:
      "Doctrines like waiver or estoppel can, in some circumstances, affect whether a party that didn't object at the time can later insist on a strict time bar — this is genuinely fact- and jurisdiction-specific, worth raising as an argument rather than assuming it has no effect.",
  },
  {
    id: "time-bar-07",
    topic: "Time-Bar Provisions",
    scenario:
      "A time-bar clause is triggered by when the Contractor 'ought reasonably to have known' of the delay, not just actual knowledge. The Contractor assumes only actual knowledge starts the clock.",
    options: [
      "Read the clause's actual trigger carefully — an 'ought to have known' standard can start the clock earlier than genuine actual knowledge",
      "Use actual knowledge as the trigger, since that's the more natural and easily provable starting point for any notice period",
    ],
    correctIndex: 0,
    explanation:
      "An objective 'ought reasonably to have known' trigger is a materially different (and often earlier) starting point than pure subjective actual knowledge — assuming the more generous reading without checking the clause's actual wording is a good way to miss a deadline.",
  },
  {
    id: "time-bar-08",
    topic: "Time-Bar Provisions",
    scenario:
      "The Contractor treats a time-bar deadline as informally extendable by a quick agreement over email with the Employer's representative, without checking if the contract requires a formal written variation to change its own procedural deadlines.",
    options: [
      "Treat the email exchange as a valid extension, since both representatives clearly agreed to it in writing at the time",
      "Check what the contract requires to vary its own terms — an informal email may not be effective if a formal variation mechanism is required",
    ],
    correctIndex: 1,
    explanation:
      "Contracts often require their own terms — including procedural deadlines — to be varied only through a formal mechanism (e.g., a signed written variation). An informal email, however well-intentioned, may not actually be effective to change the contractual deadline if that mechanism isn't followed.",
  },

  // --- Bonds & Guarantees ---
  {
    id: "bonds-01",
    topic: "Bonds & Guarantees",
    scenario:
      "The Employer wants to call an on-demand performance bond immediately after a dispute arises, without first assessing whether it has actually suffered any loss.",
    options: [
      "Check whether the call is genuine and made in good faith — bad-faith calls or calls for an improper purpose can still be challenged in clear cases",
      "Treat the call as unchallengeable once made, since on-demand bonds are specifically designed to be paid out with minimal underlying proof",
    ],
    correctIndex: 0,
    explanation:
      "On-demand bonds are deliberately designed to be paid quickly with minimal underlying proof — that's their commercial value. But that doesn't put every call beyond challenge; calls made in bad faith or for a purpose the bond wasn't meant to cover can still be restrained in genuinely clear cases.",
  },
  {
    id: "bonds-02",
    topic: "Bonds & Guarantees",
    scenario:
      "A performance bond is due to expire at practical completion, but the Employer wants the Contractor to extend it to also cover the entire defects liability period.",
    options: [
      "Extend the bond to cover the DLP as requested, since keeping security in place through defects liability is generally in everyone's interest",
      "Check what the contract actually requires — bond duration and coverage should match the agreed security period, not be extended informally",
    ],
    correctIndex: 1,
    explanation:
      "The bond's required duration and coverage is a specific contractual term — align it to what's actually agreed rather than either party informally deciding to extend or shorten it.",
  },
  {
    id: "bonds-03",
    topic: "Bonds & Guarantees",
    scenario:
      "The Contractor's performance bond issuer becomes financially distressed, and there are real doubts about whether it could actually pay out if called.",
    options: [
      "Treat the bond as adequate security regardless, since a validly issued bond document is what the contract actually calls for",
      "Raise this and check — a bond is only as good as the issuer's ability to pay, and some contracts require issuers meeting minimum credit criteria",
    ],
    correctIndex: 1,
    explanation:
      "A bond is a promise to pay, and that promise is only as strong as the issuer behind it — many contracts specifically require bonds from banks or insurers meeting certain criteria for exactly this reason.",
  },
  {
    id: "bonds-04",
    topic: "Bonds & Guarantees",
    scenario:
      "A parent company guarantee is provided in place of a performance bond. The Contractor's parent company is later sold to a new, unrelated owner.",
    options: [
      "Check what happens to the guarantee's validity after a change of ownership — this needs verifying, not assumed to continue seamlessly",
      "Treat the guarantee as continuing unaffected, since the sale changed who owns the parent, not the parent entity that actually signed the guarantee",
    ],
    correctIndex: 0,
    explanation:
      "Whether a parent company guarantee survives a change in the parent's own ownership depends on how it's drafted — a real question to check rather than assume, given how much can change in a corporate sale.",
  },
  {
    id: "bonds-05",
    topic: "Bonds & Guarantees",
    scenario:
      "The Employer wants to call the bond for its full face value to cover a claim that's actually much smaller than that amount.",
    options: [
      "Call the full face value, since any valid claim, however small, is enough to trigger the Employer's right to draw on the bond, which is the more common shortcut taken under time pressure",
      "Limit the call to the actual entitlement — a bond secures genuine loss, not a windfall unrelated to the underlying claim's size in a case like this",
    ],
    correctIndex: 1,
    explanation:
      "Even where a bond is easily callable, calling for more than the genuine underlying entitlement can itself be challenged as an improper call — the bond secures actual loss, not a windfall.",
  },
  {
    id: "bonds-06",
    topic: "Bonds & Guarantees",
    scenario:
      "The Contractor assumes a bond automatically reduces in value as the project nears completion, without checking the bond document itself.",
    options: [
      "Check the bond's actual terms — some do step down at defined milestones, but this isn't automatic or universal",
      "Assume the bond value has reduced with progress, since that's generally how security is expected to track completion",
    ],
    correctIndex: 0,
    explanation:
      "Bond reduction or step-down mechanisms are a specific negotiated feature, not a universal default — some bonds hold their full face value throughout, so this needs checking rather than assuming.",
  },
  {
    id: "bonds-07",
    topic: "Bonds & Guarantees",
    scenario:
      "A retention bond is provided in lieu of cash retention. The Employer wants to also deduct cash retention on top of it from payments.",
    options: [
      "Check the contract — a retention bond is typically meant to substitute for cash retention, not sit alongside it as an additional deduction",
      "Deduct the cash retention on top, since holding a bond is a separate security arrangement from the retention percentage in the payment terms",
    ],
    correctIndex: 0,
    explanation:
      "The whole point of a retention bond is to free up the contractor's cash flow by substituting for cash retention — deducting both would effectively double the security, which isn't what these arrangements are meant to do.",
  },
  {
    id: "bonds-08",
    topic: "Bonds & Guarantees",
    scenario:
      "The project reaches final completion, and the Employer is slow to release the performance bond even though all conditions for release appear to have been met.",
    options: [
      "Leave the bond in place until it's convenient for the Employer to arrange release, since there's no urgency once all obligations are substantively met",
      "Follow up formally against the contract's stated release trigger and timeframe — bonds shouldn't be held indefinitely past the point they're due",
    ],
    correctIndex: 1,
    explanation:
      "Bonds are usually tied to a specific release trigger and timeframe — an unreasonable delay past that point is worth chasing, the same as any other contractual entitlement that's become due.",
  },

  // --- Health & Safety ---
  {
    id: "safety-01",
    topic: "Health & Safety",
    scenario:
      "A subcontractor's unsafe work practice is spotted by the main contractor's site supervisor, but nothing is done because it's 'the subcontractor's own responsibility.'",
    options: [
      "Act on it — overall site safety responsibility generally sits with the main contractor regardless of who's doing the specific task",
      "Leave it to the subcontractor to address, since it's the party directly performing and controlling that specific task",
    ],
    correctIndex: 0,
    explanation:
      "Overall responsibility for site safety typically sits with the main contractor (or a designated principal contractor) regardless of who's doing the specific task — spotting an unsafe practice and doing nothing is a real exposure, not just the subcontractor's issue.",
  },
  {
    id: "safety-02",
    topic: "Health & Safety",
    scenario:
      "An accident occurs on site. The Contractor is unsure whether it needs to report it to the relevant authority or can just handle it internally.",
    options: [
      "Handle it internally for now, since the incident seems minor enough that formal reporting can wait until there's more clarity",
      "Check the applicable regulations — many jurisdictions require statutory reporting of certain incidents regardless of internal preference",
    ],
    correctIndex: 1,
    explanation:
      "Workplace safety incidents are often subject to mandatory statutory reporting thresholds independent of what the parties would prefer — check the applicable regulation rather than assuming internal handling is sufficient.",
  },
  {
    id: "safety-03",
    topic: "Health & Safety",
    scenario:
      "The Employer's own instructed method of work creates a safety risk the Contractor flags, but the Employer insists the Contractor proceed as instructed.",
    options: [
      "Proceed as instructed, since the Employer directed the specific method and formally bears the consequences of that choice on balance",
      "Raise the concern formally and don't proceed with something genuinely unsafe just because it was instructed — safety obligations aren't overridden by an instruction",
    ],
    correctIndex: 1,
    explanation:
      "Contractual instructions don't override independent safety obligations — a contractor generally can't be compelled to carry out work it genuinely believes is unsafe, and should escalate rather than silently comply or silently refuse without documenting why.",
  },
  {
    id: "safety-04",
    topic: "Health & Safety",
    scenario:
      "A safety non-compliance results in a stop-work order from a regulator. The Contractor wants to claim the resulting delay as an EOT, treating it like any other Employer-caused delay.",
    options: [
      "Check the actual cause — a stop-work order resulting from the Contractor's own non-compliance generally wouldn't qualify as excusable delay",
      "Grant the EOT, since a regulator's stop-work order is an external event outside the Contractor's control by definition",
    ],
    correctIndex: 0,
    explanation:
      "Whether a delay is excusable depends on why it happened — a stop-work order caused by the contractor's own safety failure is generally treated as the contractor's own risk, not an Employer-caused or neutral event.",
  },
  {
    id: "safety-05",
    topic: "Health & Safety",
    scenario:
      "The Contractor assumes that having generic, project-wide safety documentation is sufficient, without task-specific method statements for higher-risk activities.",
    options: [
      "Rely on the generic documentation, since it already covers general site hazards that apply across all the different activities",
      "Check what's actually required — many regimes require task-specific method statements for defined higher-risk activities, not just generic documentation",
    ],
    correctIndex: 1,
    explanation:
      "Generic safety documentation often isn't enough on its own — higher-risk activities typically need their own specific method statements and risk assessments, both as good practice and often as a regulatory requirement.",
  },
  {
    id: "safety-06",
    topic: "Health & Safety",
    scenario:
      "A worker is injured due to a genuine third party's negligence (for example, a delivery driver unrelated to either party). The Contractor assumes it bears no responsibility at all since it wasn't directly at fault.",
    options: [
      "Assess the Contractor's overall site safety and insurance obligations properly, even where a third party was the immediate cause",
      "Treat the Contractor as having no exposure at all, since the delivery driver's negligence was clearly outside the Contractor's control",
    ],
    correctIndex: 0,
    explanation:
      "Overall site safety management duties can still be engaged even when a third party is the immediate cause — worth assessing properly (and exactly what site insurance is meant to cover) rather than assuming zero responsibility.",
  },
  {
    id: "safety-07",
    topic: "Health & Safety",
    scenario:
      "The Employer's representative regularly visits site without following the Contractor's site safety induction and PPE requirements.",
    options: [
      "Enforce the same safety requirements on every visitor, including the Employer's representative — compliance shouldn't have seniority-based exceptions",
      "Waive the induction and PPE steps for the Employer's representative, since their visits are brief and they're generally aware of site hazards rather than waiting on a more formal process",
    ],
    correctIndex: 0,
    explanation:
      "Site safety rules generally need to apply uniformly to anyone entering the site — making informal exceptions, even for the Employer's own people, undermines the whole system and creates real liability exposure.",
  },
  {
    id: "safety-08",
    topic: "Health & Safety",
    scenario:
      "The Contractor treats safety training records as optional paperwork, since 'the workers already know what they're doing.'",
    options: [
      "Treat the paperwork as optional, since genuinely competent workers are what actually keeps a site safe, not the records describing them",
      "Keep proper training and induction records regardless of actual competence — documentation is often what's actually checked in an audit or after an incident",
    ],
    correctIndex: 1,
    explanation:
      "In practice, safety compliance is heavily judged on documented evidence — genuine competence without proper records can still leave a contractor exposed in an audit, inspection, or after an incident, so the paperwork matters in its own right.",
  },

  // --- Nominated Subcontractors ---
  {
    id: "nominated-subcontractors-01",
    topic: "Nominated Subcontractors",
    scenario:
      "The Employer nominates a subcontractor for specialist work. That nominated subcontractor turns out to be persistently late, and the main Contractor wants to claim an EOT for the resulting delay.",
    options: [
      "Check the contract's specific nominated-subcontractor delay provisions — these often shift more risk to the Employer than an ordinary subcontractor's default",
      "Treat it as the main Contractor's own risk, since delay caused by any subcontractor is ultimately the main Contractor's to manage",
    ],
    correctIndex: 0,
    explanation:
      "Because nominated subcontractors are effectively imposed on the main contractor by the Employer, many standard forms treat their default differently from an ordinary, freely-chosen subcontractor's default — worth checking the specific clause rather than assuming it's treated the same.",
  },
  {
    id: "nominated-subcontractors-02",
    topic: "Nominated Subcontractors",
    scenario:
      "A nominated subcontractor becomes insolvent mid-project. The main Contractor isn't sure who bears responsibility for finding and engaging a replacement.",
    options: [
      "Leave it to the main Contractor to find a replacement, since it's still the party ultimately responsible for delivering the works",
      "Check the contract's renomination mechanism — many require the Employer or Engineer to nominate a replacement rather than leaving it to the main Contractor alone",
    ],
    correctIndex: 1,
    explanation:
      "Nomination provisions often include a renomination process specifically because the Employer chose the original subcontractor — leaving the main contractor to sort it out entirely alone may not match what the contract actually provides for.",
  },
  {
    id: "nominated-subcontractors-03",
    topic: "Nominated Subcontractors",
    scenario:
      "The main Contractor objects to a proposed nominated subcontractor on reasonable grounds, such as known poor performance on a similar project, but the Employer insists on proceeding anyway.",
    options: [
      "Accept the nomination as final, since the Employer's choice of specialist subcontractor is generally its own prerogative to make",
      "Raise the reasonable objection formally and pursue it — most nomination clauses give the main Contractor some right to object on reasonable grounds",
    ],
    correctIndex: 1,
    explanation:
      "Most nomination mechanisms give the main contractor some ability to raise reasonable objections, precisely because the main contractor still carries overall responsibility for the works — a blanket 'no right to object' assumption is usually wrong.",
  },
  {
    id: "nominated-subcontractors-04",
    topic: "Nominated Subcontractors",
    scenario:
      "Payment to a nominated subcontractor is meant to flow through the main Contractor, but the main Contractor is having cash flow problems and delays passing on payment already received for that subcontractor's work.",
    options: [
      "Treat this as a real risk — some contracts include a direct-payment mechanism letting the Employer pay the nominated subcontractor if the main Contractor doesn't pass on payment",
      "Assume no direct-payment route exists, since payment always runs through the main Contractor under the standard contractual chain when you look at it closely",
    ],
    correctIndex: 0,
    explanation:
      "Because of exactly this risk, some standard forms provide for direct payment to nominated subcontractors if the main contractor fails to pass on payment — worth checking whether that mechanism exists in this contract.",
  },
  {
    id: "nominated-subcontractors-05",
    topic: "Nominated Subcontractors",
    scenario:
      "A defect is traced to a nominated subcontractor's work. The main Contractor argues it shouldn't be liable since it didn't choose that subcontractor.",
    options: [
      "Excuse the main Contractor from liability, since it had no say in choosing the subcontractor whose work turned out to be defective",
      "Check the specific contract wording — the main Contractor's liability for nominated work varies by contract and isn't automatically excused by nomination alone",
    ],
    correctIndex: 1,
    explanation:
      "This is genuinely contract-specific — some forms preserve the main contractor's full responsibility even for nominated work, others provide some relief given the lack of choice. Check the actual wording rather than assuming either extreme.",
  },
  {
    id: "nominated-subcontractors-06",
    topic: "Nominated Subcontractors",
    scenario:
      "The Employer wants to nominate a subcontractor for work that was originally priced and included in the main Contractor's own scope and rates.",
    options: [
      "Query this before proceeding — nominating a subcontractor for work already priced in the main Contractor's scope can create a real commercial and coordination issue",
      "Accept the nomination without adjustment, since the Employer retains a general right to nominate subcontractors for any part of the works",
    ],
    correctIndex: 0,
    explanation:
      "Nominating a subcontractor for work the main contractor already priced and planned to do itself can genuinely disrupt the commercial basis of the contract — worth flagging and resolving (often via adjustment of the contract sum) rather than silently absorbed.",
  },
  {
    id: "nominated-subcontractors-07",
    topic: "Nominated Subcontractors",
    scenario:
      "A nomination instruction doesn't specify the price or terms the main Contractor is meant to contract with the nominated subcontractor on.",
    options: [
      "Clarify the commercial terms, or the process for agreeing them, before proceeding on a bare nomination instruction in the ordinary course",
      "Proceed and accept whatever terms the nominated subcontractor proposes, since the nomination instruction itself establishes the obligation to contract",
    ],
    correctIndex: 0,
    explanation:
      "A nomination needs to come with clear terms, or a clear process for agreeing them, for the main contractor to actually contract on — proceeding on an undefined basis just defers a dispute rather than avoiding one.",
  },
  {
    id: "nominated-subcontractors-08",
    topic: "Nominated Subcontractors",
    scenario:
      "The main Contractor wants to pass through a nominated subcontractor's exact delay and EOT claims to the Employer without independently checking whether they're actually justified.",
    options: [
      "Pass the claim through as received, since the main Contractor is essentially a conduit for a subcontractor it didn't choose and doesn't control",
      "Independently assess the claim's merits before passing it through — the main Contractor's position shouldn't simply mirror whatever the subcontractor claims",
    ],
    correctIndex: 1,
    explanation:
      "Even with a nominated subcontractor, the main contractor still stands between the subcontractor and the Employer commercially — passing through unverified claims can create liability if they turn out to be unjustified.",
  },

  // --- Testing & Commissioning ---
  {
    id: "testing-commissioning-01",
    topic: "Testing & Commissioning",
    scenario:
      "A system fails its first commissioning test. The Contractor wants to know whether this alone constitutes a breach entitling the Employer to reject the works.",
    options: [
      "Check the contract's testing and retest provisions — most allow retesting after remedial work rather than treating one failure as automatic breach",
      "Treat the failed test as a breach entitling rejection, since the system didn't perform to the specified commissioning standard on the day",
    ],
    correctIndex: 0,
    explanation:
      "Testing regimes are usually built around an iterative test-fail-fix-retest cycle, not a single pass/fail moment — a first failure is normal and expected to be followed by rectification and retesting, not an automatic default.",
  },
  {
    id: "testing-commissioning-02",
    topic: "Testing & Commissioning",
    scenario:
      "The Employer wants to take over and start using a system before it has actually passed its commissioning tests, citing operational urgency.",
    options: [
      "Allow the early takeover, since operational urgency is a reasonable commercial reason to start using a system that seems to be working given the practical realities of running the job",
      "Flag this as a real risk — using an unproven system before it passes tests can create ambiguity about liability if something later goes wrong",
    ],
    correctIndex: 1,
    explanation:
      "Putting a system into use before it's actually demonstrated to work through proper testing blurs the line on who's responsible if it fails afterward — worth documenting and agreeing on explicitly, not just proceeding informally.",
  },
  {
    id: "testing-commissioning-03",
    topic: "Testing & Commissioning",
    scenario:
      "Test results are recorded informally in a notebook rather than through the contract's specified test certificate process.",
    options: [
      "Treat the notebook entries as sufficient, since they still show the tests were actually carried out and roughly what the results were since that's typically the more convenient reading",
      "Follow the contract's actual test certification process — informal records may not establish that testing requirements were properly met in this kind of situation",
    ],
    correctIndex: 1,
    explanation:
      "If the contract specifies a particular test certification process, that's what actually establishes compliance — informal records can create real disputes later about whether proper testing genuinely occurred.",
  },
  {
    id: "testing-commissioning-04",
    topic: "Testing & Commissioning",
    scenario:
      "A commissioning delay is caused by the Employer's late supply of operational data or connection to their own systems needed to complete testing.",
    options: [
      "Treat this as likely an Employer-caused delay to commissioning, worth raising as such rather than absorbed as the Contractor's own",
      "Absorb it as the Contractor's own commissioning delay, since commissioning sits within the Contractor's overall scope of responsibility",
    ],
    correctIndex: 0,
    explanation:
      "Commissioning often depends on inputs only the Employer can provide — a delay genuinely caused by late Employer input is a different situation from the Contractor's own testing being behind schedule, and should be treated accordingly.",
  },
  {
    id: "testing-commissioning-05",
    topic: "Testing & Commissioning",
    scenario:
      "The Contractor wants to skip a specified test because it's confident the system will pass anyway, to save time.",
    options: [
      "Skip the test in this instance, since the Contractor's technical confidence in a known, proven system configuration is a reasonable basis to save time",
      "Follow the specified testing procedure regardless of confidence in the outcome — skipping a required test isn't a unilateral call to make",
    ],
    correctIndex: 1,
    explanation:
      "Specified tests exist to create an objective, agreed record of performance — confidence in the outcome doesn't substitute for actually running the required test, and skipping it can undermine the contractor's own later claim that the system works.",
  },
  {
    id: "testing-commissioning-06",
    topic: "Testing & Commissioning",
    scenario:
      "A test is passed, but months later the same system fails in actual operation. The Employer wants to argue the original test was somehow invalid.",
    options: [
      "Investigate properly — a later failure doesn't automatically invalidate an earlier genuinely passed test, though what changed since is worth checking",
      "Treat the later failure as proof the original test was flawed, since a properly functioning system shouldn't fail months after a genuine pass without needing to escalate the matter further",
    ],
    correctIndex: 0,
    explanation:
      "Equipment can genuinely degrade or fail after a valid initial pass for reasons unrelated to the original test's validity — a later failure raises a real question worth investigating, not an automatic conclusion that the earlier test was flawed.",
  },
  {
    id: "testing-commissioning-07",
    topic: "Testing & Commissioning",
    scenario:
      "The commissioning specification is ambiguous about what performance threshold counts as a 'pass.' The parties disagree on the interpretation.",
    options: [
      "Treat this as a genuine interpretive dispute needing technical input, rather than either party unilaterally deciding its own reading is correct under most standard forms",
      "Read the ambiguous threshold in the Contractor's favour, since the Employer's own specification created the uncertainty in the first place given the commercial pressure to avoid further delay",
    ],
    correctIndex: 0,
    explanation:
      "A genuinely ambiguous performance threshold is a real dispute to work through — using objective technical criteria and the parties' actual intent, not simply defaulting to whichever reading favors one side.",
  },
  {
    id: "testing-commissioning-08",
    topic: "Testing & Commissioning",
    scenario:
      "The Contractor's own commissioning engineer signs off on tests without the Employer's representative being present, even though the contract requires the Employer's witness.",
    options: [
      "Accept the self-certified sign-off, since the Contractor's own commissioning engineer is technically qualified to confirm the test results",
      "Follow the contract's witnessing requirement — self-certified tests without the required witness may not be accepted as valid compliance",
    ],
    correctIndex: 1,
    explanation:
      "If the contract specifically requires the Employer to witness testing, self-certifying without that witness present doesn't satisfy the requirement — exactly the kind of procedural step that can undermine an otherwise legitimate test result if later disputed.",
  },

  // --- Programme & Scheduling ---
  {
    id: "programme-01",
    topic: "Programme & Scheduling",
    scenario:
      "The Contractor submits a programme that shows an unrealistically compressed schedule just to satisfy contractual submission requirements, without genuinely planning to work to it.",
    options: [
      "Push back and require a realistic, achievable programme — a nominally compliant but unrealistic one undermines the whole point of having one",
      "Accept the submission as satisfying the requirement, since the contract calls for a programme to be submitted, not for it to be genuinely achievable",
    ],
    correctIndex: 0,
    explanation:
      "A programme is meant to be a genuine planning and monitoring tool — accepting an unrealistic one just to tick a submission box defeats its purpose and makes later delay analysis far harder.",
  },
  {
    id: "programme-02",
    topic: "Programme & Scheduling",
    scenario:
      "The Contractor updates its programme monthly but never actually revises the critical path logic, just shifts the same bars later each time.",
    options: [
      "Accept the update as adequate, since the programme is still being kept current and the bars reflect the latest known dates as the more expedient route in the circumstances",
      "Treat this as a red flag — a genuine programme update should re-examine logic and critical path, not just mechanically slide dates as a matter of practice",
    ],
    correctIndex: 1,
    explanation:
      "A programme update that never re-examines its own logic isn't really tracking reality — it's just recording slippage. A credible programme update reflects genuine replanning, not a mechanical date shift.",
  },
  {
    id: "programme-03",
    topic: "Programme & Scheduling",
    scenario:
      "The Employer's representative informally suggests resequencing part of the works during a site meeting, and the Contractor proceeds without any formal instruction or programme revision.",
    options: [
      "Proceed on the informal suggestion, since it came directly from the Employer's own representative during a recorded site meeting",
      "Get it confirmed formally and reflected in a revised programme before proceeding — informal suggestions shouldn't quietly become the working plan",
    ],
    correctIndex: 1,
    explanation:
      "The same discipline about formal instructions applies to programme changes — an informal suggestion, even from the right person, should be confirmed and properly reflected before it becomes the basis for how work proceeds.",
  },
  {
    id: "programme-04",
    topic: "Programme & Scheduling",
    scenario:
      "The Contractor's programme shows significant float on a particular activity. The Employer argues that any delay to that activity can never support an EOT because of the float.",
    options: [
      "Check who owns the float and how the contract treats it — this is a genuinely contested area, not a settled default in the Employer's favour",
      "Treat the float as the Employer's, so any delay absorbed by it doesn't support an EOT — that's generally how programme float works",
    ],
    correctIndex: 0,
    explanation:
      "Who 'owns' float — and therefore whether using it up defeats an EOT claim — is a genuinely unsettled and contract-specific question. Don't assume a default answer either way without checking the contract and the facts.",
  },
  {
    id: "programme-05",
    topic: "Programme & Scheduling",
    scenario:
      "A subcontractor's programme conflicts with the main programme's sequencing, but the main Contractor hasn't reconciled the two before issuing instructions to the subcontractor.",
    options: [
      "Let the subcontractor manage to its own programme, since it's ultimately responsible for delivering its own scope on time",
      "Reconcile the subcontractor's programme with the main one before issuing instructions — an unresolved conflict is a recipe for disputes",
    ],
    correctIndex: 1,
    explanation:
      "An unreconciled conflict between the main and subcontractor programmes is exactly the kind of coordination failure that causes real delay and disruption — worth resolving proactively, not discovered mid-execution.",
  },
  {
    id: "programme-06",
    topic: "Programme & Scheduling",
    scenario:
      "The Contractor wants to claim an EOT based on a theoretical, unbuilt 'what-if' programme rather than the actual as-built progress and the accepted baseline programme.",
    options: [
      "Base the claim on the accepted baseline and actual as-built progress — a purely theoretical programme is a much weaker basis for a real claim",
      "Accept the theoretical programme as a valid basis, since it demonstrates what should have happened absent the claimed delay event",
    ],
    correctIndex: 0,
    explanation:
      "EOT claims are strongest when tied to what was actually agreed as the baseline and what actually happened on site — a hypothetical programme constructed after the fact to support a claim is far more vulnerable to challenge.",
  },
  {
    id: "programme-07",
    topic: "Programme & Scheduling",
    scenario:
      "The Employer wants to reject a Contractor's programme submission outright without giving any specific reasons, just calling it 'unsatisfactory.'",
    options: [
      "Request specific reasons — a vague rejection without substantive grounds may not be a valid rejection under the contract's actual requirements",
      "Accept the rejection as valid, since the contract gives the Employer's representative discretion to approve or reject programme submissions on the reasoning that it keeps things simple",
    ],
    correctIndex: 0,
    explanation:
      "If the contract requires programme approval, a rejection generally needs to be on some substantive, communicable basis — an unexplained 'unsatisfactory' doesn't give the contractor anything to actually respond to or fix.",
  },
  {
    id: "programme-08",
    topic: "Programme & Scheduling",
    scenario:
      "The Contractor treats the baseline programme as fixed and never revisited, even after multiple approved variations that clearly change the sequence and duration of the works.",
    options: [
      "Keep the original baseline fixed, since re-baselining risks blurring the historical record of what was actually first agreed on a project like this one",
      "Update and re-baseline the programme to reflect approved changes — an outdated baseline makes delay analysis much harder later",
    ],
    correctIndex: 1,
    explanation:
      "A baseline that no longer reflects the actual agreed scope and sequence stops being a useful reference point — it should be revised, with proper agreement, to keep delay analysis meaningful as the project evolves.",
  },

  // --- Novation ---
  {
    id: "novation-01",
    topic: "Novation",
    scenario:
      "A design consultant is novated from the Employer to the Contractor partway through design development. The Contractor assumes it now has zero exposure for any design work already done before novation.",
    options: [
      "Check the novation agreement's actual terms — liability for pre-novation design work depends on how the novation is specifically drafted on the facts here",
      "Assume the Contractor now has zero exposure, since novation is generally understood to hand over the whole design relationship cleanly given how these situations typically play out on site",
    ],
    correctIndex: 0,
    explanation:
      "Novation agreements vary in how they treat pre-novation liability — some transfer full responsibility including for prior work, others don't. This needs checking in the specific agreement, not assumed either way.",
  },
  {
    id: "novation-02",
    topic: "Novation",
    scenario:
      "After novation, the newly-novated consultant continues receiving informal instructions directly from the original Employer, bypassing the Contractor who is now technically their client.",
    options: [
      "Let it continue for now, since the consultant is still producing the same quality of work regardless of who's technically instructing it in the interest of keeping the project moving",
      "Raise and stop this — post-novation, instructions should flow through the new contractual relationship, not the old one informally continuing",
    ],
    correctIndex: 1,
    explanation:
      "Novation is meant to genuinely shift the contractual relationship — old habits of direct informal instruction undermine that and can create confusion about who's actually responsible for what going forward.",
  },
  {
    id: "novation-03",
    topic: "Novation",
    scenario:
      "The novation agreement is silent on what happens to fees already invoiced but unpaid by the consultant to the Employer before the novation date.",
    options: [
      "Treat the fees as carried over automatically, since the novation agreement is meant to pick up the consultant relationship as it currently stands",
      "Resolve this explicitly before signing — a gap on historic unpaid fees is a real loose end, not something to assume is covered elsewhere",
    ],
    correctIndex: 1,
    explanation:
      "A gap in the novation agreement about historic unpaid fees is a real loose end — leaving it unresolved just defers a dispute about who's actually responsible for that amount.",
  },
  {
    id: "novation-04",
    topic: "Novation",
    scenario:
      "The Contractor wants to hold the newly-novated consultant to the same standard of care that applied under the original Employer-consultant agreement, without checking if the novation preserved those exact terms.",
    options: [
      "Check the novation agreement to confirm what terms actually carried over — full continuity of every original term isn't safe to assume",
      "Assume the original standard of care carried over unchanged, since novation is generally meant to substitute the client, not rewrite the terms",
    ],
    correctIndex: 0,
    explanation:
      "Novation can either preserve the original terms or introduce new ones, depending on how it's drafted — confirm what actually survived the novation rather than assuming full continuity.",
  },
  {
    id: "novation-05",
    topic: "Novation",
    scenario:
      "A consultant refuses to be novated, preferring to keep its direct contract with the Employer, even though the Employer and Contractor have already agreed novation should happen.",
    options: [
      "Proceed with the novation regardless, since the Employer and Contractor's mutual agreement is what actually drives the arrangement",
      "Resolve this with the consultant directly — its own consent is generally required for a valid novation, not just agreement between the other two",
    ],
    correctIndex: 1,
    explanation:
      "Novation is a three-party arrangement requiring the consent of all three parties, including the party being novated — the Employer and Contractor agreeing between themselves isn't enough on its own.",
  },
  {
    id: "novation-06",
    topic: "Novation",
    scenario:
      "Design errors are discovered that trace back to work done by the consultant before novation, but the defect only becomes apparent after novation and well into construction.",
    options: [
      "Analyse the novation agreement's liability allocation carefully — timing of discovery doesn't necessarily determine which party bears responsibility",
      "Hold the Contractor responsible, since it currently holds the consultant's contract at the point the defect actually came to light",
    ],
    correctIndex: 0,
    explanation:
      "Liability typically attaches to when the error was actually made, not when it happens to be discovered — but how the novation agreement allocates responsibility for pre-novation errors is the real thing to check.",
  },
  {
    id: "novation-07",
    topic: "Novation",
    scenario:
      "The Contractor wants to novate a consultant it never chose and has concerns about, purely because the Employer originally engaged them.",
    options: [
      "Raise concerns and review the consultant's track record before proceeding — accepting a novation doesn't have to be a rubber stamp",
      "Accept the novation as presented, since the consultant was the Employer's own choice and the Contractor is simply stepping into that relationship",
    ],
    correctIndex: 0,
    explanation:
      "While novation is often a standard part of a design-and-build arrangement, genuine concerns about the specific consultant are worth raising and addressing before accepting — it's not purely a formality to wave through.",
  },
  {
    id: "novation-08",
    topic: "Novation",
    scenario:
      "Insurance coverage for the consultant's professional liability is not addressed at all in the novation agreement.",
    options: [
      "Leave it unaddressed, since the same consultant and the same professional indemnity policy carry on regardless of who's technically the client",
      "Resolve this explicitly — confirm whether the consultant's professional indemnity cover continues to respond appropriately to pre- and post-novation work",
    ],
    correctIndex: 1,
    explanation:
      "Novation can have real implications for how professional indemnity insurance responds to claims, particularly for errors that straddle the novation date — this is worth explicitly confirming, not left as an assumption.",
  },

  // --- Contra Charges / Back-Charging ---
  {
    id: "contra-charges-01",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "The main Contractor wants to deduct a contra charge from a subcontractor's payment for alleged extra costs caused by the subcontractor's delay, without any prior notice to the subcontractor.",
    options: [
      "Check the subcontract for the required notice or process before deducting — an undocumented, unnotified deduction is easy to successfully challenge in this context",
      "Deduct it now and explain later if asked, since the delay costs are real and the subcontractor will find out from the reduced payment anyway, which is the more common shortcut taken under time pressure",
    ],
    correctIndex: 0,
    explanation:
      "Like most deductions, contra charges typically need to follow a specific contractual process — notifying the other party and giving it a chance to respond — before being applied. An undisclosed deduction invites a dispute.",
  },
  {
    id: "contra-charges-02",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "A contra charge is applied based on an estimated cost of rectification, before the actual rectification work has even been carried out or invoiced.",
    options: [
      "Apply the estimated figure directly, since waiting for the actual rectification invoice would only delay recovering a cost that's clearly going to be incurred",
      "Check whether the subcontract allows charging on a reasonable estimate, and substantiate it properly — an unsupported guess is vulnerable either way",
    ],
    correctIndex: 1,
    explanation:
      "Some contracts do allow contra charges based on a reasonable estimate, but that estimate still needs to be genuinely substantiated — an unsupported guess is vulnerable to challenge either way.",
  },
  {
    id: "contra-charges-03",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "The main Contractor applies a contra charge that's actually larger than the value of the subcontractor's remaining payment, resulting in the subcontractor owing money back.",
    options: [
      "Cap the deduction at the remaining payment value, since a contra charge can't really go further than the money actually available to withhold rather than waiting on a more formal process",
      "Treat this as legitimate in principle if properly substantiated, though a charge large enough to flip the balance invites especially close scrutiny",
    ],
    correctIndex: 1,
    explanation:
      "There's no inherent cap tying a contra charge to the remaining payment value — but a charge large enough to flip the balance owed is exactly the kind of deduction that invites the closest scrutiny, so the substantiation needs to be solid.",
  },
  {
    id: "contra-charges-04",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "A subcontractor disputes a contra charge, but the main Contractor proceeds to deduct it anyway before the dispute is resolved.",
    options: [
      "Check the subcontract's dispute process — deducting a genuinely disputed charge before resolution can itself be a breach depending on what's required",
      "Proceed with the deduction now, since the dispute can be argued out afterward without changing the practical cash position in the meantime",
    ],
    correctIndex: 0,
    explanation:
      "Some subcontracts require disputed deductions to be held pending resolution rather than deducted immediately — proceeding to deduct anyway can turn a legitimate charge into a separate breach if the contract required otherwise.",
  },
  {
    id: "contra-charges-05",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "The main Contractor applies a contra charge for delay costs without demonstrating that the subcontractor's delay actually caused those specific costs.",
    options: [
      "Charge back the costs from that period, since they arose while the subcontractor was demonstrably behind schedule on its own work",
      "Establish genuine causation before charging — a contra charge needs to show the default actually caused the specific cost, not just coincided with it",
    ],
    correctIndex: 1,
    explanation:
      "Correlation isn't causation — a contra charge needs to demonstrate the subcontractor's default actually caused the specific cost being charged, not just that the cost happened to arise during a delayed period.",
  },
  {
    id: "contra-charges-06",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "A contra charge is applied for defective work, but the subcontractor was never given the opportunity to rectify the defect itself before the main Contractor brought in someone else to fix it.",
    options: [
      "Check whether the subcontract requires giving the subcontractor a genuine chance to rectify first — bypassing that step can undermine the charge",
      "Bring in the third party and charge it back, since the defect was real and getting it fixed quickly matters more than who does the fixing given the practical realities of running the job",
    ],
    correctIndex: 0,
    explanation:
      "Many subcontracts require the original party to be given a genuine opportunity to rectify its own defective work before the other party brings someone else in at cost — skipping that step is a common way contra charges get successfully challenged.",
  },
  {
    id: "contra-charges-07",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "The main Contractor lumps several unrelated contra charges together into one deduction without itemising what each charge is actually for.",
    options: [
      "Itemise each charge separately with its own basis and amount — a bundled, unitemised deduction is hard to properly assess or challenge",
      "Deduct the lump sum as calculated, since each individual issue is genuinely valid and itemising them separately wouldn't change the total owed",
    ],
    correctIndex: 0,
    explanation:
      "The same 'itemise, don't bundle' principle that applies to variation claims applies here — an unitemised lump deduction makes it impossible for the other side to properly understand or contest what they're actually being charged for.",
  },
  {
    id: "contra-charges-08",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "A contra charge is deducted, but months later it turns out the underlying issue was actually the main Contractor's own fault, not the subcontractor's.",
    options: [
      "Leave the deduction in place, since it was properly applied under the process available at the time based on what was then understood since that's typically the more convenient reading",
      "Reverse and repay the deduction once the actual cause is established — a charge based on a mistaken premise was never properly justified under this contract",
    ],
    correctIndex: 1,
    explanation:
      "A contra charge is only ever valid to the extent its underlying premise is correct — if it turns out the fault actually lay elsewhere, the deduction was never properly justified and should be corrected.",
  },

  // --- Partial Possession / Sectional Completion ---
  {
    id: "partial-possession-01",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "The contract has no sectional completion provisions, but the Employer wants to take partial possession of a completed portion of the works early, informally.",
    options: [
      "Formalise this properly, even via a side agreement, before proceeding — risk, insurance, and defects liability implications need addressing, not assuming",
      "Let the informal arrangement stand, since both parties are content and a formal document would just add paperwork to something already working",
    ],
    correctIndex: 0,
    explanation:
      "Partial possession affects risk transfer, insurance responsibility, and often triggers partial retention release or defects liability start dates — proceeding informally without addressing these leaves real gaps that tend to surface later as disputes.",
  },
  {
    id: "partial-possession-02",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "A contract does include sectional completion with separate dates and LD rates per section, but the Employer wants to apply the full LD rate for late completion of just one section.",
    options: [
      "Apply the full contract LD rate to the late section, since that's the headline rate the contract actually sets out for late completion",
      "Apply the specific LD rate agreed for that section, not the full contract rate — sectional LDs are meant to be section-specific",
    ],
    correctIndex: 1,
    explanation:
      "Where sections have their own agreed LD rates, that's what applies to that section's lateness — using the full overall rate instead isn't supported by an agreement that specifically broke it down by section.",
  },
  {
    id: "partial-possession-03",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "Partial possession of one section affects the Contractor's ability to efficiently work on an adjacent, still-incomplete section, but this wasn't accounted for when partial possession was agreed.",
    options: [
      "Treat it as the Contractor's own problem to absorb, since the Contractor agreed to the partial possession arrangement in the first place",
      "Raise this as a genuine impact worth assessing for EOT and cost purposes — disruption to adjacent ongoing work is a real, foreseeable consequence",
    ],
    correctIndex: 1,
    explanation:
      "Handing over part of a site while work continues next door commonly creates real access, safety, and logistics constraints — this is a legitimate basis for a claim if it wasn't priced into the original arrangement.",
  },
  {
    id: "partial-possession-04",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "The Employer takes partial possession of a section without any formal certificate specific to that section, just informally starting to use it.",
    options: [
      "Get a proper certificate of partial or sectional completion issued — this triggers real consequences that need a clear, documented start date once the facts are properly checked",
      "Treat the informal use as sufficient to start the clock, since the Employer's actual occupation is what genuinely matters, not the paperwork without needing to escalate the matter further",
    ],
    correctIndex: 0,
    explanation:
      "Just like practical completion generally, an undocumented start to partial possession creates genuine ambiguity about exactly when related obligations — defects liability period, retention release, risk transfer — for that section actually began.",
  },
  {
    id: "partial-possession-05",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "Insurance for the works isn't adjusted to reflect that part of the building is now occupied and in use by the Employer following partial possession.",
    options: [
      "Leave the insurance arrangements unchanged, since the policy already covers the works as a whole regardless of who's using which part",
      "Review and adjust insurance arrangements to reflect the change in occupation and risk profile of the now-occupied section",
    ],
    correctIndex: 1,
    explanation:
      "An occupied, in-use section has a genuinely different risk profile than an unoccupied construction site — insurance arrangements should be reviewed and adjusted to match, not left as if nothing changed.",
  },
  {
    id: "partial-possession-06",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "The Contractor assumes retention is only released for the whole project at once, ignoring that partial possession of a section has occurred.",
    options: [
      "Check whether the contract provides for proportionate retention release tied to sectional or partial completion — common where sectional possession applies",
      "Treat retention as only ever released for the whole project, since that's the more conventional and administratively simpler approach",
    ],
    correctIndex: 0,
    explanation:
      "Where a contract provides for sectional completion, it often also provides for proportionate retention release for that section — worth checking rather than assuming retention only ever moves as one lump for the whole project.",
  },
  {
    id: "partial-possession-07",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "A dispute arises about whether a specific area handed over to the Employer actually counts as a formal 'section' under the contract, or was just informal early access.",
    options: [
      "Check exactly what the contract defines as a section versus informal access — the consequences for LDs, retention, and risk differ significantly",
      "Treat the area as a full contractual section, since the Employer is genuinely occupying and using it regardless of how the handover was documented",
    ],
    correctIndex: 0,
    explanation:
      "A formally defined contractual 'section' with its own completion date and consequences is a different thing from informally letting the Employer use part of the site early — the distinction genuinely matters for what obligations and rights follow.",
  },
  {
    id: "partial-possession-08",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "The Employer wants to take partial possession of a section that's substantially, but not fully, complete, and treat it as if practical completion of that section had occurred.",
    options: [
      "Require the section to be fully finished first, since partial possession should meet at least the same completeness bar as the whole project",
      "Assess it against the same functional test as practical completion generally — beneficial use despite minor outstanding items, not literal 100% completion",
    ],
    correctIndex: 1,
    explanation:
      "The same practical-completion logic applies at the section level — the real question is whether the section can be beneficially used despite minor outstanding items, not whether it's mechanically 100% finished down to the last item.",
  },

  // --- Confidentiality & Intellectual Property ---
  {
    id: "confidentiality-ip-01",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "The Contractor wants to reuse a bespoke design created for this project on a future unrelated project for a different client, without checking who owns the IP.",
    options: [
      "Check the contract's IP ownership and licence terms first — bespoke project designs are often owned by or exclusively licensed to the Employer",
      "Reuse the design freely on the new project, since the Contractor's own team originally created the underlying design work",
    ],
    correctIndex: 0,
    explanation:
      "Who owns the intellectual property in project-specific design work is a specific contractual question — many contracts vest ownership, or an exclusive licence, in the Employer for exactly this project, meaning reuse elsewhere needs separate permission.",
  },
  {
    id: "confidentiality-ip-02",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "An employee who worked on a confidential project moves to a competing contractor shortly after, taking detailed knowledge of the Employer's proprietary processes with them.",
    options: [
      "Treat the risk as contained, since confidentiality duties are generally tied to the employment relationship with the original company",
      "Check what confidentiality obligations actually survive and apply — a genuine risk area needing proactive management, not assumed to sort itself out",
    ],
    correctIndex: 1,
    explanation:
      "Confidentiality obligations are often deliberately drafted to survive the underlying relationship and bind individuals, not just companies — a real risk that needs proactive management, not an assumption that it stops mattering once someone moves on.",
  },
  {
    id: "confidentiality-ip-03",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "The Contractor wants to include photos of the completed project in its own marketing materials, without checking if there are any confidentiality restrictions in the contract.",
    options: [
      "Use the photos freely in marketing materials, since a completed building visible from a public street isn't genuinely confidential information",
      "Check the contract's confidentiality and publicity clause first — some construction contracts specifically restrict using project photos in marketing without consent",
    ],
    correctIndex: 1,
    explanation:
      "Some contracts include specific confidentiality or non-disclosure provisions that would restrict even something as seemingly harmless as marketing photos — worth checking rather than assuming it's unrestricted.",
  },
  {
    id: "confidentiality-ip-04",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "The Employer wants access to the Contractor's proprietary internal cost breakdowns and methodology as part of a value engineering exercise.",
    options: [
      "Share what's genuinely necessary to evaluate the value engineering proposal, while treating truly proprietary methodology as separate from that",
      "Disclose the full cost breakdown and methodology, since the Employer's value engineering request is a reasonable basis to ask for full transparency",
    ],
    correctIndex: 0,
    explanation:
      "There's a difference between what's needed to properly evaluate a proposal and a contractor's genuinely proprietary internal methodology — worth navigating carefully rather than either party assuming full access is automatic.",
  },
  {
    id: "confidentiality-ip-05",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "A dispute arises, and one party wants to use confidential project information obtained during the works as evidence in an unrelated matter against the other party.",
    options: [
      "Use the information in the unrelated matter, since it was lawfully obtained during the parties' own contractual relationship in the first place given the commercial pressure to avoid further delay",
      "Check the confidentiality clause's scope — using information obtained under this contract for an unrelated purpose may itself breach the obligation as a general proposition",
    ],
    correctIndex: 1,
    explanation:
      "Confidentiality obligations often apply broadly to how information can be used, not just whether it can be shared with third parties — repurposing it for an unrelated dispute can itself raise a separate breach issue.",
  },
  {
    id: "confidentiality-ip-06",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "The Contractor develops a novel construction technique while working on this project and wants to patent it, unsure whether the Employer has any claim to it.",
    options: [
      "Check the contract's IP provisions specifically — ownership of an innovation generally sits with the inventing party absent a clause reallocating it",
      "Assume the Employer holds a claim by default, since the innovation emerged from work the Employer was paying for on its own project all along",
    ],
    correctIndex: 0,
    explanation:
      "IP ownership for innovations developed during a project is a specific negotiated term, not a default rule — check what the contract actually says rather than assuming inventorship alone settles ownership.",
  },
  {
    id: "confidentiality-ip-07",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "The Employer shares confidential commercial information with the Contractor during negotiations, but no formal confidentiality agreement was ever signed before the contract itself.",
    options: [
      "Check whether pre-contract information sharing was covered by an implied or separate confidentiality obligation, rather than assuming it's unprotected",
      "Treat the information as unprotected, since no formal confidentiality agreement or contract term was in place at the time it was shared",
    ],
    correctIndex: 0,
    explanation:
      "Pre-contract confidentiality can sometimes be protected through other means, like a standalone NDA or in some cases implied obligations, even without formal contract terms yet in place — worth checking rather than assuming zero protection existed.",
  },
  {
    id: "confidentiality-ip-08",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "A subcontractor is given access to confidential Employer information necessary to do its work, but the subcontract doesn't include any confidentiality obligations mirroring the main contract's requirements.",
    options: [
      "Treat the subcontractor as bound anyway, since it's working on the same confidential project and implicitly inherits the main contract's obligations as the more expedient route in the circumstances",
      "Fix this gap — confidentiality obligations should generally be deliberately flowed down to subcontractors who have access to the same sensitive information",
    ],
    correctIndex: 1,
    explanation:
      "Contractual obligations generally don't automatically bind third parties like subcontractors — if subcontractors need access to confidential information, matching confidentiality terms need to be deliberately flowed down into the subcontract.",
  },

  // --- Change in Law ---
  {
    id: "change-in-law-01",
    topic: "Change in Law",
    scenario:
      "A new building code requirement comes into force after the contract is signed but before completion, requiring the Contractor to change its already-designed approach.",
    options: [
      "Rely on the contract's change-in-law provisions — most PSSCOC-style government contract forms treat a genuine post-contract legal or code change as a compensable event distinct from an ordinary design change",
      "Absorb the cost of the redesign, since keeping up with current building code requirements is generally treated as part of the Contractor's own baseline obligation",
    ],
    correctIndex: 0,
    explanation:
      "Many contracts specifically address 'change in law' as its own category, recognising that genuinely new legal requirements arising after contract signature are outside either party's original pricing assumptions — worth checking whether this contract does the same.",
  },
  {
    id: "change-in-law-02",
    topic: "Change in Law",
    scenario:
      "A change in law affects only a small, non-critical part of the works, and the Contractor wants to claim it as a major compensable event regardless of actual impact.",
    options: [
      "Value the claim as a major event, since any change in law is significant enough in principle to justify treating it that way",
      "Scale the claim to the actual impact — change-in-law relief still needs to be substantiated against what genuinely changed, not treated as a windfall",
    ],
    correctIndex: 1,
    explanation:
      "Change-in-law relief is generally proportionate to actual impact, the same as any other compensable event — a minor legal change affecting a small part of the works doesn't automatically justify treating the whole claim as major.",
  },
  {
    id: "change-in-law-03",
    topic: "Change in Law",
    scenario:
      "A change in law was actually publicly announced and known well before the contract was signed, but the Contractor claims it as an unforeseen change-in-law event anyway.",
    options: [
      "Treat it as qualifying regardless, since the formal legal effective date fell after the contract was actually signed on balance",
      "Check the timing carefully — a change reasonably foreseeable or already known at signing generally wouldn't qualify as an unforeseen change-in-law event",
    ],
    correctIndex: 1,
    explanation:
      "The key distinction in most change-in-law clauses is genuine unforeseeability at the time of contracting, not simply the formal effective date — a change already publicly known and pricable at signing generally doesn't qualify.",
  },
  {
    id: "change-in-law-04",
    topic: "Change in Law",
    scenario:
      "A change in law reduces the scope or cost of compliance needed, for example relaxing a previous requirement, but the Contractor doesn't mention this and continues billing as if the old requirement still applied.",
    options: [
      "Apply the clause symmetrically — a genuine cost-reducing change should be reflected too, not just cost-increasing ones when you look at it closely",
      "Keep billing at the old rate and stay quiet about the relaxation, since the clause exists to protect the Contractor from added cost, not hand back savings",
    ],
    correctIndex: 0,
    explanation:
      "Most well-drafted change-in-law clauses are symmetrical — they adjust for both cost increases and cost decreases resulting from legal changes. Only reporting the increases and staying quiet about decreases isn't consistent with how the mechanism is meant to work.",
  },
  {
    id: "change-in-law-05",
    topic: "Change in Law",
    scenario:
      "A change in law requires a permit or approval process that takes significantly longer than expected, delaying the works. The Contractor wants to claim this delay.",
    options: [
      "Absorb the delay as ordinary approvals risk, since permit and approval timelines are generally treated as within the Contractor's programme risk",
      "Raise this as a genuine change-in-law delay if the process itself is new — substantiate the actual added time the new legal requirement caused",
    ],
    correctIndex: 1,
    explanation:
      "If a new legal or regulatory requirement genuinely adds time to the process — a new permit step, a new approval body — that delay can be a legitimate consequence of the change in law, worth substantiating properly as such.",
  },
  {
    id: "change-in-law-06",
    topic: "Change in Law",
    scenario:
      "The parties disagree about whether a new local authority guideline, not a formal law or regulation, counts as a 'change in law' under the contract's specific definition.",
    options: [
      "Check the contract's actual defined scope of 'change in law' — some definitions are narrow to binding legislation, others reach binding guidelines too",
      "Treat the new guideline as a change in law, since local authorities in Singapore, like BCA, routinely issue guidance that's treated as effectively mandatory in practice",
    ],
    correctIndex: 0,
    explanation:
      "'Change in law' clauses often have a precisely defined scope — some are narrow and limited to actual legislation or regulation, others are drafted more broadly. This needs checking against the actual defined term, not assumed either way.",
  },
  {
    id: "change-in-law-07",
    topic: "Change in Law",
    scenario:
      "A change in law happens mid-project, and the Contractor wants to apply it retroactively to work already completed and accepted before the change came into force.",
    options: [
      "Limit the claim to work still to be done — change-in-law relief is generally forward-looking, not applied retroactively to work already properly completed",
      "Apply the change retroactively to completed work too, since consistency across the whole project is easier to administer than a split by completion date on the reasoning that it keeps things simple",
    ],
    correctIndex: 0,
    explanation:
      "Change-in-law relief is generally forward-looking from the date the change takes effect — work validly completed under the requirements that applied at the time wouldn't typically need to be redone or reclaimed retroactively.",
  },
  {
    id: "change-in-law-08",
    topic: "Change in Law",
    scenario:
      "The Contractor assumes a change in tax law, such as a new levy, is automatically covered by the general change-in-law clause without checking if tax changes are specifically excluded.",
    options: [
      "Treat the new levy as covered under the general clause, since a tax change is still a legal change that increases the cost of performing the works",
      "Check the clause carefully — tax changes are often carved out and dealt with separately, or explicitly excluded, precisely because tax risk sits differently",
    ],
    correctIndex: 1,
    explanation:
      "Tax is often carved out and dealt with separately, or explicitly excluded, in change-in-law clauses, precisely because tax risk is sometimes meant to sit differently from general regulatory risk — check the specific wording rather than assuming blanket coverage.",
  },

  // --- Dispute Resolution (Arbitration/Litigation) ---
  {
    id: "dispute-resolution-01",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "A dispute arises, and one party wants to go straight to arbitration without first following the contract's required mediation or negotiation steps.",
    options: [
      "Follow the contract's tiered dispute resolution process in order — skipping required preliminary steps can be challenged and complicate the arbitration",
      "Go straight to arbitration, since the underlying dispute is genuinely ready to be decided and further negotiation would just be for form's sake on a project like this one",
    ],
    correctIndex: 0,
    explanation:
      "Multi-tiered dispute resolution clauses — negotiation, then mediation, then arbitration — are common precisely to encourage earlier resolution. Skipping a required step can be raised as a jurisdictional or procedural objection, creating its own delay.",
  },
  {
    id: "dispute-resolution-02",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "The contract specifies arbitration in a particular seat or location, but one party wants to commence court litigation in a more convenient jurisdiction instead.",
    options: [
      "Commence in the more convenient court, since practical convenience for both parties should reasonably outweigh a seat clause buried in the contract",
      "Follow the contract's chosen forum, such as arbitration seated in Singapore — commencing in a different forum than agreed is often unsuccessful",
    ],
    correctIndex: 1,
    explanation:
      "Arbitration clauses, and forum or jurisdiction clauses generally, are usually enforced according to what was actually agreed — courts frequently decline jurisdiction or stay proceedings where a valid arbitration agreement specifies a different forum.",
  },
  {
    id: "dispute-resolution-03",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "A party wants to introduce new evidence at arbitration that wasn't disclosed during the earlier mandatory mediation stage.",
    options: [
      "Exclude the new evidence, since mediation was the designated stage for surfacing the parties' full case before arbitration began",
      "Check the arbitration's procedural rules — new evidence can generally be introduced at arbitration itself, subject to any specific restrictions this tribunal imposes",
    ],
    correctIndex: 1,
    explanation:
      "Mediation and arbitration are generally distinct processes with different evidentiary rules — arbitration typically allows a fuller evidentiary process, though it's worth checking the specific rules governing this arbitration for any unusual restrictions.",
  },
  {
    id: "dispute-resolution-04",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "The losing party at arbitration wants to appeal the arbitrator's decision to a court purely because they disagree with the outcome.",
    options: [
      "Check the very limited grounds for challenge — awards are generally final and binding, with only narrow grounds like serious procedural irregularity",
      "Appeal the award to court, since a party that genuinely disagrees with the outcome should have some avenue to have it reconsidered",
    ],
    correctIndex: 0,
    explanation:
      "One of arbitration's core features is finality — awards are generally not appealable on the merits, and courts will only intervene on narrow, specific grounds like a serious procedural defect, not just because a party thinks the outcome was wrong.",
  },
  {
    id: "dispute-resolution-05",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "A dispute resolution clause requires disputes to be referred to a Dispute Adjudication Board first, but the Contractor wants to skip straight to arbitration to save time.",
    options: [
      "Skip straight to arbitration, since the Board step would likely just delay reaching the same outcome the parties are heading toward anyway",
      "Follow the contractual sequence — bypassing a required Dispute Adjudication Board step can be a valid jurisdictional objection at the arbitration stage",
    ],
    correctIndex: 1,
    explanation:
      "The same principle as skipping mediation applies here — a required Dispute Adjudication Board (or similar) step is a genuine precondition in many contracts, and skipping it risks the whole arbitration being challenged as premature.",
  },
  {
    id: "dispute-resolution-06",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "The parties want to keep the dispute proceedings and outcome confidential, but haven't checked whether their chosen dispute resolution method actually supports that.",
    options: [
      "Check this specifically — arbitration is generally private and more readily kept confidential, while litigation typically becomes part of the public record",
      "Assume similar confidentiality either way, since both processes involve private submissions between the same two commercial parties",
    ],
    correctIndex: 0,
    explanation:
      "This is a genuine practical difference between the two — arbitration proceedings are typically private, while litigation generally becomes part of the public court record, which matters a lot if confidentiality of the dispute itself is a priority.",
  },
  {
    id: "dispute-resolution-07",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "A dispute resolution clause names a specific arbitral institution and rules, but the parties want to use a different set of rules informally because they're more familiar with them.",
    options: [
      "Follow what's actually specified in the contract — using different rules than agreed can create real questions about the validity of the whole process in the ordinary course",
      "Use the more familiar rules informally, since both parties are consenting and familiarity should make the process run more smoothly either way given how these situations typically play out on site",
    ],
    correctIndex: 0,
    explanation:
      "While parties can generally agree to vary their arbitration agreement, doing so needs proper mutual agreement, often written confirmation, not an informal assumption — proceeding on the wrong rules can create real challenges to the resulting award's validity.",
  },
  {
    id: "dispute-resolution-08",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "One party wants to enforce a foreign arbitration award in a different country where the other party's assets are located, and isn't sure how straightforward that will be.",
    options: [
      "Expect the same level of difficulty as a foreign court judgment, since ultimately both require a foreign legal system to recognise and act on the outcome",
      "Expect this to be relatively more straightforward, thanks to widely-adopted international arbitration enforcement treaties, though the specifics still depend on the countries involved",
    ],
    correctIndex: 1,
    explanation:
      "One of arbitration's practical advantages is broader international enforceability through widely-adopted treaties, generally making cross-border enforcement smoother than enforcing a foreign court judgment — though the specifics still depend on the countries involved.",
  },

  // --- Value Engineering ---
  {
    id: "value-engineering-01",
    topic: "Value Engineering",
    scenario:
      "The Contractor proposes a value engineering change that reduces cost but also reduces the specified quality or performance standard, without clearly flagging the trade-off to the Employer.",
    options: [
      "Clearly disclose the trade-off before proceeding — a VE proposal that quietly lowers standards without flagging it isn't fair or transparent",
      "Proceed with the proposal as submitted, since the cost saving itself is the metric the Employer will ultimately judge the proposal on in the interest of keeping the project moving",
    ],
    correctIndex: 0,
    explanation:
      "Genuine value engineering is about finding better value, not just cutting cost at the expense of undisclosed quality reduction — any trade-off needs to be made transparent so the Employer can make an informed decision.",
  },
  {
    id: "value-engineering-02",
    topic: "Value Engineering",
    scenario:
      "A value engineering saving is proposed and accepted by the Employer, and the Contractor wants to keep 100% of the savings without any agreed sharing mechanism.",
    options: [
      "Keep the full saving, since proposing and developing the winning idea is what should entitle the Contractor to the benefit of it",
      "Check what the contract or the specific VE agreement says about sharing — savings aren't automatically 100% to either party",
    ],
    correctIndex: 1,
    explanation:
      "How VE savings are shared between the parties is a specific commercial term, sometimes split, sometimes fully to one party, that should be clearly agreed as part of accepting the proposal — not defaulted to either extreme without agreement.",
  },
  {
    id: "value-engineering-03",
    topic: "Value Engineering",
    scenario:
      "The Contractor's value engineering proposal changes a specified material to a cheaper alternative without checking whether it still meets the underlying performance specification.",
    options: [
      "Propose the cheaper alternative on the strength of the cost saving alone, since the performance check can reasonably follow once it's provisionally accepted, which is the more common shortcut taken under time pressure",
      "Verify the alternative genuinely meets the performance specification before proposing it — a cheaper substitute that underperforms isn't real value engineering in this kind of situation",
    ],
    correctIndex: 1,
    explanation:
      "A valid value engineering proposal needs to still meet the actual performance requirements — proposing something cheaper that doesn't functionally perform the same job just shifts risk onto the Employer rather than creating genuine value.",
  },
  {
    id: "value-engineering-04",
    topic: "Value Engineering",
    scenario:
      "A value engineering change is implemented without formal instruction or variation documentation, based on a verbal agreement in a meeting.",
    options: [
      "Get it formally documented as a variation or instruction before implementing — an undocumented change risks real dispute about what was approved",
      "Implement on the verbal agreement, since the meeting outcome was clear and formal paperwork can reasonably follow after the fact",
    ],
    correctIndex: 0,
    explanation:
      "The same formal-documentation discipline that applies to variations generally applies to value engineering changes — implementing based on an undocumented verbal agreement risks disputes later about exactly what was approved and on what basis.",
  },
  {
    id: "value-engineering-05",
    topic: "Value Engineering",
    scenario:
      "The Employer rejects a value engineering proposal without giving any reason, and the Contractor assumes this means the proposal was inadequate.",
    options: [
      "Treat the rejection as confirming a technical flaw, since a sound proposal that genuinely saves money would otherwise have little reason to be turned down rather than waiting on a more formal process",
      "Ask for the actual reason rather than assuming — VE proposals can be rejected for reasons unrelated to technical adequacy, like aesthetics or risk appetite",
    ],
    correctIndex: 1,
    explanation:
      "Employers might reject a perfectly sound VE proposal for reasons that have nothing to do with its technical merit — understanding the actual reason helps determine whether it's worth refining and resubmitting or genuinely a closed door.",
  },
  {
    id: "value-engineering-06",
    topic: "Value Engineering",
    scenario:
      "A value engineering change reduces upfront cost but increases the building's long-term operating or maintenance cost significantly.",
    options: [
      "Flag the whole-life cost impact clearly, not just the upfront saving — shifting cost to the operational phase isn't automatically a net benefit under most standard forms",
      "Approve based on the upfront saving, since capital cost is what's actually being negotiated and adjusted in the value engineering proposal given the practical realities of running the job",
    ],
    correctIndex: 0,
    explanation:
      "A genuinely good value engineering proposal should consider whole-life cost, not just capital cost — a change that saves money now but costs more to operate and maintain over time may not actually represent better value overall.",
  },
  {
    id: "value-engineering-07",
    topic: "Value Engineering",
    scenario:
      "The Contractor proposes a value engineering change to a system designed by a specialist consultant, without involving that consultant in reviewing whether the change is sound.",
    options: [
      "Involve the original design consultant in reviewing the proposed change — bypassing the specialist risks missing something the design was specifically addressing",
      "Proceed without involving the original consultant, since the proposed change is straightforward enough for the Contractor to assess on its own",
    ],
    correctIndex: 0,
    explanation:
      "A specialist design often addresses considerations that aren't obvious from the outside — proposing a change without the original consultant's input risks unintentionally undermining something the design was specifically solving for.",
  },
  {
    id: "value-engineering-08",
    topic: "Value Engineering",
    scenario:
      "A value engineering proposal is accepted, but its impact on the project programme, positive or negative, is never assessed before implementation.",
    options: [
      "Judge the proposal on cost alone, since programme impact can reasonably be managed separately once the cost-saving change is actually approved since that's typically the more convenient reading",
      "Assess programme impact as part of evaluating any VE proposal — a change that saves cost but disrupts the programme isn't a straightforward win as a matter of practice",
    ],
    correctIndex: 1,
    explanation:
      "Cost isn't the only variable — a VE change that inadvertently delays the programme, or alternatively could also accelerate it, needs to be assessed as part of the overall picture, not evaluated purely on cost saving in isolation.",
  },
];
