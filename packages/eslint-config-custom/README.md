# eslint-config-custom

## Usage

Install:

```
pnpm i -D eslint-config-custom
```

Create a `.eslintrc.cjs` with the following config:

```javascript
module.exports = {
  root: true,
  extends: ['custom'], // select from one of the configs below
};
```

### Shareable Configs

Extend one of the following required main configs depending on the project type.

- `custom`: Typescript Project
- `custom/react`: React Project

Extend any of the following optional configs depending on usage.

- `custom/vitest`
- `custom/storybook`
