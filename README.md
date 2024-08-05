# Roman Kyoto V2

Roman Kyoto is a multi asset shield pool (a MASP). The first version was created at ETHGlobal sydney 2024 by Rudy, Jack, Ayad and myself.

The goal of this project is to recreate RKs functionality, while converting the circuits from circom to noir.

## Installation

```bash
bun install
```

but you can use `npm`, `yarn`, whatever floats your boat.

You will also need:

- nargo (version >= 0.31.0)
- bb (version >= 0.41.0)

You can read more about installing them here:

- nargo [here](https://noir-lang.org/docs/getting_started/installation/)
- bb [here](https://github.com/AztecProtocol/aztec-packages/blob/master/barretenberg/cpp/src/barretenberg/bb/readme.md#installation)

### Set Up

From root, this is a hardhat project. That means that you just run:

```
bun hardhat test
```

to run tests, or

```
bun hardhat <whatever_hardhat_command>
```

for any other hardhat commands.

### Noir Specific Set Up

The Noir project is located at `circuits/`. You can read more about Noir project structure in their [docs](https://noir-lang.org/docs/).

For this template, it's assumed that you will have `nargo >= 0.31.0` installed. You can find installation instructions [here](https://noir-lang.org/docs/getting_started/installation/).

Noir allows you to test your circuit within the `circuits/src/main.nr` file, and those tests can be ran within noir by running:

```bash
cd circuits
nargo test
```

### Building the Verifier Contract

Any time that you change your circuit in `circuits/src/main.nr`, chances are that you'll need to rebuild your Solidity verifier contract. This can be done with:

```bash
bun build:circuit
```

This will generate the Verifier contract and place it in `contracts/circuits/UltraVerifier.sol`

You can also build and then run the hardhat tests by running:

```bash
bun build:circuit:test
```

> [!NOTE]  
> Only single circuit is supported at the moment. If you have multiple circuits, you will need to manually combine the generated verifier contracts yourself. Multiple circuit support should be coming soon 👀

### Issues or Questions

If you have any issues or questions please reach out here or @ me on twitter [@0xbenhooper](https://x.com/0xbenhooper)

happy hacking

### Disclaimer

This code is not audited and I only have pretty rudimentary knowledge of the moon maths at hand. If you're serious about deploying this - please get this looked at by someone who knows what an UltraPLONK is.
