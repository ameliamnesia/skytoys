import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
import process from 'node:process';
import * as fs from 'node:fs';
dotenv.config();

const handles_file = './handles.txt'
const handles_list = fs.readFileSync(handles_file, 'utf-8').trim()            
const existing = handles_list.split(/\r?\n/)

import { followback } from "../followback.js";
followback();