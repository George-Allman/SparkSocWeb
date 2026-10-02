import { useRef } from "react";
import NavLinks from "./Components/navbutton";
import gridSvg from "./assets/grid.svg";
import componentsSvg from "./assets/components.svg";
import Logo from "./assets/Logo-CircleOutlined-Transparent.svg";
import UnderlineHeader from "./Components/underlineHeader";
import TeamSection from "./Components/teamSection";
import SponsorsSection from "./Components/sponsorsSection";
import Footer from "./Components/footer";
import EventsSection from "./Components/eventSection";
import SocialSection from "./Components/socialSection";

// grid.svg / components.svg share the same 1600x900 viewBox (16x9 cells @ 100px).
// Fixed to the sheet's real pixel dimensions so cells stay true size, and
// repeated in both directions across ONE continuous element spanning the
// whole page's content height — not per-section — so there's no seam and no
// restart point.
const tiledLayerStyle = {
  backgroundSize: "1600px 900px",
  backgroundRepeat: "repeat",
  backgroundPosition: "top left",
} as const;

function App() {
  // one wrapper spans hero -> contact; mouse position is tracked relative to
  // ITS top, so it stays correct across scroll and doesn't reset at section
  // boundaries.
  const contentRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = contentRef.current!.getBoundingClientRect();
    contentRef.current!.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    contentRef.current!.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const onMouseLeave = () => {
    contentRef.current!.style.setProperty("--mx", "-9999px");
    contentRef.current!.style.setProperty("--my", "-9999px");
  };

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0">
        <div
          id="navbar"
          className="w-full fixed top-0 left-0 z-10 flex justify-between items-center px-[15vw] backdrop-blur-2xl py-3 border-b border-white/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_160%_at_50%_50%,rgba(250,204,21,0.08),transparent_75%)]"
          />
          <div className="flex flex-row">
            <div className="flex flex-row justify-center">
              <img
                className="h-13"
                src="public\Logo-CircleOutlined-Yellow.png"></img>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <NavLinks></NavLinks>
          </div>

          <a
            href="https://clubs.usu.edu.au/SparkSoc/club_signup"
            target="_blank"
            className="cursor-pointer relative flex gap-12 text-lg px-9 pb-2 pt-1.5 text-text-h border-1 duration-200 border-white/30 rounded-lg transition-colors hover:bg-white hover:text-bg">
            Join Us
          </a>
        </div>

        {/* one continuous relative wrapper for hero -> contact, height = sum
            of its children, so the absolute layers below span the whole thing */}
        <div
          ref={contentRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative w-full bg-bg"
          style={{ ["--mx" as any]: "-9999px", ["--my" as any]: "-9999px" }}>
          {/* accent glow, only near the very top */}
          <div
            className="pointer-events-none absolute top-0 inset-x-0 h-[420px]"
            style={{
              background:
                "radial-gradient(ellipse 1600px 500px at 50% -30%, var(--color-accent, theme(colors.accent)) 0%, transparent 70%)",
              opacity: 0.2,
            }}
          />

          {/* always-visible grid, one continuous layer for the whole page */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `url(${gridSvg})`,
              ...tiledLayerStyle,
              opacity: 0.05,
            }}
          />

          {/* components, revealed only near the cursor — single mask, whole page */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `url(${componentsSvg})`,
              ...tiledLayerStyle,
              opacity: 0.15,
              WebkitMaskImage:
                "radial-gradient(circle 180px at var(--mx) var(--my), black 0%, transparent 100%)",
              maskImage:
                "radial-gradient(circle 180px at var(--mx) var(--my), black 0%, transparent 100%)",
            }}
          />

          {/* HERO */}
          <div
            id="home"
            className="relative w-full h-[100vh] flex items-center justify-center text-center px-4">
            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold text-text tracking-wide uppercase mb-10">
                The University of Sydney Electrical Engineering Society
              </p>
              <div className="text-[5.5vw] font-weight-900 text-text-h mb-6 mt-14">
                SparkSoc
              </div>
              <div className="flex mt-20 items-center justify-center gap-4">
                <a
                  href="#about"
                  className="text-[1.2vw] px-6 py-3 rounded-lg border border-white/10 bg-bg text-text-h font-semibold hover:bg-code-bg hover:-translate-y-0.5 transition-transform">
                  About
                </a>
                <a
                  href="#events"
                  className="text-[1.2vw] px-6 py-3 rounded-lg border border-white/10 bg-bg text-text-h font-semibold hover:bg-code-bg hover:-translate-y-0.5 transition-transform">
                  Events
                </a>
                <a
                  href="#sponsors"
                  className="text-[1.2vw] px-6 py-3 rounded-lg border border-white/10 bg-bg text-text-h font-semibold hover:bg-code-bg hover:-translate-y-0.5 transition-all">
                  Sponsors
                </a>
                <a
                  href="#contact"
                  className="text-[1.2vw] px-6 py-3 rounded-lg border border-white/10 bg-bg text-text-h font-semibold hover:bg-code-bg hover:-translate-y-0.5 transition-transform">
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div
            id="about"
            className="relative w-full flex items-center justify-center text-center px-4 scroll-mt-16">
            <div className="relative bg-bg-secondary w-full mx-[15vw] border-1 border-white/10 rounded-4xl p-15">
              <div className="text-text-h text-4xl">About Us</div>
              <div className="text-lg text-text-h text-left font-normal mt-6">
                The University of Sydney Electrical Engineering Society
                (SparkSoc) is a not-for-profit student organisation. We hold
                social events, support students academically and connect
                students with employers.
              </div>
              <div className="w-full border-b-1 mt-10">
                <div className="text-text text-2xl text-left">
                  2026 Executive Team
                </div>
              </div>
              <TeamSection></TeamSection>

              <div className="w-full border-b-1 mt-10">
                <div className="text-text text-2xl text-left">Our Mission</div>
              </div>
              <div className="w-full border-b-1 mt-10">
                <div className="text-text text-2xl text-left">Our Members</div>
              </div>
              <SocialSection></SocialSection>
            </div>
          </div>
          <div className="h-50"></div>

          {/* EVENTS */}
          <div
            id="events"
            className="relative w-full flex items-center justify-center text-center px-4 scroll-mt-16">
            <div className="relative min-w-0 bg-bg-secondary w-full mx-[15vw] border-1 border-white/10 rounded-4xl p-15">
              <div className="text-text-h text-4xl mb-10">Events</div>
              <EventsSection></EventsSection>
            </div>
          </div>

          <div className="h-50"></div>

          {/* SPONSORS */}
          <div
            id="sponsors"
            className="relative w-full flex items-center justify-center text-center px-4 scroll-mt-16">
            <div className="relative bg-bg-secondary w-full mx-[15vw] border-1 border-white/10 rounded-4xl p-15">
              <div className="text-text-h text-4xl">Sponsors</div>
              <SponsorsSection></SponsorsSection>
              <div className="w-full border-b-1 mt-10">
                <div className="text-text text-2xl text-left">
                  Our sponsorship methodology
                </div>
              </div>
              <div className="text-lg text-text-h text-left font-normal mt-2">
                SparkSoc believes
              </div>
            </div>
          </div>

          <div className="h-50"></div>
        </div>
        <div id="contact">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;
