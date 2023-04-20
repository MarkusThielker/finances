declare global {
    namespace App {
        type AuthRequest = import("lucia-auth").AuthRequest

        interface Locals extends AuthRequest {
        }
    }
}

declare global {
    namespace Lucia {
        type Auth = import("$lib/server/lucia").Auth
        type UserAttributes = {
            username: string
        }
    }
}

export {}
