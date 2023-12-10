import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
dotenv.config();
const handles_file = '../handles.txt';
import { enableadult_bulk } from "../enableadult.js";
enableadult_bulk();
