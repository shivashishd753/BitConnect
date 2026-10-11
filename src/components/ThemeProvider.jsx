"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");

  const setTheme = useCallback((value) => {
    const nextTheme = value === "light" ? "light" : "dark";

    setThemeState(nextTheme);

    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function loadUserTheme(userId) {
      if (!userId) {
        if (active) setTheme("dark");
        return;
      }

      const { data, error } = await supabase
        .from("user_settings")
        .select("theme")
        .eq("user_id", userId)
        .maybeSingle();

      if (!active) return;

      setTheme(!error && data?.theme === "light" ? "light" : "dark");
    }

    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (!active) return;

        if (error || !data.user) {
          setTheme("dark");
          return;
        }

        loadUserTheme(data.user.id);
      })
      .catch(() => {
        if (active) setTheme("dark");
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setTheme("dark");
      } else if (session?.user?.id) {
        // Defer the query until after the auth callback returns.
        Promise.resolve().then(() => {
          loadUserTheme(session.user.id);
        });
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside a ThemeProvider."
    );
  }

  return context;
}