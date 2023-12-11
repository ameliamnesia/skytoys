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

export async function followaccts() {
  const didstring = await agent.resolveHandle({ handle: process.env.BSKY_USERNAME! });
  const count_did = accts.length;
  try {
    await agent.login({
      identifier: process.env.BSKY_USERNAME!,
      password: process.env.BSKY_PASSWORD!,
    });
    let newdid = didstring.data.did
    async function readfollow() {
      for (let i = 0; i < accts.length; i++) {
        await agent.follow(accts[i]);
        //console.log(accts[i]);
      }
      fs.appendFileSync(dids_file, newdid + "\r\n");
      console.log('added', newdid, 'to did file');  
    }
    if (fs.existsSync(dids_file)) {
      readfollow();        
    } else {
      fs.writeFileSync(dids_file, "", {flag: 'wx+'});
      readfollow();
    }
    console.log('followed', count_did, 'accounts in did.txt');
  } catch (error) {
    console.error('error following existing accounts');
  }
}