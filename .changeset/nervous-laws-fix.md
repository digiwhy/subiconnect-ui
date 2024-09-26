---
'@subifinancial/subi-connect': patch
---

## Purpose

This PR refactors the OAuth2 authentication flow and improves the handling of authentication windows. It introduces a new utility function for generating auth window options and updates the connect and integrate component to use this new approach.

## Problem Solved

The changes aim to enhance the reliability and consistency of the OAuth2 authentication process, particularly in handling authentication windows across different scenarios. It also improves code reusability by extracting common logic into a separate utility function.

