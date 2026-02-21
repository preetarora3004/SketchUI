import { CallbacksOptions } from "next-auth";

export const callbacks : Partial<CallbacksOptions> = {

    async jwt({user, token}){
        if (user) {
            return {
                ...token,
                id : user.id,
                username : user.username
            }
        }
        return token;
    },

    async session({session, token}){
        if (session.user) {
            session.user.id = token.id as string;
            session.user.username = token.username as string;
        }
        return session;
    }
}