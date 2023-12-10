import { BskyAgent } from "@atproto/api";
const agent = new BskyAgent({ service: 'https://bsky.social'})
import * as dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

import { newacct } from "./newacct.js";
import { followaccts } from "./follow.js";
import { followback } from "./followback.js";
import { enableadult } from "./enableadult.js";
console.log('followed existing accounts')