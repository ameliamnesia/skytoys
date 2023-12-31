import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
const delay = ms => new Promise(res => setTimeout(res, ms));
import * as dotenv from 'dotenv';
import process from 'node:process';
import colors from 'colors';
dotenv.config();
class Skeet {
    post_link;
    user_did;
    post_rkey;
    split_url;
    bskyhandle;
    post_id;
    fetchurl;
    postfetch;
    postjson;
    postembed;
    constructor(post_link) {
        this.post_link = post_link;
        this.split_url = post_link.toString().split("/");
        this.bskyhandle = this.split_url[4];
        this.post_id = this.split_url[6];
        this.fetchurl = `https://api.bsky.app/xrpc/com.atproto.repo.getRecord?repo=${this.bskyhandle}&collection=app.bsky.feed.post&rkey=${this.post_id}`;
        this.postfetch = fetch(this.fetchurl);
        this.user_did = agent.resolveHandle({ handle: this.bskyhandle });
        //this.postembed = this.postfetch.value.embed;
        //this.postjson = this.postfetch.json();
    }
    async display_post(handle, displayname, timestamp, text, quote) {
        let readable = new Date(timestamp);
        let date = readable.toDateString();
        let time = readable.toLocaleTimeString('en-US');
        console.log(colors.blue(`${displayname} (${handle}) \n ${date} at ${time}`));
        console.log(text);
    }
    async display_quote(handle, displayname, timestamp, text, quote) {
        let readable = new Date(timestamp);
        let date = readable.toDateString();
        let time = readable.toLocaleTimeString('en-US');
        if (quote === true) {
            console.group();
            console.log(colors.red(`>>> quoting ${displayname}  (${handle}) \n ${time} on ${date}`));
            console.group();
            console.log(`${text} `);
            console.groupEnd();
        }
    }
    async get_post_json() {
        const fetch_json = await this.postfetch;
        let post_json = fetch_json.json();
        return post_json;
    }
    async get_profile(returned_did) {
        let profile = await agent.com.atproto.repo.describeRepo({ repo: returned_did });
        let profile_data = profile.data;
        //let display = await agent.com.atproto.repo.getRecord({ repo: returned_did, collection: 'app.bsky.actor.profile', rkey: 'self' })
        //profile_data: any.displayname = { name: 'dispname', value: display.data.value['displayName'] }
        //let profile.data.displayname = 
        return profile_data;
    }
    async get_handle(handle) {
        let display = await agent.com.atproto.repo.getRecord({ repo: handle, collection: 'app.bsky.actor.profile', rkey: 'self' });
        let dname = (display.data.value['displayName']);
        return dname;
    }
    async get_embed(embed_data) {
        //const embed_data = await this.postembed
        //let embed_vals = embed_data
        if (embed_data.$type == 'app.bsky.embed.external') {
            await this.embed_is_link(embed_data);
        }
        if (embed_data.$type == 'app.bsky.embed.images') {
            await this.embed_is_image(embed_data.images);
        }
        if (embed_data.$type == 'app.bsky.embed.record') {
            await this.embed_is_quote(embed_data.record);
        }
        if (embed_data.$type == 'app.bsky.embed.recordWithMedia') {
            await this.embed_is_media_quote(embed_data);
        }
        return embed_data;
    }
    async embed_is_link(embed_vals) {
        //console.log('embed is link')
        //console.log(embed_vals)
        console.info(`    ` + (colors.bgBlue(`[external link]`)));
        console.log(`    title:` + embed_vals.external.title);
        console.log(`    url:` + embed_vals.external.uri);
    }
    async embed_is_image(embed_vals) {
        console.info(`\n  ` + colors.bgGreen(`[post contains media]`));
        for (let i = 0; i < embed_vals.length; i++) {
            const currentArray = embed_vals[i];
            console.log(`  description:`, currentArray.alt);
        }
        //console.log(`\n`)      
    }
    async embed_is_quote(embed_vals) {
        let embed_uri = embed_vals.uri.toString().split("/");
        let quote_did = embed_uri[2];
        let quote_ident = embed_uri[4];
        let quote_profile = await this.get_profile(quote_did);
        let quote_handle = quote_profile.handle;
        let quote_disp_name = await this.get_handle(quote_handle);
        let quote_url = `https://bsky.social/profile/${quote_handle}/post/${quote_ident}`;
        let qp = new Skeet(quote_url);
        let quotepost = await qp.get_post_json();
        this.display_quote(quote_handle, quote_disp_name, quotepost.value.createdAt, quotepost.value.text, true);
        let quote_embed = 'embed' in quotepost.value;
        if (quote_embed) {
            await qp.get_embed(quotepost.value.embed);
        }
    }
    async embed_is_media_quote(embed_vals) {
        await this.embed_is_image(embed_vals.media.images);
        await this.embed_is_quote(embed_vals.record.record);
    }
}
/*
export async function get_post_json() {
    const fetch_json = await (await post.postfetch).json()
    let post_json = fetch_json
    return post_json;
}
*/
let mypost = new Skeet(process.argv[2]);
let post_data = await mypost.get_post_json();
let post_did = await mypost.user_did;
let post_text = post_data.value.text;
let post_profile = await mypost.get_profile(post_did.data.did);
let post_handle = post_profile.handle;
let post_disp_name = await mypost.get_handle(post_handle);
let has_embed = 'embed' in post_data.value;
await mypost.display_post(post_handle, post_disp_name, post_data.value.createdAt, post_text);
//console.log(post_text)
//console.log(post_did.data.did)
if (has_embed) {
    await mypost.get_embed(post_data.value.embed);
    //console.log(post_embed);
}
