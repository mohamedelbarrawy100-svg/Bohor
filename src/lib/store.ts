import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CompanySettings,
  Customer,
  Expense,
  LedgerState,
  Payment,
  Project,
} from "./types";
import { DEMO_STATE, EMPTY_STATE } from "./seed";
import { uid } from "./utils";

type Actions = {
  updateSettings: (patch: Partial<CompanySettings>) => void;
  addCustomer: (input: Omit<Customer, "id" | "createdAt">) => string;
  updateCustomer: (id: string, patch: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addProject: (input: Omit<Project, "id" | "createdAt">) => string;
  updateProject: (id: string, patch: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addPayment: (input: Omit<Payment, "id">) => string;
  updatePayment: (id: string, patch: Partial<Payment>) => void;
  deletePayment: (id: string) => void;
  addExpense: (input: Omit<Expense, "id">) => string;
  updateExpense: (id: string, patch: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  loadDemo: () => void;
  resetAll: () => void;
};

export type AppStore = LedgerState & Actions;

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...DEMO_STATE,
      updateSettings: (patch) =>
        set((s) => ({ settings: { ...s.settings, ...patch } })),
      addCustomer: (input) => {
        const id = uid("c");
        set((s) => ({
          customers: [
            { ...input, id, createdAt: new Date().toISOString().slice(0, 10) },
            ...s.customers,
          ],
        }));
        return id;
      },
      updateCustomer: (id, patch) =>
        set((s) => ({
          customers: s.customers.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
      deleteCustomer: (id) =>
        set((s) => {
          const projectIds = new Set(
            s.projects.filter((p) => p.customerId === id).map((p) => p.id),
          );
          return {
            customers: s.customers.filter((c) => c.id !== id),
            projects: s.projects.filter((p) => p.customerId !== id),
            payments: s.payments.filter((p) => !projectIds.has(p.projectId)),
            expenses: s.expenses.filter((e) => !e.projectId || !projectIds.has(e.projectId)),
          };
        }),
      addProject: (input) => {
        const id = uid("p");
        set((s) => ({
          projects: [
            { ...input, id, createdAt: new Date().toISOString().slice(0, 10) },
            ...s.projects,
          ],
        }));
        return id;
      },
      updateProject: (id, patch) =>
        set((s) => ({
          projects: s.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      deleteProject: (id) =>
        set((s) => ({
          projects: s.projects.filter((p) => p.id !== id),
          payments: s.payments.filter((p) => p.projectId !== id),
          expenses: s.expenses.map((e) =>
            e.projectId === id ? { ...e, projectId: null } : e,
          ),
        })),
      addPayment: (input) => {
        const id = uid("pay");
        set((s) => ({ payments: [{ ...input, id }, ...s.payments] }));
        return id;
      },
      updatePayment: (id, patch) =>
        set((s) => ({
          payments: s.payments.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      deletePayment: (id) =>
        set((s) => ({ payments: s.payments.filter((p) => p.id !== id) })),
      addExpense: (input) => {
        const id = uid("ex");
        set((s) => ({ expenses: [{ ...input, id }, ...s.expenses] }));
        return id;
      },
      updateExpense: (id, patch) =>
        set((s) => ({
          expenses: s.expenses.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        })),
      deleteExpense: (id) =>
        set((s) => ({ expenses: s.expenses.filter((e) => e.id !== id) })),
      loadDemo: () => set({ ...DEMO_STATE }),
      resetAll: () => set({ ...EMPTY_STATE }),
    }),
    {
      name: "daftar-almuqawil-v1",
      skipHydration: true,
      partialize: (s) => ({
        settings: s.settings,
        customers: s.customers,
        projects: s.projects,
        payments: s.payments,
        expenses: s.expenses,
      }),
    },
  ),
);
