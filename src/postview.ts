import bsky, { AppBskyActorGetProfile, AppBskyActorProfile, BskyNS } from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
const delay = ms => new Promise(res => setTimeout(res, ms));
import * as dotenv from 'dotenv';
import process from 'node:process';
import * as fs from 'node:fs';
dotenv.config();

class Skeet {
    post_link!: string;
    user_did!: any;
    post_rkey!: string;
    split_url!: any;
    bskyhandle!: string;
    post_id!: string;
    fetchurl!: string;
    postfetch!: any;
    postjson!: any;

    constructor(post_link: string/*, arg2: string, arg3: string*/) {
        this.post_link = post_link;
        this.split_url = post_link.toString().split("/");
        this.bskyhandle = this.split_url[4];
        this.post_id = this.split_url[6]
        this.fetchurl = `https://api.bsky.app/xrpc/com.atproto.repo.getRecord?repo=${this.bskyhandle}&collection=app.bsky.feed.post&rkey=${this.post_id}`;
        this.postfetch = fetch(this.fetchurl);
        this.user_did = agent.resolveHandle({ handle: this.bskyhandle })
        //this.postjson = this.postfetch.json();
    }
    public displaypost(handle: string, timestamp: string, text: string, quote?: boolean): void {
        let readable = new Date(timestamp);
        let date = readable.toDateString()
        let time = readable.toLocaleTimeString('en-US');
        if(quote === true) {
            console.log(`   >>> quoting ${handle}'s post at ${time} on ${date} \n      ${text} \n`)

        } else {
        console.log(`   ${time} on ${date} \n ${handle} posted \n  ${text} \n`)
        }
      }
    public async get_profile(returned_did: string) {
        let profile = await agent.com.atproto.repo.describeRepo({ repo: returned_did })
        return profile.data;
    }
    public async get_post_json() {
        const fetch_json = await (await post.postfetch).json()
        let post_json = fetch_json
        return post_json;
    }

