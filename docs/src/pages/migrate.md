---
title: Upgrading to v2
description: A complete guide how to migrate from version 1.x to version 2.x
---

# Upgrading to v2

Jest Coverage Report action v2 resolves the architectural issues of the first version, which prevented the addition of new functionality. In addition, second version's behavior is more predictable and understandable.

Actually, you need to update only your workflow's configuration.

## Upgrade steps

A few steps need to be completed to fully migrate from `v1` to `v2`. Don't worry if your action unexpectedly fails - this guide will help you to fix all errors. If after completing this guide your action still failing, please create an [issue](https://www.github.com/ArtiomTr/jest-coverage-report-action/issues) - our community is ready to help you!

### 1. Different inputs casing

Firstly, rename all inputs from `camelCase` to `kebab-case`. Example:

```yaml diff
name: Coverage report
on:
    pull_request:
        branches:
            - master
jobs:
    coverage:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
-           - uses: artiomtr/jest-coverage-report-action@v1.3
+           - uses: artiomtr/jest-coverage-report-action@v2
              with:
-                  github_token: ${{ secrets.GITHUB_TOKEN }}
+                  github-token: ${{ secrets.GITHUB_TOKEN }}
                   threshold: 80
-                  test_script: npm run test:coverage
+                  test-script: npm run test:coverage
-                  working_directory: some_dir
+                  working-directory: some_dir
```

### 2. New test script format

In `v2` version `jest-coverage-report-action` uses different format to extract coverage data. If you want to have custom testing script, change it as this example shows:

```yaml diff
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
-   test_script: npx jest --silent --ci --coverage --coverageReporters="text" --coverageReporters="text-summary"
+   test-script: npx jest --silent --ci --coverage --testLocationInResults --json --outputFile="report.json"
```

Or, if you use testing script from your `package.json` file:

```json diff
{
    "scripts": {
-       "test:coverage": "jest --silent --ci --coverage --coverageReporters=\"text\" --coverageReporters=\"text-summary\""
+       "test:coverage": "jest --silent --ci --coverage --testLocationInResults --json --outputFile=\"report.json\""
    }
}
```

### 3. New features

In `v2` new feature was released - `annotations`. To disable them, simply specify `annotations: none`. Example:

```yaml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    annotations: none
```

Or, if you want only coverage annotations:

```yaml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    annotations: coverage
```

And, if you want annotate only failed tests

```yaml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    annotations: failed-tests
```

**That's it! Welcome to `v2` 🎉**
