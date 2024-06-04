# Demo

## Step 1

In the subi-connect directory run `npm run pack <env> [OPTIONS]`:

```
npm run pack local
```

## Step 2

Go into the demo you want to try. E.g., `cd demo/world-pay`

## Step 3

Install packages and then install the subi-connect package version you want. You can view the libs at `demo/lib`.
```
npm install
npm install ../lib/subi-connect@<env>-<hash>.tgz


E.g.:
> npm install ../lib/subi-connect@local-d4a8e.tgz
```

## Step 4 

Run the application with `npm run dev`