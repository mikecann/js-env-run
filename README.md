# JS ENV Run

It loads the environment object from the given `.js` file then executes the given command.

## Install

```
yarn add -D js-env-run
```

## Usage

create the file `./env.js` file in the root of your project

```
module.exports = {
  HELLO: "foo",
  WORLD: 123
};
```

then

```
yarn js-env-run ./env.js <some command>
```

it will then execute `<some command>` using the environment variables that were exported from `env.js`
