// // // "use client";

// // // import React, { useState } from "react";
// // // import {
// // //   Bell,
// // //   Users,
// // //   Swords,
// // //   MessageCircle,
// // //   Trophy,
// // //   Activity,
// // //   Search,
// // //   Plus,
// // //   MapPin,
// // //   Clock,
// // //   CalendarDays,
// // //   X,
// // //   ChevronRight,
// // // } from "lucide-react";

// // // const TABS = [
// // //   { id: "activity", label: "My Activities", icon: Activity },
// // //   { id: "players", label: "Players", icon: Users },
// // //   { id: "challenges", label: "Challenges", icon: Swords },
// // //   { id: "community", label: "Community", icon: MessageCircle },
// // //   { id: "tournaments", label: "Tournaments", icon: Trophy },
// // // ];

// // // const INITIAL_CHALLENGES = [
// // //   {
// // //     id: 1,
// // //     title: "Friendly Cricket Match",
// // //     date: "2026-10-15",
// // //     time: "16:00",
// // //     location: "Main Ground",
// // //     overs: 10,
// // //     status: "Open",
// // //     interested: [],
// // //     accepted: [],
// // //   },
// // //   {
// // //     id: 2,
// // //     title: "Weekend Practice Match",
// // //     date: "2026-10-17",
// // //     time: "07:00",
// // //     location: "College Ground",
// // //     overs: 20,
// // //     status: "Open",
// // //     interested: [],
// // //     accepted: [],
// // //   },
// // // ];

// // // const INITIAL_PLAYERS = [
// // //   {
// // //     id: 1,
// // //     name: "Rahul Kumar",
// // //     nickname: "Rohit",
// // //     branch: "CSE",
// // //     year: "3rd Year",
// // //     role: "Batter",
// // //   },
// // //   {
// // //     id: 2,
// // //     name: "Aman Singh",
// // //     nickname: "",
// // //     branch: "Mechanical",
// // //     year: "2nd Year",
// // //     role: "Bowler",
// // //   },
// // //   {
// // //     id: 3,
// // //     name: "Priya Kumari",
// // //     nickname: "",
// // //     branch: "Electrical",
// // //     year: "1st Year",
// // //     role: "All-rounder",
// // //   },
// // //   {
// // //     id: 4,
// // //     name: "Aditya Raj",
// // //     nickname: "Adi",
// // //     branch: "Civil",
// // //     year: "4th Year",
// // //     role: "Wicket-keeper",
// // //   },
// // // ];

// // // const INITIAL_TOURNAMENTS = [
// // //   {
// // //     id: 1,
// // //     name: "BIT Campus Cricket Cup",
// // //     date: "2026-10-20",
// // //     teams: 8,
// // //     location: "Main Ground",
// // //     host: "Aditya Raj",
// // //     status: "Registration Open",
// // //   },
// // // ];

// // // export default function Cricket() {
// // //   const [activeTab, setActiveTab] = useState("activity");
// // //   const [players] = useState(INITIAL_PLAYERS);
// // //   const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
// // //   const [tournaments, setTournaments] = useState(INITIAL_TOURNAMENTS);
// // //   const [notificationsOpen, setNotificationsOpen] = useState(false);
// // //   const [search, setSearch] = useState("");
// // //   const [roleFilter, setRoleFilter] = useState("All roles");
// // //   const [yearFilter, setYearFilter] = useState("All years");
// // //   const [branchFilter, setBranchFilter] = useState("All branches");
// // //   const [showChallengeForm, setShowChallengeForm] = useState(false);
// // //   const [showTournamentForm, setShowTournamentForm] = useState(false);

// // //   // Demo identity. Replace with the authenticated user's details.
// // //   const currentUser = {
// // //     id: 1,
// // //     name: "Aman Kumar",
// // //     branch: "CSE",
// // //     year: "3rd Year",
// // //   };

// // //   const [challengeForm, setChallengeForm] = useState({
// // //     title: "",
// // //     date: "",
// // //     time: "",
// // //     location: "",
// // //     overs: "10",
// // //   });

// // //   const [tournamentForm, setTournamentForm] = useState({
// // //     name: "",
// // //     date: "",
// // //     teams: "8",
// // //     location: "",
// // //   });

// // //   const [communityMessages, setCommunityMessages] = useState([
// // //     {
// // //       id: 1,
// // //       author: "Rahul Kumar",
// // //       text: "Anyone interested in a practice match this weekend?",
// // //       time: Date.now(),
// // //     },
// // //     {
// // //       id: 2,
// // //       author: "Aman Singh",
// // //       text: "I can join. We need a few more bowlers!",
// // //       time: Date.now(),
// // //     },
// // //   ]);

// // //   const [message, setMessage] = useState("");

// // //   const filteredPlayers = players.filter((player) => {
// // //     const query = search.toLowerCase();

// // //     const matchesSearch =
// // //       player.name.toLowerCase().includes(query) ||
// // //       player.branch.toLowerCase().includes(query) ||
// // //       player.role.toLowerCase().includes(query) ||
// // //       player.year.toLowerCase().includes(query) ||
// // //       player.nickname.toLowerCase().includes(query);

// // //     return (
// // //       matchesSearch &&
// // //       (roleFilter === "All roles" || player.role === roleFilter) &&
// // //       (yearFilter === "All years" || player.year === yearFilter) &&
// // //       (branchFilter === "All branches" ||
// // //         player.branch === branchFilter)
// // //     );
// // //   });

// // //   const myChallenges = challenges.filter(
// // //     (challenge) =>
// // //       challenge.createdBy === currentUser.id ||
// // //       challenge.accepted.some((player) => player.id === currentUser.id) ||
// // //       challenge.interested.some((player) => player.id === currentUser.id)
// // //   );

// // //   const myTournaments = tournaments.filter(
// // //     (tournament) =>
// // //       tournament.hostId === currentUser.id ||
// // //       tournament.participants?.some(
// // //         (player) => player.id === currentUser.id
// // //       )
// // //   );

// // //   const createChallenge = (event) => {
// // //     event.preventDefault();

// // //     const challengeDateTime = new Date(
// // //       `${challengeForm.date}T${challengeForm.time}`
// // //     );

// // //     if (challengeDateTime <= new Date()) {
// // //       alert("Please select a future date and time.");
// // //       return;
// // //     }

// // //     setChallenges((previous) => [
// // //       {
// // //         id: Date.now(),
// // //         ...challengeForm,
// // //         overs: Number(challengeForm.overs),
// // //         createdBy: currentUser.id,
// // //         creatorName: currentUser.name,
// // //         status: "Open",
// // //         interested: [],
// // //         accepted: [],
// // //       },
// // //       ...previous,
// // //     ]);

// // //     setChallengeForm({
// // //       title: "",
// // //       date: "",
// // //       time: "",
// // //       location: "",
// // //       overs: "10",
// // //     });

// // //     setShowChallengeForm(false);
// // //     setActiveTab("activity");
// // //   };

// // //   const expressInterest = (challengeId) => {
// // //     setChallenges((previous) =>
// // //       previous.map((challenge) => {
// // //         if (challenge.id !== challengeId) return challenge;

// // //         const alreadyInterested = challenge.interested.some(
// // //           (player) => player.id === currentUser.id
// // //         );

// // //         if (alreadyInterested) return challenge;

// // //         return {
// // //           ...challenge,
// // //           interested: [
// // //             ...challenge.interested,
// // //             currentUser,
// // //           ],
// // //         };
// // //       })
// // //     );
// // //   };

// // //   const acceptChallenge = (challengeId) => {
// // //     setChallenges((previous) =>
// // //       previous.map((challenge) => {
// // //         if (challenge.id !== challengeId) return challenge;

// // //         const alreadyAccepted = challenge.accepted.some(
// // //           (player) => player.id === currentUser.id
// // //         );

// // //         if (alreadyAccepted) return challenge;

// // //         return {
// // //           ...challenge,
// // //           accepted: [
// // //             ...challenge.accepted,
// // //             currentUser,
// // //           ],
// // //           interested: challenge.interested.filter(
// // //             (player) => player.id !== currentUser.id
// // //           ),
// // //           status: "Accepted",
// // //         };
// // //       })
// // //     );
// // //   };

// // //   const createTournament = (event) => {
// // //     event.preventDefault();

// // //     if (!["3rd Year", "4th Year"].includes(currentUser.year)) {
// // //       alert("Only third- and fourth-year students can host tournaments.");
// // //       return;
// // //     }

// // //     setTournaments((previous) => [
// // //       {
// // //         id: Date.now(),
// // //         ...tournamentForm,
// // //         teams: Number(tournamentForm.teams),
// // //         host: currentUser.name,
// // //         hostId: currentUser.id,
// // //         participants: [],
// // //         status: "Registration Open",
// // //       },
// // //       ...previous,
// // //     ]);

// // //     setTournamentForm({
// // //       name: "",
// // //       date: "",
// // //       teams: "8",
// // //       location: "",
// // //     });

// // //     setShowTournamentForm(false);
// // //     setActiveTab("activity");
// // //   };

// // //   const joinTournament = (tournamentId) => {
// // //     setTournaments((previous) =>
// // //       previous.map((tournament) => {
// // //         if (tournament.id !== tournamentId) return tournament;

// // //         const participants = tournament.participants || [];

// // //         if (
// // //           participants.some((player) => player.id === currentUser.id)
// // //         ) {
// // //           return tournament;
// // //         }

// // //         return {
// // //           ...tournament,
// // //           participants: [...participants, currentUser],
// // //         };
// // //       })
// // //     );
// // //   };

// // //   const sendMessage = (event) => {
// // //     event.preventDefault();

// // //     if (!message.trim()) return;

// // //     setCommunityMessages((previous) => [
// // //       ...previous,
// // //       {
// // //         id: Date.now(),
// // //         author: currentUser.name,
// // //         text: message.trim(),
// // //         time: Date.now(),
// // //       },
// // //     ]);

// // //     setMessage("");
// // //   };

// // //   const visibleMessages = communityMessages.filter(
// // //     (item) => Date.now() - item.time < 24 * 60 * 60 * 1000
// // //   );

// // //   const formatDate = (date) =>
// // //     date
// // //       ? new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
// // //           day: "numeric",
// // //           month: "short",
// // //           year: "numeric",
// // //         })
// // //       : "Not specified";

// // //   const isExpired = (challenge) =>
// // //     new Date(`${challenge.date}T${challenge.time}`) <= new Date();

// // //   const openChallenges = challenges.filter(
// // //     (challenge) => !isExpired(challenge)
// // //   );

// // //   const myCreatedChallenges = challenges.filter(
// // //     (challenge) => challenge.createdBy === currentUser.id
// // //   );

// // //   const myCreatedTournaments = tournaments.filter(
// // //     (tournament) => tournament.hostId === currentUser.id
// // //   );

// // //   const myInterests = challenges.filter((challenge) =>
// // //     challenge.interested.some(
// // //       (player) => player.id === currentUser.id
// // //     )
// // //   );

// // //   const myAcceptedChallenges = challenges.filter((challenge) =>
// // //     challenge.accepted.some(
// // //       (player) => player.id === currentUser.id
// // //     )
// // //   );

// // //   const myJoinedTournaments = tournaments.filter((tournament) =>
// // //     tournament.participants?.some(
// // //       (player) => player.id === currentUser.id
// // //     )
// // //   );

// // //   const myActivitiesCount =
// // //     myChallenges.length + myTournaments.length;

// // //   const myExpiredChallenges = challenges.filter(
// // //     (challenge) =>
// // //       challenge.createdBy === currentUser.id && isExpired(challenge)
// // //   );

// // //   const myActiveChallenges = myChallenges.filter(
// // //     (challenge) => !isExpired(challenge)
// // //   );

// // //   const myUpcomingTournaments = tournaments.filter(
// // //     (tournament) =>
// // //       tournament.hostId === currentUser.id ||
// // //       tournament.participants?.some(
// // //         (player) => player.id === currentUser.id
// // //       )
// // //   );

// // //   const Card = ({ children, className = "" }) => (
// // //     <div
// // //       className={`rounded-xl border border-[#292a31] bg-[#111217] ${className}`}
// // //     >
// // //       {children}
// // //     </div>
// // //   );

// // //   const SectionTitle = ({ eyebrow, title, description, action }) => (
// // //     <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
// // //       <div>
// // //         <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">
// // //           {eyebrow}
// // //         </p>
// // //         <h2 className="text-2xl font-semibold tracking-tight text-white">
// // //           {title}
// // //         </h2>
// // //         {description && (
// // //           <p className="mt-2 text-sm text-gray-400">{description}</p>
// // //         )}
// // //       </div>

// // //       {action}
// // //     </div>
// // //   );

// // //   const Button = ({
// // //     children,
// // //     onClick,
// // //     secondary = false,
// // //     type = "button",
// // //     disabled = false,
// // //   }) => (
// // //     <button
// // //       type={type}
// // //       disabled={disabled}
// // //       onClick={onClick}
// // //       className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
// // //         secondary
// // //           ? "border border-[#30313a] bg-[#17181f] text-gray-200 hover:bg-[#20212a]"
// // //           : "bg-emerald-500 text-[#06140f] hover:bg-emerald-400"
// // //       }`}
// // //     >
// // //       {children}
// // //     </button>
// // //   );

// // //   const EmptyState = ({ title, description, action }) => (
// // //     <Card className="flex flex-col items-center justify-center px-5 py-14 text-center">
// // //       <div className="mb-4 rounded-xl border border-[#30313a] bg-[#191a21] p-3 text-gray-400">
// // //         <Activity size={23} />
// // //       </div>
// // //       <h3 className="font-medium text-white">{title}</h3>
// // //       <p className="mt-2 max-w-sm text-sm text-gray-400">{description}</p>
// // //       {action && <div className="mt-5">{action}</div>}
// // //     </Card>
// // //   );

// // //   const PlayerCard = ({ player }) => (
// // //     <Card className="group relative p-5 transition hover:border-[#41434c]">
// // //       <div className="flex items-start gap-3">
// // //         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25262f] text-sm font-semibold text-emerald-400">
// // //           {player.name
// // //             .split(" ")
// // //             .map((part) => part[0])
// // //             .join("")
// // //             .slice(0, 2)}
// // //         </div>

// // //         <div className="min-w-0 flex-1">
// // //           <h3 className="truncate font-medium text-white">
// // //             {player.name}
// // //           </h3>
// // //           {player.nickname && (
// // //             <p className="text-xs text-gray-500">
// // //               "{player.nickname}"
// // //             </p>
// // //           )}
// // //           <p className="mt-1 text-sm text-gray-400">
// // //             {player.branch} · {player.year}
// // //           </p>
// // //         </div>

// // //         <span className="rounded-md border border-[#30313a] px-2 py-1 text-xs text-gray-300">
// // //           {player.role}
// // //         </span>
// // //       </div>

// // //       <div className="mt-4 flex items-center justify-between border-t border-[#292a31] pt-3">
// // //         <span className="text-xs text-gray-500">Cricket player</span>
// // //         <ChevronRight
// // //           size={16}
// // //           className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-emerald-400"
// // //         />
// // //       </div>

// // //       {/* Hover profile preview */}
// // //       <div className="pointer-events-none absolute left-4 top-[calc(100%-8px)] z-20 hidden w-64 rounded-lg border border-[#383a43] bg-[#17181f] p-4 shadow-xl group-hover:block">
// // //         <p className="font-medium text-white">{player.name}</p>
// // //         <div className="mt-3 space-y-2 text-xs text-gray-400">
// // //           <p>Branch: {player.branch}</p>
// // //           <p>Year: {player.year}</p>
// // //           <p>Specialization: {player.role}</p>
// // //         </div>
// // //       </div>
// // //     </Card>
// // //   );

// // //   const ChallengeCard = ({ challenge, activity = false }) => {
// // //     const createdByMe = challenge.createdBy === currentUser.id;

// // //     const interested = challenge.interested || [];
// // //     const accepted = challenge.accepted || [];

// // //     const alreadyInterested = interested.some(
// // //       (player) => player.id === currentUser.id
// // //     );

// // //     const alreadyAccepted = accepted.some(
// // //       (player) => player.id === currentUser.id
// // //     );

// // //     return (
// // //       <Card className="p-5">
// // //         <div className="flex flex-wrap items-start justify-between gap-3">
// // //           <div>
// // //             <h3 className="font-medium text-white">
// // //               {challenge.title}
// // //             </h3>
// // //             <p className="mt-1 text-xs text-gray-500">
// // //               Created by {challenge.creatorName || "Campus player"}
// // //             </p>
// // //           </div>

// // //           <span className="rounded-md border border-[#30313a] px-2.5 py-1 text-xs text-gray-300">
// // //             {isExpired(challenge) ? "Expired" : challenge.status}
// // //           </span>
// // //         </div>

// // //         <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-400 sm:grid-cols-2">
// // //           <p className="flex items-center gap-2">
// // //             <CalendarDays size={15} />
// // //             {formatDate(challenge.date)}
// // //           </p>

// // //           <p className="flex items-center gap-2">
// // //             <Clock size={15} />
// // //             {challenge.time}
// // //           </p>

// // //           <p className="flex items-center gap-2">
// // //             <MapPin size={15} />
// // //             {challenge.location}
// // //           </p>

// // //           <p className="flex items-center gap-2">
// // //             <Swords size={15} />
// // //             {challenge.overs} overs
// // //           </p>
// // //         </div>

// // //         {activity && (
// // //           <div className="mt-4 space-y-3 border-t border-[#292a31] pt-4">
// // //             <div>
// // //               <p className="mb-2 text-xs font-medium text-gray-300">
// // //                 Interested players ({interested.length})
// // //               </p>

// // //               {interested.length === 0 ? (
// // //                 <p className="text-xs text-gray-500">
// // //                   No interested players yet.
// // //                 </p>
// // //               ) : (
// // //                 <div className="flex flex-wrap gap-2">
// // //                   {interested.map((player) => (
// // //                     <span
// // //                       key={player.id}
// // //                       className="rounded-md bg-[#20212a] px-2.5 py-1.5 text-xs text-gray-300"
// // //                     >
// // //                       {player.name}
// // //                     </span>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div>
// // //               <p className="mb-2 text-xs font-medium text-gray-300">
// // //                 Accepted players ({accepted.length})
// // //               </p>

// // //               {accepted.length === 0 ? (
// // //                 <p className="text-xs text-gray-500">
// // //                   No accepted players yet.
// // //                 </p>
// // //               ) : (
// // //                 <div className="flex flex-wrap gap-2">
// // //                   {accepted.map((player) => (
// // //                     <span
// // //                       key={player.id}
// // //                       className="rounded-md border border-emerald-900 bg-emerald-950/40 px-2.5 py-1.5 text-xs text-emerald-300"
// // //                     >
// // //                       {player.name}
// // //                     </span>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {!createdByMe && !isExpired(challenge) && (
// // //           <div className="mt-5 flex flex-wrap gap-2 border-t border-[#292a31] pt-4">
// // //             <Button
// // //               secondary
// // //               disabled={alreadyInterested || alreadyAccepted}
// // //               onClick={() => expressInterest(challenge.id)}
// // //             >
// // //               {alreadyInterested
// // //                 ? "Interest registered"
// // //                 : "I'm interested"}
// // //             </Button>

