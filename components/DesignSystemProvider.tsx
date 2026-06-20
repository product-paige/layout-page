"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { type DesignSystem, type ButtonSettings, EMPTY_DS } from "@/lib/ds";

const KEY = "lp-design-system";

type Ctx = {
  ds: DesignSystem;
  addButton: (name: string, s: ButtonSettings) => void;
  updateButton: (id: string, name: string, s: ButtonSettings) => void;
  removeButton: (id: string) => void;
  clearAll: () => void;
};

const DesignSystemContext = createContext<Ctx | null>(null);

export function useDesignSystem() {
  const v = useContext(DesignSystemContext);
  if (!v) throw new Error("useDesignSystem must be used within DesignSystemProvider");
  return v;
}

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const [ds, setDs] = useState<DesignSystem>(EMPTY_DS);
  const hydrated = useRef(false);

  // load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDs({ ...EMPTY_DS, ...JSON.parse(raw) });
    } catch {}
  }, []);

  // persist on change (skip the initial empty render)
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(ds));
    } catch {}
  }, [ds]);

  const addButton = (name: string, s: ButtonSettings) =>
    setDs((d) => ({ ...d, buttons: [...d.buttons, { id: crypto.randomUUID(), name, s }] }));
  const updateButton = (id: string, name: string, s: ButtonSettings) =>
    setDs((d) => ({ ...d, buttons: d.buttons.map((b) => (b.id === id ? { ...b, name, s } : b)) }));
  const removeButton = (id: string) =>
    setDs((d) => ({ ...d, buttons: d.buttons.filter((b) => b.id !== id) }));
  const clearAll = () => setDs(EMPTY_DS);

  return (
    <DesignSystemContext.Provider value={{ ds, addButton, updateButton, removeButton, clearAll }}>
      {children}
    </DesignSystemContext.Provider>
  );
}
