import bsky from '@atproto/api';
const { BskyAgent } = bsky;
const agent = new BskyAgent({ service: 'https://bsky.social', });
import * as dotenv from 'dotenv';
import process from 'node:process';
import * as fs from 'node:fs';
dotenv.config();
export async function changehandle(newhandle) {
    await agent.login({
        identifier: process.env.BSKY_USERNAME,
        password: process.env.BSKY_PASSWORD,
    });
    try {
        await agent.updateHandle({ handle: newhandle });
        console.log('changed', process.env.BSKY_USERNAME, 'to', process.env.CHANGEHANDLE);
    }
    catch {
        console.error('error changing handle');
    }
}
export async function updatelist(handles_file, oldhandle, newhandle) {
    try {
        //update handles.txt
        const listdata = fs.readFileSync(handles_file, 'utf8');
        const updatedHandle = listdata.replaceAll(oldhandle, newhandle);
        fs.writeFileSync(handles_file, updatedHandle, 'utf8');
        console.log('updated', oldhandle, 'to', newhandle, 'in handles.txt');
    }
    catch {
        console.error('error updating handles.txt, please change manually');
    }
}
export async function updateenv(env_file, oldhandle, newhandle) {
    try {
        //update .env
        const envdata = fs.readFileSync(env_file, 'utf8');
        const envHandle = envdata.replaceAll(oldhandle, newhandle);
        fs.writeFileSync(env_file, envHandle, 'utf8');
        console.log('updated', oldhandle, 'to', newhandle, 'in .env');
    }
    catch {
        console.error('error updating .env, please change manually');
    }
}
const handles_file = './handles.txt';
const env_file = './.env';
const oldhandle = process.env.BSKY_USERNAME;
const newhandle = process.env.CHANGEHANDLE;
await changehandle(newhandle);
await updatelist(handles_file, oldhandle, newhandle);
await updateenv(env_file, oldhandle, newhandle);
