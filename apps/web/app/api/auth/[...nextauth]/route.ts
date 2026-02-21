import { authConfig } from "@workspace/utils/authconfig"
import NextAuth from "next-auth"

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE }