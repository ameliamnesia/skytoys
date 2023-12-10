import { BskyAgent } from "@atproto/api";
const agent = new BskyAgent({ service: 'https://bsky.social' });
import * as dotenv from 'dotenv';
dotenv.config();
import { newacct } from "./newacct.js";
import { followaccts } from "./follow.js";
import { followback } from "./followback.js";
import { enableadult } from "./enableadult.js";
async function auto() {
    try {
        await newacct();
        await followaccts();
        await followback();
        enableadult();
    }
    catch (error) {
        console.error('Error');
    }
}
auto();
