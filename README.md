NYSE Openbook Ultra Converter
===

| Converts NYSE Openbook Ultra binary format to JSON or CSV format

Reference: http://www.nyxdata.com/doc/78930

Usage
---
```
npm install

node openbook.js <file> [options]

file     Input file in Openbook Ultra format
Options:
   -o, --output   Output format, json or csv  [csv]
   -p, --pretty   Pretty json output  [false]
   -f, --filter   Symbol filter
```