// // //             <Button
// // //               disabled={alreadyAccepted}
// // //               onClick={() => acceptChallenge(challenge.id)}
// // //             >
// // //               {alreadyAccepted ? "Accepted" : "Accept challenge"}
// // //             </Button>
// // //           </div>
// // //         )}

// // //         {activity && createdByMe && (
// // //           <p className="mt-4 border-t border-[#292a31] pt-3 text-xs text-gray-500">
// // //             Your challenge · {interested.length} interested ·{" "}
// // //             {accepted.length} accepted
// // //           </p>
// // //         )}
// // //       </Card>
// // //     );
// // //   };

// // //   const TournamentCard = ({ tournament }) => {
// // //     const participants = tournament.participants || [];
// // //     const isHost = tournament.hostId === currentUser.id;
// // //     const isJoined = participants.some(
// // //       (player) => player.id === currentUser.id
// // //     );

// // //     return (
// // //       <Card className="p-5">
// // //         <div className="flex flex-wrap items-start justify-between gap-3">
// // //           <div>
// // //             <h3 className="font-medium text-white">{tournament.name}</h3>
// // //             <p className="mt-1 text-xs text-gray-500">
// // //               Hosted by {tournament.host}
// // //             </p>
// // //           </div>

// // //           <span className="rounded-md border border-[#30313a] px-2.5 py-1 text-xs text-gray-300">
// // //             {tournament.status}
// // //           </span>
// // //         </div>

// // //         <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-gray-400 sm:grid-cols-2">
// // //           <p className="flex items-center gap-2">
// // //             <CalendarDays size={15} />
// // //             {formatDate(tournament.date)}
// // //           </p>
// // //           <p className="flex items-center gap-2">
// // //             <Users size={15} />
// // //             {tournament.teams} teams
// // //           </p>
// // //           <p className="flex items-center gap-2 sm:col-span-2">
// // //             <MapPin size={15} />
// // //             {tournament.location}
// // //           </p>
// // //         </div>

// // //         <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#292a31] pt-4">
// // //           <p className="text-xs text-gray-500">
// // //             {participants.length} interested players
// // //           </p>

// // //           {!isHost && (
// // //             <Button
// // //               secondary
// // //               disabled={isJoined}
// // //               onClick={() => joinTournament(tournament.id)}
// // //             >
// // //               {isJoined ? "Interest registered" : "I'm interested"}
// // //             </Button>
// // //           )}
// // //         </div>

// // //         {isHost && (
// // //           <div className="mt-4 border-t border-[#292a31] pt-4">
// // //             <p className="mb-2 text-xs font-medium text-gray-300">
// // //               Interested participants
// // //             </p>
// // //             {participants.length === 0 ? (
// // //               <p className="text-xs text-gray-500">
// // //                 No participants yet.
// // //               </p>
// // //             ) : (
// // //               <div className="flex flex-wrap gap-2">
// // //                 {participants.map((player) => (
// // //                   <span
// // //                     key={player.id}
// // //                     className="rounded-md bg-[#20212a] px-2.5 py-1.5 text-xs text-gray-300"
// // //                   >
// // //                     {player.name}
// // //                   </span>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}
// // //       </Card>
// // //     );
// // //   };

// // //   const renderActivity = () => (
// // //     <>
// // //       <SectionTitle
// // //         eyebrow="Your workspace"
// // //         title="My Activities"
// // //         description="Track your challenges, player requests and tournaments in one place."
// // //         action={
// // //           <Button onClick={() => setShowChallengeForm(true)}>
// // //             <Plus size={16} />
// // //             Create challenge
// // //           </Button>
// // //         }
// // //       />

// // //       <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
// // //         {[
// // //           {
// // //             label: "My challenges",
// // //             value: myCreatedChallenges.length,
// // //             icon: Swords,
// // //           },
// // //           {
// // //             label: "Interested players",
// // //             value: myCreatedChallenges.reduce(
// // //               (sum, challenge) =>
// // //                 sum + (challenge.interested?.length || 0),
// // //               0
// // //             ),
// // //             icon: Users,
// // //           },
// // //           {
// // //             label: "Accepted matches",
// // //             value: myAcceptedChallenges.length,
// // //             icon: Activity,
// // //           },
// // //           {
// // //             label: "My tournaments",
// // //             value: myCreatedTournaments.length,
// // //             icon: Trophy,
// // //           },
// // //         ].map((stat) => (
// // //           <Card key={stat.label} className="p-4 sm:p-5">
// // //             <div className="flex items-center justify-between gap-2">
// // //               <p className="text-xs text-gray-400 sm:text-sm">
// // //                 {stat.label}
// // //               </p>
// // //               <stat.icon size={17} className="text-gray-500" />
// // //             </div>
// // //             <p className="mt-4 text-2xl font-semibold text-white">
// // //               {stat.value}
// // //             </p>
// // //           </Card>
// // //         ))}
// // //       </div>

// // //       <div className="mb-8">
// // //         <div className="mb-4 flex items-center justify-between gap-3">
// // //           <h3 className="font-semibold text-white">Challenges created by you</h3>
// // //           <span className="text-xs text-gray-500">
// // //             {myCreatedChallenges.length} total
// // //           </span>
// // //         </div>

// // //         {myCreatedChallenges.length === 0 ? (
// // //           <EmptyState
// // //             title="No challenges created"
// // //             description="Create a cricket challenge and track who is interested and who accepts it."
// // //             action={
// // //               <Button onClick={() => setShowChallengeForm(true)}>
// // //                 <Plus size={16} />
// // //                 Create challenge
// // //               </Button>
// // //             }
// // //           />
// // //         ) : (
// // //           <div className="grid gap-4 lg:grid-cols-2">
// // //             {myCreatedChallenges.map((challenge) => (
// // //               <ChallengeCard
// // //                 key={challenge.id}
// // //                 challenge={challenge}
// // //                 activity
// // //               />
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="mb-8">
// // //         <h3 className="mb-4 font-semibold text-white">
// // //           Challenges you have accepted
// // //         </h3>

// // //         {myAcceptedChallenges.length === 0 ? (
// // //           <p className="rounded-lg border border-[#292a31] bg-[#111217] p-5 text-sm text-gray-500">
// // //             Challenges you accept will appear here.
// // //           </p>
// // //         ) : (
// // //           <div className="grid gap-4 lg:grid-cols-2">
// // //             {myAcceptedChallenges.map((challenge) => (
// // //               <ChallengeCard
// // //                 key={challenge.id}
// // //                 challenge={challenge}
// // //                 activity
// // //               />
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="mb-8">
// // //         <h3 className="mb-4 font-semibold text-white">
// // //           Your tournament activity
// // //         </h3>

// // //         {myUpcomingTournaments.length === 0 ? (
// // //           <p className="rounded-lg border border-[#292a31] bg-[#111217] p-5 text-sm text-gray-500">
// // //             Tournaments you create or join will appear here.
// // //           </p>
// // //         ) : (
// // //           <div className="grid gap-4 lg:grid-cols-2">
// // //             {myUpcomingTournaments.map((tournament) => (
// // //               <TournamentCard key={tournament.id} tournament={tournament} />
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );

// // //   const renderPlayers = () => (
// // //     <>
// // //       <SectionTitle
// // //         eyebrow="Player directory"
// // //         title="Players"
// // //         description="Find cricket players across branches, academic years and playing roles."
// // //       />

// // //       <Card className="mb-5 p-4">
// // //         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
// // //           <div className="relative xl:col-span-1">
// // //             <Search
// // //               size={16}
// // //               className="absolute left-3 top-3.5 text-gray-500"
// // //             />
// // //             <input
// // //               value={search}
// // //               onChange={(event) => setSearch(event.target.value)}
// // //               placeholder="Search players..."
// // //               className="w-full rounded-lg border border-[#30313a] bg-[#0b0c10] py-2.5 pl-9 pr-3 text-sm text-white outline-none focus:border-emerald-500"
// // //             />
// // //           </div>

// // //           <select
// // //             value={branchFilter}
// // //             onChange={(event) => setBranchFilter(event.target.value)}
// // //             className="rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-gray-300 outline-none"
// // //           >
// // //             {[
// // //               "All branches",
// // //               ...new Set(players.map((player) => player.branch)),
// // //             ].map((branch) => (
// // //               <option key={branch}>{branch}</option>
// // //             ))}
// // //           </select>

// // //           <select
// // //             value={roleFilter}
// // //             onChange={(event) => setRoleFilter(event.target.value)}
// // //             className="rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-gray-300 outline-none"
// // //           >
// // //             {[
// // //               "All roles",
// // //               "Batter",
// // //               "Bowler",
// // //               "All-rounder",
// // //               "Wicket-keeper",
// // //             ].map((role) => (
// // //               <option key={role}>{role}</option>
// // //             ))}
// // //           </select>

// // //           <select
// // //             value={yearFilter}
// // //             onChange={(event) => setYearFilter(event.target.value)}
// // //             className="rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-gray-300 outline-none"
// // //           >
// // //             {[
// // //               "All years",
// // //               "1st Year",
// // //               "2nd Year",
// // //               "3rd Year",
// // //               "4th Year",
// // //             ].map((year) => (
// // //               <option key={year}>{year}</option>
// // //             ))}
// // //           </select>
// // //         </div>
// // //       </Card>

// // //       <div className="mb-4 flex items-center justify-between">
// // //         <p className="text-sm text-gray-400">
// // //           {filteredPlayers.length} players found
// // //         </p>
// // //       </div>

// // //       {filteredPlayers.length === 0 ? (
// // //         <EmptyState
// // //           title="No players found"
// // //           description="Try changing your search or filters."
// // //         />
// // //       ) : (
// // //         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
// // //           {filteredPlayers.map((player) => (
// // //             <PlayerCard key={player.id} player={player} />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </>
// // //   );

// // //   const renderChallenges = () => (
// // //     <>
// // //       <SectionTitle
// // //         eyebrow="Match coordination"
// // //         title="Challenges & Requests"
// // //         description="Create a match challenge, accept an existing match, or express interest in playing."
// // //         action={
// // //           <Button onClick={() => setShowChallengeForm(true)}>
// // //             <Plus size={16} />
// // //             Create challenge
// // //           </Button>
// // //         }
// // //       />

// // //       <div className="mb-5 flex flex-wrap gap-2">
// // //         <span className="rounded-md border border-[#30313a] bg-[#15161c] px-3 py-2 text-xs text-gray-300">
// // //           {openChallenges.length} open challenges
// // //         </span>
// // //         <span className="rounded-md border border-[#30313a] bg-[#15161c] px-3 py-2 text-xs text-gray-300">
// // //           {myInterests.length} requests you are interested in
// // //         </span>
// // //       </div>

// // //       {openChallenges.length === 0 ? (
// // //         <EmptyState
// // //           title="No open challenges"
// // //           description="Create a challenge to invite other cricket players."
// // //           action={
// // //             <Button onClick={() => setShowChallengeForm(true)}>
// // //               <Plus size={16} />
// // //               Create challenge
// // //             </Button>
// // //           }
// // //         />
// // //       ) : (
// // //         <div className="grid gap-4 lg:grid-cols-2">
// // //           {openChallenges.map((challenge) => (
// // //             <ChallengeCard key={challenge.id} challenge={challenge} />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </>
// // //   );

// // //   const renderCommunity = () => (
// // //     <>
// // //       <SectionTitle
// // //         eyebrow="Cricket community"
// // //         title="Community"
// // //         description="Discuss cricket, find practice partners and coordinate campus matches."
// // //       />

// // //       <Card className="overflow-hidden">
// // //         <div className="flex items-center justify-between border-b border-[#292a31] px-5 py-4">
// // //           <div>
// // //             <h3 className="font-medium text-white">Cricket Community</h3>
// // //             <p className="mt-1 text-xs text-gray-500">
// // //               Messages automatically expire after 24 hours in this demo.
// // //             </p>
// // //           </div>
// // //           <MessageCircle size={20} className="text-gray-400" />
// // //         </div>

// // //         <div className="flex min-h-[350px] flex-col gap-4 p-5">
// // //           {visibleMessages.length === 0 ? (
// // //             <div className="m-auto text-center">
// // //               <MessageCircle
// // //                 size={28}
// // //                 className="mx-auto mb-3 text-gray-600"
// // //               />
// // //               <p className="text-sm text-gray-400">
// // //                 No recent messages. Start a conversation.
// // //               </p>
// // //             </div>
// // //           ) : (
// // //             visibleMessages.map((item) => (
// // //               <div key={item.id} className="max-w-2xl">
// // //                 <p className="mb-1 text-xs font-medium text-gray-400">
// // //                   {item.author}
// // //                 </p>
// // //                 <div className="inline-block rounded-xl border border-[#30313a] bg-[#191a21] px-4 py-3 text-sm text-gray-200">
// // //                   {item.text}
// // //                 </div>
// // //                 <p className="mt-1 text-[10px] text-gray-600">
// // //                   {new Date(item.time).toLocaleTimeString("en-IN", {
// // //                     hour: "2-digit",
// // //                     minute: "2-digit",
// // //                   })}
// // //                 </p>
// // //               </div>
// // //             ))
// // //           )}
// // //         </div>

// // //         <form
// // //           onSubmit={sendMessage}
// // //           className="flex gap-2 border-t border-[#292a31] p-4"
// // //         >
// // //           <input
// // //             value={message}
// // //             onChange={(event) => setMessage(event.target.value)}
// // //             placeholder="Write a message..."
// // //             maxLength={500}
// // //             className="min-w-0 flex-1 rounded-lg border border-[#30313a] bg-[#0b0c10] px-4 py-3 text-sm text-white outline-none focus:border-emerald-500"
// // //           />
// // //           <Button type="submit">Send</Button>
// // //         </form>
// // //       </Card>
// // //     </>
// // //   );

// // //   const renderTournaments = () => (
// // //     <>
// // //       <SectionTitle
// // //         eyebrow="Competition"
// // //         title="Tournaments"
// // //         description="Explore upcoming cricket tournaments and register your interest."
// // //         action={
// // //           ["3rd Year", "4th Year"].includes(currentUser.year) ? (
// // //             <Button onClick={() => setShowTournamentForm(true)}>
// // //               <Plus size={16} />
// // //               Create tournament
// // //             </Button>
// // //           ) : null
// // //         }
// // //       />

// // //       {!["3rd Year", "4th Year"].includes(currentUser.year) && (
// // //         <p className="mb-5 rounded-lg border border-[#30313a] bg-[#111217] p-4 text-sm text-gray-400">
// // //           Tournament creation is available to third- and fourth-year students.
// // //           You can still view tournaments and express interest.
// // //         </p>
// // //       )}

// // //       {tournaments.length === 0 ? (
// // //         <EmptyState
// // //           title="No tournaments yet"
// // //           description="Upcoming cricket tournaments will appear here."
// // //         />
// // //       ) : (
// // //         <div className="grid gap-4 lg:grid-cols-2">
// // //           {tournaments
// // //             .slice()
// // //             .sort((a, b) => a.date.localeCompare(b.date))
// // //             .map((tournament) => (
// // //               <TournamentCard
// // //                 key={tournament.id}
// // //                 tournament={tournament}
// // //               />
// // //             ))}
// // //         </div>
// // //       )}
// // //     </>
// // //   );

// // //   const renderContent = () => {
// // //     switch (activeTab) {
// // //       case "activity":
// // //         return renderActivity();
// // //       case "players":
// // //         return renderPlayers();
// // //       case "challenges":
// // //         return renderChallenges();
// // //       case "community":
// // //         return renderCommunity();
// // //       case "tournaments":
// // //         return renderTournaments();
// // //       default:
// // //         return renderActivity();
// // //     }
// // //   };

// // //   const Modal = ({ title, onClose, children }) => (
// // //     <div
// // //       className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
// // //       onMouseDown={(event) => {
// // //         if (event.target === event.currentTarget) onClose();
// // //       }}
// // //     >
// // //       <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#30313a] bg-[#111217]">
// // //         <div className="flex items-center justify-between border-b border-[#292a31] px-5 py-4">
// // //           <h3 className="font-semibold text-white">{title}</h3>
// // //           <button
// // //             type="button"
// // //             onClick={onClose}
// // //             className="rounded-md p-2 text-gray-400 hover:bg-[#20212a] hover:text-white"
// // //             aria-label="Close"
// // //           >
// // //             <X size={18} />
// // //           </button>
// // //         </div>
// // //         <div className="p-5">{children}</div>
// // //       </div>
// // //     </div>
// // //   );

// // //   const FormField = ({ label, children }) => (
// // //     <label className="block">
// // //       <span className="mb-2 block text-sm text-gray-300">{label}</span>
// // //       {children}
// // //     </label>
// // //   );

// // //   const inputClass =
// // //     "w-full rounded-lg border border-[#30313a] bg-[#0b0c10] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500";

// // //   return (
// // //     <div className="min-h-screen bg-[#0b0c10] text-white">
// // //       {/* Minimal top navigation */}
// // //       <header className="sticky top-0 z-30 border-b border-[#25262d] bg-[#0b0c10]">
// // //         <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
// // //           <div className="flex min-w-0 items-center gap-2 text-sm">
// // //             <span className="truncate text-gray-400">Home</span>
// // //             <ChevronRight size={15} className="shrink-0 text-gray-600" />
// // //             <span className="font-medium text-white">Cricket</span>
// // //             <ChevronRight size={15} className="shrink-0 text-gray-600" />
// // //             <span className="hidden truncate text-emerald-400 sm:inline">
// // //               {TABS.find((tab) => tab.id === activeTab)?.label}
// // //             </span>
// // //           </div>

// // //           <div className="flex items-center gap-3">
// // //             <button
// // //               type="button"
// // //               onClick={() =>
// // //                 setNotificationsOpen((previous) => !previous)
// // //               }
// // //               className="relative rounded-lg border border-[#292a31] bg-[#111217] p-2.5 text-gray-300 transition hover:bg-[#191a21]"
// // //               aria-label="Notifications"
// // //             >
// // //               <Bell size={18} />
// // //               {myInterests.length + myAcceptedChallenges.length > 0 && (
// // //                 <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9px] font-bold text-black">
// // //                   {myInterests.length + myAcceptedChallenges.length}
// // //                 </span>
// // //               )}
// // //             </button>

// // //             <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#353640] bg-[#20212a] text-xs font-semibold text-emerald-400">
// // //               {currentUser.name
// // //                 .split(" ")
// // //                 .map((part) => part[0])
// // //                 .join("")
// // //                 .slice(0, 2)}
// // //             </div>
// // //           </div>

