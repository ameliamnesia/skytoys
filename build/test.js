/*
import bsky from 'https://cdn.skypack.dev/@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
//import * as dotenv from 'https://cdn.skypack.dev/dotenv';
import process from 'https://cdn.skypack.dev/node-process'
//import * as fs from 'https://cdn.skypack.dev/node-fs';
//dotenv.config();

const didstring = await agent.resolveHandle({ handle: process.env.NEWHANDLE! });
let newdid = didstring.data.did

console.log(newdid);


const filename = 'handles.txt'

if (fs.existsSync(filename)) {
    const contents = fs.readFileSync(filename, 'utf-8').trim()
    const existing = contents.split(/\r?\n/)
    for (let i = 0; i < existing.length; i++) {
    console.log(existing[i]);
    }
} else {
    fs.writeFileSync(filename, "", {flag: 'wx+'});
    fs.appendFileSync(filename, "helloc \r\n");
    fs.appendFileSync(filename, "hsfdsfsdf \r\n");
    console.log('created file ' + filename);
}
*/
export {};
