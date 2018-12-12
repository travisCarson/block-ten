# block.ten

## The blocks of the recent past.. _today!_

## block.ten returns information about the last ten blocks on an eosio blockchain. It connects to block producers EOS mainnet by default, but you can connect it to your own chain, or your own local node, but editing the config.

## Configuration

The server can be configured to return blocks from either a local node, or a list of remote nodes.

If errors occur in the requests to remote nodes, the request will be sent to the next block producer in the list.

```
server/config.json

{
  "serverPort": 1111,
  "rpcConfig": {
    "blockSource": "remote",
    "localNodeUrl": "http://127.0.0.1",
    "localNodePort": 8888,
    "remoteNodeList": [
      { "eosnewyorkio": "http://api.eosnewyork.io" },
      { "cypherglasss": "http://api.cypherglass.com" },
      { "eoscanadacom": "http://mainnet.eoscanada.com" },
      { "eoscafeblock": "http://mainnet.eoscalgary.io" }
    ]
  }
}
```