// // //           {notificationsOpen && (
// // //             <div className="absolute right-4 top-14 w-[min(340px,calc(100vw-32px))] rounded-xl border border-[#30313a] bg-[#111217] p-4 shadow-2xl">
// // //               <div className="mb-3 flex items-center justify-between">
// // //                 <h3 className="font-medium text-white">Notifications</h3>
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setNotificationsOpen(false)}
// // //                   aria-label="Close notifications"
// // //                   className="text-gray-400 hover:text-white"
// // //                 >
// // //                   <X size={16} />
// // //                 </button>
// // //               </div>

// // //               {myInterests.length === 0 &&
// // //               myAcceptedChallenges.length === 0 ? (
// // //                 <p className="py-4 text-sm text-gray-500">
// // //                   No new notifications.
// // //                 </p>
// // //               ) : (
// // //                 <div className="space-y-3 text-sm text-gray-300">
// // //                   {myInterests.map((challenge) => (
// // //                     <p key={challenge.id}>
// // //                       You expressed interest in {challenge.title}.
// // //                     </p>
// // //                   ))}
// // //                   {myAcceptedChallenges.map((challenge) => (
// // //                     <p key={challenge.id}>
// // //                       You accepted {challenge.title}.
// // //                     </p>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </header>

// // //       <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
// // //         {/* Five simple horizontal navigation tabs */}
// // //         <nav
// // //           aria-label="Cricket sections"
// // //           className="mb-8 grid grid-cols-2 gap-2 rounded-xl border border-[#25262d] bg-[#111217] p-2 sm:grid-cols-3 lg:grid-cols-5"
// // //         >
// // //           {TABS.map((tab) => {
// // //             const Icon = tab.icon;
// // //             const selected = activeTab === tab.id;

// // //             return (
// // //               <button
// // //                 key={tab.id}
// // //                 type="button"
// // //                 onClick={() => setActiveTab(tab.id)}
// // //                 aria-current={selected ? "page" : undefined}
// // //                 className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition ${
// // //                   selected
// // //                     ? "bg-[#20212a] text-emerald-400"
// // //                     : "text-gray-400 hover:bg-[#191a21] hover:text-gray-100"
// // //                 }`}
// // //               >
// // //                 <Icon size={17} />
// // //                 <span>{tab.label}</span>

// // //                 {tab.id === "challenges" && openChallenges.length > 0 && (
// // //                   <span className="rounded-md bg-[#30313a] px-1.5 py-0.5 text-[10px] text-gray-200">
// // //                     {openChallenges.length}
// // //                   </span>
// // //                 )}
// // //               </button>
// // //             );
// // //           })}
// // //         </nav>

// // //         {/* Current section */}
// // //         <section key={activeTab} className="min-w-0">
// // //           {renderContent()}
// // //         </section>

// // //         <footer className="mt-12 border-t border-[#25262d] pt-5 text-xs text-gray-600">
// // //           BIT Connect · Cricket
// // //         </footer>
// // //       </main>

// // //       {/* Create challenge modal */}
// // //       {showChallengeForm && (
// // //         <Modal
// // //           title="Create a cricket challenge"
// // //           onClose={() => setShowChallengeForm(false)}
// // //         >
// // //           <form onSubmit={createChallenge} className="space-y-4">
// // //             <FormField label="Challenge title">
// // //               <input
// // //                 required
// // //                 maxLength={100}
// // //                 value={challengeForm.title}
// // //                 onChange={(event) =>
// // //                   setChallengeForm({
// // //                     ...challengeForm,
// // //                     title: event.target.value,
// // //                   })
// // //                 }
// // //                 placeholder="e.g. Friendly cricket match"
// // //                 className={inputClass}
// // //               />
// // //             </FormField>

// // //             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// // //               <FormField label="Match date">
// // //                 <input
// // //                   required
// // //                   type="date"
// // //                   min={new Date().toLocaleDateString("en-CA")}
// // //                   value={challengeForm.date}
// // //                   onChange={(event) =>
// // //                     setChallengeForm({
// // //                       ...challengeForm,
// // //                       date: event.target.value,
// // //                     })
// // //                   }
// // //                   className={inputClass}
// // //                 />
// // //               </FormField>

// // //               <FormField label="Match time">
// // //                 <input
// // //                   required
// // //                   type="time"
// // //                   value={challengeForm.time}
// // //                   onChange={(event) =>
// // //                     setChallengeForm({
// // //                       ...challengeForm,
// // //                       time: event.target.value,
// // //                     })
// // //                   }
// // //                   className={inputClass}
// // //                 />
// // //               </FormField>
// // //             </div>

// // //             <FormField label="Ground / location">
// // //               <input
// // //                 required
// // //                 maxLength={150}
// // //                 value={challengeForm.location}
// // //                 onChange={(event) =>
// // //                   setChallengeForm({
// // //                     ...challengeForm,
// // //                     location: event.target.value,
// // //                   })
// // //                 }
// // //                 placeholder="Enter the playing location"
// // //                 className={inputClass}
// // //               />
// // //             </FormField>

// // //             <FormField label="Number of overs">
// // //               <input
// // //                 required
// // //                 type="number"
// // //                 min="1"
// // //                 max="100"
// // //                 value={challengeForm.overs}
// // //                 onChange={(event) =>
// // //                   setChallengeForm({
// // //                     ...challengeForm,
// // //                     overs: event.target.value,
// // //                   })
// // //                 }
// // //                 className={inputClass}
// // //               />
// // //             </FormField>

// // //             <p className="text-xs leading-5 text-gray-500">
// // //               The challenge will be displayed until its scheduled match time.
// // //               Other users can express interest or accept the challenge.
// // //             </p>

// // //             <div className="flex justify-end gap-3 pt-2">
// // //               <Button
// // //                 secondary
// // //                 onClick={() => setShowChallengeForm(false)}
// // //               >
// // //                 Cancel
// // //               </Button>
// // //               <Button type="submit">Publish challenge</Button>
// // //             </div>
// // //           </form>
// // //         </Modal>
// // //       )}

// // //       {/* Create tournament modal */}
// // //       {showTournamentForm && (
// // //         <Modal
// // //           title="Create a cricket tournament"
// // //           onClose={() => setShowTournamentForm(false)}
// // //         >
// // //           <form onSubmit={createTournament} className="space-y-4">
// // //             <FormField label="Tournament name">
// // //               <input
// // //                 required
// // //                 maxLength={100}
// // //                 value={tournamentForm.name}
// // //                 onChange={(event) =>
// // //                   setTournamentForm({
// // //                     ...tournamentForm,
// // //                     name: event.target.value,
// // //                   })
// // //                 }
// // //                 placeholder="Enter tournament name"
// // //                 className={inputClass}
// // //               />
// // //             </FormField>

// // //             <FormField label="Tournament start date">
// // //               <input
// // //                 required
// // //                 type="date"
// // //                 min={new Date().toLocaleDateString("en-CA")}
// // //                 value={tournamentForm.date}
// // //                 onChange={(event) =>
// // //                   setTournamentForm({
// // //                     ...tournamentForm,
// // //                     date: event.target.value,
// // //                   })
// // //                 }
// // //                 className={inputClass}
// // //               />
// // //             </FormField>

// // //             <FormField label="Number of teams">
// // //               <input
// // //                 required
// // //                 type="number"
// // //                 min="2"
// // //                 max="64"
// // //                 value={tournamentForm.teams}
// // //                 onChange={(event) =>
// // //                   setTournamentForm({
// // //                     ...tournamentForm,
// // //                     teams: event.target.value,
// // //                   })
// // //                 }
// // //                 className={inputClass}
// // //               />
// // //             </FormField>

// // //             <FormField label="Playing location">
// // //               <input
// // //                 required
// // //                 maxLength={150}
// // //                 value={tournamentForm.location}
// // //                 onChange={(event) =>
// // //                   setTournamentForm({
// // //                     ...tournamentForm,
// // //                     location: event.target.value,
// // //                   })
// // //                 }
// // //                 placeholder="Enter ground or location"
// // //                 className={inputClass}
// // //               />
// // //             </FormField>

// // //             <div className="flex justify-end gap-3 pt-2">
// // //               <Button
// // //                 secondary
// // //                 onClick={() => setShowTournamentForm(false)}
// // //               >
// // //                 Cancel
// // //               </Button>
// // //               <Button type="submit">Create tournament</Button>
// // //             </div>
// // //           </form>
// // //         </Modal>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // 'use client';

// // import { useMemo, useState } from 'react';
// // import { Film, Gamepad2, Search, Plus, Users, MessageCircle, Compass, LayoutDashboard, ChevronRight, X, Send, ShieldCheck, ArrowLeft, Check, CalendarDays, MapPin, Clock3, Sparkles } from 'lucide-react';

// // const movieSeed = [
// //   {id:101,title:'Friday Movie Night',movie:'Interstellar',date:'2026-10-16',time:'6:30 PM',venue:'Campus common room',host:'Aman Kumar',genre:'Sci-fi',seats:8,joined:3,access:'Approval required',description:'A relaxed movie night. Bring snacks and your theories.',status:'Upcoming',requests:[],posts:[{id:1,author:'Aman Kumar',text:'Welcome! Comment if you have snack suggestions.',time:'10:10 AM'}]},
// //   {id:102,title:'Anime & Chill',movie:'Your Name',date:'2026-10-18',time:'5:00 PM',venue:'Hostel lounge',host:'Riya Singh',genre:'Anime',seats:10,joined:5,access:'Open',description:'Watch together, then discuss favourite scenes.',status:'Upcoming',requests:[],posts:[{id:2,author:'Riya Singh',text:'First-time anime watchers are welcome too!',time:'Yesterday'}]},
// //   {id:103,title:'Classic Cinema Club',movie:'3 Idiots',date:'2026-10-20',time:'7:00 PM',venue:'Online watch party',host:'Neha Kumari',genre:'Comedy / Drama',seats:12,joined:4,access:'Open',description:'A nostalgic watch and a conversation about college life.',status:'Upcoming',requests:[],posts:[{id:3,author:'Neha Kumari',text:'Drop your favourite quote from the movie.',time:'Mon'}]},
// // ];
// // const gameSeed = [
// //   {id:201,game:'Free Fire',title:'BIT Free Fire Squad',description:'Friendly matches, squad up, and meet players from across campus.',style:'Casual',access:'Open',members:12,capacity:20,tags:['Beginners welcome','Looking for players'],creator:'Aman Kumar',posts:[{id:11,author:'Aman Kumar',text:'Welcome! Introduce yourself and tell us what mode you play.',time:'10:20 AM'}]},
// //   {id:202,game:'Valorant',title:'Valorant Ranked Team',description:'Find teammates for coordinated ranked games and improve together.',style:'Competitive',access:'Approval required',members:8,capacity:10,tags:['Ranked','Teamwork'],creator:'Saurabh Verma',posts:[{id:21,author:'Saurabh Verma',text:'Share your preferred roles so we can build balanced teams.',time:'Yesterday'}]},
// //   {id:203,game:'BGMI / PUBG',title:'BGMI Chill Lobby',description:'A relaxed place to chat, play together, and find regular teammates.',style:'Both',access:'Open',members:16,capacity:50,tags:['Regular squad','Social'],creator:'Neha Kumari',posts:[{id:31,author:'Neha Kumari',text:'Keep it friendly. New players are welcome.',time:'Yesterday'}]},
// //   {id:204,game:'Chess',title:'BIT Chess Corner',description:'Talk openings, find practice partners, and share puzzles.',style:'Social',access:'Open',members:7,capacity:20,tags:['Practice','All levels'],creator:'Rohit Raj',posts:[{id:41,author:'Rohit Raj',text:'Post a puzzle or ask for a practice game.',time:'Mon'}]},
// // ];
// // const initialMovieChat = [{id:1,author:'BIT Connect',text:'Welcome to Movie Community! Discuss recommendations, genres, and upcoming campus watch plans respectfully.',time:'Pinned'}];

// // export default function EntertainmentPage() {
// //   const [zone,setZone] = useState('Movies');
// //   const [movieTab,setMovieTab] = useState('Explore plans');
// //   const [gameTab,setGameTab] = useState('Explore channels');
// //   const [movies,setMovies] = useState(movieSeed);
// //   const [games,setGames] = useState(gameSeed);
// //   const [movieJoined,setMovieJoined] = useState([102]);
// //   const [movieRequests,setMovieRequests] = useState({});
// //   const [gameJoined,setGameJoined] = useState([201,204]);
// //   const [gameRequests,setGameRequests] = useState({});
// //   const [activeMovie,setActiveMovie] = useState(null);
// //   const [activeGame,setActiveGame] = useState(null);
// //   const [search,setSearch] = useState('');
// //   const [filter,setFilter] = useState('All');
// //   const [showCreate,setShowCreate] = useState(false);
// //   const [notice,setNotice] = useState('');
// //   const [movieDraft,setMovieDraft] = useState({title:'',movie:'',date:'',time:'6:30 PM',venue:'Campus common room',genre:'Any',seats:'8',access:'Open',description:''});
// //   const [gameDraft,setGameDraft] = useState({game:'Free Fire',customGame:'',title:'',description:'',style:'Casual',access:'Open',capacity:'20',tags:'Beginners welcome, Looking for players'});
// //   const [movieChat,setMovieChat] = useState(initialMovieChat);
// //   const [movieChatDraft,setMovieChatDraft] = useState('');
// //   const [messageDraft,setMessageDraft] = useState('');
// //   const [activityFilter,setActivityFilter] = useState('All activity');
// //   const [activityTab,setActivityTab] = useState('My Activity');

// //   function notify(s){setNotice(s);setTimeout(()=>setNotice(''),2600)}
// //   const activeMovieData = movies.find(x=>x.id===activeMovie);
// //   const activeGameData = games.find(x=>x.id===activeGame);
// //   const filteredMovies = useMemo(()=>movies.filter(m=>`${m.title} ${m.movie} ${m.genre} ${m.description}`.toLowerCase().includes(search.toLowerCase()) && (filter==='All'||m.genre===filter)),[movies,search,filter]);
// //   const filteredGames = useMemo(()=>games.filter(g=>`${g.title} ${g.game} ${g.description} ${g.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()) && (filter==='All'||g.game===filter)),[games,search,filter]);

// //   function createMovie(e){e.preventDefault();if(!movieDraft.title.trim()||!movieDraft.movie.trim()||!movieDraft.date)return;const m={...movieDraft,id:Date.now(),host:'You',seats:Number(movieDraft.seats),joined:1,status:'Upcoming',requests:[],posts:[{id:Date.now()+1,author:'You',text:'Welcome! Use this discussion to coordinate the plan.',time:'Now'}]};setMovies(p=>[m,...p]);setMovieJoined(p=>[...p,m.id]);setShowCreate(false);setMovieDraft({title:'',movie:'',date:'',time:'6:30 PM',venue:'Campus common room',genre:'Any',seats:'8',access:'Open',description:''});setActiveMovie(m.id);notify('Movie plan created');}
// //   function joinMovie(m){if(movieJoined.includes(m.id)){setActiveMovie(m.id);return;}if(m.access==='Open'){setMovieJoined(p=>[...p,m.id]);setMovies(p=>p.map(x=>x.id===m.id?{...x,joined:x.joined+1}:x));notify('You joined this movie plan');setActiveMovie(m.id);}else{setMovieRequests(p=>({...p,[m.id]:true}));notify('Join request sent to the host');}}
// //   function sendMovieMessage(e){e.preventDefault();if(!messageDraft.trim()||!activeMovieData)return;setMovies(p=>p.map(m=>m.id===activeMovie?{...m,posts:[...m.posts,{id:Date.now(),author:'You',text:messageDraft.trim(),time:'Now'}]}:m));setMessageDraft('');}
// //   function sendCommunity(e){e.preventDefault();if(!movieChatDraft.trim())return;setMovieChat(p=>[...p,{id:Date.now(),author:'You',text:movieChatDraft.trim(),time:'Now'}]);setMovieChatDraft('');}
// //   function createGame(e){e.preventDefault();const game=gameDraft.game==='Other'?gameDraft.customGame.trim():gameDraft.game;if(!game||!gameDraft.title.trim())return;const c={id:Date.now(),game,title:gameDraft.title.trim(),description:gameDraft.description.trim(),style:gameDraft.style,access:gameDraft.access,members:1,capacity:gameDraft.capacity==='Unlimited'?null:Number(gameDraft.capacity),tags:gameDraft.tags.split(',').map(x=>x.trim()).filter(Boolean),creator:'You',posts:[{id:Date.now()+1,author:'You',text:'Welcome to the channel! Introduce yourself and start planning your games.',time:'Now'}]};setGames(p=>[c,...p]);setGameJoined(p=>[...p,c.id]);setShowCreate(false);setActiveGame(c.id);setGameTab('Explore channels');notify('Gaming channel created');setGameDraft({game:'Free Fire',customGame:'',title:'',description:'',style:'Casual',access:'Open',capacity:'20',tags:'Beginners welcome, Looking for players'});}
// //   function joinGame(c){if(gameJoined.includes(c.id)){setActiveGame(c.id);return;}if(c.access==='Open'){setGameJoined(p=>[...p,c.id]);setGames(p=>p.map(x=>x.id===c.id?{...x,members:x.members+1}:x));setActiveGame(c.id);notify('You joined the channel');}else{setGameRequests(p=>({...p,[c.id]:true}));notify('Join request sent to channel creator');}}
// //   function sendGameMessage(e){e.preventDefault();if(!messageDraft.trim()||!activeGameData)return;setGames(p=>p.map(c=>c.id===activeGame?{...c,posts:[...c.posts,{id:Date.now(),author:'You',text:messageDraft.trim(),time:'Now'}]}:c));setMessageDraft('');}
// //   function backToList(){setActiveMovie(null);setActiveGame(null);setMessageDraft('')}

// //   const myMoviePlans=movies.filter(m=>movieJoined.includes(m.id)||m.host==='You');
// //   const myGameChannels=games.filter(g=>gameJoined.includes(g.id)||g.creator==='You');
// //   const myPendingMovies=movies.filter(m=>movieRequests[m.id]&&!movieJoined.includes(m.id));
// //   const myPendingGames=games.filter(g=>gameRequests[g.id]&&!gameJoined.includes(g.id));
// //   const tabs = zone==='Movies' ? ['Explore plans','Movie Community','My Activity'] : ['Explore channels','My Activity'];
// //   const tab = zone==='Movies' ? movieTab : gameTab;
// //   const setTab = zone==='Movies' ? setMovieTab : setGameTab;

