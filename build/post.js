import bsky from '@atproto/api';
const { BskyAgent } = bsky;
import { agent } from './util.js';
import * as dotenv from 'dotenv';
dotenv.config();
import { util_login } from './util.js';
const delay = ms => new Promise(res => setTimeout(res, ms));
const post_text = "typescript test 4";
export async function skeet() {
    try {
        await agent.post({
            text: post_text
        });
        console.log('posted');
        return "posted successfully";
    }
    catch (error) {
        //return "Function failed to execute.";
        console.log('fail', error);
    }
}
await util_login();
await skeet();
