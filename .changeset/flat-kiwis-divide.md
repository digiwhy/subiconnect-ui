---
'@subifinancial/subi-connect': patch
---

This update refactors the logger implementation and improves dependency injection throughout the codebase. It introduces a new `Logger` class that can be instantiated and passed to other services, enhancing testability and flexibility.

The changes address potential issues with global state and improve the overall architecture by:
1. Replacing the global logger instance with a class-based approach
2. Implementing dependency injection for the logger in various services
3. Enhancing error handling in the connection service
4. Improving the structure of interceptors by passing necessary dependencies