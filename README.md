# react-php-webpack-boilerplate

## Layout Details

### /public

The public folder is the equivalent of the root location of your application on the server. In other words `/public` maps to the root directory of your application on the server such as `/serverName/acmeApp/`.

### /src

Contains the source code required to create the client side javascript and react application. When using the webpack production or staging settings, the compiled javascript code and assets will be placed in `public/assets`.

### /dev

The dev folder contains an an index.html file that will be used to when running the webpack with the dev config. The `src/index.html` file is identical to the one in `public/index.php`.

# NPM Commands

- npm run server
- npm run build:staging
- npm run build:production
