# DVP Schema Registry

## Install

```sh

$ npm install
```

## Commands

```sh
$ npm run storybook # open storybook and start editing your components
$ npm run storybook:build # generate docs
$ npm run test:watch # run tests with Jest
$ npm run test:coverage # run tests with coverage
$ npm run integration # run integration test with testcafe
$ npm run lint # lint code
$ npm run build # build component
$ npm run dev # start the dev server
```

## Code organization and development

- `index.ts` contains the logic to communicate with the host embedding your renderer. You probably will _never_ need to update that file.
- template registry configuration is located in `src/templates/index.tsx`
- templates are located in `src/templates` folder.
