const CustomerInfo = artifacts.require('CustomerInfo');
const truffleAssert = require('truffle-assertions');

contract('CustomerInfo', (accounts) => {
  let customerInfo
  const fromAccount = accounts[0]

  beforeEach(async () => {
    customerInfo = await CustomerInfo.new({ from: fromAccount })
  });

  it('should add a new customer data', async () => {
    let tx = await customerInfo.setCustomer('test', 1000)
    truffleAssert.eventEmitted(tx, 'UpdateCustomer', ev => {
      return ev._from === fromAccount && ev._alias === 'test' && ev._amount.words[0] === 1000
    }, 'UpdateCustomer should be emitted with correct parameters')
  })
})