    public async determine_image_embed(json: any) {
        let blank = json;
        let image_embed_json = json.embed?.media?.images[0].alt
        let embed_arrays = json.embed?.images 

        if(image_embed_json != undefined) {
            console.log(`  [post contains media] \n    description:`, image_embed_json)
            }
            function iterateArrays(...embed_arrays: any[][]) {
                for (const array of embed_arrays) {
                    console.log(`  [post contains media]`)
                  for (const value of array) {      
                    console.log(`   description:`, value.alt); // Perform your desired operation on each element here
                  }
                }
              }
              if(embed_arrays != undefined) {
              iterateArrays(embed_arrays);
              }
        return ' ';
    }
    public async get_parent_json(parent_post_url: string) {
        const fetch_url = await fetch(parent_post_url);
        let fetch_json = await fetch_url.json()
        return fetch_json;
    }
    public async determine_quote_embed(json: any) {
        let quote_embed_json = json.embed?.record
        let image_quote_json = json.embed?.record?.record
        if(quote_embed_json != undefined && image_quote_json == undefined) {
            let split_quote = quote_embed_json.uri.toString().split("/");
            let quote_did = split_quote[2];
            let quote_post_url = split_quote[4];
            let quote_profile = this.get_profile(quote_did)
            let quote_handle = (await quote_profile).handle
            let fq = await this.fetch_parent(quote_handle, quote_post_url)

            this.displaypost(quote_handle, fq.value.createdAt, fq.value.text, true);
          }
          if(image_quote_json != undefined) {
            let split_quote = image_quote_json.uri.toString().split("/");
            let quote_did = split_quote[2];
            let quote_post_url = split_quote[4];
            let quote_profile = this.get_profile(quote_did)
            let quote_handle = (await quote_profile).handle
            let fq = await this.fetch_parent(quote_handle, quote_post_url)

            this.displaypost(quote_handle, fq.value.createdAt, fq.value.text, true);
            let post_has_media = 'embed' in fq.value; 
            if(post_has_media) {
                const getquotejson = await this.determine_image_embed(fq.value);
               console.log(getquotejson)
            } 
          }
          return ' ';
    }
    public async isthreaded(json: any) {
        let split_parent = json.parent.uri.toString().split("/");
        let split_root = json.root.uri.toString().split("/")
        let parent_did = split_parent[2];
        let parent_post_url = split_parent[4];
        let parent_profile = this.get_profile(parent_did)
        let parent_handle = (await parent_profile).handle
        let fp = await this.fetch_parent(parent_handle, parent_post_url)
        let root_did = split_root[2];
        let root_post_url = split_root[4];
        let root_profile = this.get_profile(root_did)
        let root_handle = (await root_profile).handle
        let fr = await this.fetch_root(root_handle, root_post_url)
        if(json.root.uri != json.parent.uri) {
            this.displaypost(root_handle, fr.value.createdAt, fr.value.text);
            let post_has_media = fr.value.embed
            if(post_has_media) {
                const getjson = await post.determine_image_embed(fr.value);
                console.log(getjson)
            }
            let post_has_link = fr.value.embed?.external;
            if(post_has_link != undefined){
                console.log(`     [external link] \n `, post_has_link.uri)
            }

            this.displaypost(parent_handle, fp.value.createdAt, fp.value.text);
            let parent_has_media = fr.value.embed
            if(parent_has_media) {
                const getjson = await post.determine_image_embed(fp.value);
                console.log(getjson)
            }
            let parent_has_link = fp.value.embed?.external;
            if(parent_has_link != undefined){
                console.log(`     [external link] \n `, post_has_link.uri)
            }
            return ' ';
        } else {
            this.displaypost(root_handle, fr.value.createdAt, fr.value.text);

            return ' ';
        }
    }
    public async fetch_parent(parent_handle: string, parent_url: string) {
        let fetchurl = `https://api.bsky.app/xrpc/com.atproto.repo.getRecord?repo=${parent_handle}&collection=app.bsky.feed.post&rkey=${parent_url}`;
       return this.get_parent_json(fetchurl)//.then(value => {return this.fetch_parent });
        //return this.get_parent_json;
    }
    public async fetch_root(root_handle: string, root_url: string) {
        let fetchurl = `https://api.bsky.app/xrpc/com.atproto.repo.getRecord?repo=${root_handle}&collection=app.bsky.feed.post&rkey=${root_url}`;
        return this.get_parent_json(fetchurl)//.then(value => {return this.fetch_parent });
    }
}

const post = new Skeet(process.argv[2])
let returnedjson = await post.get_post_json();
let post_is_reply = 'reply' in returnedjson.value;
let post_has_media = 'embed' in returnedjson.value;
let post_has_link = returnedjson.value.embed?.external;
//let post_has_quote = 'record' in returnedjson.value.embed;
let post_has_quote = returnedjson.value.embed?.record;

if(post_is_reply && typeof post_has_quote != undefined) {
    const threaded = await post.isthreaded(returnedjson.value.reply)
    console.log(threaded)
}
let split_main = returnedjson.uri.toString().split("/");
const mainprof = await post.get_profile(split_main[2])
let mainhandle = mainprof.handle
post.displaypost(mainhandle, returnedjson.value.createdAt, returnedjson.value.text)
if(post_has_link != undefined){
    console.log(`     [external link] \n `, post_has_link.uri)
}
if(post_has_media) {
    const getjson = await post.determine_image_embed(returnedjson.value);
    console.log(getjson)
}
/*
if(post_has_quote !== undefined) {
    const quoted = await post.determine_quote_embed(returnedjson.value);
    console.log(quoted);
} 
*/
if(typeof post_has_quote !== undefined) {
    const quoted = await post.determine_quote_embed(returnedjson.value);
    console.log(quoted);
} 