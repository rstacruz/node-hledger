# node-hledger

Node.js API for [hledger].

```js
hledger('bal Assets')
.then((d) => ...)

[ ['account', 'amount']
  ['Assets', '$100'] ]
```

[hledger]: http://hledger.org/

## Thanks

**node-hledger** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/node-hledger/contributors
