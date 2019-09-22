[![CircleCI](https://circleci.com/gh/patrickrbc/string-mangler.svg?style=svg)](https://circleci.com/gh/patrickrbc/string-mangler)

## Usage

```
$ node index.js -h

  Usage: index [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -w, --words [string]   Words
    -o, --output [string]  Output file

$ node index.js -w password
password
pAsSwOrD
Password
pa55word
p4ssw0rd
...
97P455w0rD
98P455w0rD
99P455w0rD
@P455w0rD
@@P455w0rD

$ node index.js -w password | wc -l
8060

```
