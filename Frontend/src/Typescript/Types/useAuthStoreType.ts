import type { UserInterface } from "../Interfaces/userInterface"

export type useAuthStoreType = {
    User: UserInterface | null,
    isLoggingIn: boolean,
    isSigningUp: boolean,
    isCheckingAuth: boolean,
    checkAuth: () => void,
}
