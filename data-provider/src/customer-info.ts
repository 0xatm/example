import { ethers } from 'ethers'
import Config from './utils/config'

declare var process : {
  env: {
    PRIVATE_KEY: string,
    RPC_URL: string
  }
}

class CustomerInfo {
  private provider: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider()

  constructor(rpcUrl?: any) {
    this._initProvider(process.env.RPC_URL ? process.env.RPC_URL : rpcUrl)
  }

  public async sendCustomerData(data: Customer): Promise<void> {
    try {
      const contract = await this.getCustomerContract()
      await contract.setCustomer(data.alias, data.amount)
    } catch (e) {
      console.error('Error to send customer data, error:', e)
    }
  }

  private async getCustomerContract(): Promise<ethers.Contract> {
    const contractABI = Config.customerInfo.ABI
    const contractAddress = Config.customerInfo.address
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey, this.provider);
    return new ethers.Contract(contractAddress, contractABI, wallet)
  }

  private _initProvider(rpcUrl: string): void {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)
  }

}

export = CustomerInfo
