import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
const delay = ms => new Promise(res => setTimeout(res, ms));
import * as dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

export async function newacct() {
  try {
    await agent.createAccount({
     email: process.env.NEWEMAIL!,
      password: process.env.NEWPW!,
      handle: process.env.NEWHANDLE!,
      inviteCode: process.env.NEWCODE!,
    })
    await delay(2000);
    const didstring = await agent.resolveHandle({ handle: process.env.NEWHANDLE! });
    let newdid = didstring.data.did
    console.log('created' + process.env.NEWHANDLE + 'with DID' + newdid);
  } catch (error) {
    console.error('error creating account')
  }
}

