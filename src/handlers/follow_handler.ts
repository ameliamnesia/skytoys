import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
import process from 'node:process';
import * as fs from 'node:fs';
dotenv.config();

const dids_file = './did.txt'

const did_list = fs.readFileSync(dids_file, 'utf-8').trim()            
const accts = did_list.split(/\r?\n/)

import { followaccts } from "../follow.js";
followaccts();
