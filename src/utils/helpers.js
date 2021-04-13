import { ethers } from "ethers"
import CryptoJS from 'crypto-js'
import { FACTORY_ABI, FACTORY_ADDRESS, ROUTER_ABI, ROUTER_ADDRESS, TOKEN_ABI, PROVIDER } from "./contracts"

const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, PROVIDER)

export const getTokenBalance = (walletAddress, contractAddress, contractABI) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(contractAddress, contractABI, PROVIDER)
            let balance = await contract.balanceOf(walletAddress)
            balance = ethers.utils.formatUnits(balance, 18)
            resolve({
                success: true,
                balance: balance
            })
        } catch (err) {
            console.log(err)
            reject({
                error: true,
                message: err.message,
            })
        }
    })
}

export const getTokenSupply = (contractAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(contractAddress, TOKEN_ABI, PROVIDER)
            let totalSupply = await contract.totalSupply()
            totalSupply = ethers.utils.formatUnits(totalSupply, 18)
            resolve({
                success: true,
                supply: totalSupply,
            })
        } catch (err) {
            reject({
                error: true,
                message: err.message,
            })
        }
    })
}

export const getTokenApproval = (walletAddress, contractAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(contractAddress, TOKEN_ABI, PROVIDER)
            let allowance = await contract.allowance(walletAddress, ROUTER_ADDRESS)
            allowance = ethers.utils.formatUnits(allowance, 18)
            resolve(allowance)
        } catch (err) {
            console.log(err)
            reject(0)
        }
    })
}

export const getAllPairsLength = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let pairsLength = await factoryContract.allPairsLength()
            pairsLength = pairsLength.toNumber()
            resolve({
                success: true,
                length: pairsLength
            })
        } catch (err) {
            reject({
                error: true,
                message: err.message,
            })
        }
    })
}

export const getPairAddress = (index) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pairAddress = await factoryContract.allPairs(index)
            resolve({
                success: true,
                address: pairAddress,
            })
        } catch (err) {
            reject({
                error: true,
                message: err.message,
            })
        }
    })
}

export const getLPAddress = (addressA, addressB) => {
    return new Promise(async (resolve, reject) => {
        try {
            const address = await factoryContract.getPair(addressA, addressB)
            resolve(address)
        } catch (err) {
            reject({
                error: true,
                message: err.message
            })
        }
    })
}

export const getLPInfo = (pairAddress, walletAddress, tokenAAddress, tokenBAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(pairAddress, TOKEN_ABI, PROVIDER)
            const tokenAContract = new ethers.Contract(tokenAAddress, TOKEN_ABI, PROVIDER)
            const tokenBContract = new ethers.Contract(tokenBAddress, TOKEN_ABI, PROVIDER)
            let totalSupply = await contract.totalSupply()
            totalSupply = ethers.utils.formatUnits(totalSupply, 18)
            let totalPooledTokens = await contract.balanceOf(walletAddress)
            totalPooledTokens = ethers.utils.formatUnits(totalPooledTokens, 18)
            let tokenAShare = await tokenAContract.balanceOf(pairAddress)
            tokenAShare = ethers.utils.formatUnits(tokenAShare, 18)
            let tokenBShare = await tokenBContract.balanceOf(pairAddress)
            tokenBShare = ethers.utils.formatUnits(tokenBShare, 18)
            let tokenASupply = await tokenAContract.totalSupply()
            tokenASupply = tokenASupply.toString()
            let tokenBSupply = await tokenBContract.totalSupply()
            tokenBSupply = tokenBSupply.toString()
            resolve({
                success: true,
                data: {
                    total: totalPooledTokens,
                    totalSupply: totalSupply,
                    A: tokenAShare,
                    B: tokenBShare,
                    supplyA: tokenASupply,
                    supplyB: tokenBSupply
                }
            })
        } catch(err) {
            console.log(err)
            reject({
                error: true,
                message: err.message,
            })
        }
    })
}

export const approveToken = (contractAddress, signer, amount) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(contractAddress, TOKEN_ABI, signer)
            const result = await contract.approve(ROUTER_ADDRESS, ethers.utils.parseUnits(amount, 18))
            resolve({
                success: true,
                data: result
            })
        } catch(err) {
            reject({
                error: true,
                message: err.message
            })
        }
    })
}

export const addLiquidity = ({walletAddress, addressA, addressB, amountA, amountB, deadline, signer}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer)
            const result = await contract.addLiquidity(
                addressA, // Token A Address
                addressB, // Token B Address
                ethers.utils.parseUnits(amountA, 18), // Token A Amount
                ethers.utils.parseUnits(amountB, 18), // Token B Amount
                ethers.utils.parseUnits("0", 18), // Token A Minimum Amount
                ethers.utils.parseUnits("0", 18), // Token B Minimum Amount
                walletAddress, // To address
                deadline // Transaction deadline
            )
            resolve({
                success: true,
                data: result
            })
        } catch (err) {
            console.log(err)
            reject({
                error: true,
                message: err.message
            })
        }
    })
}

