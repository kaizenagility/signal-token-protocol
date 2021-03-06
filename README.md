# signal-token-protocol

Signal, the smart contract advertising token.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for
development and testing purposes.

### Prerequisites

* [node](https://nodejs.org/en/download/)

* [yarn](https://yarnpkg.com/en/docs/install)

* [truffle](https://truffleframework.com)

### Setup

```sh
# Copy the config.js.example file into config.js, and fill it out appropriately
$ cp config.js.example config.js
```

### Installing

After cloning this repository and installing the above dependencies, from the project directory

```
$ yarn install
```

```
$ truffle develop
```

```
truffle(develop)> compile
```

```
truffle(develop)> migrate
```

## Running the tests

From the project directory

```
$ truffle develop
```

```
truffle(develop)> test
```

## Running the demo

From the project directory, make sure truffle is serving to `localhost:9545`

```
$ truffle develop
```

```
truffle(develop)> compile
```

```
truffle(develop)> migrate
```

```
$ yarn demo
```
