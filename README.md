# Pandora

Pandora's Box is a web datastore for all your ideas, reminders, tasks, and bookmarks. It aims to serve as your online browsing datastore which is remotely accessible and password protected.
Find more about this project [here](https://achintyajha.com/posts/pandora).

## Setup

Setup is similar to setting up [dynote](https://github.com/achintyajha/dynote). Here's a quick guide-

```shell
git clone https://github.com/achntj/pandora.git
cd pandora
npm i
```

Once locally installed, create a .env.local file and enter

```shell
DATABASE_URL="YOUR_DATABASE_URL"
NEXT_PUBLIC_PASS="YOUR_PASSWORD"
```

Note that this password will be used for authenticating create and update requests.
