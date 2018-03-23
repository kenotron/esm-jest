## Jest with ES Modules!

This repo demonstrate how one can use `esm` module with `jest`.

The jist is that we have to go patch up the internal jest require at the proper time. This requires a custom jest runner. To run this sample, run:

```
yarn
yarn test
```

esm-jest.js currently tries to infer from the test and source files whether they are ESM or not by match against ".mjs" or if it consists of import / export. The latter seems expensive and inaccurate unless we pair it with Acorn parser (which is what ESM internally is doing). One can take this repo and make it more bullet proof, but it is a working example of something that works without having to transpile anything to support ESM.

## Inspiration

The inspiration for all this is from the solution listed here: https://stackoverflow.com/questions/46433678/specify-code-to-run-before-any-jest-setup-happens