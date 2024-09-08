---
'@subifinancial/subi-connect': minor
---

Migrate build system from `rollup` to `tsup`

We've transitioned our build process from `rollup` to `tsup` for the following reasons:

1. Reduced bundle size: `tsup` produces smaller output files, optimizing our package for faster downloads and reduced storage requirements.

2. Improved build performance: `tsup` significantly speeds up our build times, enhancing developer productivity and CI/CD efficiency.

3. Simplified configuration: `tsup` offers a more streamlined setup with sensible defaults, reducing the complexity of our build configuration.

4. Better TypeScript support: As a TypeScript-first bundler, `tsup` provides improved handling of TypeScript projects without additional plugins.

5. Tree-shaking and code splitting: `tsup` includes built-in optimizations for tree-shaking and code splitting, further reducing bundle sizes and improving performance.

This change should be transparent to end-users but will greatly benefit our development process and package distribution.
