# smangler
This code will generate variants of a word following different strategies that are commonly used in order to create a password. This project does not aims to produce an exaustive output but a set of probable values instead. Some of the strategies used to generate are: capitalization, upper case, camel case and leet speaking.

[![CircleCI](https://circleci.com/gh/patrickrbc/smangler.svg?style=svg)](https://circleci.com/gh/patrickrbc/smangler)

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

## License
MIT License

Copyright (c) 2019 patrickrbc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
