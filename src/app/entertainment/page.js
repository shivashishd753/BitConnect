'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
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