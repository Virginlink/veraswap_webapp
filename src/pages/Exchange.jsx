import React, { Component } from 'react'
import Swap from '../components/exchange/Swap'
import { withRouter } from 'react-router'
import { TOKENS } from '../utils/appTokens'
import { estimateSwapAmount, fetchImportedTokens, getLPAddress, getLPInfo, getTokenBalance, swapTokens } from '../utils/helpers'
import { CircularProgress } from '@material-ui/core'
import { notification } from 'antd'
import moment from 'moment'
import Navbar from '../components/Navbar'
import { ethers } from 'ethers'

const PROVIDER = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s1.binance.org:8545/')

class Exchange extends Component {
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
			tokenB: '',
			tokenBAddress: '',
			tokenBIcon: '',
			tokenBBalance: '',
			tokenBAmount: '',
			liquidityInfo: null,
			swapping: false,
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
		}
	}

	componentDidUpdate(prevProps) {
		const { walletAddress } = this.props
		if ((walletAddress !== prevProps.walletAddress) && walletAddress) {
			const importedTokens = fetchImportedTokens()
			let allTokens = [...TOKENS]
			if (importedTokens) {
				allTokens = [...TOKENS, ...importedTokens.data]
			}
			const selectedToken = allTokens.filter((token) => token.symbol === this.state.tokenA)
			this.fetchBalance(walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, 'A')
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

	fetchLiquidity = async () => {
		const { tokenAAddress, tokenBAddress } = this.state
        if (tokenAAddress && tokenBAddress) {
			this.setState({loading: true}, async () => {
				try {
					const lpAddress = await getLPAddress(tokenAAddress, tokenBAddress)
					if (lpAddress === "0x0000000000000000000000000000000000000000") {
						this.setState({loading: false})
					} else {
						const liquidityInfo = await getLPInfo(lpAddress, this.props.walletAddress, tokenAAddress, tokenBAddress)
						this.setState({
							loading: false,
							liquidityInfo: liquidityInfo.data
						})
					}
				} catch(err) {
					this.setState({loading: false}, () => {
						console.log(err.message)
					})
				}
			})
		}
    }

	updateTokenA = (token) => {
		const { walletAddress } = this.props;
		const { tokenB } = this.state;
		if (token.symbol !== tokenB) {
			this.setState({
				tokenA: token.symbol,
				tokenAIcon: token.icon,
				tokenAAddress: token.contractAddress,
			}, () => {
				this.fetchBalance(walletAddress, token.contractAddress, token.contractABI, 'A')
				this.fetchLiquidity()
			})
		} else {
			this.swapTokensInternal()
		}
	}

	updateTokenB = (token) => {
		const { walletAddress } = this.props;
		const { tokenA } = this.state;
		if (token.symbol !== tokenA) {
			this.setState({
				tokenB: token.symbol,
				tokenBIcon: token.icon,
				tokenBAddress: token.contractAddress,
			}, () => {
				this.fetchBalance(walletAddress, token.contractAddress, token.contractABI, 'B')
				this.fetchLiquidity()
			})
		} else {
			this.swapTokensInternal()
		}
	}

	swapTokensInternal = () => {
		const { tokenA, tokenAIcon, tokenABalance, tokenB, tokenBIcon, tokenBBalance, tokenAAmount, tokenBAmount, tokenAAddress, tokenBAddress } = this.state;
		this.setState({
			tokenB: tokenA,
			tokenBAddress: tokenAAddress,
			tokenBIcon: tokenAIcon,
			tokenBBalance: tokenABalance,
			tokenA: tokenB,
			tokenAAddress: tokenBAddress,
			tokenAIcon: tokenBIcon,
			tokenABalance: tokenBBalance,
			tokenAAmount: tokenBAmount,
			tokenBAmount: tokenAAmount,
		})
	}

	updateAmount = (value, type) => {
        this.setState({
            [type === 'A' ? 'tokenAAmount' : 'tokenBAmount']: value,
        }, () => {
			if (value && parseFloat(value) > 0) {
				this.estimate(type)
			} else {
				this.setState({
					[type === 'A' ? 'tokenBAmount' : 'tokenAAmount']: '',
				})
			}
		})
	}

	estimate = (type) => {
		const { tokenAAmount, tokenBAmount, tokenABalance, tokenBBalance } = this.state;
		if (tokenABalance && tokenBBalance) {
			const estimateData = {
				amount: type === 'A' ? tokenAAmount : tokenBAmount,
				balanceA: type === 'A' ? tokenABalance : tokenBBalance,
				balanceB: type === 'A' ? tokenBBalance : tokenABalance,
			}
			this.setState({[type === 'A' ? 'estimatingA' : 'estimatingB']: true}, () => {
				estimateSwapAmount(estimateData)
					.then((res) => {
						if (res.success) {
							this.setState({
								[type === 'A' ? 'tokenBAmount' : 'tokenAAmount']: parseFloat(res.amount).toFixed(6),
								[type === 'A' ? 'estimatingA' : 'estimatingB']: false
							})
						}
					})
					.catch((err) => {
						this.setState({[type === 'A' ? 'estimatingA' : 'estimatingB']: false}, () => {
							console.log(err.message)
						})
					})
			})
		}
	}

	handleMax = (token) => {
		const { tokenABalance, tokenBBalance } = this.state;
		this.setState({
			[token === 'A' ? 'tokenAAmount' : 'tokenBAmount']: token === 'A' ? tokenABalance : tokenBBalance
		}, () => {
			this.estimate(token)	
		})
	}

	swap = () => {
		const { tokenA, tokenB, tokenAAmount, tokenBAmount, tokenAAddress, tokenBAddress } = this.state
		const { walletAddress, signer, theme } = this.props
		const deadline = moment().add(1, 'years').format('X')
		const tokenAddresses = [tokenAAddress, tokenBAddress]
		this.setState({swapping: true}, () => {
			const swapData = {
				amountOut: tokenBAmount,
				amountIn: tokenAAmount,
				tokenAddresses: tokenAddresses,
				walletAddress: walletAddress,
				deadline: deadline,
				signer: signer
			}
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
								<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`}>View Transaction</a>
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
											notification.close('swapProcessingNotification')
											const Link = () => (
												<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`} onClick={() => notification.close('swapSuccessNotification')}>View Transaction</a>
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
				.catch((err) => {
					this.setState({swapping: false}, () => {
						notification.error({
							message: "Couldn't swap tokens",
							description: err.message
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
		this.fetchBalance(this.props.walletAddress, selectedToken.contractAddress, selectedToken.contractABI, type)
	}

    render() {
        const { tokenA, tokenABalance, tokenB, tokenBBalance, tokenAIcon, tokenBIcon, tokenAAmount, tokenBAmount, liquidityInfo, swapping, loading, estimatingA, estimatingB } = this.state
        const { onModalToggle, walletConnected, walletAddress, signer, modalVisible, theme, onThemeToggle, ethBalance, vrapBalance } = this.props
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
						{/* <div className="tabs">
							<a href="/exchange" onClick={(e) => e.preventDefault()} className="tab-active">Swap</a>
							<a href="/exchange/liquidity" onClick={(e) => {e.preventDefault(); history.push('/exchange/liquidity')}}>Pool</a>
						</div> */}
						<Swap
							theme={theme}
							walletConnected={walletConnected}
							walletAddress={walletAddress}
							signer={signer}
							tokenA={tokenA}
							tokenAIcon={tokenAIcon}
							tokenABalance={tokenABalance}
							tokenB={tokenB}
							tokenBIcon={tokenBIcon}
							tokenBBalance={tokenBBalance}
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
						/>
						{!walletConnected ? (
							<div className="exchange-button-container">
								<button onClick={onModalToggle}>Connect wallet</button>
							</div>
						) : ((!tokenA || !tokenB) ? (
								<div className="exchange-button-container">
									<button disabled>Select a token</button>
								</div>
							) : (loading ? (
									<div className="exchange-button-container">
										<button disabled><CircularProgress size={12} thickness={5} style={{color: '#FFF' }} /></button>
									</div>
								) : 
								liquidityInfo ? ( 
									parseFloat(liquidityInfo.total) > 0 ? (
										(!tokenAAmount || !tokenBAmount) ? (
											<div className="exchange-button-container">
												<button disabled>Enter an amount</button>
											</div>
										) : ((parseFloat(tokenAAmount) === 0 || parseFloat(tokenBAmount) === 0) ? (
												<div className="exchange-button-container">
													<button disabled>Enter an amount</button>
												</div>
											) : (((parseFloat(tokenAAmount) <= parseFloat(tokenABalance)) && ((parseFloat(tokenBAmount) <= parseFloat(tokenBBalance)))) ? (
													<div className="exchange-button-container">
														<button onClick={this.swap} disabled={swapping}>
															Swap {swapping && (
																<CircularProgress size={12} thickness={5} style={{color: '#FFF' , position: 'relative', top: '1px'}} />
															)}
														</button>
													</div>
												) : (
													<div className="exchange-button-container">
														<button disabled>
															{(parseFloat(tokenAAmount) > parseFloat(tokenABalance)) ? `Insufficient ${tokenA} balance` : `Insufficient ${tokenB} balance`}
														</button>
													</div>
												)
											)
										)
									) : (
										<div className="exchange-button-container">
											<button disabled>
												Insufficient liquidity for this trade
											</button>
										</div>
									)
								) : (
									<div className="exchange-button-container">
										<button disabled>
											Insufficient liquidity for this trade
										</button>
									</div>
								)
							)
						)}
					</div>
				</div>
            </>
        )
    }
}

export default withRouter(Exchange)