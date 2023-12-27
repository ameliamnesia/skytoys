import bsky from '@atproto/api';
const { BskyAgent } = bsky;
export const agent = new BskyAgent({
    service: 'https://bsky.social',
    persistSession: (evt, sess) => {
        // store the session-data for reuse
    },
});
import * as dotenv from 'dotenv';
dotenv.config();
export async function readfiles() {
    const dids_file = './did.txt';
}
export async function util_login() {
    await agent.login({
        identifier: process.env.BSKY_USERNAME,
        password: process.env.BSKY_PASSWORD,
    });
    return agent;
}
