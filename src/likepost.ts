import bsky, { AppBskyActorGetProfile, AppBskyActorProfile, BskyNS } from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
const delay = ms => new Promise(res => setTimeout(res, ms));
import * as dotenv from 'dotenv';
import process from 'node:process';
import * as fs from 'node:fs';
dotenv.config();

const handles_file = './handles.txt'
const handles_list = fs.readFileSync(handles_file, 'utf-8').trim()            
const existing = handles_list.split(/\r?\n/)

export async function likepost() { 
    let post_link = process.argv[2];
    let splitpost = post_link.toString().split("/");
    let bskyhandle = splitpost[4];
    let posturl = splitpost[6];
  const didresolve = await agent.resolveHandle({ handle: bskyhandle });
  let userdid = didresolve.data.did
  let pullpost = `https://api.bsky.app/xrpc/com.atproto.repo.getRecord?repo=${userdid}&collection=app.bsky.feed.post&rkey=${posturl}`
  let fetched_post = await fetch(pullpost)
  let post_json = await fetched_post.json();
  for (let i = 0; i < existing.length; i++) {
    await agent.login({
      identifier: existing[i],
      password: process.env.BSKY_PASSWORD!,
    });
   await agent.like(post_json.uri, post_json.cid)
   //console.log(post_link)
  }
}
likepost();