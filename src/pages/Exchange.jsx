import React, { Component } from 'react'
import Swap from '../components/exchange/Swap'
import { withRouter } from 'react-router'
import { TOKENS } from '../utils/appTokens'
import { approveToken, estimateInAmounts, estimateOutAmounts, fetchImportedTokens, getLPAddress, getLPInfo, getTokenApproval, getTokenBalance, swapTokens } from '../utils/helpers'
import { CircularProgress, Dialog } from '@material-ui/core'
import { notification, Tooltip } from 'antd'
import moment from 'moment'
import Navbar from '../components/Navbar'
import { ethers } from 'ethers'
import { RiCloseFill } from 'react-icons/ri'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { GrPowerCycle } from 'react-icons/gr'
import AppContext from '../state/AppContext'

const PROVIDER = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s1.binance.org:8545/')
var timerA = null
var timerB = null
class Exchange extends Component {
	static contextType = AppContext;

    constructor(props) {
        super(props)
        this.state = {
			loading: false,
            fetchingPools: false,
            pools: [],
            liquiditySectionVisible: true,
			tokenA: TOKENS[0].symbol,
			tokenAAddress: TOKENS[0].contractAddress,
			tokenAIcon: TOKENS[0].icon,
			tokenABalance: '',
			tokenAAmount: '',
			tokenAAllowance: '',
			tokenAApproved: false,
			approvingTokenA: false,
			tokenAPrice: '',
			tokenB: '',
			tokenBAddress: '',
			tokenBIcon: '',
			tokenBBalance: '',
			tokenBAmount: '',
			tokenBAllowance: '',
			tokenBApproved: false,
			approvingTokenB: false,
			tokenBPrice: '',
			liquidityInfo: null,
			tokenASupply: '',
			tokenBSupply: '',
			swapping: false,
			approvalModalVisible: false,
			approvalToken: '',
			approvalAmount: '',
			approving: false,
			fetchingLiquidity: false,
			fetchingPrices: false,
			impact: '',
			inverted: false,
			invalidPair: false,
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
			this.fetchBalance(walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, 'A')
			this.fetchApproval(walletAddress, selectedToken[0].contractAddress, 'A')
		}
	}

