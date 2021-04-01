import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router'
import Pool from '../components/exchange/Pool'
import Navbar from '../components/Navbar'
import { getLPAddress, getLPInfo, getTokenApproval, getTokenBalance, approveToken, addLiquidity, fetchPoolData, storePoolData, fetchImportedTokens } from '../utils/helpers'
import { TOKENS } from '../utils/appTokens'
import { CircularProgress, Dialog } from '@material-ui/core'
import { notification } from 'antd'
import { RiCloseFill } from 'react-icons/ri'
import { ethers } from 'ethers'

const PROVIDER = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s1.binance.org:8545/')

class Liquidity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pools: [],
            liquiditySectionVisible: true,
			tokenA: TOKENS[0].symbol,
			tokenAIcon: TOKENS[0].icon,
			tokenAAddress: TOKENS[0].contractAddress,
			tokenABalance: '',
			tokenAAmount: '',
			tokenAAllowance: '',
			tokenAApproved: false,
			approvingTokenA: false,
			tokenB: '',
			tokenBIcon: '',
			tokenBAddress: '',
			tokenBBalance: '',
			tokenBAmount: '',
			tokenBAllowance: '',
			tokenBApproved: false,
			approvingTokenB: false,
			lpAddress: '',
			liquidityInfo: null,
			supplying: false,
			loading: false,
			approvalModalVisible: false,
			approvalToken: '',
			approvalAmount: '',
			approving: false,
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
			this.fetchBalance(walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, 'A')
			this.fetchApproval(walletAddress, selectedToken[0].contractAddress, 'A')
			if (tokenB) {
				const selectedToken = allTokens.filter((token) => token.symbol === tokenB)
				this.fetchBalance(walletAddress, selectedToken[0].contractAddress, selectedToken[0].contractABI, 'B')
				this.fetchApproval(walletAddress, selectedToken[0].contractAddress, 'B')
			}
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
		getTokenApproval(walletAddress, contractAddress)
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

    fetchLiquidity = () => {
		const { tokenAAddress, tokenBAddress } = this.state
        if (tokenAAddress && tokenBAddress) {
			try {
				this.setState({loading: true}, async () => {
					const lpAddress = await getLPAddress(tokenAAddress, tokenBAddress)
					if (lpAddress === "0x0000000000000000000000000000000000000000") {
						this.setState({loading: false})
					} else {
						const liquidityInfo = await getLPInfo(lpAddress, this.props.walletAddress, tokenAAddress, tokenBAddress)
						this.setState({
							lpAddress: lpAddress,
							liquidityInfo: liquidityInfo.data,
							loading: false,
						})
					}
				})
			} catch(err) {
				this.setState({loading: false}, () => {
					console.log(err.message)
				})
			}
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
				this.fetchApproval(walletAddress, token.contractAddress, 'A')
				this.fetchLiquidity()
			})
		} else {
			this.swapTokens()
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
				this.fetchApproval(walletAddress, token.contractAddress, 'B')
				this.fetchLiquidity()
			})
		} else {
			this.swapTokens()
		}
	}

	swapTokens = () => {
		const { tokenA, tokenAIcon, tokenABalance, tokenB, tokenBIcon, tokenBBalance, tokenAAmount, tokenBAmount, tokenAAddress, tokenBAddress } = this.state;
		this.setState({
			tokenB: tokenA,
			tokenBIcon: tokenAIcon,
			tokenBBalance: tokenABalance,
			tokenBAddress: tokenAAddress,
			tokenA: tokenB,
			tokenAIcon: tokenBIcon,
			tokenABalance: tokenBBalance,
			tokenAAddress: tokenBAddress,
			tokenAAmount: tokenBAmount,
			tokenBAmount: tokenAAmount,
		})
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
							<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`}>View Transaction</a>
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
											this.fetchApproval(walletAddress, tokenAAddress, 'A')
										} else {
											this.fetchApproval(walletAddress, tokenBAddress, 'B')
										}
										notification.close('approvalProcessingNotification')
										const Link = () => (
											<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`} onClick={() => notification.close('approvalSuccessNotification')}>View Transaction</a>
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
						description: err.message,
					})
				})
			})	
		})
	}

	supply = () => {
		const { tokenA, tokenB, tokenAIcon, tokenBIcon, tokenAAddress, tokenBAddress, tokenAAmount, tokenBAmount, lpAddress } = this.state
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
		}
		this.setState({supplying: true}, () => {
			addLiquidity(data)
				.then((res) => {
					if (res.success) {
						if (res.data.hash) {
							const Link = () => (
								<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`}>View Transaction</a>
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
											const createdPool = {
												tokenA: tokenA,
												tokenAIcon: tokenAIcon,
												tokenAAddress: tokenAAddress,
												tokenB: tokenB,
												tokenBIcon: tokenBIcon,
												tokenBAddress: tokenBAddress,
												lpAddress: lpAddress,
											}
											//console.log(createdPool)
											let pools = fetchPoolData()
											if (pools) {
												const poolExists = pools.data.filter((pool) => (pool.tokenA === createdPool.tokenA) && (pool.tokenB) === createdPool.tokenB).length > 0
												if (!poolExists) {
													pools.data.push(createdPool)
													storePoolData(pools)
													this.setState({pools: pools.data})
												}
											} else {
												const newPool = {
													data: [createdPool]
												}
												storePoolData(newPool)
												this.setState({pools: newPool.data})
											}
											notification.close('supplyProcessingNotification')
											const Link = () => (
												<a style={{textDecoration: 'underline'}} target="_blank" rel="noreferrer noopener" href={`https://testnet.bscscan.com/tx/${res.data.hash}`} onClick={() => notification.close('supplySuccessNotification')}>View Transaction</a>
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
							description: err.message
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
			tokenAAddress: tokenA.address,
			tokenB: tokenB.symbol,
			tokenBIcon: tokenB.icon,
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
			this.fetchBalance(walletAddress, tokenA.contractAddress, tokenA.contractABI, 'A')
			this.fetchBalance(walletAddress, tokenB.contractAddress, tokenB.contractABI, 'B')
			this.fetchApproval(walletAddress, tokenA.contractAddress, 'A')
			this.fetchApproval(walletAddress, tokenB.contractAddress, 'B')
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

    render() {
        const { liquiditySectionVisible, tokenA, tokenABalance, tokenB, tokenBBalance, tokenAIcon, tokenBIcon, tokenAAmount, tokenBAmount, pools, approvingTokenA, approvingTokenB, supplying, tokenAAllowance, tokenBAllowance, loading, approvalModalVisible, approvalToken, approvalAmount, approving } = this.state
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
						<Pool
							theme={theme}
							liquiditySectionVisible={liquiditySectionVisible}
                            pools={pools}
							onSectionToggle={this.toggleLiquiditySectionVisibility}
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
							onMax={this.handleMax}
							onAddLiquidity={this.addLiquidity}
							onRefresh={this.handleRefresh}
						/>
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
											<button disabled><CircularProgress size={12} thickness={5} style={{color: theme === '#FFF' }} /></button>
										</div>
									) : (!tokenAAmount || !tokenBAmount) ? (
										<div className="exchange-button-container">
											<button disabled>Enter an amount</button>
										</div>
									) : ((parseFloat(tokenAAmount) === 0 || parseFloat(tokenBAmount) === 0) ? (
											<div className="exchange-button-container">
												<button disabled>Enter an amount</button>
											</div>
										) : (((parseFloat(tokenAAmount) <= parseFloat(tokenABalance)) && ((parseFloat(tokenBAmount) <= parseFloat(tokenBBalance)))) ? (
												((parseFloat(tokenAAmount) <= parseFloat(tokenAAllowance) && parseFloat(tokenBAmount) <= parseFloat(tokenBAllowance))) ? (
													<div className="exchange-button-container">
														<button onClick={this.supply} disabled={loading || supplying}>Supply {supplying && (
															<CircularProgress size={12} thickness={5} style={{color: theme === '#FFF' , position: 'relative', top: '1px'}} />
														)}</button>
													</div>
												) : ((parseFloat(tokenAAmount) > parseFloat(tokenAAllowance)) ? (
														<div className="exchange-button-container">
																<button disabled={approvingTokenA || approvingTokenB} style={{marginBottom: '0.25rem'}} onClick={() => {
																	this.setState({approvalToken: 'A'}, () => this.handleModalToggle())
																}}>
																	Approve {tokenA} {approvingTokenA && (<CircularProgress size={12} thickness={5} style={{color: theme === '#FFF' , position: 'relative', top: '1px'}} />)}
																</button>
															<button disabled>Supply</button>
														</div>
													) : (parseFloat(tokenBAmount) > parseFloat(tokenBAllowance)) ? (
														<div className="exchange-button-container">
																<button disabled={approvingTokenB || approvingTokenA} style={{marginBottom: '0.25rem'}} onClick={() => {
																	this.setState({approvalToken: 'B'}, () => this.handleModalToggle())
																}}>
																Approve {tokenB} {approvingTokenB && (<CircularProgress size={12} thickness={5} style={{color: theme === '#FFF' , position: 'relative', top: '1px'}} />)}
															</button>
															<button disabled>Supply</button>
														</div>
													) : (
														<div className="exchange-button-container">
															<button onClick={this.supply} disabled={loading || supplying}>Supply {supplying && (
																<CircularProgress size={12} thickness={5} style={{color: theme === '#FFF' , position: 'relative', top: '1px'}} />
															)}</button>
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
								<div>balance: <span style={{fontFamily: 'Semibold'}}>{approvalToken === 'A' ? parseFloat(tokenABalance).toFixed(6) : parseFloat(tokenBBalance).toFixed(6)}</span> <span style={{textTransform: 'none'}}>{approvalToken === 'A' ? tokenA : tokenB}</span></div>
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

export default withRouter(Liquidity)