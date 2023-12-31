import bsky, { AppBskyActorGetProfile, AppBskyActorProfile, BskyNS } from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
import process from 'node:process';
import colors from 'colors';
dotenv.config();

/**** 
TODO:
thread, parent, root, reply logic
****/

class Skeet {
    post_link!: string;
    user_did!: any;
    post_rkey!: string;
    split_url!: any;
    bskyhandle!: string;
    post_id!: string;
    fetchurl!: string;
    postfetch!: any;
    postjson?: any;
    postembed?: any;

    constructor(post_link: string) {
        this.post_link = post_link;
        this.split_url = post_link.toString().split("/");
        this.bskyhandle = this.split_url[4];
        this.post_id = this.split_url[6]
        this.fetchurl = `https://api.bsky.app/xrpc/com.atproto.repo.getRecord?repo=${this.bskyhandle}&collection=app.bsky.feed.post&rkey=${this.post_id}`;
        this.postfetch = fetch(this.fetchurl);
        this.user_did = agent.resolveHandle({ handle: this.bskyhandle })
    }
    public async display_post(handle: string, displayname: string, timestamp: string, text: string, quote?: boolean) {
        let readable = new Date(timestamp);
        let date = readable.toDateString()
        let time = readable.toLocaleTimeString('en-US');
        console.log(colors.blue(`${displayname} (${handle}) \n ${date} at ${time}`))
        console.log(text)
    }
    public async display_quote(handle: string, displayname: string, timestamp: string, text: string, quote?: boolean) {
        let readable = new Date(timestamp);
        let date = readable.toDateString()
        let time = readable.toLocaleTimeString('en-US');
        if(quote === true) {
            console.group();
            console.log(colors.red(`>>> quoting ${displayname}  (${handle}) \n ${time} on ${date}`));
            console.group();
            console.log(`${text} `)
            console.groupEnd();
        }
    }
    public async get_post_json() {
        const fetch_json = await this.postfetch
        let post_json = fetch_json.json();
        return post_json;
    }
    public async get_profile(returned_did: string) {
        let profile = await agent.com.atproto.repo.describeRepo({ repo: returned_did })
        let profile_data = profile.data
        return profile_data;
    }
    public async get_handle(handle: string) {
        let display = await agent.com.atproto.repo.getRecord({ repo: handle, collection: 'app.bsky.actor.profile', rkey: 'self' })
        let dname = (display.data.value['displayName'])
        return dname;
    }
    public async get_embed(embed_data: any) {
        if(embed_data.$type == 'app.bsky.embed.external') {
            await this.embed_is_link(embed_data)
        }
        if(embed_data.$type == 'app.bsky.embed.images') {
            await this.embed_is_image(embed_data.images)
        }
        if(embed_data.$type == 'app.bsky.embed.record') {
            await this.embed_is_quote(embed_data.record)
        }
        if(embed_data.$type == 'app.bsky.embed.recordWithMedia') {
            await this.embed_is_media_quote(embed_data)
        }
        return embed_data;
    }
    public async embed_is_link(embed_vals: any) {
        console.group();
        console.info(colors.bgBlue(`[external link]`))
        console.group();
        console.log(colors.blue(`title: `) + embed_vals.external['title'])
        console.log(colors.blue(`url: `) + embed_vals.external.uri)
        console.groupEnd

    }
    public async embed_is_image(embed_vals: any) {
        console.info(`\n  ` + colors.bgGreen(`[post contains media]`))
        for (let i = 0; i < embed_vals.length; i++) {
            const currentArray = embed_vals[i];
            console.log(colors.green(`  description:`), currentArray.alt);
          }   
    }
    public async embed_is_quote(embed_vals: any) {
        let embed_uri = embed_vals.uri.toString().split("/");
        let quote_did = embed_uri[2];
        let quote_ident = embed_uri[4];
        let quote_profile = await this.get_profile(quote_did)
        let quote_handle = quote_profile.handle
        let quote_disp_name = await this.get_handle(quote_handle)
        let quote_url = `https://bsky.social/profile/${quote_handle}/post/${quote_ident}`
        let qp = new Skeet(quote_url)
        let quotepost = await qp.get_post_json()
        this.display_quote(quote_handle, quote_disp_name, quotepost.value.createdAt, quotepost.value.text, true)
        let quote_embed = 'embed' in quotepost.value;
        if(quote_embed) {
            await qp.get_embed(quotepost.value.embed);
            }
    }
    public async embed_is_media_quote(embed_vals: any) {
        await this.embed_is_image(embed_vals.media.images);
        await this.embed_is_quote(embed_vals.record.record)
    }
}

let mypost = new Skeet(process.argv[2])
let post_data = await mypost.get_post_json();
let post_did = await mypost.user_did;
let post_text = post_data.value.text;
let post_profile = await mypost.get_profile(post_did.data.did)
let post_handle = post_profile.handle;
let post_disp_name = await mypost.get_handle(post_handle)
let has_embed = 'embed' in post_data.value;
await mypost.display_post(post_handle, post_disp_name, post_data.value.createdAt, post_text)
if(has_embed) {
    await mypost.get_embed(post_data.value.embed);
    }
