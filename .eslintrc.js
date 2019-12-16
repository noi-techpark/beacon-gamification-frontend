module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  plugins: ["lit", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    camelcase: 0,
    "import/prefer-default-export": 0,
    "dot-notation": [2, { allowPattern: "^[a-z]+(_[a-z]+)+$" }],
    "import/no-extraneous-dependencies": 0,
    "no-plusplus": 0,
    "comma-dangle": 0,
    "arrow-parens": 0,
    "object-curly-newline": 0,
    "prettier/prettier": "error",
    "no-console": 0,
    "class-methods-use-this": 0,
    "consistent-return": 0,
    "no-unused-expressions": ["error", { allowShortCircuit: true }],
    "no-case-declarations": 0
  }
};
