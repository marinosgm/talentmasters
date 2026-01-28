import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TalentMasters",
  description:
    "Privacy Policy for TalentMasters recruitment services, website usage, and candidate applications.",
};

const LAST_UPDATED = "January 28, 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-black text-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-24">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.55)]" />
            PRIVACY
          </div>

          <h1 className="mt-6 text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-4 text-white/60 max-w-3xl">
            This Privacy Policy explains how TalentMasters collects, uses, and
            protects personal data in connection with our recruitment services,
            candidate applications, and website.
          </p>

          <p className="mt-4 text-sm text-white/50">
            Last updated: <span className="text-white/70">{LAST_UPDATED}</span>
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10">
          <PolicyCard title="1) Who we are (Data Controller)">
            <p className="text-white/70 leading-relaxed">
              TalentMasters (“we”, “us”, “our”) is the data controller for the
              personal data described in this Privacy Policy.
            </p>

            <div className="mt-4 space-y-2 text-white/70 leading-relaxed">
              <p>
                <span className="text-white/90 font-medium">Legal entity:</span>{" "}
                [TalentMasters Legal Entity Name]
              </p>
              <p>
                <span className="text-white/90 font-medium">Address:</span>{" "}
                [Company Address]
              </p>
              <p>
                <span className="text-white/90 font-medium">Email:</span>{" "}
                <a
                  href="mailto:privacy@talentmasters.co"
                  className="text-orange-400 hover:text-orange-300 underline underline-offset-4"
                >
                  privacy@talentmasters.co
                </a>{" "}
                (replace with your real email)
              </p>
              <p>
                <span className="text-white/90 font-medium">Phone:</span>{" "}
                [Company Phone]
              </p>
              <p className="text-sm text-white/50">
                If you have appointed a Data Protection Officer (DPO), include
                their contact details here: [DPO Email / Address].
              </p>
            </div>
          </PolicyCard>

          <PolicyCard title="2) What personal data we collect">
            <p className="text-white/70 leading-relaxed">
              Depending on how you interact with us, we may collect:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-white/70 leading-relaxed">
              <li>
                <span className="text-white/90 font-medium">
                  Identification & contact:
                </span>{" "}
                name, email, phone number, location, and communication
                preferences.
              </li>
              <li>
                <span className="text-white/90 font-medium">
                  Recruitment & employment details:
                </span>{" "}
                CV/resume, cover letter, work history, education, skills,
                portfolio links, salary expectations, notice period, right-to-work
                status (where applicable), and interview notes.
              </li>
              <li>
                <span className="text-white/90 font-medium">
                  Communications:
                </span>{" "}
                emails/messages with you, call notes, and feedback you provide.
              </li>
              <li>
                <span className="text-white/90 font-medium">
                  Website & technical:
                </span>{" "}
                IP address, device/browser information, pages viewed, and
                cookies/analytics identifiers (see “Cookies” below).
              </li>
            </ul>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-white/80 font-medium">Special category data</p>
              <p className="mt-2 text-white/70 leading-relaxed">
                In some cases, you may voluntarily provide information that could
                be considered “special category” data (e.g., disability-related
                accommodations). We do not ask for it unless necessary, and we
                handle it with extra care and an appropriate legal basis/condition.
              </p>
            </div>
          </PolicyCard>

          <PolicyCard title="3) How we collect your data">
            <ul className="list-disc pl-6 space-y-2 text-white/70 leading-relaxed">
              <li>When you submit an application or enquiry through our forms.</li>
              <li>When you email us, message us, or speak with us.</li>
              <li>
                From publicly available professional sources (e.g., LinkedIn) where
                legally permitted and relevant to recruitment.
              </li>
              <li>
                From third parties such as referees or previous employers (only where
                appropriate and typically with your knowledge/consent).
              </li>
              <li>Automatically via cookies/analytics when you use our website.</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="4) Why we use your data (purposes)">
            <ul className="list-disc pl-6 space-y-2 text-white/70 leading-relaxed">
              <li>To respond to enquiries and provide recruitment services.</li>
              <li>To assess suitability for roles and match candidates to opportunities.</li>
              <li>To schedule interviews and manage the recruitment process.</li>
              <li>
                To share candidate profiles with client companies (with your instruction
                or agreement, depending on the engagement).
              </li>
              <li>To improve our website, security, and service quality.</li>
              <li>To comply with legal obligations (where applicable).</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="5) Lawful bases for processing (GDPR)">
            <p className="text-white/70 leading-relaxed">
              We rely on one or more lawful bases under GDPR depending on the context,
              including:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-white/70 leading-relaxed">
              <li>
                <span className="text-white/90 font-medium">Legitimate interests:</span>{" "}
                operating our recruitment business, communicating with candidates/clients,
                improving services, and protecting our business from fraud and abuse.
              </li>
              <li>
                <span className="text-white/90 font-medium">Contract / steps to contract:</span>{" "}
                processing necessary to provide recruitment services or take steps you request.
              </li>
              <li>
                <span className="text-white/90 font-medium">Consent:</span>{" "}
                where we ask (e.g., optional marketing, certain talent pool retention, or special
                category data in limited scenarios). You can withdraw consent at any time.
              </li>
              <li>
                <span className="text-white/90 font-medium">Legal obligation:</span>{" "}
                where we must comply with applicable laws.
              </li>
            </ul>
          </PolicyCard>

          <PolicyCard title="6) Who we share data with">
            <p className="text-white/70 leading-relaxed">
              We may share personal data with:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-white/70 leading-relaxed">
              <li>
                <span className="text-white/90 font-medium">Client companies</span>{" "}
                where you are being considered for a role (typically with your knowledge/approval).
              </li>
              <li>
                <span className="text-white/90 font-medium">Service providers</span>{" "}
                who help us run our business (e.g., hosting, email delivery, CRM/ATS, analytics),
                acting as processors under contract.
              </li>
              <li>
                <span className="text-white/90 font-medium">Professional advisers</span>{" "}
                (lawyers, accountants) where necessary.
              </li>
              <li>
                <span className="text-white/90 font-medium">Authorities</span>{" "}
                where required by law.
              </li>
            </ul>

            <p className="mt-4 text-white/70 leading-relaxed">
              We do not sell personal data.
            </p>
          </PolicyCard>

          <PolicyCard title="7) International transfers">
            <p className="text-white/70 leading-relaxed">
              If we transfer personal data outside the European Economic Area (EEA),
              we will use appropriate safeguards (such as adequacy decisions or
              Standard Contractual Clauses) where required.
            </p>
          </PolicyCard>

          <PolicyCard title="8) Data retention">
            <p className="text-white/70 leading-relaxed">
              We keep personal data only as long as necessary for the purposes described above.
              Typical retention periods:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-white/70 leading-relaxed">
              <li>
                <span className="text-white/90 font-medium">Active recruitment:</span>{" "}
                for the duration of the process and a reasonable period afterward to manage
                follow-ups and defend legal claims.
              </li>
              <li>
                <span className="text-white/90 font-medium">Talent pool:</span>{" "}
                typically up to <span className="text-white/90 font-medium">12 months</span>{" "}
                (or longer if you ask us to keep your profile and/or where lawful).
              </li>
              <li>
                <span className="text-white/90 font-medium">Website logs/security:</span>{" "}
                kept for a limited period for troubleshooting and security monitoring.
              </li>
            </ul>
          </PolicyCard>

          <PolicyCard title="9) Your rights">
            <p className="text-white/70 leading-relaxed">
              Subject to certain conditions, you may have the right to:
            </p>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-white/70 leading-relaxed">
              <li>Access your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion (erasure) in certain cases</li>
              <li>Restrict processing in certain cases</li>
              <li>Object to processing (including to direct marketing)</li>
              <li>Data portability (where applicable)</li>
              <li>Withdraw consent (where processing is based on consent)</li>
            </ul>

            <p className="mt-4 text-white/70 leading-relaxed">
              To exercise your rights, contact:{" "}
              <a
                href="mailto:privacy@talentmasters.co"
                className="text-orange-400 hover:text-orange-300 underline underline-offset-4"
              >
                privacy@talentmasters.co
              </a>
              .
            </p>
          </PolicyCard>

          <PolicyCard title="10) Cookies & analytics">
            <p className="text-white/70 leading-relaxed">
              We may use cookies and similar technologies to ensure the website works,
              improve performance, and understand usage (analytics). You can control cookies
              through your browser settings and (where implemented) cookie banners/preferences.
            </p>
            <p className="mt-3 text-white/60 text-sm">
              If you use marketing/analytics cookies, ensure you have an appropriate cookie notice
              and consent mechanism where required.
            </p>
          </PolicyCard>

          <PolicyCard title="11) Security">
            <p className="text-white/70 leading-relaxed">
              We use reasonable technical and organizational measures designed to protect personal
              data (e.g., access controls, secure hosting, encryption in transit where supported).
              No method of transmission or storage is 100% secure.
            </p>
          </PolicyCard>

          <PolicyCard title="12) Complaints">
            <p className="text-white/70 leading-relaxed">
              If you have concerns, please contact us first so we can try to resolve them. You also
              have the right to lodge a complaint with your local supervisory authority.
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-white/80 font-medium">
                Cyprus supervisory authority (if applicable)
              </p>
              <p className="mt-2 text-white/70 leading-relaxed">
                Office of the Commissioner for Personal Data Protection (Cyprus)
              </p>
              {/* Optional: Replace with your preferred link or remove */}
              <p className="mt-2 text-white/70 leading-relaxed">
                Website:{" "}
                <span className="text-white/80">
                  dataprotection.gov.cy
                </span>
              </p>
            </div>
          </PolicyCard>

          <PolicyCard title="13) Changes to this policy">
            <p className="text-white/70 leading-relaxed">
              We may update this Privacy Policy from time to time. The “Last updated” date at the
              top indicates when it was most recently revised.
            </p>
          </PolicyCard>

          <div className="pt-6">
            <a
              href="https://wa.me/35797678927?text=Hi%20I%27d%20like%20to%20request%20a%20conversation"
  target="_blank"
  rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(249,115,22,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              Contact us
            </a>
       
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-neutral-950/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
      <div className="p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-medium">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
