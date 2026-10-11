"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Bell,
  Users,
  Swords,
  MessageCircle,
  Trophy,
  Activity,
  Search,
  Plus,
  MapPin,
  Clock,
  CalendarDays,
  X,
  ChevronRight,
  UserRound,
  Trash2,
} from "lucide-react";

const TABS = [
  { id: "activity", label: "My Activities", icon: Activity },
  { id: "players", label: "Players", icon: Users },
  { id: "challenges", label: "Challenges", icon: Swords },
  { id: "community", label: "Community", icon: MessageCircle },
  { id: "tournaments", label: "Tournaments", icon: Trophy },
];

const INITIAL_CHALLENGES = [
  {
    id: 1,
    title: "Friendly Cricket Match",
    date: "2026-10-15",
    time: "16:00",
    location: "Main Ground",
    overs: 10,
    status: "Open",
    interested: [],
    accepted: [],
  },
  {
    id: 2,
    title: "Weekend Practice Match",
    date: "2026-10-17",
    time: "07:00",
    location: "College Ground",
    overs: 20,
    status: "Open",
    interested: [],
    accepted: [],
  },
];

const INITIAL_PLAYERS = [
  {
    id: 1,
    name: "Rahul Kumar",
    nickname: "Rohit",
    branch: "CSE",
    year: "3rd Year",
    roles: ["Batter"],
  },
  {
    id: 2,
    name: "Aman Singh",
    nickname: "",
    branch: "Mechanical",
    year: "2nd Year",
    roles: ["Bowler"],
  },
  {
    id: 3,
    name: "Priya Kumari",
    nickname: "",
    branch: "Electrical",
    year: "1st Year",
    roles: ["All-rounder"],
  },
  {
    id: 4,
    name: "Aditya Raj",
    nickname: "Adi",
    branch: "Civil",
    year: "4th Year",
    roles: ["Wicket-keeper"],
  },
];

const INITIAL_TOURNAMENTS = [
  {
    id: 1,
    name: "BIT Campus Cricket Cup",
    date: "2026-10-20",
    teams: 8,
    location: "Main Ground",
    host: "Aditya Raj",
    status: "Registration Open",
  },
];

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function isChallengeExpired(challenge, currentTime) {
  if (!currentTime || !challenge?.date || !challenge?.time) {
    return false;
  }

  const scheduledStart = new Date(
    `${challenge.date}T${challenge.time}`
  );

  if (Number.isNaN(scheduledStart.getTime())) {
    return false;
  }

  return currentTime >= scheduledStart.getTime() + DAY_IN_MS;
}

