---
title: Quick start
---

# The „Quick start“ guide

This guide will teach you how to quickly configure and add Jest Coverage Report action to your project.

<br/>

You can add this action for the new project, as well as for already existing one.

## Setup

1. Firstly, make sure that you've installed [Jest](https://github.com/facebook/jest#readme). Also, if you're using TypeScript tests, be sure to install and configure [ts-jest](https://github.com/kulshekhar/ts-jest#readme).
2. Secondly, make sure that you can run the Jest without additional arguments. To test it, try to run this code in your shell:

```bash

npx jest
```

Or via yarn:

```bash

yarn jest
```

Or via pnpm (pnpx):

```bash

pnpx jest
```

<!-- TODO: replace link -->

If this command is not working for you, see [how to setup custom testing script](https://github.com/ArtiomTr/jest-coverage-report-action#customizing-test-script).

3. After that, create new file in your repository, under `.github/workflows` folder. Name this file `coverage-report.yml` (or any another name, just don't forget that extension must be `.yml`).

4. Paste the default configuration:

```yaml
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
            - uses: artiomtr/jest-coverage-report-action@v1.3
              with:
                  github-token: ${{ secrets.GITHUB_TOKEN }}
                  #   threshold: 80 # optional parameter
```

As you can see, one option is commented out - `threshold`. After removing the hash character at the beginning of a line, the action will fail if the total line coverage in percent is less than the specified one. If you don't want this behavior, you can simply delete this line.

<br/>

That's it! Now, try to create a pull request and wait until the report will be generated!
