# block-ten

## The blocks of the recent past.. _today!_

### Commits made after the due date are being pushed to the ['after' branch](https://github.com/travisCarson/block-ten/tree/after)

I will continue to make commits until the project is at a place where I feel good about stopping. I will also continue to update this readme.

### Commits made before the due date were pushed to master branch\*

\*_excluding this readme, which was pushed to master after the due date_

## Challenges

I had never run an eosio node, so I spent quite a while trying to understand eosjs, nodeos, and docker. I had difficulties connecting my node to the EOS mainnet, but eventually decided that that's probably not a big deal, since block.one makes open source software that's not for a particular chain.

In my haste to begin building the frontend, I misunderstood the purpose of JsonRPC. Instead of feeding JsonRPC localhost as a parameter, I gave it the address of EOS new york. This made it improperly function as an API client, but at least I was getting data to build with.

I've since refactored to connect to a local node running an independent chain. Unfortunately, nobody seems to be using my blockchain.

## Todo

- [ ] Frontend tests
- [ ] Explain my choices
- [ ] Comment code
- [ ] Create environment variables
- [ ] Extra credit
- [ ] Refactor into TypeScript
- [ ] Investigate pros and cons of moving JsonRPC calls to the browser
- [ ] Investigate pros and cons of refactoring from the 'render props' pattern of composition, to the 'props.children' pattern
- [ ] Learn how to make use of RpcError
- [ ] Add 'retries' to error handling
- [ ] Give more consideration to accessibility

## Bugs outstanding

- [ ] React is warning about failed propTypes that aren't failing
- [ ] React is warning about unsupported style property word-wrap, but it seems to work fine
- [ ] When clicking a BlockCard, the loading spinner appears on the first click, but not on subsequent clicks
- [ ] React is warning about the necessity for unique key props, even though the current key props are unique block ID's. The warning stops when using .map's index.
