// DFCE 2026 Quiz — Cybersecurity & Personal Data Protection question bank
// A larger pool than any single quiz needs: script.js draws a random 10 from
// this list each attempt, so repeat plays don't see the same set of questions.
// Weighted towards Personal Data Protection / Brunei's PDPO, with a smaller
// set of general cybersecurity questions rounding it out.

const QUESTIONS = [
  // ---------------- Personal Data Protection / PDPO ----------------
  {
    category: "Personal Data Protection",
    q: "What does \"PDPO\" stand for, the law governing personal data handling in Brunei Darussalam?",
    options: [
      "Personal Data Protection Order",
      "Public Data Privacy Ordinance",
      "Personal Device Protection Office",
      "Private Data Processing Order"
    ],
    answer: 0,
    explanation: "The Personal Data Protection Order (PDPO) sets out how organisations in Brunei must collect, use, and safeguard personal data."
  },
  {
    category: "Personal Data Protection",
    q: "Which authority organises DFCE and oversees Brunei's infocommunications technology industry, including data protection matters?",
    options: [
      "AITI (Authority for Infocommunications Technology Industry)",
      "MOFAT",
      "Ministry of Health",
      "Bank Negara"
    ],
    answer: 0,
    explanation: "AITI (Authority for Infocommunications Technology Industry of Brunei Darussalam) organises DFCE and regulates the ICT sector."
  },
  {
    category: "Personal Data Protection",
    q: "Under good data protection practice, before collecting someone's personal data an organisation should generally first obtain their...",
    options: [
      "Consent",
      "Bank details",
      "Social media password",
      "Signature on a blank form"
    ],
    answer: 0,
    explanation: "Consent is a core principle: individuals should know and agree to how their personal data will be collected, used, or disclosed."
  },
  {
    category: "Personal Data Protection",
    q: "\"Data minimisation\" means an organisation should only collect personal data that is...",
    options: [
      "Necessary for the stated purpose",
      "As much as technically possible",
      "Shared publicly for transparency",
      "Kept forever, just in case"
    ],
    answer: 0,
    explanation: "Data minimisation limits collection and retention to what is actually needed for the purpose, reducing risk if a breach occurs."
  },
  {
    category: "Personal Data Protection",
    q: "If an organisation suspects a personal data breach (e.g. a leaked customer database), what should it do?",
    options: [
      "Assess and report it promptly through proper internal/regulatory channels",
      "Ignore it if no one has complained yet",
      "Quietly delete the logs",
      "Wait a few months to see if it matters"
    ],
    answer: 0,
    explanation: "Timely assessment and reporting of data breaches helps limit harm to affected individuals and is a hallmark of responsible data governance."
  },
  {
    category: "Personal Data Protection",
    q: "The \"purpose limitation\" principle in data protection means personal data collected for one purpose should...",
    options: [
      "Not be used for an unrelated purpose without fresh consent or legal basis",
      "Be sold to any interested third party",
      "Be used for absolutely anything the organisation wants",
      "Be duplicated across every department automatically"
    ],
    answer: 0,
    explanation: "Purpose limitation means data collected for a stated reason shouldn't quietly be repurposed for something the individual never agreed to."
  },
  {
    category: "Personal Data Protection",
    q: "Under most personal data protection frameworks (including PDPO-style regimes), individuals generally have the right to...",
    options: [
      "Request access to and correction of their own personal data",
      "Demand a copy of everyone else's personal data too",
      "Force an organisation to publish its internal data",
      "Prevent any organisation from ever operating"
    ],
    answer: 0,
    explanation: "Individual rights typically include being able to find out what data is held about you and request corrections if it's inaccurate."
  },
  {
    category: "Personal Data Protection",
    q: "What is a \"Data Protection Officer\" (DPO) generally responsible for within an organisation?",
    options: [
      "Overseeing compliance with data protection obligations",
      "Managing the company's marketing budget",
      "Designing the company logo",
      "Approving employee annual leave"
    ],
    answer: 0,
    explanation: "A DPO is typically the person or role accountable for an organisation's data protection compliance and handling data-related queries or complaints."
  },
  {
    category: "Personal Data Protection",
    q: "\"Retention limitation\" means personal data should be...",
    options: [
      "Kept only as long as necessary, then securely disposed of",
      "Stored permanently on every server as backup",
      "Printed out and archived in a public library",
      "Retained forever in case it becomes useful someday"
    ],
    answer: 0,
    explanation: "Keeping data longer than needed increases risk without benefit — good practice is to securely delete or anonymise it once its purpose is served."
  },
  {
    category: "Personal Data Protection",
    q: "Before sharing a customer's personal data with a third-party vendor, an organisation should generally...",
    options: [
      "Ensure there is a proper legal basis (e.g. consent) and adequate safeguards",
      "Just forward the spreadsheet by email, no questions asked",
      "Post it on social media for transparency",
      "Assume the vendor will figure out what to do with it"
    ],
    answer: 0,
    explanation: "Disclosure to third parties should be grounded in consent or another valid basis, with contractual or technical safeguards in place."
  },
  {
    category: "Personal Data Protection",
    q: "The \"accountability\" principle in data protection means an organisation should be able to...",
    options: [
      "Demonstrate how it complies with its data protection obligations",
      "Blame employees for any data mishandling",
      "Avoid ever explaining its data practices",
      "Outsource all responsibility to customers"
    ],
    answer: 0,
    explanation: "Accountability means having policies, records, and safeguards in place — and being able to show regulators or customers that compliance isn't just a claim."
  },
  {
    category: "Personal Data Protection",
    q: "Which of these is considered \"personal data\" under typical data protection definitions?",
    options: [
      "A person's full name combined with their phone number",
      "The average rainfall in a country",
      "A company's public stock price",
      "The number of seats in a stadium"
    ],
    answer: 0,
    explanation: "Personal data is information that can identify a specific individual — names, contact details, ID numbers, and similar identifiers all qualify."
  },
  {
    category: "Personal Data Protection",
    q: "Why might an organisation choose to anonymise or pseudonymise personal data before analysis?",
    options: [
      "To reduce privacy risk while still being able to use the data",
      "To make the data load faster on old computers",
      "Because anonymised data looks more colourful in reports",
      "Because it's required for printing"
    ],
    answer: 0,
    explanation: "Anonymisation/pseudonymisation reduces the ability to link data back to an individual, lowering the impact if the data is exposed."
  },
  {
    category: "Personal Data Protection",
    q: "An individual who gave consent for their data to be used for marketing should generally also be able to...",
    options: [
      "Withdraw that consent later",
      "Never be allowed to change their mind",
      "Only withdraw consent by suing the company",
      "Withdraw consent only if they pay a fee"
    ],
    answer: 0,
    explanation: "Consent should be freely withdrawable — individuals aren't permanently locked into an earlier decision."
  },
  {
    category: "Personal Data Protection",
    q: "Which of these best describes \"security safeguards\" under data protection obligations?",
    options: [
      "Reasonable technical and organisational measures to protect personal data",
      "Hiring one extra security guard for the building",
      "Buying insurance instead of preventing breaches",
      "Publishing the data so everyone can watch over it themselves"
    ],
    answer: 0,
    explanation: "Organisations are generally expected to put in place reasonable measures — like access controls and encryption — appropriate to the sensitivity of the data."
  },
  {
    category: "Personal Data Protection",
    q: "As digital services grow in Brunei, why does DFCE 2026 highlight Personal Data Protection as a key focus area?",
    options: [
      "Because trust in how data is handled underpins safe digital transformation",
      "Because it has nothing to do with digital services",
      "Because only banks need to worry about personal data",
      "Because it was randomly picked with no relevance"
    ],
    answer: 0,
    explanation: "As more services go digital, protecting personal data responsibly is core to building public trust in Brunei's digital transformation."
  },
  {
    category: "Personal Data Protection",
    q: "If a customer asks a company what personal data it holds about them, a good-practice response is to...",
    options: [
      "Have a clear process to verify their identity and respond appropriately",
      "Refuse to respond under any circumstances",
      "Give the data to whoever asks, no verification needed",
      "Charge an excessive, arbitrary fee to discourage the request"
    ],
    answer: 0,
    explanation: "Organisations should have a defined, reasonable process for handling individual access requests while verifying the requester's identity."
  },

  // ---------------- Cybersecurity ----------------
  {
    category: "Cybersecurity",
    q: "What is \"phishing\"?",
    options: [
      "A scam that tricks people into revealing sensitive info via fake emails/messages",
      "A method of encrypting files",
      "A type of firewall",
      "A way to speed up Wi-Fi"
    ],
    answer: 0,
    explanation: "Phishing uses deceptive emails, texts, or websites impersonating trusted sources to trick victims into revealing credentials or data."
  },
  {
    category: "Cybersecurity",
    q: "Which of these best strengthens your online account security beyond just a password?",
    options: [
      "Multi-Factor Authentication (MFA)",
      "Using the same password everywhere",
      "Writing your password on a sticky note",
      "Sharing your password with coworkers"
    ],
    answer: 0,
    explanation: "MFA adds a second verification step (like an OTP or authenticator app), making it much harder for attackers to break in even if they know your password."
  },
  {
    category: "Cybersecurity",
    q: "What is \"social engineering\" in a cybersecurity context?",
    options: [
      "Manipulating people psychologically into giving up confidential information",
      "Designing user-friendly software",
      "Engineering social media algorithms",
      "A type of network cable"
    ],
    answer: 0,
    explanation: "Social engineering exploits trust and human psychology (e.g. impersonating IT support) rather than technical flaws to gain access."
  },
  {
    category: "Cybersecurity",
    q: "When using public Wi-Fi (e.g. at a conference or cafe), which is the safest practice?",
    options: [
      "Avoid logging into sensitive accounts, or use a VPN",
      "Log into your online banking freely",
      "Turn off your device's screen lock",
      "Share the Wi-Fi password with strangers"
    ],
    answer: 0,
    explanation: "Public networks can be insecure or monitored; avoiding sensitive logins or using a VPN reduces the risk of data interception."
  },
  {
    category: "Cybersecurity",
    q: "What is \"malware\"?",
    options: [
      "Malicious software designed to damage, disrupt, or gain unauthorised access to systems",
      "A malfunctioning hardware component",
      "A type of encrypted backup",
      "An approved government app"
    ],
    answer: 0,
    explanation: "Malware is an umbrella term for viruses, ransomware, spyware, and other software built to harm or exploit systems and data."
  },
  {
    category: "Cybersecurity",
    q: "Why is it important to keep your software and apps updated?",
    options: [
      "Updates often patch security vulnerabilities attackers could exploit",
      "Updates always make apps slower on purpose",
      "It's only about getting new icons and colours",
      "Old software is automatically more secure"
    ],
    answer: 0,
    explanation: "Software updates frequently fix known security flaws — delaying them leaves systems exposed to attacks that specifically target those gaps."
  },
  {
    category: "Cybersecurity",
    q: "Locking your laptop or phone screen when you step away is an example of...",
    options: [
      "Basic physical/device security hygiene",
      "An unnecessary inconvenience with no benefit",
      "A way to save battery only",
      "A legal requirement with no security purpose"
    ],
    answer: 0,
    explanation: "Screen locks prevent someone from walking up to an unattended device and accessing accounts, files, or personal data directly."
  }
];
