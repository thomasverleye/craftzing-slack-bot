# @wouterds/avocado-slack-bot

![code-review](https://github.com/wouterds/avocado-slack-bot/workflows/code-review/badge.svg)

## Setup

### Dependencies

```bash
# install & use correct node version
nvm install

# dependencies
yarn
```


### VSCode

#### Plugins

- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

#### Workspace settings

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.validate": [
    "javascript",
    "typescript",
  ],
}
```

## Linting

```bash
# lint
yarn lint

# lint & try to fix what's possible
yarn lint:fix
```

## Development

```bash
# dev server
yarn dev

# compile source
yarn build
```
