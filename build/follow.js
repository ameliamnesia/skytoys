import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
import process from 'node:process';
import * as fs from 'node:fs';
dotenv.config();
export async function followaccts() {
    await agent.login({
        identifier: process.env.BSKY_USERNAME,
        password: process.env.BSKY_PASSWORD,
    });
    const filename = './did.txt';
    const didstring = await agent.resolveHandle({ handle: process.env.BSKY_USERNAME });
    let newdid = didstring.data.did;
    async function readfollow() {
        const contents = fs.readFileSync(filename, 'utf-8').trim();
        const accts = contents.split(/\r?\n/);
        for (let i = 0; i < accts.length; i++) {
            await agent.follow(accts[i]);
            //console.log(accts[i]);
        }
        fs.appendFileSync(filename, newdid + "\r\n");
    }
    if (fs.existsSync(filename)) {
        readfollow();
    }
    else {
        fs.writeFileSync(filename, "", { flag: 'wx+' });
        readfollow();
    }
}
followaccts();
