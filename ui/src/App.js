import {useEffect, useState} from 'react'
import { ethers, utils } from 'ethers'
import { Container, Table } from 'react-bootstrap'

function App() {

  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const customerABI = [
      'event UpdateCustomer(address indexed _from, string _alias, uint _amount)'
    ]
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL)

    const contractListener = async () => {
      try {
        const contract = await new ethers.Contract(contractAddress, customerABI, provider)
        const filter = {
          address: contractAddress,
          topics: [
            utils.id("UpdateCustomer(address,string,uint256)")
          ]
        }
        provider.on(filter, (log) => {
          const args = contract.interface.parseLog(log).args
          setCustomers(prevArray => [...prevArray, { txHash: log.transactionHash, alias: args[1], amount: Number(args[2]) }] )
        })
      } catch (e) {
        console.error('Error listening on UpdateCustomer event:', e)
      }
    }

    contractListener()

    return () => {
      provider.removeAllListeners()
    }
  }, [])

  return (
    <div className="App">
      <Container>
        <Table striped bordered hover size="sm" className={'mt-5'}>
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>Alias</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {
            customers.reverse().map((customer, idx) => (
              <tr key={`${idx}${customer.txHash}`}>
                <td>{customer.txHash}</td>
                <td>{customer.alias}</td>
                <td>{customer.amount}</td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default App
