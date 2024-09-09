---
'@subifinancial/subi-connect': major
---

Migrate build system from `rollup` to `tsup`

We've transitioned our build process from `rollup` to `tsup` for the following reasons:

1. Reduced bundle size: `tsup` produces smaller output files, optimizing our package for faster downloads and reduced storage requirements.

2. Improved build performance: `tsup` significantly speeds up our build times, enhancing developer productivity and CI/CD efficiency.

3. Simplified configuration: `tsup` offers a more streamlined setup with sensible defaults, reducing the complexity of our build configuration.

4. Better TypeScript support: As a TypeScript-first bundler, `tsup` provides improved handling of TypeScript projects without additional plugins.

5. Tree-shaking and code splitting: `tsup` includes built-in optimizations for tree-shaking and code splitting, further reducing bundle sizes and improving performance.

This change should be transparent to end-users but will greatly benefit our development process and package distribution.

## Other Changes

- Updated `SubiConnectOptions` to expose a `context` variable to differentiate contexts. See [Example 1](#example-1).
- Updated `SubiConnectContext` to expose a `cleanup` function that can be used cleanup the Subi Connect 
Context when changing contexts, for example, logging out. See [Example 2](#example-2).
- Moves styles import to `@subifinancial/subi-connect/styles.css`. See [Example 3](#example-3).

## Examples
### Example 1
```tsx
...

const Component = () => {
    const { data: myCompany } = useMyCompany();

    ...

    const options = {
        context: myCompany.name
    } satisfies SubiConnectOptions;

    return (
        <SubiConnectProvider connectionFn={connectionFn} options={options}>
            ...
        </SubiConnectProvider>
    );
}

export default Component;
```

### Example 2
```tsx
...

const Component = () => {
    const { logout } = auth();
    const { cleanup } = useSubiConnectContext();

    ...

    const logoutOnClick = () => {
        logout();
        cleanup();
    }

    return (
        <div>
            ...
            <button onClick={logoutOnClick}>Logout</button>
            ...
        </div>
    );
}

export default Component;
```

### Example 3
```tsx
...
import "@subifinancial/subi-connect/styles.css"
...
```