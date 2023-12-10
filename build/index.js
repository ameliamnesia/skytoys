import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
import * as fs from 'node:fs';
const delay = ms => new Promise(res => setTimeout(res, ms));
dotenv.config();
import { newacct } from "./newacct.js";
import { followaccts } from "./follow.js";
import { followback } from "./followback.js";
import { enableadult } from "./enableadult.js";
const handles_file = './handles.txt';
const dids_file = './did.txt';
const did_list = fs.readFileSync(dids_file, 'utf-8').trim();
const accts = did_list.split(/\r?\n/);
const handles_list = fs.readFileSync(handles_file, 'utf-8').trim();
const existing = handles_list.split(/\r?\n/);
//const didstring = await agent.resolveHandle({ handle: process.env.NEWHANDLE! });
async function auto() {
    try {
        await newacct();
        await followaccts();
        await followback();
        await enableadult();
    }
    catch (error) {
        console.error('Error');
    }
}
auto();
