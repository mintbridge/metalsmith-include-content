# Metalsmith Include Content [![NPM version](https://img.shields.io/npm/v/metalsmith-include-content.svg)](https://www.npmjs.org/package/metalsmith-include-content)

A [Metalsmith](http://metalsmith.io) plugin that allows content to be included (nested) within other content by including the file path in the document.

Continuous testing courtesy of travis-ci:

[![Build Status](https://travis-ci.org/mintbridge/metalsmith-include-content.png)](https://travis-ci.org/mintbridge/metalsmith-include-content)

## Installation

This package can be installed through npm:

```bash
npm install metalsmith-include-content
```

## Usage

### JavaScript
If you are using the JS api for Metalsmith, then you can require the module and add it to your .use() directives:

```js
var include = require('metalsmith-include-content');

Metalsmith()
  .use(include())
  .build(function(err) {

  });
```

Then in your markdown files (using the default pattern it needs to be at the start of the line):

```md
include path/to/file
```

### CLI
If you are using the command-line version of Metalsmith, you can install via npm, and then add the `metalsmith-include-content` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-include-content": {
      "pattern": "^include (.*)",
      "ignoreMissing": false
    }
  }
}
```

## Options
The plugin allows you to override the default behaviour by passing in options.

- `pattern` is the regular expression pattern that is used for finding includes
- `ignoreMissing` allows you to show or hide warnings if the include file does not exist

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
