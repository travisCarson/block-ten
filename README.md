# block.ten

## The blocks of the recent past.. _today!_

# **Commits made after the due date are being pushed to the ['after' branch](https://github.com/travisCarson/block-ten/tree/after)**

I will continue to make commits until the project is at a place where I feel good about stopping. I will also continue to update this readme.

## Commits made before the due date were pushed to master branch\*

\*_excluding this readme, which was pushed to master after the due date_

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

## Challenges

### eosjs

I had never run an eosio node, so I spent quite a while trying to understand eosjs, nodeos, and docker. I had difficulties connecting my node to the EOS mainnet, but eventually decided that that's probably not a big deal, since it's my understanding that block.one makes software that's not for one particular chain. It won't be too difficult to point it at the mainchain, or a sidechain, when the time comes.

In my haste to begin building the frontend, I misunderstood the purpose of JsonRPC. Instead of feeding JsonRPC localhost as a parameter, I gave it the address of EOS new york. This made the API client function improperly, but at least I was getting data to build with.\*

\*Actually, this seems to work just fine. So, I've added support for both local and remote nodes. (see configuration section above)

## Decisions

### Making requests from the server

My first implementation used polling to get data from EOS New York, then cached it, so that the user always had ten fresh blocks to request. This worked well. EOS NY started returning bad data when the polling rate was increased past about 500 ms. If these requests were made from the browser, the user would have to wait 5 seconds, just to initiate all ten requests, without considering the time it would take to download the blocks.

With a block time of 500 ms, by the time the requests would be initiated, 10 new blocks would have been produced.

Using JsonRPC properly, along with nodeos running in a docker container, my second implementation has none of these issues.

##### Raw JSON block loading time

Simulating a slow 3g connection showed that downloading a single raw JSON block often took more than four seconds. Page load times for 10 blocks averaged about 18 seconds.

Block.ten has a reputation to uphold. We deliver the fastest ten blocks in town. Making the requests client side was out of the question.

### More decisions to be written about soon

## Discussion

I spent too much time learning about eosjs, creating a node, and trying to connect my node to the mainnet, which in hindsight wasn't important. Due to these issues, I wasn't able to write tests or do the extra credit before the deadline. I will be finishing the project in my spare time over the next few days though!

## Todo

- [ ] Frontend tests
- [ ] Explain my choices
- [ ] Comment code
- [ ] Create environment variables
- [ ] Extra credit
- [ ] Refactor into TypeScript
- [x] Investigate pros and cons of moving JsonRPC calls to the browser
- [ ] Investigate pros and cons of refactoring from the 'render props' pattern of composition, to the 'props.children' pattern
- [ ] Learn how to make use of RpcError
- [ ] Add 'retries' to error handling
- [ ] Give more consideration to accessibility
- [ ] Look into other options for prettifying raw JSON blocks

## Bugs outstanding

- [ ] React is warning about failed propTypes that aren't failing
- [ ] React is warning about unsupported style property word-wrap, but it seems to work fine
- [ ] When clicking a BlockCard, the loading spinner appears on the first click, but not on subsequent clicks
- [ ] React is warning about the necessity for unique key props, even though the current key props are unique block ID's. The warning stops when using .map's index.