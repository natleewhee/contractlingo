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
  {
    id: "payment-05",
    topic: "Payment",
    scenario:
      "The Contractor's payment claim includes provisional sums at their full stated value, even though the actual work covered by them hasn't been carried out yet.",
    options: [
      "Certify provisional sums based on what's actually been expended or executed, not the full nominal amount regardless of progress",
      "Provisional sums should always be certified in full from the first claim onward",
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
      "This matters — late certification can itself trigger consequences (like when the Employer's payment obligation and any interest exposure starts running)",
      "The certification period is purely administrative and has no real consequence if missed",
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
      "Check what the contract (or applicable statute) actually provides for late payment — it's not a given, but it's often expressly addressed",
      "Late payment never carries any additional financial consequence beyond the amount originally certified",
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
      "This is a weak way to recover them — costs not raised contemporaneously are much easier for the Employer to dispute or reject at final account stage",
      "The final account is the right and safe place to first raise any costs, regardless of whether they were mentioned earlier",
    ],
    correctIndex: 0,
    explanation:
      "Surfacing costs for the first time at final account, with no contemporaneous notice or record, is one of the easiest kinds of claim to challenge — the same discipline about timely notice and substantiation that applies throughout the project applies here too.",
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

  // --- Assignment & Subcontracting ---
  {
    id: "assignment-01",
    topic: "Assignment & Subcontracting",
    scenario:
      "The Contractor wants to assign its right to receive payment under the contract to a bank as security for financing, where the contract requires the Employer's consent for any assignment.",
    options: [
      "Get the Employer's consent first — a consent requirement applies to assigning payment rights too, not just the whole contract",
      "Assigning just the right to receive money doesn't need consent since it doesn't affect the Employer's obligations",
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
      "Get approval before engaging the subcontractor — proceeding without it breaches the contract regardless of the subcontractor's quality",
      "As long as the subcontractor does good work, skipping the approval step doesn't really matter",
    ],
    correctIndex: 0,
    explanation:
      "An approval requirement is a procedural obligation independent of how the subcontractor actually performs — skipping it is a breach in itself, and it also means the Employer never got the chance to raise concerns before the work started.",
  },
  {
    id: "assignment-03",
    topic: "Assignment & Subcontracting",
    scenario:
      "The Employer wants to assign the benefit of the contract (including its warranties) to a purchaser of the building, without following the contract's own assignment provisions.",
    options: [
      "Follow the contract's assignment mechanism — warranties and rights don't automatically transfer to a purchaser without it",
      "Selling the building automatically carries all contractual rights and warranties with it regardless of process",
    ],
    correctIndex: 0,
    explanation:
      "Contractual rights, including warranties, generally need a proper assignment (often with the other party's consent) to transfer to a new owner — a sale of the building alone doesn't automatically carry them across.",
  },
  {
    id: "assignment-04",
    topic: "Assignment & Subcontracting",
    scenario:
      "A subcontractor's poor workmanship causes a defect. The main contractor argues it isn't responsible since it wasn't the party that actually did the defective work.",
    options: [
      "The main contractor is generally still responsible to the Employer for subcontracted work — that's a matter for the main contractor to pursue against its subcontractor separately",
      "Responsibility passes entirely to whichever party physically did the work",
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
      "This likely breaches the prohibition in substance, even if the Contractor's name stays on the contract",
      "As long as the original Contractor's name stays on the contract, subletting everything is fine",
    ],
    correctIndex: 0,
    explanation:
      "A prohibition on subletting the whole works is aimed at substance, not just formal naming — subletting effectively everything while keeping a nominal role is exactly the arrangement this kind of clause is meant to prevent.",
  },
  {
    id: "assignment-06",
    topic: "Assignment & Subcontracting",
    scenario:
      "The Employer wants to deal directly with a nominated subcontractor and pay them directly, bypassing the main contractor.",
    options: [
      "Check the contract structure first — direct payment arrangements need a specific mechanism, not just informal convenience",
      "Direct dealing with subcontractors is always fine since they're ultimately doing the work",
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
      "This is worth checking carefully rather than assumed — how assignment-by-operation-of-law interacts with a consent clause varies and can genuinely go either way",
      "Assignment by operation of law is always automatically exempt from any consent requirement",
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
      "Check whether the contract requires Employer approval for subcontractor changes — insolvency doesn't automatically waive that requirement",
      "Insolvency of the original subcontractor means the main contractor can substitute freely without approval",
    ],
    correctIndex: 0,
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
      "Check the statute — missing the response deadline often means the Employer is deemed to accept the claimed amount in full",
      "Silence has no particular consequence and the claim can simply be assessed normally later",
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
      "Check the statute's rules on this — many regimes restrict a respondent to the reasons already given in its payment response",
      "New defences can always be raised for the first time at adjudication regardless of what was in the payment response",
    ],
    correctIndex: 0,
    explanation:
      "A common feature of these regimes is limiting the adjudication to the grounds already raised in the payment response, precisely to stop respondents from ambushing the claimant with new reasons late in the process.",
  },
  {
    id: "adjudication-03",
    topic: "Security of Payment / Adjudication",
    scenario:
      "An adjudication determination goes against the Employer. The Employer wants to simply ignore it and keep withholding payment pending a future court case.",
    options: [
      "Adjudication determinations are typically binding and enforceable on an interim basis — ignoring one carries real enforcement risk even if a later court challenge is planned",
      "A determination can simply be ignored until a court makes a final ruling",
    ],
    correctIndex: 0,
    explanation:
      "Adjudication is generally designed to be 'pay now, argue later' — determinations are enforceable in the interim regardless of an intended later challenge, and ignoring one can lead to direct enforcement action.",
  },
  {
    id: "adjudication-04",
    topic: "Security of Payment / Adjudication",
    scenario:
      "The Contractor's payment claim doesn't reference the statute or use the exact prescribed wording, and the Employer wants to argue it's automatically invalid on that basis.",
    options: [
      "Check whether substance matters more than form under the specific statute — many regimes look at whether the claim substantively meets the requirements, not exact wording",
      "Missing the exact prescribed wording always automatically invalidates a payment claim",
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
      "Check whether 'pay when paid' clauses are actually enforceable under the applicable Security of Payment statute — many jurisdictions render them void",
      "'Pay when paid' clauses are always enforceable exactly as written",
    ],
    correctIndex: 0,
    explanation:
      "A number of Security of Payment regimes specifically outlaw 'pay when paid' clauses to protect contractors from upstream payment risk they have no control over — this is exactly the kind of clause that needs checking against the statute, not assumed valid.",
  },
  {
    id: "adjudication-06",
    topic: "Security of Payment / Adjudication",
    scenario:
      "An adjudicator's determination contains an obvious arithmetic error. The Employer wants to simply refuse payment entirely rather than address the specific error.",
    options: [
      "Raise the specific error through the proper channel (correction/review mechanism if available) rather than refusing payment outright",
      "Any error in a determination is grounds to ignore the whole thing and withhold payment entirely",
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
      "Check the statute's rules on repeat applications — many regimes restrict re-adjudicating the same claim",
      "A losing party can always simply try again with a fresh adjudication application on the same claim",
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
      "Comply with the determination for now (it's typically an interim, 'pay now, argue later' outcome) while pursuing whatever final-resolution avenue the statute or contract provides",
      "Adjudication determinations are always final and can never be revisited by any other process",
    ],
    correctIndex: 0,
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
      "Assess whether the outstanding items are genuinely minor and don't prevent the Employer from using the works for their intended purpose — that's the real test, not a fixed checklist",
      "Any outstanding item at all, however minor, automatically means practical completion hasn't occurred",
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
      "Check what the contract actually makes a precondition to practical completion — if documentation is expressly required, withholding certification may be justified",
      "Documentation never affects practical completion since it's separate from the physical works",
    ],
    correctIndex: 0,
    explanation:
      "Some contracts expressly tie practical completion to specific deliverables like as-built documentation, not just physical readiness — check the actual definition in the contract rather than assuming documentation is irrelevant.",
  },
  {
    id: "practical-completion-03",
    topic: "Practical Completion",
    scenario:
      "The Employer takes beneficial occupation of the building and starts using it without any formal certificate of practical completion ever being issued.",
    options: [
      "This is worth flagging — occupying without a certificate can create disputes later about when practical completion actually occurred and what liabilities shifted",
      "Occupation without a certificate has no real consequences as long as everyone is generally happy with the building",
    ],
    correctIndex: 0,
    explanation:
      "The certificate matters because it typically triggers key consequences — start of the defects liability period, retention release, risk transfer. Occupying without one leaves genuine ambiguity about exactly when those things started.",
  },
  {
    id: "practical-completion-04",
    topic: "Practical Completion",
    scenario:
      "The Contractor argues that because the Employer has been using part of the building for weeks, practical completion must be deemed to have occurred by conduct.",
    options: [
      "This is a genuinely contested area — some contracts and jurisdictions recognise deemed practical completion by conduct, others require the formal certificate regardless",
      "Occupation for any length of time always automatically equals deemed practical completion everywhere",
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
      "The practical test is usually whether the Employer can take beneficial use of the works despite the outstanding items, not just their number or nature in the abstract",
      "There's a fixed, universal list of what counts as 'minor' regardless of the specific project",
    ],
    correctIndex: 0,
    explanation:
      "This distinction is fact-specific — the same item might be minor on one project and a genuine barrier to use on another. The consistent test is functional: can the works actually be used for their intended purpose despite what's outstanding.",
  },
  {
    id: "practical-completion-06",
    topic: "Practical Completion",
    scenario:
      "The certifier delays issuing the practical completion certificate for weeks after the works are actually ready, without real explanation.",
    options: [
      "Follow up formally and check the contract's timeframe for certification — an unexplained, prolonged delay in certifying is worth challenging",
      "There's nothing that can be done about certification timing since it's entirely at the certifier's discretion",
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
      "Check the contract — many require outstanding items to be completed within a specific period after practical completion, sometimes tied to the defects liability period",
      "A schedule of outstanding items attached to the certificate is purely informational and never creates any deadline",
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
      "Check for a proper contractual right of set-off — withholding a practical-completion-triggered release over an unrelated matter generally isn't supported without one",
      "Any ongoing dispute between the parties justifies withholding whatever is currently due",
    ],
    correctIndex: 0,
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
      "Late possession is usually a compensable Employer-caused delay, not a minor administrative matter to be waved through",
      "A few weeks' delay in handing over the site is never significant enough to matter contractually",
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
      "This is a real programme issue worth raising formally — a phased handover that wasn't contractually agreed can affect sequencing and completion",
      "Partial possession is functionally the same as full possession as long as some work can start somewhere",
    ],
    correctIndex: 0,
    explanation:
      "If the contract programme assumed full-site access, a phased handover that wasn't agreed can genuinely disrupt planned sequencing — this is worth raising and assessing for EOT purposes, not treated as equivalent to what was actually promised.",
  },
  {
    id: "site-possession-03",
    topic: "Site Possession",
    scenario:
      "Site access is granted, but part of it remains occupied by existing tenants or utilities not yet cleared, restricting what the Contractor can actually do there.",
    options: [
      "This is worth documenting and raising — 'access' that doesn't allow actual work to proceed isn't the same as genuine possession",
      "Once access is technically granted, any remaining restrictions are the Contractor's problem to work around",
    ],
    correctIndex: 0,
    explanation:
      "Possession generally needs to be unrestricted enough to actually let the contracted work proceed — nominal access blocked by unresolved occupiers or utilities isn't the same as the possession the contract actually requires the Employer to give.",
  },
  {
    id: "site-possession-04",
    topic: "Site Possession",
    scenario:
      "The Contractor wants to claim an EOT for late site possession without demonstrating which specific programme activities were actually blocked by it.",
    options: [
      "Substantiate the claim against the actual programme impact — a claim needs to show what was genuinely delayed, not just assert lateness in principle",
      "Late possession alone is automatically sufficient without needing to show programme impact",
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
      "This distinction matters — access that exists on paper but doesn't allow real work to start likely doesn't satisfy the Employer's possession obligation",
      "Technical access on the correct date always satisfies the obligation regardless of practical usability",
    ],
    correctIndex: 0,
    explanation:
      "The obligation is generally to give possession sufficient to allow the works to proceed, not just a nominal, technical access that doesn't functionally enable anything — this is a substance-over-form question, same as several other areas.",
  },
  {
    id: "site-possession-06",
    topic: "Site Possession",
    scenario:
      "A right-of-way needed for site access is delayed by a third party entirely outside either party's control.",
    options: [
      "Check what the contract says about this specific risk — third-party delays affecting the Employer's possession obligation are often still treated as an Employer risk unless expressly carved out",
      "A third party being the actual cause automatically means neither party bears any risk or consequence",
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
      "Get early access and its implications confirmed in writing at the time — an informal request shouldn't quietly become a formal contractual date without being agreed as such",
      "Any early access automatically and retroactively becomes the new contractual possession date",
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
      "Check whether the contract's possession obligation is meant to include working utilities — if so, this may not be proper possession yet",
      "Utilities are always a separate matter from possession and never affect whether possession was properly given",
    ],
    correctIndex: 0,
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
      "A general market shortage usually doesn't meet the threshold for force majeure — check the clause's actual definition before relying on it",
      "Any external factor making performance harder qualifies as force majeure",
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
      "Late notice is a real risk here too — many force majeure clauses treat prompt notice as a precondition to relief",
      "Force majeure relief applies automatically once a qualifying event occurs, regardless of when notice is given",
    ],
    correctIndex: 0,
    explanation:
      "This is the same notice discipline that matters throughout construction contracts — even a genuinely qualifying event may not give relief if the required notice wasn't given within the time the clause specifies.",
  },
  {
    id: "force-majeure-03",
    topic: "Force Majeure",
    scenario:
      "An event is genuinely beyond either party's control, but the contract has no force majeure clause at all.",
    options: [
      "Check what general legal doctrines (like frustration) might apply instead — the absence of a clause doesn't necessarily mean there's no relief at all, but it's a different and often higher bar",
      "No clause means there's automatically no possible relief regardless of the circumstances",
    ],
    correctIndex: 0,
    explanation:
      "Without a contractual force majeure clause, a party may still look to general legal doctrines like frustration, but those are typically much harder to satisfy than a contractual clause — this is a genuine grey area to get advice on rather than assume closed off.",
  },
  {
    id: "force-majeure-04",
    topic: "Force Majeure",
    scenario:
      "The Contractor claims force majeure for a delay that it could reasonably have mitigated (for example, by sourcing from an alternate supplier) but didn't attempt to.",
    options: [
      "Check whether the clause requires reasonable mitigation — many do, and failing to attempt it can undermine the claim",
      "Once a qualifying event occurs, there's no obligation to attempt any mitigation at all",
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
      "The relief generally covers the event's actual duration and its direct effects, not an open-ended extension for unrelated remobilisation delay",
      "Any delay that happens after a force majeure event, however caused, is automatically still covered by it",
    ],
    correctIndex: 0,
    explanation:
      "Force majeure relief is tied to the impact of the qualifying event itself — once the event ends, further delay needs its own justification, and slow remobilisation caused by the contractor's own inefficiency isn't automatically swept in.",
  },
  {
    id: "force-majeure-06",
    topic: "Force Majeure",
    scenario:
      "The Contractor assumes a force majeure clause automatically excuses both time and cost, without checking what the clause actually provides.",
    options: [
      "Check the clause specifically — many force majeure provisions excuse time (via an EOT) but not cost, leaving the Contractor to bear standing costs itself",
      "Force majeure clauses always excuse both time and cost together as a package",
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
      "Check the clause's actual wording closely — many force majeure clauses use a specific defined list, and events outside it may not qualify even if they feel similar in spirit",
      "Any event that feels similar in nature to the listed examples automatically qualifies",
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
      "Check the clause's actual threshold — many force majeure clauses require genuine impossibility or prevention, not just increased difficulty or cost",
      "Increased cost or difficulty alone is always enough to trigger force majeure relief",
    ],
    correctIndex: 0,
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
      "Check the contract's specific risk allocation for ground conditions before assuming either party bears it automatically",
      "Unexpected ground conditions are always automatically the Contractor's risk to absorb",
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
      "This is worth checking carefully — broad risk-allocation wording is sometimes still read subject to a genuine latent-condition standard, but not always, depending on the exact drafting and jurisdiction",
      "Broad wording always means the Contractor bears absolutely any ground condition no matter how extreme or unforeseeable",
    ],
    correctIndex: 0,
    explanation:
      "How far broadly worded risk-allocation clauses actually go — and whether truly extraordinary, unforeseeable conditions can still support relief — is a genuinely contested area that depends heavily on specific wording and jurisdiction, not a settled universal answer.",
  },
  {
    id: "latent-conditions-03",
    topic: "Latent Site Conditions",
    scenario:
      "The Contractor proceeds to deal with an unexpected ground condition without notifying the Employer or Engineer first, then submits a claim afterward.",
    options: [
      "Notify first, before or as soon as proceeding — most latent condition clauses require notice before or promptly upon encountering the condition, not just an after-the-fact claim",
      "As long as the claim is eventually submitted, the timing of notification doesn't really matter",
    ],
    correctIndex: 0,
    explanation:
      "Like most claim mechanisms, latent condition clauses typically require prompt notice so the Engineer/Employer can inspect and instruct before the condition is dealt with — submitting a claim only after the fact undermines that and risks the claim being challenged.",
  },
  {
    id: "latent-conditions-04",
    topic: "Latent Site Conditions",
    scenario:
      "A condition is arguably foreseeable by an experienced contractor doing proper due diligence, such as from publicly available geological records.",
    options: [
      "This matters — a condition that a reasonably diligent, experienced contractor should have anticipated is generally treated differently from a genuinely latent one",
      "Foreseeability by an experienced contractor never affects whether a condition counts as latent",
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
      "This is worth scrutinising rather than accepted at face value — disclaimers of reliance on provided information don't always hold up, especially where the Employer's own reports were reasonably relied on in practice",
      "A disclaimer in the documents always fully protects the Employer from any responsibility for inaccurate information",
    ],
    correctIndex: 0,
    explanation:
      "Whether an 'information only, no reliance' disclaimer actually shields the Employer from responsibility for genuinely inaccurate information it provided is a real area of dispute, not a settled given — worth challenging rather than accepting outright.",
  },
  {
    id: "latent-conditions-06",
    topic: "Latent Site Conditions",
    scenario:
      "The Contractor discovers a latent condition mid-excavation and stops all work entirely without seeking instructions, causing further delay beyond the discovery itself.",
    options: [
      "Seek instructions promptly rather than unilaterally stopping everything — an overreaction can create its own additional, harder-to-recover delay",
      "Stopping all work entirely is always the correct and fully recoverable response to any latent condition",
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
      "This weakens the claim significantly — contemporaneous records are usually essential to substantiate what was actually encountered and what it actually cost",
      "A claim can always be reconstructed accurately from memory well after the fact without needing contemporaneous records",
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
      "Check whether the deviation is actually material enough to matter under the clause — minor, expected variation usually isn't enough on its own",
      "Any deviation at all from what was described automatically triggers a claim regardless of how minor",
    ],
    correctIndex: 0,
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
      "Raise it formally with the Employer rather than silently designing around it or ignoring it — an error in the Employer's Requirements is something to flag, not just absorb",
      "The Contractor must simply follow the Employer's Requirements exactly as written even if an error is spotted",
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
      "Using the Employer's Requirements as a starting point doesn't excuse a design that fails to meet applicable code — that's generally still the Contractor's responsibility to get right",
      "If the Employer's Requirements didn't flag the code requirement, the Contractor isn't responsible for missing it",
    ],
    correctIndex: 0,
    explanation:
      "Compliance with applicable law and codes is typically a baseline design obligation on the party doing the design, independent of whether the Employer's Requirements happened to mention it — 'the brief didn't say' isn't usually a valid excuse for a code failure.",
  },
  {
    id: "design-responsibility-03",
    topic: "Design Responsibility",
    scenario:
      "The Employer approves the Contractor's design submission, and a defect later emerges that's traceable to that design.",
    options: [
      "Check what the contract says 'approval' actually means — in many design-and-build contracts, Employer approval or comment doesn't shift design liability away from the Contractor",
      "Employer approval of a design submission always fully transfers design liability to the Employer",
    ],
    correctIndex: 0,
    explanation:
      "Many contracts specifically preserve the point that Employer review/approval doesn't relieve the Contractor of design responsibility — it's a check, not a liability transfer. But this depends on the exact wording, so it's worth confirming rather than assuming either way.",
  },
  {
    id: "design-responsibility-04",
    topic: "Design Responsibility",
    scenario:
      "The Contractor engages a specialist subcontractor to design a specific system, such as the façade. A defect later arises in that specific design.",
    options: [
      "The main Contractor generally remains responsible to the Employer regardless of which subcontractor actually did the design work — the same principle as subcontracted construction work",
      "Design responsibility passes automatically to whichever specialist actually did the design",
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
      "It generally is treated similarly — a genuine change in scope or requirements, including design changes, should typically follow the same instructed-variation process and valuation approach",
      "Design changes can never be claimed the same way as ordinary construction variations",
    ],
    correctIndex: 0,
    explanation:
      "A genuine Employer-instructed change to design requirements is usually just another form of variation, and should go through the same instruction, substantiation, and valuation process as any other change in scope.",
  },
  {
    id: "design-responsibility-06",
    topic: "Design Responsibility",
    scenario:
      "The Contractor's design technically meets the performance specification but not really what the Employer intended functionally, due to genuine ambiguity in the Employer's Requirements.",
    options: [
      "This is a real dispute area worth resolving carefully — genuine ambiguity in the brief is different from a straightforward design failure, and how it's resolved often depends on which party's interpretation was more reasonable",
      "Meeting the literal wording of the specification is always sufficient regardless of what the Employer actually intended",
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
      "Check the contract specifically — these are materially different standards, and 'fit for purpose' is generally a more onerous, stricter obligation than 'reasonable skill and care'",
      "The two standards are essentially interchangeable in practice",
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
      "Check what the contract says this specific wording actually means — the distinction between 'noted' and 'approved' can be contractually significant and is worth clarifying, not assumed to be equivalent",
      "Any form of review comment, regardless of wording, always has the exact same contractual effect",
    ],
    correctIndex: 0,
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
      "A genuine and serious delay always overrides a missed notice deadline",
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
      "This is the same trap as informal notice generally — actual awareness through informal channels often doesn't satisfy a strict formal notice requirement",
      "Actual awareness through any means always satisfies a formal notice requirement",
    ],
    correctIndex: 0,
    explanation:
      "This echoes a recurring theme — formal notice requirements exist precisely to create a clear, documented trigger point, and informal awareness usually doesn't substitute for it, however reasonable that argument might feel.",
  },
  {
    id: "time-bar-03",
    topic: "Time-Bar Provisions",
    scenario:
      "A time-bar clause requires notice 'as soon as possible.' The Contractor treats this as a soft guideline rather than a real deadline with consequences.",
    options: [
      "Treat it as a real requirement with teeth — even a flexible-sounding standard like 'as soon as possible' can still be enforced strictly depending on the clause and jurisdiction",
      "Flexible wording like 'as soon as possible' never carries any real enforceable consequence",
    ],
    correctIndex: 0,
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
      "Where clauses seem to conflict, the longer deadline always automatically applies to everything",
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
      "Check the clause carefully — late substantiation doesn't necessarily bar the claim the same way a late initial notice would, but it depends on exactly how the clause is drafted",
      "Any lateness anywhere in the claims process, including substantiation, always fully bars the claim the same way",
    ],
    correctIndex: 0,
    explanation:
      "Some clauses treat the initial notice as the hard time bar and treat later substantiation more flexibly (affecting assessment rather than barring the claim entirely) — but this varies by clause, so it needs checking rather than assuming the harshest reading.",
  },
  {
    id: "time-bar-06",
    topic: "Time-Bar Provisions",
    scenario:
      "The Employer never raises a time-bar defence until well into a dispute or adjudication, long after receiving the late notice without any objection at the time.",
    options: [
      "This may matter — depending on the jurisdiction, a party's conduct (like not objecting at the time) can sometimes affect its ability to later rely on a strict time bar",
      "A time-bar defence can always be raised at any point regardless of prior conduct, with no effect from earlier silence",
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
      "Read the clause's actual trigger carefully — an 'ought to have known' standard can start the clock earlier than the date of genuine actual knowledge",
      "Only literal actual knowledge can ever start a notice clock, regardless of how the clause is worded",
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
      "Check what the contract requires to actually vary its own terms — an informal email exchange may not be sufficient if formal variation procedures are required",
      "Any informal email agreement between representatives is always sufficient to validly extend a contractual deadline",
    ],
    correctIndex: 0,
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
      "Check whether the call is genuine and made in good faith under the bond's terms — on-demand bonds are largely payable on demand, but calls made in bad faith or for an improper purpose can be challenged",
      "On-demand bonds can never be challenged once called, regardless of the circumstances",
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
      "Check what the contract actually requires — bond duration and coverage should match the contractual security period specified, not be extended informally",
      "Bond duration can always be unilaterally extended by the Employer regardless of what the contract specifies",
    ],
    correctIndex: 0,
    explanation:
      "The bond's required duration and coverage is a specific contractual term — align it to what's actually agreed rather than either party informally deciding to extend or shorten it.",
  },
  {
    id: "bonds-03",
    topic: "Bonds & Guarantees",
    scenario:
      "The Contractor's performance bond issuer becomes financially distressed, and there are real doubts about whether it could actually pay out if called.",
    options: [
      "This is worth raising and checking — a bond is only as good as the issuer's ability to pay, and some contracts require bonds from institutions meeting minimum credit criteria",
      "The identity and financial strength of the bond issuer never matters once the bond document itself is in hand",
    ],
    correctIndex: 0,
    explanation:
      "A bond is a promise to pay, and that promise is only as strong as the issuer behind it — many contracts specifically require bonds from banks or insurers meeting certain criteria for exactly this reason.",
  },
  {
    id: "bonds-04",
    topic: "Bonds & Guarantees",
    scenario:
      "A parent company guarantee is provided in place of a performance bond. The Contractor's parent company is later sold to a new, unrelated owner.",
    options: [
      "Check what happens to the guarantee's validity and enforceability after a change of ownership — this is worth verifying, not assumed to continue seamlessly",
      "A parent company guarantee always continues in force exactly the same way regardless of who owns the parent company afterward",
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
      "A bond call should still generally reflect the actual entitlement, not simply extract the maximum available regardless of the underlying claim",
      "The full bond amount is always fair game once any valid claim exists, however small",
    ],
    correctIndex: 0,
    explanation:
      "Even where a bond is easily callable, calling for more than the genuine underlying entitlement can itself be challenged as an improper call — the bond secures actual loss, not a windfall.",
  },
  {
    id: "bonds-06",
    topic: "Bonds & Guarantees",
    scenario:
      "The Contractor assumes a bond automatically reduces in value as the project nears completion, without checking the bond document itself.",
    options: [
      "Check the bond's actual terms — some bonds do step down or reduce at defined milestones, but this isn't automatic or universal",
      "All performance bonds automatically reduce in value as work progresses",
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
      "Deducting both cash retention and holding a retention bond simultaneously is always fine",
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
      "Follow up formally and check the contract's release trigger — bonds shouldn't be held indefinitely past the point they're due for release",
      "Bonds can be held indefinitely at the Employer's discretion with no real trigger for release",
    ],
    correctIndex: 0,
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
      "The main contractor generally retains overall site safety responsibility and should act on it, even for subcontracted work",
      "Safety on a specific task is always solely the subcontractor's problem once work is subcontracted",
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
      "Check the applicable regulations — many jurisdictions require statutory reporting of certain incidents regardless of how the parties want to handle it internally",
      "Any incident can always be handled purely internally without external reporting",
    ],
    correctIndex: 0,
    explanation:
      "Workplace safety incidents are often subject to mandatory statutory reporting thresholds independent of what the parties would prefer — check the applicable regulation rather than assuming internal handling is sufficient.",
  },
  {
    id: "safety-03",
    topic: "Health & Safety",
    scenario:
      "The Employer's own instructed method of work creates a safety risk the Contractor flags, but the Employer insists the Contractor proceed as instructed.",
    options: [
      "Raise the safety concern formally and don't proceed with something genuinely unsafe just because it was instructed — safety obligations aren't overridden by an instruction",
      "An Employer instruction always overrides the Contractor's own safety judgement",
    ],
    correctIndex: 0,
    explanation:
      "Contractual instructions don't override independent safety obligations — a contractor generally can't be compelled to carry out work it genuinely believes is unsafe, and should escalate rather than silently comply or silently refuse without documenting why.",
  },
  {
    id: "safety-04",
    topic: "Health & Safety",
    scenario:
      "A safety non-compliance results in a stop-work order from a regulator. The Contractor wants to claim the resulting delay as an EOT, treating it like any other Employer-caused delay.",
    options: [
      "Check the actual cause — a stop-work order resulting from the Contractor's own non-compliance generally wouldn't qualify as an excusable, compensable delay",
      "Any regulatory stop-work order automatically qualifies for an EOT regardless of the underlying cause",
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
      "Check what's actually required — many regimes and contracts require specific method statements or risk assessments for defined higher-risk activities, not just generic documentation",
      "Generic project-wide safety documentation is always sufficient for every activity on site",
    ],
    correctIndex: 0,
    explanation:
      "Generic safety documentation often isn't enough on its own — higher-risk activities typically need their own specific method statements and risk assessments, both as good practice and often as a regulatory requirement.",
  },
  {
    id: "safety-06",
    topic: "Health & Safety",
    scenario:
      "A worker is injured due to a genuine third party's negligence (for example, a delivery driver unrelated to either party). The Contractor assumes it bears no responsibility at all since it wasn't directly at fault.",
    options: [
      "Check the site safety and insurance obligations regardless of direct fault — the Contractor's overall site safety duties can still be relevant even where a third party was the immediate cause",
      "No responsibility ever attaches to the Contractor if a third party was the immediate cause of an injury",
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
      "Enforce the same safety requirements on all site visitors, including the Employer's representative — safety compliance shouldn't have exceptions based on seniority or relationship",
      "Employer representatives are generally exempt from the Contractor's site safety rules",
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
      "Keep proper training and induction records regardless of actual competence — documentation is often what's actually checked in an audit or after an incident, not just genuine skill",
      "Documentation of safety training is a formality that doesn't really matter if workers are actually competent",
    ],
    correctIndex: 0,
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
      "This is often treated differently from an ordinary subcontractor's default — check the contract's specific provisions on nominated subcontractor delay, which can shift more risk to the Employer",
      "Delay caused by any subcontractor, nominated or otherwise, is always entirely the main Contractor's risk",
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
      "Check the contract's renomination mechanism — many contracts require the Employer or Engineer to nominate a replacement, rather than leaving it entirely to the main Contractor",
      "The main Contractor is always solely responsible for finding a replacement, the same as with any subcontractor",
    ],
    correctIndex: 0,
    explanation:
      "Nomination provisions often include a renomination process specifically because the Employer chose the original subcontractor — leaving the main contractor to sort it out entirely alone may not match what the contract actually provides for.",
  },
  {
    id: "nominated-subcontractors-03",
    topic: "Nominated Subcontractors",
    scenario:
      "The main Contractor objects to a proposed nominated subcontractor on reasonable grounds, such as known poor performance on a similar project, but the Employer insists on proceeding anyway.",
    options: [
      "A genuine, reasonable objection is worth raising formally and pursuing — many nomination clauses give the main Contractor some right to object to a nomination on reasonable grounds",
      "The main Contractor has no right to object to any nomination under any circumstances",
    ],
    correctIndex: 0,
    explanation:
      "Most nomination mechanisms give the main contractor some ability to raise reasonable objections, precisely because the main contractor still carries overall responsibility for the works — a blanket 'no right to object' assumption is usually wrong.",
  },
  {
    id: "nominated-subcontractors-04",
    topic: "Nominated Subcontractors",
    scenario:
      "Payment to a nominated subcontractor is meant to flow through the main Contractor, but the main Contractor is having cash flow problems and delays passing on payment already received for that subcontractor's work.",
    options: [
      "This is a real risk area — some contracts include direct payment mechanisms letting the Employer pay a nominated subcontractor directly if the main Contractor doesn't pass on payment properly",
      "There's never any mechanism for the Employer to pay a nominated subcontractor directly, regardless of circumstances",
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
      "Check the specific contract wording — the main Contractor's liability for a nominated subcontractor's work varies by contract and isn't automatically excused just because the subcontractor was nominated",
      "Nomination automatically and completely excuses the main Contractor from any liability for that subcontractor's work",
    ],
    correctIndex: 0,
    explanation:
      "This is genuinely contract-specific — some forms preserve the main contractor's full responsibility even for nominated work, others provide some relief given the lack of choice. Check the actual wording rather than assuming either extreme.",
  },
  {
    id: "nominated-subcontractors-06",
    topic: "Nominated Subcontractors",
    scenario:
      "The Employer wants to nominate a subcontractor for work that was originally priced and included in the main Contractor's own scope and rates.",
    options: [
      "This is worth querying — nominating a subcontractor for work already priced in the main Contractor's scope can create a real commercial and coordination issue worth raising before proceeding",
      "The Employer can always nominate a subcontractor for any part of the works with no commercial consequence to the main Contractor",
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
      "Clarify the commercial terms before proceeding — a bare nomination without agreed terms creates real risk of dispute later about what the main Contractor is bound to accept",
      "Any nomination is automatically binding on whatever commercial terms the nominated subcontractor happens to propose",
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
      "Independently assess the claim's merits before passing it through — the main Contractor's own position with the Employer shouldn't just mirror whatever the nominated subcontractor claims",
      "Claims from a nominated subcontractor should always be passed through to the Employer exactly as received, without any independent check",
    ],
    correctIndex: 0,
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
      "Check the contract's testing and retest provisions — most contracts allow for retesting after remedial work rather than treating a single failed test as an automatic breach",
      "Any single failed test automatically constitutes a breach entitling rejection of the works",
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
      "This is worth flagging as a real risk — using an unproven system before passing tests can create ambiguity about liability if something later goes wrong",
      "Early use before passing tests has no bearing on liability or risk allocation either way",
    ],
    correctIndex: 0,
    explanation:
      "Putting a system into use before it's actually demonstrated to work through proper testing blurs the line on who's responsible if it fails afterward — worth documenting and agreeing on explicitly, not just proceeding informally.",
  },
  {
    id: "testing-commissioning-03",
    topic: "Testing & Commissioning",
    scenario:
      "Test results are recorded informally in a notebook rather than through the contract's specified test certificate process.",
    options: [
      "Follow the contract's actual test certification process — informal records may not be sufficient to establish that testing requirements were properly met",
      "Any record of testing, however informal, is equally sufficient regardless of what the contract specifies",
    ],
    correctIndex: 0,
    explanation:
      "If the contract specifies a particular test certification process, that's what actually establishes compliance — informal records can create real disputes later about whether proper testing genuinely occurred.",
  },
  {
    id: "testing-commissioning-04",
    topic: "Testing & Commissioning",
    scenario:
      "A commissioning delay is caused by the Employer's late supply of operational data or connection to their own systems needed to complete testing.",
    options: [
      "This is likely an Employer-caused delay to commissioning, worth raising as such rather than absorbed as the Contractor's own testing delay",
      "Any commissioning delay is always treated as the Contractor's own responsibility regardless of its actual cause",
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
      "Follow the specified testing procedure regardless of confidence in the outcome — skipping a required test isn't a decision to make unilaterally",
      "Skipping a specified test is fine as long as the Contractor is confident about the result",
    ],
    correctIndex: 0,
    explanation:
      "Specified tests exist to create an objective, agreed record of performance — confidence in the outcome doesn't substitute for actually running the required test, and skipping it can undermine the contractor's own later claim that the system works.",
  },
  {
    id: "testing-commissioning-06",
    topic: "Testing & Commissioning",
    scenario:
      "A test is passed, but months later the same system fails in actual operation. The Employer wants to argue the original test was somehow invalid.",
    options: [
      "This needs proper investigation — a later failure doesn't automatically invalidate an earlier genuinely passed test, though it's worth checking what actually changed or degraded since then",
      "A later failure always proves retroactively that the original test must have been improperly conducted",
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
      "This is a genuine interpretive dispute worth resolving carefully (and often needing technical input) rather than either party unilaterally deciding its own reading is correct",
      "Ambiguous specifications should always be read in whichever way is more favorable to the Contractor",
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
      "Follow the contract's witnessing requirement — self-certified tests without the required witness may not be accepted as valid compliance",
      "Self-certification by the Contractor's own engineer is always equally valid regardless of any witnessing requirement in the contract",
    ],
    correctIndex: 0,
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
      "Push back and require a realistic, achievable programme — a nominally compliant but unrealistic programme undermines the whole point of having one",
      "Any submitted programme satisfies the contractual requirement regardless of whether it's realistic",
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
      "This is a red flag worth challenging — a genuine programme update should re-examine logic and critical path, not just mechanically slide dates",
      "Shifting dates without revisiting logic is a perfectly adequate way to update a programme",
    ],
    correctIndex: 0,
    explanation:
      "A programme update that never re-examines its own logic isn't really tracking reality — it's just recording slippage. A credible programme update reflects genuine replanning, not a mechanical date shift.",
  },
  {
    id: "programme-03",
    topic: "Programme & Scheduling",
    scenario:
      "The Employer's representative informally suggests resequencing part of the works during a site meeting, and the Contractor proceeds without any formal instruction or programme revision.",
    options: [
      "Get it confirmed formally and reflected in a revised programme before proceeding — informal suggestions shouldn't quietly become the working programme",
      "Any informal suggestion from the Employer's representative can be treated as a binding programme change",
    ],
    correctIndex: 0,
    explanation:
      "The same discipline about formal instructions applies to programme changes — an informal suggestion, even from the right person, should be confirmed and properly reflected before it becomes the basis for how work proceeds.",
  },
  {
    id: "programme-04",
    topic: "Programme & Scheduling",
    scenario:
      "The Contractor's programme shows significant float on a particular activity. The Employer argues that any delay to that activity can never support an EOT because of the float.",
    options: [
      "Check who owns the float and how the contract treats it — float ownership is a genuinely contested area, not a settled default in the Employer's favor",
      "Float always belongs to the Employer, so any delay absorbed by float can never support an EOT",
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
      "Reconcile the subcontractor's programme with the main programme before issuing instructions — proceeding on conflicting programmes is a recipe for disputes and inefficiency",
      "Subcontractor programmes never need to be reconciled with the main programme as long as the subcontractor manages its own work",
    ],
    correctIndex: 0,
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
      "Any programme, theoretical or actual, is an equally valid basis for an EOT claim",
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
      "Request specific reasons — a vague rejection without substantive grounds is hard to act on and may not be a valid rejection under the contract's actual requirements",
      "A programme submission can always be rejected without any reason given",
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
      "Update and re-baseline the programme to reflect approved changes — an outdated baseline makes it much harder to properly track and prove delay later",
      "The original baseline programme should never be revised regardless of subsequent approved changes",
    ],
    correctIndex: 0,
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
      "Check the novation agreement's actual terms — liability for pre-novation design work depends on how the novation is specifically drafted, not assumed automatically",
      "Novation always completely erases any responsibility for work done before the novation date, automatically",
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
      "This should be raised and stopped — post-novation, instructions should properly flow through the new contractual relationship, not the old one informally continuing",
      "Continuing the old informal reporting lines after novation is harmless and doesn't need addressing",
    ],
    correctIndex: 0,
    explanation:
      "Novation is meant to genuinely shift the contractual relationship — old habits of direct informal instruction undermine that and can create confusion about who's actually responsible for what going forward.",
  },
  {
    id: "novation-03",
    topic: "Novation",
    scenario:
      "The novation agreement is silent on what happens to fees already invoiced but unpaid by the consultant to the Employer before the novation date.",
    options: [
      "This is a genuine gap worth resolving explicitly before signing — don't assume it's automatically covered by the novation agreement's other terms",
      "Unpaid pre-novation fees are always automatically absorbed into the new arrangement without needing separate resolution",
    ],
    correctIndex: 0,
    explanation:
      "A gap in the novation agreement about historic unpaid fees is a real loose end — leaving it unresolved just defers a dispute about who's actually responsible for that amount.",
  },
  {
    id: "novation-04",
    topic: "Novation",
    scenario:
      "The Contractor wants to hold the newly-novated consultant to the same standard of care that applied under the original Employer-consultant agreement, without checking if the novation preserved those exact terms.",
    options: [
      "Check the novation agreement to confirm what terms actually carried over — assuming automatic continuity of every original term isn't safe without verifying",
      "All terms of the original consultant agreement always automatically carry over identically upon novation",
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
      "The consultant's own consent is generally required for a valid novation — this needs to be resolved with the consultant directly, not assumed automatic",
      "Novation can be forced on a consultant without its consent as long as the Employer and Contractor agree",
    ],
    correctIndex: 0,
    explanation:
      "Novation is a three-party arrangement requiring the consent of all three parties, including the party being novated — the Employer and Contractor agreeing between themselves isn't enough on its own.",
  },
  {
    id: "novation-06",
    topic: "Novation",
    scenario:
      "Design errors are discovered that trace back to work done by the consultant before novation, but the defect only becomes apparent after novation and well into construction.",
    options: [
      "This needs careful analysis of the novation agreement's liability allocation — timing of discovery doesn't necessarily determine which party bears responsibility for a pre-novation design error",
      "Responsibility always automatically follows whoever currently holds the consultant's contract at the time the defect is actually discovered",
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
      "Raise concerns and review the consultant's track record before proceeding — accepting a novation doesn't have to be a rubber stamp if there are genuine concerns",
      "A proposed novation must always be accepted exactly as presented, regardless of any concerns about the consultant",
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
      "This is a real gap worth resolving — confirm whether the consultant's professional indemnity insurance continues to respond to pre- and post-novation work appropriately",
      "Insurance coverage is never affected by novation and doesn't need any specific attention",
    ],
    correctIndex: 0,
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
      "Check the subcontract for the required notice or process before deducting — an undocumented, unnotified deduction is easy for the subcontractor to successfully challenge",
      "Contra charges can always be deducted unilaterally without any notice requirement",
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
      "Check whether the subcontract allows charging based on estimated cost, and substantiate it properly — an estimate needs to be reasonable and evidenced, not just asserted",
      "Contra charges can only ever be based on actual incurred and invoiced costs, never estimates",
    ],
    correctIndex: 0,
    explanation:
      "Some contracts do allow contra charges based on a reasonable estimate, but that estimate still needs to be genuinely substantiated — an unsupported guess is vulnerable to challenge either way.",
  },
  {
    id: "contra-charges-03",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "The main Contractor applies a contra charge that's actually larger than the value of the subcontractor's remaining payment, resulting in the subcontractor owing money back.",
    options: [
      "This is legitimate in principle if properly substantiated, but the calculation and process need to be watertight given how aggressively it's likely to be challenged",
      "A contra charge can never exceed the value of the subcontractor's remaining payment under any circumstances",
    ],
    correctIndex: 0,
    explanation:
      "There's no inherent cap tying a contra charge to the remaining payment value — but a charge large enough to flip the balance owed is exactly the kind of deduction that invites the closest scrutiny, so the substantiation needs to be solid.",
  },
  {
    id: "contra-charges-04",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "A subcontractor disputes a contra charge, but the main Contractor proceeds to deduct it anyway before the dispute is resolved.",
    options: [
      "Check the subcontract's dispute process — deducting a genuinely disputed charge before resolution can itself be a breach depending on what the contract requires",
      "A contra charge can always be deducted immediately regardless of whether the subcontractor disputes it",
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
      "Establish genuine causation before charging — a contra charge needs to show the subcontractor's default actually caused the claimed cost, not just that both happened around the same time",
      "Any cost incurred during a period of subcontractor delay can automatically be charged back, regardless of actual cause",
    ],
    correctIndex: 0,
    explanation:
      "Correlation isn't causation — a contra charge needs to demonstrate the subcontractor's default actually caused the specific cost being charged, not just that the cost happened to arise during a delayed period.",
  },
  {
    id: "contra-charges-06",
    topic: "Contra Charges / Back-Charging",
    scenario:
      "A contra charge is applied for defective work, but the subcontractor was never given the opportunity to rectify the defect itself before the main Contractor brought in someone else to fix it.",
    options: [
      "Check whether the subcontract requires giving the subcontractor a chance to rectify first — bypassing that step can undermine the contra charge even if the defect was real",
      "The main Contractor can always bring in a third party to fix any defect and charge it back without giving the subcontractor a chance to fix it first",
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
      "Itemise each charge separately with its own basis and amount — a bundled, unitemised deduction is hard for the subcontractor to properly assess or challenge",
      "A single lump-sum deduction covering multiple issues is always acceptable without itemisation",
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
      "The deduction should be reversed and repaid once the actual cause is established — a contra charge based on a mistaken premise isn't valid just because it was already deducted",
      "Once a contra charge has been deducted, it stays deducted regardless of what's later discovered about the actual cause",
    ],
    correctIndex: 0,
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
      "Formalise this properly, even via a side agreement, before proceeding — taking possession without addressing risk, insurance, and defects liability implications creates real ambiguity",
      "Informal early partial possession has no real consequences as long as both parties are generally happy with the arrangement",
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
      "Apply the specific LD rate for that section as agreed, not the full contract rate — sectional LDs are meant to be section-specific",
      "The full contract LD rate always applies to any section that's late, regardless of what section-specific rates were agreed",
    ],
    correctIndex: 0,
    explanation:
      "Where sections have their own agreed LD rates, that's what applies to that section's lateness — using the full overall rate instead isn't supported by an agreement that specifically broke it down by section.",
  },
  {
    id: "partial-possession-03",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "Partial possession of one section affects the Contractor's ability to efficiently work on an adjacent, still-incomplete section, but this wasn't accounted for when partial possession was agreed.",
    options: [
      "Raise this as a genuine impact worth assessing for EOT/cost purposes — knock-on disruption to adjacent ongoing work from an occupied section is a real, foreseeable consequence worth addressing",
      "Partial possession of one section can never have any impact on adjacent, still-incomplete sections",
    ],
    correctIndex: 0,
    explanation:
      "Handing over part of a site while work continues next door commonly creates real access, safety, and logistics constraints — this is a legitimate basis for a claim if it wasn't priced into the original arrangement.",
  },
  {
    id: "partial-possession-04",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "The Employer takes partial possession of a section without any formal certificate specific to that section, just informally starting to use it.",
    options: [
      "Get a proper certificate of partial or sectional completion issued — this triggers real consequences (retention, defects liability, risk) that need a clear, documented start date",
      "Informal use of a section without a certificate has no bearing on when defects liability or risk transfer actually starts",
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
      "Review and adjust insurance arrangements to reflect the change in occupation and risk — continuing unchanged 'works' insurance may not properly cover an occupied, in-use section",
      "Insurance arrangements never need adjustment regardless of a section being occupied and used by the Employer",
    ],
    correctIndex: 0,
    explanation:
      "An occupied, in-use section has a genuinely different risk profile than an unoccupied construction site — insurance arrangements should be reviewed and adjusted to match, not left as if nothing changed.",
  },
  {
    id: "partial-possession-06",
    topic: "Partial Possession / Sectional Completion",
    scenario:
      "The Contractor assumes retention is only released for the whole project at once, ignoring that partial possession of a section has occurred.",
    options: [
      "Check whether the contract provides for proportionate retention release tied to sectional or partial completion — this is common in contracts that provide for sectional possession",
      "Retention release is always tied to the whole project regardless of any sectional or partial possession arrangements",
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
      "This distinction matters — check exactly what the contract defines as a section versus informal access, since the consequences (LDs, retention, risk) differ significantly",
      "Any area handed over to the Employer, however informally, is automatically treated as a full contractual 'section'",
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
      "Assess it against the same functional test as practical completion generally — beneficial use despite minor outstanding items — rather than assuming either full completion or no completion at all",
      "Partial possession always requires the section to be 100% complete with zero outstanding items",
    ],
    correctIndex: 0,
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
      "Check the contract's IP ownership and licence terms first — bespoke project designs are often owned by or exclusively licensed to the Employer, not freely reusable",
      "Any design created by the Contractor is automatically free to reuse on future projects regardless of contract terms",
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
      "Check what confidentiality obligations actually survive and apply here — a genuine risk area worth addressing through contract terms and internal controls, not assumed to sort itself out",
      "Confidentiality obligations always automatically end the moment an employee changes company",
    ],
    correctIndex: 0,
    explanation:
      "Confidentiality obligations are often deliberately drafted to survive the underlying relationship and bind individuals, not just companies — a real risk that needs proactive management, not an assumption that it stops mattering once someone moves on.",
  },
  {
    id: "confidentiality-ip-03",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "The Contractor wants to include photos of the completed project in its own marketing materials, without checking if there are any confidentiality restrictions in the contract.",
    options: [
      "Check the contract for confidentiality or publicity restrictions before using project photos in marketing — some contracts specifically limit this",
      "Using project photos in marketing is always fine regardless of what the contract says about confidentiality",
    ],
    correctIndex: 0,
    explanation:
      "Some contracts include specific confidentiality or non-disclosure provisions that would restrict even something as seemingly harmless as marketing photos — worth checking rather than assuming it's unrestricted.",
  },
  {
    id: "confidentiality-ip-04",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "The Employer wants access to the Contractor's proprietary internal cost breakdowns and methodology as part of a value engineering exercise.",
    options: [
      "Consider what's actually necessary to share versus genuinely proprietary and confidential — full disclosure isn't automatically required just because it would be helpful to the Employer",
      "The Contractor must always disclose all of its internal proprietary information whenever the Employer requests it",
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
      "Check the confidentiality clause's scope — using confidential information obtained under this contract for an unrelated purpose may breach the confidentiality obligation itself",
      "Information obtained during a project can always be freely used for any other purpose once the project relationship exists",
    ],
    correctIndex: 0,
    explanation:
      "Confidentiality obligations often apply broadly to how information can be used, not just whether it can be shared with third parties — repurposing it for an unrelated dispute can itself raise a separate breach issue.",
  },
  {
    id: "confidentiality-ip-06",
    topic: "Confidentiality & Intellectual Property",
    scenario:
      "The Contractor develops a novel construction technique while working on this project and wants to patent it, unsure whether the Employer has any claim to it.",
    options: [
      "Check the contract's IP provisions specifically — ownership of innovations developed during the works can be allocated either way depending on what's agreed",
      "Any innovation developed during a project automatically belongs entirely to whichever party physically invented it, regardless of contract terms",
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
      "Check whether pre-contract information sharing was covered by an implied or separate confidentiality obligation, or whether it's genuinely unprotected",
      "Information shared before a formal contract is signed is never subject to any confidentiality obligation",
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
      "This is a real gap worth fixing — confidentiality obligations should generally flow down to subcontractors who have access to the same sensitive information",
      "Confidentiality obligations in the main contract automatically bind subcontractors without needing to be separately included in the subcontract",
    ],
    correctIndex: 0,
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
      "Check the contract's change-in-law provisions — genuine post-contract legal changes are often treated as a compensable event distinct from an ordinary design change",
      "Any legal change, whenever it occurs, is automatically the Contractor's own risk to absorb",
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
      "The claim should be scaled to the actual impact — a change-in-law claim still needs to be substantiated against what genuinely changed, not treated as a blanket windfall",
      "Any change in law automatically entitles the Contractor to a major claim regardless of its actual scope of impact",
    ],
    correctIndex: 0,
    explanation:
      "Change-in-law relief is generally proportionate to actual impact, the same as any other compensable event — a minor legal change affecting a small part of the works doesn't automatically justify treating the whole claim as major.",
  },
  {
    id: "change-in-law-03",
    topic: "Change in Law",
    scenario:
      "A change in law was actually publicly announced and known well before the contract was signed, but the Contractor claims it as an unforeseen change-in-law event anyway.",
    options: [
      "Check the timing carefully — a change that was reasonably foreseeable or already known at contract signing generally wouldn't qualify as an unforeseen change-in-law event",
      "Any change in law that comes into legal force after signing qualifies for relief regardless of whether it was actually known about beforehand",
    ],
    correctIndex: 0,
    explanation:
      "The key distinction in most change-in-law clauses is genuine unforeseeability at the time of contracting, not simply the formal effective date — a change already publicly known and pricable at signing generally doesn't qualify.",
  },
  {
    id: "change-in-law-04",
    topic: "Change in Law",
    scenario:
      "A change in law reduces the scope or cost of compliance needed, for example relaxing a previous requirement, but the Contractor doesn't mention this and continues billing as if the old requirement still applied.",
    options: [
      "Change-in-law provisions typically work both ways — a cost-reducing change should also be reflected, not just cost-increasing ones",
      "Change-in-law relief only ever applies when costs increase, never when they decrease",
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
      "This is worth raising as a genuine change-in-law delay if the process itself is new or changed — substantiate the actual time impact of the new legal requirement",
      "Delays caused by permit or approval processes are never eligible for any kind of relief regardless of cause",
    ],
    correctIndex: 0,
    explanation:
      "If a new legal or regulatory requirement genuinely adds time to the process — a new permit step, a new approval body — that delay can be a legitimate consequence of the change in law, worth substantiating properly as such.",
  },
  {
    id: "change-in-law-06",
    topic: "Change in Law",
    scenario:
      "The parties disagree about whether a new local authority guideline, not a formal law or regulation, counts as a 'change in law' under the contract's specific definition.",
    options: [
      "Check the contract's actual defined scope of 'change in law' — some definitions are narrow (only binding legislation) while others are broader (including binding guidelines or codes)",
      "Any guidance from any authority, however informal, always automatically counts as a change in law",
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
      "This generally doesn't apply retroactively — a change-in-law claim would typically only affect work still to be done, not work already properly completed under the prior requirements",
      "Any change in law automatically applies retroactively to all project work regardless of when it was completed",
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
      "Check the clause carefully — some change-in-law provisions specifically exclude tax changes, which may be dealt with separately or left as the Contractor's own risk",
      "Tax law changes are always automatically covered by any general change-in-law clause",
    ],
    correctIndex: 0,
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
      "Follow the contract's tiered dispute resolution process in order — skipping required preliminary steps can be challenged and may delay or complicate the actual arbitration",
      "Any party can always go straight to arbitration or litigation regardless of what preliminary steps the contract requires",
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
      "Follow the contract's chosen dispute resolution forum — commencing proceedings in a different forum than agreed can be challenged and is often unsuccessful",
      "A party can always choose whatever forum is most convenient regardless of what the contract specifies",
    ],
    correctIndex: 0,
    explanation:
      "Arbitration clauses, and forum or jurisdiction clauses generally, are usually enforced according to what was actually agreed — courts frequently decline jurisdiction or stay proceedings where a valid arbitration agreement specifies a different forum.",
  },
  {
    id: "dispute-resolution-03",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "A party wants to introduce new evidence at arbitration that wasn't disclosed during the earlier mandatory mediation stage.",
    options: [
      "Check the arbitration's procedural rules on evidence — generally new evidence can be introduced at arbitration itself, but check for any specific restrictions this contract or tribunal imposes",
      "No new evidence can ever be introduced at arbitration if it wasn't first raised during mediation",
    ],
    correctIndex: 0,
    explanation:
      "Mediation and arbitration are generally distinct processes with different evidentiary rules — arbitration typically allows a fuller evidentiary process, though it's worth checking the specific rules governing this arbitration for any unusual restrictions.",
  },
  {
    id: "dispute-resolution-04",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "The losing party at arbitration wants to appeal the arbitrator's decision to a court purely because they disagree with the outcome.",
    options: [
      "Check the very limited grounds for challenging an arbitral award — awards are generally final and binding, with only narrow grounds like serious procedural irregularity for court intervention",
      "Any arbitration award can always be appealed to a court simply because a party disagrees with the result",
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
      "Follow the contractual sequence — bypassing a required Dispute Adjudication Board step can be a valid objection to the arbitration's jurisdiction at this stage",
      "Any intermediate dispute resolution step required by the contract can always be skipped if a party feels it would be faster to go straight to arbitration",
    ],
    correctIndex: 0,
    explanation:
      "The same principle as skipping mediation applies here — a required Dispute Adjudication Board (or similar) step is a genuine precondition in many contracts, and skipping it risks the whole arbitration being challenged as premature.",
  },
  {
    id: "dispute-resolution-06",
    topic: "Dispute Resolution (Arbitration/Litigation)",
    scenario:
      "The parties want to keep the dispute proceedings and outcome confidential, but haven't checked whether their chosen dispute resolution method actually supports that.",
    options: [
      "Check this specifically — arbitration is generally private and can be more readily kept confidential, while court litigation is typically a matter of public record",
      "Confidentiality of dispute proceedings is identical regardless of whether arbitration or litigation is used",
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
      "Follow what's actually specified in the contract — using different rules than what's agreed can create real questions about the validity of the whole process",
      "The parties can always informally agree to use different arbitration rules than the ones specified in the contract without any consequence",
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
      "This is generally more straightforward than enforcing a foreign court judgment, thanks to widely-adopted international arbitration enforcement treaties — but still worth confirming based on the specific countries involved",
      "Enforcing a foreign arbitration award is always exactly as difficult as enforcing a foreign court judgment, with no meaningful difference",
    ],
    correctIndex: 0,
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
      "Clearly disclose the trade-off before proceeding — a value engineering proposal that quietly lowers standards without flagging it isn't a fair or transparent proposal",
      "Any cost-saving proposal is automatically acceptable as long as it saves money, regardless of quality trade-offs",
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
      "Check what the contract or the specific VE proposal agreement says about how savings are shared — this varies and isn't automatically 100% to either party",
      "Value engineering savings always automatically belong entirely to whichever party proposed the change",
    ],
    correctIndex: 0,
    explanation:
      "How VE savings are shared between the parties is a specific commercial term, sometimes split, sometimes fully to one party, that should be clearly agreed as part of accepting the proposal — not defaulted to either extreme without agreement.",
  },
  {
    id: "value-engineering-03",
    topic: "Value Engineering",
    scenario:
      "The Contractor's value engineering proposal changes a specified material to a cheaper alternative without checking whether it still meets the underlying performance specification.",
    options: [
      "Verify the alternative genuinely meets the performance specification before proposing it — a cheaper substitute that doesn't actually perform equivalently isn't real value engineering",
      "Any cheaper alternative material is an acceptable value engineering proposal as long as it's cheaper",
    ],
    correctIndex: 0,
    explanation:
      "A valid value engineering proposal needs to still meet the actual performance requirements — proposing something cheaper that doesn't functionally perform the same job just shifts risk onto the Employer rather than creating genuine value.",
  },
  {
    id: "value-engineering-04",
    topic: "Value Engineering",
    scenario:
      "A value engineering change is implemented without formal instruction or variation documentation, based on a verbal agreement in a meeting.",
    options: [
      "Get it formally documented as a variation or instruction before implementing — an undocumented change, even if verbally agreed, creates real risk about what was actually approved",
      "Verbal agreement in a meeting is always sufficient to implement a value engineering change without further documentation",
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
      "Ask for the actual reason rather than assuming — value engineering proposals can be rejected for many reasons unrelated to the proposal's technical adequacy, such as aesthetic preference or risk appetite",
      "A rejected value engineering proposal always means the proposal itself was technically deficient",
    ],
    correctIndex: 0,
    explanation:
      "Employers might reject a perfectly sound VE proposal for reasons that have nothing to do with its technical merit — understanding the actual reason helps determine whether it's worth refining and resubmitting or genuinely a closed door.",
  },
  {
    id: "value-engineering-06",
    topic: "Value Engineering",
    scenario:
      "A value engineering change reduces upfront cost but increases the building's long-term operating or maintenance cost significantly.",
    options: [
      "Flag the whole-life cost impact clearly, not just the upfront saving — a proposal that shifts cost to the operational phase isn't automatically a net benefit to the Employer",
      "Only the upfront capital cost saving matters when evaluating a value engineering proposal",
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
      "Involve the original design consultant in reviewing the proposed change — bypassing the specialist who designed the system risks missing something the original design was specifically addressing",
      "Value engineering changes to a specialist-designed system never need input from the original designer",
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
      "Assess programme impact as part of evaluating any VE proposal — a change that saves cost but disrupts the programme isn't a straightforward win without weighing that trade-off too",
      "Programme impact is irrelevant to evaluating a value engineering proposal, which should be judged on cost alone",
    ],
    correctIndex: 0,
    explanation:
      "Cost isn't the only variable — a VE change that inadvertently delays the programme, or alternatively could also accelerate it, needs to be assessed as part of the overall picture, not evaluated purely on cost saving in isolation.",
  },
];
