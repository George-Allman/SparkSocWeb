import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { driveImage } from "../utils/drive";
import {
  FaChevronLeft,
  FaChevronRight,
  FaInstagram,
  FaMapMarkerAlt,
  FaRegCalendar,
} from "react-icons/fa";

// Published-to-web CSV of your Events tab. Columns (row 1, exact, case-sensitive):
// date | title | imageUrl | location | link
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQraEJ5hM1reN8NsvH6CzBxTZQlFHvANx_m5Wn0fWdsV3fLg-TExEW3fSxcHPiXcSftnOr-Q34sG-bk/pub?gid=1304207908&single=true&output=csv";

// Static category cards — edit text/images here. Put images in /public/events/
const CATEGORIES = [
  {
    title: "Academic",
    description:
      "Study sessions, exam prep and tutoring to help you get the most out of your degree.",
    image: "/Academic.png",
  },
  {
    title: "Professional",
    description:
      "Industry nights, site visits and networking with engineers and employers.",
    image: "/Professional.png",
  },
  {
    title: "Social",
    description:
      "BBQs, trivia nights and hangouts to meet your fellow engineering students.",
    image: "/Social.png",
  },
];

// must match the gap-6 on the carousel track (1.5rem = 24px)
const GAP_PX = 24;

interface EventItem {
  date?: string;
  title: string;
  imageUrl: string;
  location: string;
  link?: string;
}

function CategoryCard({
  title,
  description,
  image,
}: (typeof CATEGORIES)[number]) {
  return (
    <div className="bg-bg-tertiary rounded-3xl border border-white/15 shadow-sm overflow-hidden text-left">
      <img
        src={image}
        alt={title}
        className="w-full h-44 object-cover border-b border-white/15"
      />
      <div className="p-6">
        <h3 className="text-xl text-text-h mb-2">{title}</h3>
        <p className="text-text text-sm font-medium">{description}</p>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: EventItem }) {
  return (
    // 1 card on mobile, 2 on small screens, 3 (filling the full width) on large
    <div className="snap-start shrink-0 flex basis-full sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]">
      <div className="flex-1 flex flex-col bg-bg-tertiary rounded-3xl border border-white/15 shadow-sm overflow-hidden text-left">
        <img
          src={driveImage(event.imageUrl)}
          alt={event.title}
          draggable={false}
          className="w-full h-44 object-cover"
        />
        <div className="flex flex-col flex-1 p-5">
          {event.date && (
            <p className="flex items-center gap-2 text-accent text-sm mb-2">
              <FaRegCalendar className="shrink-0" />
              {event.date}
            </p>
          )}
          <h3 className="text-xl text-text-h mb-2">{event.title}</h3>
          <p className="flex items-center gap-2 text-text text-sm">
            <FaMapMarkerAlt className="shrink-0" />
            {event.location}
          </p>

          {event.link && (
            <div className="mt-auto pt-5">
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="flex items-center justify-center gap-2 w-full text-sm text-text-h border border-white/30 rounded-lg py-2 transition-colors duration-200 hover:bg-white hover:text-bg">
                <FaInstagram className="w-4 h-4" />
                View event
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EventsCarousel() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csv) => {
        const { data } = Papa.parse<EventItem>(csv, {
          header: true,
          skipEmptyLines: true,
        });
        setEvents(data.filter((row) => row.title));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // distance of one card + gap, read from the DOM so it tracks the responsive width
  const getStep = () => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + GAP_PX : 0;
  };

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * getStep(), behavior: "smooth" });
  };

  // Touch swiping is native (overflow-x + scroll-snap). Mouse needs drag handling.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current!;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
    };
    // snap fights manual dragging, so switch it off until release
    track.style.scrollSnapType = "none";
    track.style.scrollBehavior = "auto";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    trackRef.current!.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const track = trackRef.current!;
    track.style.scrollSnapType = "";
    track.style.scrollBehavior = "";
    const step = getStep();
    if (step) {
      track.scrollTo({
        left: Math.round(track.scrollLeft / step) * step,
        behavior: "smooth",
      });
    }
  };

  // don't fire the "View event" link if the mouse was dragged
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 5) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = 0;
    }
  };

  if (loading) return <p className="text-text mt-6">Loading events…</p>;
  if (error || events.length === 0)
    return (
      <p className="text-text mt-6">
        No upcoming events right now — check back soon.
      </p>
    );

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {events.map((event, i) => (
          <EventCard key={`${event.title}-${i}`} event={event} />
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        {[
          { dir: -1 as const, Icon: FaChevronLeft, label: "Previous events" },
          { dir: 1 as const, Icon: FaChevronRight, label: "Next events" },
        ].map(({ dir, Icon, label }) => (
          <button
            key={label}
            onClick={() => scroll(dir)}
            aria-label={label}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-text-h hover:bg-bg-tertiary active:scale-105 transition-colors cursor-pointer">
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function EventsSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((c) => (
          <CategoryCard key={c.title} {...c} />
        ))}
      </div>

      <div className="w-full border-b-1 mt-10">
        <div className="text-text text-2xl text-left">Upcoming Events</div>
      </div>
      <div className="mt-6">
        <EventsCarousel />
      </div>
    </div>
  );
}
