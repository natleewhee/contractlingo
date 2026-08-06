export type Question = {
  id: string;
  topic: string;
  scenario: string;
  options: [string, string];
  correctIndex: 0 | 1;
  explanation: string;
};

// First real content batch (Phase 1), drafted per the PRD's AI-assisted
// authoring workflow: general, well-established contract administration
// principles rather than jurisdiction-specific case law or clause-timing
// rules I can't fully verify — those need your review/correction pass
// before this is treated as final. Where a rule genuinely varies by
// contract or jurisdiction, the "correct" answer is the judgement move
// (check the contract, get it in writing, substantiate the claim) rather
// than a hard legal conclusion.
export const SESSION_QUESTIONS: Question[] = [
  // --- Variations ---
  {
    id: "variation-01",
    topic: "Variations",
    scenario:
      "The contractor installs the wrong cable. The Engineer instructs a replacement. Is this a variation?",
    options: ["Not a variation", "Is a variation"],
    correctIndex: 0,
    explanation:
      "Correcting defective work isn't a variation — it's enforcement of an obligation the contractor already had.",
  },
  {
    id: "variation-02",
    topic: "Variations",
    scenario:
      "A junior site engineer (not the named Engineer under the contract) emails the contractor asking for an extra access ramp. Should the contractor treat this as an instructed variation?",
    options: [
      "Confirm authority before treating it as a variation",
      "Just proceed, an instruction is an instruction",
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
      "No automatic entitlement without an instruction",
      "Yes, fixing an error is always a variation",
    ],
    correctIndex: 0,
    explanation:
      "Discovering a problem doesn't create an entitlement — flag it and get an instruction before acting, rather than deciding unilaterally and invoicing for it afterwards.",
  },
  {
    id: "variation-04",
    topic: "Variations",
    scenario:
      "The contract requires all variations to be instructed in writing. The Engineer verbally tells the contractor to add extra reinforcement, then later refuses to confirm it in writing.",
    options: [
      "Get it in writing, or confirm the verbal instruction back yourself",
      "Proceed anyway, verbal instructions are just as good",
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
    options: ["Not a variation — contractor bears the cost", "A variation — contractor should be paid extra"],
    correctIndex: 0,
    explanation:
      "Rectifying your own defective work is an existing contractual obligation, not new scope. No variation, no extra payment — the cost sits with the party who caused the defect.",
  },
  {
    id: "defects-02",
    topic: "Defects",
    scenario:
      "The Employer starts using part of the building before formal handover. A defect appears in that section afterward — is the contractor still liable to fix it?",
    options: [
      "Generally yes, unless the defect was caused by the Employer's use",
      "No, early occupation ends the contractor's liability",
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
      "Distinguish inherent defects from post-handover wear before assuming liability",
      "Contractor is always responsible for anything wrong during the defects period",
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
      "May still be pursued as a latent defect — not automatically time-barred",
      "Once the defects period ends, the contractor is fully off the hook",
    ],
    correctIndex: 0,
    explanation:
      "The defects liability period covers routine snagging, not a free pass on seriously defective work — genuinely latent defects discovered later can potentially still be pursued, subject to the contract's and law's limitation periods.",
  },

  // --- Payment ---
  {
    id: "payment-01",
    topic: "Payment",
    scenario:
      "The contractor's payment claim includes work priced at full value that hasn't actually been carried out yet. Should the Engineer certify it in full?",
    options: ["No, certify only what's done", "Yes, certify the full claim"],
    correctIndex: 0,
    explanation:
      "Certify what's been executed and verified. Certifying unperformed work isn't supported by the contract, whatever the claim says.",
  },
  {
    id: "payment-02",
    topic: "Payment",
    scenario:
      "The contractor submits a payment claim after the contractual deadline for submission. Must the Engineer still assess and certify it as normal?",
    options: [
      "Check what the contract says about late claims before assuming either way",
      "Always certify it regardless of timing",
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
    options: ["Ask for it to be itemised before certifying", "Certify the lump sum as claimed"],
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
      "Check the contract for a proper right of set-off before withholding",
      "Withholding is fine as long as there's a dispute somewhere",
    ],
    correctIndex: 0,
    explanation:
      "You generally can't withhold payment for properly certified work just because there's a dispute about something else — most regimes require a specific, notified right of set-off, not a general 'we'll hold this until we sort out that other thing.'",
  },

  // --- LD ---
  {
    id: "ld-01",
    topic: "LD",
    scenario:
      "Completion is delayed, but the only cause was a variation the Engineer instructed. Can the Employer still deduct the full liquidated damages?",
    options: ["No", "Yes, delay is delay"],
    correctIndex: 0,
    explanation:
      "LDs are for contractor-culpable delay. Delay caused by the Employer's own instruction should be covered by an extension of time, not penalised.",
  },
  {
    id: "ld-02",
    topic: "LD",
    scenario:
      "Completion is delayed by both a contractor resourcing problem and a late Employer instruction, happening in the same period.",
    options: [
      "This needs careful apportionment, not an automatic full LD deduction",
      "Deduct full LDs since the contractor was partly at fault",
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
      "Flag this early — a disproportionate LD figure is a real risk to check, not just apply mechanically",
      "LDs always apply exactly as calculated, no matter how large",
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
      "Check the contract's precondition — a missing certificate can block the LD deduction",
      "The certificate is just paperwork, deduct the LDs anyway",
    ],
    correctIndex: 0,
    explanation:
      "Many contracts make a certificate of non-completion (or equivalent) a precondition to deducting LDs. Skipping that step isn't just sloppy administration — it can genuinely undermine the right to deduct at all.",
  },

  // --- EOT ---
  {
    id: "eot-01",
    topic: "EOT",
    scenario:
      "The contractor claims an extension of time for a rain day, but provides no programme evidence the rain actually affected the critical path.",
    options: ["Insufficient on its own", "Grant it, rain is rain"],
    correctIndex: 0,
    explanation:
      "An EOT needs evidence the event affected the critical path — not just that the event happened somewhere on site.",
  },
  {
    id: "eot-02",
    topic: "EOT",
    scenario:
      "The contractor submits an EOT claim three months after the delay event, when the contract requires notice within 28 days.",
    options: [
      "Late notice is a real problem — don't wave it through just because the delay was genuine",
      "The delay was real, so grant the EOT regardless of timing",
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
      "Ask for the claim to be substantiated against the programme, not accepted as a general assertion",
      "Grant a reasonable-sounding EOT since something clearly went wrong",
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
      "The EOT should reflect only the net critical-path impact, not a full extension regardless of pre-existing delay",
      "Grant the full extension since the Employer caused this particular delay",
    ],
    correctIndex: 0,
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
      "Only the Employer-caused portion may support a costs claim — concurrent delay doesn't automatically entitle full recovery",
      "Full prolongation costs are recoverable since an Employer-caused delay was present",
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
      "True concurrency requires both delays to independently affect the critical path at the same time — verify this before granting a full EOT",
      "Any overlap in dates is enough to call it concurrent delay",
    ],
    correctIndex: 0,
    explanation:
      "'Concurrent delay' has a narrow technical meaning — both causes must independently be critical-path delays happening at the same time, not just two problems that happened to occur in the same week. Loosely calling everything 'concurrent' can hand out EOTs and cost protection that isn't actually earned.",
  },

  {
    id: "concurrent-delay-03",
    topic: "Concurrent Delay",
    scenario:
      "The contract doesn't say anything about how to handle concurrent delay. The contractor argues that, since courts are divided on the point, it should get the benefit of the doubt and a full EOT.",
    options: [
      "Treat this as a genuinely unsettled area and check the specific contract mechanism/jurisdiction rather than assuming a default rule",
      "There's a single universal rule for concurrent delay that applies regardless of contract wording",
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
      "Ask for a measured comparison of planned vs actual productivity, not just an assertion",
      "Accept the lump sum — frequent instructions are self-evidently disruptive",
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
      "This is a recognised, more credible method than a general disruption assertion",
      "It's still just as unreliable as any other disruption claim",
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
      "Isolate and exclude the contractor's own-caused inefficiency before valuing the claim",
      "Award the whole claimed amount since some disruption was genuinely Employer-caused",
    ],
    correctIndex: 0,
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
      "Get instructed acceleration confirmed and costed before incurring it, not after",
      "Any request to speed up automatically entitles the contractor to be paid for accelerating",
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
      "This may support a constructive acceleration claim — look at the wrongful rejection, not just the acceleration cost",
      "Without an express instruction to accelerate, the contractor has no possible claim",
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
      "Voluntary acceleration the Employer never asked for or agreed to isn't recoverable as a claim",
      "Any acceleration effort, even self-initiated, is billable to the Employer",
    ],
    correctIndex: 0,
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
      "Prolongation costs should reflect what was actually incurred during the period, not just the length of the EOT",
      "The full preliminaries rate automatically applies for the entire EOT period granted",
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
      "Check for double counting — the same cost shouldn't be recovered twice under different headings",
      "Both claims can run in parallel since they're labelled differently",
    ],
    correctIndex: 0,
    explanation:
      "A recurring problem in prolongation claims is the same underlying cost showing up more than once, dressed up under different headings. Trace each cost item back to what it's actually for before certifying — the label on the claim line isn't what matters.",
  },
  {
    id: "prolongation-03",
    topic: "Prolongation Costs",
    scenario:
      "The contractor claims head office overheads for the EOT period using a standard formula, without showing that head office resources were actually stretched or that other work was turned away because of this project's extension.",
    options: [
      "A formula alone is a starting point, not proof — look for some evidence the head office was actually affected",
      "The formula result is conclusive proof of loss on its own",
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
      "Check whether the work is genuinely similar before accepting rates outside the contract — similar work should generally use contract rates",
      "Accept whatever rate the contractor proposes for varied work",
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
      "Falling back to a daywork or cost-based valuation is the normal route when no fair rate can be agreed",
      "The variation can't be valued at all until a rate is agreed",
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
      "This is a legitimate concern — omitting work just to hand it to someone else can be an improper use of the variation power",
      "Omissions are always valid regardless of what happens to the work afterward",
    ],
    correctIndex: 0,
    explanation:
      "A genuine omission removes work from the contract entirely. Using the omission power to strip work from the contractor purely to re-award it elsewhere more cheaply is a well-recognised abuse of the mechanism, not a normal variation.",
  },

  // --- Notices ---
  {
    id: "notices-01",
    topic: "Notices",
    scenario:
      "The contract requires written notice of a compensation event within a set number of days. The contractor only mentions the issue verbally in a site meeting.",
    options: ["Verbal doesn't count — get it in writing", "Raised is raised, notice served"],
    correctIndex: 0,
    explanation:
      "A verbal mention isn't a substitute for the contractual notice. Don't let an issue sit on 'we mentioned it at the meeting.'",
  },
  {
    id: "notices-02",
    topic: "Notices",
    scenario:
      "The contract requires notice 'as soon as practicable.' The contractor waits six weeks, arguing that's still reasonably prompt given the circumstances.",
    options: [
      "'As soon as practicable' still means promptly once the event is known — don't treat a flexible standard as unlimited time",
      "Any timeframe is fine as long as the contractor has a justification",
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
      "Assess it on substance — a notice doesn't have to use magic words to count",
      "Reject it because it doesn't cite the correct clause",
    ],
    correctIndex: 0,
    explanation:
      "Most regimes look at whether a notice substantively conveys what's required, not whether it uses the exact contractual label. Rejecting a real notice on a technicality is its own kind of risk.",
  },
  {
    id: "notices-04",
    topic: "Notices",
    scenario:
      "A subcontractor's delay is caused by a late instruction to the main contractor, but the main contractor never passes on formal notice to the Employer, assuming the Employer 'already knows.'",
    options: [
      "Send the notice anyway — assumed awareness isn't a substitute for a formal notice where the contract requires one",
      "Skip it, if the Employer already knows there's no need",
    ],
    correctIndex: 0,
    explanation:
      "This is the same trap as relying on a site-meeting mention — actual knowledge doesn't reliably substitute for the formal notice mechanism the contract sets up. Send it, even if it feels redundant.",
  },
];
