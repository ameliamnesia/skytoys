# bsky-toys
this is a collection of scripts that will create bluesky accounts, allow them to follow each other, follow back, and enable adult content

## requirements
* nodejs
* typescript
* ts-node
* dotenv
* atproto module

## dependency installation
```
npm i -g typescript ts-node dotenv @atproto/api @types/node @types/dotenv
```

## usage
> [!NOTE]
>for creating new accounts you can just use the same password for each account created. currently this is the easiest way to run the tool with many accounts due to the way it iterates to log in and follow back.

<details>
<summary> configure environment </summary>

* rename **_.env.example_** to **_.env_**
* open **_.env_** in your editor of choice
* input existing account details
  * BSKY_USERNAME="**_youraccount.bsky.social_**"
  * BSKY_PASSWORD="**_password for an existing account_**"
* input the details for the acount you would like to create
  * NEWEMAIL="_valid email_"
  * NEWPW="_password for new account_"
  * NEWHANDLE="**_mynewaccount_**.bsky.social"
  * NEWCODE="bsky-social-**_xxxxx-xxxxx_**"
</details>

<details>
<summary> run scripts</summary>

**create account specified in _.env_**
```*.sh-session
npm run newacct
```
**follow accounts from _did.txt_**
```*.sh-session
npm run follow
```
**log in to accounts in _handle.txt_, follow _NEWHANDLE_ in _.env_**
```*.sh-session
npm run followback
```
**log into new account from _.env_, enable adult content**
```*.sh-session
npm run enableadult
```
**run all scripts**
```*.sh-session
npm run auto
```

<!-- 
**or to run the scripts themselves**

```*.sh-session
   node build/newacct.js

   node build/follow.js

   node build/followback.js

   node build/enableadult.js
``` -->
</details>

<details>
<summary> additional information </summary>

* follow.js will create a _did.txt_ and add the logged in user defined in **BSKY_USERNAME**
  * this is to ensure the account that you are following _from_ gets added
* followback.js will create _handles.txt_ and add the user defined in **NEWHANDLE**
  * this is to ensure your new account is added in case you have not changed **BSKY_USERNAME**
  </details>
