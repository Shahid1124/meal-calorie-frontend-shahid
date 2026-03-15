import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { registerUser, loginUser } from "@/lib/api";
import { User, RegisterPayload, LoginPayload } from "@/types";

type AuthState = {
  user: User | null;
  loading: boolean;
  token: string | null;
  error: string | null;

  register: (
    payload: RegisterPayload & { confirm_password: string },
  ) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  errorClear: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      token: null,
      error: null,

      register: async (payload) => {
        const { confirm_password, ...formDataPayload } = payload;

        set({ loading: true, error: null });

        try {
          const data = await registerUser(formDataPayload);

          set({
            user: data.user,
            token: data.token,
            loading: false,
          });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Registration failed",
            loading: false,
          });
        }
      },
      login: async (payload) => {
        set({ loading: true, error: null });

        try {
          const data = await loginUser(payload);
          set({
            user: data.user,
            token: data.token,
            loading: false,
          });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Login failed",
            loading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          error: null,
        });
      },
      errorClear: () => set({ error: null }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);

export default useAuthStore;
