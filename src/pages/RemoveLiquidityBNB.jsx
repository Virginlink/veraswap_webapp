import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router'
import Navbar from '../components/Navbar'
import Empty from '../assets/icons/Empty.png'
import { getLPInfo, getTokenApproval, approveToken, fetchPoolData, storePoolData, removeLiquidity, removeLiquidityWithBNB } from '../utils/helpers'
import { CircularProgress } from '@material-ui/core'
import { notification } from 'antd'
import RemoveLP from '../components/exchange/RemoveLP'
import { PROVIDER } from '../utils/contracts'
class RemoveLiquidity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            walletAddress: '',
            totalATokens: '',
            fetchingApproval: false,
			tokenA: '',
			tokenAIcon: Empty,
			tokenADecimals: '',
            totalBTokens: '',
			tokenB: '',
			tokenBIcon: '',
			tokenBDecimals: '',
			lpAddress: '',
            lpAllowance: '',
            approvingLP: false,
            lpApproved: false,
			supplying: false,
            percent: 1,
            tokensInPool: '',
            totalSupply: '',
            removingLP: false,
            liquidity: '',
        }
    }

	componentDidMount() {
		const { walletAddress, history: { location: { state } } } = this.props
		if (walletAddress) {
            if (state) {
                const { tokenA, tokenB, lpAddress, walletAddress, totalPoolTokens, totalSupply } = state
                this.setState({
                    tokenA: tokenA.symbol,
                    tokenAIcon: tokenA.icon,
					tokenADecimals: tokenA.decimals,
                    tokenAAddress: tokenA.address,
                    totalATokens: tokenA.supply,
                    tokenB: tokenB.symbol,
                    tokenBIcon: tokenB.icon,
					tokenBDecimals: tokenB.decimals,
                    tokenBAddress: tokenB.address,
                    totalBTokens: tokenB.supply,
                    lpAddress: lpAddress,
                    walletAddress: walletAddress,
                    tokensInPool: totalPoolTokens,
                    totalSupply: totalSupply
                }, () => {
			        this.fetchApproval(walletAddress, lpAddress)
                    this.fetchLiquidity()
                })
            } else {
                this.props.history.replace('/pool')
            }
		} else {
            this.props.history.replace('/pool')
        }
	}

	componentDidUpdate(prevProps) {
		const { walletAddress, history: { location: { state } } } = this.props
		if ((walletAddress !== prevProps.walletAddress) && walletAddress) {
			if (state) {
                const { tokenA, tokenB, lpAddress, walletAddress, totalPoolTokens, totalSupply } = state
                this.setState({
                    tokenA: tokenA.symbol,
                    tokenAIcon: tokenA.icon,
                    tokenAAddress: tokenA.address,
                    totalATokens: tokenA.supply,
                    tokenB: tokenB.symbol,
                    tokenBIcon: tokenB.icon,
                    tokenBAddress: tokenB.address,
                    totalBTokens: tokenB.supply,
                    lpAddress: lpAddress,
                    walletAddress: walletAddress,
                    tokensInPool: totalPoolTokens,
                    totalSupply: totalSupply
                }, () => {
                    this.fetchApproval(walletAddress, lpAddress)
                    this.fetchLiquidity()
                })
            } else {
                this.props.history.replace('/pool')
            }
		}
	}

	updateDeadline = () => {
		// const { deadline } = this.context;
		// this.setState({
		// 	deadline: moment().add(deadline, 'm').format('X')
		// })
	}

	fetchApproval = (walletAddress, contractAddress) => {
        this.setState({fetchingApproval: true}, () => {
            getTokenApproval(walletAddress, contractAddress, 18)
			.then((allowance) => {
                this.setState({fetchingApproval: false}, () => {
                    this.setState({
                        lpAllowance: allowance,
                    })
                })
			})
            .catch((err) => {
                this.setState({fetchingApproval: false})
            })
        })
	}

    fetchLiquidity = async () => {
		const { tokenAAddress, tokenBAddress, lpAddress, walletAddress } = this.state
        if (tokenAAddress && tokenBAddress) {
			try {
				const liquidityInfo = await getLPInfo(lpAddress, walletAddress, tokenAAddress, tokenBAddress)
				this.setState({
					tokensInPool: liquidityInfo.data.total,
                    totalSUpply: liquidityInfo.data.totalSupply,
                    tokenASupply: liquidityInfo.data.A,
                    tokenBSupply: liquidityInfo.data.B,

				})
			} catch(err) {
				console.log(err.message)
			}
		}
    }

	updateAmount = (value, type) => {
        this.setState({
            [type === 'A' ? 'tokenAAmount' : 'tokenBAmount']: value,
        })
	}

	handleMax = (token) => {
		const { tokenABalance, tokenBBalance } = this.state;
		this.setState({
			[token === 'A' ? 'tokenAAmount' : 'tokenBAmount']: token === 'A' ? tokenABalance : tokenBBalance
		})
	}

    handleSlider = (value) => {
        const { tokensInPool } = this.state
        this.setState({
            percent: value,
        }, () => {
           const liquidity = (parseFloat(tokensInPool) * (this.state.percent/100))
           this.setState({liquidity})
        })
    }

	approve = () => {
		const { lpAddress, tokensInPool, percent } = this.state;
		const { walletAddress, theme } = this.props
        const liquidity = (parseFloat(tokensInPool) * (percent/100)).toString()
		this.setState({approvingLP: true}, () => {
			approveToken(
				lpAddress,
				this.props.signer,
				liquidity,
				18
			).then((res) => {
				if (res.success) {
					// console.log(res.data)
					if (res.data.hash) {
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
									// console.log('RECEIPT', reciept)
									this.fetchApproval(walletAddress, lpAddress)
									if(reciept) {
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
											approvingLP: false,
											lpApproved: true,
										})
										clearInterval(intervalId)
									}
								} catch(e) {
									console.log(e.message)
								}
							}, 5000)
						} catch(e) {
							this.setState({approvingLP: false})
							console.log(e)
						}
					}
				}
			}).catch((err) => {
				this.setState({approvingLP: false}, () => {
					notification.error({
						message: "Couldn't Approve",
						description: "Your transaction could not be processed. Please try again later",
					})
				})
			})	
		})
	}

	removeLP = () => {
		const { tokenA, tokenB } = this.state;
		if (tokenA === 'BNB' || tokenB === 'BNB') {
			this.removeLPWithBNB()
		} else {
			this.removeLPWithTokens()
		}
	}

	removeLPWithBNB = () => {
		const { tokenA, tokenAAddress, tokenBAddress, tokensInPool, percent, lpAddress, tokenADecimals, tokenBDecimals } = this.state
		const { walletAddress, signer, history, theme } = this.props
		const deadline = moment().add(1, 'years').format('X')
		let liquidity;
		if (percent === 100) {
			liquidity = tokensInPool.toString()
		} else {
			liquidity = (parseFloat(tokensInPool) * (percent/100)).toString()
		}
		const data = {
			walletAddress: walletAddress,
			address: tokenA === 'BNB' ? tokenBAddress : tokenAAddress,
            liquidity: liquidity,
			deadline: parseFloat(deadline),
			signer: signer,
			decimals: tokenA === 'BNB' ? tokenBDecimals : tokenADecimals,
			decimalsBNB: tokenA === 'BNB' ? tokenADecimals : tokenBDecimals,
		}
		this.setState({removingLP: true}, () => {
			removeLiquidityWithBNB(data)
				.then((res) => {
					if (res.success) {
						if (res.data.hash) {
							const Link = () => (
								<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://${process.env.NODE_ENV === 'development' ? 'testnet.bscscan.com' : 'bscscan.com'}/tx/${res.data.hash}`}>View Transaction</a>
							)
							notification.info({
								key: 'removalProcessingNotification',
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
                                        if (percent === 100) {
                                            let pools = fetchPoolData()
                                            if (pools) {
                                                const poolExists = pools.data.filter((pool) => ((pool.tokenA === this.state.tokenA) && (pool.tokenB === this.state.tokenB))).length > 0
                                                const index = pools.data.findIndex((pool) => ((pool.tokenA === this.state.tokenA) && (pool.tokenB === this.state.tokenB)))
                                                if (poolExists && index !== -1) {
                                                    pools.data.splice(index, 1)
                                                    storePoolData(pools)
                                                }
                                            }
                                        }
										if(reciept) {
											notification.close('removalProcessingNotification')
											const Link = () => (
												<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://${process.env.NODE_ENV === 'development' ? 'testnet.bscscan.com' : 'bscscan.com'}/tx/${res.data.hash}`} onClick={() => notification.close('removalSuccessNotification')}>View Transaction</a>
											)
											notification.success({
												key: 'removalSuccessNotification',
												message: 'Liquidity removed successfully. You can view the transaction here.',
												btn: <Link />,
												duration: 0
											})
											this.setState({
												removingLP: false,
												percent: 1,
											}, () => {
                                                if (percent === 100) {
                                                    history.goBack()
                                                } else {
                                                    this.fetchLiquidity()
                                                    this.fetchApproval(walletAddress, lpAddress)
                                                }
											})
											clearInterval(intervalId)
										}
									} catch(e) {
										console.log(e.message)
									}
								}, 5000)
							} catch(e) {
								this.setState({removingLP: false})
								console.log(e.message)
							}
						}
					}
				})
				.catch((err) => {
					this.setState({removingLP: false}, () => {
						notification.error({
							message: "Couldn't remove liquidity",
							description: "Your transaction could not be processed. Please try again later"
						})
					})
				})
		})
	}

	removeLPWithTokens = () => {
		const { tokenAAddress, tokenBAddress, tokensInPool, percent, lpAddress, tokenADecimals, tokenBDecimals } = this.state
		const { walletAddress, signer, history, theme } = this.props
		const deadline = moment().add(1, 'years').format('X')
        let liquidity;
		if (percent === 100) {
			liquidity = tokensInPool.toString()
		} else {
			liquidity = (parseFloat(tokensInPool) * (percent/100)).toString()
		}
		const data = {
			walletAddress: walletAddress,
			addressA: tokenAAddress,
			addressB: tokenBAddress,
            liquidity: liquidity,
			deadline: parseFloat(deadline),
			signer: signer,
			decimalsA: tokenADecimals,
			decimalsB: tokenBDecimals,
		}
		this.setState({removingLP: true}, () => {
			removeLiquidity(data)
				.then((res) => {
					if (res.success) {
						if (res.data.hash) {
							const Link = () => (
								<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://${process.env.NODE_ENV === 'development' ? 'testnet.bscscan.com' : 'bscscan.com'}/tx/${res.data.hash}`}>View Transaction</a>
							)
							notification.info({
								key: 'removalProcessingNotification',
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
                                        if (percent === 100) {
                                            let pools = fetchPoolData()
                                            if (pools) {
                                                const poolExists = pools.data.filter((pool) => ((pool.tokenA === this.state.tokenA) && (pool.tokenB === this.state.tokenB))).length > 0
                                                const index = pools.data.findIndex((pool) => ((pool.tokenA === this.state.tokenA) && (pool.tokenB === this.state.tokenB)))
                                                if (poolExists && index !== -1) {
                                                    pools.data.splice(index, 1)
                                                    storePoolData(pools)
                                                }
                                            }
                                        }
										if(reciept) {
											notification.close('removalProcessingNotification')
											const Link = () => (
												<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://${process.env.NODE_ENV === 'development' ? 'testnet.bscscan.com' : 'bscscan.com'}/tx/${res.data.hash}`} onClick={() => notification.close('removalSuccessNotification')}>View Transaction</a>
											)
											notification.success({
												key: 'removalSuccessNotification',
												message: 'Liquidity removed successfully. You can view the transaction here.',
												btn: <Link />,
												duration: 0
											})
											this.setState({
												removingLP: false,
												percent: 1,
											}, () => {
                                                if (percent === 100) {
                                                    history.goBack()
                                                } else {
                                                    this.fetchLiquidity()
                                                    this.fetchApproval(walletAddress, lpAddress)
                                                }
											})
											clearInterval(intervalId)
										}
									} catch(e) {
										console.log(e.message)
									}
								}, 5000)
							} catch(e) {
								this.setState({removingLP: false})
								console.log(e.message)
							}
						}
					}
				})
				.catch((err) => {
					this.setState({removingLP: false}, () => {
						notification.error({
							message: "Couldn't remove liquidity",
							description: "Your transaction could not be processed. Please try again later"
						})
					})
				})
		})
	}

    render() {
        const { tokenA, tokenB, tokenAIcon, tokenBIcon, tokenAAmount, tokenBAmount, percent, liquidityInfo, fetchingApproval, totalATokens, totalBTokens, tokensInPool, totalSupply, removingLP, lpAllowance, approvingLP, liquidity } = this.state
        const { onModalToggle, walletConnected, walletAddress, signer, modalVisible, theme, onThemeToggle, ethBalance, vrapBalance } = this.props
        return (
            <>
                <Navbar
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
						<RemoveLP
							theme={theme}
							walletConnected={walletConnected}
							walletAddress={walletAddress}
							signer={signer}
                            liquidityInfo={liquidityInfo}
							tokenA={tokenA}
                            tokenASupply={totalATokens}
							tokenAIcon={tokenAIcon}
							tokenB={tokenB}
                            tokenBSupply={totalBTokens}
							tokenBIcon={tokenBIcon}
							tokenAAmount={tokenAAmount}
							tokenBAmount={tokenBAmount}
							onAmountChange={this.updateAmount}
							onMax={this.handleMax}
                            onPercentChange={this.handleSlider}
                            percent={percent}
                            tokensInPool={tokensInPool}
                            totalSUpply={totalSupply}
						/>
						{!walletConnected ? (
							<div className="exchange-button-container">
								<button onClick={onModalToggle}>Connect wallet</button>
							</div>
						) : (fetchingApproval ? (
								<div className="remove-liquidity-actions">
									<button disabled><CircularProgress size={14} thickness={5} style={{color: theme === 'light' ? '#DE0102' : '#DEB501' }} /></button>
									<button disabled>Remove</button>
								</div>
							) : ((parseFloat(lpAllowance) === 0 || (parseFloat(liquidity) > parseFloat(lpAllowance)) ? (
									<div className="remove-liquidity-actions">
										<button disabled={percent === 0 || approvingLP} onClick={this.approve}>Approve {approvingLP && (
											<CircularProgress size={14} thickness={5} style={{color: theme === 'light' ? '#DE0102' : '#DEB501' , position: 'relative', top: '1px'}} />
										)}</button>
										<button disabled>Remove</button>
									</div>
								) : (
									<div className="remove-liquidity-actions">
										<button disabled>Approved</button>
										<button disabled={percent === 0 || removingLP} onClick={this.removeLP}>Remove {removingLP && (
											<CircularProgress size={14} thickness={5} style={{color: theme === 'light' ? '#DE0102' : '#DEB501' , position: 'relative', top: '1px'}} />
										)}</button>
									</div>
								))
							)
						)}
					</div>
				</div>
            </>
        )
    }
}

export default withRouter(RemoveLiquidity)