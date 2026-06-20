import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./build-a-website.css";

export const metadata = {
  title: "Build a Website with Claude · Docs · layout.page",
  description:
    "Set up a website project in Claude using layout.page sections, page layouts, and Design Systems.",
};

export default function BuildAWebsitePage() {
  return (
    <main className="bw-doc flex-1 min-w-0">
      <section className="lp-hero">
        <Link
          href="/docs"
          className="lbl hover:text-ink"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", width: "fit-content" }}
        >
          <ArrowLeft className="ico bico" size={16} strokeWidth={1.25} /> Docs
        </Link>
        <h1 className="ts-page-hero">Build a Website with Claude</h1>
        <div className="lp-hero-text">
          <p className="subhead">
            Set up a website project in Claude using layout.page sections, page layouts, and Design
            Systems.
          </p>
          <p className="lp-hero-support">
            Copy each prompt into Claude and build the site step by step — Next.js, GitHub, Vercel,
            and token-based styling.
          </p>
        </div>
      </section>

      <div className="grid lg:grid-cols-[1fr_220px] gap-12 px-10 py-10">
        {/* ARTICLE */}
        <article className="doc stack stack-5">
          <div className="stack stack-2">
            <p>The recommended setup is:</p>
            <ul>
              <li>
                <strong>Framework:</strong> Next.js
              </li>
              <li>
                <strong>Code hosting:</strong> GitHub
              </li>
              <li>
                <strong>Deployment:</strong> Vercel
              </li>
              <li>
                <strong>Styling:</strong> CSS variables + layout.page Design System tokens
              </li>
              <li>
                <strong>Sections:</strong> copied from layout.page
              </li>
              <li>
                <strong>Pages:</strong> assembled from reusable sections
              </li>
            </ul>
          </div>

          {/* Before you start */}
          <div id="before" className="stack stack-2">
            <h3>Before you start</h3>
            <p>
              This guide assumes you are building in <strong>Claude Code</strong> (or another tool
              with a persistent file system, like Cursor) — not the claude.ai chat window.
            </p>
            <p className="muted">
              The one-section-at-a-time workflow only works when Claude can see and edit the same
              project files across turns. In a plain chat window, files don&apos;t persist between
              messages and a multi-file Next.js app won&apos;t actually run, so you&apos;ll fight the
              tool the whole way.
            </p>
            <p>You&apos;ll need installed first:</p>
            <pre className="doc-code">{`- Node.js (LTS version)
- A code editor (VS Code or similar)
- A terminal
- A GitHub account
- A Vercel account`}</pre>
          </div>

          {/* Step 1 */}
          <div id="step1" className="stack stack-3">
            <h3>Step 1 — Start the website project</h3>
            <p>First, ask Claude to create the website foundation. Copy this into Claude:</p>
            <pre className="doc-code">{`I want to build a new website.

Please create a clean Next.js website project that can be deployed to Vercel and stored in GitHub.

Use this setup:
- Next.js
- App Router
- TypeScript
- Plain CSS or CSS Modules
- Global CSS variables
- Reusable components
- Responsive layout
- SEO-ready page metadata
- Clean folder structure

The site should be easy to edit and should support reusable page sections.

Please set up:
- global layout
- homepage route
- shared header component
- shared footer component
- global styles file
- design token file
- components folder
- sections folder
- basic README with setup instructions

Do not over-engineer it. Keep the code simple, readable, and easy to deploy on Vercel.`}</pre>
            <p>Recommended folder structure:</p>
            <pre className="doc-code">{`/app
  layout.tsx
  page.tsx
  globals.css

/components
  Header.tsx
  Footer.tsx
  Button.tsx
  Container.tsx

/sections
  Hero.tsx
  Features.tsx
  FAQ.tsx
  CTA.tsx

/styles
  tokens.css
  style-system.css

/lib
  site-config.ts`}</pre>
            <p>
              <strong>Get it running and under version control.</strong> As soon as the project is
              scaffolded, start a dev server and put the project in git — before you build anything,
              so every section gets eyeballed and committed.
            </p>
            <pre className="doc-code">{`Before we build anything else:

- Initialize a git repository and make an initial commit.
- Tell me the exact terminal commands to install dependencies and start the dev server.
- After each section we add from here on, remind me to commit.`}</pre>
            <p className="doc-note">
              The rule for the rest of this guide:{" "}
              <strong>
                build one section → look at it in the browser → commit → next section.
              </strong>{" "}
              Never build more than one section without looking at it.
            </p>
          </div>

          {/* Step 2 */}
          <div id="step2" className="stack stack-3">
            <h3>Step 2 — Define your site map</h3>
            <p>
              Before adding sections, tell Claude what pages the website needs. A simple landing page
              may only need one page; a larger marketing site may need several. Copy this into
              Claude:
            </p>
            <pre className="doc-code">{`Now help me define the website structure.

Here is the type of website I am building:

[Describe the business, product, or project here.]

Create a simple site map for this website.

Include:
- main pages
- page purpose
- recommended sections for each page
- primary CTA for each page
- SEO title and meta description for each page

Keep the structure focused and realistic for an MVP website.`}</pre>
            <p>Example output:</p>
            <pre className="doc-code">{`Home
- Hero
- Social proof
- Features
- Pricing
- FAQ
- CTA

About
- Page hero
- Story section
- Values
- CTA

Contact
- Contact intro
- Form
- FAQ`}</pre>
          </div>

          {/* Step 3 */}
          <div id="step3" className="stack stack-3">
            <h3>Step 3 — Add your Design System</h3>
            <p>
              A Design System controls the visual rules of the site: typography, spacing, colors,
              borders, radius, density, and component styling. Copy your selected layout.page Design
              System into Claude:
            </p>
            <pre className="doc-code">{`Now add this Design System to the project.

Use these tokens as the visual foundation for the site.

The site should use these variables for typography, spacing, borders, radius, buttons, backgrounds, and section rhythm.

Do not hardcode random colors, spacing, font sizes, or border radius values inside individual components. Use the tokens.

[Paste Design System CSS variables here.]`}</pre>
            <p>
              Then ask Claude to apply them globally and create reusable utility classes for section
              spacing, containers, grids, stacks, buttons, cards, labels, and text styles.
            </p>
          </div>

          {/* Step 4 */}
          <div id="step4" className="stack stack-3">
            <h3>Step 4 — Choose a page layout</h3>
            <p>
              A page layout is a full-page structure made from multiple sections. Copy this into
              Claude:
            </p>
            <pre className="doc-code">{`Now create the homepage using this page layout:

[Paste page layout from layout.page.]

Use the selected Design System.
Keep the structure the same.
Use placeholder copy for now.
Use placeholder media frames instead of final images.
Make every section responsive.`}</pre>
            <p className="muted">
              If you are not using a full page layout, choose sections one by one.
            </p>
          </div>

          {/* Step 5 */}
          <div id="step5" className="stack stack-3">
            <h3>Step 5 — Add sections one at a time</h3>
            <p>
              For best results, add one section at a time instead of pasting an entire website at
              once. Copy this into Claude:
            </p>
            <pre className="doc-code">{`Add this section to the homepage.

Section:
[Paste section name and code/instructions from layout.page.]

Requirements:
- Keep the section structure intact.
- Use the existing Design System tokens.
- Make it responsive.
- Use semantic HTML.
- Replace any placeholder classes with project-safe class names if needed.
- Do not introduce random one-off styles.
- Keep the code reusable.`}</pre>
            <p>
              <strong>Protect the Design System.</strong> An AI model will quietly paraphrase code —
              renaming classes, &quot;improving&quot; markup, hardcoding a colour — unless you forbid
              it. Append these constraints:
            </p>
            <pre className="doc-code">{`Important constraints for this section:

- Paste the section markup in as-is. Do not rename, restyle, or "improve" the structure or class names.
- Do not invent colours, spacing, font sizes, or border radius values. Use only the Design System tokens.
- If the section needs a value that isn't in the token set, STOP and ask me instead of hardcoding it.
- Your job is to wire the section into the page and fix imports only. Do not rewrite its internals.`}</pre>
            <p className="doc-note">
              If you catch Claude renaming a token or hardcoding a value, revert (you committed,
              right?) and re-run with these constraints restated.
            </p>
            <p>
              Recommended order: Header → Hero → Social Proof → Features → Content → Pricing/Offer →
              FAQ → CTA → Footer.
            </p>
          </div>

          {/* Step 6 */}
          <div id="step6" className="stack stack-3">
            <h3>Step 6 — Replace the copy</h3>
            <p>
              Once the structure works, replace placeholder copy with real content. Copy this into
              Claude:
            </p>
            <pre className="doc-code">{`Now help me replace the placeholder copy.

Here is the business context:

[Describe the business, audience, offer, tone, and goal.]

Please rewrite the copy for each section.

Keep the copy fitted to the layout:
- Hero headline: short and clear
- Hero body: 1–2 sentences
- CTA labels: 2–4 words
- Feature cards: short titles and concise descriptions
- FAQ answers: direct and helpful

Do not change the layout structure unless absolutely necessary.`}</pre>
          </div>

          {/* Step 7 */}
          <div id="step7" className="stack stack-3">
            <h3>Step 7 — Add assets</h3>
            <p>Use assets after the layout and copy are in place. Copy this into Claude:</p>
            <pre className="doc-code">{`Now help me add assets to the site.

Use the current layout structure and tell me where each asset should go.

Assets I have:
- Logo: [file/name]
- Product screenshots: [file/name]
- Photos: [file/name]
- Icons: [file/name]
- Brand graphics: [file/name]

Please:
- place assets in the right sections
- recommend image sizes/aspect ratios
- add alt text
- keep the page visually consistent
- do not overcrowd the layout

Use the Next.js <Image> component for all photos and screenshots, with correct
width/height and sensible sizes. Keep using token-based spacing around them.`}</pre>
            <p className="muted">
              If you don&apos;t have final assets yet, use neutral placeholders.
            </p>
          </div>

          {/* Step 7.5 */}
          <div id="step75" className="stack stack-3">
            <h3>Step 7.5 — The stuff everyone forgets</h3>
            <p>
              These items appear on the launch checklist but nothing earlier actually builds them.
              Copy this into Claude:
            </p>
            <pre className="doc-code">{`Before we review, set up the things that are easy to forget:

- Add a favicon and an apple-touch icon.
- Add Open Graph and Twitter card metadata, including a default OG image.
- Create a 404 page (not-found.tsx) that matches the site's Design System.
- Apply the per-page SEO title and meta description from the site map.
- If I want analytics, add Vercel Analytics (or leave a clean script slot for it).

Tell me which files you created or changed, and list anything I still need to provide
(for example, the OG image or a logo file).`}</pre>
          </div>

          {/* Step 7.6 */}
          <div id="step76" className="stack stack-3">
            <h3>Step 7.6 — Make the forms actually work</h3>
            <p>
              The checklist says &quot;Forms work,&quot; but a static Vercel site can&apos;t process
              a form without a handler. Copy this into Claude:
            </p>
            <pre className="doc-code">{`My contact form needs to actually send somewhere. I'm deploying a static site on Vercel.

Pick ONE option and implement it:
- a Next.js route handler / server action that emails or stores the submission, OR
- a third-party form endpoint (e.g. Formspree) wired to the existing form markup.

Requirements:
- Keep the form markup and styling from the layout.page section intact.
- Add basic validation and a visible success / error state.
- Tell me any accounts or environment variables I need to set up.`}</pre>
          </div>

          {/* Step 8 */}
          <div id="step8" className="stack stack-3">
            <h3>Step 8 — Review the site</h3>
            <p>Before launching, ask Claude to audit the website. Copy this into Claude:</p>
            <pre className="doc-code">{`Please review the full website before launch.

Check for:
- responsive layout issues
- inconsistent spacing
- inconsistent typography
- broken links
- missing alt text
- weak CTA labels
- unclear section hierarchy
- SEO title and meta description
- accessibility issues
- mobile readability
- unnecessary code or duplicate styles

Give me a prioritized fix list, then help me apply the fixes.`}</pre>
          </div>

          {/* Step 9 */}
          <div id="step9" className="stack stack-3">
            <h3>Step 9 — Prepare for GitHub and Vercel</h3>
            <p>Once the site is ready, ask Claude to prepare deployment. Copy this into Claude:</p>
            <pre className="doc-code">{`Now prepare this project for GitHub and Vercel deployment.

Please:
- confirm the project builds locally
- add or update README.md
- add .gitignore
- check package.json scripts
- make sure there are no unused files
- explain how to push this to GitHub
- explain how to deploy it on Vercel
- include any required environment variables if needed`}</pre>
            <p>
              Typical deployment flow: create a GitHub repo → push the project → connect the repo to
              Vercel → set framework to Next.js → deploy → add a custom domain → test the live site.
            </p>
          </div>

          {/* Step 10 */}
          <div id="step10" className="stack stack-3">
            <h3>Step 10 — Final launch checklist</h3>
            <pre className="doc-code">{`Homepage loads correctly
Mobile layout works
Navigation links work
CTA buttons work
Forms work
Images have alt text
Page title is set
Meta description is set
Favicon is added
Open Graph image is added
404 page exists
Analytics are installed if needed
Custom domain is connected
SSL is active`}</pre>
          </div>

          {/* Best workflow */}
          <div id="workflow" className="stack stack-3">
            <h3>Best workflow</h3>
            <p>
              The best Claude workflow is not &quot;build my whole website at once.&quot; The better
              loop folds in run → look → commit:
            </p>
            <pre className="doc-code">{`1. Set up the project, run the dev server, init git
2. Define the site map
3. Add the Design System (lock the tokens)
4. Build one page layout
5. Add sections one by one — look + commit after each
6. Replace copy
7. Add assets, the forgotten extras, and working forms
8. Review and deploy`}</pre>
            <p className="muted">
              This keeps the website cleaner, more consistent, and easier to edit.
            </p>
          </div>
        </article>

        {/* TOC */}
        <nav className="toc hidden lg:block" aria-label="On this page">
          <div className="lbl" style={{ marginBottom: "10px" }}>
            On this page
          </div>
          <a href="#before">Before you start</a>
          <a href="#step1">1 · Start the project</a>
          <a href="#step2">2 · Define the site map</a>
          <a href="#step3">3 · Add the Design System</a>
          <a href="#step4">4 · Choose a page layout</a>
          <a href="#step5">5 · Add sections one at a time</a>
          <a href="#step6">6 · Replace the copy</a>
          <a href="#step7">7 · Add assets</a>
          <a href="#step75">7.5 · The forgotten extras</a>
          <a href="#step76">7.6 · Working forms</a>
          <a href="#step8">8 · Review the site</a>
          <a href="#step9">9 · GitHub &amp; Vercel</a>
          <a href="#step10">10 · Launch checklist</a>
          <a href="#workflow">Best workflow</a>
        </nav>
      </div>
    </main>
  );
}