// //   return <main className="ent-shell"><style jsx global>{`
// //   *{box-sizing:border-box}body{margin:0;background:#080d18;color:#edf2fb;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.ent-shell{min-height:100vh;background:radial-gradient(ellipse at 80% -10%,#43348a26,transparent 42%),#080d18;color:#edf2fb;padding:24px 16px 44px}.ent-wrap{max-width:1180px;margin:auto}.ent-top{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:24px}.ent-brand{display:flex;align-items:center;gap:11px}.ent-logo{width:44px;height:44px;border-radius:14px;background:#7c5cff;display:grid;place-items:center}.ent-brand small{display:block;color:#8d9ab1;font-size:12px;margin-top:3px}.ent-pill{font-size:12px;border:1px solid #28354c;border-radius:999px;padding:8px 12px;color:#aebbd0;display:flex;align-items:center;gap:7px}.ent-hero{border:1px solid #253149;background:linear-gradient(120deg,#171e35,#101827 72%);border-radius:23px;padding:27px;display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:20px}.ent-eyebrow{font-size:11px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#b4a6ff}.ent-hero h1{font-size:clamp(27px,4vw,39px);letter-spacing:-.04em;line-height:1.12;margin:9px 0}.ent-hero p{color:#9eabc1;max-width:570px;line-height:1.65;margin:0;font-size:14px}.ent-btn,.ent-ghost,.ent-secondary{border:0;border-radius:10px;padding:11px 14px;font-size:12px;font-weight:750;display:inline-flex;align-items:center;justify-content:center;gap:7px;cursor:pointer;white-space:nowrap}.ent-btn{background:#8068ff;color:#fff}.ent-btn:hover{background:#927fff}.ent-secondary{background:#1a263a;color:#dbe5f5;border:1px solid #2b3a53}.ent-ghost{background:transparent;color:#aebbd0;border:1px solid #2a354a}.ent-zonebar{display:flex;gap:8px;margin:0 0 16px}.ent-zone{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:14px;border-radius:13px;background:#0e1624;border:1px solid #26334a;color:#aab7cb;font-weight:750;cursor:pointer}.ent-zone.active{background:#242044;border-color:#7d6bff;color:#eeeaff}.ent-nav{display:flex;gap:5px;border-bottom:1px solid #202b3e;margin-bottom:21px;overflow-x:auto}.ent-nav button{flex-shrink:0;background:transparent;border:0;border-bottom:2px solid transparent;color:#8593ab;padding:13px 15px;font-size:12px;font-weight:750;cursor:pointer;display:flex;align-items:center;gap:8px}.ent-nav button.active{color:#f2f4ff;border-bottom-color:#8a75ff}.ent-title{display:flex;align-items:end;justify-content:space-between;gap:12px;margin:0 0 16px}.ent-title h2{font-size:19px;margin:0 0 4px}.ent-title p,.ent-muted{font-size:12px;color:#8e9cb3;line-height:1.6;margin:0}.ent-tools{display:flex;gap:9px;flex-wrap:wrap;margin-bottom:17px}.ent-search{display:flex;align-items:center;gap:9px;background:#0f1726;border:1px solid #27344a;border-radius:11px;padding:0 12px;min-width:200px;flex:1}.ent-search input{width:100%;background:transparent;border:0;outline:0;color:#edf2fb;padding:12px 0;font-size:13px}.ent-select,.ent-field input,.ent-field textarea,.ent-field select{width:100%;background:#0c1422;border:1px solid #2b3850;color:#e8eef8;border-radius:9px;padding:10px 11px;font:inherit;font-size:12px;outline:none}.ent-select{width:auto;min-width:135px}.ent-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.ent-card,.ent-panel{border:1px solid #253149;background:linear-gradient(145deg,#111a2a,#0e1624);border-radius:16px;padding:18px;min-width:0}.ent-card{transition:border-color .15s}.ent-card:hover{border-color:#57508d}.ent-cardtop{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.ent-icon{width:42px;height:42px;border-radius:12px;background:#242344;color:#b8aaff;display:grid;place-items:center;flex-shrink:0}.ent-card h3{font-size:15px;margin:13px 0 6px}.ent-tag{font-size:10px;border:1px solid #2a354a;background:#141e2e;border-radius:7px;padding:5px 8px;color:#b6c2d5}.ent-tags{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0}.ent-badge{font-size:10px;padding:5px 8px;border-radius:7px;background:#16362e;color:#7be0bd;white-space:nowrap}.ent-badge.wait{background:#352c1b;color:#f3ca79}.ent-cardfoot{border-top:1px solid #202b3e;margin-top:14px;padding-top:13px;display:flex;align-items:center;justify-content:space-between;gap:10px}.ent-members{display:flex;align-items:center;gap:6px;color:#98a6bc;font-size:11px}.ent-empty{grid-column:1/-1;text-align:center;padding:42px 18px;border:1px dashed #2c3950;border-radius:15px;color:#9ba8bd}.ent-detailhead{display:flex;align-items:flex-start;gap:13px;margin-bottom:17px}.ent-detailhead h2{font-size:21px;margin:7px 0}.ent-post{background:#0d1523;border:1px solid #222e42;border-radius:12px;padding:13px;margin-top:9px}.ent-posthead{display:flex;justify-content:space-between;gap:10px;color:#cbd6e8;font-size:11px;font-weight:750;margin-bottom:7px}.ent-post p{margin:0;color:#aab7cb;font-size:13px;line-height:1.6;overflow-wrap:anywhere}.ent-compose{display:flex;gap:8px;margin-top:15px}.ent-compose input{flex:1;min-width:0;background:#0b1320;border:1px solid #29364d;border-radius:9px;padding:12px;color:#eef3fb;outline:none}.ent-mine{display:flex;flex-direction:column;gap:9px}.ent-mineitem{display:flex;align-items:center;justify-content:space-between;gap:13px;padding:14px;border:1px solid #253149;background:#101827;border-radius:12px}.ent-mineitem h3{margin:0 0 4px;font-size:13px}.ent-field{display:flex;flex-direction:column;gap:6px;margin-bottom:13px}.ent-field label{font-size:11px;color:#bdc9dc;font-weight:750}.ent-field textarea{resize:vertical;min-height:70px}.ent-formgrid{display:grid;grid-template-columns:1fr 1fr;gap:11px}.ent-choice{display:flex;flex-wrap:wrap;gap:7px}.ent-choice button{border:1px solid #2b3850;background:#0c1422;border-radius:8px;padding:8px 10px;color:#b8c4d7;font-size:11px;cursor:pointer}.ent-choice button.selected{border-color:#8975ff;color:#e3deff;background:#252044}.ent-modalback{position:fixed;inset:0;z-index:50;background:#030712bb;backdrop-filter:blur(7px);display:flex;align-items:center;justify-content:center;padding:15px}.ent-modal{width:min(620px,100%);max-height:90vh;overflow:auto;border:1px solid #34415a;background:#111a29;border-radius:18px;padding:22px;box-shadow:0 25px 90px #0008}.ent-modalhead{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:17px}.ent-modalhead h2{margin:0 0 5px;font-size:20px}.ent-toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:80;background:#e9e7ff;color:#21194d;padding:11px 16px;border-radius:11px;font-weight:750;font-size:12px;box-shadow:0 10px 35px #0006;max-width:calc(100% - 24px)}.ent-foot{margin-top:21px;color:#65748c;font-size:11px;line-height:1.6;display:flex;align-items:flex-start;gap:8px}
// //   @media(max-width:700px){.ent-shell{padding:15px 11px 32px}.ent-top{margin-bottom:17px}.ent-pill{display:none}.ent-hero{padding:20px;align-items:flex-start;flex-direction:column;border-radius:17px}.ent-hero .ent-btn{width:100%}.ent-zone{padding:12px 7px;font-size:12px}.ent-grid{grid-template-columns:1fr}.ent-search{flex-basis:100%}.ent-select{flex:1;min-width:0}.ent-formgrid{grid-template-columns:1fr;gap:0}.ent-card{padding:15px}.ent-nav button{padding:12px 10px}.ent-mineitem{align-items:flex-start}.ent-title{align-items:flex-start;flex-direction:column}.ent-modal{padding:17px}.ent-cardfoot{align-items:flex-start}.ent-btn,.ent-secondary,.ent-ghost{padding:10px 11px}}
// //   `}</style>
// //   <div className="ent-wrap">
// //     <header className="ent-top"><div className="ent-brand"><div className="ent-logo"><Sparkles size={22}/></div><div><strong style={{fontSize:17,letterSpacing:'-.03em'}}>BIT <span style={{color:'#b4a6ff'}}>Connect</span></strong><small>Entertainment · Meet through shared interests</small></div></div><div className="ent-pill"><ShieldCheck size={14}/> Campus community</div></header>
// //     <section className="ent-hero"><div><div className="ent-eyebrow">Find your people outside the classroom</div><h1>Watch together. Play together.</h1><p>Plan a movie night, discover a watch party, find teammates, or join a gaming community—all in one Entertainment section.</p></div><button className="ent-btn" onClick={()=>setShowCreate(true)}><Plus size={16}/>{zone==='Movies'?'Create movie plan':'Create gaming channel'}</button></section>
// //     <div className="ent-zonebar"><button className={`ent-zone ${zone==='Movies'?'active':''}`} onClick={()=>{setZone('Movies');backToList();setSearch('');setFilter('All')}}><Film size={19}/> Movie Zone</button><button className={`ent-zone ${zone==='Gaming'?'active':''}`} onClick={()=>{setZone('Gaming');backToList();setSearch('');setFilter('All')}}><Gamepad2 size={19}/> Gaming Zone</button></div>
// //     <nav className="ent-nav">{tabs.map(t=><button key={t} className={tab===t?'active':''} onClick={()=>{setTab(t);backToList()}}>{t==='Explore plans'||t==='Explore channels'?<Compass size={15}/>:t==='Movie Community'?<MessageCircle size={15}/>:<LayoutDashboard size={15}/>}{t}{t==='My Activity'&&<span className="ent-tag" style={{padding:'3px 6px'}}>{zone==='Movies'?myMoviePlans.length:myGameChannels.length}</span>}</button>)}</nav>

// //     {zone==='Movies' && activeMovieData ? <>
// //       <button className="ent-ghost" style={{marginBottom:13}} onClick={backToList}><ArrowLeft size={14}/> Back to movie plans</button>
// //       <section className="ent-panel"><div className="ent-detailhead"><div className="ent-icon"><Film size={22}/></div><div style={{flex:1,minWidth:0}}><div style={{display:'flex',gap:7,flexWrap:'wrap'}}><span className="ent-tag">{activeMovieData.genre}</span><span className={`ent-badge ${activeMovieData.access==='Open'?'':'wait'}`}>{activeMovieData.access==='Open'?'Open to join':'Host approval'}</span></div><h2>{activeMovieData.title}</h2><div className="ent-muted">Hosted by {activeMovieData.host} · {activeMovieData.joined} attending</div></div><button className="ent-ghost" onClick={backToList} aria-label="Close"><X size={15}/></button></div>
// //       <p className="ent-muted" style={{fontSize:13,marginBottom:14}}>{activeMovieData.description||'Join this plan to coordinate with other students.'}</p><div className="ent-tags"><span className="ent-tag"><Film size={11} style={{display:'inline',marginRight:4}}/>{activeMovieData.movie}</span><span className="ent-tag"><CalendarDays size={11} style={{display:'inline',marginRight:4}}/>{activeMovieData.date}</span><span className="ent-tag"><Clock3 size={11} style={{display:'inline',marginRight:4}}/>{activeMovieData.time}</span><span className="ent-tag"><MapPin size={11} style={{display:'inline',marginRight:4}}/>{activeMovieData.venue}</span></div>
// //       {!movieJoined.includes(activeMovieData.id)?<div className="ent-post"><p>{movieRequests[activeMovieData.id]?'Your request is pending with the host.':activeMovieData.access==='Open'?'Join this plan to coordinate with the group.':'The host reviews requests before you can participate in the plan discussion.'}</p><button className="ent-btn" style={{marginTop:11}} onClick={()=>joinMovie(activeMovieData)}>{movieRequests[activeMovieData.id]?'Request pending':activeMovieData.access==='Open'?'Join movie plan':'Request to join'}</button></div>:<><h3 style={{fontSize:14,margin:'20px 0 8px'}}>Plan discussion</h3>{activeMovieData.posts.map(p=><article className="ent-post" key={p.id}><div className="ent-posthead"><span>{p.author}</span><span className="ent-muted">{p.time}</span></div><p>{p.text}</p></article>)}<form className="ent-compose" onSubmit={sendMovieMessage}><input value={messageDraft} onChange={e=>setMessageDraft(e.target.value)} placeholder="Coordinate the plan…" aria-label="Plan message"/><button className="ent-btn" type="submit" aria-label="Send message"><Send size={15}/></button></form></>}
// //       </section>
// //     </> : zone==='Gaming' && activeGameData ? <>
// //       <button className="ent-ghost" style={{marginBottom:13}} onClick={backToList}><ArrowLeft size={14}/> Back to channels</button>
// //       <section className="ent-panel"><div className="ent-detailhead"><div className="ent-icon"><Gamepad2 size={22}/></div><div style={{flex:1,minWidth:0}}><div style={{display:'flex',gap:7,flexWrap:'wrap'}}><span className="ent-tag">{activeGameData.game}</span><span className={`ent-badge ${activeGameData.access==='Open'?'':'wait'}`}>{activeGameData.access==='Open'?'Open channel':'Approval required'}</span></div><h2>{activeGameData.title}</h2><div className="ent-muted">Created by {activeGameData.creator} · {activeGameData.members} members{activeGameData.capacity?` / ${activeGameData.capacity}`:''}</div></div><button className="ent-ghost" onClick={backToList} aria-label="Close"><X size={15}/></button></div><p className="ent-muted" style={{fontSize:13}}>{activeGameData.description}</p><div className="ent-tags">{activeGameData.tags.map(t=><span className="ent-tag" key={t}>{t}</span>)}</div>
// //       {!gameJoined.includes(activeGameData.id)?<div className="ent-post"><p>{gameRequests[activeGameData.id]?'Your request is pending.':activeGameData.access==='Open'?'Join this channel to participate in discussions.':'This channel requires creator approval.'}</p><button className="ent-btn" style={{marginTop:11}} onClick={()=>joinGame(activeGameData)}>{gameRequests[activeGameData.id]?'Request pending':activeGameData.access==='Open'?'Join channel':'Request to join'}</button></div>:<><h3 style={{fontSize:14,margin:'20px 0 8px'}}>Channel discussion</h3>{activeGameData.posts.map(p=><article className="ent-post" key={p.id}><div className="ent-posthead"><span>{p.author}</span><span className="ent-muted">{p.time}</span></div><p>{p.text}</p></article>)}<form className="ent-compose" onSubmit={sendGameMessage}><input value={messageDraft} onChange={e=>setMessageDraft(e.target.value)} placeholder="Write a message…" aria-label="Channel message"/><button className="ent-btn" type="submit" aria-label="Send message"><Send size={15}/></button></form></>}
// //       </section>
// //     </> : zone==='Movies' && movieTab==='Movie Community' ? <>
// //       <div className="ent-title"><div><h2>Movie Community</h2><p>Share recommendations, discuss genres, and find students with similar tastes.</p></div></div><section className="ent-panel"><div className="ent-tags"><span className="ent-tag">Recommendations</span><span className="ent-tag">Watch parties</span><span className="ent-tag">Reviews & discussion</span></div>{movieChat.map(p=><article className="ent-post" key={p.id}><div className="ent-posthead"><span>{p.author}</span><span className="ent-muted">{p.time}</span></div><p>{p.text}</p></article>)}<form className="ent-compose" onSubmit={sendCommunity}><input value={movieChatDraft} onChange={e=>setMovieChatDraft(e.target.value)} placeholder="Recommend a movie or start a discussion…" aria-label="Movie community message"/><button className="ent-btn" type="submit" aria-label="Post"><Send size={15}/></button></form></section>
// //     </> : zone==='Movies' && movieTab==='My Activity' || zone==='Gaming' && gameTab==='My Activity' ? <>
// //       <div className="ent-title"><div><h2>My Activity</h2><p>Your created plans/channels, joined spaces, and pending requests.</p></div></div>
// //       {zone==='Movies'?<div className="ent-mine">{myMoviePlans.map(m=><div className="ent-mineitem" key={m.id}><div style={{display:'flex',gap:11,alignItems:'center',minWidth:0}}><div className="ent-icon"><Film size={19}/></div><div><h3>{m.title}</h3><div className="ent-muted">{m.movie} · {m.date} at {m.time} · {m.host==='You'?'Created by you':'Joined plan'}</div></div></div><button className="ent-secondary" onClick={()=>setActiveMovie(m.id)}>Open <ChevronRight size={14}/></button></div>)}{myPendingMovies.map(m=><div className="ent-mineitem" key={m.id}><div><h3>{m.title}</h3><div className="ent-muted">{m.movie} · Join request sent</div></div><span className="ent-badge wait">Pending</span></div>)}{myMoviePlans.length===0&&myPendingMovies.length===0&&<div className="ent-empty">No activity yet. Browse movie plans or create your own.</div>}<button className="ent-btn" style={{alignSelf:'flex-start',marginTop:5}} onClick={()=>{setMovieTab('Explore plans');setShowCreate(true)}}><Plus size={15}/> Create movie plan</button></div>:<div className="ent-mine">{myGameChannels.map(g=><div className="ent-mineitem" key={g.id}><div style={{display:'flex',gap:11,alignItems:'center',minWidth:0}}><div className="ent-icon"><Gamepad2 size={19}/></div><div><h3>{g.title}</h3><div className="ent-muted">{g.game} · {g.members} members · {g.creator==='You'?'Created by you':'Joined channel'}</div></div></div><button className="ent-secondary" onClick={()=>setActiveGame(g.id)}>Open <ChevronRight size={14}/></button></div>)}{myPendingGames.map(g=><div className="ent-mineitem" key={g.id}><div><h3>{g.title}</h3><div className="ent-muted">{g.game} · Join request sent</div></div><span className="ent-badge wait">Pending</span></div>)}{myGameChannels.length===0&&myPendingGames.length===0&&<div className="ent-empty">No activity yet. Join or create a gaming channel.</div>}<button className="ent-btn" style={{alignSelf:'flex-start',marginTop:5}} onClick={()=>{setGameTab('Explore channels');setShowCreate(true)}}><Plus size={15}/> Create gaming channel</button></div>}
// //     </> : <>
// //       <div className="ent-title"><div><h2>{zone==='Movies'?'Discover movie plans':'Explore gaming channels'}</h2><p>{zone==='Movies'?'Create a plan or join an existing campus movie meetup.':'Find your game, join a channel, and meet your next teammates.'}</p></div><span className="ent-muted">{zone==='Movies'?filteredMovies.length:filteredGames.length} results</span></div>
// //       <div className="ent-tools"><label className="ent-search"><Search size={16} color="#8291aa"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={zone==='Movies'?'Search movie, plan, or genre…':'Search game or channel…'}/></label>{zone==='Movies'?<select className="ent-select" value={filter} onChange={e=>setFilter(e.target.value)} aria-label="Filter genre">{['All','Sci-fi','Anime','Comedy / Drama','Action','Horror','Any'].map(x=><option key={x}>{x}</option>)}</select>:<select className="ent-select" value={filter} onChange={e=>setFilter(e.target.value)} aria-label="Filter game">{['All','Free Fire','BGMI / PUBG','Valorant','Minecraft','Chess','Other'].map(x=><option key={x}>{x}</option>)}</select>}<button className="ent-btn" onClick={()=>setShowCreate(true)}><Plus size={15}/>{zone==='Movies'?'Create plan':'Create channel'}</button></div>
// //       <div className="ent-grid">{zone==='Movies'?filteredMovies.map(m=><article className="ent-card" key={m.id}><div className="ent-cardtop"><div className="ent-icon"><Film size={21}/></div><span className={`ent-badge ${m.access==='Open'?'':'wait'}`}>{m.access==='Open'?'Open to join':'Host approval'}</span></div><h3>{m.title}</h3><div className="ent-muted">{m.movie} · {m.genre}</div><p className="ent-muted" style={{marginTop:9}}>{m.description}</p><div className="ent-tags"><span className="ent-tag"><CalendarDays size={11} style={{display:'inline',marginRight:4}}/>{m.date}</span><span className="ent-tag"><Clock3 size={11} style={{display:'inline',marginRight:4}}/>{m.time}</span></div><div className="ent-muted"><MapPin size={12} style={{display:'inline',marginRight:4}}/>{m.venue}</div><div className="ent-cardfoot"><span className="ent-members"><Users size={14}/>{m.joined} attending · {m.seats} spots max</span><button className="ent-secondary" onClick={()=>setActiveMovie(m.id)}>View plan <ChevronRight size={14}/></button></div></article>):filteredGames.map(g=><article className="ent-card" key={g.id}><div className="ent-cardtop"><div className="ent-icon"><Gamepad2 size={21}/></div><span className={`ent-badge ${g.access==='Open'?'':'wait'}`}>{g.access==='Open'?'Open':'Approval required'}</span></div><h3>{g.title}</h3><div className="ent-muted">{g.game} · {g.style}</div><p className="ent-muted" style={{marginTop:9}}>{g.description}</p><div className="ent-tags">{g.tags.slice(0,3).map(t=><span className="ent-tag" key={t}>{t}</span>)}</div><div className="ent-cardfoot"><span className="ent-members"><Users size={14}/>{g.members}{g.capacity?` / ${g.capacity}`:''} members</span><button className="ent-secondary" onClick={()=>setActiveGame(g.id)}>View channel <ChevronRight size={14}/></button></div></article>)}{(zone==='Movies'?filteredMovies:filteredGames).length===0&&<div className="ent-empty"><Search size={24}/><p>No results found. Try another search or clear the filter.</p><button className="ent-ghost" onClick={()=>{setSearch('');setFilter('All')}}>Clear filters</button></div>}</div>
// //     </>}
// //     <div className="ent-foot"><ShieldCheck size={15} style={{flexShrink:0,marginTop:1}}/><span>Designed for a campus community. Only share details you are comfortable sharing. This is a front-end prototype: plans, messages, membership, and requests currently live in React state and are not saved to a database or shared with other users yet.</span></div>
// //   </div>
// //   {showCreate&&<div className="ent-modalback" onMouseDown={e=>{if(e.target===e.currentTarget)setShowCreate(false)}}><section className="ent-modal" role="dialog" aria-modal="true" aria-labelledby="create-title"><div className="ent-modalhead"><div><h2 id="create-title">{zone==='Movies'?'Create a movie plan':'Create a gaming channel'}</h2><div className="ent-muted">{zone==='Movies'?'Set the details so other students can join.':'Start a space for players with similar interests.'}</div></div><button className="ent-ghost" onClick={()=>setShowCreate(false)} aria-label="Close form"><X size={16}/></button></div>
// //     {zone==='Movies'?<form onSubmit={createMovie}><div className="ent-formgrid"><div className="ent-field"><label htmlFor="plan-title">Plan name *</label><input id="plan-title" required maxLength={60} value={movieDraft.title} onChange={e=>setMovieDraft({...movieDraft,title:e.target.value})} placeholder="e.g. Friday Movie Night"/></div><div className="ent-field"><label htmlFor="movie-name">Movie / show *</label><input id="movie-name" required value={movieDraft.movie} onChange={e=>setMovieDraft({...movieDraft,movie:e.target.value})} placeholder="What are you watching?"/></div><div className="ent-field"><label htmlFor="movie-date">Date *</label><input id="movie-date" type="date" required min="2026-10-11" value={movieDraft.date} onChange={e=>setMovieDraft({...movieDraft,date:e.target.value})}/></div><div className="ent-field"><label htmlFor="movie-time">Start time</label><input id="movie-time" value={movieDraft.time} onChange={e=>setMovieDraft({...movieDraft,time:e.target.value})} placeholder="e.g. 6:30 PM"/></div><div className="ent-field"><label htmlFor="movie-venue">Place / platform</label><input id="movie-venue" value={movieDraft.venue} onChange={e=>setMovieDraft({...movieDraft,venue:e.target.value})} placeholder="Campus lounge / online"/></div><div className="ent-field"><label htmlFor="movie-seats">Maximum attendees</label><input id="movie-seats" type="number" min="2" max="100" value={movieDraft.seats} onChange={e=>setMovieDraft({...movieDraft,seats:e.target.value})}/></div></div><div className="ent-field"><label>Who can join?</label><div className="ent-choice">{['Open','Approval required'].map(x=><button type="button" key={x} className={movieDraft.access===x?'selected':''} onClick={()=>setMovieDraft({...movieDraft,access:x})}>{x}</button>)}</div></div><div className="ent-field"><label htmlFor="movie-genre">Genre</label><select id="movie-genre" value={movieDraft.genre} onChange={e=>setMovieDraft({...movieDraft,genre:e.target.value})}>{['Any','Sci-fi','Anime','Comedy / Drama','Action','Horror','Documentary','Other'].map(x=><option key={x}>{x}</option>)}</select></div><div className="ent-field"><label htmlFor="movie-description">Description / notes</label><textarea id="movie-description" maxLength={300} value={movieDraft.description} onChange={e=>setMovieDraft({...movieDraft,description:e.target.value})} placeholder="Add context, snack plans, or who this meetup is for…"/></div><div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:15}}><button type="button" className="ent-ghost" onClick={()=>setShowCreate(false)}>Cancel</button><button className="ent-btn" type="submit"><Plus size={15}/> Create movie plan</button></div></form>:<form onSubmit={createGame}><div className="ent-formgrid"><div className="ent-field"><label htmlFor="game-name">Game</label><select id="game-name" value={gameDraft.game} onChange={e=>setGameDraft({...gameDraft,game:e.target.value})}>{['Free Fire','BGMI / PUBG','Valorant','Minecraft','Chess','Other'].map(x=><option key={x}>{x}</option>)}</select></div><div className="ent-field"><label htmlFor="game-capacity">Member limit</label><select id="game-capacity" value={gameDraft.capacity} onChange={e=>setGameDraft({...gameDraft,capacity:e.target.value})}>{['10','20','50','Unlimited'].map(x=><option key={x}>{x}</option>)}</select></div></div>{gameDraft.game==='Other'&&<div className="ent-field"><label htmlFor="custom-game">Game name *</label><input id="custom-game" required value={gameDraft.customGame} onChange={e=>setGameDraft({...gameDraft,customGame:e.target.value})} placeholder="Enter any game name"/></div>}<div className="ent-field"><label htmlFor="channel-title">Channel name *</label><input id="channel-title" required maxLength={60} value={gameDraft.title} onChange={e=>setGameDraft({...gameDraft,title:e.target.value})} placeholder="e.g. BIT Weekend Squad"/></div><div className="ent-field"><label htmlFor="channel-description">Description</label><textarea id="channel-description" maxLength={240} value={gameDraft.description} onChange={e=>setGameDraft({...gameDraft,description:e.target.value})} placeholder="What will your channel be about?"/></div><div className="ent-field"><label>Playing style</label><div className="ent-choice">{['Casual','Competitive','Both','Social'].map(x=><button type="button" key={x} className={gameDraft.style===x?'selected':''} onClick={()=>setGameDraft({...gameDraft,style:x})}>{x}</button>)}</div></div><div className="ent-field"><label>Who can join?</label><div className="ent-choice">{['Open','Approval required'].map(x=><button type="button" key={x} className={gameDraft.access===x?'selected':''} onClick={()=>setGameDraft({...gameDraft,access:x})}>{x}</button>)}</div></div><div className="ent-field"><label htmlFor="channel-tags">Tags (comma separated)</label><input id="channel-tags" value={gameDraft.tags} onChange={e=>setGameDraft({...gameDraft,tags:e.target.value})} placeholder="Beginners welcome, Looking for players"/></div><div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:15}}><button type="button" className="ent-ghost" onClick={()=>setShowCreate(false)}>Cancel</button><button className="ent-btn" type="submit"><Plus size={15}/> Create channel</button></div></form>}
// //     </section></div>}
// //   {notice&&<div className="ent-toast" role="status"><Check size={14} style={{display:'inline',marginRight:6,verticalAlign:'middle'}}/>{notice}</div>}
// //   </main>;
// // }

