// DFCE 2026 Quiz — Cybersecurity & Personal Data Protection question bank
// Each question: category, question text, 4 options, index of correct option, short explanation shown after answering.

const QUESTIONS = [
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
  }
];
