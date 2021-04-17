import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router'
import Pool from '../components/exchange/Pool'
import Navbar from '../components/Navbar'
import { getLPAddress, getLPInfo, getTokenApproval, getTokenBalance, approveToken, addLiquidity, fetchPoolData, storePoolData, fetchImportedTokens, getBNBBalance, addLiquidityWithBNB } from '../utils/helpers'
import { TOKENS } from '../utils/appTokens'
import { CircularProgress, Dialog } from '@material-ui/core'
import { notification } from 'antd'
import { RiCloseFill } from 'react-icons/ri'
import { GrPowerCycle } from 'react-icons/gr'
import { PROVIDER } from '../utils/contracts'
import AppContext from '../state/AppContext'

class Liquidity extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props)
        this.state = {
            pools: [],
            liquiditySectionVisible: true,
			tokenA: TOKENS[0].symbol,
			tokenAIcon: TOKENS[0].icon,
			tokenADecimals: TOKENS[0].decimals,
			tokenAAddress: TOKENS[0].contractAddress,
			tokenABalance: '',
			tokenAAmount: '',
			tokenAAllowance: '',
			tokenAApproved: false,
			approvingTokenA: false,
			tokenASupply: '',
			tokenB: '',
			tokenBIcon: '',
			tokenBDecimals: '',
			tokenBAddress: '',
			tokenBBalance: '',
			tokenBAmount: '',
			tokenBAllowance: '',
			tokenBApproved: false,
			approvingTokenB: false,
			tokenBSupply: '',
			lpAddress: '',
			liquidityInfo: null,
			supplying: false,
			loading: false,
			approvalModalVisible: false,
			approvalToken: '',
			approvalAmount: '',
			approving: false,
			inverted: false,
			createLiquidityModalVisible: false
        }
    }

	componentDidMount() {
		const { walletAddress } = this.props
		if (walletAddress) {
			const importedTokens = fetchImportedTokens()
			let allTokens = [...TOKENS]
			if (importedTokens) {
				allTokens = [...TOKENS, ...importedTokens.data]
			}
            const selectedToken = allTokens.filter((token) => token.symbol === this.state.tokenA)
			if (selectedToken[0].symbol === 'BNB') {
				this.fetchBNBBalance('A')
			} else {
				this.fetchBalance(walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, selectedToken[0].decimals, 'A')
				this.fetchApproval(walletAddress, selectedToken[0].contractAddress, selectedToken[0].decimals, 'A')
			}
			const pools = fetchPoolData()
			if (pools) {
				this.setState({pools: pools.data})
			}
		}
	}

	componentDidUpdate(prevProps) {
		const { walletAddress } = this.props
		const { tokenA, tokenB } = this.state
		if ((walletAddress !== prevProps.walletAddress) && walletAddress) {
			const pools = fetchPoolData()
			if (pools) {
				this.setState({pools: pools.data})
			}
			const importedTokens = fetchImportedTokens()
			let allTokens = [...TOKENS]
			if (importedTokens) {
				allTokens = [...TOKENS, ...importedTokens.data]
			}
			const selectedToken = allTokens.filter((token) => token.symbol === tokenA)
			if (selectedToken[0].symbol === 'BNB') {
				this.fetchBNBBalance('A')
			} else {
				this.fetchBalance(walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, selectedToken[0].decimals, 'A')
				this.fetchApproval(walletAddress, selectedToken[0].contractAddress, selectedToken[0].decimals, 'A')
			}
			if (tokenB) {
				const selectedToken = allTokens.filter((token) => token.symbol === tokenB)
				if (selectedToken[0].symbol === 'BNB') {
					this.fetchBNBBalance('B')
				} else {
					this.fetchBalance(walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, selectedToken[0].decimals, 'B')
					this.fetchApproval(walletAddress, selectedToken[0].contractAddress, selectedToken[0].decimals, 'B')
				}
			}
			if (tokenA && tokenB) {
				this.fetchLiquidity()
			}
		} else if ((walletAddress !== prevProps.walletAddress) && !walletAddress) {
			this.setState({
				tokenAAmount: '',
				tokenABalance: '',
				tokenAAllowance: '',
				tokenBAmount: '',
				tokenBBalance: '',
				tokenBAllowance: '',
				liquidityInfo: null,
				lpAddress: '',
				tokenASupply: '',
				tokenBSupply: '',
				inverted: false,
			})
		}
	}

	updateDeadline = () => {
		// const { deadline } = this.context;
		// this.setState({
		// 	deadline: moment().add(deadline, 'm').format('X'),
		// })
	}

    toggleLiquiditySectionVisibility = () => {
        this.setState(state => {
            return {
                liquiditySectionVisible: !state.liquiditySectionVisible,
            }
        })
    }

	fetchBalance = (walletAddress, contractAddress, contractABI, decimals, token) => {
		getTokenBalance(walletAddress, contractAddress, contractABI, decimals)
            .then((res) => {
                if (res.success) {
                    this.setState({
                        [token === 'A' ? 'tokenABalance' : 'tokenBBalance']: res.balance
                    })
                }
            })
            .catch((err) => {
                console.log('Unable to fetch balance', err.message)
            })
	}
	
	fetchBNBBalance = async (token) => {
		getBNBBalance(this.props.walletAddress)
			.then((res) => {
				if (res.success) {
                    this.setState({
                        [token === 'A' ? 'tokenABalance' : 'tokenBBalance']: res.balance
                    })
                }
			})
			.catch((err) => {
                console.log('Unable to fetch balance', err.message)
            })
	}

	fetchApproval = (walletAddress, contractAddress, decimals, token) => {
		getTokenApproval(walletAddress, contractAddress, decimals)
			.then((allowance) => {
				if (parseFloat(allowance) > 0) {
					this.setState({
						[token === 'A' ? 'tokenAApproved' : 'tokenBApproved']: true,
						[token === 'A' ? 'tokenAAllowance' : 'tokenBAllowance']: allowance,
					})
				} else {
					this.setState({
						[token === 'A' ? 'tokenAAllowance' : 'tokenBAllowance']: allowance,
					})
				}
			})
	}

    fetchLiquidity = (createPool = false, hash) => {
		const { tokenA, tokenB, tokenAIcon, tokenBIcon, tokenAAddress, tokenBAddress, tokenADecimals, tokenBDecimals } = this.state
        if (tokenAAddress && tokenBAddress) {
			try {
				this.setState({loading: true}, async () => {
					const lpAddress = await getLPAddress(tokenAAddress, tokenBAddress)
					if (lpAddress === "0x0000000000000000000000000000000000000000") {
						this.setState({loading: false, lpAddress: '', liquidityInfo: null})
					} else {
						const liquidityInfo = await getLPInfo(lpAddress, this.props.walletAddress, tokenAAddress, tokenBAddress)
						this.setState({
							lpAddress: lpAddress,
							liquidityInfo: liquidityInfo.data,
							tokenASupply: liquidityInfo.data.A,
							tokenBSupply: liquidityInfo.data.B,
							loading: false,
						}, () => {
							if (parseFloat(liquidityInfo.data.total) > 0) {
								const tokenAPrice = parseFloat(this.state.tokenBSupply)/parseFloat(this.state.tokenASupply)
								const tokenBPrice = parseFloat(this.state.tokenASupply)/parseFloat(this.state.tokenBSupply)
								if (this.state.tokenAAmount) {
									const amount = parseFloat(this.state.tokenAAmount) * tokenAPrice
									this.setState({tokenBAmount: amount.toFixed(6)})
								} else if (this.state.tokenBAmount) {
									const amount = parseFloat(this.state.tokenBAmount) * tokenBPrice
									this.setState({tokenAAmount: amount.toFixed(6)})
								}
								if (createPool) {
									const createdPool = {
										tokenA: tokenA,
										tokenAIcon: tokenAIcon,
										tokenADecimals: tokenADecimals,
										tokenAAddress: tokenAAddress,
										tokenB: tokenB,
										tokenBIcon: tokenBIcon,
										tokenBDecimals: tokenBDecimals,
										tokenBAddress: tokenBAddress,
										lpAddress: lpAddress,
									}
									this.storeNewPool(createdPool, hash)
								}
							}
						})
					}
				})
			} catch(err) {
				this.setState({loading: false, lpAddress: '', liquidityInfo: null}, () => {
					console.log(err.message)
				})
			}
		}
    }

	storeNewPool = (newPool, hash) => {
		// console.log('NEW POOL', newPool)
		let pools = fetchPoolData()
		if (pools) {
			const poolExists = pools.data.filter((pool) => (pool.tokenA === newPool.tokenA) && (pool.tokenB) === newPool.tokenB).length > 0
			if (!poolExists) {
				pools.data.push(newPool)
				storePoolData(pools)
				this.setState({pools: pools.data}, () => this.handleCreatePoolSuccess(hash))
			} else {
				this.handleCreatePoolSuccess(hash)
			}
		} else {
			const newPools = {
				data: [newPool]
			}
			storePoolData(newPools)
			this.setState({pools: newPools.data}, () => this.handleCreatePoolSuccess(hash))
		}
	}

	handleCreatePoolSuccess = (hash) => {
		const { walletAddress } = this.props;
		const { tokenAAddress, tokenBAddress } = this.state;
		notification.close('supplyProcessingNotification')
		const Link = () => (
			<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://${process.env.NODE_ENV === 'development' ? 'testnet.bscscan.com' : 'bscscan.com'}/tx/${hash}`} onClick={() => notification.close('supplySuccessNotification')}>View Transaction</a>
		)
		notification.success({
			key: 'supplySuccessNotification',
			message: 'Liquidity added successfully. You can view the transaction here.',
			btn: <Link />,
			duration: 0
		})
		this.setState({
			supplying: false,
			tokenAAmount: '',
			tokenBAmount: '',
		}, () => {
			const importedTokens = fetchImportedTokens()
			let allTokens = [...TOKENS]
			if (importedTokens) {
				allTokens = [...TOKENS, ...importedTokens.data]
			}
			const A = allTokens.filter((token) => token.symbol === this.state.tokenA)[0]
			const B = allTokens.filter((token) => token.symbol === this.state.tokenB)[0]
			if (A.symbol === 'BNB') {
				this.fetchBNBBalance('A')
			} else {
				this.fetchBalance(walletAddress, tokenAAddress, A.contractABI, A.decimals, 'A')
			}
			if (B.symbol === 'BNB') {
				this.fetchBNBBalance('B')
			} else {
				this.fetchBalance(walletAddress, tokenBAddress, B.contractABI, B.decimals, 'B')
			}
		})
	}

	updateTokenA = (token) => {
		const { walletAddress, walletConnected } = this.props;
		const { tokenB } = this.state;
		if (token.symbol !== tokenB) {
			this.setState({
				tokenA: token.symbol,
				tokenAIcon: token.icon,
				tokenADecimals: token.decimals,
				tokenAAddress: token.contractAddress,
			}, () => {
				if (walletConnected) {
					if (token.symbol === 'BNB') {
						this.fetchBNBBalance('A')
					} else {
						this.fetchBalance(walletAddress, token.contractAddress, token.contractABI, token.decimals, 'A')
						this.fetchApproval(walletAddress, token.contractAddress, token.decimals, 'A')
					}
					this.fetchLiquidity()
				}
			})
		} else {
			this.swapTokens()
		}
	}

	updateTokenB = (token) => {
		const { walletAddress, walletConnected } = this.props;
		const { tokenA } = this.state;
		if (token.symbol !== tokenA) {
			this.setState({
				tokenB: token.symbol,
				tokenBIcon: token.icon,
				tokenBDecimals: token.decimals,
				tokenBAddress: token.contractAddress,
			}, () => {
				if (walletConnected) {
					if (token.symbol === 'BNB') {
						this.fetchBNBBalance('B')
					} else {
						this.fetchBalance(walletAddress, token.contractAddress, token.contractABI, token.decimals, 'B')
						this.fetchApproval(walletAddress, token.contractAddress, token.decimals, 'B')
					}
					this.fetchLiquidity()
				}
			})
		} else {
			this.swapTokens()
		}
	}

	swapTokens = () => {
		const { tokenA, tokenAIcon, tokenABalance, tokenB, tokenBIcon, tokenBBalance, tokenAAmount, tokenBAmount, tokenAAddress, tokenBAddress, tokenADecimals, tokenBDecimals } = this.state;
		const { walletConnected } = this.props
		this.setState({
			tokenB: tokenA,
			tokenBIcon: tokenAIcon,
			tokenBDecimals: tokenADecimals,
			tokenBBalance: tokenABalance,
			tokenBAddress: tokenAAddress,
			tokenA: tokenB,
			tokenAIcon: tokenBIcon,
			tokenADecimals: tokenBDecimals,
			tokenABalance: tokenBBalance,
			tokenAAddress: tokenBAddress,
			tokenAAmount: tokenBAmount,
			tokenBAmount: tokenAAmount,
		}, () => {
			if (walletConnected) {
				this.fetchLiquidity()
			}
		})
	}

	updateAmount = (value, type) => {
		const { liquidityInfo } = this.state
		const { walletConnected } = this.props
        this.setState({
            [type === 'A' ? 'tokenAAmount' : 'tokenBAmount']: value,
        }, () => {
			if (walletConnected) {
				if (liquidityInfo) {
					if (parseFloat(liquidityInfo.total) > 0) {
						this.estimate(type)
					}
				}
			}
		})
	}

	estimate = (type) => {
		const { tokenASupply, tokenBSupply, tokenAAmount, tokenBAmount } = this.state
		const tokenAPrice = parseFloat(tokenBSupply)/parseFloat(tokenASupply)
		const tokenBPrice = parseFloat(tokenASupply)/parseFloat(tokenBSupply)
		if (type === 'A') {
			const amount = parseFloat(tokenAAmount) * tokenAPrice
			if (tokenAAmount) {
				this.setState({tokenBAmount: amount.toFixed(6)})
			} else {
				this.setState({tokenBAmount: ''})
			}
		} else if (type === 'B') {
			const amount = parseFloat(tokenBAmount) * tokenBPrice
			if (tokenBAmount) {
				this.setState({tokenAAmount: amount.toFixed(6)})
			} else {
				this.setState({tokenAAmount: ''})
			}
		}
	}

	handleMax = (token) => {
		const { tokenABalance, tokenBBalance } = this.state;
		this.setState({
			[token === 'A' ? 'tokenAAmount' : 'tokenBAmount']: token === 'A' ? tokenABalance : tokenBBalance
		})
	}

	approve = (token) => {
		const { tokenA, tokenB, tokenAAddress, tokenBAddress, approvalAmount, tokenADecimals, tokenBDecimals } = this.state;
		const { walletAddress, theme } = this.props
		this.setState({[token === 'A' ? 'approvingTokenA' : 'approvingTokenB']: true, approving: true}, () => {
			approveToken(
				token === 'A' ? tokenAAddress : tokenBAddress,
				this.props.signer,
				approvalAmount,
				token === 'A' ? tokenADecimals : tokenBDecimals,
			).then((res) => {
				if (res.success) {
					// console.log(res.data)
					if (res.data.hash) {
						const hashArrayString = localStorage.getItem('hashData');
						const tx = {
							hash: res.data.hash,
							amount: parseFloat(approvalAmount).toFixed(4),
							summary: `Approve ${parseFloat(approvalAmount).toFixed(4)} ${token === 'A' ? tokenA : tokenB}`
						}
						if (hashArrayString) {
							let hashArray = JSON.parse(hashArrayString)
							hashArray.data.push(tx)
							localStorage.setItem('hashData', JSON.stringify(hashArray))
						} else {
							const newHashArray = {
								data: [tx]
							}
							localStorage.setItem('hashData', JSON.stringify(newHashArray))
						}
						const Link = () => (
							<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://${process.env.NODE_ENV === 'development' ? 'testnet.bscscan.com' : 'bscscan.com'}/tx/${res.data.hash}`}>View Transaction</a>
						)
						notification.info({
							key: 'approvalProcessingNotification',
							message: 'Approval is being processed. You can view the transaction here.',
							btn: <Link />,
							icon: (
								<CircularProgress
									size={25}
									thickness={5}
									style={{
										color: theme === 'light' ? '#DE0102' : '#DEB501' ,
										position: 'relative',
										top: '6px'
									}}
								/>
							),
							duration: 0
						})
						try {
							let intervalId = setInterval(async () => {
								try {
									let reciept = await PROVIDER.getTransaction(res.data.hash)
									if(reciept) {
										if (token === 'A') {
											if (tokenA !== 'BNB') {
												this.fetchApproval(walletAddress, tokenAAddress, tokenADecimals, 'A')
											}
										} else {
											if (tokenB !== 'BNB') {
												this.fetchApproval(walletAddress, tokenBAddress, tokenBDecimals, 'B')
											}
										}
										notification.close('approvalProcessingNotification')
										const Link = () => (
											<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://${process.env.NODE_ENV === 'development' ? 'testnet.bscscan.com' : 'bscscan.com'}/tx/${res.data.hash}`} onClick={() => notification.close('approvalSuccessNotification')}>View Transaction</a>
										)
										notification.success({
											key: 'approvalSuccessNotification',
											message: 'Approval successful. You can view the transaction here.',
											btn: <Link />,
											duration: 0
										})
										this.setState({
											approving: false,
											[token === 'A' ? 'approvingTokenA' : 'approvingTokenB']: false,
											[token === 'A' ? 'tokenAApproved' : 'tokenBApproved']: true,
											approvalModalVisible: false,
											approvalAmount: ''
										})
										clearInterval(intervalId)
									}
								} catch(e) {
									console.log(e.message)
								}
							}, 5000)
						} catch(e) {
							this.setState({[token === 'A' ? 'approvingTokenA' : 'approvingTokenB']: false, approving: false})
							console.log(e)
						}
					}
				}
			}).catch((err) => {
				this.setState({[token === 'A' ? 'approvingTokenA' : 'approvingTokenB']: false}, () => {
					notification.error({
						message: `Couldn't Approve ${token === 'A' ? tokenA : tokenB}`,
						description: "Your transaction could not be processed. Please try again later.",
					})
				})
			})	
		})
	}

	supply = () => {
		const { liquidityInfo, tokenA, tokenB } = this.state
		if (!liquidityInfo) {
			this.setState({createLiquidityModalVisible: true})
			return
		} else if (!parseFloat(liquidityInfo.total) > 0) {
			this.setState({createLiquidityModalVisible: true})
			return
		}
		if (tokenA === 'BNB' || tokenB === 'BNB') {
			this.supplyWithBNB()
		} else {
			this.supplyPool()
		}
	}

	supplyPool = () => {
		const { tokenA, tokenB, tokenAIcon, tokenBIcon, tokenAAddress, tokenBAddress, tokenAAmount, tokenBAmount, lpAddress, tokenADecimals, tokenBDecimals } = this.state
		const { walletAddress, signer, theme } = this.props
		const deadline = moment().add(1, 'years').format('X')
		const data = {
			walletAddress: walletAddress,
			addressA: tokenAAddress,
			addressB: tokenBAddress,
			amountA: tokenAAmount,
			amountB: tokenBAmount,
			deadline: parseFloat(deadline),
			signer: signer,
			decimalsA: tokenADecimals,
			decimalsB: tokenBDecimals,
		}
		console.log('Normal liquidity data', data)
		this.setState({supplying: true, createLiquidityModalVisible: false}, () => {
			addLiquidity(data)
				.then((res) => {
					if (res.success) {
						if (res.data.hash) {
							const Link = () => (
								<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://${process.env.NODE_ENV === 'development' ? 'testnet.bscscan.com' : 'bscscan.com'}/tx/${res.data.hash}`}>View Transaction</a>
							)
							notification.info({
								key: 'supplyProcessingNotification',
								message: 'Transaction is being processed. You can view the transaction here.',
								btn: <Link />,
								icon: (
									<CircularProgress
										size={25}
										thickness={5}
										style={{
											color: theme === 'light' ? '#DE0102' : '#DEB501' ,
											position: 'relative',
											top: '6px'
										}}
									/>
								),
								duration: 0
							})
							try {
								let intervalId = setInterval(async () => {
									try {
										let reciept = await PROVIDER.getTransaction(res.data.hash)
										// console.log('RECEIPT', reciept)
										if(reciept) {
											if (lpAddress) {
												const createdPool = {
													tokenA: tokenA,
													tokenAIcon: tokenAIcon,
													tokenADecimals: tokenADecimals,
													tokenAAddress: tokenAAddress,
													tokenB: tokenB,
													tokenBIcon: tokenBIcon,
													tokenBDecimals: tokenBDecimals,
													tokenBAddress: tokenBAddress,
													lpAddress: lpAddress,
												}
												this.storeNewPool(createdPool, res.data.hash)
												this.fetchLiquidity()
											} else {
												this.fetchLiquidity(true, res.data.hash)
											}
											clearInterval(intervalId)
										}
									} catch(e) {
										console.log(e.message)
									}
								}, 5000)
							} catch(e) {
								this.setState({supplying: false})
								console.log(e.message)
							}
						}
					}
				})
				.catch((err) => {
					this.setState({supplying: false}, () => {
						notification.error({
							message: "Couldn't add liquidity",
							description: "Your transaction could not be processed. Please try again later."
						})
					})
				})
		})
	}

	supplyWithBNB = () => {
		const { tokenA, tokenB, tokenAIcon, tokenBIcon, tokenAAddress, tokenBAddress, tokenAAmount, tokenBAmount, lpAddress, tokenADecimals, tokenBDecimals, liquidityInfo } = this.state
		const { walletAddress, signer, theme } = this.props
		const deadline = moment().add(1, 'years').format('X')
		const amount = tokenA === 'BNB' ? tokenBAmount : tokenAAmount
		const BNBAmount = tokenA === 'BNB' ? tokenAAmount : tokenBAmount
		let amountMin, BNBAmountMin;
		if (liquidityInfo) {
			if (parseFloat(liquidityInfo.total) > 0) {
				amountMin = parseFloat(amount) - (parseFloat(amount) * (parseFloat(this.context.slippage)/100))
				BNBAmountMin = parseFloat(BNBAmount) - (parseFloat(BNBAmount) * (parseFloat(this.context.slippage)/100))
			} else {
				amountMin = amount
				BNBAmountMin = BNBAmount
			}
		} else {
			amountMin = amount
			BNBAmountMin = BNBAmount
		}
		const data = {
			walletAddress: walletAddress,
			address: tokenA === 'BNB' ? tokenBAddress : tokenAAddress,
			amount: amount,
			amountMin: amountMin.toString(),
			BNBAmount: BNBAmount,
			BNBAmountMin: BNBAmountMin.toString(),
			deadline: parseFloat(deadline),
			signer: signer,
			decimals: tokenA === 'BNB' ? tokenBDecimals : tokenADecimals,
			decimalsBNB: tokenA === 'BNB' ? tokenADecimals : tokenBDecimals,
		}
		this.setState({supplying: true, createLiquidityModalVisible: false}, () => {
			addLiquidityWithBNB(data)
				.then((res) => {
					if (res.success) {
						if (res.data.hash) {
							const Link = () => (
								<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://${process.env.NODE_ENV === 'development' ? 'testnet.bscscan.com' : 'bscscan.com'}/tx/${res.data.hash}`}>View Transaction</a>
							)
							notification.info({
								key: 'supplyProcessingNotification',
								message: 'Transaction is being processed. You can view the transaction here.',
								btn: <Link />,
								icon: (
									<CircularProgress
										size={25}
										thickness={5}
										style={{
											color: theme === 'light' ? '#DE0102' : '#DEB501' ,
											position: 'relative',
											top: '6px'
										}}
									/>
								),
								duration: 0
							})
							try {
								let intervalId = setInterval(async () => {
									try {
										let reciept = await PROVIDER.getTransaction(res.data.hash)
										// console.log('RECEIPT', reciept)
										if(reciept) {
											if (lpAddress) {
												const createdPool = {
													tokenA: tokenA,
													tokenAIcon: tokenAIcon,
													tokenADecimals: tokenADecimals,
													tokenAAddress: tokenAAddress,
													tokenB: tokenB,
													tokenBIcon: tokenBIcon,
													tokenBDecimals: tokenBDecimals,
													tokenBAddress: tokenBAddress,
													lpAddress: lpAddress,
												}
												this.storeNewPool(createdPool, res.data.hash)
												this.fetchLiquidity()
											} else {
												this.fetchLiquidity(true, res.data.hash)
											}
											clearInterval(intervalId)
										}
									} catch(e) {
										console.log(e.message)
									}
								}, 5000)
							} catch(e) {
								this.setState({supplying: false})
								console.log(e.message)
							}
						}
					}
				})
				.catch((err) => {
					this.setState({supplying: false}, () => {
						notification.error({
							message: "Couldn't add liquidity",
							description: "Your transaction could not be processed. Please try again later."
						})
					})
				})
		})
	}

	addLiquidity = (data) => {
		const { tokenA, tokenB } = data;
		const { walletAddress } = this.props;
		this.setState({
			tokenA: tokenA.symbol,
			tokenAIcon: tokenA.icon,
			tokenADecimals: tokenA.decimals,
			tokenAAddress: tokenA.address,
			tokenB: tokenB.symbol,
			tokenBIcon: tokenB.icon,
			tokenBDecimals: tokenB.decimals,
			tokenBAddress: tokenB.address,
			liquiditySectionVisible: false
		}, () => {
			const importedTokens = fetchImportedTokens()
			let allTokens = [...TOKENS]
			if (importedTokens) {
				allTokens = [...TOKENS, ...importedTokens.data]
			}
			const tokenA = allTokens.filter((token) => token.symbol === this.state.tokenA)[0]
			const tokenB = allTokens.filter((token) => token.symbol === this.state.tokenB)[0]
			if (tokenA.symbol === 'BNB') {
				this.fetchBNBBalance('A')
			} else {
				this.fetchBalance(walletAddress, tokenA.contractAddress, tokenA.contractABI, tokenA.decimals, 'A')
				this.fetchBalance(walletAddress, tokenB.contractAddress, tokenB.contractABI, tokenB.decimals, 'B')
			}
			if (tokenB.symbol === 'BNB') {
				this.fetchBNBBalance('B')
			} else {
				this.fetchApproval(walletAddress, tokenA.contractAddress, tokenA.decimals, 'A')
				this.fetchApproval(walletAddress, tokenB.contractAddress, tokenB.decimals, 'B')
			}
			this.fetchLiquidity()
		})
	}

	handleRefresh = (tokenSymbol, type) => {
		const importedTokens = fetchImportedTokens()
		let allTokens = [...TOKENS]
		if (importedTokens) {
			allTokens = [...TOKENS, ...importedTokens.data]
		}
		const selectedToken = allTokens.filter((token) => token.symbol === tokenSymbol)[0]
		if (selectedToken.symbol === 'BNB') {
			this.fetchBNBBalance(type)
		} else {
			this.fetchBalance(this.props.walletAddress, selectedToken.contractAddress, selectedToken.contractABI, selectedToken.decimals, type)
		}
	}

	handleModalToggle = () => {
        this.setState(state => {
            return {
                approvalModalVisible: !state.approvalModalVisible,
            }
        })
    }

	resetValues = () => {
		this.setState({
			approvalAmount: '',
			approving: false,
		})
	}

	toggleInversion = () => {
		this.setState(state => {
			return {
				inverted: !state.inverted
			}
		})
	}

	getPoolSharePercent = (userTokens, totalTokens) => parseFloat((parseFloat(userTokens) / parseFloat(totalTokens)) * 100).toFixed(2)

	handleCreateModalToggle = () => {
		this.setState(state => {
            return {
                createLiquidityModalVisible: !state.createLiquidityModalVisible,
            }
        })
	}

    render() {
        const { liquiditySectionVisible, tokenA, tokenABalance, tokenB, tokenBBalance, tokenAIcon, tokenBIcon, tokenAAmount, tokenBAmount, pools, approvingTokenA, approvingTokenB, supplying, tokenAAllowance, tokenBAllowance, loading, approvalModalVisible, approvalToken, approvalAmount, approving, liquidityInfo, inverted, tokenASupply, tokenBSupply, createLiquidityModalVisible, tokenADecimals, tokenBDecimals } = this.state
        const { onModalToggle, walletConnected, walletAddress, signer, history, modalVisible, theme, onThemeToggle, ethBalance, vrapBalance } = this.props
        return (
            <>
                <Navbar
                	active="pool"
					modalVisible={modalVisible}
					onModalToggle={onModalToggle}
					theme={theme}
					onThemeToggle={onThemeToggle}
                    walletAddress={walletAddress}
                    walletConnected={walletConnected}
                    ethBalance = {ethBalance}
					vrapBalance = {vrapBalance}
            	/>
                <div className="container">
					<div className="exchange-card">
						<span className="sale-rotation"></span>
                        <span className="noise"></span>
						<div style={{zIndex: 1, position: 'relative'}}>
							{liquiditySectionVisible && (
								<div className="tabs">
									<a href="/swap" onClick={(e) => {e.preventDefault(); history.push('/swap')}}>Swap</a>
									<a href="/pool" onClick={(e) => e.preventDefault()} className="tab-active">Pool</a>
								</div>
							)}
							<Pool
								fetchingLiquidity={loading}
								theme={theme}
								liquiditySectionVisible={liquiditySectionVisible}
								pools={pools}
								onSectionToggle={this.toggleLiquiditySectionVisibility}
								walletConnected={walletConnected}
								walletAddress={walletAddress}
								signer={signer}
								tokenA={tokenA}
								tokenAIcon={tokenAIcon}
								tokenADecimals={tokenADecimals}
								tokenABalance={tokenABalance}
								tokenB={tokenB}
								tokenBIcon={tokenBIcon}
								tokenBDecimals={tokenBDecimals}
								tokenBBalance={tokenBBalance}
								onTokenAUpdate={this.updateTokenA}
								onTokenBUpdate={this.updateTokenB}
								tokenAAmount={tokenAAmount}
								tokenBAmount={tokenBAmount}
								onAmountChange={this.updateAmount}
								onMax={this.handleMax}
								onAddLiquidity={this.addLiquidity}
								onRefresh={this.handleRefresh}
							/>
							{(walletConnected && !liquiditySectionVisible && (tokenA && tokenB) && !loading && liquidityInfo) && (
								parseFloat(liquidityInfo.total) > 0 ? (
									<>
										<div className="flex-spaced-container" style={{alignItems: 'center', marginTop: '1rem', color: '#FFF', fontSize: '13px', fontFamily: 'PT Sans Caption'}}>
											<div>Price</div>
											<div style={{textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
												{!inverted ? (
													<div>1 {tokenA} = {(parseFloat(tokenBSupply)/parseFloat(tokenASupply)).toFixed(6)} {tokenB}</div>
												) : (
													<div>1 {tokenB} = {(parseFloat(tokenASupply)/parseFloat(tokenBSupply)).toFixed(6)} {tokenA}</div>
												)}
												<button className="invert-button" onClick={this.toggleInversion}>
													<GrPowerCycle size={15} />
												</button>
											</div>
										</div>
										<div className="details-section">
											<div className="flex-spaced-container" style={{alignItems: 'flex-start', color: theme === 'light' ? '#000' : '#FFF', fontSize: '13px'}}>
												<div>Your total pooled tokens</div>
												<div style={{textAlign: 'right'}}>
													{parseFloat(liquidityInfo.total).toFixed(6)}
												</div>
											</div>
											<div className="flex-spaced-container" style={{alignItems: 'flex-start', color: theme === 'light' ? '#000' : '#FFF', fontSize: '13px'}}>
												<div>Your pool share</div>
												<div style={{textAlign: 'right'}}>
													{this.getPoolSharePercent(liquidityInfo.total, liquidityInfo.totalSupply)} %
												</div>
											</div>
										</div>
									</>
								) : null
							)}
							<span style={{display: 'none'}}>{this.state.lpAddress}</span>
							{liquiditySectionVisible ? (
								<div className="exchange-button-container">
									<p>Don't see a pool you joined? <a href="/find" onClick={(e) => {e.preventDefault(); history.push('/find')}}>Import it.</a></p>
								</div>
							) : (!walletConnected ? (
									<div className="exchange-button-container">
										<button onClick={onModalToggle}>Connect wallet</button>
									</div>
								) : ((!tokenA || !tokenB) ? (
										<div className="exchange-button-container">
											<button disabled>Invalid pair</button>
										</div>
									) : ((loading || (!tokenAAllowance && !tokenBAllowance)) ? (
											<div className="exchange-button-container">
												<button disabled><CircularProgress size={12} thickness={5} style={{color: '#FFF' }} /></button>
											</div>
										) : (!tokenAAmount || !tokenBAmount) ? (
											<div className="exchange-button-container">
												<button disabled>Enter an amount</button>
											</div>
										) : ((parseFloat(tokenAAmount) === 0 || parseFloat(tokenBAmount) === 0) ? (
												<div className="exchange-button-container">
													<button disabled>Enter an amount</button>
												</div>
											) : (((parseFloat(tokenAAmount) <= parseFloat(tokenABalance)) && ((parseFloat(tokenBAmount) <= parseFloat(tokenBBalance)))) ? (tokenA !== 'BNB' && tokenB !== 'BNB') ? 
												(
													((parseFloat(tokenAAmount) <= parseFloat(tokenAAllowance)) && (parseFloat(tokenBAmount) <= parseFloat(tokenBAllowance))) ? (
														<div className="exchange-button-container">
															<button onClick={this.supply} disabled={loading || supplying}>Supply {supplying && (
																<CircularProgress size={12} thickness={5} style={{color: '#FFF' , position: 'relative', top: '1px'}} />
															)}</button>
														</div>
													) : ((parseFloat(tokenAAmount) > parseFloat(tokenAAllowance)) ? (
															<div className="exchange-button-container">
																	<button disabled={approvingTokenA || approvingTokenB} style={{marginBottom: '0.25rem'}} onClick={() => {
																		this.setState({approvalToken: 'A', approvalAmount: tokenAAmount}, () => this.handleModalToggle())
																	}}>
																		Approve {tokenA} {approvingTokenA && (<CircularProgress size={12} thickness={5} style={{color: '#FFF' , position: 'relative', top: '1px'}} />)}
																	</button>
																<button disabled>Supply</button>
															</div>
														) : (parseFloat(tokenBAmount) > parseFloat(tokenBAllowance)) ? (
															<div className="exchange-button-container">
																<button disabled={approvingTokenB || approvingTokenA} style={{marginBottom: '0.25rem'}} onClick={() => {
																		this.setState({approvalToken: 'B', approvalAmount: tokenBAmount}, () => this.handleModalToggle())
																	}}>
																	Approve {tokenB} {approvingTokenB && (<CircularProgress size={12} thickness={5} style={{color: '#FFF' , position: 'relative', top: '1px'}} />)}
																</button>
																<button disabled>Supply</button>
															</div>
														) : (
															<div className="exchange-button-container">
																<button onClick={this.supply} disabled={loading || supplying}>Supply {supplying && (
																	<CircularProgress size={12} thickness={5} style={{color: '#FFF' , position: 'relative', top: '1px'}} />
																)}</button>
															</div>
														)	
													)
												) : (
													((tokenA === 'BNB' && parseFloat(tokenBAmount) <= parseFloat(tokenBAllowance)) || (tokenB === 'BNB' && parseFloat(tokenAAmount) <= parseFloat(tokenAAllowance))) ? (
														<div className="exchange-button-container">
															<button onClick={this.supply} disabled={loading || supplying}>Supply {supplying && (
																<CircularProgress size={12} thickness={5} style={{color: '#FFF' , position: 'relative', top: '1px'}} />
															)}</button>
														</div>
													) : (tokenA === 'BNB' ? (
															<div className="exchange-button-container">
																<button disabled={approvingTokenB || approvingTokenA} style={{marginBottom: '0.25rem'}} onClick={() => {
																	this.setState({approvalToken: 'B', approvalAmount: tokenBAmount}, () => this.handleModalToggle())
																}}>
																	Approve {tokenB} {approvingTokenB && (<CircularProgress size={12} thickness={5} style={{color: '#FFF' , position: 'relative', top: '1px'}} />)}
																</button>
																<button disabled>Supply</button>
															</div>
														) : (
															<div className="exchange-button-container">
																<button disabled={approvingTokenA || approvingTokenB} style={{marginBottom: '0.25rem'}} onClick={() => {
																	this.setState({approvalToken: 'A', approvalAmount: tokenAAmount}, () => this.handleModalToggle())
																}}>
																	Approve {tokenA} {approvingTokenA && (<CircularProgress size={12} thickness={5} style={{color: '#FFF' , position: 'relative', top: '1px'}} />)}
																</button>
																<button disabled>Supply</button>
															</div>
														)
													)
												) : (
													<div className="exchange-button-container">
														<button disabled>
															{(parseFloat(tokenAAmount) > parseFloat(tokenABalance)) ? `Insufficient ${tokenA} balance` : `Insufficient ${tokenB} balance`}
														</button>
													</div>
												)
											)
										)
									)
								)
							)}
						</div>
					</div>
				</div>
				<Dialog
					open={approvalModalVisible}
					onClose={() => {
						this.handleModalToggle();
						this.resetValues();
					}}
					onBackdropClick={() => {
						this.handleModalToggle();
						this.resetValues();
					}}
					BackdropProps={{
						style: {
							zIndex: 0
						}
					}}
                    className="app-modal"
				>
					<div className="modal-header flex-spaced-container" style={{color: theme === 'light' ? '#000' : '#FFF'}}>
                        <div>
                            Approve {approvalToken === 'A' ? tokenA : tokenB}
                        </div>
                        <button className="close-modal-button" onClick={() => {this.handleModalToggle(); this.resetValues()}}>
                            <RiCloseFill />
                        </button>
                    </div>
					<div className="modal-content">
						<div className="form-control">
							<div className="flex-spaced-container">
								<div />
								<div>balance: <span style={{fontFamily: 'PT Sans Caption'}}>{approvalToken === 'A' ? parseFloat(tokenABalance).toFixed(6) : parseFloat(tokenBBalance).toFixed(6)}</span> <span style={{textTransform: 'none'}}>{approvalToken === 'A' ? tokenA : tokenB}</span></div>
							</div>
							<div className="input-container without-max">
								<input
									style={{width: '100%', paddingRight: '1rem'}}
									placeholder="0.0"
									value={approvalAmount}
									onChange={(e) => {
										if (!approving) {
											if(e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
												this.setState({approvalAmount: e.target.value})
											}
										}
									}}
								/>
								<div>
									<button disabled={approvalToken === 'A' ? !tokenABalance : !tokenBBalance} className="max-button" onClick={() => this.setState({approvalAmount: approvalToken === 'A' ? tokenABalance : tokenBBalance})}>max</button>
									<button className="asset-select-button" style={{cursor: 'default'}}>
										<img src={approvalToken === 'A' ? tokenAIcon : tokenBIcon} alt="token-logo" />
										<span>{approvalToken === 'A' ? tokenA : tokenB}</span>
									</button>
								</div>
							</div>
						</div>
						<div className="staking-modal-footer">
							<button className="staking-modal-button" onClick={() => {this.handleModalToggle(); this.resetValues()}}>Cancel</button>
							<button
								className="staking-modal-button-primary"
								disabled={
									(parseFloat(approvalAmount) === 0 || !approvalAmount || approving) || (
										approvalToken === 'A' ? parseFloat(approvalAmount) > parseFloat(tokenABalance) : parseFloat(approvalAmount) > parseFloat(tokenBBalance)
									)
								}
								onClick={() => this.approve(approvalToken)}
							>
								{!approving ? (
									approvalAmount ? (
										parseFloat(approvalAmount) > 0 ? (
											approvalToken === 'A' ? (
												parseFloat(approvalAmount) <= parseFloat(tokenABalance) ? ( 
													'Approve' 
												) : `Insufficient balance`
											) : (
												parseFloat(approvalAmount) <= parseFloat(tokenBBalance) ? ( 
													'Approve' 
												) : `Insufficient balance`
											)
										) : 'Invalid Amount' 
									) : 'Enter Amount'
								) : 'Approving'}
							</button>
						</div>
					</div>
				</Dialog>
				<Dialog
					open={createLiquidityModalVisible}
					onClose={this.handleCreateModalToggle}
					onBackdropClick={this.handleCreateModalToggle}
					BackdropProps={{
						style: {
							zIndex: 0
						}
					}}
                    className="app-modal"
				>
					<div className="modal-header flex-spaced-container" style={{color: theme === 'light' ? '#000' : '#FFF'}}>
                        <div>
                            You are creating a pool
                        </div>
                        <button className="close-modal-button" onClick={this.handleCreateModalToggle}>
                            <RiCloseFill />
                        </button>
                    </div>
					<div className="modal-content">
						<div className="new-pool-details">
							<div className="new-pool-title">
								<h1>{tokenA}/{tokenB}</h1>
								<div className="new-pool-logos">
									<img src={tokenAIcon} alt="token-1-logo" />
									<img src={tokenBIcon} alt="token-2-logo" />
								</div>
							</div>
							<div className="details-grid">
								<div>
									<div>{tokenA} deposited</div>
									<div>{tokenAAmount}</div>
								</div>
								<div>
									<div>{tokenB} deposited</div>
									<div>{tokenBAmount}</div>
								</div>
								<div>
									<div>Rates</div>
									<div>
										1 {tokenA} = {(parseFloat(tokenBAmount)/parseFloat(tokenAAmount)).toFixed(4)} {tokenB}<br/>
										1 {tokenB} = {(parseFloat(tokenAAmount)/parseFloat(tokenBAmount)).toFixed(4)} {tokenA}
									</div>
								</div>
								<div>
									<div>Share of Pool</div>
									<div>100%</div>
								</div>
							</div>
						</div>
						<div className="staking-modal-footer">
							<button
								className="staking-modal-button-primary"
								onClick={() => {
									if(tokenA === 'BNB' || tokenB === 'BNB') {
										this.supplyWithBNB()
									} else {
										this.supplyPool()
									}
								}}
								style={{width: '100%'}}
							>
								Create Pool & Supply
							</button>
						</div>
					</div>
				</Dialog>
            </>
        )
    }
}

export default withRouter(Liquidity)