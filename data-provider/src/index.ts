import CustomerInfo from './customer-info'

const dataSender = () => {
  let timer
  try {
    timer = setInterval(async () => {
      const amount = Math.floor(Math.random() * 100) + 1
      const customer: Customer = { alias: `name-${amount}`, amount }
      await new CustomerInfo().sendCustomerData(customer)
    }, 6000)
  } catch (e) {
    console.error('Oops, something went wrong, error:', e)
    if (timer) {
      clearInterval(timer)
    }
  }
}

dataSender()
