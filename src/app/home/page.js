
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";

const sports = [
  // { name: "Football", emoji: "⚽" },
{ name: "Cricket", emoji: "🏏", href: "/cricket" },
{ name: "Volyball", emoji: "🏐", href: "/volyball" },
  { name: "Basketball", emoji: "🏀" },
  { name: "Badminton", emoji: "🏸" },
 { name: "Football", emoji: "⚽" },
  { name: "Kho-Kho", emoji: "🏃" },
];

const tabs = ["Sports", "Entertainment", "Community"];

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Sports");
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);

  return (
    <main className="min-h-screen bg-[#0d0e12] text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0d0e12]/95 backdrop-blur">
        <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          {/* Spacer keeps navigation centered */}
          <div className="w-10" />

          {/* Desktop navigation */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 sm:flex">
{tabs.map((tab) =>
  tab === "Community" ? (
    <Link
      key={tab}
      href="/community"
      className="rounded-lg px-5 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
    >
      {tab}
    </Link>
  ) : (
<button
  key={tab}
  onClick={() => {
    if (tab === "Entertainment") {
      router.push("/entertainment");
      return;
    }

    setActiveTab(tab);
    setSelectedSport(null);
  }}
  className={`rounded-lg px-5 py-2 text-sm transition ${
    activeTab === tab
      ? "bg-white text-black"
      : "text-gray-400 hover:bg-white/5 hover:text-white"
  }`}
>
  {tab}
</button>
  )
)}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-gray-200 hover:bg-white/10 sm:hidden"
          >
            <span className="block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          </button>

          {/* Larger settings icon */}
          <Link
  href="/settings"
  aria-label="Settings"
  title="Settings"
  className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-gray-200 transition hover:bg-white/10"
>
  <Settings size={25} strokeWidth={1.8} />
</Link>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="space-y-1 border-t border-white/10 p-3 sm:hidden">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedSport(null);
                  setMenuOpen(false);
                }}
                className={`block w-full rounded-lg px-4 py-3 text-left text-sm transition ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                setSettingsOpen(true);
              }}
              className="block w-full rounded-lg px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5"
            >
              Settings
            </button>
          </div>
        )}
      </header>

      {/* Settings placeholder */}
      {settingsOpen && (
        <div className="fixed inset-0 z-30 flex items-start justify-center bg-black/60 px-4 pt-24">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#17181e] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button
                onClick={() => setSettingsOpen(false)}
                aria-label="Close settings"
                className="rounded-lg px-3 py-1 text-xl text-gray-400 hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Profile settings, personal details, and account options will be
              added here next.
            </p>

            <button
              onClick={() => setSettingsOpen(false)}
              className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        {activeTab === "Sports" && (
          <>
            <div className="mb-8">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                Your campus, your game
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Explore sports
              </h1>

              <p className="mt-3 text-sm text-gray-400">
                Pick your game. Find your people.
              </p>
            </div>

            {/* 2 columns on mobile, 3 on desktop */}
            <div className="grid grid-cols-3 grid-rows-2 gap-4 md:gap-6">
              {sports.map((sport) => (
                <button
                  key={sport.name}
                  onClick={() => {
  if (sport.href) {
    router.push(sport.href);
  } else {
    setSelectedSport(sport.name);
  }
}}
                  className={`group min-h-36 rounded-2xl border p-4 text-left transition duration-200 sm:min-h-44 sm:p-6 ${
                    selectedSport === sport.name
                      ? "border-white/40 bg-white/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="mb-6 block text-3xl transition-transform duration-200 group-hover:scale-110 sm:text-4xl">
                    {sport.emoji}
                  </span>

                  <span className="block text-sm font-medium sm:text-base">
                    {sport.name}
                  </span>

                  <span className="mt-1 block text-xs text-gray-500">
                    Explore activities
                  </span>
                </button>
              ))}
            </div>

            {/* Selected sport placeholder */}
            {selectedSport && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{selectedSport}</p>
                    <p className="mt-2 text-sm text-gray-400">
                      You selected {selectedSport}. We'll build this section
                      next.
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedSport(null)}
                    className="shrink-0 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "Entertainment" && (
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
              Make a plan
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Entertainment
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              Movie plans, hangouts, and campus events.
            </p>
          </div>
        )}

        {activeTab === "Community" && (
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
              Campus conversations
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Community
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              Share ideas and connect with your campus.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}