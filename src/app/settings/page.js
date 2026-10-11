
"use client";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
// import Link from "next/link";
// import { supabase } from "@/lib/supabase";
import { useTheme } from "@/components/ThemeProvider";
import {
  UserRound,
  Palette,
  Bell,
  ShieldCheck,
  Camera,
  Save,
  LogOut,
  Trash2,
  Sun,
  Moon,
  Trophy,
  Loader2,
} from "lucide-react";

const SPORT_ROLE_OPTIONS = {
  Football: [
    "Goalkeeper", "Defender", "Midfielder", "Forward",
    "Flexible / Casual",
  ],
  Cricket: [
    "Batter", "Bowler", "All-rounder", "Wicketkeeper",
    "Flexible / Casual",
  ],
  Basketball: [
    "Point Guard", "Shooting Guard", "Small Forward",
    "Power Forward", "Center", "Flexible / Casual",
  ],
  Badminton: [
    "Singles", "Doubles", "Mixed Doubles", "Flexible / Casual",
  ],
  Volleyball: [
    "Setter", "Outside Hitter", "Opposite Hitter",
    "Middle Blocker", "Libero", "Flexible / Casual",
  ],
  "Kho-Kho": [
    "Chaser", "Defender", "All-rounder", "Flexible / Casual",
  ],
};

const DEFAULT_PROFILE = {
  display_name: "",
  branch: "",
  academic_year: "",
  bio: "",
  avatar_url: "",
};

const DEFAULT_NOTIFICATIONS = {
  notify_community: true,
  notify_announcements: true,
  notify_events: true,
};

