import bsky, { AppBskyActorGetProfile, AppBskyActorProfile, BskyNS, AppBskyActorDefs } from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
const delay = ms => new Promise(res => setTimeout(res, ms));
import colors from 'colors';
import * as dotenv from 'dotenv';
import process from 'node:process';
import * as fs from 'node:fs';
dotenv.config();

export async function getuser() {
    await agent.login({
        identifier: process.env.BSKY_USERNAME!,
        password: process.env.BSKY_PASSWORD!,
    }) 
    const bskyhandle = process.argv[2];
    const gp = await agent.getProfile({ actor: bskyhandle })
    //const gp = await agent.com.atproto.repo.getRecord({ repo: bskyhandle, collection: 'app.bsky.actor.profile', rkey: 'self' })
    let profiledata = gp.data;

    console.log(colors.bgCyan(`user data for ${bskyhandle}`));
    console.group();
    console.log(colors.blue(`did: `) + profiledata.did);
    console.log(colors.red(`display name: `) + profiledata.displayName);
    console.group();
    console.log(colors.yellow(`followers: `) + profiledata.followersCount + "  " + (colors.yellow(`following: `) + profiledata.followsCount))
    console.log(colors.green(`total posts: `) +  profiledata.postsCount)
    console.groupEnd();
}
getuser();