"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Swords,
  MessageCircle,
  Trophy,
  Activity,
  Plus,
  Search,
  MapPin,
  CalendarDays,
  Clock,
  Trash2,
  Send,
  X,
  Check,
  UserPlus,
  Volleyball,
  ChevronDown,
  Filter,
  CheckCircle2,
} from "lucide-react";

const CURRENT_USER = {
  id: "player-1",
  name: "Aditya",
};

const POSITION_OPTIONS = ["Attacker", "Defender", "Libero"];

const INITIAL_PLAYERS = [
  {
    id: "player-1",
    name: "A",
    year: 3,
    department: "Computer Science",
    positions: ["Attacker", "Defender"],
    bio: "Looking for regular campus games.",
    available: true,
  },
  {
    id: "player-2",
    name: "Riya Sharma",
    year: 2,
    department: "Electronics",
    positions: ["Libero", "Defender"],
    bio: "Good at reception and back-row defence.",
    available: true,
  },
  {
    id: "player-3",
    name: "Arjun Singh",
    year: 4,
    department: "Mechanical",
    positions: ["Attacker"],
    bio: "Outside hitter. Available on weekends.",
    available: true,
  },
  {
    id: "player-4",
    name: "Neha Verma",
    year: 3,
    department: "Computer Science",
    positions: ["Defender", "Libero"],
    bio: "Enjoys competitive matches.",
    available: false,
  },
  {
    id: "player-5",
    name: "Karan Das",
    year: 4,
    department: "Civil",
    positions: ["Attacker", "Defender"],
    bio: "Experienced player, open to tournaments.",
    available: true,
  },
  {
    id: "player-6",
    name: "Priya Roy",
    year: 2,
    department: "Electrical",
    positions: ["Libero"],
    bio: "Looking for a consistent team.",
    available: true,
  },
  {
    id: "player-7",
    name: "Dev Kumar",
    year: 3,
    department: "Information Technology",
    positions: ["Attacker", "Defender"],
    bio: "Can play multiple positions.",
    available: true,
  },
];

const INITIAL_CHALLENGES = [
  {
    id: "challenge-1",
    title: "Evening 6v6 Match",
    date: "2026-10-14",
    time: "17:00",
    location: "Main Campus Court",
    level: "Intermediate",
    playersNeeded: 3,
    creatorId: "player-2",
    creatorName: "Riya Sharma",
    acceptedBy: [],
  },
  {
    id: "challenge-2",
    title: "Friendly Practice Game",
    date: "2026-10-15",
    time: "16:30",
    location: "Sports Complex",
    level: "Beginner friendly",
    playersNeeded: 4,
    creatorId: "player-3",
    creatorName: "Arjun Singh",
    acceptedBy: ["player-1"],
  },
];

const INITIAL_REQUESTS = [
  {
    id: "request-1",
    title: "Need a Libero",
    description: "Our team needs a libero for Friday's practice.",
    positions: ["Libero"],
    playersNeeded: 1,
    creatorId: "player-4",
    creatorName: "Neha Verma",
    interestedBy: [],
  },
  {
    id: "request-2",
    title: "Looking for attackers",
    description: "Building a team for an upcoming interdepartment match.",
    positions: ["Attacker"],
    playersNeeded: 2,
    creatorId: "player-5",
    creatorName: "Karan Das",
    interestedBy: ["player-1"],
  },
];

const INITIAL_POSTS = [
  {
    id: "post-1",
    authorId: "player-2",
    authorName: "Riya Sharma",
    content: "Anyone up for practice tomorrow evening at the main court?",
    createdAt: "Today",
  },
  {
    id: "post-2",
    authorId: "player-3",
    authorName: "Arjun Singh",
    content:
      "Looking for players interested in a weekend friendly tournament.",
    createdAt: "Today",
  },
];

const INITIAL_TOURNAMENTS = [
  {
    id: "tournament-1",
    name: "Campus Volleyball Cup",
    date: "2026-10-24",
    location: "University Sports Ground",
    format: "6v6",
    eligibility: "3rd and 4th year students only",
    creatorId: "player-5",
    creatorName: "Karan Das",
    participants: ["player-1"],
  },
  {
    id: "tournament-2",
    name: "Interdepartment Championship",
    date: "2026-11-02",
    location: "Indoor Sports Hall",
    format: "6v6",
    eligibility: "3rd and 4th year students only",
    creatorId: "player-3",
    creatorName: "Arjun Singh",
    participants: [],
  },
];

const TABS = [
  { label: "My Activity", icon: Activity },
  { label: "Players", icon: Users },
  { label: "Challenges & Requests", icon: Swords },
  { label: "Community", icon: MessageCircle },
  { label: "Tournaments", icon: Trophy },
];

const INPUT_CLASS =
  "w-full rounded-lg border border-slate-700 bg-[#111722] px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-900";

const PRIMARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40";