// 'use client';

// import { useMemo, useState } from 'react';
// import {
//   BookOpen, Clapperboard, Gamepad2, LayoutGrid, Search, Plus, Users,
//   MessageCircle, CalendarDays, MapPin, Clock3, ArrowUpRight, Check,
//   Send, X, Bookmark, LibraryBig, ChevronRight, UserRound, SlidersHorizontal,
//   CircleCheck, Hourglass, Pencil, ShieldCheck
// } from 'lucide-react';

// /*
//  * BIT Connect — Entertainment
//  * Next.js App Router + React + Tailwind CSS + lucide-react
//  *
//  * Prototype note:
//  * - Demo content is held in React state and resets on refresh.
//  * - Replace the API endpoints below with your real backend endpoints.
//  * - Name, branch, year and roll number are read-only profile fields.
//  *   Only nickname, bio and interests are sent in the profile PATCH request.
//  */

// const DEMO_PROFILE = {
//   id: 'demo-student',
//   name: 'Aditya Prasad',
//   branch: 'Electronics & Communication Engineering',
//   year: '1st Year',
//   rollNumber: 'Backend-provided roll number',
//   nickname: 'Adi',
//   bio: 'Looking to meet people with shared interests at BIT Sindri.',
//   interests: ['Movies', 'Gaming', 'Reading'],
// };

// const INITIAL_MOVIES = [
//   { id: 'm1', kind: 'movie', title: 'Friday Movie Night', detail: 'Pick a movie together and watch as a group.', when: 'Friday · 6:30 PM', place: 'Nearby theatre / decide together', members: 3, capacity: 6, access: 'Open', host: 'Demo student', status: 'upcoming', movie: 'Movie to be decided' },
//   { id: 'm2', kind: 'movie', title: 'Weekend Watch Party', detail: 'A relaxed group watch followed by a discussion.', when: 'Saturday · 7:00 PM', place: 'Campus common room', members: 2, capacity: 5, access: 'Approval required', host: 'Demo student', status: 'upcoming', movie: 'Watch-party selection' },
// ];
// const INITIAL_GAMING = [
//   { id: 'g1', kind: 'gaming', title: 'BIT Free Fire Squad', game: 'Free Fire', detail: 'Casual squad, team-ups and rank push.', when: 'Active community', place: 'Online channel', members: 12, capacity: 20, access: 'Open', host: 'Demo student', status: 'joined' },
//   { id: 'g2', kind: 'gaming', title: 'BIT Chess Corner', game: 'Chess', detail: 'Friendly games, puzzles and tips.', when: 'Active community', place: 'Online channel', members: 7, capacity: 16, access: 'Open', host: 'Demo student', status: 'joined' },
//   { id: 'g3', kind: 'gaming', title: 'Valorant Beginners', game: 'Valorant', detail: 'Find teammates and learn together.', when: 'Evenings', place: 'Online channel', members: 5, capacity: 10, access: 'Open', host: 'BIT player', status: 'open' },
// ];
// const INITIAL_READING = [
//   { id: 'r1', kind: 'reading', title: 'What Are You Reading?', detail: 'Share reviews, recommendations and reading goals.', when: 'Ongoing', place: 'Reading community', members: 18, capacity: 100, access: 'Open', host: 'BIT readers', status: 'joined', category: 'Community' },
//   { id: 'r2', kind: 'reading', title: 'Quiet Reading Circle', detail: 'Find reading partners and share progress.', when: 'Sunday · 4:00 PM', place: 'Library reading area', members: 8, capacity: 15, access: 'Open', host: 'BIT readers', status: 'upcoming', category: 'Reading meetup' },
//   { id: 'r3', kind: 'reading', title: 'Atomic Habits', detail: 'Good condition · Suggested loan period: 7 days.', when: 'Pickup by arrangement', place: 'Campus', members: 1, capacity: 1, access: 'Open', host: 'BIT student', status: 'available', category: 'Book listing', book: 'Atomic Habits', author: 'James Clear', condition: 'Good', loanDays: '7' },
// ];

// const ZONES = {
//   activity: { label: 'My Activities', icon: LayoutGrid, description: 'Your plans, channels, reading spaces and pending requests in one place.' },
//   movie: { label: 'Movie Zone', icon: Clapperboard, description: 'Find watch buddies, create a movie plan and discuss what you watch.' },
//   gaming: { label: 'Gaming Zone', icon: Gamepad2, description: 'Find players and join or create communities for your favourite games.' },
//   reading: { label: 'Reading Zone', icon: BookOpen, description: 'Discover books, share reviews, find reading partners and request to borrow books.' },
// };

// const cx = (...classes) => classes.filter(Boolean).join(' ');

// export default function EntertainmentPage() {
//   const [zone, setZone] = useState('activity');
//   const [tab, setTab] = useState('explore');
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('All');
//   const [movies, setMovies] = useState(INITIAL_MOVIES);
//   const [gaming, setGaming] = useState(INITIAL_GAMING);
//   const [reading, setReading] = useState(INITIAL_READING);
//   const [joined, setJoined] = useState(['g1', 'g2', 'r1']);
//   const [requests, setRequests] = useState([]);
//   const [modal, setModal] = useState('');
//   const [selected, setSelected] = useState(null);
//   const [messages, setMessages] = useState({});
//   const [draftMessage, setDraftMessage] = useState('');
//   const [toast, setToast] = useState('');
//   const [profile, setProfile] = useState(DEMO_PROFILE);
//   const [profileDraft, setProfileDraft] = useState({ nickname: DEMO_PROFILE.nickname, bio: DEMO_PROFILE.bio, interests: DEMO_PROFILE.interests.join(', ') });
//   const [profileSaving, setProfileSaving] = useState(false);
//   const [form, setForm] = useState({ title: '', detail: '', when: '', place: '', capacity: '6', access: 'Open', game: 'Free Fire', movie: '', book: '', author: '', condition: 'Good', loanDays: '7', category: 'Book listing' });

//   const allItems = useMemo(() => [...movies, ...gaming, ...reading], [movies, gaming, reading]);
//   const currentItems = zone === 'movie' ? movies : zone === 'gaming' ? gaming : zone === 'reading' ? reading : allItems;
//   const filteredItems = useMemo(() => currentItems.filter(item => {
//     const haystack = `${item.title} ${item.detail} ${item.game || ''} ${item.place || ''} ${item.book || ''} ${item.author || ''}`.toLowerCase();
//     const matchesSearch = haystack.includes(search.toLowerCase());
//     const matchesFilter = filter === 'All' || (filter === 'Joined' && joined.includes(item.id)) || (filter === 'Open' && item.access === 'Open') || (filter === 'My items' && item.host === 'You');
//     return matchesSearch && matchesFilter;
//   }), [currentItems, search, filter, joined]);

//   const activeMeta = ZONES[zone];
//   const ActiveIcon = activeMeta.icon;
//   const myItems = allItems.filter(item => item.host === 'You' || joined.includes(item.id));
//   const myRequests = requests.filter(request => request.requester === 'You');

//   function notify(message) {
//     setToast(message);
//     window.setTimeout(() => setToast(''), 2600);
//   }
//   function updateForm(key, value) { setForm(previous => ({ ...previous, [key]: value })); }
//   function openCreate() {
//     if (zone === 'activity') return notify('Choose Movie, Gaming or Reading first.');
//     setForm({ title: '', detail: '', when: '', place: '', capacity: '6', access: 'Open', game: 'Free Fire', movie: '', book: '', author: '', condition: 'Good', loanDays: '7', category: zone === 'reading' ? 'Book listing' : 'Community' });
//     setModal('create');
//   }
//   function createItem(event) {
//     event.preventDefault();
//     const kind = zone;
//     if (!form.title.trim()) return;
//     const item = {
//       id: `${kind[0]}-${Date.now()}`, kind, title: form.title.trim(), detail: form.detail.trim() || 'Created by a BIT Connect student.',
//       when: form.when.trim() || (kind === 'reading' ? 'To be arranged' : 'Time to be decided'),
//       place: form.place.trim() || 'To be arranged', members: 1, capacity: Number(form.capacity) || 6,
//       access: form.access, host: 'You', status: 'created',
//       ...(kind === 'movie' ? { movie: form.movie.trim() || 'To be decided' } : {}),
//       ...(kind === 'gaming' ? { game: form.game } : {}),
//       ...(kind === 'reading' ? { category: form.category, book: form.book.trim(), author: form.author.trim(), condition: form.condition, loanDays: form.loanDays } : {}),
//     };
//     if (kind === 'movie') setMovies(previous => [item, ...previous]);
//     if (kind === 'gaming') setGaming(previous => [item, ...previous]);
//     if (kind === 'reading') setReading(previous => [item, ...previous]);
//     setModal(''); setTab('explore'); setSearch(''); setFilter('All'); notify('Created successfully.');
//   }
//   function joinItem(item) {
//     if (joined.includes(item.id)) { setSelected(item); setModal(item.kind === 'reading' && item.category === 'Book listing' ? 'borrow' : 'detail'); return; }
//     if (item.access === 'Approval required') {
//       if (!requests.some(request => request.itemId === item.id && request.requester === 'You')) {
//         setRequests(previous => [...previous, { id: `req-${Date.now()}`, itemId: item.id, item, requester: 'You', requestStatus: 'Pending', requestType: item.kind === 'reading' && item.category === 'Book listing' ? 'Borrow request' : 'Join request' }]);
//       }
//       notify('Request sent.');
//     } else if (item.kind === 'reading' && item.category === 'Book listing') {
//       setSelected(item); setModal('borrow');
//     } else {
//       setJoined(previous => [...previous, item.id]);
//       notify('Added to your activities.');
//     }
//   }
//   function sendMessage(event) {
//     event.preventDefault();
//     if (!draftMessage.trim() || !selected) return;
//     setMessages(previous => ({ ...previous, [selected.id]: [...(previous[selected.id] || []), { id: Date.now(), text: draftMessage.trim(), author: profile.nickname || profile.name }] }));
//     setDraftMessage('');
//   }
//   function sendCommunityMessage(event) {
//     event.preventDefault();
//     if (!draftMessage.trim()) return;
//     setMessages(previous => ({ ...previous, [`${zone}-community`]: [...(previous[`${zone}-community`] || []), { id: Date.now(), text: draftMessage.trim(), author: profile.nickname || profile.name }] }));
//     setDraftMessage('');
//   }
//   function openProfile() {
//     setProfileDraft({ nickname: profile.nickname || '', bio: profile.bio || '', interests: (profile.interests || []).join(', ') });
//     setModal('profile');
//   }
//   async function saveProfile(event) {
//     event.preventDefault(); setProfileSaving(true);
//     const editable = { nickname: profileDraft.nickname.trim(), bio: profileDraft.bio.trim(), interests: profileDraft.interests.split(',').map(value => value.trim()).filter(Boolean) };
//     try {
//       // In production, authenticate this endpoint and allow updates only to editable fields.
//       const response = await fetch('/api/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editable) });
//       if (response.ok) {
//         const updated = await response.json();
//         setProfile(current => ({ ...current, nickname: updated.nickname ?? editable.nickname, bio: updated.bio ?? editable.bio, interests: updated.interests ?? editable.interests }));
//         notify('Profile updated.'); setModal('');
//       } else if (response.status === 404 || response.status === 405) {
//         // Local fallback for a front-end-only prototype. Fixed backend fields are never changed.
//         setProfile(current => ({ ...current, ...editable })); notify('Profile updated locally. Connect /api/profile to save permanently.'); setModal('');
//       } else {
//         throw new Error('Profile update failed');
//       }
//     } catch (error) {
//       // No backend is configured in the prototype, so allow a local preview of editable fields.
//       setProfile(current => ({ ...current, ...editable })); notify('Saved in this preview only. Backend connection is required for persistence.'); setModal('');
//     } finally { setProfileSaving(false); }
//   }

