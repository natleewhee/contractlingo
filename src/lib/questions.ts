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
];