const SECONDARY_BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-[#111722] px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-[#0b0f17]";

function getChallengeStartTime(challenge) {
  if (!challenge?.date || !challenge?.time) return null;
  const start = new Date(`${challenge.date}T${challenge.time}:00`);
  return Number.isNaN(start.getTime()) ? null : start;
}

function isChallengeExpired(challenge, now) {
  if (!Number.isFinite(now) || now <= 0) {
    return false;
  }

  const start = getChallengeStartTime(challenge);

  if (!start) return false;

  return now >= start.getTime() + 24 * 60 * 60 * 1000;
}

function isFutureDateTime(date, time, now = Date.now()) {
  if (!date || !time) return false;
  const start = new Date(`${date}T${time}:00`);
  return !Number.isNaN(start.getTime()) && start.getTime() > now;
}

function isFutureDate(date, now = Date.now()) {
  if (!date) return false;
  const selected = new Date(`${date}T23:59:59`);
  return !Number.isNaN(selected.getTime()) && selected.getTime() >= now;
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatDate(date) {
  if (!date) return "Date not set";

  return new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Avatar({ name, size = "md" }) {
  const dimensions = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-slate-700 font-semibold text-slate-100 ${dimensions[size]}`}
    >
      {name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()}
    </div>
  );
}

function SectionTitle({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-700 bg-[#111722] px-5 py-10 text-center">
      <Volleyball size={23} className="mx-auto text-slate-500" />
      <p className="mt-3 text-sm text-slate-500">{message}</p>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-slate-800 bg-[#111722] p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-100">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      {children}
    </label>
  );
}

export default function VolleyballPage() {
  const [activeTab, setActiveTab] = useState("My Activity");

  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [now, setNow] = useState(0);
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [tournaments, setTournaments] = useState(INITIAL_TOURNAMENTS);

  // Challenges remain visible until 24 hours after their scheduled start.
  // Expired challenges are removed from the active list; no match history is stored.
  useEffect(() => {
    const removeExpiredChallenges = () => {
      setChallenges((previous) => {
        const active = previous.filter((challenge) => !isChallengeExpired(challenge));
        return active.length === previous.length ? previous : active;
      });
    };
    

    removeExpiredChallenges();
    const intervalId = setInterval(removeExpiredChallenges, 30_000);
    return () => clearInterval(intervalId);
  }, 
  []);

  const [playerSearch, setPlayerSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [challengeFilter, setChallengeFilter] = useState("All");

  const [postText, setPostText] = useState("");
  const [modal, setModal] = useState(null);
  const [showProfileEditor, setShowProfileEditor] = useState(false);

  const [challengeForm, setChallengeForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    level: "Intermediate",
    playersNeeded: "3",
  });

  const [requestForm, setRequestForm] = useState({
    title: "",
    description: "",
    positions: ["Attacker"],
    playersNeeded: "1",
  });

  const [tournamentForm, setTournamentForm] = useState({
    name: "",
    date: "",
    location: "",
    format: "6v6",
  });

  const [profileForm, setProfileForm] = useState({
    year: "3",
    department: "Computer Science",
    positions: ["Attacker", "Defender"],
    bio: "Looking for regular campus games.",
    available: true,
  });

  const currentPlayer =
    players.find((player) => player.id === CURRENT_USER.id) || players[0];

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch = `${player.name} ${player.department}`
        .toLowerCase()
        .includes(playerSearch.toLowerCase());

      const matchesPosition =
        positionFilter === "All" ||
        player.positions.includes(positionFilter);

      const matchesYear =
        yearFilter === "All" || String(player.year) === yearFilter;

      return matchesSearch && matchesPosition && matchesYear;
    });
  }, [players, playerSearch, positionFilter, yearFilter]);

  const activeChallenges = challenges.filter((challenge) => !isChallengeExpired(challenge));

  const myChallenges = activeChallenges.filter(
    (challenge) => challenge.creatorId === CURRENT_USER.id
  );

  const myAcceptedChallenges = activeChallenges.filter((challenge) =>
    challenge.acceptedBy.includes(CURRENT_USER.id)
  );

  const myRequests = requests.filter(
    (request) => request.creatorId === CURRENT_USER.id
  );

  const myInterests = requests.filter((request) =>
    request.interestedBy.includes(CURRENT_USER.id)
  );

  const myTournaments = tournaments.filter(
    (tournament) =>
      tournament.creatorId === CURRENT_USER.id ||
      tournament.participants.includes(CURRENT_USER.id)
  );

  const myPosts = posts.filter(
    (post) => post.authorId === CURRENT_USER.id
  );

  function togglePosition(position, selected, setter) {
    setter(
      selected.includes(position)
        ? selected.filter((item) => item !== position)
        : [...selected, position]
    );
  }

  function createChallenge(event) {
    event.preventDefault();

    if (!isFutureDateTime(challengeForm.date, challengeForm.time)) {
      alert("Please select a future date and time for your challenge.");
      return;
    }

    const newChallenge = {
      id: createId(),
      title: challengeForm.title.trim(),
      date: challengeForm.date,
      time: challengeForm.time,
      location: challengeForm.location.trim(),
      level: challengeForm.level,
      playersNeeded: Number(challengeForm.playersNeeded),
      creatorId: CURRENT_USER.id,
      creatorName: CURRENT_USER.name,
      acceptedBy: [],
    };

    setChallenges((previous) => [newChallenge, ...previous]);

    setChallengeForm({
      title: "",
      date: "",
      time: "",
      location: "",
      level: "Intermediate",
      playersNeeded: "3",
    });

    setModal(null);
    setActiveTab("Challenges & Requests");
  }

  function createRequest(event) {
    event.preventDefault();

    if (requestForm.positions.length === 0) return;

    const newRequest = {
      id: createId(),
      title: requestForm.title.trim(),
      description: requestForm.description.trim(),
      positions: requestForm.positions,
      playersNeeded: Number(requestForm.playersNeeded),
      creatorId: CURRENT_USER.id,
      creatorName: CURRENT_USER.name,
      interestedBy: [],
    };

    setRequests((previous) => [newRequest, ...previous]);

    setRequestForm({
      title: "",
      description: "",
      positions: ["Attacker"],
      playersNeeded: "1",
    });

    setModal(null);
    setActiveTab("Challenges & Requests");
  }

  function createTournament(event) {
    event.preventDefault();

    if (currentPlayer.year < 3) return;
    if (!isFutureDate(tournamentForm.date)) {
      alert("Please select today or a future date for the tournament.");
      return;
    }

    const newTournament = {
      id: createId(),
      name: tournamentForm.name.trim(),
      date: tournamentForm.date,
      location: tournamentForm.location.trim(),
      format: tournamentForm.format,
      eligibility: "3rd and 4th year students only",
      creatorId: CURRENT_USER.id,
      creatorName: CURRENT_USER.name,
      participants: [],
    };

    setTournaments((previous) => [newTournament, ...previous]);

    setTournamentForm({
      name: "",
      date: "",
      location: "",
      format: "6v6",
    });

    setModal(null);
    setActiveTab("Tournaments");
  }

  function createPost(event) {
    event.preventDefault();

    const content = postText.trim();
    if (!content) return;

    const newPost = {
      id: createId(),
      authorId: CURRENT_USER.id,
      authorName: CURRENT_USER.name,
      content,
      createdAt: "Just now",
    };

    setPosts((previous) => [newPost, ...previous]);
    setPostText("");
  }

  function deletePost(postId) {
    setPosts((previous) =>
      previous.filter(
        (post) =>
          post.id !== postId || post.authorId !== CURRENT_USER.id
      )
    );
  }

  function deleteChallenge(challengeId) {
    setChallenges((previous) =>
      previous.filter(
        (challenge) =>
          challenge.id !== challengeId ||
          challenge.creatorId !== CURRENT_USER.id
      )
    );
  }

  function deleteRequest(requestId) {
    setRequests((previous) =>
      previous.filter(
        (request) =>
          request.id !== requestId ||
          request.creatorId !== CURRENT_USER.id
      )
    );
  }

  function deleteTournament(tournamentId) {
    setTournaments((previous) =>
      previous.filter(
        (tournament) =>
          tournament.id !== tournamentId ||
          tournament.creatorId !== CURRENT_USER.id
      )
    );
  }

  function toggleChallengeJoin(challengeId) {
    const targetChallenge = challenges.find((challenge) => challenge.id === challengeId);
    if (!targetChallenge || isChallengeExpired(targetChallenge)) return;

    setChallenges((previous) =>
      previous.map((challenge) => {
        if (challenge.id !== challengeId) return challenge;

        const accepted = challenge.acceptedBy.includes(CURRENT_USER.id);

        return {
          ...challenge,
          acceptedBy: accepted
            ? challenge.acceptedBy.filter((id) => id !== CURRENT_USER.id)
            : [...challenge.acceptedBy, CURRENT_USER.id],
        };
      })
    );
  }

  function toggleRequestInterest(requestId) {
    setRequests((previous) =>
      previous.map((request) => {
        if (request.id !== requestId) return request;

        const interested = request.interestedBy.includes(CURRENT_USER.id);

        return {
          ...request,
          interestedBy: interested
            ? request.interestedBy.filter((id) => id !== CURRENT_USER.id)
            : [...request.interestedBy, CURRENT_USER.id],
        };
      })
    );
  }

  function toggleTournamentJoin(tournamentId) {
    if (currentPlayer.year < 3) return;

    setTournaments((previous) =>
      previous.map((tournament) => {
        if (tournament.id !== tournamentId) return tournament;

        const joined = tournament.participants.includes(CURRENT_USER.id);

        return {
          ...tournament,
          participants: joined
            ? tournament.participants.filter((id) => id !== CURRENT_USER.id)
            : [...tournament.participants, CURRENT_USER.id],
        };
      })
    );
  }

  function saveProfile(event) {
    event.preventDefault();

    if (profileForm.positions.length === 0) return;

    setPlayers((previous) =>
      previous.map((player) =>
        player.id === CURRENT_USER.id
          ? {
              ...player,
              // Name, academic year, and branch are backend-owned fields.
              // Only editable profile preferences are updated here.
              positions: profileForm.positions,
              bio: profileForm.bio.trim(),
              available: profileForm.available,
            }
          : player
      )
    );

    setShowProfileEditor(false);
  }

  function openProfileEditor() {
    setProfileForm({
      positions: [...currentPlayer.positions],
      bio: currentPlayer.bio,
      available: currentPlayer.available,
    });

    setShowProfileEditor(true);
  }

  return (
    <main className="min-h-screen bg-[#0b0f17] text-slate-100">
      {/* Minimal header */}
      <header className="border-b border-slate-800 bg-[#111722]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Volleyball size={21} className="text-slate-100" />
            <span className="text-sm font-bold tracking-tight text-slate-100">
              Sports / Volleyball
            </span>
          </div>

          <button
            type="button"
            onClick={openProfileEditor}
            className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 transition hover:bg-[#0b0f17]"
          >
            <Avatar name={CURRENT_USER.name} size="sm" />
            <span className="text-sm font-medium">{CURRENT_USER.name}</span>
            <ChevronDown size={15} className="text-slate-500" />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        {/* Main navigation row; My Activity is the landing page */}
        <nav className="mb-8 flex gap-1 overflow-x-auto rounded-xl border border-slate-800 bg-[#111722] p-1.5">
          {TABS.map(({ label, icon: Icon }) => {
            const active = activeTab === label;

            return (
              <button
                type="button"
                key={label}
                onClick={() => setActiveTab(label)}
                className={`flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition sm:flex-1 sm:px-4 ${
                  active
                    ? "bg-cyan-500 text-white"
                    : "text-slate-500 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* MY ACTIVITY */}
        {activeTab === "My Activity" && (
          <section>
            <SectionTitle
              title="My Activity"
              description="Your challenges, requests, posts and tournaments."
              action={
                <button
                  type="button"
                  className={PRIMARY_BUTTON}
                  onClick={() => setModal("challenge")}
                >
                  <Plus size={16} />
                  Create challenge
                </button>
              }
            />

            <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                {
                  label: "My challenges",
                  count: myChallenges.length,
                  icon: Swords,
                },
                {
                  label: "Accepted challenges",
                  count: myAcceptedChallenges.length,
                  icon: CheckCircle2,
                },
                {
                  label: "Player requests",
                  count: myRequests.length,
                  icon: UserPlus,
                },
                {
                  label: "My tournaments",
                  count: myTournaments.length,
                  icon: Trophy,
                },
              ].map(({ label, count, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-800 bg-[#111722] p-4"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
                    <Icon size={18} className="text-slate-300" />
                  </div>
                  <p className="text-2xl font-bold text-slate-100">{count}</p>
                  <p className="mt-1 text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-[#111722] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-bold">Challenges I created</h2>
                  <button
                    type="button"
                    className={SECONDARY_BUTTON}
                    onClick={() => setActiveTab("Challenges & Requests")}
                  >
                    View all
                  </button>
                </div>

                {myChallenges.length === 0 ? (
                  <EmptyState message="You haven't created any challenges." />
                ) : (
                  <div className="space-y-3">
                    {myChallenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className="rounded-lg border border-slate-800 p-3.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold">{challenge.title}</h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {formatDate(challenge.date)} · {challenge.time}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {challenge.acceptedBy.length} joined
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteChallenge(challenge.id)}
                            aria-label="Delete challenge"
                            className="rounded-lg p-2 text-slate-500 hover:bg-red-950/40 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {challenge.acceptedBy.length > 0 && (
                          <p className="mt-3 text-xs text-slate-500">
                            Accepted by:{" "}
                            {challenge.acceptedBy
                              .map(
                                (id) =>
                                  players.find((player) => player.id === id)
                                    ?.name || "Player"
                              )
                              .join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#111722] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-bold">Player requests I created</h2>
                  <button
                    type="button"
                    className={SECONDARY_BUTTON}
                    onClick={() => setModal("request")}
                  >
                    <Plus size={15} />
                    Create
                  </button>
                </div>

                {myRequests.length === 0 ? (
                  <EmptyState message="You haven't created any player requests." />
                ) : (
                  <div className="space-y-3">
                    {myRequests.map((request) => (
                      <div
                        key={request.id}
                        className="rounded-lg border border-slate-800 p-3.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold">{request.title}</h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {request.positions.join(", ")}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {request.interestedBy.length} interested
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteRequest(request.id)}
                            aria-label="Delete request"
                            className="rounded-lg p-2 text-slate-500 hover:bg-red-950/40 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {request.interestedBy.length > 0 && (
                          <p className="mt-3 text-xs text-slate-500">
                            Interested:{" "}
                            {request.interestedBy
                              .map(
                                (id) =>
                                  players.find((player) => player.id === id)
                                    ?.name || "Player"
                              )
                              .join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#111722] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-bold">Challenges I joined</h2>
                  <button
                    type="button"
                    className={SECONDARY_BUTTON}
                    onClick={() => setActiveTab("Challenges & Requests")}
                  >
                    Browse
                  </button>
                </div>

                {myAcceptedChallenges.length === 0 ? (
                  <EmptyState message="You haven't joined any challenges." />
                ) : (
                  <div className="space-y-3">
                    {myAcceptedChallenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className="rounded-lg border border-slate-800 p-3.5"
                      >
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {challenge.creatorName} ·{" "}
                          {formatDate(challenge.date)}
                        </p>
                        <button
                          type="button"
                          onClick={() => toggleChallengeJoin(challenge.id)}
                          className="mt-3 text-sm font-medium text-slate-500 hover:text-red-600"
                        >
                          Leave challenge
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#111722] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-bold">My community posts</h2>
                  <button
                    type="button"
                    className={SECONDARY_BUTTON}
                    onClick={() => setActiveTab("Community")}
                  >
                    Open community
                  </button>
                </div>

                {myPosts.length === 0 ? (
                  <EmptyState message="You haven't posted in the community." />
                ) : (
                  <div className="space-y-3">
                    {myPosts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-start justify-between gap-3 rounded-lg border border-slate-800 p-3.5"
                      >
                        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                          {post.content}
                        </p>
                        <button
                          type="button"
                          onClick={() => deletePost(post.id)}
                          aria-label="Delete post"
                          className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-red-950/40 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-800 bg-[#111722] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-bold">My tournaments</h2>
                <button
                  type="button"
                  className={SECONDARY_BUTTON}
                  onClick={() => setActiveTab("Tournaments")}
                >
                  View tournaments
                </button>
              </div>

              {myTournaments.length === 0 ? (
                <EmptyState message="You haven't joined or created a tournament." />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {myTournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      className="rounded-lg border border-slate-800 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">{tournament.name}</h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {formatDate(tournament.date)} · {tournament.format}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {tournament.creatorId === CURRENT_USER.id
                              ? "Created by you"
                              : "Joined"}
                          </p>
                        </div>

                        {tournament.creatorId === CURRENT_USER.id && (
                          <button
                            type="button"
                            onClick={() => deleteTournament(tournament.id)}
                            aria-label="Delete tournament"
                            className="rounded-lg p-2 text-slate-500 hover:bg-red-950/40 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 rounded-xl border border-slate-800 bg-[#111722] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={currentPlayer.name} />
                  <div>
                    <h2 className="font-bold">{currentPlayer.name}</h2>
                    <p className="text-sm text-slate-500">
                      Year {currentPlayer.year} · {currentPlayer.department}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {currentPlayer.positions.join(", ")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openProfileEditor}
                  className={SECONDARY_BUTTON}
                >
                  Edit profile
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PLAYERS */}
        {activeTab === "Players" && (
          <section>
            <SectionTitle
              title="Players"
              description="Find players by name, year and position."
            />

            <div className="mb-5 grid gap-3 rounded-xl border border-slate-800 bg-[#111722] p-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative sm:col-span-2 lg:col-span-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  value={playerSearch}
                  onChange={(event) => setPlayerSearch(event.target.value)}
                  placeholder="Search players"
                  className={`${INPUT_CLASS} pl-9`}
                />
              </div>

              <select
                value={positionFilter}
                onChange={(event) => setPositionFilter(event.target.value)}
                className={INPUT_CLASS}
                aria-label="Filter by position"
              >
                <option value="All">All positions</option>
                {POSITION_OPTIONS.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>

              <select
                value={yearFilter}
                onChange={(event) => setYearFilter(event.target.value)}
                className={INPUT_CLASS}
                aria-label="Filter by year"
              >
                <option value="All">All years</option>
                {[1, 2, 3, 4].map((year) => (
                  <option key={year} value={String(year)}>
                    Year {year}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Filter size={16} />
                {filteredPlayers.length} players
              </div>
            </div>

            {filteredPlayers.length === 0 ? (
              <EmptyState message="No players match these filters." />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="group rounded-xl border border-slate-800 bg-[#111722] p-5 transition hover:border-slate-400"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar name={player.name} size="lg" />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="truncate font-bold">{player.name}</h2>
                          {player.id === CURRENT_USER.id && (
                            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                              YOU
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                          Year {player.year} · {player.department}
                        </p>

                        <div className="mt-2 flex items-center gap-1.5">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              player.available ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                          />
                          <span className="text-xs text-slate-500">
                            {player.available
                              ? "Available to play"
                              : "Unavailable"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 min-h-10 text-sm leading-5 text-slate-500">
                      {player.bio || "No bio added."}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {player.positions.map((position) => (
                        <span
                          key={position}
                          className="rounded-md border border-slate-800 bg-[#0b0f17] px-2 py-1 text-xs font-medium text-slate-300"
                        >
                          {position}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 border-t border-slate-800 pt-3">
                      {player.id === CURRENT_USER.id ? (
                        <button
                          type="button"
                          className={SECONDARY_BUTTON}
                          onClick={openProfileEditor}
                        >
                          Edit your profile
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={SECONDARY_BUTTON}
                          onClick={() =>
                            setActiveTab("Challenges & Requests")
                          }
                        >
                          <UserPlus size={15} />
                          Find games together
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CHALLENGES AND REQUESTS */}
        {activeTab === "Challenges & Requests" && (
          <section>
            <SectionTitle
              title="Challenges & Requests"
              description="Create matches, join games and find players for your team."
              action={
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setModal("request")}
                    className={SECONDARY_BUTTON}
                  >
                    <UserPlus size={15} />
                    Request players
                  </button>
                  <button
                    type="button"
                    onClick={() => setModal("challenge")}
                    className={PRIMARY_BUTTON}
                  >
                    <Plus size={16} />
                    Create challenge
                  </button>
                </div>
              }
            />

            <div className="mb-5 flex flex-wrap gap-2">
              {["All", "Challenges", "Requests"].map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setChallengeFilter(filter)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    challengeFilter === filter
                      ? "bg-cyan-500 text-white"
                      : "border border-slate-800 bg-[#111722] text-slate-500 hover:bg-slate-800"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {(challengeFilter === "All" ||
              challengeFilter === "Challenges") && (
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-bold">Open challenges</h2>

                {activeChallenges.length === 0 ? (
                  <EmptyState message="No challenges yet. Create one to get started." />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {activeChallenges.map((challenge) => {
                      const joined = challenge.acceptedBy.includes(
                        CURRENT_USER.id
                      );
                      const isOwner =
                        challenge.creatorId === CURRENT_USER.id;

                      return (
                        <article
                          key={challenge.id}
                          className="rounded-xl border border-slate-800 bg-[#111722] p-5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-base font-bold">
                                {challenge.title}
                              </h3>
                              <p className="mt-1 text-sm text-slate-500">
                                Posted by {challenge.creatorName}
                              </p>
                            </div>

                            <span className="rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300">
                              {challenge.level}
                            </span>
                          </div>

                          <div className="mt-4 space-y-2.5 text-sm text-slate-500">
                            <p className="flex items-center gap-2">
                              <CalendarDays size={16} />
                              {formatDate(challenge.date)}
                            </p>
                            <p className="flex items-center gap-2">
                              <Clock size={16} />
                              {challenge.time}
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin size={16} />
                              {challenge.location}
                            </p>
                            <p className="flex items-center gap-2">
                              <Users size={16} />
                              {challenge.acceptedBy.length} joined ·{" "}
                              {challenge.playersNeeded} players needed
                            </p>
                          </div>

                          {challenge.acceptedBy.length > 0 && (
                            <p className="mt-3 text-xs text-slate-500">
                              Accepted by:{" "}
                              {challenge.acceptedBy
                                .map(
                                  (id) =>
                                    players.find((player) => player.id === id)
                                      ?.name || "Player"
                                )
                                .join(", ")}
                            </p>
                          )}

                          <div className="mt-5 flex gap-2 border-t border-slate-800 pt-4">
                            {!isOwner && (
                              <button
                                type="button"
                                onClick={() =>
                                  toggleChallengeJoin(challenge.id)
                                }
                                className={
                                  joined ? SECONDARY_BUTTON : PRIMARY_BUTTON
                                }
                              >
                                {joined ? (
                                  <>
                                    <Check size={15} />
                                    Joined · Leave
                                  </>
                                ) : (
                                  <>
                                    <Check size={15} />
                                    Join challenge
                                  </>
                                )}
                              </button>
                            )}

                            {isOwner && (
                              <button
                                type="button"
                                onClick={() => deleteChallenge(challenge.id)}
                                className={SECONDARY_BUTTON}
                              >
                                <Trash2 size={15} />
                                Delete
                              </button>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {(challengeFilter === "All" ||
              challengeFilter === "Requests") && (
              <div>
                <h2 className="mb-4 text-lg font-bold">Player requests</h2>

                {requests.length === 0 ? (
                  <EmptyState message="No player requests yet." />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {requests.map((request) => {
                      const interested = request.interestedBy.includes(
                        CURRENT_USER.id
                      );
                      const isOwner =
                        request.creatorId === CURRENT_USER.id;

                      return (
                        <article
                          key={request.id}
                          className="rounded-xl border border-slate-800 bg-[#111722] p-5"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-bold">{request.title}</h3>
                              <p className="mt-1 text-sm text-slate-500">
                                Posted by {request.creatorName}
                              </p>
                            </div>
                            <UserPlus
                              size={19}
                              className="shrink-0 text-slate-500"
                            />
                          </div>

                          <p className="mt-4 text-sm leading-6 text-slate-500">
                            {request.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {request.positions.map((position) => (
                              <span
                                key={position}
                                className="rounded-md border border-slate-800 bg-[#0b0f17] px-2 py-1 text-xs font-medium"
                              >
                                {position}
                              </span>
                            ))}
                          </div>

                          <p className="mt-3 text-sm text-slate-500">
                            {request.interestedBy.length} interested ·{" "}
                            {request.playersNeeded} needed
                          </p>

                          {request.interestedBy.length > 0 && (
                            <p className="mt-2 text-xs text-slate-500">
                              Interested players:{" "}
                              {request.interestedBy
                                .map(
                                  (id) =>
                                    players.find((player) => player.id === id)
                                      ?.name || "Player"
                                )
                                .join(", ")}
                            </p>
                          )}

                          <div className="mt-5 border-t border-slate-800 pt-4">
                            {isOwner ? (
                              <button
                                type="button"
                                onClick={() => deleteRequest(request.id)}
                                className={SECONDARY_BUTTON}
                              >
                                <Trash2 size={15} />
                                Delete request
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  toggleRequestInterest(request.id)
                                }
                                className={
                                  interested
                                    ? SECONDARY_BUTTON
                                    : PRIMARY_BUTTON
                                }
                              >
                                {interested ? (
                                  <>
                                    <Check size={15} />
                                    Interested · Undo
                                  </>
                                ) : (
                                  <>
                                    <UserPlus size={15} />
                                    I'm interested
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* COMMUNITY */}
        {activeTab === "Community" && (
          <section>
            <SectionTitle
              title="Community"
              description="Share updates and coordinate with other volleyball players."
            />

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <form
                  onSubmit={createPost}
                  className="mb-5 rounded-xl border border-slate-800 bg-[#111722] p-4"
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={CURRENT_USER.name} />
                    <textarea
                      value={postText}
                      onChange={(event) => setPostText(event.target.value)}
                      placeholder="Write a community post..."
                      rows={3}
                      maxLength={1000}
                      className={`${INPUT_CLASS} resize-y`}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">
                      {postText.length}/1000
                    </span>
                    <button
                      type="submit"
                      disabled={!postText.trim()}
                      className={PRIMARY_BUTTON}
                    >
                      <Send size={15} />
                      Publish
                    </button>
                  </div>
                </form>

                {posts.length === 0 ? (
                  <EmptyState message="No community posts yet. Start the conversation." />
                ) : (
                  <div className="space-y-3">
                    {posts.map((post) => {
                      const ownPost = post.authorId === CURRENT_USER.id;

                      return (
                        <article
                          key={post.id}
                          className="rounded-xl border border-slate-800 bg-[#111722] p-4"
                        >
                          <div className="flex items-start gap-3">
                            <Avatar name={post.authorName} />

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <h3 className="text-sm font-semibold text-slate-100">
                                    {post.authorName}
                                    {ownPost && (
                                      <span className="ml-2 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                                        YOU
                                      </span>
                                    )}
                                  </h3>
                                  <p className="mt-0.5 text-xs text-slate-500">
                                    {post.createdAt}
                                  </p>
                                </div>

                                {ownPost && (
                                  <button
                                    type="button"
                                    onClick={() => deletePost(post.id)}
                                    aria-label="Delete your post"
                                    title="Delete your post"
                                    className="rounded-lg border border-transparent p-2 text-slate-500 transition hover:border-red-100 hover:bg-red-950/40 hover:text-red-600"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                )}
                              </div>

                              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">
                                {post.content}
                              </p>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>

              <aside className="rounded-xl border border-slate-800 bg-[#111722] p-5">
                <h2 className="font-bold">Community</h2>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Posts</span>
                    <span className="font-semibold">{posts.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Players</span>
                    <span className="font-semibold">{players.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Open challenges</span>
                    <span className="font-semibold">{activeChallenges.length}</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-800 pt-4">
                  <h3 className="text-sm font-semibold">Posting rules</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Keep posts relevant to volleyball. You can delete your own
                    posts at any time.
                  </p>
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* TOURNAMENTS */}
        {activeTab === "Tournaments" && (
          <section>
            <SectionTitle
              title="Tournaments"
              description="Create or join campus volleyball tournaments."
              action={
                <button
                  type="button"
                  onClick={() => setModal("tournament")}
                  disabled={currentPlayer.year < 3}
                  className={PRIMARY_BUTTON}
                >
                  <Plus size={16} />
                  Create tournament
                </button>
              }
            />

            <div className="mb-5 rounded-lg border border-slate-800 bg-[#111722] px-4 py-3 text-sm text-slate-500">
              <span className="font-semibold text-slate-100">
                Eligibility:
              </span>{" "}
              Only 3rd and 4th year students can create or join tournaments.
              Your year: {currentPlayer.year}.
            </div>

            {currentPlayer.year < 3 && (
              <div className="mb-5 rounded-lg border border-amber-900 bg-amber-950/40 p-4 text-sm text-amber-300">
                Your profile is set to year {currentPlayer.year}. You cannot
                create or join tournaments unless you are in 3rd or 4th year.
              </div>
            )}

            {tournaments.length === 0 ? (
              <EmptyState message="No tournaments available. Create the first one." />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {tournaments.map((tournament) => {
                  const joined = tournament.participants.includes(
                    CURRENT_USER.id
                  );
                  const isOwner =
                    tournament.creatorId === CURRENT_USER.id;

                  return (
                    <article
                      key={tournament.id}
                      className="rounded-xl border border-slate-800 bg-[#111722] p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                            <Trophy size={21} className="text-slate-300" />
                          </div>

                          <div>
                            <h2 className="font-bold">{tournament.name}</h2>
                            <p className="mt-1 text-sm text-slate-500">
                              Organized by {tournament.creatorName}
                            </p>
                          </div>
                        </div>

                        {isOwner && (
                          <button
                            type="button"
                            onClick={() => deleteTournament(tournament.id)}
                            aria-label="Delete tournament"
                            className="rounded-lg p-2 text-slate-500 hover:bg-red-950/40 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="mt-5 space-y-2.5 text-sm text-slate-500">
                        <p className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          {formatDate(tournament.date)}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin size={16} />
                          {tournament.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Users size={16} />
                          {tournament.format} ·{" "}
                          {tournament.participants.length} joined
                        </p>
                      </div>

                      <div className="mt-4 rounded-lg bg-[#0b0f17] px-3 py-2.5 text-xs text-slate-500">
                        {tournament.eligibility}
                      </div>

                      {tournament.participants.length > 0 && (
                        <p className="mt-3 text-xs text-slate-500">
                          Participants:{" "}
                          {tournament.participants
                            .map(
                              (id) =>
                                players.find((player) => player.id === id)
                                  ?.name || "Player"
                            )
                            .join(", ")}
                        </p>
                      )}

                      <div className="mt-4 border-t border-slate-800 pt-4">
                        {!isOwner && currentPlayer.year >= 3 && (
                          <button
                            type="button"
                            onClick={() =>
                              toggleTournamentJoin(tournament.id)
                            }
                            className={
                              joined ? SECONDARY_BUTTON : PRIMARY_BUTTON
                            }
                          >
                            {joined ? (
                              <>
                                <Check size={15} />
                                Joined · Leave
                              </>
                            ) : (
                              <>
                                <Plus size={15} />
                                Join tournament
                              </>
                            )}
                          </button>
                        )}

                        {isOwner && (
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                            <CheckCircle2 size={16} />
                            Created by you
                          </span>
                        )}

                        {!isOwner && currentPlayer.year < 3 && (
                          <p className="text-sm text-slate-500">
                            Not eligible to join with your current year.
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>

      {/* CREATE CHALLENGE MODAL */}
      {modal === "challenge" && (
        <Modal
          title="Create challenge"
          onClose={() => setModal(null)}
        >
          <form onSubmit={createChallenge} className="space-y-4">
            <Field label="Challenge title">
              <input
                required
                maxLength={80}
                value={challengeForm.title}
                onChange={(event) =>
                  setChallengeForm({
                    ...challengeForm,
                    title: event.target.value,
                  })
                }
                placeholder="e.g. Evening 6v6 Match"
                className={INPUT_CLASS}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date">
                <input
                  type="date"
                  required
                  min={new Date().toLocaleDateString("en-CA")}
                  value={challengeForm.date}
                  onChange={(event) =>
                    setChallengeForm({
                      ...challengeForm,
                      date: event.target.value,
                    })
                  }
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Time">
                <input
                  type="time"
                  required
                  value={challengeForm.time}
                  onChange={(event) =>
                    setChallengeForm({
                      ...challengeForm,
                      time: event.target.value,
                    })
                  }
                  className={INPUT_CLASS}
                />
              </Field>
            </div>

            <Field label="Location">
              <input
                required
                maxLength={100}
                value={challengeForm.location}
                onChange={(event) =>
                  setChallengeForm({
                    ...challengeForm,
                    location: event.target.value,
                  })
                }
                placeholder="Court or sports complex"
                className={INPUT_CLASS}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Skill level">
                <select
                  value={challengeForm.level}
                  onChange={(event) =>
                    setChallengeForm({
                      ...challengeForm,
                      level: event.target.value,
                    })
                  }
                  className={INPUT_CLASS}
                >
                  <option>Beginner friendly</option>
                  <option>Intermediate</option>
                  <option>Competitive</option>
                </select>
              </Field>

              <Field label="Players needed">
                <input
                  type="number"
                  required
                  min="1"
                  max="11"
                  value={challengeForm.playersNeeded}
                  onChange={(event) =>
                    setChallengeForm({
                      ...challengeForm,
                      playersNeeded: event.target.value,
                    })
                  }
                  className={INPUT_CLASS}
                />
              </Field>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setModal(null)}
                className={SECONDARY_BUTTON}
              >
                Cancel
              </button>
              <button type="submit" className={PRIMARY_BUTTON}>
                Create challenge
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* REQUEST PLAYERS MODAL */}
      {modal === "request" && (
        <Modal
          title="Request players"
          onClose={() => setModal(null)}
        >
          <form onSubmit={createRequest} className="space-y-4">
            <Field label="Request title">
              <input
                required
                maxLength={80}
                value={requestForm.title}
                onChange={(event) =>
                  setRequestForm({
                    ...requestForm,
                    title: event.target.value,
                  })
                }
                placeholder="e.g. Need a Libero"
                className={INPUT_CLASS}
              />
            </Field>

            <Field label="Description">
              <textarea
                required
                rows={3}
                maxLength={500}
                value={requestForm.description}
                onChange={(event) =>
                  setRequestForm({
                    ...requestForm,
                    description: event.target.value,
                  })
                }
                placeholder="Describe your team and what you need."
                className={`${INPUT_CLASS} resize-y`}
              />
            </Field>

            <Field label="Positions needed (select all that apply)">
              <div className="flex flex-wrap gap-2">
                {POSITION_OPTIONS.map((position) => {
                  const selected = requestForm.positions.includes(position);

                  return (
                    <button
                      type="button"
                      key={position}
                      onClick={() =>
                        togglePosition(
                          position,
                          requestForm.positions,
                          (positions) =>
                            setRequestForm({
                              ...requestForm,
                              positions,
                            })
                        )
                      }
                      className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                        selected
                          ? "border-slate-900 bg-cyan-500 text-white"
                          : "border-slate-700 bg-[#111722] text-slate-300"
                      }`}
                    >
                      {selected && (
                        <Check size={13} className="mr-1 inline" />
                      )}
                      {position}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Players needed">
              <input
                type="number"
                required
                min="1"
                max="11"
                value={requestForm.playersNeeded}
                onChange={(event) =>
                  setRequestForm({
                    ...requestForm,
                    playersNeeded: event.target.value,
                  })
                }
                className={INPUT_CLASS}
              />
            </Field>

            <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setModal(null)}
                className={SECONDARY_BUTTON}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={requestForm.positions.length === 0}
                className={PRIMARY_BUTTON}
              >
                Publish request
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* CREATE TOURNAMENT MODAL */}
      {modal === "tournament" && (
        <Modal
          title="Create tournament"
          onClose={() => setModal(null)}
        >
          {currentPlayer.year < 3 ? (
            <div>
              <p className="text-sm leading-6 text-slate-500">
                Only 3rd and 4th year students can create tournaments. Update
                your profile year if it is incorrect.
              </p>
              <button
                type="button"
                onClick={() => {
                  setModal(null);
                  openProfileEditor();
                }}
                className={`${PRIMARY_BUTTON} mt-4`}
              >
                Edit profile
              </button>
            </div>
          ) : (
            <form onSubmit={createTournament} className="space-y-4">
              <Field label="Tournament name">
                <input
                  required
                  maxLength={100}
                  value={tournamentForm.name}
                  onChange={(event) =>
                    setTournamentForm({
                      ...tournamentForm,
                      name: event.target.value,
                    })
                  }
                  placeholder="e.g. Campus Volleyball Cup"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Date">
                <input
                  type="date"
                  required
                  min={new Date().toLocaleDateString("en-CA")}
                  value={tournamentForm.date}
                  onChange={(event) =>
                    setTournamentForm({
                      ...tournamentForm,
                      date: event.target.value,
                    })
                  }
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Location">
                <input
                  required
                  maxLength={100}
                  value={tournamentForm.location}
                  onChange={(event) =>
                    setTournamentForm({
                      ...tournamentForm,
                      location: event.target.value,
                    })
                  }
                  placeholder="Sports ground or court"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Match format">
                <select
                  value={tournamentForm.format}
                  onChange={(event) =>
                    setTournamentForm({
                      ...tournamentForm,
                      format: event.target.value,
                    })
                  }
                  className={INPUT_CLASS}
                >
                  <option value="6v6">6v6</option>
                  <option value="4v4">4v4</option>
                  <option value="2v2">2v2</option>
                </select>
              </Field>

              <p className="rounded-lg bg-[#0b0f17] p-3 text-xs leading-5 text-slate-500">
                Eligibility is restricted to 3rd and 4th year students.
              </p>

              <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className={SECONDARY_BUTTON}
                >
                  Cancel
                </button>
                <button type="submit" className={PRIMARY_BUTTON}>
                  Create tournament
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {/* EDIT PROFILE MODAL */}
      {showProfileEditor && (
        <Modal
          title="Edit player profile"
          onClose={() => setShowProfileEditor(false)}
        >
          <form onSubmit={saveProfile} className="space-y-4">
            <div className="rounded-lg border border-slate-800 bg-[#0b0f17] p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Backend-managed details</p>
              <p className="mt-2 text-sm text-slate-200">{currentPlayer.name}</p>
              <p className="mt-1 text-sm text-slate-400">Year {currentPlayer.year} · {currentPlayer.department}</p>
              <p className="mt-2 text-xs text-slate-500">Name, academic year, and branch cannot be changed here.</p>
            </div>

            <Field label="Positions (select all that apply)">
              <div className="flex flex-wrap gap-2">
                {POSITION_OPTIONS.map((position) => {
                  const selected = profileForm.positions.includes(position);

                  return (
                    <button
                      type="button"
                      key={position}
                      onClick={() =>
                        togglePosition(
                          position,
                          profileForm.positions,
                          (positions) =>
                            setProfileForm({
                              ...profileForm,
                              positions,
                            })
                        )
                      }
                      className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                        selected
                          ? "border-slate-900 bg-cyan-500 text-white"
                          : "border-slate-700 bg-[#111722] text-slate-300"
                      }`}
                    >
                      {selected && (
                        <Check size={13} className="mr-1 inline" />
                      )}
                      {position}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Short bio">
              <textarea
                rows={3}
                maxLength={200}
                value={profileForm.bio}
                onChange={(event) =>
                  setProfileForm({
                    ...profileForm,
                    bio: event.target.value,
                  })
                }
                placeholder="Tell other players a little about yourself."
                className={`${INPUT_CLASS} resize-y`}
              />
            </Field>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-800 p-3">
              <input
                type="checkbox"
                checked={profileForm.available}
                onChange={(event) =>
                  setProfileForm({
                    ...profileForm,
                    available: event.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-slate-700"
              />
              <span className="text-sm text-slate-300">
                Available to play
              </span>
            </label>

            <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setShowProfileEditor(false)}
                className={SECONDARY_BUTTON}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={profileForm.positions.length === 0}
                className={PRIMARY_BUTTON}
              >
                Save profile
              </button>
            </div>
          </form>
        </Modal>
      )}
    </main>
  );
}