//   function itemIcon(item) {
//     if (item.kind === 'movie') return Clapperboard;
//     if (item.kind === 'gaming') return Gamepad2;
//     return item.category === 'Book listing' ? Bookmark : BookOpen;
//   }
//   function itemStatus(item) {
//     if (item.host === 'You') return 'Created by you';
//     if (requests.some(request => request.itemId === item.id && request.requester === 'You')) return 'Request pending';
//     if (joined.includes(item.id)) return 'Joined';
//     return item.access;
//   }

//   return (
//     <main className="min-h-screen bg-[#090d18] text-slate-100">
//       <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
//         {/* Compact breadcrumb; no oversized hero and no persistent top-right avatar. */}
//         <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
//           <button onClick={() => { setZone('activity'); setTab('explore'); }} className="transition hover:text-white">Home</button>
//           <ChevronRight size={13} />
//           <span className="text-slate-300">Entertainment</span>
//           <ChevronRight size={13} />
//           <span className="text-indigo-300">{activeMeta.label}</span>
//         </nav>

//         <header className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
//           <div>
//             <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">BIT Sindri · Entertainment</p>
//             <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{activeMeta.label}</h1>
//             <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{activeMeta.description}</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <button onClick={openProfile} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-indigo-400 hover:bg-slate-800">
//               <UserRound size={14} /> My profile
//             </button>
//             {zone !== 'activity' && <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-emerald-200 px-3 py-2 text-xs font-bold text-emerald-950 transition hover:bg-emerald-100"><Plus size={14}/>{zone === 'movie' ? 'Create movie plan' : zone === 'gaming' ? 'Create channel' : 'Add book / space'}</button>}
//           </div>
//         </header>

//         <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl border border-slate-800 bg-[#0e1526] p-1.5 sm:grid-cols-4">
//           {Object.entries(ZONES).map(([key, meta]) => {
//             const Icon = meta.icon;
//             return <button key={key} onClick={() => { setZone(key); setTab('explore'); setSearch(''); setFilter('All'); }} className={cx('flex min-h-10 items-center justify-center gap-2 rounded-lg border px-2 py-2 text-xs font-semibold transition', zone === key ? 'border-indigo-500/80 bg-indigo-600/30 text-white shadow-inner shadow-indigo-950/30' : 'border-transparent text-slate-400 hover:bg-slate-800/70 hover:text-white')}><Icon size={15}/>{meta.label}{key === 'activity' && myRequests.length > 0 && <span className="rounded-full bg-indigo-400/20 px-1.5 py-0.5 text-[10px] text-indigo-200">{myRequests.length}</span>}</button>;
//           })}
//         </div>

//         <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40">
//           <div className="flex flex-col justify-between gap-3 border-b border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
//             <div className="flex items-start gap-3">
//               <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-300"><ActiveIcon size={17}/></div>
//               <div><h2 className="text-sm font-bold">{zone === 'activity' ? 'Your entertainment activity' : zone === 'movie' ? 'Movie plans' : zone === 'gaming' ? 'Gaming channels' : 'Books & reading spaces'}</h2><p className="mt-1 text-xs text-slate-400">{zone === 'activity' ? 'Created items, joined spaces and requests across all three zones.' : zone === 'reading' ? 'Browse reading communities, book listings and reading meetups.' : zone === 'movie' ? 'Find people for a movie plan or a group watch.' : 'Find players and communities for the games you enjoy.'}</p></div>
//             </div>
//             {zone !== 'activity' && <div className="flex gap-2">
//               {zone === 'reading' && <button onClick={() => setTab(tab === 'community' ? 'explore' : 'community')} className={cx('inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold', tab === 'community' ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200' : 'border-slate-700 text-slate-300 hover:bg-slate-800')}><MessageCircle size={14}/>{tab === 'community' ? 'Browse books' : 'Community'}</button>}
//               {zone === 'movie' && <button onClick={() => setTab(tab === 'community' ? 'explore' : 'community')} className={cx('inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold', tab === 'community' ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200' : 'border-slate-700 text-slate-300 hover:bg-slate-800')}><MessageCircle size={14}/>{tab === 'community' ? 'Browse plans' : 'Discussion'}</button>}
//               {zone === 'gaming' && <button onClick={() => setTab(tab === 'community' ? 'explore' : 'community')} className={cx('inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold', tab === 'community' ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200' : 'border-slate-700 text-slate-300 hover:bg-slate-800')}><MessageCircle size={14}/>{tab === 'community' ? 'Explore channels' : 'Community'}</button>}
//             </div>}
//           </div>

//           {zone !== 'activity' && tab === 'community' ? (
//             <div className="p-4 sm:p-5">
//               <div className="mb-4 rounded-lg border border-slate-800 bg-slate-900/70 p-3"><p className="text-sm font-semibold">{zone === 'movie' ? 'Movie discussion' : zone === 'gaming' ? 'Gaming discussion' : 'Reading community'}</p><p className="mt-1 text-xs leading-5 text-slate-400">{zone === 'movie' ? 'Discuss recommendations, upcoming releases and watch plans.' : zone === 'gaming' ? 'Talk about games, find teammates and share tips.' : 'Share book reviews, recommendations, reading goals or ask to borrow a book.'}</p></div>
//               <div className="space-y-2">{(messages[`${zone}-community`] || []).map(message => <div key={message.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-3"><p className="mb-1 text-[11px] font-bold text-indigo-200">{message.author}</p><p className="whitespace-pre-wrap text-sm text-slate-200">{message.text}</p></div>)}{!(messages[`${zone}-community`] || []).length && <p className="py-5 text-center text-xs text-slate-500">No posts yet. Start the conversation.</p>}</div>
//               <form onSubmit={sendCommunityMessage} className="mt-4 flex gap-2"><input value={draftMessage} onChange={event => setDraftMessage(event.target.value)} placeholder="Write a post or recommendation…" className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-400"/><button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-400"><Send size={14}/><span className="hidden sm:inline">Post</span></button></form>
//             </div>
//           ) : (
//             <>
//               <div className="flex flex-col gap-2 border-b border-slate-800 p-3 sm:flex-row sm:items-center">
//                 <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-400"><Search size={15}/><input value={search} onChange={event => setSearch(event.target.value)} placeholder={zone === 'reading' ? 'Search books, authors, communities…' : 'Search plans, channels and activities…'} className="w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-slate-500"/></label>
//                 <div className="flex flex-wrap gap-1.5">{(zone === 'activity' ? ['All', 'Joined', 'My items'] : ['All', 'Open', 'Joined']).map(option => <button key={option} onClick={() => setFilter(option)} className={cx('rounded-lg border px-3 py-2 text-xs font-semibold transition', filter === option ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200' : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white')}><SlidersHorizontal size={11} className="mr-1 inline"/>{option}</button>)}</div>
//               </div>
//               <div className="divide-y divide-slate-800/90">
//                 {(zone === 'activity' ? [...myItems.filter(item => filter === 'All' || (filter === 'Joined' ? joined.includes(item.id) : item.host === 'You')), ...myRequests.map(request => ({ ...request.item, id: request.id, isRequest: true, requestType: request.requestType, requestStatus: request.requestStatus }))] : filteredItems).filter((item, index, array) => array.findIndex(other => other.id === item.id) === index).map(item => {
//                   const Icon = itemIcon(item); const isJoined = joined.includes(item.id); const pending = requests.some(request => request.itemId === item.id && request.requester === 'You');
//                   return <article key={item.id} className="flex min-w-0 items-center gap-3 px-4 py-3.5 transition hover:bg-slate-900/50 sm:px-5">
//                     <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-300"><Icon size={17}/></div>
//                     <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-semibold text-slate-100">{item.title}</h3>{item.kind === 'gaming' && <span className="rounded-md bg-violet-400/10 px-2 py-0.5 text-[10px] text-violet-200">{item.game}</span>}{item.kind === 'reading' && item.category && <span className="rounded-md bg-amber-300/10 px-2 py-0.5 text-[10px] text-amber-100">{item.category}</span>}</div><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{item.detail}</p><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500"><span><Users size={11} className="mr-1 inline"/>{item.members || 1} {item.kind === 'reading' && item.category === 'Book listing' ? 'owner' : 'members'}</span><span><Clock3 size={11} className="mr-1 inline"/>{item.when}</span><span><MapPin size={11} className="mr-1 inline"/>{item.place}</span>{item.kind === 'reading' && item.book && <span><BookOpen size={11} className="mr-1 inline"/>{item.book}{item.author ? ` · ${item.author}` : ''}</span>}</div></div>
//                     <div className="flex shrink-0 flex-col items-end gap-2"><span className="hidden rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-400 sm:inline-flex">{item.isRequest ? item.requestStatus : zone === 'activity' ? itemStatus(item) : item.access}</span>{zone === 'activity' ? <button onClick={() => { setSelected(item); setModal(item.kind === 'reading' && item.category === 'Book listing' ? 'borrow' : 'detail'); }} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-2 text-xs font-semibold text-slate-200 hover:border-indigo-400">Open <ArrowUpRight size={13}/></button> : <button onClick={() => { setSelected(item); if (item.kind === 'reading' && item.category === 'Book listing') setModal('borrow'); else joinItem(item); }} className={cx('inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-bold', isJoined ? 'border border-slate-700 text-slate-200 hover:bg-slate-800' : pending ? 'border border-amber-500/40 bg-amber-500/10 text-amber-200' : 'bg-emerald-200 text-emerald-950 hover:bg-emerald-100')}>{isJoined ? 'Open' : pending ? 'Pending' : item.kind === 'reading' && item.category === 'Book listing' ? 'Borrow' : item.kind === 'reading' ? 'Join' : 'Join'}<ChevronRight size={13}/></button>}</div>
//                   </article>;
//                 })}
//                 {((zone === 'activity' && myItems.length === 0 && myRequests.length === 0) || (zone !== 'activity' && filteredItems.length === 0)) && <div className="px-5 py-12 text-center"><div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400"><LibraryBig size={20}/></div><h3 className="text-sm font-semibold">Nothing here yet</h3><p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">Try another search or create the first plan, channel or reading space for the campus community.</p>{zone !== 'activity' && <button onClick={openCreate} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-200 px-3 py-2 text-xs font-bold text-emerald-950"><Plus size={14}/>Create new</button>}</div>}
//               </div>
//             </>
//           )}
//         </section>

//         <div className="mt-3 flex flex-col gap-2 text-[10px] leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p><ShieldCheck size={12} className="mr-1 inline text-emerald-300"/>Campus community prototype. Do not share sensitive personal details in public posts.</p><button onClick={openProfile} className="self-start text-slate-400 underline decoration-slate-700 underline-offset-4 hover:text-white sm:self-auto">View profile settings</button></div>
//       </div>

//       {/* Create item modal */}
//       {modal === 'create' && <Modal onClose={() => setModal('')} title={zone === 'movie' ? 'Create movie plan' : zone === 'gaming' ? 'Create gaming channel' : 'Create reading item'}>
//         <form onSubmit={createItem} className="space-y-4">
//           {zone === 'gaming' && <Field label="Game"><select value={form.game} onChange={event => updateForm('game', event.target.value)} className={inputClass}>{['Free Fire', 'BGMI / PUBG', 'Valorant', 'Minecraft', 'Chess', 'Other'].map(game => <option key={game}>{game}</option>)}</select></Field>}
//           {zone === 'reading' && <Field label="What are you creating?"><select value={form.category} onChange={event => updateForm('category', event.target.value)} className={inputClass}>{['Book listing', 'Community', 'Reading meetup'].map(category => <option key={category}>{category}</option>)}</select></Field>}
//           <Field label={zone === 'movie' ? 'Plan title *' : zone === 'gaming' ? 'Channel name *' : 'Title *'}><input required value={form.title} onChange={event => updateForm('title', event.target.value)} placeholder={zone === 'movie' ? 'e.g. Saturday movie night' : zone === 'gaming' ? 'e.g. BIT Valorant Squad' : 'e.g. Atomic Habits / Quiet Reading Circle'} className={inputClass}/></Field>
//           {zone === 'movie' && <Field label="Movie (optional)"><input value={form.movie} onChange={event => updateForm('movie', event.target.value)} placeholder="Movie title or decide together" className={inputClass}/></Field>}
//           {zone === 'reading' && form.category === 'Book listing' && <div className="grid gap-3 sm:grid-cols-2"><Field label="Book title"><input value={form.book} onChange={event => updateForm('book', event.target.value)} placeholder="Book name" className={inputClass}/></Field><Field label="Author"><input value={form.author} onChange={event => updateForm('author', event.target.value)} placeholder="Author name" className={inputClass}/></Field></div>}
//           <Field label="Description"><textarea rows={3} value={form.detail} onChange={event => updateForm('detail', event.target.value)} placeholder="A few helpful details…" className={inputClass}/></Field>
//           <div className="grid gap-3 sm:grid-cols-2"><Field label={zone === 'reading' ? 'Pickup / meetup time' : 'Date and time'}><input value={form.when} onChange={event => updateForm('when', event.target.value)} placeholder="e.g. Saturday · 5 PM" className={inputClass}/></Field><Field label={zone === 'reading' ? 'Pickup / meeting place' : 'Location'}><input value={form.place} onChange={event => updateForm('place', event.target.value)} placeholder="e.g. Campus library" className={inputClass}/></Field></div>
//           {zone === 'reading' && form.category === 'Book listing' && <div className="grid gap-3 sm:grid-cols-2"><Field label="Book condition"><select value={form.condition} onChange={event => updateForm('condition', event.target.value)} className={inputClass}>{['New', 'Like new', 'Good', 'Worn'].map(condition => <option key={condition}>{condition}</option>)}</select></Field><Field label="Suggested loan period"><select value={form.loanDays} onChange={event => updateForm('loanDays', event.target.value)} className={inputClass}>{['3', '7', '14', '21'].map(days => <option key={days} value={days}>{days} days</option>)}</select></Field></div>}
//           <div className="grid gap-3 sm:grid-cols-2"><Field label="Member limit"><input type="number" min="1" max="100" value={form.capacity} onChange={event => updateForm('capacity', event.target.value)} className={inputClass}/></Field><Field label="Access"><select value={form.access} onChange={event => updateForm('access', event.target.value)} className={inputClass}><option>Open</option><option>Approval required</option></select></Field></div>
//           <ModalActions onCancel={() => setModal('')} submitLabel="Create"/>
//         </form>
//       </Modal>}

//       {/* Details / chat / borrow modal */}
//       {(modal === 'detail' || modal === 'borrow') && selected && <Modal onClose={() => setModal('')} title={modal === 'borrow' ? 'Book details & borrow request' : selected.title}>
//         <div className="space-y-4"><p className="text-sm leading-6 text-slate-300">{selected.detail}</p><div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-xs leading-6 text-slate-400"><p><span className="text-slate-200">When:</span> {selected.when}</p><p><span className="text-slate-200">Where:</span> {selected.place}</p>{selected.kind === 'reading' && selected.book && <><p><span className="text-slate-200">Book:</span> {selected.book}{selected.author ? ` by ${selected.author}` : ''}</p><p><span className="text-slate-200">Condition / loan:</span> {selected.condition || 'Not specified'} · {selected.loanDays || '7'} days suggested</p></>}</div>
//           {modal === 'borrow' ? <><p className="text-xs leading-5 text-slate-400">A borrow request lets the owner contact you to confirm availability, pickup and return date. Avoid posting phone numbers or other private information publicly.</p><button onClick={() => { if (!requests.some(request => request.itemId === selected.id && request.requester === 'You')) setRequests(previous => [...previous, { id: `req-${Date.now()}`, itemId: selected.id, item: selected, requester: 'You', requestStatus: 'Pending', requestType: 'Borrow request' }]); setModal(''); notify('Borrow request recorded.'); }} className="inline-flex items-center gap-2 rounded-lg bg-emerald-200 px-3 py-2.5 text-xs font-bold text-emerald-950"><Bookmark size={14}/>Request to borrow</button></> : <><h3 className="text-xs font-bold text-slate-200">Discussion</h3><div className="max-h-52 space-y-2 overflow-y-auto">{(messages[selected.id] || []).map(message => <div key={message.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3"><p className="mb-1 text-[10px] font-bold text-indigo-200">{message.author}</p><p className="whitespace-pre-wrap text-sm text-slate-200">{message.text}</p></div>)}{!(messages[selected.id] || []).length && <p className="text-xs text-slate-500">No messages yet.</p>}</div><form onSubmit={sendMessage} className="flex gap-2"><input value={draftMessage} onChange={event => setDraftMessage(event.target.value)} placeholder="Write a message…" className={cx(inputClass, 'min-w-0 flex-1')}/><button type="submit" className="rounded-lg bg-indigo-500 px-3 text-white hover:bg-indigo-400"><Send size={15}/></button></form></>}</div>
//       </Modal>}

