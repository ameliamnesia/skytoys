import bsky from '@atproto/api';
import { AtpSessionData, AtpPersistSessionHandler, AtpSessionEvent } from '@atproto/api';
const { BskyAgent } = bsky;
export const agent = new BskyAgent({
    service: 'https://bsky.social',
    persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
       // store the session-data for reuse
     },
   });
import * as dotenv from 'dotenv';
dotenv.config();
import * as fs from 'node:fs';

export async function readfiles() {
    const dids_file = './did.txt'        
}

export async function util_login() {
    await agent.login({
        identifier: process.env.BSKY_USERNAME!,
        password: process.env.BSKY_PASSWORD!,
    }) 
    return agent;
}