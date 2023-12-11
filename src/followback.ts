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

export async function followback() {
    const didstring = await agent.resolveHandle({ handle: process.env.NEWHANDLE! });
    const count_handles = existing.length;
    try {
        async function readfollow() {
            let newdid = didstring.data.did
            for (let i = 0; i < existing.length; i++) {
                await agent.login({
                    identifier: existing[i],
                    password: process.env.BSKY_PASSWORD!,
                });
                await agent.follow(newdid);
            //console.log(existing[i]);
        }
        fs.appendFileSync(handles_file, process.env.NEWHANDLE! + "\r\n");
        console.log('added', process.env.NEWHANDLE!, 'to handles file');        
        }
        if (fs.existsSync(handles_file)) {
            readfollow();
        } else {
            fs.writeFileSync(handles_file, "", {flag: 'wx+'});
            readfollow();
        }
        console.log('followed', process.env.NEWHANDLE!, 'from', count_handles, 'accounts')
    } catch (error) {
        console.error('error following ', process.env.NEWHANDLE!)
    }
}