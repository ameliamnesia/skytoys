import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
import process from 'node:process';
//import * as fs from 'node:fs';
dotenv.config();

export async function enableadult() {
      //const fs = require('fs')
      //const contents = fs.readFileSync('./handles.txt', 'utf-8').trim()   
      //const existing = contents.split(/\r?\n/)
      const didstring = await agent.resolveHandle({ handle: process.env.NEWHANDLE! });
      let newdid = didstring.data.did
      //for (let i = 0; i < existing.length; i++) {
          await agent.login({
              identifier: process.env.NEWHANDLE!,
              password: process.env.BSKY_PASSWORD!,
             });
            await agent.setPersonalDetails({ birthDate: '1987-01-11T05:44:04.395087Z' })
            await agent.setAdultContentEnabled(true);
      //}
   }
enableadult();