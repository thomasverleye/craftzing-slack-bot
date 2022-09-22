# @wouterds/craftzing-slack-bot

![code-review](https://github.com/wouterds/craftzing-slack-bot/workflows/code-review/badge.svg)
![docker-image](https://github.com/wouterds/craftzing-slack-bot/workflows/docker-image/badge.svg)
![deploy](https://github.com/wouterds/craftzing-slack-bot/workflows/deploy/badge.svg)
![docker image size](https://ghcr-badge.herokuapp.com/wouterds/craftzing-slack-bot/size)

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
