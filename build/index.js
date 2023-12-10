import { BskyAgent } from "@atproto/api";
const agent = new BskyAgent({ service: 'https://bsky.social' });
import * as dotenv from 'dotenv';
dotenv.config();
console.log('followed existing accounts');
