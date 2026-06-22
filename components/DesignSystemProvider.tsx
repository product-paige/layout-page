"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  type Store,
  type System,
  type ButtonSettings,
  type Tokens,
  newSystem,
} from "@/lib/ds";

const KEY = "lp-ds-store";
const LEGACY_KEY = "lp-design-system";

// Fixed-id default so server and client render identically (no hydration mismatch);
// real data is loaded from localStorage in an effect.
const DEFAULT_STORE: Store = {
  systems: [{ id: "default", name: "My System", tokens: defaultTokens(), buttons: [] }],
  activeId: "default",
};
function defaultTokens(): Tokens {
  return { accent: "#4337FF", ink: "#161616", surface: "#ffffff", font: "sans" };
}

type Ctx = {
  systems: System[];
  active: System;
  activeId: string;
  setActive: (id: string) => void;
  createSystem: (name?: string) => void;
  renameSystem: (id: string, name: string) => void;
  duplicateSystem: (id: string) => void;
  deleteSystem: (id: string) => void;
  // active-system-scoped:
  addButton: (name: string, s: ButtonSettings) => void;
  updateButton: (id: string, name: string, s: ButtonSettings) => void;
  removeButton: (id: string) => void;
  clearActiveButtons: () => void;
  setToken: (key: keyof Tokens, value: string) => void;
};

const DesignSystemContext = createContext<Ctx | null>(null);

export function useDesignSystem() {
  const v = useContext(DesignSystemContext);
  if (!v) throw new Error("useDesignSystem must be used within DesignSystemProvider");
  return v;
}

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store>(DEFAULT_STORE);
  const hydrated = useRef(false);

  // load once (migrate legacy single-system data if present)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        setStore(JSON.parse(raw));
        return;
      }
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        const parsed = JSON.parse(legacy);
        const sys = newSystem("My System", parsed.buttons ?? []);
        setStore({ systems: [sys], activeId: sys.id });
      }
    } catch {}
  }, []);

  // persist on change (skip the first synchronous render)
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {}
  }, [store]);

  const active = store.systems.find((s) => s.id === store.activeId) ?? store.systems[0];

  // helper: replace the active system via an updater
  const updateActive = (fn: (sys: System) => System) =>
    setStore((st) => ({
      ...st,
      systems: st.systems.map((s) => (s.id === st.activeId ? fn(s) : s)),
    }));

  const ctx: Ctx = {
    systems: store.systems,
    active,
    activeId: store.activeId,
    setActive: (id) => setStore((st) => ({ ...st, activeId: id })),
    createSystem: (name) =>
      setStore((st) => {
        const sys = newSystem(name?.trim() || `System ${st.systems.length + 1}`);
        return { systems: [...st.systems, sys], activeId: sys.id };
      }),
    renameSystem: (id, name) =>
      setStore((st) => ({
        ...st,
        systems: st.systems.map((s) => (s.id === id ? { ...s, name: name.trim() || s.name } : s)),
      })),
    duplicateSystem: (id) =>
      setStore((st) => {
        const src = st.systems.find((s) => s.id === id);
        if (!src) return st;
        const copy: System = {
          ...src,
          id: crypto.randomUUID(),
          name: `${src.name} copy`,
          tokens: { ...src.tokens },
          buttons: src.buttons.map((b) => ({ ...b, id: crypto.randomUUID() })),
        };
        return { systems: [...st.systems, copy], activeId: copy.id };
      }),
    deleteSystem: (id) =>
      setStore((st) => {
        if (st.systems.length <= 1) return st; // keep at least one
        const systems = st.systems.filter((s) => s.id !== id);
        const activeId = st.activeId === id ? systems[0].id : st.activeId;
        return { systems, activeId };
      }),
    addButton: (name, s) =>
      updateActive((sys) => ({
        ...sys,
        buttons: [...sys.buttons, { id: crypto.randomUUID(), name, s }],
      })),
    updateButton: (id, name, s) =>
      updateActive((sys) => ({
        ...sys,
        buttons: sys.buttons.map((b) => (b.id === id ? { ...b, name, s } : b)),
      })),
    removeButton: (id) =>
      updateActive((sys) => ({ ...sys, buttons: sys.buttons.filter((b) => b.id !== id) })),
    clearActiveButtons: () => updateActive((sys) => ({ ...sys, buttons: [] })),
    setToken: (key, value) =>
      updateActive((sys) => ({ ...sys, tokens: { ...sys.tokens, [key]: value } })),
  };

  return <DesignSystemContext.Provider value={ctx}>{children}</DesignSystemContext.Provider>;
}