export default function Cricket() {
  const [activeTab, setActiveTab] = useState("activity");
  const [players, setPlayers] = useState([]);
const [playersLoading, setPlayersLoading] = useState(true);
const [playersError, setPlayersError] = useState("");
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [tournaments, setTournaments] = useState(INITIAL_TOURNAMENTS);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [yearFilter, setYearFilter] = useState("All years");
  const [branchFilter, setBranchFilter] = useState("All branches");

  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [showTournamentForm, setShowTournamentForm] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    roles: ["Batter"],
    bio: "",
    availability: "Available",
  });

  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      authorId: 2,
      author: "Rahul Kumar",
      text: "Anyone interested in a practice match this weekend?",
      time: new Date("2026-10-11T08:00:00Z").getTime(),
    },
    {
      id: 2,
      authorId: 3,
      author: "Priya Kumari",
      text: "Looking for a bowler and a wicket-keeper for nets.",
      time: new Date("2026-10-11T08:15:00Z").getTime(),
    },
  ]);

  const [postDraft, setPostDraft] = useState("");

  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    branch: "",
    year: "",
  });

  const [authLoading, setAuthLoading] = useState(true);

  // The clock is initialized after mounting, avoiding a server/browser
  // rendering mismatch caused by reading the current time during render.
  const [now, setNow] = useState(0);

  const [challengeForm, setChallengeForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    overs: "10",
  });

  const [tournamentForm, setTournamentForm] = useState({
    name: "",
    date: "",
    teams: "8",
    location: "",
  });

  // Load the real Supabase-authenticated student.
  useEffect(() => {
    let active = true;

    async function loadCurrentUser() {
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          throw authError;
        }

        if (!authUser) {
          if (active) {
            setCurrentUser({
              id: null,
              name: "",
              branch: "",
              year: "",
            });
          }
          return;
        }

        const metadata = authUser.user_metadata ?? {};

        const {
          data: settings,
          error: settingsError,
        } = await supabase
          .from("user_settings")
          .select("display_name, branch, academic_year")
          .eq("user_id", authUser.id)
          .maybeSingle();

        if (settingsError) {
          console.warn(
            "Could not load profile fallbacks:",
            settingsError.message
          );
        }

        const yearFromSignup = {
          1: "1st Year",
          2: "2nd Year",
          3: "3rd Year",
          4: "4th Year",
        }[Number(metadata.academic_year)] ?? "";

        if (active) {
          setCurrentUser({
            id: authUser.id,
            name:
              metadata.full_name ??
              settings?.display_name ??
              metadata.name ??
              authUser.email ??
              "Student",
            branch:
              metadata.branch ??
              settings?.branch ??
              "",
            year:
              yearFromSignup ||
              settings?.academic_year ||
              "",
          });
        }
      } catch (error) {
        console.error(
          "Could not load signed-in Cricket user:",
          error
        );

        if (active) {
          setCurrentUser({
            id: null,
            name: "",
            branch: "",
            year: "",
          });
        }
      } finally {
        if (active) {
          setAuthLoading(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
  if (authLoading) return;

  if (!currentUser.id) {
    setPlayers([]);
    setPlayersLoading(false);
    return;
  }

  let active = true;

  async function loadCricketPlayers() {
    setPlayersLoading(true);
    setPlayersError("");

    try {
      const { data, error } = await supabase.rpc(
        "get_cricket_players"
      );

      if (error) throw error;

      if (active) {
        const cricketPlayers = (data ?? []).map((row) => ({
          id: row.user_id,
          name: row.display_name || "Student",
          nickname: "",
          branch: row.branch || "",
          year: row.academic_year || "",
          roles: row.player_role ? [row.player_role] : [],
        }));

        setPlayers(cricketPlayers);
      }
    } catch (error) {
      console.error("Could not load Cricket players:", error);

      if (active) {
        setPlayersError(
          error?.message || "Could not load Cricket players."
        );
        setPlayers([]);
      }
    } finally {
      if (active) {
        setPlayersLoading(false);
      }
    }
  }

  loadCricketPlayers();

  return () => {
    active = false;
  };
}, [authLoading, currentUser.id]);

  // Update the clock only after mount and then once per minute.
  useEffect(() => {
    setNow(Date.now());

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  // Keep the date input minimum in sync with the current date in India.
  const today = now
    ? new Date(now).toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      })
    : undefined;

  const filteredPlayers = players.filter((player) => {
    const query = search.toLowerCase();

    const matchesSearch =
      player.name.toLowerCase().includes(query) ||
      player.branch.toLowerCase().includes(query) ||
      player.roles.join(" ").toLowerCase().includes(query) ||
      player.year.toLowerCase().includes(query) ||
      player.nickname.toLowerCase().includes(query);

    return (
      matchesSearch &&
      (roleFilter === "All roles" ||
        roleFilter
          .split(" · ")
          .every((role) => player.roles.includes(role))) &&
      (yearFilter === "All years" || player.year === yearFilter) &&
      (branchFilter === "All branches" ||
        player.branch === branchFilter)
    );
  });

  const myChallenges = challenges.filter((challenge) => {
    const scheduledStart = new Date(
      `${challenge.date}T${challenge.time}`
    ).getTime();

    const isWithinActivityWindow =
      !Number.isNaN(scheduledStart) &&
      now < scheduledStart + DAY_IN_MS;

    return (
      isWithinActivityWindow &&
      (challenge.createdBy === currentUser.id ||
        (challenge.accepted || []).some(
          (player) => player.id === currentUser.id
        ) ||
        (challenge.interested || []).some(
          (player) => player.id === currentUser.id
        ))
    );
  });

  const myTournaments = tournaments.filter(
    (tournament) =>
      tournament.hostId === currentUser.id ||
      tournament.participants?.some(
        (player) => player.id === currentUser.id
      )
  );

  const createChallenge = (event) => {
    event.preventDefault();

    const challengeDateTime = new Date(
      `${challengeForm.date}T${challengeForm.time}`
    );

    if (challengeDateTime <= new Date()) {
      alert("Please select a future date and time.");
      return;
    }

    setChallenges((previous) => [
      {
        id: Date.now(),
        ...challengeForm,
        overs: Number(challengeForm.overs),
        createdBy: currentUser.id,
        creatorName: currentUser.name,
        status: "Open",
        interested: [],
        accepted: [],
      },
      ...previous,
    ]);

    setChallengeForm({
      title: "",
      date: "",
      time: "",
      location: "",
      overs: "10",
    });

    setShowChallengeForm(false);
    setActiveTab("activity");
  };

  const expressInterest = (challengeId) => {
    setChallenges((previous) =>
      previous.map((challenge) => {
        if (challenge.id !== challengeId) {
          return challenge;
        }

        const alreadyInterested = (
          challenge.interested || []
        ).some((player) => player.id === currentUser.id);

        if (alreadyInterested) {
          return challenge;
        }

        return {
          ...challenge,
          interested: [
            ...(challenge.interested || []),
            currentUser,
          ],
        };
      })
    );
  };

  const acceptChallenge = (challengeId) => {
    setChallenges((previous) =>
      previous.map((challenge) => {
        if (challenge.id !== challengeId) {
          return challenge;
        }

        const alreadyAccepted = (
          challenge.accepted || []
        ).some((player) => player.id === currentUser.id);

        if (alreadyAccepted) {
          return challenge;
        }

        return {
          ...challenge,
          accepted: [
            ...(challenge.accepted || []),
            currentUser,
          ],
          interested: (challenge.interested || []).filter(
            (player) => player.id !== currentUser.id
          ),
          status: "Accepted",
        };
      })
    );
  };

  const createTournament = (event) => {
    event.preventDefault();

    if (!["3rd Year", "4th Year"].includes(currentUser.year)) {
      alert(
        "Only third- and fourth-year students can host tournaments."
      );
      return;
    }

    if (
      !tournamentForm.date ||
      new Date(`${tournamentForm.date}T23:59:59`) < new Date()
    ) {
      alert("Please select a current or future tournament date.");
      return;
    }

    setTournaments((previous) => [
      {
        id: Date.now(),
        ...tournamentForm,
        teams: Number(tournamentForm.teams),
        host: currentUser.name,
        hostId: currentUser.id,
        participants: [],
        status: "Registration Open",
      },
      ...previous,
    ]);

    setTournamentForm({
      name: "",
      date: "",
      teams: "8",
      location: "",
    });

    setShowTournamentForm(false);
    setActiveTab("activity");
  };

  const joinTournament = (tournamentId) => {
    setTournaments((previous) =>
      previous.map((tournament) => {
        if (tournament.id !== tournamentId) {
          return tournament;
        }

        const participants = tournament.participants || [];

        if (
          participants.some(
            (player) => player.id === currentUser.id
          )
        ) {
          return tournament;
        }

        return {
          ...tournament,
          participants: [...participants, currentUser],
        };
      })
    );
  };

  const createCommunityPost = (event) => {
    event.preventDefault();

    const text = postDraft.trim();

    if (!text || !currentUser.id) {
      return;
    }

    setCommunityPosts((previous) => [
      {
        id: Date.now(),
        authorId: currentUser.id,
        author: currentUser.name,
        text,
        time: Date.now(),
      },
      ...previous,
    ]);

    setPostDraft("");
  };

  const deleteCommunityPost = (postId) => {
    setCommunityPosts((previous) =>
      previous.filter(
        (post) =>
          !(post.id === postId && post.authorId === currentUser.id)
      )
    );
  };

  const formatDate = (date) =>
    date
      ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        })
      : "Not specified";

  const formatTime = (time) => {
    if (!time) {
      return "Not specified";
    }

    const [hours, minutes] = time.split(":").map(Number);

    return new Date(
      Date.UTC(2000, 0, 1, hours, minutes)
    ).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
  };

  const isExpired = (challenge) =>
    isChallengeExpired(challenge, now);

  // Expired challenges are removed from active UI state.
  // The effect responds to the state-backed clock, not a render-time clock.
  useEffect(() => {
    if (!now) {
      return;
    }

    setChallenges((previous) =>
      previous.filter((challenge) => !isChallengeExpired(challenge, now))
    );
  }, [now]);

  const openChallenges = challenges.filter(
    (challenge) => !isExpired(challenge)
  );

  const myCreatedChallenges = challenges.filter(
    (challenge) => challenge.createdBy === currentUser.id
  );

  const myCreatedTournaments = tournaments.filter(
    (tournament) => tournament.hostId === currentUser.id
  );

  const myInterests = challenges.filter((challenge) =>
    (challenge.interested || []).some(
      (player) => player.id === currentUser.id
    )
  );

  const myAcceptedChallenges = challenges.filter((challenge) =>
    (challenge.accepted || []).some(
      (player) => player.id === currentUser.id
    )
  );

  const myJoinedTournaments = tournaments.filter((tournament) =>
    tournament.participants?.some(
      (player) => player.id === currentUser.id
    )
  );

  const myActivitiesCount =
    myChallenges.length + myTournaments.length;

  const myActiveChallenges = myChallenges.filter(
    (challenge) => !isExpired(challenge)
  );

  const myUpcomingTournaments = tournaments.filter(
    (tournament) =>
      tournament.hostId === currentUser.id ||
      tournament.participants?.some(
        (player) => player.id === currentUser.id
      )
  );

  const Card = ({ children, className = "" }) => (
    <div
      className={`rounded-xl border border-[#292a31] bg-[#111217] ${className}`}
    >
      {children}
    </div>
  );

  const SectionTitle = ({
    eyebrow,
    title,
    description,
    action,
  }) => (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-gray-400">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );

  const Button = ({
    children,
    onClick,
    secondary = false,
    type = "button",
    disabled = false,
  }) => (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
        secondary
          ? "border border-[#30313a] bg-[#17181f] text-gray-200 hover:bg-[#20212a]"
          : "bg-emerald-500 text-[#06140f] hover:bg-emerald-400"
      }`}
    >
      {children}
    </button>
  );

  const EmptyState = ({ title, description, action }) => (
    <Card className="flex flex-col items-center justify-center px-5 py-14 text-center">
      <div className="mb-4 rounded-xl border border-[#30313a] bg-[#191a21] p-3 text-gray-400">
        <Activity size={23} />
      </div>
      <h3 className="font-medium text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-400">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </Card>
  );

  const PlayerCard = ({ player }) => (
    <Card className="group relative p-5 transition hover:border-[#41434c]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25262f] text-sm font-semibold text-emerald-400">
          {player.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-white">
            {player.name}
          </h3>
          {player.nickname && (
            <p className="text-xs text-gray-500">
              "{player.nickname}"
            </p>
          )}
          <p className="mt-1 text-sm text-gray-400">
            {player.branch} · {player.year}
          </p>
        </div>

        <span className="rounded-md border border-[#30313a] px-2 py-1 text-xs text-gray-300">
          {player.roles.join(" · ")}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#292a31] pt-3">
        <span className="text-xs text-gray-500">Cricket player</span>
        <ChevronRight
          size={16}
          className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-emerald-400"
        />
      </div>

      <div className="pointer-events-none absolute left-4 top-[calc(100%-8px)] z-20 hidden w-64 rounded-lg border border-[#383a43] bg-[#17181f] p-4 shadow-xl group-hover:block">
        <p className="font-medium text-white">{player.name}</p>
        <div className="mt-3 space-y-2 text-xs text-gray-400">
          <p>Branch: {player.branch}</p>
          <p>Year: {player.year}</p>
          <p>Specialization: {player.roles.join(" · ")}</p>
        </div>
      </div>
    </Card>
  );

  const ChallengeCard = ({ challenge, activity = false }) => {
    const createdByMe = challenge.createdBy === currentUser.id;
    const interested = challenge.interested || [];
    const accepted = challenge.accepted || [];

    const alreadyInterested = interested.some(
      (player) => player.id === currentUser.id
    );

    const alreadyAccepted = accepted.some(
      (player) => player.id === currentUser.id
    );

    return (
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-medium text-white">
              {challenge.title}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Created by {challenge.creatorName || "Campus player"}
            </p>
          </div>

          <span className="rounded-md border border-[#30313a] px-2.5 py-1 text-xs text-gray-300">
            {isExpired(challenge) ? "Expired" : challenge.status}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-400 sm:grid-cols-2">
          <p className="flex items-center gap-2">
            <CalendarDays size={15} />
            {formatDate(challenge.date)}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={15} />
            {formatTime(challenge.time)}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={15} />
            {challenge.location}
          </p>
          <p className="flex items-center gap-2">
            <Swords size={15} />
            {challenge.overs} overs
          </p>
        </div>

        {activity && (
          <div className="mt-4 space-y-3 border-t border-[#292a31] pt-4">
            <div>
              <p className="mb-2 text-xs font-medium text-gray-300">
                Interested players ({interested.length})
              </p>
              {interested.length === 0 ? (
                <p className="text-xs text-gray-500">
                  No interested players yet.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {interested.map((player) => (
                    <span
                      key={player.id}
                      className="rounded-md bg-[#20212a] px-2.5 py-1.5 text-xs text-gray-300"
                    >
                      {player.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-gray-300">
                Accepted players ({accepted.length})
              </p>
              {accepted.length === 0 ? (
                <p className="text-xs text-gray-500">
                  No accepted players yet.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {accepted.map((player) => (
                    <span
                      key={player.id}
                      className="rounded-md border border-emerald-900 bg-emerald-950/40 px-2.5 py-1.5 text-xs text-emerald-300"
                    >
                      {player.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {!createdByMe && !isExpired(challenge) && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-[#292a31] pt-4">
            <Button
              secondary
              disabled={alreadyInterested || alreadyAccepted}
              onClick={() => expressInterest(challenge.id)}
            >
              {alreadyInterested
                ? "Interest registered"
                : "I'm interested"}
            </Button>
            <Button
              disabled={alreadyAccepted}
              onClick={() => acceptChallenge(challenge.id)}
            >
              {alreadyAccepted ? "Accepted" : "Accept challenge"}
            </Button>
          </div>
        )}

        {activity && createdByMe && (
          <p className="mt-4 border-t border-[#292a31] pt-3 text-xs text-gray-500">
            Your challenge · {interested.length} interested ·{" "}
            {accepted.length} accepted
          </p>
        )}
      </Card>
    );
  };

  const TournamentCard = ({ tournament }) => {
    const participants = tournament.participants || [];
    const isHost = tournament.hostId === currentUser.id;
    const isJoined = participants.some(
      (player) => player.id === currentUser.id
    );

    return (
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-medium text-white">
              {tournament.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Hosted by {tournament.host}
            </p>
          </div>
          <span className="rounded-md border border-[#30313a] px-2.5 py-1 text-xs text-gray-300">
            {tournament.status}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-400 sm:grid-cols-2">
          <p className="flex items-center gap-2">
            <CalendarDays size={15} />
            {formatDate(tournament.date)}
          </p>
          <p className="flex items-center gap-2">
            <Users size={15} />
            {tournament.teams} teams
          </p>
          <p className="flex items-center gap-2 sm:col-span-2">
            <MapPin size={15} />
            {tournament.location}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#292a31] pt-4">
          <p className="text-xs text-gray-500">
            {participants.length} interested players
          </p>
          {!isHost && (
            <Button
              secondary
              disabled={isJoined}
              onClick={() => joinTournament(tournament.id)}
            >
              {isJoined ? "Interest registered" : "I'm interested"}
            </Button>
          )}
        </div>

        {isHost && (
          <div className="mt-4 border-t border-[#292a31] pt-4">
            <p className="mb-2 text-xs font-medium text-gray-300">
              Interested participants
            </p>
            {participants.length === 0 ? (
              <p className="text-xs text-gray-500">
                No participants yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {participants.map((player) => (
                  <span
                    key={player.id}
                    className="rounded-md bg-[#20212a] px-2.5 py-1.5 text-xs text-gray-300"
                  >
                    {player.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>
    );
  };

  const toggleProfileRole = (role) => {
    setProfileDetails((previous) => ({
      ...previous,
      roles: previous.roles.includes(role)
        ? previous.roles.filter((item) => item !== role)
        : [...previous.roles, role],
    }));
  };

  const renderActivity = () => (
    <>
      <SectionTitle
        eyebrow="Your workspace"
        title="My Activities"
        description="Track your challenges, player requests and tournaments in one place."
        action={
          <Button onClick={() => setShowChallengeForm(true)}>
            <Plus size={16} />
            Create challenge
          </Button>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {
            label: "My challenges",
            value: myCreatedChallenges.length,
            icon: Swords,
          },
          {
            label: "Interested players",
            value: myCreatedChallenges.reduce(
              (sum, challenge) =>
                sum + (challenge.interested?.length || 0),
              0
            ),
            icon: Users,
          },
          {
            label: "Accepted matches",
            value: myAcceptedChallenges.length,
            icon: Activity,
          },
          {
            label: "My tournaments",
            value: myCreatedTournaments.length,
            icon: Trophy,
          },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-gray-400 sm:text-sm">
                {stat.label}
              </p>
              <stat.icon size={17} className="text-gray-500" />
            </div>
            <p className="mt-4 text-2xl font-semibold text-white">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-semibold text-white">
            Challenges created by you
          </h3>
          <span className="text-xs text-gray-500">
            {myCreatedChallenges.length} total
          </span>
        </div>

        {myCreatedChallenges.length === 0 ? (
          <EmptyState
            title="No challenges created"
            description="Create a cricket challenge and track who is interested and who accepts it."
            action={
              <Button onClick={() => setShowChallengeForm(true)}>
                <Plus size={16} />
                Create challenge
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {myCreatedChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                activity
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="mb-4 font-semibold text-white">
          Challenges you have accepted
        </h3>
        {myAcceptedChallenges.length === 0 ? (
          <p className="rounded-lg border border-[#292a31] bg-[#111217] p-5 text-sm text-gray-500">
            Challenges you accept will appear here.
          </p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {myAcceptedChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                activity
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="mb-4 font-semibold text-white">
          Your tournament activity
        </h3>
        {myUpcomingTournaments.length === 0 ? (
          <p className="rounded-lg border border-[#292a31] bg-[#111217] p-5 text-sm text-gray-500">
            Tournaments you create or join will appear here.
          </p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {myUpcomingTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );

  const renderPlayers = () => (
    <>
      <SectionTitle
        eyebrow="Player directory"
        title="Players"
        description="Find cricket players across branches, academic years and playing roles."
      />

      <Card className="mb-5 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="relative xl:col-span-1">
            <Search
              size={16}
              className="absolute left-3 top-3.5 text-gray-500"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search players..."
              className="w-full rounded-lg border border-[#30313a] bg-[#0b0c10] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={branchFilter}
            onChange={(event) => setBranchFilter(event.target.value)}
            className="rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-gray-300 outline-none"
          >
            {[
              "All branches",
              ...new Set(players.map((player) => player.branch)),
            ].map((branch) => (
              <option key={branch}>{branch}</option>
            ))}
          </select>

          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-gray-300 outline-none"
          >
            {[
              "All roles",
              "Batter",
              "Bowler",
              "All-rounder",
              "Wicket-keeper",
              "Batter · Bowler",
              "Batter · Wicket-keeper",
              "Bowler · Wicket-keeper",
              "Batter · Bowler · Wicket-keeper",
            ].map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(event) => setYearFilter(event.target.value)}
            className="rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-gray-300 outline-none"
          >
            {[
              "All years",
              "1st Year",
              "2nd Year",
              "3rd Year",
              "4th Year",
            ].map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>
      </Card>

      {playersLoading ? (
        <Card className="p-8 text-center text-sm text-gray-400">
          Loading Cricket players...
        </Card>
      ) : playersError ? (
        <Card className="p-5 text-sm text-red-400">
          Could not load players: {playersError}
        </Card>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              {filteredPlayers.length} players found
            </p>
          </div>

          {filteredPlayers.length === 0 ? (
            <EmptyState
              title="No cricket players found"
              description="Students who select Cricket and save their playing roles in Settings will appear here."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );

  const renderChallenges = () => (
    <>
      <SectionTitle
        eyebrow="Match coordination"
        title="Challenges & Requests"
        description="Create a match challenge, accept an existing match, or express interest in playing."
        action={
          <Button onClick={() => setShowChallengeForm(true)}>
            <Plus size={16} />
            Create challenge
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <span className="rounded-md border border-[#30313a] bg-[#15161c] px-3 py-2 text-xs text-gray-300">
          {openChallenges.length} open challenges
        </span>
        <span className="rounded-md border border-[#30313a] bg-[#15161c] px-3 py-2 text-xs text-gray-300">
          {myInterests.length} requests you are interested in
        </span>
      </div>

      {openChallenges.length === 0 ? (
        <EmptyState
          title="No open challenges"
          description="Create a challenge to invite other cricket players."
          action={
            <Button onClick={() => setShowChallengeForm(true)}>
              <Plus size={16} />
              Create challenge
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {openChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
            />
          ))}
        </div>
      )}
    </>
  );

  const renderCommunity = () => (
    <>
      <SectionTitle
        eyebrow="Cricket community"
        title="Community"
        description="Share updates, find practice partners and coordinate campus matches."
      />

      <Card className="mb-5 p-5">
        <form
          onSubmit={createCommunityPost}
          className="space-y-3"
        >
          <label
            className="block text-sm font-medium text-gray-200"
            htmlFor="cricket-community-post"
          >
            Create a post
          </label>
          <textarea
            id="cricket-community-post"
            value={postDraft}
            onChange={(event) => setPostDraft(event.target.value)}
            placeholder="Share something with the cricket community..."
            maxLength={1000}
            rows={3}
            className="w-full resize-y rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-3 text-sm text-white outline-none focus:border-emerald-500"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!postDraft.trim() || !currentUser.id}
            >
              <Plus size={16} />
              Publish post
            </Button>
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        {communityPosts.length === 0 ? (
          <EmptyState
            title="No community posts yet"
            description="Be the first to share an update with cricket players."
          />
        ) : (
          communityPosts.map((post) => (
            <Card key={post.id} className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25262f] text-xs font-semibold text-emerald-400">
                  {post.author
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {post.author}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(post.time).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                          timeZone: "Asia/Kolkata",
                        })}
                      </p>
                    </div>

                    {post.authorId === currentUser.id && (
                      <button
                        type="button"
                        onClick={() => deleteCommunityPost(post.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#30313a] px-2.5 py-1.5 text-xs text-gray-400 transition hover:border-red-900 hover:text-red-300"
                        aria-label="Delete your post"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    )}
                  </div>

                  <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-gray-300">
                    {post.text}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );

  const renderTournaments = () => (
    <>
      <SectionTitle
        eyebrow="Competition"
        title="Tournaments"
        description="Explore upcoming cricket tournaments and register your interest."
        action={
          ["3rd Year", "4th Year"].includes(currentUser.year) ? (
            <Button
              onClick={() => setShowTournamentForm(true)}
            >
              <Plus size={16} />
              Create tournament
            </Button>
          ) : null
        }
      />

      {!["3rd Year", "4th Year"].includes(currentUser.year) && (
        <p className="mb-5 rounded-lg border border-[#30313a] bg-[#111217] p-4 text-sm text-gray-400">
          Tournament creation is available to third- and fourth-year
          students. You can still view tournaments and express interest.
        </p>
      )}

      {tournaments.length === 0 ? (
        <EmptyState
          title="No tournaments yet"
          description="Upcoming cricket tournaments will appear here."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {tournaments
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((tournament) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
              />
            ))}
        </div>
      )}
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "activity":
        return renderActivity();
      case "players":
        return renderPlayers();
      case "challenges":
        return renderChallenges();
      case "community":
        return renderCommunity();
      case "tournaments":
        return renderTournaments();
      default:
        return renderActivity();
    }
  };

  const Modal = ({ title, onClose, children }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#30313a] bg-[#111217]">
        <div className="flex items-center justify-between border-b border-[#292a31] px-5 py-4">
          <h3 className="font-semibold text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-400 hover:bg-[#20212a] hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );

  const FormField = ({ label, children }) => (
    <label className="block">
      <span className="mb-2 block text-sm text-gray-300">
        {label}
      </span>
      {children}
    </label>
  );

  const inputClass =
    "w-full rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500";

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0c10] text-white">
        Loading Cricket...
      </main>
    );
  }

  if (!currentUser.id) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0b0c10] px-4 text-center text-white">
        <h1 className="text-2xl font-bold">Sign in to Cricket</h1>
        <p className="text-sm text-gray-400">
          Sign in to access your Cricket profile and activities.
        </p>
        <Link
          href="/login"
          className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-500"
        >
          Go to sign in
        </Link>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      {/* Minimal top navigation */}
      <header className="sticky top-0 z-30 border-b border-[#25262d] bg-[#0b0c10]">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 text-sm">
            <span className="truncate text-gray-400">Home</span>
            <ChevronRight size={15} className="shrink-0 text-gray-600" />
            <span className="font-medium text-white">Cricket</span>
            <ChevronRight size={15} className="shrink-0 text-gray-600" />
            <span className="hidden truncate text-emerald-400 sm:inline">
              {TABS.find((tab) => tab.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setNotificationsOpen((previous) => !previous)
              }
              className="relative rounded-lg border border-[#292a31] bg-[#111217] p-2.5 text-gray-300 transition hover:bg-[#191a21]"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {myInterests.length + myAcceptedChallenges.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9px] font-bold text-black">
                  {myInterests.length + myAcceptedChallenges.length}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((previous) => !previous)
                }
                onMouseEnter={() => setProfileOpen(true)}
                aria-label="Open profile"
                aria-expanded={profileOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#353640] bg-[#20212a] text-xs font-semibold text-emerald-400 transition hover:border-emerald-500 hover:bg-[#292b35] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {currentUser.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </button>

              {profileOpen && (
                <div
                  onMouseLeave={() => setProfileOpen(false)}
                  className="absolute right-0 top-12 z-50 w-[min(320px,calc(100vw-32px))] rounded-xl border border-[#30313a] bg-[#111217] p-4 shadow-2xl"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25262f] font-semibold text-emerald-400">
                      {currentUser.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Cricket player profile
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      className="ml-auto rounded-md p-1 text-gray-400 hover:text-white"
                      aria-label="Close profile"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="rounded-lg border border-[#292a31] bg-[#0b0c10] p-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Backend-managed details
                    </p>
                    <p className="text-sm text-gray-200">
                      {currentUser.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      {currentUser.year} · {currentUser.branch}
                    </p>
                    <p className="mt-2 text-xs text-gray-600">
                      Name, year and branch are read-only.
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-gray-200">
                      Playing roles
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Batter",
                        "Bowler",
                        "All-rounder",
                        "Wicket-keeper",
                      ].map((role) => (
                        <label
                          key={role}
                          className="flex items-center gap-2 rounded-lg border border-[#292a31] px-2.5 py-2 text-xs text-gray-300"
                        >
                          <input
                            type="checkbox"
                            checked={profileDetails.roles.includes(role)}
                            onChange={() => toggleProfileRole(role)}
                            className="accent-emerald-500"
                          />
                          {role}
                        </label>
                      ))}
                    </div>

                    <label className="mt-3 block text-sm text-gray-300">
                      Availability
                      <select
                        value={profileDetails.availability}
                        onChange={(event) =>
                          setProfileDetails((previous) => ({
                            ...previous,
                            availability: event.target.value,
                          }))
                        }
                        className="mt-2 w-full rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                      >
                        <option>Available</option>
                        <option>Busy</option>
                        <option>Unavailable</option>
                      </select>
                    </label>

                    <label className="mt-3 block text-sm text-gray-300">
                      Bio
                      <textarea
                        value={profileDetails.bio}
                        onChange={(event) =>
                          setProfileDetails((previous) => ({
                            ...previous,
                            bio: event.target.value,
                          }))
                        }
                        maxLength={240}
                        rows={2}
                        placeholder="Add a short cricket bio..."
                        className="mt-2 w-full rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
                      />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                      Profile roles:{" "}
                      {profileDetails.roles.length
                        ? profileDetails.roles.join(", ")
                        : "Not selected"}{" "}
                      · {profileDetails.availability}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {notificationsOpen && (
            <div className="absolute right-4 top-14 w-[min(340px,calc(100vw-32px))] rounded-xl border border-[#30313a] bg-[#111217] p-4 shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium text-white">
                  Notifications
                </h3>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  aria-label="Close notifications"
                  className="text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {myInterests.length === 0 &&
              myAcceptedChallenges.length === 0 ? (
                <p className="py-4 text-sm text-gray-500">
                  No new notifications.
                </p>
              ) : (
                <div className="space-y-3 text-sm text-gray-300">
                  {myInterests.map((challenge) => (
                    <p key={challenge.id}>
                      You expressed interest in {challenge.title}.
                    </p>
                  ))}
                  {myAcceptedChallenges.map((challenge) => (
                    <p key={challenge.id}>
                      You accepted {challenge.title}.
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Five simple horizontal navigation tabs */}
        <nav
          aria-label="Cricket sections"
          className="mb-8 grid grid-cols-2 gap-2 rounded-xl border border-[#25262d] bg-[#111217] p-2 sm:grid-cols-3 lg:grid-cols-5"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={selected ? "page" : undefined}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  selected
                    ? "bg-[#20212a] text-emerald-400"
                    : "text-gray-400 hover:bg-[#191a21] hover:text-gray-100"
                }`}
              >
                <Icon size={17} />
                <span>{tab.label}</span>
                {tab.id === "challenges" &&
                  openChallenges.length > 0 && (
                    <span className="rounded-md bg-[#30313a] px-1.5 py-0.5 text-[10px] text-gray-200">
                      {openChallenges.length}
                    </span>
                  )}
              </button>
            );
          })}
        </nav>

        <section key={activeTab} className="min-w-0">
          {renderContent()}
        </section>

        <footer className="mt-12 border-t border-[#25262d] pt-5 text-xs text-gray-600">
          BIT Connect · Cricket
        </footer>
      </main>

      {/* Create challenge modal */}
      {showChallengeForm && (
        <Modal
          title="Create a cricket challenge"
          onClose={() => setShowChallengeForm(false)}
        >
          <form onSubmit={createChallenge} className="space-y-4">
            <FormField label="Challenge title">
              <input
                required
                maxLength={100}
                value={challengeForm.title}
                onChange={(event) =>
                  setChallengeForm({
                    ...challengeForm,
                    title: event.target.value,
                  })
                }
                placeholder="e.g. Friendly cricket match"
                className={inputClass}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="Match date">
                <input
                  required
                  type="date"
                  min={today}
                  value={challengeForm.date}
                  onChange={(event) =>
                    setChallengeForm({
                      ...challengeForm,
                      date: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </FormField>

              <FormField label="Match time">
                <input
                  required
                  type="time"
                  value={challengeForm.time}
                  onChange={(event) =>
                    setChallengeForm({
                      ...challengeForm,
                      time: event.target.value,
                    })
                  }
                  className={inputClass}
                />
              </FormField>
            </div>

            <FormField label="Ground / location">
              <input
                required
                maxLength={150}
                value={challengeForm.location}
                onChange={(event) =>
                  setChallengeForm({
                    ...challengeForm,
                    location: event.target.value,
                  })
                }
                placeholder="Enter the playing location"
                className={inputClass}
              />
            </FormField>

            <FormField label="Number of overs">
              <input
                required
                type="number"
                min="1"
                max="100"
                value={challengeForm.overs}
                onChange={(event) =>
                  setChallengeForm({
                    ...challengeForm,
                    overs: event.target.value,
                  })
                }
                className={inputClass}
              />
            </FormField>

            <p className="text-xs leading-5 text-gray-500">
              The challenge remains visible until 24 hours after its
              scheduled start time. Expired challenges are removed and
              are not kept in match history. Other users can express
              interest or accept the challenge.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                secondary
                onClick={() => setShowChallengeForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Publish challenge</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Create tournament modal */}
      {showTournamentForm && (
        <Modal
          title="Create a cricket tournament"
          onClose={() => setShowTournamentForm(false)}
        >
          <form onSubmit={createTournament} className="space-y-4">
            <FormField label="Tournament name">
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
                placeholder="Enter tournament name"
                className={inputClass}
              />
            </FormField>

            <FormField label="Tournament start date">
              <input
                required
                type="date"
                min={today}
                value={tournamentForm.date}
                onChange={(event) =>
                  setTournamentForm({
                    ...tournamentForm,
                    date: event.target.value,
                  })
                }
                className={inputClass}
              />
            </FormField>

            <FormField label="Number of teams">
              <input
                required
                type="number"
                min="2"
                max="64"
                value={tournamentForm.teams}
                onChange={(event) =>
                  setTournamentForm({
                    ...tournamentForm,
                    teams: event.target.value,
                  })
                }
                className={inputClass}
              />
            </FormField>

            <FormField label="Playing location">
              <input
                required
                maxLength={150}
                value={tournamentForm.location}
                onChange={(event) =>
                  setTournamentForm({
                    ...tournamentForm,
                    location: event.target.value,
                  })
                }
                placeholder="Enter ground or location"
                className={inputClass}
              />
            </FormField>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                secondary
                onClick={() => setShowTournamentForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create tournament</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#30313a] bg-[#111217]">
        <div className="flex items-center justify-between border-b border-[#292a31] px-5 py-4">
          <h3 className="font-semibold text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-400 hover:bg-[#20212a] hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-gray-300">
        {label}
      </span>
      {children}
    </label>
  );
}