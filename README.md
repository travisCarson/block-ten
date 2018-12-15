# block.ten

## The blocks of the recent past.. _today!_

## block.ten returns information about the last ten blocks on an eosio blockchain. It connects to block producers EOS mainnet by default, but you can connect it to anoter chain, or to your own local node, by editing the config.

## Configuration

```
server/config.json

{
  "serverPort": 1111,
  "blocksToDisplay": 10,
  "rpcConfig": {
    "blockSource": "remote",
    "localNodeUrl": "http://127.0.0.1",
    "localNodePort": 8888,
    "remoteNodeList": [
      { "cypherglasss": "http://api.cypherglass.com" },
      { "eoscanadacom": "http://mainnet.eoscanada.com" },
      { "eoscafeblock": "http://mainnet.eoscalgary.io" },
      { "eosnewyorkio": "http://api.eosnewyork.io" }
    ],
    "maxRequests": 15
  },
  "resyncMargin": 20
}

```

#### Settings

> blocksToDisplay
>
> > The number of blocks that will be sent to the frontend
>
> resyncMargin
>
> > If the app gets out of sync with the blockchain you're working with, the missing blocks will be queued for future fetching, so it should quickly sort itself out. But after a long network outage, you may want to start fresh, without downloading the missing blocks
>
> > You can specify the number of blocks "behind" at which the queue should completely reset (delete all local blocks and restart at the head block)
>
> blockSource
>
> > Options: "local", "remote", "local-remote-fallback"
>
> > - "local" connects to a locally running EOS.io node
> >
> > - "remote" connects to the nodes in remoteNodeList
> >
> > - "local-remote-fallback" connects to your local node, then connects to nodes in remoteNodeList in the event of a failure
>
> remoteNodeList
>
> > A list of block producers (or other nodes) from which you'd like to fetch blocks
>
> > Failed requests will fall back to the next node in the list
>
> maxRequests
>
> > The number of times that the server will try to request a block before failure
