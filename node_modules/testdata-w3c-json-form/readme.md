# Testdata for W3C JSON form

This repository contains test data intended to be used by people building query
parsers that follows [the W3C JSON form spec](http://www.w3.org/TR/html-json-forms/).

## Usage

The export of this module is an array with objects following the structure below.

```javascript
{
  name: String,    // A short name for this case
  fields: [{       // An array of fields
    key: String,   // - The name of this field
    value: String  // - The value of this field
  }],
  expected: Object // An object representing the expected output
}
```
