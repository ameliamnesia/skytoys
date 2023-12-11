# skytoys
this is a collection of scripts that will create bluesky accounts, allow them to follow each other, follow back, and enable adult content

## requirements
* nodejs
* typescript
* ts-node
* dotenv
* atproto module

## dependency installation
to check your node and npm versions use
```*.sh-session
node -v
npm -v
```
if node and npm are not installed, you can find the installers at https://nodejs.org/en/download/

```*.sh-session
npm i -g typescript ts-node dotenv @atproto/api @types/node @types/dotenv
```

## configure
> [!TIP]
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

## usage
> [!IMPORTANT]
> **_npm run follow_** will create a _did.txt_ and add the logged in user defined in **BSKY_USERNAME** to ensure the account that you are following _from_ gets added
>
> **_npm run followback_** will create _handles.txt_ and add the user defined in **NEWHANDLE** to ensure your new account is added in case you have not changed **BSKY_USERNAME**

<details>
<summary> run scripts</summary>

* **run complete process**
```*.sh-session
npm run auto
```
* **create account specified in _.env_**
```*.sh-session
npm run newacct
```
* **follow accounts from _did.txt_**
```*.sh-session
npm run follow
```
* **log in to accounts in _handle.txt_, follow _NEWHANDLE_ in _.env_**
```*.sh-session
npm run followback
```
* **log into new account from _.env_, enable adult content**
```*.sh-session
npm run enableadult
```
* **log into ALL accounts from _handles.txt_, enable adult content**
```*.sh-session
npm run bulkenable
```
</details>


