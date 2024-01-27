declare global {
    namespace App {
        type AuthRequest = import("lucia").AuthRequest

        interface Locals extends AuthRequest {
        }
    }
}

declare namespace Lucia {
    type Auth = import("$lib/server/lucia").Auth;
    type DatabaseUserAttributes = {
        username: string,
    };
    type DatabaseSessionAttributes = {};
}

// THIS IS IMPORTANT!
export {}
