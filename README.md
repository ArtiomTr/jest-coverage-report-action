# jest coverage report 🧪

<p align="center">
  <img alt="PR Comment example" width="540" src="./img/Github-comment-screenshot.jpg">
</p>

<p align="center">
    A GitHub action that reports about your code coverage in every pull request.
</p>

<p align="center">
    <a href="https://github.com/ArtiomTr/jest-coverage-report-action"><img alt="MIT License" src="https://img.shields.io/github/license/artiomtr/jest-coverage-report-action"></img></a>
    <a href="https://github.com/ArtiomTr/jest-coverage-report-action/issues"><img alt="Issues" src="https://img.shields.io/github/issues/artiomtr/jest-coverage-report-action"></img></a>
</p>

This action uses [Jest](https://github.com/facebook/jest) to extract code coverage, and comments it on pull request. Inspired by [Size-limit action](https://github.com/andresz1/size-limit-action/). Features:

-   **Reporting** code coverage on each pull request. 📃
-   **Rejecting** pull request, if coverage is under threshold. ❌
-   **Comparing** coverage with base branch. 🔍
-   Showing spoiler in the comment for all **new covered files**. 🆕
-   Showing spoiler in the comment for all files, in which **coverage was reduced**. 🔻
-   Failed tests & uncovered line **annotations** 📢

<p align="center">
  <img alt="PR Comment example" width="540" src="./img/Rejected-PR-screenshot.jpg">
</p>

## Usage

1. Install and configure [Jest](https://github.com/facebook/jest).
2. Create new action inside `.github/workflows`:

**Minimal configuration**

```yml
name: 'coverage'
on:
    pull_request:
        branches:
            - master
            - main
jobs:
    coverage:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: ArtiomTr/jest-coverage-report-action@v2
```

3. Pay attention to the action parameters. You can specify custom [threshold](#specify-threshold) or [test script](#customizing-test-script)
4. That's it!

## Forks with no write permission

If you're seeing this error in your action's console:

```
HttpError: Resource not accessible by integration
    at /home/runner/work/_actions/ArtiomTr/jest-coverage-report-action/v2/dist/index.js:8:323774
    at processTicsAndRejections (node:internal/process/task_queues:96:5)
    at async /home/runner/work/_actions/ArtiomTr/jest-coverage-report-action/v2/dist/index.js:64:2535
    at async Ie (/home/runner/work/_actions/ArtiomTr/jest-coverage-report-action/v2/dist/index.js:63:156)
    at async S_ (/home/runner/work/_actions/ArtiomTr/jest-coverage-report-action/v2/dist/index.js:64:2294)
```

It means that action is running with low privileges. By default, `pull_request` event doesn't have any write permissions, when PR is coming from fork. To fix that, change trigger action to `pull_request_target`:

```yml
name: 'coverage'
on:
    pull_request_target:
        branches:
            - master
            - main
jobs:
    coverage:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: ArtiomTr/jest-coverage-report-action@v2
```

> **Warning**
> 
> This brings worse DX - you can test action only when it is merged into your main branch. **Any changes to the workflow file will be taken only after merging them to the main branch**

## Custom token

By default, this action takes `github.token` variable to publish reports on your PR. You can overwrite this property by specifying:

```yml
with:
    github-token: ${{ secrets.SECRET_TOKEN }}
```

## Specify threshold

This action automatically suports jest's [`coverageThreshold`](https://jestjs.io/docs/configuration#coveragethreshold-object) property.
Just add into your `jest.config.js` file:

```js
module.exports = {
    coverageThreshold: {
        global: {
            lines: 80,
        },
    },
};
```

## Custom working directory

If you want to run this action in custom directory, specify `working-directory`:

```yml
with:
    working-directory: <dir>
```

## Customizing test script

This action automatically adds necessary flags to your test script. The default script is:

```
npx jest
```

So you don't need to specify additional flags - action will handle them
automatically. So, after adding necessary flags, action will run this command:

```
npx jest --ci --json --coverage --testLocationInResults --outputFile=report.json
```

But you do not need to specify these flags manually. Also, you can use different package manager, `yarn` for example:

```yml
with:
    test-script: yarn jest
```

Or, if you would like to run a script from your `package.json`:

```yml
with:
    test-script: npm test
```

## Usage with `yarn` or `pnpm`

By default, this action will install your dependencies using `npm`. If you are using `yarn` or `pnpm`, you can specify it in the `package-manager` option:

```yml
with:
    package-manager: yarn
```

or

```yml
with:
    package-manager: pnpm
```

## Use existing test report(s)

To bypass running unit tests, you can pass the filepath to the current report.json

```yml
with:
    coverage-file: ./coverage/report.json
    base-coverage-file: ./coverage/master/report.json
```

-   `coverage-file` is the filepath to the JSON coverage report for the current pull request.
-   `base-coverage-file` is the filepath to the JSON coverage report from the branch your pull request is merging into.

For example, you can save every test run to an artifact and then download and reference them here.

## Opt-out coverage comparison features

You can opt-out coverage comparison features to speed-up action. To achieve this, firstly, manually collect coverage to `report.json` file. Then, specify these options for the action:

```yml
with:
    coverage-file: report.json
    base-coverage-file: report.json
```

## Skipping steps

> Note: this option affects only coverage for the "head" branch. For skipping steps of "base" branch, see [`base-coverage-file`](#use-existing-test-reports) option.

By default, this action will install dependencies and run the tests for you, generating the coverage report. Alternatively, you can skip these steps using the `skip-step` option.

```yml
with:
    skip-step: all
```

Accepted values are:

-   `none` (default) - all steps will be run
-   `install` - skip installing dependencies
-   `all` - skip installing dependencies _and_ running the test script

## Change annotations

To change annotations, you have to set the annotations option as shown below:

```yml
with:
    annotations: none
```

Accepted values are:

-   `all` (default) - Will annotate sections of your code that failed tests or test did not cover
-   `none` - Turns off annotations
-   `coverage` - Will annotate those sections of your code that test did not cover. Limited to changed lines when used on a Pull Request
-   `failed-tests` - Will annotate those sections of your code that failed test

## Outputs

By default, action attaches comment to a pull request or commit. However, if you want to use other action for publishing report, you can specify `output: report-markdown`:

```yaml
- uses: ArtiomTr/jest-coverage-report-action@v2
    # give the id for the step, to access outputs in another step.
    id: coverage
    with:
        # tell to the action to not attach comment.
        output: report-markdown
- uses: marocchino/sticky-pull-request-comment@v2
    with:
        # pass output from the previous step by id.
        message: ${{ steps.coverage.outputs.report }}
```

Also, you can use this data on other platforms. For instance, you can send report to your [Slack](https://github.com/slackapi/slack-github-action) or [Jira](https://github.com/atlassian/gajira-comment).

> **Note**: Working examples of integrations with different platforms are much appreciated! Feel free to open a [PR](https://github.com/ArtiomTr/jest-coverage-report-action/pulls).

Available options are:
* `comment` - Attach comment to PR or commit, depending on event type, which triggered an action.
* `report-markdown` - Generate output "report", with report contents in markdown format.

Also, you can combine these options:

```yml
with:
    # This will attach comment to a PR and generate markdown output.
    output: comment, report-markdown
```

## Pull Request Number

If you are using the `push` event to trigger this action, by default it does not know which PR to comment on or the base branch of the PR to compare code coverage with.

You can pass the `prnumber` to the action so that coverage change can be run and comments will be updated on each push, instead of creating a new comment with each run of the action.

You can find the PR number with a number of methods, the [jwalton/gh-find-current-pr](https://github.com/jwalton/gh-find-current-pr) action makes it easy:

```yml
name: 'coverage'
on:
    push:
        branches:
            - master
            - main
jobs:
    coverage:
        permissions:
            checks: write
            pull-requests: write
            contents: write
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v1
            - uses: jwalton/gh-find-current-pr@v1
                id: findPr
            - uses: ArtiomTr/jest-coverage-report-action@v2
                with:
                   prnumber: ${{ steps.findPr.outputs.number }}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

Jest Coverage Report action is made with <3 thanks to these wonderful people
([emoji key ✨](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ArtiomTr"><img src="https://avatars.githubusercontent.com/u/44021713?v=4?s=100" width="100px;" alt="Artiom Tretjakovas"/><br /><sub><b>Artiom Tretjakovas</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=ArtiomTr" title="Code">💻</a> <a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=ArtiomTr" title="Documentation">📖</a> <a href="https://github.com/ArtiomTr/jest-coverage-report-action/pulls?q=is%3Apr+reviewed-by%3AArtiomTr" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-ArtiomTr" title="Maintenance">🚧</a> <a href="#content-ArtiomTr" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/taschetto"><img src="https://avatars.githubusercontent.com/u/5279182?v=4?s=100" width="100px;" alt="Guilherme Taschetto"/><br /><sub><b>Guilherme Taschetto</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=taschetto" title="Code">💻</a> <a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=taschetto" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://adamtuttle.codes"><img src="https://avatars.githubusercontent.com/u/46990?v=4?s=100" width="100px;" alt="Adam Tuttle"/><br /><sub><b>Adam Tuttle</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=atuttle" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dadayama"><img src="https://avatars.githubusercontent.com/u/6773164?v=4?s=100" width="100px;" alt="dadayama"/><br /><sub><b>dadayama</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=dadayama" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://bluelovers.net"><img src="https://avatars.githubusercontent.com/u/167966?v=4?s=100" width="100px;" alt="bluelovers"/><br /><sub><b>bluelovers</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=bluelovers" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gdelahodde-masteos"><img src="https://avatars.githubusercontent.com/u/83218823?v=4?s=100" width="100px;" alt="gdelahodde-masteos"/><br /><sub><b>gdelahodde-masteos</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=gdelahodde-masteos" title="Code">💻</a> <a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=gdelahodde-masteos" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jlim9333"><img src="https://avatars.githubusercontent.com/u/85653304?v=4?s=100" width="100px;" alt="jlim9333"/><br /><sub><b>jlim9333</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=jlim9333" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://blog.mozmonkey.com"><img src="https://avatars.githubusercontent.com/u/35894?v=4?s=100" width="100px;" alt="Jeremy Gillick"/><br /><sub><b>Jeremy Gillick</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=jgillick" title="Code">💻</a> <a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=jgillick" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://zajo.io"><img src="https://avatars.githubusercontent.com/u/1835434?v=4?s=100" width="100px;" alt="Matej Zajo Kralik"/><br /><sub><b>Matej Zajo Kralik</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=Zajozor" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://sidharth.dev"><img src="https://avatars.githubusercontent.com/u/10703445?v=4?s=100" width="100px;" alt="Sidharth Vinod"/><br /><sub><b>Sidharth Vinod</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=sidharthv96" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jaylenwimbish.com"><img src="https://avatars.githubusercontent.com/u/6505395?v=4?s=100" width="100px;" alt="Jaylen Wimbish"/><br /><sub><b>Jaylen Wimbish</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=jaylenw" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/princeIta"><img src="https://avatars.githubusercontent.com/u/39308646?v=4?s=100" width="100px;" alt="princeIta"/><br /><sub><b>princeIta</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=princeIta" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://brianwhitton.com"><img src="https://avatars.githubusercontent.com/u/2090382?v=4?s=100" width="100px;" alt="Brian Whitton"/><br /><sub><b>Brian Whitton</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=noslouch" title="Code">💻</a> <a href="https://github.com/ArtiomTr/jest-coverage-report-action/issues?q=author%3Anoslouch" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/BohdanPetryshyn"><img src="https://avatars.githubusercontent.com/u/45905756?v=4?s=100" width="100px;" alt="Bohdan Petryshyn"/><br /><sub><b>Bohdan Petryshyn</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=BohdanPetryshyn" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/herberttn"><img src="https://avatars.githubusercontent.com/u/5903869?v=4?s=100" width="100px;" alt="Herbert Treis Neto"/><br /><sub><b>Herbert Treis Neto</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=herberttn" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://lifterlms.com"><img src="https://avatars.githubusercontent.com/u/1290739?v=4?s=100" width="100px;" alt="Thomas Patrick Levy"/><br /><sub><b>Thomas Patrick Levy</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=thomasplevy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/laurislokalise"><img src="https://avatars.githubusercontent.com/u/74536758?v=4?s=100" width="100px;" alt="Lauris Mikāls"/><br /><sub><b>Lauris Mikāls</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=laurislokalise" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rena-h"><img src="https://avatars.githubusercontent.com/u/20507786?v=4?s=100" width="100px;" alt="Rena Hamada"/><br /><sub><b>Rena Hamada</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=rena-h" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jacob.cs.ie　　　　　　　　　　　　　　　　@jacob.pages.dev/"><img src="https://avatars.githubusercontent.com/u/28478594?v=4?s=100" width="100px;" alt="JacobLinCool"/><br /><sub><b>JacobLinCool</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=JacobLinCool" title="Code">💻</a> <a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=JacobLinCool" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://tommasoferrari.com"><img src="https://avatars.githubusercontent.com/u/927264?v=4?s=100" width="100px;" alt="Tommaso Ferrari"/><br /><sub><b>Tommaso Ferrari</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=raspo" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Raigen"><img src="https://avatars.githubusercontent.com/u/894799?v=4?s=100" width="100px;" alt="Florian"/><br /><sub><b>Florian</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=Raigen" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://mh4gf.dev"><img src="https://avatars.githubusercontent.com/u/31152321?v=4?s=100" width="100px;" alt="Hirotaka Miyagi"/><br /><sub><b>Hirotaka Miyagi</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=MH4GF" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://armfazh.github.io"><img src="https://avatars.githubusercontent.com/u/10335519?v=4?s=100" width="100px;" alt="Armando Faz"/><br /><sub><b>Armando Faz</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=armfazh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/maciejtutak"><img src="https://avatars.githubusercontent.com/u/10584953?v=4?s=100" width="100px;" alt="Maciej Tutak"/><br /><sub><b>Maciej Tutak</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=maciejtutak" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.nikodev.ca"><img src="https://avatars.githubusercontent.com/u/34389859?v=4?s=100" width="100px;" alt="Niko Oshinov"/><br /><sub><b>Niko Oshinov</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=nikodevv" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://dalefenton.com/"><img src="https://avatars.githubusercontent.com/u/16996057?v=4?s=100" width="100px;" alt="Dale Fenton"/><br /><sub><b>Dale Fenton</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=dalevfenton" title="Documentation">📖</a> <a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=dalevfenton" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://projects.flo.by"><img src="https://avatars.githubusercontent.com/u/235570?v=4?s=100" width="100px;" alt="Florent Jaby"/><br /><sub><b>Florent Jaby</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=Floby" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vikasperi"><img src="https://avatars.githubusercontent.com/u/117131235?v=4?s=100" width="100px;" alt="vikasperi"/><br /><sub><b>vikasperi</b></sub></a><br /><a href="https://github.com/ArtiomTr/jest-coverage-report-action/commits?author=vikasperi" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

MIT © [Artiom Tretjakovas](https://github.com/ArtiomTr)
