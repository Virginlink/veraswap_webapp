import { ethers } from "ethers";
import CryptoJS from "crypto-js";
import {
	FACTORY_ABI,
	FACTORY_ADDRESS,
	ROUTER_ABI,
	ROUTER_ADDRESS,
	TOKEN_ABI,
	PROVIDER,
	ERC20_ABI,
	KOVAN_PROVIDER,
} from "./contracts";

// const ABI = process.env.NODE_ENV === 'development' ? DONUT_ABI : TOKEN_ABI

export const MULTIPATH_TOKENS = [
	{
		name: "WBNB",
		address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
	},
	{
		name: "USDT",
		address: "0x55d398326f99059fF775485246999027B3197955",
	},
	{
		name: "BUSD",
		address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
	},
];

const ABI = TOKEN_ABI;

const factoryContract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, PROVIDER);

export const getTokenBalance = (walletAddress, contractAddress, contractABI, decimals) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(contractAddress, contractABI, PROVIDER);
			let balance = await contract.balanceOf(walletAddress);
			balance = ethers.utils.formatUnits(balance, decimals);
			resolve({
				success: true,
				balance: balance,
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const getBNBBalance = (walletAddress) => {
	return new Promise(async (resolve, reject) => {
		try {
			let balance = await PROVIDER.getBalance(walletAddress);
			balance = ethers.utils.formatUnits(balance, 18);
			resolve({
				success: true,
				balance: balance,
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const getTokenSupply = (contractAddress) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(contractAddress, ABI, PROVIDER);
			let totalSupply = await contract.totalSupply();
			totalSupply = ethers.utils.formatUnits(totalSupply, 18);
			resolve({
				success: true,
				supply: totalSupply,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const getTokenApproval = (walletAddress, contractAddress, decimals) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(contractAddress, ABI, PROVIDER);
			let allowance = await contract.allowance(walletAddress, ROUTER_ADDRESS);
			allowance = ethers.utils.formatUnits(allowance, decimals);
			resolve(allowance);
		} catch (err) {
			// console.log(err);
			reject(0);
		}
	});
};

export const getAllPairsLength = () => {
	return new Promise(async (resolve, reject) => {
		try {
			let pairsLength = await factoryContract.allPairsLength();
			pairsLength = pairsLength.toNumber();
			resolve({
				success: true,
				length: pairsLength,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const getPairAddress = (index) => {
	return new Promise(async (resolve, reject) => {
		try {
			const pairAddress = await factoryContract.allPairs(index);
			resolve({
				success: true,
				address: pairAddress,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const getLPAddress = (addressA, addressB) => {
	return new Promise(async (resolve, reject) => {
		try {
			const address = await factoryContract.getPair(addressA, addressB);
			resolve(address);
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const getLPInfo = (pairAddress, walletAddress, tokenAAddress, tokenBAddress) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(pairAddress, ABI, PROVIDER);
			const contractDecimals = await contract.decimals();
			const tokenAContract = new ethers.Contract(tokenAAddress, ABI, PROVIDER);
			const tokenAContractDecimals = await tokenAContract.decimals();
			const tokenBContract = new ethers.Contract(tokenBAddress, ABI, PROVIDER);
			const tokenBContractDecimals = await tokenBContract.decimals();
			let totalSupply = await contract.totalSupply();
			totalSupply = ethers.utils.formatUnits(totalSupply, contractDecimals);
			let totalPooledTokens = await contract.balanceOf(walletAddress);
			totalPooledTokens = ethers.utils.formatUnits(totalPooledTokens, contractDecimals);
			let tokenAShare = await tokenAContract.balanceOf(pairAddress);
			tokenAShare = ethers.utils.formatUnits(tokenAShare, tokenAContractDecimals);
			let tokenBShare = await tokenBContract.balanceOf(pairAddress);
			tokenBShare = ethers.utils.formatUnits(tokenBShare, tokenBContractDecimals);
			let tokenASupply = await tokenAContract.totalSupply();
			tokenASupply = tokenASupply.toString();
			let tokenBSupply = await tokenBContract.totalSupply();
			tokenBSupply = tokenBSupply.toString();
			resolve({
				success: true,
				data: {
					hasLiquidity: parseFloat(tokenAShare) > 0 && parseFloat(tokenBShare) > 0,
					total: totalPooledTokens,
					totalSupply: totalSupply,
					A: tokenAShare,
					B: tokenBShare,
					supplyA: tokenASupply,
					supplyB: tokenBSupply,
				},
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const approveToken = (contractAddress, signer, amount, decimals) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(contractAddress, ABI, signer);
			const result = await contract.approve(
				ROUTER_ADDRESS,
				ethers.utils.parseUnits(amount.toString(), decimals)
			);
			resolve({
				success: true,
				data: result,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const addLiquidity = ({
	walletAddress,
	addressA,
	addressB,
	amountA,
	amountB,
	deadline,
	signer,
	decimalsA,
	decimalsB,
}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
			const result = await contract.addLiquidity(
				addressA, // Token A Address
				addressB, // Token B Address
				ethers.utils.parseUnits(amountA.toString(), decimalsA), // Token A Amount
				ethers.utils.parseUnits(amountB.toString(), decimalsB), // Token B Amount
				ethers.utils.parseUnits("0", decimalsA), // Token A Minimum Amount
				ethers.utils.parseUnits("0", decimalsB), // Token B Minimum Amount
				walletAddress, // To address
				deadline // Transaction deadline
			);
			resolve({
				success: true,
				data: result,
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const addLiquidityWithBNB = ({
	walletAddress,
	address,
	amount,
	amountMin,
	BNBAmount,
	BNBAmountMin,
	deadline,
	signer,
	decimals,
	decimalsBNB,
}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
			const result = await contract.addLiquidityETH(
				address, // Token Address
				ethers.utils.parseUnits(amount.toString(), decimals), // Token Amount
				ethers.utils.parseUnits(amountMin.toString(), decimals), // Token Amount Minimum
				ethers.utils.parseUnits(BNBAmountMin.toString(), decimalsBNB), // BNB Amount Minimum
				walletAddress, // To address
				deadline, // Transaction deadline
				{
					value: ethers.utils.parseUnits(BNBAmount.toString(), 18),
				}
			);
			resolve({
				success: true,
				data: result,
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const removeLiquidity = ({
	liquidity,
	walletAddress,
	addressA,
	addressB,
	deadline,
	signer,
	decimalsA,
	decimalsB,
}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
			const result = await contract.removeLiquidity(
				addressA, // Token A Address
				addressB, // Token B Address
				ethers.utils.parseUnits(liquidity.toString(), 18), // Liquidity
				ethers.utils.parseUnits("0", decimalsA), // Token A Minimum Amount
				ethers.utils.parseUnits("0", decimalsB), // Token B Minimum Amount
				walletAddress, // To address
				deadline // Transaction deadline
			);
			resolve({
				success: true,
				data: result,
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const removeLiquidityWithBNB = ({
	liquidity,
	walletAddress,
	address,
	deadline,
	signer,
	decimals,
	decimalsBNB,
}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
			const result = await contract.removeLiquidityETH(
				address, // Token A Address
				ethers.utils.parseUnits(liquidity.toString(), 18), // Liquidity
				ethers.utils.parseUnits("0", decimals), // Token Minimum Amount
				ethers.utils.parseUnits("0", decimalsBNB), // BNB Minimum Amount
				walletAddress, // To address
				deadline // Transaction deadline
			);
			resolve({
				success: true,
				data: result,
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const estimateInAmounts = ({ amount, addresses, token, decimals }) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, PROVIDER);
			const result = await contract.getAmountsIn(
				ethers.utils.parseUnits(amount, decimals),
				addresses
			);
			resolve({
				success: true,
				amount: ethers.utils.formatUnits(result[0], 18),
			});
		} catch (err) {
			reject({
				error: true,
				token: token,
				message: err.message,
			});
		}
	});
};

export const estimateOutAmounts = ({ amount, addresses, token, decimals }) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, PROVIDER);
			const result = await contract.getAmountsOut(
				ethers.utils.parseUnits(amount, decimals),
				addresses
			);
			resolve({
				success: true,
				amount: ethers.utils.formatUnits(result[result.length - 1], 18),
			});
		} catch (err) {
			reject({
				error: true,
				token: token,
				message: err.message,
			});
		}
	});
};

export const estimateSwapAmount = ({ amount, balanceA, balanceB }) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, PROVIDER);
			const result = await contract.getAmountOut(
				ethers.utils.parseUnits(amount, 18),
				ethers.utils.parseUnits(balanceA, 18),
				ethers.utils.parseUnits(balanceB, 18)
			);
			resolve({
				success: true,
				amount: ethers.utils.formatUnits(result, 18),
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const swapTokens = ({
	amountIn,
	amountOut,
	tokenAddresses,
	walletAddress,
	deadline,
	signer,
	amountInDecimals,
	amountOutDecimals,
}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
			const result = await contract.swapExactTokensForTokens(
				ethers.utils.parseUnits(amountIn.toString(), amountInDecimals),
				ethers.utils.parseUnits(amountOut.toString(), amountOutDecimals),
				tokenAddresses,
				walletAddress,
				deadline
			);
			resolve({
				success: true,
				data: result,
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const swapBNBForTokens = ({
	amountIn,
	amountOutMin,
	tokenAddresses,
	walletAddress,
	deadline,
	signer,
	decimalsBNB,
	decimals,
}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
			const result = await contract.swapExactETHForTokens(
				ethers.utils.parseUnits(amountOutMin.toString(), decimals), // Token Amount Minimum
				tokenAddresses, // Path
				walletAddress,
				deadline,
				{
					value: ethers.utils.parseUnits(amountIn.toString(), decimalsBNB), // BNB Amount
				}
			);
			resolve({
				success: true,
				data: result,
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const swapTokensForBNB = ({
	amountIn,
	amountOutMin,
	tokenAddresses,
	walletAddress,
	deadline,
	signer,
	decimalsBNB,
	decimals,
}) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
			const result = await contract.swapExactTokensForETH(
				ethers.utils.parseUnits(amountIn.toString(), decimals), // Token Amount
				ethers.utils.parseUnits(amountOutMin.toString(), decimalsBNB), // BNB Amount Minimum
				tokenAddresses, // Path
				walletAddress,
				deadline
			);
			resolve({
				success: true,
				data: result,
			});
		} catch (err) {
			// console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const storePoolData = (pools) => {
	const encryptedObject = CryptoJS.AES.encrypt(JSON.stringify(pools), "DvqPNNRhQZq").toString();
	localStorage.setItem("LP", encryptedObject);
};

export const fetchPoolData = () => {
	const pools = localStorage.getItem("LP");
	if (pools) {
		try {
			const bytes = CryptoJS.AES.decrypt(pools, "DvqPNNRhQZq");
			const decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			return decryptedObject || null;
		} catch (err) {
			return null;
		}
	}
	return null;
};

export const storeImportedTokens = (token) => {
	const encryptedObject = CryptoJS.AES.encrypt(JSON.stringify(token), "DvqPNNRhQZq").toString();
	localStorage.setItem("IT", encryptedObject);
};

export const fetchImportedTokens = () => {
	const tokens = localStorage.getItem("IT");
	if (tokens) {
		try {
			const bytes = CryptoJS.AES.decrypt(tokens, "DvqPNNRhQZq");
			const decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			return decryptedObject || null;
		} catch (err) {
			return null;
		}
	}
	return null;
};

export const searchToken = (address) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkSummedAddress = ethers.utils.getAddress(address);
			const contract = new ethers.Contract(address, ABI, PROVIDER);
			const symbol = await contract.symbol();
			const name = await contract.name();
			const decimals = await contract.decimals();
			resolve({
				success: true,
				data: {
					name: name,
					symbol: symbol,
					contractAddress: address,
					icon: `https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/${checkSummedAddress}/logo.png?raw=true`,
					decimals: decimals,
					contractABI: ABI,
				},
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const searchEthereumToken = (address) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkSummedAddress = ethers.utils.getAddress(address);
			const contract = new ethers.Contract(address, ERC20_ABI, KOVAN_PROVIDER);
			const symbol = await contract.symbol();
			const name = await contract.name();
			const decimals = await contract.decimals();
			resolve({
				success: true,
				data: {
					name: name,
					symbol: symbol,
					contractAddress: address,
					icon: `https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/${checkSummedAddress}/logo.png?raw=true`,
					decimals: decimals,
					contractABI: ABI,
				},
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const getPoolName = (address) => {
	return new Promise(async (resolve, reject) => {
		try {
			const contract = new ethers.Contract(address, ABI, PROVIDER);
			const symbol = await contract.symbol();
			const name = await contract.name();
			resolve({
				success: true,
				data: {
					name: name,
					symbol: symbol,
				},
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const checkIntermediaryLiquidity = (
	name,
	intermediaryTokenAddress,
	tokens,
	walletAddress
) => {
	return new Promise(async (resolve) => {
		try {
			const { A, B } = tokens;
			// console.log(`Trying ${A.name} > ${name} > ${B.name}`);
			const tokenAwithBNBAddress = await getLPAddress(A.address, intermediaryTokenAddress);
			if (tokenAwithBNBAddress !== "0x0000000000000000000000000000000000000000") {
				// console.log(`${A.name}/${name} address - ${tokenAwithBNBAddress}`);
				const resultA = await getLPInfo(
					tokenAwithBNBAddress,
					walletAddress,
					A.address,
					intermediaryTokenAddress
				);
				if (resultA.data.hasLiquidity) {
					const tokenBwithBNBAddress = await getLPAddress(intermediaryTokenAddress, B.address);
					if (tokenBwithBNBAddress !== "0x0000000000000000000000000000000000000000") {
						// console.log(`${name}/${B.name} address - ${tokenBwithBNBAddress}`);
						const resultB = await getLPInfo(
							tokenBwithBNBAddress,
							walletAddress,
							intermediaryTokenAddress,
							B.address
						);
						if (resultB.data.hasLiquidity) {
							resolve({
								error: false,
								data: {
									liquidityInfo: resultB.data,
									tokenASupply: resultA.data.A,
									tokenBSupply: resultB.data.B,
								},
							});
						} else {
							resolve({
								error: true,
								data: null,
							});
						}
					} else {
						// console.log(
						// 	`${name}/${B.name} pair not found, abandoning route ${A.name} > ${name} > ${B.name}`
						// );
						resolve({
							error: true,
							data: null,
						});
					}
				} else {
					resolve({
						error: true,
						data: null,
					});
				}
			} else {
				// console.log(
				// 	`${A.name}/${name} pair not found, abandoning route ${A.name} > ${name} > ${B.name}`
				// );
				resolve({
					error: true,
					data: null,
				});
			}
		} catch (err) {
			resolve({
				error: true,
				data: null,
			});
		}
	});
};

export const getVRAPPrice = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await fetch(
				"https://api.coingecko.com/api/v3/simple/price?ids=veraswap&vs_currencies=usd"
			);
			let responseJson = await result.json();
			resolve({
				error: false,
				price: responseJson.veraswap.usd,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
};

export const storeValue = (key, value) => {
	const encryptedValue = CryptoJS.AES.encrypt(value, "DvqPNNRhQZq").toString();
	localStorage.setItem(key, encryptedValue);
};

export const getValue = (key) => {
	const value = localStorage.getItem(key);
	if (value) {
		const decryptedByteArray = CryptoJS.AES.decrypt(value, "DvqPNNRhQZq");
		const decryptedValue = decryptedByteArray.toString(CryptoJS.enc.Utf8);
		return decryptedValue;
	}
	return false;
};