export const removeLiquidity = ({liquidity, walletAddress, addressA, addressB, deadline, signer}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer)
            const result = await contract.removeLiquidity(
                addressA, // Token A Address
                addressB, // Token B Address
                ethers.utils.parseUnits(liquidity, 18), // Liquidity
                ethers.utils.parseUnits("0", 18), // Token A Minimum Amount
                ethers.utils.parseUnits("0", 18), // Token B Minimum Amount
                walletAddress, // To address
                deadline // Transaction deadline
            )
            resolve({
                success: true,
                data: result
            })
        } catch (err) {
            console.log(err)
            reject({
                error: true,
                message: err.message
            })
        }
    })
}

export const estimateInAmounts = ({ amount, addresses, token }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, PROVIDER)
            const result = await contract.getAmountsIn(
                ethers.utils.parseUnits(amount, 18),
                addresses
            )
            resolve({
                success: true,
                amount: ethers.utils.formatUnits(result[0], 18),
            })
        } catch (err) {
            reject({
                error: true,
                token: token,
                message: err.message
            })
        }
    })
}

export const estimateOutAmounts = ({ amount, addresses, token }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, PROVIDER)
            const result = await contract.getAmountsOut(
                ethers.utils.parseUnits(amount, 18),
                addresses
            )
            resolve({
                success: true,
                amount: ethers.utils.formatUnits(result[1], 18),
            })
        } catch (err) {
            reject({
                error: true,
                token: token,
                message: err.message
            })
        }
    })
}

export const estimateSwapAmount = ({amount, balanceA, balanceB}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, PROVIDER)
            const result = await contract.getAmountOut(
                ethers.utils.parseUnits(amount, 18),
                ethers.utils.parseUnits(balanceA, 18),
                ethers.utils.parseUnits(balanceB, 18),
            )
            resolve({
                success: true,
                amount: ethers.utils.formatUnits(result, 18)
            })
        } catch (err) {
            reject({
                error: true,
                message: err.message
            })
        }
    })
}

export const swapTokens = ({amountIn, amountOut, tokenAddresses, walletAddress, deadline, signer}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer)
            const result = await contract.swapExactTokensForTokens(
                ethers.utils.parseUnits(amountIn, 18),
                ethers.utils.parseUnits(amountOut, 18),
                tokenAddresses,
                walletAddress,
                deadline
            )
            resolve({
                success: true,
                data: result
            })
        } catch (err) {
            console.log(err)
            reject({
                error: true,
                message: err.message
            })
        }
    })
}

export const storePoolData = (pools) => {
    const encryptedObject = CryptoJS.AES.encrypt(JSON.stringify(pools), 'DvqPNNRhQZq').toString()
    localStorage.setItem('LP', encryptedObject)
}

export const fetchPoolData = () => {
    const pools = localStorage.getItem('LP')
    if (pools) {
        try {
            const bytes = CryptoJS.AES.decrypt(pools, 'DvqPNNRhQZq')
            const decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            return decryptedObject || null
        } catch(err) {
            return null
        }
    }
    return null
}

export const storeImportedTokens = (token) => {
    const encryptedObject = CryptoJS.AES.encrypt(JSON.stringify(token), 'DvqPNNRhQZq').toString()
    localStorage.setItem('IT', encryptedObject)
}

export const fetchImportedTokens = () => {
    const tokens = localStorage.getItem('IT')
    if (tokens) {
        try {
            const bytes = CryptoJS.AES.decrypt(tokens, 'DvqPNNRhQZq')
            const decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
            return decryptedObject || null
        } catch(err) {
            return null
        }
    }
    return null
}

export const searchToken = (address) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(address, TOKEN_ABI, PROVIDER)
            const symbol = await contract.symbol()
            const name = await contract.name()
            const totalSupply = await contract.totalSupply()
            resolve({
                success: true,
                data: {
                    name: name,
                    symbol: symbol,
                    contractAddress: address,
                    icon: `https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/${address}/logo.png?raw=true`,
                    totalSupply: totalSupply.toString(),
                    contractABI: TOKEN_ABI,
                }
            })
        } catch (err) {
            reject({
                error: true,
                message: err.message
            })
        }
    })
}

export const getPoolName = (address) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contract = new ethers.Contract(address, TOKEN_ABI, PROVIDER)
            const symbol = await contract.symbol()
            const name = await contract.name()
            resolve({
                success: true,
                data: {
                    name: name,
                    symbol: symbol
                }
            })
        } catch (err) {
            reject({
                error: true,
                message: err.message
            })
        }
    })
}

export const storeValue = (key, value) => {
    const encryptedValue = CryptoJS.AES.encrypt(value, 'DvqPNNRhQZq').toString()
    localStorage.setItem(key, encryptedValue)
}

export const getValue = (key) => {
    const value = localStorage.getItem(key)
    if(value) {
        const decryptedByteArray = CryptoJS.AES.decrypt(value, 'DvqPNNRhQZq')
        const decryptedValue = decryptedByteArray.toString(CryptoJS.enc.Utf8)
        return decryptedValue
    }
    return false
}