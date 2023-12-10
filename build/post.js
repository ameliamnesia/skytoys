import { BskyAgent } from "@atproto/api";
const agent = new BskyAgent({ service: 'https://bsky.social' });
import * as dotenv from 'dotenv';
dotenv.config();
function skeet() {
    return (async () => {
        await agent.post({
            text: "typescript test"
        });
    })();
}
skeet();
