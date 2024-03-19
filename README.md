This repo contains examples of `hardhat` and `foundry` projects that run fork tests using the Hedera JSON RPC Relay.
It demonstrates that `foundry` and earlier versions of `hardhat` are compatible, but not the latest `hardhat`.

In order to run fork tests the used Relay instance has to have `batch requests` enabled. Currently, the public Relays 
(for testnet, previewnet and mainnet) do not have this feature enabled. For the tests to run you will have to start your own
instance of a relay and configure it with the required network. See the [configuration docs](https://github.com/hashgraph/hedera-json-rpc-relay?tab=readme-ov-file#configuration).
Add the following env variable to the relay:

```
BATCH_REQUESTS_ENABLED=true
```


```
cd hardhat-working-example
npm install
npx hardhat compile
node scripts/createCounter.js
```

Copy the Counter address to: 
    - `hardhat-working-example/test/CounterManager.js`
    - `hardhat-non-working-example/test/CounterManager.js`
    - `foundry-example/test/Counter.t.sol`

Remove the `default-network` property from `hardhat-working-example/hardhat.config.js` so that it uses the default `hardhat` network in fork mode.
Run the tests in `hardhat-working-example` and observe that they are passing:
```
npx hardhat test
```

Now let's run the tests with the latest hardhat version:
```
cd ../hardhat-non-working-example
npm install
npx hardhat compile
npx hardhat test
```

Observe that they fail with a similar error: 
```
ProviderError: Invalid parent hash: 0xa98ee7a73415300942185859ab801cc77d9591bf52f31db89bc5648bdc75f6fd. Expected: 0xa88a551bbd05812ea225391668f7ca9e7cbfb452b833ec2945e0b6913114d9ae.
```

Hardhat tries to create a new block, and it compares its hash to the hash of the latest block from the forked network.
It fails because of a difference in the way Hedera and hardhat create blocks, so the hashes will always be different.
Earlier versions of hardhat do not have this block validation.

And finally let's run the tests with Foundry and observe that they are passing:
```
cd ../foundry-example
forge test --fork-url=http://localhost:7546
```