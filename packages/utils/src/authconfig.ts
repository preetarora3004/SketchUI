import { NextAuthOptions } from "next-auth";
import { providers } from "./provider";
import { callbacks } from "./callbacks";

export const authConfig : NextAuthOptions = {

    providers,
    callbacks
} 