	componentDidUpdate(prevProps) {
		const { walletAddress } = this.props
		const { tokenA, tokenB } = this.state
		if ((walletAddress !== prevProps.walletAddress) && walletAddress) {
			const importedTokens = fetchImportedTokens()
			let allTokens = [...TOKENS]
			if (importedTokens) {
				allTokens = [...TOKENS, ...importedTokens.data]
			}
			const selectedToken = allTokens.filter((token) => token.symbol === this.state.tokenA)
			this.fetchBalance(walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, 'A')
			this.fetchApproval(walletAddress, selectedToken[0].contractAddress, 'A')
			if (tokenB) {
				const selectedToken = allTokens.filter((token) => token.symbol === tokenB)
				this.fetchBalance(walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, 'B')
				this.fetchApproval(walletAddress, selectedToken[0].contractAddress, 'B')
			}
			if (tokenA && tokenB) {
				this.fetchPrices()
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
				impact: '',
				invalidPair: false,
				tokenAPrice: '',
				tokenBPrice: '',
				tokenASupply: '',
				tokenBSupply: '',
				inverted: false,
			})
		}
	}

    toggleLiquiditySectionVisibility = () => {
        this.setState(state => {
            return {
                liquiditySectionVisible: !state.liquiditySectionVisible,
            }
        })
    }

	fetchBalance = (walletAddress, contractAddress, contractABI, token) => {
		getTokenBalance(walletAddress, contractAddress, contractABI)
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

	fetchApproval = (walletAddress, contractAddress, token) => {
		this.setState({loading: true}, () => {
			getTokenApproval(walletAddress, contractAddress)
				.then((allowance) => {
					this.setState({loading: false}, () => {
						// console.log(token, allowance)
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
				})
				.catch((_) => {
					this.setState({loading: false})
				})
		})
	}

	fetchLiquidity = async () => {
		const { tokenAAddress, tokenBAddress } = this.state
        if (tokenAAddress && tokenBAddress) {
			this.setState({fetchingLiquidity: true}, async () => {
					getLPAddress(tokenAAddress, tokenBAddress)
						.then((lpAddress) => {
							// console.log(lpAddress)
							if (lpAddress === "0x0000000000000000000000000000000000000000") {
								this.setState({
									fetchingLiquidity: false,
									liquidityInfo: null,
								})
							} else {
								getLPInfo(lpAddress, this.props.walletAddress, tokenAAddress, tokenBAddress)
									.then((liquidityInfo) => {
										this.setState({
											fetchingLiquidity: false,
											liquidityInfo: liquidityInfo.data,
											tokenASupply: liquidityInfo.data.A,
											tokenBSupply: liquidityInfo.data.B,
										})
									})
									.catch((err) => {
										this.setState({fetchingLiquidity: false, liquidityInfo: null}, () => {
											console.log(err.message)
										})
									})
							}
						})
						.catch((err) => {
							this.setState({fetchingLiquidity: false, liquidityInfo: null}, () => {
								console.log(err)
							})
						})
			})
		}
    }

	fetchPrices = () => {
		const { tokenAAddress, tokenBAddress, tokenA, tokenB } = this.state;
		if (tokenAAddress && tokenBAddress) {
			this.setState({fetchingPrices: true}, async () => {
				try {
					const estimateAData = {
						amount: "1",
						addresses: [tokenAAddress, tokenBAddress],
						token: tokenA
					}
					const estimateBData = {
						amount: "1",
						addresses: [tokenAAddress, tokenBAddress],
						token: tokenB
					}
					const tokenAPriceResult = await estimateOutAmounts(estimateAData)
					const tokenBPriceResult = await estimateInAmounts(estimateBData)
					this.setState({
						fetchingPrices: false,
						tokenAPrice: tokenAPriceResult.amount,
						tokenBPrice: tokenBPriceResult.amount,
						invalidPair: false,
					})
				} catch (err) {
					this.setState({fetchingPrices: false}, () => {
						if (err.message.includes("underflow")) {
							this.setState({
								invalidPair: true,
								tokenAAmount: '',
								tokenBAmount: '',
							})
						}
					})
				}
			})
		}
	}

	updateTokenA = (token) => {
		const { walletAddress, walletConnected } = this.props;
		const { tokenB, tokenAAmount } = this.state;
		if (token.symbol !== tokenB) {
			this.setState({
				tokenA: token.symbol,
				tokenAIcon: token.icon,
				tokenAAddress: token.contractAddress,
			}, () => {
				if (walletConnected) {
					this.fetchPrices()
					this.fetchLiquidity()
					this.fetchBalance(walletAddress, token.contractAddress, token.contractABI, 'A')
					this.fetchApproval(walletAddress, token.contractAddress, 'A')
					if (tokenAAmount) {
						this.estimate('A')
					}
				}
			})
		} else {
			this.swapTokensInternal()
		}
	}

	updateTokenB = (token) => {
		const { walletAddress, walletConnected } = this.props;
		const { tokenA, tokenAAmount } = this.state;
		if (token.symbol !== tokenA) {
			this.setState({
				tokenB: token.symbol,
				tokenBIcon: token.icon,
				tokenBAddress: token.contractAddress,
			}, () => {
				if (walletConnected) {
					this.fetchPrices()
					this.fetchLiquidity()
					this.fetchBalance(walletAddress, token.contractAddress, token.contractABI, 'B')
					this.fetchApproval(walletAddress, token.contractAddress, 'B')
					if (tokenAAmount) {
						this.estimate('A')
					}
				}
			})
		} else {
			this.swapTokensInternal()
		}
	}

	swapTokensInternal = () => {
		const { tokenA, tokenAIcon, tokenB, tokenBIcon, tokenBBalance, tokenAAddress, tokenBAddress } = this.state;
		const { walletConnected } = this.props
		this.setState({
			tokenB: tokenA,
			tokenBAddress: tokenAAddress,
			tokenBIcon: tokenAIcon,
			tokenBBalance: '',
			tokenA: tokenB,
			tokenAAddress: tokenBAddress,
			tokenAIcon: tokenBIcon,
			tokenABalance: tokenBBalance,
			tokenAAmount: '',
			tokenBAmount: '',
			tokenAAllowance: '',
		}, () => {
			if (walletConnected) {
				this.fetchLiquidity()
				this.fetchPrices()
				const importedTokens = fetchImportedTokens()
				let allTokens = [...TOKENS]
				if (importedTokens) {
					allTokens = [...TOKENS, ...importedTokens.data]
				}
				if (this.state.tokenA) {
					const selectedToken = allTokens.filter((token) => token.symbol === this.state.tokenA)
					this.fetchBalance(this.props.walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, 'A')
					this.fetchApproval(this.props.walletAddress, selectedToken[0].contractAddress, 'A')
				}
				if (this.state.tokenB) {
					const selectedToken = allTokens.filter((token) => token.symbol === this.state.tokenB)
					this.fetchBalance(this.props.walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, 'B')
					this.fetchApproval(this.props.walletAddress, selectedToken[0].contractAddress, 'B')
				}
			}
		})
	}

	updateAmount = (value, type) => {
		const { walletConnected } = this.props
        this.setState({
            [type === 'A' ? 'tokenAAmount' : 'tokenBAmount']: value,
        }, () => {
			if (walletConnected) {
				let timer;
				if (type === 'A') {
					timer = timerA
				} else {
					timer = timerB
				}
				clearTimeout(timer)
				if (value && parseFloat(value) > 0) {
					timer = setTimeout(
						() => this.estimate(type),
						700
					)
				} else {
					this.setState({
						[type === 'A' ? 'tokenBAmount' : 'tokenAAmount']: '',
					})
				}
			}
		})
	}

	estimate = (type) => {
		const { tokenAAmount, tokenBAmount, tokenABalance, tokenBBalance, tokenAAddress, tokenBAddress, tokenA, tokenB } = this.state;
		if (tokenABalance && tokenBBalance) {
			// const estimateData = {
			// 	amount: type === 'A' ? tokenAAmount : tokenBAmount,
			// 	balanceA: type === 'A' ? tokenABalance : tokenBBalance,
			// 	balanceB: type === 'A' ? tokenBBalance : tokenABalance,
			// }
			if (type === 'A') {
				this.setState({estimatingA: true}, () => {
					const estimateData = {
						amount: tokenAAmount.toString(),
						addresses: [tokenAAddress, tokenBAddress],
						token: tokenA,
					}
					estimateOutAmounts(estimateData)
						.then((res) => {
							if (res.success) {
								let amount = this.state.tokenAAmount
								// console.log(tokenAAmount, res.amount)
								this.setState({
									tokenBAmount: amount ? parseFloat(res.amount).toFixed(6) : '',
									estimatingA: false,
									invalidPair: false
								}, () => this.calculatePriceImpact())
							}
						})
						.catch((err) => {
							this.setState({estimatingA: false}, () => {
								if (err.message.includes("underflow")) {
									this.setState({
										invalidPair: true,
										tokenAAmount: '',
										tokenBAmount: '',
									})
								}
							})
						})
				})
			} else if (type === 'B') {
				this.setState({estimatingB: true}, () => {
					const estimateData = {
						amount: tokenBAmount.toString(),
						addresses: [tokenAAddress, tokenBAddress],
						token: tokenB,
					}
					estimateInAmounts(estimateData)
						.then((res) => {
							if (res.success) {
								let amount = this.state.tokenBAmount
								this.setState({
									tokenAAmount: amount ? parseFloat(res.amount).toFixed(6) : '',
									estimatingB: false,
									invalidPair: false,
								}, () => this.calculatePriceImpact())
							}
						})
						.catch((err) => {
							this.setState({estimatingB: false}, () => {
								if (err.message.includes("underflow")) {
									this.setState({
										invalidPair: true,
										tokenAAmount: '',
										tokenBAmount: '',
									})
								}
							})
						})
				})
			}
		}
	}

	calculatePriceImpact = () => {
		const { tokenASupply, tokenBSupply, tokenAAmount, tokenBAmount } = this.state;
		const numerator = (parseFloat(tokenASupply) * parseFloat(tokenBAmount)) + (parseFloat(tokenBSupply) * parseFloat(tokenAAmount))
		const denominator = parseFloat(tokenBSupply) * (parseFloat(tokenBSupply) + parseFloat(tokenBAmount))
		const impact = (numerator/denominator) * 100
		this.setState({
			impact: impact.toFixed(2)
		})
	}

	handleMax = (token) => {
		const { tokenABalance, tokenBBalance } = this.state;
		this.setState({
			[token === 'A' ? 'tokenAAmount' : 'tokenBAmount']: token === 'A' ? tokenABalance : tokenBBalance
		}, () => this.estimate(token))
	}

	toggleInversion = () => {
		this.setState(state => {
			return {
				inverted: !state.inverted
			}
		})
	}

	approve = (token) => {
		const { tokenA, tokenB, tokenAAddress, tokenBAddress, approvalAmount } = this.state;
		const { walletAddress, theme } = this.props
		this.setState({[token === 'A' ? 'approvingTokenA' : 'approvingTokenB']: true, approving: true}, () => {
			approveToken(
				token === 'A' ? tokenAAddress : tokenBAddress,
				this.props.signer,
				approvalAmount,
			).then((res) => {
				if (res.success) {
					// console.log(res.data)
					if (res.data.hash) {
						const Link = () => (
							<a style={{color: '#DC2410', textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`}>View Transaction</a>
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
										color: theme === 'light' ? '#DE0102' : '#DEB501',
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
									if (token === 'A') {
										this.fetchApproval(walletAddress, tokenAAddress, 'A')
									} else {
										this.fetchApproval(walletAddress, tokenBAddress, 'B')
									}
									if(reciept) {
										notification.close('approvalProcessingNotification')
										const Link = () => (
											<a style={{color: '#DC2410', textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`} onClick={() => notification.close('approvalSuccessNotification')}>View Transaction</a>
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
						description: "Your transaction could not be processed. Please try again later",
					})
				})
			})	
		})
	}

	swap = () => {
		const { tokenA, tokenB, tokenAAmount, tokenBAmount, tokenAAddress, tokenBAddress } = this.state
		const { slippage } = this.context
		const { walletAddress, signer, theme } = this.props
		const deadline = moment().add(1, 'years').format('X')
		const amountOut = parseFloat(tokenBAmount) - (parseFloat(tokenBAmount) * (parseFloat(slippage)/100))
		this.setState({swapping: true}, () => {
			const swapData = {
				amountIn: tokenAAmount,
				amountOut: amountOut.toString(),
				tokenAddresses: [tokenAAddress, tokenBAddress],
				walletAddress: walletAddress,
				deadline: parseFloat(deadline),
				signer: signer
			}
			// const data = {
			// 	amountOut: ethers.utils.parseUnits(amountOut.toString(), 18),
            //     amountIn: ethers.utils.parseUnits(tokenAAmount, 18),
            //     addresses: [tokenAAddress, tokenBAddress],
            //     to: walletAddress,
            //     deadline: parseFloat(deadline),
			// }
			// console.log(data)
			// console.log(ethers.utils.formatUnits(data.amountIn, 18), ethers.utils.formatUnits(data.amountOut, 18))
			swapTokens(swapData)
				.then((res) => {
					if (res.success) {
						if (res.data.hash) {
							const hashArrayString = localStorage.getItem('hashData');
							const tx = {
								hash: res.data.hash,
								amount: parseFloat(tokenBAmount).toFixed(4),
								summary: `Swap ${parseFloat(tokenAAmount).toFixed(4)} ${tokenA} for ${parseFloat(tokenBAmount).toFixed(4)} ${tokenB}`
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
								<a style={{color: '#DC2410', textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`}>View Transaction</a>
							)
							notification.info({
								key: 'swapProcessingNotification',
								message: 'Transaction is being processed. You can view the transaction here.',
								btn: <Link />,
								icon: (
									<CircularProgress
										size={25}
										thickness={5}
										style={{
											color: theme === 'light' ? '#DE0102' : '#DEB501',
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
											notification.close('swapProcessingNotification')
											const Link = () => (
												<a style={{color: '#DC2410', textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`} onClick={() => notification.close('swapSuccessNotification')}>View Transaction</a>
											)
											notification.success({
												key: 'swapSuccessNotification',
												message: 'Swap successful. You can view the transaction here.',
												btn: <Link />,
												duration: 0
											})
											this.setState({
												swapping: false,
												tokenAAmount: '',
												tokenBAmount: ''
											}, () => {
												const importedTokens = fetchImportedTokens()
												let allTokens = [...TOKENS]
												if (importedTokens) {
													allTokens = [...TOKENS, ...importedTokens.data]
												}
												const A = allTokens.filter((token) => token.symbol === this.state.tokenA)[0]
												const B = allTokens.filter((token) => token.symbol === this.state.tokenB)[0]
												this.fetchBalance(walletAddress, tokenAAddress, A.contractABI, 'A')
												this.fetchBalance(walletAddress, tokenBAddress, B.contractABI, 'B')
											})
											clearInterval(intervalId)
										}
									} catch(e) {
										console.log(e.message)
									}
								}, 5000)
							} catch(e) {
								this.setState({swapping: false})
								console.log(e.message)
							}
						}
					}
				})
				.catch((_) => {
					this.setState({swapping: false}, () => {
						notification.error({
							message: "Couldn't swap tokens",
							description: "Your transaction could not be processed. Please try again later"
						})
					})
				})
			
		})
	}

	handleRefresh = (tokenSymbol, type) => {
		const importedTokens = fetchImportedTokens()
		let allTokens = [...TOKENS]
		if (importedTokens) {
			allTokens = [...TOKENS, ...importedTokens.data]
		}
		const selectedToken = allTokens.filter((token) => token.symbol === tokenSymbol)[0]
		this.fetchApproval(this.props.walletAddress, selectedToken.contractAddress, type)
		this.fetchBalance(this.props.walletAddress, selectedToken.contractAddress, selectedToken.contractABI, type)
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

	handlePercentChange = (value) => {
        const { tokenABalance } = this.state
        this.setState({
            percent: value,
        }, () => {
           const amount = (parseFloat(tokenABalance) * (this.state.percent/100))
           this.setState({tokenAAmount: parseFloat(amount.toFixed(6))}, () => this.estimate('A'))
        })
    }

    render() {
        const { tokenA, tokenABalance, tokenAAllowance, tokenB, tokenBBalance, tokenBAllowance, tokenAIcon, tokenBIcon, tokenAAmount, tokenBAmount, liquidityInfo, swapping, loading, estimatingA, estimatingB, approvingTokenA, approving, approvalModalVisible, approvalToken, approvalAmount, fetchingLiquidity, impact, tokenAPrice, tokenBPrice, fetchingPrices, inverted, invalidPair } = this.state
        const { onModalToggle, walletConnected, walletAddress, signer, modalVisible, theme, onThemeToggle, ethBalance, vrapBalance, history } = this.props
        return (
            <>
              	<Navbar
                	active="swap"
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
						<div className="tabs">
							<a href="/swap" onClick={(e) => e.preventDefault()} className="tab-active">Swap</a>
							<a href="/pool" onClick={(e) => {e.preventDefault(); history.push('/pool')}}>Pool</a>
						</div>
						<Swap
							invalidPair={invalidPair}
							fetchingLiquidity={fetchingLiquidity}
							walletConnected={walletConnected}
							walletAddress={walletAddress}
							signer={signer}
							tokenA={tokenA}
							tokenAIcon={tokenAIcon}
							tokenABalance={tokenABalance}
							tokenAAllowance={tokenAAllowance}
							tokenB={tokenB}
							tokenBIcon={tokenBIcon}
							tokenBBalance={tokenBBalance}
							tokenBAllowance={tokenBAllowance}
							onTokenAUpdate={this.updateTokenA}
							onTokenBUpdate={this.updateTokenB}
							tokenAAmount={tokenAAmount}
							tokenBAmount={tokenBAmount}
							onAmountChange={this.updateAmount}
							estimatingA={estimatingA}
							estimatingB={estimatingB}
							onMax={this.handleMax}
							onTokenSwap={this.swapTokensInternal}
							onRefresh={this.handleRefresh}
							onPercentChange={this.handlePercentChange}
						/>
						{walletConnected ? (
							!fetchingPrices ? (
								!invalidPair ? (
									(tokenAPrice && tokenBPrice) ? (
										<div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem', fontSize: '13px', color: theme === 'light' ? '#000' : '#FFF', fontFamily: 'PT Sans Caption', padding: '0 0.8rem'}}>
											<div style={{display: 'flex', alignItems: 'center', color: theme === 'light' ? '#000' : '#FFF'}}>
												{!inverted ? (
													<div>1 {tokenA} ~ {parseFloat(tokenAPrice).toFixed(6)} {tokenB}</div>
												) : (
													<div>1 {tokenB} ~ {parseFloat(tokenBPrice).toFixed(6)} {tokenA}</div>
												)}
												<button className="invert-button" onClick={this.toggleInversion}>
													<GrPowerCycle size={15} />
												</button>
											</div>
										</div>
									) : null
								) : null
							) : null
						): null}
						<div className="details-section">
							{(walletConnected && (tokenA && tokenB) && (tokenAAmount && tokenBAmount) && !fetchingPrices && !invalidPair) && (
								<div className="flex-spaced-container" style={{fontSize: '13px'}}>
									<div>Minimum received{' '}
									<Tooltip placement="right" title="Your transaction will revert if there is a large, unfavourable price movement before it is confirmed.">
										<AiOutlineQuestionCircle style={{position: 'relative', top: '2px', cursor: 'pointer'}} />
									</Tooltip></div>
									<div>{(parseFloat(tokenBAmount) - (parseFloat(tokenBAmount) * (parseFloat(this.context.slippage)/100))).toFixed(6)} {tokenB}</div>
								</div>
							)}
							{(walletConnected && (tokenA && tokenB) && (tokenAAmount && tokenBAmount) && !fetchingPrices && !fetchingLiquidity && liquidityInfo && impact && !invalidPair) && (
								<div className="flex-spaced-container" style={{fontSize: '13px'}}>
									<div>Price Impact</div>
									<div>{impact} %</div>
								</div>
							)}
							{(this.context.slippage !== "0.5") && (
								<div className="flex-spaced-container" style={{fontSize: '13px'}}>
									<div>Slippage Tolerance{' '}
									<Tooltip placement="right" title="Slippage tolerance must be greater than the price impact or else trade will not be executed.">
										<AiOutlineQuestionCircle style={{position: 'relative', top: '2px', cursor: 'pointer'}} />
									</Tooltip>
									</div>
									<div>{this.context.slippage} %</div>
								</div>
							)}
						</div>
						{!walletConnected ? (
						<div className="exchange-button-container">
							<button onClick={onModalToggle}>Connect wallet</button>
						</div>
					) : ((!tokenA || !tokenB) ? (
							<div className="exchange-button-container">
								<button disabled>Select a token</button>
							</div>
						) : ((loading || fetchingLiquidity) ? (
								<div className="exchange-button-container">
									<button disabled><CircularProgress size={12} thickness={5} style={{color: 'var(--primary)'}} /></button>
								</div>
							) : 
							liquidityInfo ? ( 
								parseFloat(liquidityInfo.total) > 0 ? (
									!invalidPair ? (
										(!tokenAAmount || !tokenBAmount) ? (
											<div className="exchange-button-container">
												<button disabled>Enter an amount</button>
											</div>
										) : (((parseFloat(tokenAAmount) <= parseFloat(tokenABalance))) ? (
											((parseFloat(tokenAAmount) <= parseFloat(tokenAAllowance))) ? (
												(parseFloat(impact) <= parseFloat(this.context.slippage)) ? (
													<div className="exchange-button-container">
														<button onClick={this.swap} disabled={loading || swapping}>Swap {swapping && (
															<CircularProgress size={12} thickness={5} style={{color: 'var(--primary)', position: 'relative', top: '1px'}} />
														)}</button>
													</div>
												) : (
													<div className="exchange-button-container">
														<button disabled>
															High Price Impact
														</button>
														<div style={{textAlign: 'center', fontSize: '13px', color: theme === 'light' ? '#000' : '#FFF', margin: '8px auto 0'}}>Set slippage higher than {impact} %</div>
													</div>
												)
											) : ((parseFloat(tokenAAmount) > parseFloat(tokenAAllowance)) ? (
													<div className="exchange-button-container">
														<button 
															disabled={approvingTokenA || approving} style={{marginBottom: '0.25rem'}}
															onClick={() => {
																this.setState({approvalToken: 'A', approvalAmount: tokenAAmount}, () => this.handleModalToggle())
															}}>
															Approve {tokenA} {approvingTokenA && (<CircularProgress size={12} thickness={5} style={{color: 'var(--primary)', position: 'relative', top: '1px'}} />)}
														</button>
														<button disabled>Swap</button>
													</div>
												) : (
													<div className="exchange-button-container">
														<button onClick={this.swap} disabled={loading || swapping}>Swap {swapping && (
															<CircularProgress size={12} thickness={5} style={{color: 'var(--primary)', position: 'relative', top: '1px'}} />
														)}</button>
													</div>
												)	
											)
										) : (
											<div className="exchange-button-container">
												<button disabled>
													Insufficient {tokenA} balance
												</button>
											</div>
										)
										)
									) : (
										<div className="exchange-button-container">
											<button disabled>
												Invalid Pair
											</button>
										</div>
									)
								) : (
									<div className="exchange-button-container">
										<button disabled>
											{fetchingLiquidity ? <CircularProgress size={12} thickness={5} style={{color: 'var(--primary)', position: 'relative', top: '1px'}} /> : "Insufficient liquidity for this trade"}
										</button>
									</div>
								)
							) : (
								<div className="exchange-button-container">
									<button disabled>
										{fetchingLiquidity ? <CircularProgress size={12} thickness={5} style={{color: 'var(--primary)', position: 'relative', top: '1px'}} /> : "Insufficient liquidity for this trade"}
									</button>
								</div>
							)
						)
					)}
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
            </>
        )
    }
}

export default withRouter(Exchange)