//       {/* Profile modal: backend-owned identity fields are visibly read-only. */}
//       {modal === 'profile' && <Modal onClose={() => setModal('')} title="My profile" subtitle="Identity details come from the BIT Connect backend and cannot be edited here.">
//         <form onSubmit={saveProfile} className="space-y-4">
//           <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3"><div className="grid h-11 w-11 place-items-center rounded-full border border-indigo-400/30 bg-indigo-500/15 text-sm font-bold text-indigo-200">{(profile.name || 'S').split(' ').map(part => part[0]).slice(0, 2).join('')}</div><div><p className="text-sm font-semibold text-white">{profile.name}</p><p className="text-xs text-slate-400">Verified student profile</p></div><ShieldCheck size={17} className="ml-auto text-emerald-300"/></div>
//           <div className="grid gap-3 sm:grid-cols-2"><ReadOnlyField label="Full name" value={profile.name}/><ReadOnlyField label="Branch" value={profile.branch}/><ReadOnlyField label="Year" value={profile.year}/><ReadOnlyField label="Roll / registration number" value={profile.rollNumber}/></div>
//           <div className="rounded-lg border border-emerald-400/15 bg-emerald-400/5 p-3 text-xs leading-5 text-emerald-100/80"><ShieldCheck size={13} className="mr-1 inline"/>These four fields are fetched from the backend. They are not editable and are never included in the profile update payload.</div>
//           <div className="border-t border-slate-800 pt-4"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Editable profile details</p><div className="space-y-3"><Field label="Nickname (optional)"><input maxLength={30} value={profileDraft.nickname} onChange={event => setProfileDraft(previous => ({ ...previous, nickname: event.target.value }))} placeholder="What friends call you" className={inputClass}/></Field><Field label="Short bio"><textarea maxLength={240} rows={2} value={profileDraft.bio} onChange={event => setProfileDraft(previous => ({ ...previous, bio: event.target.value }))} placeholder="A little about your interests" className={inputClass}/></Field><Field label="Interests (comma-separated)"><input value={profileDraft.interests} onChange={event => setProfileDraft(previous => ({ ...previous, interests: event.target.value }))} placeholder="Movies, cricket, reading" className={inputClass}/></Field></div></div>
//           <div className="flex flex-col-reverse gap-2 border-t border-slate-800 pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={() => setModal('')} className="rounded-lg border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800">Cancel</button><button disabled={profileSaving} type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-950 disabled:opacity-60"><Pencil size={13}/>{profileSaving ? 'Saving…' : 'Save editable details'}</button></div>
//         </form>
//       </Modal>}

//       {toast && <div role="status" className="fixed bottom-4 left-1/2 z-[60] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-xs font-medium text-slate-100 shadow-xl"><Check size={15} className="shrink-0 text-emerald-300"/>{toast}</div>}
//     </main>
//   );
// }

// const inputClass = 'w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10';

// function Field({ label, children }) {
//   return <label className="block space-y-1.5"><span className="text-xs font-semibold text-slate-300">{label}</span>{children}</label>;
// }
// function ReadOnlyField({ label, value }) {
//   return <Field label={label}><div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-400"><input readOnly aria-readonly="true" value={value || 'Provided by backend'} className="w-full cursor-not-allowed bg-transparent outline-none"/><ShieldCheck size={13} className="shrink-0 text-emerald-300"/></div></Field>;
// }
// function Modal({ title, subtitle, onClose, children }) {
//   return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-label={title} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-2xl border border-slate-700 bg-[#0d1424] p-4 shadow-2xl sm:rounded-2xl sm:p-5"><div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-800 pb-3"><div><h2 className="text-base font-bold text-white">{title}</h2>{subtitle && <p className="mt-1 text-xs leading-5 text-slate-400">{subtitle}</p>}</div><button onClick={onClose} aria-label="Close dialog" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"><X size={17}/></button></div>{children}</section></div>;
// }
// function ModalActions({ onCancel, submitLabel }) {
//   return <div className="flex flex-col-reverse gap-2 border-t border-slate-800 pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={onCancel} className="rounded-lg border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800">Cancel</button><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-950 hover:bg-emerald-100"><Plus size={14}/>{submitLabel}</button></div>;
// }

'use client';

import { useMemo, useState } from 'react';
import {
  BookOpen, Clapperboard, Gamepad2, LayoutGrid, Search, Plus, Users,
  MessageCircle, CalendarDays, MapPin, Clock3, ArrowUpRight, Check,
  Send, X, Bookmark, LibraryBig, ChevronRight, UserRound, SlidersHorizontal,
  CircleCheck, Hourglass, Pencil, ShieldCheck, Trash2, LogOut
} from 'lucide-react';

/*
 * BIT Connect — Entertainment
 * Next.js App Router + React + Tailwind CSS + lucide-react
 *
 * Prototype note:
 * - Demo content is held in React state and resets on refresh.
 * - Replace the API endpoints below with your real backend endpoints.
 * - Name, branch, year and roll number are read-only profile fields.
 *   Only nickname, bio and interests are sent in the profile PATCH request.
 */

const DEMO_PROFILE = {
  id: 'demo-student',
  name: 'Aditya Prasad',
  branch: 'Electronics & Communication Engineering',
  year: '1st Year',
  rollNumber: 'Backend-provided roll number',
  nickname: 'Adi',
  bio: 'Looking to meet people with shared interests at BIT Sindri.',
  interests: ['Movies', 'Gaming', 'Reading'],
};

const INITIAL_MOVIES = [
  { id: 'm1', kind: 'movie', title: 'Friday Movie Night', detail: 'Pick a movie together and watch as a group.', when: 'Friday · 6:30 PM', place: 'Nearby theatre / decide together', members: 3, capacity: 6, access: 'Open', host: 'Demo student', status: 'upcoming', movie: 'Movie to be decided' },
  { id: 'm2', kind: 'movie', title: 'Weekend Watch Party', detail: 'A relaxed group watch followed by a discussion.', when: 'Saturday · 7:00 PM', place: 'Campus common room', members: 2, capacity: 5, access: 'Approval required', host: 'Demo student', status: 'upcoming', movie: 'Watch-party selection' },
];
const INITIAL_GAMING = [
  { id: 'g1', kind: 'gaming', title: 'BIT Free Fire Squad', game: 'Free Fire', detail: 'Casual squad, team-ups and rank push.', when: 'Active community', place: 'Online channel', members: 12, capacity: 20, access: 'Open', host: 'Demo student', status: 'joined' },
  { id: 'g2', kind: 'gaming', title: 'BIT Chess Corner', game: 'Chess', detail: 'Friendly games, puzzles and tips.', when: 'Active community', place: 'Online channel', members: 7, capacity: 16, access: 'Open', host: 'Demo student', status: 'joined' },
  { id: 'g3', kind: 'gaming', title: 'Valorant Beginners', game: 'Valorant', detail: 'Find teammates and learn together.', when: 'Evenings', place: 'Online channel', members: 5, capacity: 10, access: 'Open', host: 'BIT player', status: 'open' },
];
const INITIAL_READING = [
  { id: 'r1', kind: 'reading', title: 'What Are You Reading?', detail: 'Share reviews, recommendations and reading goals.', when: 'Ongoing', place: 'Reading community', members: 18, capacity: 100, access: 'Open', host: 'BIT readers', status: 'joined', category: 'Community' },
  { id: 'r2', kind: 'reading', title: 'Quiet Reading Circle', detail: 'Find reading partners and share progress.', when: 'Sunday · 4:00 PM', place: 'Library reading area', members: 8, capacity: 15, access: 'Open', host: 'BIT readers', status: 'upcoming', category: 'Reading meetup' },
  { id: 'r3', kind: 'reading', title: 'Atomic Habits', detail: 'Good condition · Suggested loan period: 7 days.', when: 'Pickup by arrangement', place: 'Campus', members: 1, capacity: 1, access: 'Open', host: 'BIT student', status: 'available', category: 'Book listing', book: 'Atomic Habits', author: 'James Clear', condition: 'Good', loanDays: '7' },
];

