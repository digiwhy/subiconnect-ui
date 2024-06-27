# Subi Connect - React

<br />

![Subi Connect Banner](https://raw.githubusercontent.com/subifinancial/subi-connect/main/assets/subi-connect-banner.png)

<br />

# 🔗 Links

<ul style="list-style: none; padding: 0; margin: 0 auto; width: fit-content; text-align: center;">
  <li style="display: inline-block; margin-right: 20px;">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <span style="font-size: 24px;">🌀</span>
      <a href="https://subiconnect.subi.au">Developer Portal</a>
    </div>
  </li>
  <li style="display: inline-block; margin-right: 20px;">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <span style="font-size: 24px;">📄</span>
      <a href="https://subiconnect.subi.au/docs.html">Documentation</a>
    </div>
  </li>
  <li style="display: inline-block;">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <span style="font-size: 24px;">📍</span>
      <a href="https://subiconnect.subi.au/http-api/api.html">API Documentation</a>
    </div>
  </li>
</ul>

<br />

# 👨‍💻 Basic Integration
Basic integration instructions are provided below. Please visit our [docs 📄](https://subiconnect.subi.au/docs.html) for a more in-depth setup guide.

## Step 1 - Installation

```bash
npm install @subifinancial/subi-connect
npm install @tanstack/react-query @tanstack/react-table
```

## Step 2 - `SubiConnectProvider`

Add the Subi Connect `Provider` to your application. This must come after your
`QueryClientProvider` and encompass all Subi Connect components. We will discuss
your `connectionFn` [below](#step-3---connectionfn).

```tsx filename="frontend"
import { SubiConnectProvider } from '@subifinancial/subi-connect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  /**
   * Your internal id reference to the company and their name.
   * For example:
   *  - You have company A who uses your services.
   *  - You will provide their id along with their name as viewed in your database.
   *  - The name is used for sanity checking; we will not use this.
   */
  const company = { referenceId: someCompanyId, name: 'Company A' };

  const connectionFn = useCallback(
    async () => await yourFnToGetSubiConnectAccessToken(company),
    [someCompanyId],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SubiConnectProvider connectionFn={connectionFn}>...</SubiConnectProvider>
    </QueryClientProvider>
  );
}
```

## Step 3 - `connectionFn`

The connection function needs to speak to your backend to get the API key. This
helps with security by not exposing your Subi Connect API Key to the frontend.

The core idea is to hit our
`https://subiconnect-api.subi.au/subi-connect/authentication/company-access-token`
endpoint to generate a company access token with your Subi Connect Account API
Key and company data. Each company using your service will have their own
generated access token.

<br />

# 📫 Support

- Feel free to [email](mailto:support@subi.au) our support team
- Open up an [issue](https://github.com/subifinancial/subi-connect/issues/) on Github

<br />

# 🕵️ Development / Storybook

1. `npm install`
2. `npm run build-storybook`
3. `npm run storybook`
