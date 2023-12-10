import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
import process from 'node:process';
import * as fs from 'node:fs';
dotenv.config();

export async function followback() {
    const filename = './handles.txt'
    const didstring = await agent.resolveHandle({ handle: process.env.NEWHANDLE! });
    let newdid = didstring.data.did

    async function readfollow() {
        const contents = fs.readFileSync(filename, 'utf-8').trim()            
        const existing = contents.split(/\r?\n/)
        for (let i = 0; i < existing.length; i++) {
            await agent.login({
                identifier: existing[i],
                password: process.env.BSKY_PASSWORD!,
              });
           await agent.follow(newdid);
            //console.log(existing[i]);
        }
        fs.appendFileSync(filename, process.env.NEWHANDLE! + "\r\n");        
    }

    if (fs.existsSync(filename)) {
        readfollow();
    } else {
        fs.writeFileSync(filename, "", {flag: 'wx+'});
        readfollow();
    }
}
followback();