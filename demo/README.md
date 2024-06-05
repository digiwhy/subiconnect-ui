# Demo

## Step 1

In the subi-connect directory run `npm run pack <env> [OPTIONS]`:

```bash
npm run pack local
```

## Step 2

Go into the demo you want to try. E.g., `cd demo/world-pay`

## Step 3

Install packages and then install the subi-connect package version you want. You can view the libs at `demo/lib`.
```bash
npm install
npm install ../lib/subi-connect@<env>-<hash>.tgz


E.g.:
> npm install ../lib/subi-connect@local-d4a8e.tgz
```

## Step 4 

Add your API key in the demo application repo in `.env.local`


```.env
[.env.local]

NEXT_PUBLIC_DRAFT_API_KEY = <your api key>
```

Run the application with `npm run dev`