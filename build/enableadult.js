import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
import process from 'node:process';
import * as fs from 'node:fs';
dotenv.config();
const handles_file = './handles.txt';
export async function enableadult() {
    try {
        await agent.login({
            identifier: process.env.NEWHANDLE,
            password: process.env.BSKY_PASSWORD,
        });
        await agent.setPersonalDetails({ birthDate: process.env.BIRTHDAY });
        await agent.setAdultContentEnabled(true);
        console.log('preferences set for ', process.env.NEWHANDLE);
    }
    catch (error) {
        console.error('error setting preferences');
    }
}
export async function enableadult_bulk() {
    const handles_list = fs.readFileSync(handles_file, 'utf-8').trim();
    const existing = handles_list.split(/\r?\n/);
    for (let i = 0; i < existing.length; i++) {
        await agent.login({
            identifier: existing[i],
            password: process.env.BSKY_PASSWORD,
        });
        await agent.setPersonalDetails({ birthDate: process.env.NEWHANDLE });
        await agent.setAdultContentEnabled(true);
    }
}
