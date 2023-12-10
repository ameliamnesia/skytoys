import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
dotenv.config();
const post_text = "typescript test 2";
async function skeet() {
    try {
        await agent.login({
            identifier: process.env.BSKY_USERNAME,
            password: process.env.BSKY_PASSWORD,
        });
        await agent.post({
            text: post_text
        });
        return "posted successfully";
    }
    catch (error) {
        return "Function failed to execute.";
    }
}
skeet();
