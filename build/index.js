import { BskyAgent } from "@atproto/api";
const agent = new BskyAgent({ service: 'https://bsky.social' });
import * as dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();
function followaccts() {
    return (async () => {
        await agent.login({
            identifier: process.env.BSKY_USERNAME,
            password: process.env.BSKY_PASSWORD,
        });
        const fs = require('fs');
        const contents = fs.readFileSync('./did.txt', 'utf-8');
        const accts = contents.split(/\r?\n/);
        for (let i = 0; i < accts.length; i++) {
            await agent.follow(accts[i]);
        }
        fs.appendFileSync('did.txt', "\r\n" + process.env.ACCTTOFOLLOW);
    })();
}
followaccts();
console.log('followed existing accounts');
