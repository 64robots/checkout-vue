# 🧩 Puzzle
Puzzle is boilerplate for Vue.js packages that is used in our company.

## What's in the Box?

- [Rollup.js](https://rollupjs.org/) as module bundler
- [Vue-cli](https://cli.vuejs.org/) for dev server
- [VuePress](https://vuepress.vuejs.org/) for docs
- A `package.json` file with build/dev scripts and dependencies
- Minimal .babelrc and .browserslistrc file for transpiling


## Setup

Download master branch

```bash
git clone https://github.com/64robots/puzzle.git
```

Install the dependencies

```bash
yarn
```

For development you can start a local server
```bash
yarn serve
```

Once your development is done it's time to compile your package
```bash
yarn build
```
## Tailor for your needs

It will work as it is we'll need to modify a few files to get the package tailored for our development, let's dive in.

### Package.json

Replace the `PACKAGE_NAME` string with your package name

### Components
Components live in the `src/components` directory. Any new component should be registered in the `src/index.js` file so they will be exposed as part of the package.

### Documentation
Documentation live in the `docs` folder. You can create any pages and/or modify the current ones as your need.
Also note to modify the `docs/.vuepress/config.js` file to add the package repo, package name and so on. Reference [vuepress docs](https://vuepress.vuejs.org/guide/basic-config.html#config-file) for a more detailed version

---

Based on [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup)
