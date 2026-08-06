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

  // --- Termination ---
  {
    id: "termination-01",
    topic: "Termination",
    scenario:
      "The Employer decides to terminate for convenience mid-project but skips the contract's termination-for-convenience procedure (notice period, compensation formula), treating it as a simple stop-work instruction.",
    options: [
      "Follow the contractual mechanism — notice period and compensation formula still apply even when termination is otherwise justified",
      "Skip the procedure since the Employer has an underlying right to terminate anyway",
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
      "Follow the notice and cure period first — jumping straight to termination on a single missed payment is risky",
      "One missed payment is enough to terminate immediately, no notice needed",
    ],
    correctIndex: 0,
    explanation:
      "Most termination-for-default clauses require a specific notice and an opportunity to cure before termination becomes valid. Terminating without going through those steps can itself be treated as wrongful repudiation by the terminating party.",
  },
  {
    id: "termination-03",
    topic: "Termination",
    scenario:
      "The Employer wants to terminate for persistent delay, but never issued the prior written warning notice the contract requires before termination for that ground.",
    options: [
      "The missing warning notice is a real problem — it's usually a precondition, not a formality",
      "The delay itself is enough justification regardless of whether the warning notice was sent",
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
      "The extra cost may be recoverable, but it still needs to be reasonable and properly substantiated, not just whatever the replacement charged",
      "Whatever the replacement contractor charges is automatically recoverable in full",
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
      "Get advice and respond formally first — treating a disputed termination as automatically valid (or invalid) unilaterally is risky either way",
      "Immediately treating it as repudiation and leaving site is always the safe move",
    ],
    correctIndex: 0,
    explanation:
      "Whether a termination was actually wrongful is often genuinely disputed. Acting unilaterally on your own view of who's right — rather than following the contract's dispute mechanism — can turn a defensible position into a real liability.",
  },
  {
    id: "termination-06",
    topic: "Termination",
    scenario:
      "A termination clause requires termination to happen 'without undue delay' once the default is known. The Employer knew about the default months ago but only terminates now.",
    options: [
      "The delay itself is worth checking — an unreasonably late termination on an old default can be challenged",
      "Timing never matters as long as the default genuinely occurred at some point",
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
      "Check what the bond actually secures and what loss has genuinely been suffered before drawing the full amount",
      "The full bond amount is always fair game the moment termination happens",
    ],
    correctIndex: 0,
    explanation:
      "A performance bond secures actual loss up to its value, not a windfall unrelated to loss. Drawing the full amount without regard to genuine loss can itself be challenged, especially with on-demand bonds where disputes tend to follow.",
  },
  {
    id: "termination-08",
    topic: "Termination",
    scenario:
      "The Employer terminates for late completion, but it later turns out the delay was actually caused by an Employer-instructed variation that should have qualified for an EOT.",
    options: [
      "This is a real exposure for the Employer — terminating for a delay that was actually excused can make the termination itself wrongful",
      "Once terminated, the reason no longer matters even if it turns out to be wrong",
    ],
    correctIndex: 0,
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
      "Ask for a proper written instruction with reasons before treating this as a valid, compensable suspension",
      "Treat it as automatically valid and compensable regardless of how it was communicated",
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
      "Follow the contractual notice procedure first — suspending without it risks the Contractor being the one in breach",
      "A genuine payment dispute justifies immediate suspension regardless of procedure",
    ],
    correctIndex: 0,
    explanation:
      "Most contracts (and statutory payment regimes) give a right to suspend for non-payment, but only if the required notice is given first. Suspending without it can turn a legitimate grievance into the contractor's own default.",
  },
  {
    id: "suspension-03",
    topic: "Suspension of Works",
    scenario:
      "Works have been suspended by Employer instruction for an extended period with no indication of when — or whether — they'll resume.",
    options: [
      "Check the contract's own long-suspension provisions — many give a right to treat prolonged suspension as grounds for termination or claim after a set period",
      "There's nothing to be done but wait indefinitely once a suspension is instructed",
    ],
    correctIndex: 0,
    explanation:
      "Many standard forms cap how long a suspension can run before the contractor gets a right to escalate — treat prolonged suspension without resumption as something to actively check against the contract, not just endure.",
  },
  {
    id: "suspension-04",
    topic: "Suspension of Works",
    scenario:
      "A suspension instruction doesn't specify an expected duration. The Contractor immediately demobilises fully, assuming it must be indefinite.",
    options: [
      "Clarify expected duration before fully demobilising — a short suspension may not justify full demobilisation costs",
      "Full demobilisation is always the right response to any suspension regardless of expected length",
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
      "Keep contemporaneous records of what was actually stood down and its cost — a claim needs substantiation, not just an assertion that costs were incurred",
      "The suspension instruction alone is enough; no further substantiation should be needed",
    ],
    correctIndex: 0,
    explanation:
      "An instruction to suspend establishes the entitlement in principle, but the actual amount recoverable still needs to be evidenced — what was genuinely idle, for how long, and at what cost.",
  },
  {
    id: "suspension-06",
    topic: "Suspension of Works",
    scenario:
      "A suspension is lifted, and the Contractor claims an automatic extension of time equal to the full suspension period without checking whether it actually affected the critical path.",
    options: [
      "Check actual critical-path impact — a suspension that overlapped with float or non-critical activities may not justify a day-for-day extension",
      "Suspension periods always convert automatically into an equal EOT",
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
      "A suspension caused by the Contractor's own default is generally not compensable to the Contractor",
      "Any Employer-instructed suspension is compensable regardless of who caused the underlying issue",
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
      "Check the contract's specific long-suspension mechanism before doing anything drastic — there's usually a defined process rather than a unilateral option to treat it as termination",
      "Any suspension that feels 'too long' can reasonably be treated as termination without more",
    ],
    correctIndex: 0,
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
      "The contractual cap applies regardless of the Employer's own risk assessment — over-withholding isn't supported just because it feels prudent",
      "Employers can withhold more than the stated cap whenever they judge the project to be higher risk",
    ],
    correctIndex: 0,
    explanation:
      "Retention percentages and caps are contractual terms, not guidelines. Withholding beyond what's agreed isn't a judgement call available to the Employer — it's simply not authorised by the contract.",
  },
  {
    id: "retention-02",
    topic: "Retention Sums",
    scenario:
      "The Contractor requests early release of retention because of strong performance, even though the contract ties release to specific milestones rather than performance quality.",
    options: [
      "Check what the contract actually ties release to — good performance alone doesn't override a milestone-based release schedule",
      "Strong performance is generally sufficient grounds to expect early release regardless of the contract's release triggers",
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
      "Follow the contract's staged release schedule — holding the full amount past the first release trigger isn't supported without a contractual basis",
      "Holding the full amount until defects liability ends is always acceptable regardless of what the contract specifies",
    ],
    correctIndex: 0,
    explanation:
      "Where a contract splits retention release into moieties tied to different milestones, the first release is due when its trigger is met — not deferred to whenever the Employer decides is more convenient.",
  },
  {
    id: "retention-04",
    topic: "Retention Sums",
    scenario:
      "The Employer wants to use retention monies held for this project to fund unrelated cash flow needs elsewhere in the business, intending to repay it before release is due.",
    options: [
      "Retention should be held for its contractual purpose — many contracts require it in a separate account precisely to prevent this kind of use",
      "As long as it's repaid before release is due, using it for other purposes in the meantime is fine",
    ],
    correctIndex: 0,
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
      "Deductions from retention don't need any formal notification process to be valid",
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
      "This still matters — the trust arrangement exists specifically to protect the contractor if the Employer runs into financial difficulty",
      "It doesn't matter in practice as long as the Employer eventually pays what's owed",
    ],
    correctIndex: 0,
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
      "Set-off against any dispute between the same two parties is always fair game",
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
      "Check the contract first — interest on retention is only owed if the contract (or applicable law) actually provides for it",
      "Interest on held retention is a universal entitlement regardless of what the contract says",
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
      "Check which party's insurance (often Contractor's All Risks, naming both parties) is meant to respond under the contract before assuming either way",
      "Damage before practical completion is always simply the Contractor's loss to bear uninsured",
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
      "This is a serious exposure — an uninsured gap at the wrong moment can leave the Contractor personally exposed for a claim insurance was meant to cover",
      "A brief administrative lapse in coverage rarely matters in practice",
    ],
    correctIndex: 0,
    explanation:
      "Insurance either responds or it doesn't — a lapse, even brief, that happens to coincide with an actual claim is exactly the scenario the required continuous coverage was meant to prevent. This is why policies (and proof of them) need active tracking, not a one-time check.",
  },
  {
    id: "insurance-03",
    topic: "Insurance & Indemnity",
    scenario:
      "The contract requires the Contractor to name the Employer as co-insured on its All Risks policy, but no one has actually confirmed this was done.",
    options: [
      "Confirm it directly — an unconfirmed requirement like this should be verified, not assumed to have happened",
      "It's safe to assume this happened automatically since it's a standard contractual requirement",
    ],
    correctIndex: 0,
    explanation:
      "Contractual insurance requirements aren't self-executing — someone has to actually arrange the co-insured status and someone has to check the certificate. Assuming compliance without verifying it defeats the purpose of requiring it.",
  },
  {
    id: "insurance-04",
    topic: "Insurance & Indemnity",
    scenario:
      "An indemnity clause requires the Contractor to indemnify the Employer for 'any and all claims' arising from the works, including claims caused solely by the Employer's own negligence.",
    options: [
      "This kind of broad wording is worth flagging for review — indemnities covering the other party's own sole negligence are often unenforceable or heavily restricted depending on the jurisdiction",
      "Broadly worded indemnities are always fully enforceable exactly as written",
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
      "Check what the contract and insurance actually allocate for this kind of event before assuming the Contractor bears it outright",
      "Care of the works always means the Contractor absorbs any damage regardless of cause",
    ],
    correctIndex: 0,
    explanation:
      "'Care of the works' provisions are usually paired with required insurance precisely to cover events like this — the practical question is what the insurance responds to and what risk allocation the contract actually specifies, not a blanket assumption.",
  },
  {
    id: "insurance-06",
    topic: "Insurance & Indemnity",
    scenario:
      "A subcontractor causes damage on site. The main contractor's insurer denies the claim because the subcontractor was never added as a named additional insured, as the main contract required.",
    options: [
      "This is a real gap worth catching before it happens — subcontractor insurance status should be checked, not assumed to flow automatically from the main policy",
      "Subcontractors are always automatically covered under the main contractor's policy regardless of naming requirements",
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
      "Mobilising without the certificate is fine as long as a policy probably exists somewhere",
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
      "Check how the indemnity is actually worded and whether it's enforceable in this scenario — broad wording doesn't automatically mean the Contractor absorbs Employer-caused loss",
      "Broad indemnity wording always means the Contractor bears the full loss no matter who actually caused it",
    ],
    correctIndex: 0,
    explanation:
      "This is the flip side of the earlier point — indemnities that would make a contractor responsible for the employer's own fault are exactly the kind of clause that gets scrutinised or restricted. Don't assume the broadest possible reading is the enforceable one.",
  },
];
