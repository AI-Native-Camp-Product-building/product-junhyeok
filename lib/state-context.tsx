"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AppState } from "./types";
import {
  getInitialState,
  loadState,
  saveState,
  resetState as resetStoredState,
} from "./state";

interface StateContextValue {
  state: AppState;
  updateState: (updater: (prev: AppState) => AppState) => void;
  resetState: () => void;
}

const StateContext = createContext<StateContextValue | null>(null);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(getInitialState);

  useEffect(() => {
    setState(loadState());
  }, []);

  const updateState = useCallback(
    (updater: (prev: AppState) => AppState) => {
      setState((prev) => {
        const next = updater(prev);
        saveState(next);
        return next;
      });
    },
    []
  );

  const resetState = useCallback(() => {
    resetStoredState();
    setState(getInitialState());
  }, []);

  return (
    <StateContext.Provider value={{ state, updateState, resetState }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState(): StateContextValue {
  const ctx = useContext(StateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return ctx;
}
