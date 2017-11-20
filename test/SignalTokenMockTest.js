const SignalTokenMock = artifacts.require("SignalTokenMock");


contract("SignalTokenMock", function(accounts) {
  let signalTokenMock;

  beforeEach(function() {
    return SignalTokenMock.new()
      .then(function(instance) {
        signalTokenMock = instance;
      });
  });


  it("should give the deploying account 1000000 tokens", function() {
    return signalTokenMock.getBalance(accounts[0])
      .then(function(balance) {
        assert.equal(
          balance.valueOf(),
          1000000,
          "1000000 wasn't the deploying account balance"
        );
      });
  });


  it("should complete a transfer if sender's balance allows", function() {
    const accountOne = accounts[0];
    let accountOneStartingBalance;
    let accountOneEndingBalance;

    const accountTwo = accounts[1];
    let accountTwoStartingBalance;
    let accountTwoEndingBalance;

    const amount = 1000000;

    return signalTokenMock.getBalance(accountOne)
      .then(function(balance) {
        accountOneStartingBalance = balance.toNumber();
        return signalTokenMock.getBalance(accountTwo);
      })
      .then(function(balance) {
        accountTwoStartingBalance = balance.toNumber();
        return signalTokenMock.transfer(
          amount,
          accountOne,
          accountTwo
        );
      })
      .then(function() {
        return signalTokenMock.getBalance(accountOne);
      })
      .then(function(balance) {
        accountOneEndingBalance = balance.toNumber();
        return signalTokenMock.getBalance(accountTwo);
      })
      .then(function(balance) {
        accountTwoEndingBalance = balance.toNumber();

        assert.equal(
          accountOneEndingBalance,
          accountOneStartingBalance - amount,
          "0 wasn't the deploying account final balance"
        );

        assert.equal(
          accountTwoEndingBalance,
          accountTwoStartingBalance + amount,
          "1000000 wasn't the destination account final balance"
        );
      });
  });


  it("should revert a transfer if sender's balance disallows", function() {
    const accountOne = accounts[0];
    let accountOneStartingBalance;
    let accountOneEndingBalance;

    const accountTwo = accounts[1];
    let accountTwoStartingBalance;
    let accountTwoEndingBalance;

    const amount = 1000001;

    return signalTokenMock.getBalance(accountOne)
      .then(function(balance) {
        accountOneStartingBalance = balance.toNumber();
        return signalTokenMock.getBalance(accountTwo);
      })
      .then(function(balance) {
        accountTwoStartingBalance = balance.toNumber();
        return signalTokenMock.transfer(
          amount,
          accountOne,
          accountTwo,
          { from: accountOne }
        );
      })
      .then(function() {
        return signalTokenMock.getBalance(accountOne);
      })
      .then(function(balance) {
        accountOneEndingBalance = balance.toNumber();
        return signalTokenMock.getBalance(accountTwo);
      })
      .then(function(balance) {
        accountTwoEndingBalance = balance.toNumber();

        assert.equal(
          accountOneEndingBalance,
          accountOneStartingBalance,
          "1000000 wasn't the deploying account final balance"
        );
        assert.equal(
          accountTwoEndingBalance,
          accountTwoStartingBalance,
          "0 wasn't the destination account final balance"
        );
      });
  });
});
