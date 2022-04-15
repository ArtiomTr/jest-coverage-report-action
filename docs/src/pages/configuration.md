---
title: Configuration
description: Documentation for the action's configuration. Described all inputs with examples.
---

import CoverageAnnotationExample from 'assets/coverage-annotation-example.jpg';
import FailedTestAnnotationExample from 'assets/failed-test-annotation-example.jpg';

# Configuration

Jest Coverage Report action's configuration is created in the same way as for [any other GitHub action](https://www.github.com/features/actions).

## github-token

GitHub token. Required parameter. By default, you can use standard GitHub-provided token: `${{ secrets.GITHUB_TOKEN }}`. Example:

```yaml
- uses: artiomtr/jest-coverage-report-action@v2
    with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
```

## threshold

If you want to set minimal accepted coverage for the PR, you can pass and optional parameter threshold.

For example, if you want to reject every pull request, with total line coverage less than 80%:

```yaml
- uses: artiomtr/jest-coverage-report-action@v2
    with:
        threshold: 80 # if coverage < 80%, action will fail
```

## working-directory

If you want to run this action in custom directory, specify `working-directory`:

```yaml
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  working-directory: <dir>
```

## pre-test-script

By default, this action does nothing

If you want to run any command before the test-script is run, pass the custom option `pre-test-script`.

```yml
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  pre-test-script: npm run codegen
  test-script: npm run test:coverage
```

## test-script

By default, action will run this command, to extract coverage:

```bash
npx jest --silent --ci --coverage --testLocationInResults --json --outputFile="report.json"
```

If you're not satisfied with default behaviour, you can specify your own command, by passing custom option `test-script`.

<!-- TODO: replace link -->

**⚠ IMPORTANT: The test script must generate output in a specific format. For more information, see [docs](https://github.com/ArtiomTr/jest-coverage-report-action#customizing-test-script).**

For instance, if you want to run `test:coverage` npm script:

```yaml
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  test-script: npm run test:coverage
```

## icons

If you don't satisfied with the standard icons, you can replace them with `icons` input. Example:

```yaml
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  icons: ascii
```

Available options: `emoji` (standard), `ascii`, `unicode`.

## annotations

Annotations are enabled by default. To disable them, specify `annotations: none`. For instance:

```yaml
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  annotations: none
```

If you want to enable only specific annotations, you can specify following choices:

### `annotations: coverage`

<ResponsiveImage width="100%" images={CoverageAnnotationExample.images} />

### `annotations: failed-tests`

<ResponsiveImage width="100%" images={FailedTestAnnotationExample.images} />

### package-manager

By default, action uses [npm](https://github.com/npm/cli#readme) package manager. But, if you want to use [yarn](https://github.com/yarnpkg/berry#readme) or [pnpm](https://pnpm.io/), simply set `package-manager`option to `yarn` or `pnpm`:

```yaml
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  package-manager: yarn
```

or

```yaml
with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    package-manager: pnpm
```

### skip-step

If you've installed dependencies in previous step, or you already have `report.json` file, you can skip `install` or `all` steps. For instance:

```yaml
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  skip-step: install
```