const ZONES = {
  activity: { label: 'My Activities', icon: LayoutGrid, description: 'Your plans, channels, reading spaces and pending requests in one place.' },
  movie: { label: 'Movie Zone', icon: Clapperboard, description: 'Find watch buddies, create a movie plan and discuss what you watch.' },
  gaming: { label: 'Gaming Zone', icon: Gamepad2, description: 'Find players and join or create communities for your favourite games.' },
  reading: { label: 'Reading Zone', icon: BookOpen, description: 'Discover books, share reviews, find reading partners and request to borrow books.' },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function EntertainmentPage() {
  const [zone, setZone] = useState('activity');
  const [tab, setTab] = useState('explore');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [gaming, setGaming] = useState(INITIAL_GAMING);
  const [reading, setReading] = useState(INITIAL_READING);
  const [joined, setJoined] = useState(['g1', 'g2', 'r1']);
  const [requests, setRequests] = useState([]);
  const [modal, setModal] = useState('');
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState({});
  const [draftMessage, setDraftMessage] = useState('');
  const [toast, setToast] = useState('');
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [profileDraft, setProfileDraft] = useState({ nickname: DEMO_PROFILE.nickname, bio: DEMO_PROFILE.bio, interests: DEMO_PROFILE.interests.join(', ') });
  const [profileSaving, setProfileSaving] = useState(false);
  const [form, setForm] = useState({ title: '', detail: '', when: '', place: '', capacity: '6', access: 'Open', game: 'Free Fire', movie: '', book: '', author: '', condition: 'Good', loanDays: '7', category: 'Book listing' });

  const allItems = useMemo(() => [...movies, ...gaming, ...reading], [movies, gaming, reading]);
  const currentItems = zone === 'movie' ? movies : zone === 'gaming' ? gaming : zone === 'reading' ? reading : allItems;
  const filteredItems = useMemo(() => currentItems.filter(item => {
    const haystack = `${item.title} ${item.detail} ${item.game || ''} ${item.place || ''} ${item.book || ''} ${item.author || ''}`.toLowerCase();
    const matchesSearch = haystack.includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || (filter === 'Joined' && joined.includes(item.id)) || (filter === 'Open' && item.access === 'Open') || (filter === 'My items' && item.host === 'You');
    return matchesSearch && matchesFilter;
  }), [currentItems, search, filter, joined]);

  const activeMeta = ZONES[zone];
  const ActiveIcon = activeMeta.icon;
  const myItems = allItems.filter(item => item.host === 'You' || joined.includes(item.id));
  const myRequests = requests.filter(request => request.requester === 'You');

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }
  function updateForm(key, value) { setForm(previous => ({ ...previous, [key]: value })); }
  function openCreate() {
    if (zone === 'activity') return notify('Choose Movie, Gaming or Reading first.');
    setForm({ title: '', detail: '', when: '', place: '', capacity: '6', access: 'Open', game: 'Free Fire', movie: '', book: '', author: '', condition: 'Good', loanDays: '7', category: zone === 'reading' ? 'Book listing' : 'Community' });
    setModal('create');
  }
  function createItem(event) {
    event.preventDefault();
    const kind = zone;
    if (!form.title.trim()) return;
    const item = {
      id: `${kind[0]}-${Date.now()}`, kind, title: form.title.trim(), detail: form.detail.trim() || 'Created by a BIT Connect student.',
      when: form.when.trim() || (kind === 'reading' ? 'To be arranged' : 'Time to be decided'),
      place: form.place.trim() || 'To be arranged', members: 1, capacity: Number(form.capacity) || 6,
      access: form.access, host: 'You', status: 'created',
      ...(kind === 'movie' ? { movie: form.movie.trim() || 'To be decided' } : {}),
      ...(kind === 'gaming' ? { game: form.game } : {}),
      ...(kind === 'reading' ? { category: form.category, book: form.book.trim(), author: form.author.trim(), condition: form.condition, loanDays: form.loanDays } : {}),
    };
    if (kind === 'movie') setMovies(previous => [item, ...previous]);
    if (kind === 'gaming') setGaming(previous => [item, ...previous]);
    if (kind === 'reading') setReading(previous => [item, ...previous]);
    setModal(''); setTab('explore'); setSearch(''); setFilter('All'); notify('Created successfully.');
  }
  function joinItem(item) {
    if (joined.includes(item.id)) { setSelected(item); setModal(item.kind === 'reading' && item.category === 'Book listing' ? 'borrow' : 'detail'); return; }
    if (item.access === 'Approval required') {
      if (!requests.some(request => request.itemId === item.id && request.requester === 'You')) {
        setRequests(previous => [...previous, { id: `req-${Date.now()}`, itemId: item.id, item, requester: 'You', requestStatus: 'Pending', requestType: item.kind === 'reading' && item.category === 'Book listing' ? 'Borrow request' : 'Join request' }]);
      }
      notify('Request sent.');
    } else if (item.kind === 'reading' && item.category === 'Book listing') {
      setSelected(item); setModal('borrow');
    } else {
      setJoined(previous => [...previous, item.id]);
      notify('Added to your activities.');
    }
  }
  function leaveItem(item) {
    setJoined(previous => previous.filter(id => id !== item.id));
    setRequests(previous => previous.filter(request => request.itemId !== item.id || request.requester !== 'You'));
    notify('You have left this activity.');
  }
  function cancelRequest(requestId) {
    setRequests(previous => previous.filter(request => request.id !== requestId));
    notify('Request cancelled.');
  }
  function deleteOwnItem(item) {
    if (item.host !== 'You') return;
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    if (item.kind === 'movie') setMovies(previous => previous.filter(entry => entry.id !== item.id));
    if (item.kind === 'gaming') setGaming(previous => previous.filter(entry => entry.id !== item.id));
    if (item.kind === 'reading') setReading(previous => previous.filter(entry => entry.id !== item.id));
    setJoined(previous => previous.filter(id => id !== item.id));
    setRequests(previous => previous.filter(request => request.itemId !== item.id));
    setMessages(previous => { const next = { ...previous }; delete next[item.id]; return next; });
    notify('Your item was deleted.');
  }
  function deleteOwnMessage(messageId, key) {
    setMessages(previous => ({ ...previous, [key]: (previous[key] || []).filter(message => message.id !== messageId || message.authorId !== profile.id) }));
    notify('Your post/message was deleted.');
  }
  function sendMessage(event) {
    event.preventDefault();
    if (!draftMessage.trim() || !selected) return;
    setMessages(previous => ({ ...previous, [selected.id]: [...(previous[selected.id] || []), { id: Date.now(), text: draftMessage.trim(), author: profile.nickname || profile.name, authorId: profile.id }] }));
    setDraftMessage('');
  }
  function sendCommunityMessage(event) {
    event.preventDefault();
    if (!draftMessage.trim()) return;
    setMessages(previous => ({ ...previous, [`${zone}-community`]: [...(previous[`${zone}-community`] || []), { id: Date.now(), text: draftMessage.trim(), author: profile.nickname || profile.name, authorId: profile.id }] }));
    setDraftMessage('');
  }
  function openProfile() {
    setProfileDraft({ nickname: profile.nickname || '', bio: profile.bio || '', interests: (profile.interests || []).join(', ') });
    setModal('profile');
  }
  async function saveProfile(event) {
    event.preventDefault(); setProfileSaving(true);
    const editable = { nickname: profileDraft.nickname.trim(), bio: profileDraft.bio.trim(), interests: profileDraft.interests.split(',').map(value => value.trim()).filter(Boolean) };
    try {
      // In production, authenticate this endpoint and allow updates only to editable fields.
      const response = await fetch('/api/profile', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editable) });
      if (response.ok) {
        const updated = await response.json();
        setProfile(current => ({ ...current, nickname: updated.nickname ?? editable.nickname, bio: updated.bio ?? editable.bio, interests: updated.interests ?? editable.interests }));
        notify('Profile updated.'); setModal('');
      } else if (response.status === 404 || response.status === 405) {
        // Local fallback for a front-end-only prototype. Fixed backend fields are never changed.
        setProfile(current => ({ ...current, ...editable })); notify('Profile updated locally. Connect /api/profile to save permanently.'); setModal('');
      } else {
        throw new Error('Profile update failed');
      }
    } catch (error) {
      // No backend is configured in the prototype, so allow a local preview of editable fields.
      setProfile(current => ({ ...current, ...editable })); notify('Saved in this preview only. Backend connection is required for persistence.'); setModal('');
    } finally { setProfileSaving(false); }
  }

  function itemIcon(item) {
    if (item.kind === 'movie') return Clapperboard;
    if (item.kind === 'gaming') return Gamepad2;
    return item.category === 'Book listing' ? Bookmark : BookOpen;
  }
  function itemStatus(item) {
    if (item.host === 'You') return 'Created by you';
    if (requests.some(request => request.itemId === item.id && request.requester === 'You')) return 'Request pending';
    if (joined.includes(item.id)) return 'Joined';
    return item.access;
  }

  return (
    <main className="min-h-screen bg-[#090d18] text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Compact breadcrumb; no oversized hero and no persistent top-right avatar. */}
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <button onClick={() => { setZone('activity'); setTab('explore'); }} className="transition hover:text-white">Home</button>
          <ChevronRight size={13} />
          <span className="text-slate-300">Entertainment</span>
          <ChevronRight size={13} />
          <span className="text-indigo-300">{activeMeta.label}</span>
        </nav>

        <header className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">BIT Sindri · Entertainment</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{activeMeta.label}</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{activeMeta.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={openProfile} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-indigo-400 hover:bg-slate-800">
              <UserRound size={14} /> My profile
            </button>
            {zone !== 'activity' && <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-emerald-200 px-3 py-2 text-xs font-bold text-emerald-950 transition hover:bg-emerald-100"><Plus size={14}/>{zone === 'movie' ? 'Create movie plan' : zone === 'gaming' ? 'Create channel' : 'Add book / space'}</button>}
          </div>
        </header>

        <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl border border-slate-800 bg-[#0e1526] p-1.5 sm:grid-cols-4">
          {Object.entries(ZONES).map(([key, meta]) => {
            const Icon = meta.icon;
            return <button key={key} onClick={() => { setZone(key); setTab('explore'); setSearch(''); setFilter('All'); }} className={cx('flex min-h-10 items-center justify-center gap-2 rounded-lg border px-2 py-2 text-xs font-semibold transition', zone === key ? 'border-indigo-500/80 bg-indigo-600/30 text-white shadow-inner shadow-indigo-950/30' : 'border-transparent text-slate-400 hover:bg-slate-800/70 hover:text-white')}><Icon size={15}/>{meta.label}{key === 'activity' && myRequests.length > 0 && <span className="rounded-full bg-indigo-400/20 px-1.5 py-0.5 text-[10px] text-indigo-200">{myRequests.length}</span>}</button>;
          })}
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-300"><ActiveIcon size={17}/></div>
              <div><h2 className="text-sm font-bold">{zone === 'activity' ? 'Your entertainment activity' : zone === 'movie' ? 'Movie plans' : zone === 'gaming' ? 'Gaming channels' : 'Books & reading spaces'}</h2><p className="mt-1 text-xs text-slate-400">{zone === 'activity' ? 'Created items, joined spaces and requests across all three zones.' : zone === 'reading' ? 'Browse reading communities, book listings and reading meetups.' : zone === 'movie' ? 'Find people for a movie plan or a group watch.' : 'Find players and communities for the games you enjoy.'}</p></div>
            </div>
            {zone !== 'activity' && <div className="flex gap-2">
              {zone === 'reading' && <button onClick={() => setTab(tab === 'community' ? 'explore' : 'community')} className={cx('inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold', tab === 'community' ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200' : 'border-slate-700 text-slate-300 hover:bg-slate-800')}><MessageCircle size={14}/>{tab === 'community' ? 'Browse books' : 'Community'}</button>}
              {zone === 'movie' && <button onClick={() => setTab(tab === 'community' ? 'explore' : 'community')} className={cx('inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold', tab === 'community' ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200' : 'border-slate-700 text-slate-300 hover:bg-slate-800')}><MessageCircle size={14}/>{tab === 'community' ? 'Browse plans' : 'Discussion'}</button>}
              {zone === 'gaming' && <button onClick={() => setTab(tab === 'community' ? 'explore' : 'community')} className={cx('inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold', tab === 'community' ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200' : 'border-slate-700 text-slate-300 hover:bg-slate-800')}><MessageCircle size={14}/>{tab === 'community' ? 'Explore channels' : 'Community'}</button>}
            </div>}
          </div>

          {zone !== 'activity' && tab === 'community' ? (
            <div className="p-4 sm:p-5">
              <div className="mb-4 rounded-lg border border-slate-800 bg-slate-900/70 p-3"><p className="text-sm font-semibold">{zone === 'movie' ? 'Movie discussion' : zone === 'gaming' ? 'Gaming discussion' : 'Reading community'}</p><p className="mt-1 text-xs leading-5 text-slate-400">{zone === 'movie' ? 'Discuss recommendations, upcoming releases and watch plans.' : zone === 'gaming' ? 'Talk about games, find teammates and share tips.' : 'Share book reviews, recommendations, reading goals or ask to borrow a book.'}</p></div>
              <div className="space-y-2">{(messages[`${zone}-community`] || []).map(message => <div key={message.id} className="rounded-lg border border-slate-800 bg-slate-900/50 p-3"><div className="mb-1 flex items-center justify-between gap-2"><p className="text-[11px] font-bold text-indigo-200">{message.author}</p>{message.authorId === profile.id && <button type="button" onClick={() => deleteOwnMessage(message.id, `${zone}-community`)} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-rose-300 hover:bg-rose-500/10" aria-label="Delete your post"><Trash2 size={12}/>Delete</button>}</div><p className="whitespace-pre-wrap text-sm text-slate-200">{message.text}</p></div>)}{!(messages[`${zone}-community`] || []).length && <p className="py-5 text-center text-xs text-slate-500">No posts yet. Start the conversation.</p>}</div>
              <form onSubmit={sendCommunityMessage} className="mt-4 flex gap-2"><input value={draftMessage} onChange={event => setDraftMessage(event.target.value)} placeholder="Write a post or recommendation…" className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-400"/><button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-400"><Send size={14}/><span className="hidden sm:inline">Post</span></button></form>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2 border-b border-slate-800 p-3 sm:flex-row sm:items-center">
                <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-400"><Search size={15}/><input value={search} onChange={event => setSearch(event.target.value)} placeholder={zone === 'reading' ? 'Search books, authors, communities…' : 'Search plans, channels and activities…'} className="w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-slate-500"/></label>
                <div className="flex flex-wrap gap-1.5">{(zone === 'activity' ? ['All', 'Joined', 'My items'] : ['All', 'Open', 'Joined']).map(option => <button key={option} onClick={() => setFilter(option)} className={cx('rounded-lg border px-3 py-2 text-xs font-semibold transition', filter === option ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200' : 'border-slate-700 bg-slate-900 text-slate-400 hover:text-white')}><SlidersHorizontal size={11} className="mr-1 inline"/>{option}</button>)}</div>
              </div>
              <div className="divide-y divide-slate-800/90">
                {(zone === 'activity' ? [...myItems.filter(item => filter === 'All' || (filter === 'Joined' ? joined.includes(item.id) : item.host === 'You')), ...myRequests.map(request => ({ ...request.item, id: request.id, isRequest: true, requestType: request.requestType, requestStatus: request.requestStatus }))] : filteredItems).filter((item, index, array) => array.findIndex(other => other.id === item.id) === index).map(item => {
                  const Icon = itemIcon(item); const isJoined = joined.includes(item.id); const pending = requests.some(request => request.itemId === item.id && request.requester === 'You');
                  return <article key={item.id} className="flex min-w-0 items-center gap-3 px-4 py-3.5 transition hover:bg-slate-900/50 sm:px-5">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-300"><Icon size={17}/></div>
                    <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-semibold text-slate-100">{item.title}</h3>{item.kind === 'gaming' && <span className="rounded-md bg-violet-400/10 px-2 py-0.5 text-[10px] text-violet-200">{item.game}</span>}{item.kind === 'reading' && item.category && <span className="rounded-md bg-amber-300/10 px-2 py-0.5 text-[10px] text-amber-100">{item.category}</span>}</div><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{item.detail}</p><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500"><span><Users size={11} className="mr-1 inline"/>{item.members || 1} {item.kind === 'reading' && item.category === 'Book listing' ? 'owner' : 'members'}</span><span><Clock3 size={11} className="mr-1 inline"/>{item.when}</span><span><MapPin size={11} className="mr-1 inline"/>{item.place}</span>{item.kind === 'reading' && item.book && <span><BookOpen size={11} className="mr-1 inline"/>{item.book}{item.author ? ` · ${item.author}` : ''}</span>}</div></div>
                    <div className="flex shrink-0 flex-col items-end gap-2"><span className="hidden rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-400 sm:inline-flex">{item.isRequest ? item.requestStatus : zone === 'activity' ? itemStatus(item) : item.access}</span>{item.isRequest ? <button onClick={() => cancelRequest(item.id)} className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 px-2.5 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/10">Cancel request</button> : zone === 'activity' ? <><button onClick={() => { setSelected(item); setModal(item.kind === 'reading' && item.category === 'Book listing' ? 'borrow' : 'detail'); }} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-2 text-xs font-semibold text-slate-200 hover:border-indigo-400">Open <ArrowUpRight size={13}/></button>{item.host === 'You' ? <button onClick={() => deleteOwnItem(item)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold text-rose-300 hover:bg-rose-500/10"><Trash2 size={12}/>Delete</button> : isJoined && <button onClick={() => leaveItem(item)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold text-amber-200 hover:bg-amber-500/10"><LogOut size={12}/>Leave</button>}</> : isJoined ? <><button onClick={() => { if (item.kind === 'gaming') { window.location.href = `/entertainment/community?id=${encodeURIComponent(item.id)}&name=${encodeURIComponent(item.title)}&game=${encodeURIComponent(item.game || 'Gaming')}`; } else { setSelected(item); setModal(item.kind === 'reading' && item.category === 'Book listing' ? 'borrow' : 'detail'); } }} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800">{item.kind === 'gaming' ? 'Open community' : 'Open'} <ChevronRight size={13}/></button><button onClick={() => leaveItem(item)} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold text-amber-200 hover:bg-amber-500/10"><LogOut size={12}/>Leave</button></> : <button onClick={() => { setSelected(item); if (item.kind === 'reading' && item.category === 'Book listing') setModal('borrow'); else joinItem(item); }} className={cx('inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-bold', pending ? 'border border-amber-500/40 bg-amber-500/10 text-amber-200' : 'bg-emerald-200 text-emerald-950 hover:bg-emerald-100')}>{pending ? 'Pending' : item.kind === 'reading' && item.category === 'Book listing' ? 'Borrow' : 'Join'}<ChevronRight size={13}/></button>}</div>
                  </article>;
                })}
                {((zone === 'activity' && myItems.length === 0 && myRequests.length === 0) || (zone !== 'activity' && filteredItems.length === 0)) && <div className="px-5 py-12 text-center"><div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400"><LibraryBig size={20}/></div><h3 className="text-sm font-semibold">Nothing here yet</h3><p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">Try another search or create the first plan, channel or reading space for the campus community.</p>{zone !== 'activity' && <button onClick={openCreate} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-200 px-3 py-2 text-xs font-bold text-emerald-950"><Plus size={14}/>Create new</button>}</div>}
              </div>
            </>
          )}
        </section>

        <div className="mt-3 flex flex-col gap-2 text-[10px] leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p><ShieldCheck size={12} className="mr-1 inline text-emerald-300"/>Campus community prototype. Do not share sensitive personal details in public posts.</p><button onClick={openProfile} className="self-start text-slate-400 underline decoration-slate-700 underline-offset-4 hover:text-white sm:self-auto">View profile settings</button></div>
      </div>

      {/* Create item modal */}
      {modal === 'create' && <Modal onClose={() => setModal('')} title={zone === 'movie' ? 'Create movie plan' : zone === 'gaming' ? 'Create gaming channel' : 'Create reading item'}>
        <form onSubmit={createItem} className="space-y-4">
          {zone === 'gaming' && <Field label="Game"><select value={form.game} onChange={event => updateForm('game', event.target.value)} className={inputClass}>{['Free Fire', 'BGMI / PUBG', 'Valorant', 'Minecraft', 'Chess', 'Other'].map(game => <option key={game}>{game}</option>)}</select></Field>}
          {zone === 'reading' && <Field label="What are you creating?"><select value={form.category} onChange={event => updateForm('category', event.target.value)} className={inputClass}>{['Book listing', 'Community', 'Reading meetup'].map(category => <option key={category}>{category}</option>)}</select></Field>}
          <Field label={zone === 'movie' ? 'Plan title *' : zone === 'gaming' ? 'Channel name *' : 'Title *'}><input required value={form.title} onChange={event => updateForm('title', event.target.value)} placeholder={zone === 'movie' ? 'e.g. Saturday movie night' : zone === 'gaming' ? 'e.g. BIT Valorant Squad' : 'e.g. Atomic Habits / Quiet Reading Circle'} className={inputClass}/></Field>
          {zone === 'movie' && <Field label="Movie (optional)"><input value={form.movie} onChange={event => updateForm('movie', event.target.value)} placeholder="Movie title or decide together" className={inputClass}/></Field>}
          {zone === 'reading' && form.category === 'Book listing' && <div className="grid gap-3 sm:grid-cols-2"><Field label="Book title"><input value={form.book} onChange={event => updateForm('book', event.target.value)} placeholder="Book name" className={inputClass}/></Field><Field label="Author"><input value={form.author} onChange={event => updateForm('author', event.target.value)} placeholder="Author name" className={inputClass}/></Field></div>}
          <Field label="Description"><textarea rows={3} value={form.detail} onChange={event => updateForm('detail', event.target.value)} placeholder="A few helpful details…" className={inputClass}/></Field>
          <div className="grid gap-3 sm:grid-cols-2"><Field label={zone === 'reading' ? 'Pickup / meetup time' : 'Date and time'}><input value={form.when} onChange={event => updateForm('when', event.target.value)} placeholder="e.g. Saturday · 5 PM" className={inputClass}/></Field><Field label={zone === 'reading' ? 'Pickup / meeting place' : 'Location'}><input value={form.place} onChange={event => updateForm('place', event.target.value)} placeholder="e.g. Campus library" className={inputClass}/></Field></div>
          {zone === 'reading' && form.category === 'Book listing' && <div className="grid gap-3 sm:grid-cols-2"><Field label="Book condition"><select value={form.condition} onChange={event => updateForm('condition', event.target.value)} className={inputClass}>{['New', 'Like new', 'Good', 'Worn'].map(condition => <option key={condition}>{condition}</option>)}</select></Field><Field label="Suggested loan period"><select value={form.loanDays} onChange={event => updateForm('loanDays', event.target.value)} className={inputClass}>{['3', '7', '14', '21'].map(days => <option key={days} value={days}>{days} days</option>)}</select></Field></div>}
          <div className="grid gap-3 sm:grid-cols-2"><Field label="Member limit"><input type="number" min="1" max="100" value={form.capacity} onChange={event => updateForm('capacity', event.target.value)} className={inputClass}/></Field><Field label="Access"><select value={form.access} onChange={event => updateForm('access', event.target.value)} className={inputClass}><option>Open</option><option>Approval required</option></select></Field></div>
          <ModalActions onCancel={() => setModal('')} submitLabel="Create"/>
        </form>
      </Modal>}

      {/* Details / chat / borrow modal */}
      {(modal === 'detail' || modal === 'borrow') && selected && <Modal onClose={() => setModal('')} title={modal === 'borrow' ? 'Book details & borrow request' : selected.title}>
        <div className="space-y-4"><p className="text-sm leading-6 text-slate-300">{selected.detail}</p><div className="rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-xs leading-6 text-slate-400"><p><span className="text-slate-200">When:</span> {selected.when}</p><p><span className="text-slate-200">Where:</span> {selected.place}</p>{selected.kind === 'reading' && selected.book && <><p><span className="text-slate-200">Book:</span> {selected.book}{selected.author ? ` by ${selected.author}` : ''}</p><p><span className="text-slate-200">Condition / loan:</span> {selected.condition || 'Not specified'} · {selected.loanDays || '7'} days suggested</p></>}</div>
          {modal === 'borrow' ? <><p className="text-xs leading-5 text-slate-400">A borrow request lets the owner contact you to confirm availability, pickup and return date. Avoid posting phone numbers or other private information publicly.</p><button onClick={() => { if (!requests.some(request => request.itemId === selected.id && request.requester === 'You')) setRequests(previous => [...previous, { id: `req-${Date.now()}`, itemId: selected.id, item: selected, requester: 'You', requestStatus: 'Pending', requestType: 'Borrow request' }]); setModal(''); notify('Borrow request recorded.'); }} className="inline-flex items-center gap-2 rounded-lg bg-emerald-200 px-3 py-2.5 text-xs font-bold text-emerald-950"><Bookmark size={14}/>Request to borrow</button></> : <><h3 className="text-xs font-bold text-slate-200">Discussion</h3><div className="max-h-52 space-y-2 overflow-y-auto">{(messages[selected.id] || []).map(message => <div key={message.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3"><div className="mb-1 flex items-center justify-between gap-2"><p className="text-[10px] font-bold text-indigo-200">{message.author}</p>{message.authorId === profile.id && <button type="button" onClick={() => deleteOwnMessage(message.id, selected.id)} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-rose-300 hover:bg-rose-500/10" aria-label="Delete your message"><Trash2 size={12}/>Delete</button>}</div><p className="whitespace-pre-wrap text-sm text-slate-200">{message.text}</p></div>)}{!(messages[selected.id] || []).length && <p className="text-xs text-slate-500">No messages yet.</p>}</div><form onSubmit={sendMessage} className="flex gap-2"><input value={draftMessage} onChange={event => setDraftMessage(event.target.value)} placeholder="Write a message…" className={cx(inputClass, 'min-w-0 flex-1')}/><button type="submit" className="rounded-lg bg-indigo-500 px-3 text-white hover:bg-indigo-400"><Send size={15}/></button></form></>}</div>
      </Modal>}

      {/* Profile modal: backend-owned identity fields are visibly read-only. */}
      {modal === 'profile' && <Modal onClose={() => setModal('')} title="My profile" subtitle="Identity details come from the BIT Connect backend and cannot be edited here.">
        <form onSubmit={saveProfile} className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3"><div className="grid h-11 w-11 place-items-center rounded-full border border-indigo-400/30 bg-indigo-500/15 text-sm font-bold text-indigo-200">{(profile.name || 'S').split(' ').map(part => part[0]).slice(0, 2).join('')}</div><div><p className="text-sm font-semibold text-white">{profile.name}</p><p className="text-xs text-slate-400">Verified student profile</p></div><ShieldCheck size={17} className="ml-auto text-emerald-300"/></div>
          <div className="grid gap-3 sm:grid-cols-2"><ReadOnlyField label="Full name" value={profile.name}/><ReadOnlyField label="Branch" value={profile.branch}/><ReadOnlyField label="Year" value={profile.year}/><ReadOnlyField label="Roll / registration number" value={profile.rollNumber}/></div>
          <div className="rounded-lg border border-emerald-400/15 bg-emerald-400/5 p-3 text-xs leading-5 text-emerald-100/80"><ShieldCheck size={13} className="mr-1 inline"/>These four fields are fetched from the backend. They are not editable and are never included in the profile update payload.</div>
          <div className="border-t border-slate-800 pt-4"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Editable profile details</p><div className="space-y-3"><Field label="Nickname (optional)"><input maxLength={30} value={profileDraft.nickname} onChange={event => setProfileDraft(previous => ({ ...previous, nickname: event.target.value }))} placeholder="What friends call you" className={inputClass}/></Field><Field label="Short bio"><textarea maxLength={240} rows={2} value={profileDraft.bio} onChange={event => setProfileDraft(previous => ({ ...previous, bio: event.target.value }))} placeholder="A little about your interests" className={inputClass}/></Field><Field label="Interests (comma-separated)"><input value={profileDraft.interests} onChange={event => setProfileDraft(previous => ({ ...previous, interests: event.target.value }))} placeholder="Movies, cricket, reading" className={inputClass}/></Field></div></div>
          <div className="flex flex-col-reverse gap-2 border-t border-slate-800 pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={() => setModal('')} className="rounded-lg border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800">Cancel</button><button disabled={profileSaving} type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-950 disabled:opacity-60"><Pencil size={13}/>{profileSaving ? 'Saving…' : 'Save editable details'}</button></div>
        </form>
      </Modal>}

      {toast && <div role="status" className="fixed bottom-4 left-1/2 z-[60] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-xs font-medium text-slate-100 shadow-xl"><Check size={15} className="shrink-0 text-emerald-300"/>{toast}</div>}
    </main>
  );
}

const inputClass = 'w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10';

function Field({ label, children }) {
  return <label className="block space-y-1.5"><span className="text-xs font-semibold text-slate-300">{label}</span>{children}</label>;
}
function ReadOnlyField({ label, value }) {
  return <Field label={label}><div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-400"><input readOnly aria-readonly="true" value={value || 'Provided by backend'} className="w-full cursor-not-allowed bg-transparent outline-none"/><ShieldCheck size={13} className="shrink-0 text-emerald-300"/></div></Field>;
}
function Modal({ title, subtitle, onClose, children }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-label={title} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-2xl border border-slate-700 bg-[#0d1424] p-4 shadow-2xl sm:rounded-2xl sm:p-5"><div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-800 pb-3"><div><h2 className="text-base font-bold text-white">{title}</h2>{subtitle && <p className="mt-1 text-xs leading-5 text-slate-400">{subtitle}</p>}</div><button onClick={onClose} aria-label="Close dialog" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"><X size={17}/></button></div>{children}</section></div>;
}
function ModalActions({ onCancel, submitLabel }) {
  return <div className="flex flex-col-reverse gap-2 border-t border-slate-800 pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={onCancel} className="rounded-lg border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800">Cancel</button><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-950 hover:bg-emerald-100"><Plus size={14}/>{submitLabel}</button></div>;
}