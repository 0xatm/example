# Example project

## Run Steps
1. Make sure the ganache-cli or Ganache is installed

2. The ganache server port should be 8454

3. Get the ganache server up and running 

4. Compile and deploy the smart contracts, see [README](./contracts/README.md)

5. Get the deployed contract address, and update it to LN 5 of the [config file](./data-provider/src/utils/config.ts)

6. Get the first accounts private key and run below command to set PRIVATE_KEY variable 
    > `export PRIVATE_KEY="YOUR PRIVATE KEY"`

7. Run the data provider following up with [README](./data-provider/README.md)

8. Run the UI following up with [README](./ui/README.md)


## To do list

1. Write more units

2. Add href to transaction column to make the transactions clickable, and the users can go to the explorer to see more transaction details

3. Pagination
