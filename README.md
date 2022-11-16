# @wouterds/craftzing-slack-bot

[![code-review](https://github.com/wouterds/craftzing-slack-bot/workflows/code-review/badge.svg)](https://github.com/wouterds/craftzing-slack-bot/actions/workflows/code-review.yml)
[![release](https://github.com/wouterds/craftzing-slack-bot/workflows/release/badge.svg)](https://github.com/wouterds/craftzing-slack-bot/actions/workflows/release.yml)

## Setup

### Dependencies

```bash
# install node
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

## Testing

```bash
# run tests
yarn test
```

## Development

```bash
# dev server
yarn dev

# compile source
yarn build
```
