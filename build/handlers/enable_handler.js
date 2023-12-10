import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
dotenv.config();
import { enableadult } from "../enableadult.js";
enableadult();
