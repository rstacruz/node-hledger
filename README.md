# node-hledger

Node.js API for [hledger].

```js
hledger('bal Assets')
.then((d) => ...)

[ ['account', 'amount']
  ['Assets', '$100'] ]
```

## API

<!--api-->

### hledger

> `hledger(args, options)`

Invokes hledger and resolves into the CSV output of hledger.

    hledger(['bal', 'Assets'])
      .then((data) => ...)

    [ [ 'account', 'balance' ],
      [ 'Assets', '$200' ],
      [ 'Assets:Savings', '$150' ],
      [ 'Assets:Checking', '$50' ] ]

You can invoke it with a string:

    hledger('bal Assets')

You can then use functions to make better sense of them:

    hledger(['bal', 'Assets'])
      .then(hledger.tableize)
      .then((data) => ...)

    [ { account: 'Assets', balance: '$200' },
      { account: 'Assets:Savings', balance: '$150' },
      ... ]

### hledger.tableize

> `exports(list)`

Turns a CSV-based array into an table list.

    input = [
      ['account', 'amount'],
      ['Savings', '$100'],
      ['Checking', '$150']
    ]

    tableize(input)
    // [ { account: 'Savings', amount: '$100' },
    //   { account: 'Checking', amount: '$200' } ]

Used for piping into `hledger()`'s promise output:

    hledger('...')
      .then(hledger.tableize)
      .then((data) => ...)

<!--api:end-->

[hledger]: http://hledger.org/

## Thanks

**node-hledger** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/node-hledger/contributors