const DARK_PANEL =
  "rounded-2xl border border-white/10 bg-[#15161d] p-5 sm:p-6";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [notifications, setNotifications] = useState(
    DEFAULT_NOTIFICATIONS
  );
  const [sports, setSports] = useState([]);
  const [savedSports, setSavedSports] = useState([]);

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeError, setNoticeError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const panelClass = isLight
    ? "rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
    : DARK_PANEL;

  const inputClass = isLight
    ? "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-violet-500"
    : "mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500";

  const subtleText = isLight ? "text-gray-500" : "text-gray-400";
  const borderClass = isLight ? "border-gray-200" : "border-white/10";

  function showNotice(message, isError = false) {
    setNotice(message);
    setNoticeError(isError);
  }

  // Load the authenticated user's settings and sports from Supabase.
  useEffect(() => {
    let active = true;

    async function loadSettings() {
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (!active) return;

        if (authError || !authUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(authUser);

        const [
          { data: settings, error: settingsError },
          { data: sportRows, error: sportsError },
        ] = await Promise.all([
          supabase
            .from("user_settings")
            .select("*")
            .eq("user_id", authUser.id)
            .maybeSingle(),
          supabase
            .from("user_sports_preferences")
            .select("sport, player_role")
            .eq("user_id", authUser.id)
            .order("sport"),
        ]);

        if (!active) return;

        if (settingsError) {
          showNotice(
            "Could not load settings: " + settingsError.message,
            true
          );
        }

  const metadata = authUser.user_metadata ?? {};

const yearFromSignup = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year",
}[Number(metadata.academic_year)] ?? "";

setProfile({
  // Name and branch come from signup metadata first.
  display_name:
    metadata.full_name ??
    settings?.display_name ??
    metadata.name ??
    "",

  branch:
    metadata.branch ??
    settings?.branch ??
    "",

  academic_year:
    yearFromSignup ||
    settings?.academic_year ||
    "",

  bio: settings?.bio ?? "",

  avatar_url:
    settings?.avatar_url ??
    metadata.avatar_url ??
    "",
});

        setTheme(settings?.theme === "light" ? "light" : "dark");

        setNotifications({
          notify_community: settings?.notify_community ?? true,
          notify_announcements:
            settings?.notify_announcements ?? true,
          notify_events: settings?.notify_events ?? true,
        });

        if (sportsError) {
          showNotice(
            "Could not load sports: " + sportsError.message,
            true
          );
        } else {
          const rows = sportRows ?? [];
          setSports(rows);
          setSavedSports(rows.map((item) => item.sport));
        }
      } catch (error) {
        if (active) {
          showNotice(
            "Unable to load settings: " +
              (error?.message || "Please try again."),
            true
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadSettings();

    return () => {
      active = false;
    };
  }, [setTheme]);

function buildSettingsPayload(overrides = {}) {
  if (!user?.id) return null;

  // Name and branch are sourced from signup metadata,
  // not editable Settings fields.
  const {
    display_name,
    branch,
    ...editableProfile
  } = profile;

  return {
    user_id: user.id,
    ...editableProfile,
    theme,
    ...notifications,
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

  async function saveSettings(
    overrides = {},
    successMessage = "Settings saved successfully."
  ) {
    if (!user?.id) {
      showNotice("Please sign in again.", true);
      return false;
    }

    const payload = buildSettingsPayload(overrides);

    if (!payload) {
      showNotice("Could not identify your account.", true);
      return false;
    }

    setBusy("settings");

    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert(payload, { onConflict: "user_id" });

      if (error) {
        showNotice("Could not save settings: " + error.message, true);
        return false;
      }

      showNotice(successMessage);
      return true;
    } catch (error) {
      showNotice(
        "Unexpected error: " +
          (error?.message || "Please try again."),
        true
      );
      return false;
    } finally {
      setBusy("");
    }
  }

  async function saveProfile(event) {
    event.preventDefault();

    // display_name is read-only in the form.
    await saveSettings(
      { ...profile },
      "Your profile has been saved."
    );
  }

  async function changeTheme(nextTheme) {
    // The shared provider updates the entire app immediately.
    setTheme(nextTheme);

    await saveSettings(
      { theme: nextTheme },
      "Appearance preference saved."
    );
  }

  async function changeNotification(key, checked) {
    setNotifications((current) => ({
      ...current,
      [key]: checked,
    }));

    await saveSettings(
      { [key]: checked },
      "Notification preference saved."
    );
  }

  function toggleSport(sport, checked) {
    setSports((current) => {
      if (checked) {
        if (current.some((item) => item.sport === sport)) {
          return current;
        }

        return [
          ...current,
          {
            sport,
            player_role: SPORT_ROLE_OPTIONS[sport][0],
          },
        ];
      }

      return current.filter((item) => item.sport !== sport);
    });
  }

  function changeSportRole(sport, player_role) {
    setSports((current) =>
      current.map((item) =>
        item.sport === sport ? { ...item, player_role } : item
      )
    );
  }

  async function saveSportsPreferences(event) {
    event.preventDefault();

    if (!user?.id) {
      showNotice("Please sign in again.", true);
      return;
    }

    setBusy("sports");

    try {
      const selectedSports = sports.map((item) => item.sport);
      const removedSports = savedSports.filter(
        (sport) => !selectedSports.includes(sport)
      );

      if (sports.length > 0) {
        const rows = sports.map((item) => ({
          user_id: user.id,
          sport: item.sport,
          player_role: item.player_role,
          updated_at: new Date().toISOString(),
        }));

        const { error } = await supabase
          .from("user_sports_preferences")
          .upsert(rows, { onConflict: "user_id,sport" });

        if (error) {
          showNotice("Could not save sports: " + error.message, true);
          return;
        }
      }

      if (removedSports.length > 0) {
        const { error } = await supabase
          .from("user_sports_preferences")
          .delete()
          .eq("user_id", user.id)
          .in("sport", removedSports);

        if (error) {
          showNotice(
            "Could not remove sports: " + error.message,
            true
          );
          return;
        }
      }

      setSavedSports(selectedSports);
      showNotice("Your sports and roles have been saved.");
    } catch (error) {
      showNotice(
        "Could not save sports: " +
          (error?.message || "Please try again."),
        true
      );
    } finally {
      setBusy("");
    }
  }

  async function uploadAvatar(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !user?.id) return;

    if (!file.type.startsWith("image/")) {
      showNotice("Please select an image file.", true);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotice("Your image must be smaller than 5 MB.", true);
      return;
    }

    setBusy("avatar");

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${user.id}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        showNotice(
          'Photo upload failed. Check the "avatars" bucket and its policies. ' +
            uploadError.message,
          true
        );
        return;
      }

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(path);

      const avatarUrl = data.publicUrl;

      const { error: saveError } = await supabase
        .from("user_settings")
        .upsert(
          buildSettingsPayload({ avatar_url: avatarUrl }),
          { onConflict: "user_id" }
        );

      if (saveError) {
        showNotice(
          "Photo uploaded, but its URL could not be saved: " +
            saveError.message,
          true
        );
        return;
      }

      setProfile((current) => ({
        ...current,
        avatar_url: avatarUrl,
      }));

      showNotice("Profile photo updated.");
    } catch (error) {
      showNotice(
        "Photo upload failed: " +
          (error?.message || "Please try again."),
        true
      );
    } finally {
      setBusy("");
    }
  }

  async function updatePassword(event) {
    event.preventDefault();

    if (newPassword.length < 8) {
      showNotice("Password must contain at least 8 characters.", true);
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotice("The passwords do not match.", true);
      return;
    }

    setBusy("password");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        showNotice("Password update failed: " + error.message, true);
        return;
      }

      setNewPassword("");
      setConfirmPassword("");
      showNotice("Your password has been updated.");
    } catch (error) {
      showNotice(
        "Password update failed: " +
          (error?.message || "Please try again."),
        true
      );
    } finally {
      setBusy("");
    }
  }

  async function signOut() {
    setBusy("signout");

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        showNotice("Could not sign out: " + error.message, true);
        return;
      }

      window.location.href = "/";
    } finally {
      setBusy("");
    }
  }

  async function requestAccountDeletion() {
    if (!user?.id) {
      showNotice("Please sign in again.", true);
      return;
    }

    if (deleteConfirmation !== "DELETE") {
      showNotice('Type "DELETE" to confirm.', true);
      return;
    }

    setBusy("delete");

    try {
      const { error } = await supabase.functions.invoke(
        "delete-account",
        { body: { confirmation: "DELETE" } }
      );

      if (error) {
        showNotice(
          'Account deletion failed. Confirm that the secure "delete-account" ' +
            "Edge Function is deployed. " +
            error.message,
          true
        );
        return;
      }

      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (error) {
      showNotice(
        "Account deletion failed: " +
          (error?.message || "Please try again."),
        true
      );
    } finally {
      setBusy("");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0e12] text-white">
        <Loader2 className="animate-spin" size={28} />
        <span className="ml-3 text-sm text-gray-400">
          Loading settings...
        </span>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0d0e12] px-4 text-center text-white">
        <ShieldCheck size={42} className="mb-4 text-violet-400" />
        <h1 className="text-2xl font-bold">Sign in to your settings</h1>
        <p className="mt-2 text-sm text-gray-400">
          Sign in to manage your profile and preferences.
        </p>
        <Link
          href="/login"
          className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Go to sign in
        </Link>
      </main>
    );
  }

  return (
    <main
      className={
        isLight
          ? "min-h-screen bg-gray-100 text-gray-900"
          : "min-h-screen bg-[#0d0e12] text-white"
      }
    >
      <header className={isLight ? "border-b border-gray-200" : "border-b border-white/10"}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/home" className="text-xl font-bold">
            BIT <span className="text-violet-500">Connect</span>
          </Link>

          <nav className="flex items-center gap-4 text-sm sm:gap-6">
            <Link href="/home" className="opacity-70 hover:opacity-100">
              Sports
            </Link>
            <Link
              href="/entertainment"
              className="hidden opacity-70 hover:opacity-100 sm:block"
            >
              Entertainment
            </Link>
            <Link href="/community" className="opacity-70 hover:opacity-100">
              Community
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-500">
            BIT Sindri · Account
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Settings</h1>
          <p className={`mt-2 text-sm ${subtleText}`}>
            Manage your profile, sports, preferences and security.
          </p>
        </section>

        {notice && (
          <div
            role="status"
            aria-live="polite"
            className={`mb-6 rounded-xl border p-4 text-sm ${
              noticeError
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-violet-500/30 bg-violet-500/10 text-violet-500"
            }`}
          >
            {notice}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className={`${panelClass} h-fit`}>
            <p className={`mb-3 px-2 text-xs font-semibold uppercase tracking-wider ${subtleText}`}>
              Your account
            </p>
            <nav className="space-y-1">
              <a href="#profile" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-violet-500/10">
                <UserRound size={18} /> Profile
              </a>
              <a href="#sports" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-violet-500/10">
                <Trophy size={18} /> Sports &amp; roles
              </a>
              <a href="#appearance" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-violet-500/10">
                <Palette size={18} /> Appearance
              </a>
              <a href="#notifications" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-violet-500/10">
                <Bell size={18} /> Notifications
              </a>
              <a href="#security" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-violet-500/10">
                <ShieldCheck size={18} /> Account &amp; security
              </a>
            </nav>
          </aside>

          <div className="min-w-0 space-y-6">
            {/* PROFILE */}
            <section id="profile" className={panelClass}>
              <div className="mb-5 flex items-center gap-3">
                <UserRound className="text-violet-500" size={22} />
                <div>
                  <h2 className="text-lg font-semibold">Profile</h2>
                  <p className={`text-sm ${subtleText}`}>
                    Your name is read-only. Update the other details here.
                  </p>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-violet-500/30 bg-violet-500/10 text-2xl font-bold text-violet-500">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    (profile.display_name || user.email || "S")
                      .charAt(0)
                      .toUpperCase()
                  )}
                </div>

                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium hover:bg-violet-500/10">
                    <Camera size={17} />
                    {busy === "avatar" ? "Uploading..." : "Change photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={uploadAvatar}
                      disabled={Boolean(busy)}
                      className="hidden"
                    />
                  </label>
                  <p className={`mt-2 text-xs ${subtleText}`}>
                    Images only · Maximum 5 MB
                  </p>
                </div>
              </div>

              <form onSubmit={saveProfile} className="space-y-4">
                <div>
                  <label htmlFor="display-name" className="text-sm font-medium">
                    Student name
                  </label>
<input
  id="display-name"
  className={`${inputClass} cursor-not-allowed opacity-75`}
  value={profile.display_name}
  readOnly
  aria-readonly="true"
  placeholder="Name from your account"
/>
                  <p className={`mt-1 text-xs ${subtleText}`}>
                    Your name cannot be changed here.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
  <label htmlFor="branch" className="text-sm font-medium">
    Branch
  </label>

  <input
  id="branch"
  className={`${inputClass} cursor-not-allowed opacity-75`}
  value={profile.branch}
  readOnly
  aria-readonly="true"
  placeholder="Branch from your account"
/>

  <p className={`mt-1 text-xs ${subtleText}`}>
    Your branch cannot be changed here.
  </p>
</div>

                  <div>
                    <label htmlFor="academic-year" className="text-sm font-medium">
                      Academic year
                    </label>
                    <select
                      id="academic-year"
                      className={inputClass}
                      value={profile.academic_year}
                      style={{ colorScheme: isLight ? "light" : "dark" }}
                      onChange={(event) =>
                        setProfile({
                          ...profile,
                          academic_year: event.target.value,
                        })
                      }
                    >
                      <option value="">Select year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                  <textarea
                    id="bio"
                    className={inputClass}
                    rows={3}
                    maxLength={300}
                    value={profile.bio}
                    onChange={(event) =>
                      setProfile({ ...profile, bio: event.target.value })
                    }
                    placeholder="A little about you..."
                  />
                  <p className={`mt-1 text-right text-xs ${subtleText}`}>
                    {profile.bio.length}/300
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Account email</label>
                  <p className={`mt-2 break-all rounded-xl border ${borderClass} px-4 py-3 text-sm ${subtleText}`}>
                    {user.email || "No email available"}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={Boolean(busy)}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
                >
                  <Save size={17} />
                  {busy === "settings" ? "Saving..." : "Save profile"}
                </button>
              </form>
            </section>

            {/* SPORTS */}
            <section id="sports" className={panelClass}>
              <div className="mb-5 flex items-center gap-3">
                <Trophy className="text-violet-500" size={22} />
                <div>
                  <h2 className="text-lg font-semibold">Sports &amp; playing roles</h2>
                  <p className={`text-sm ${subtleText}`}>
                    Select the sports you play and your role in each.
                  </p>
                </div>
              </div>

              <form onSubmit={saveSportsPreferences}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.keys(SPORT_ROLE_OPTIONS).map((sport) => {
                    const selected = sports.find((item) => item.sport === sport);

                    return (
                      <div
                        key={sport}
                        className={`rounded-xl border p-4 ${
                          selected
                            ? "border-violet-500 bg-violet-500/5"
                            : borderClass
                        }`}
                      >
                        <label className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={Boolean(selected)}
                            disabled={Boolean(busy)}
                            onChange={(event) =>
                              toggleSport(sport, event.target.checked)
                            }
                            className="h-4 w-4 accent-violet-500"
                          />
                          <span className="text-sm font-semibold">{sport}</span>
                        </label>

                        {selected && (
                          <div className="mt-4">
                            <label
                              htmlFor={`sport-role-${sport}`}
                              className="text-xs font-medium"
                            >
                              Playing role
                            </label>
                            <select
                              id={`sport-role-${sport}`}
                              className={inputClass}
                              style={{ colorScheme: isLight ? "light" : "dark" }}
                              value={selected.player_role}
                              disabled={Boolean(busy)}
                              onChange={(event) =>
                                changeSportRole(sport, event.target.value)
                              }
                            >
                              {SPORT_ROLE_OPTIONS[sport].map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className={`mt-4 text-xs ${subtleText}`}>
                  You can select multiple sports and choose a different role for each.
                </p>

                <button
                  type="submit"
                  disabled={Boolean(busy)}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50"
                >
                  <Save size={17} />
                  {busy === "sports" ? "Saving..." : "Save sports & roles"}
                </button>
              </form>
            </section>

            {/* APPEARANCE */}
            <section id="appearance" className={panelClass}>
              <div className="mb-5 flex items-center gap-3">
                <Palette className="text-violet-500" size={22} />
                <div>
                  <h2 className="text-lg font-semibold">Appearance</h2>
                  <p className={`text-sm ${subtleText}`}>
                    Choose your preferred website theme.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { value: "dark", label: "Dark mode", Icon: Moon },
                  { value: "light", label: "Light mode", Icon: Sun },
                ].map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    disabled={Boolean(busy)}
                    onClick={() => changeTheme(value)}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                      theme === value
                        ? "border-violet-500 bg-violet-500/10"
                        : `${borderClass} hover:bg-violet-500/5`
                    }`}
                  >
                    <Icon size={22} className="text-violet-500" />
                    <span className="flex-1 text-sm font-medium">{label}</span>
                    <span
                      className={`h-4 w-4 rounded-full border ${
                        theme === value
                          ? "border-violet-500 bg-violet-500"
                          : "border-gray-500"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <p className={`mt-3 text-xs ${subtleText}`}>
                Your theme preference is saved to Supabase and applied app-wide
                by the shared theme provider.
              </p>
            </section>

            {/* NOTIFICATIONS */}
            <section id="notifications" className={panelClass}>
              <div className="mb-5 flex items-center gap-3">
                <Bell className="text-violet-500" size={22} />
                <div>
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  <p className={`text-sm ${subtleText}`}>
                    Manage your saved notification preferences.
                  </p>
                </div>
              </div>

              {[
                {
                  key: "notify_community",
                  title: "Community activity",
                  description: "Updates related to community discussions.",
                },
                {
                  key: "notify_announcements",
                  title: "Campus announcements",
                  description: "Important college notices and updates.",
                },
                {
                  key: "notify_events",
                  title: "Events and activities",
                  description: "Updates about campus events.",
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className={`flex cursor-pointer items-center justify-between gap-4 border-b ${borderClass} py-4 last:border-b-0`}
                >
                  <span>
                    <span className="block text-sm font-medium">{item.title}</span>
                    <span className={`mt-1 block text-xs ${subtleText}`}>
                      {item.description}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    disabled={Boolean(busy)}
                    onChange={(event) =>
                      changeNotification(item.key, event.target.checked)
                    }
                    className="h-5 w-5 accent-violet-500"
                  />
                </label>
              ))}

              <p className={`mt-3 text-xs ${subtleText}`}>
                Preferences are stored in Supabase. Actual notification delivery
                needs to be connected to a notification system.
              </p>
            </section>

            {/* ACCOUNT AND SECURITY */}
            <section id="security" className={panelClass}>
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="text-violet-500" size={22} />
                <div>
                  <h2 className="text-lg font-semibold">Account &amp; security</h2>
                  <p className={`text-sm ${subtleText}`}>
                    Manage your password and account session.
                  </p>
                </div>
              </div>

              <form onSubmit={updatePassword} className="space-y-4">
                <h3 className="text-sm font-semibold">Change password</h3>

                <div>
                  <label htmlFor="new-password" className="text-sm">
                    New password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    className={inputClass}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    minLength={8}
                    required
                    placeholder="At least 8 characters"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="text-sm">
                    Confirm new password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    className={inputClass}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    minLength={8}
                    required
                    placeholder="Re-enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={Boolean(busy)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-violet-500/10 disabled:opacity-50"
                >
                  {busy === "password" ? "Updating..." : "Update password"}
                </button>
              </form>

              <div className={`my-6 border-t ${borderClass}`} />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold">Sign out</h3>
                  <p className={`mt-1 text-xs ${subtleText}`}>
                    Sign out of your current session.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={signOut}
                  disabled={Boolean(busy)}
                  className={`inline-flex items-center gap-2 rounded-xl border ${borderClass} px-4 py-2.5 text-sm hover:bg-violet-500/10 disabled:opacity-50`}
                >
                  <LogOut size={17} />
                  {busy === "signout" ? "Signing out..." : "Sign out"}
                </button>
              </div>

              <div className="my-6 border-t border-red-500/20" />

              <h3 className="text-sm font-semibold text-red-400">Delete account</h3>
              <p className={`mt-1 text-sm ${subtleText}`}>
                Account deletion requires a deployed, secure delete-account
                Supabase Edge Function. Never expose a service-role key in
                browser code.
              </p>

              <label htmlFor="delete-confirmation" className="mt-4 block text-sm">
                Type DELETE to confirm
              </label>
              <input
                id="delete-confirmation"
                className={inputClass}
                value={deleteConfirmation}
                onChange={(event) => setDeleteConfirmation(event.target.value)}
                placeholder="DELETE"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={requestAccountDeletion}
                disabled={
                  Boolean(busy) || deleteConfirmation !== "DELETE"
                }
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={17} />
                {busy === "delete" ? "Processing..." : "Delete my account"}
              </button>
            </section>
          </div>
        </div>

        <footer className={`mt-8 border-t ${borderClass} pt-5 text-center text-xs ${subtleText}`}>
          BIT Connect · Built for the BIT Sindri community
        </footer>
      </div>
    </main>
  );
}
