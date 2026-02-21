import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@workspace/db/index";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { User } from "next-auth";

export const providers = [

    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: { label: "Username", placeholder: "Enter your username", type: "text" },
            password: { label: "Password", placeholder: "****", type: "password" }
        },

        async authorize(credentials: Record<"username" | "password", string> | undefined): Promise<User | null> {

            const { username, password } = credentials ?? {};

            if (!username || !password) return null;

            try {
                const user = await client.user.findFirst({
                    where: {
                        username,
                        password
                    }
                })

                if (!user) return null;

                const payload = {username, id : user.id} as JwtPayload;
                const token = jwt.sign(payload, process.env.JWT_SECRET as string);

                return {
                    id: user.id,
                    username: user.username
                } as User;
            }
            catch(err){
                return null;
            }
        }
    })
]