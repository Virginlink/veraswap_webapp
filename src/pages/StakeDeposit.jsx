import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Logo from '../assets/images/logo.png'
import { Dialog, Fade } from '@material-ui/core'
import PoolInfo from './components/PoolInfo';
import LiquidityDeposits from './components/LiquidityDeposits';
import Unclaimed from './components/Unclaimed';
import {PROVIDER} from '../utils/contracts';
import {TOKEN} from '../utils/tokens';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{enter: 1000, exit: 2000}} ref={ref} {...props} />;
});
const {ethers} = require('ethers');
export default class StakeDeposit extends Component {
    constructor() {
        super()
        this.state = {
            depositModalVisible: false,
            txSuccess: false,
            error: false,
            txHash: '',
            depositAmount: '',
            currentToken : '',
            ticker : '',
            icon : "",
            balance : 0.0,
            loading : true,
            apy : 0.0,
            liquidity : 0.0,
            decimal : 0,
            claiming : false
        }
        this.setAPY = this.setAPY.bind(this);
        this.setLiquidity = this.setLiquidity.bind(this);
    }

   async componentDidMount(){
        this.setState({currentToken : this.props.match.params.address});
        let info = TOKEN.filter(data => data.contractAddress === this.props.match.params.address);
        if(info.length > 0){
        this.setState({ticker : info[0].ticker, icon:info[0].icon});
        if(this.props.walletAddress){
        let contract = new ethers.Contract(info[0].contractAddress,info[0].contractABI,PROVIDER)
        let balance = await contract.balanceOf(this.props.walletAddress);
            balance = ethers.utils.formatEther(balance) * 10 ** info[0].decimal;
            balance = parseFloat(balance).toFixed(2);
        console.log(balance)
        this.setState({loading : false, balance : balance, decimal : info[0].decimalCorrection});
        }
        else{
            this.setState({loading : false})
        }
        }
    }



    setAPY(apy){
        this.setState({apy : apy});
    }

    setLiquidity(liquidity){
        this.setState({liquidity : liquidity})
    }

    handleClaim(){
        this.setState({claiming : true}, async ()=> {
           let result = await this.props.claim(this.state.currentToken);
           if(result){
            this.forceUpdate()
            this.setState({liquidity : 0.0, claiming : false})
           }else{
            this.setState({claiming : false})
           }
        })
    }

    async handleStake(){
        let result = await this.props.stakeToken(
            ethers.utils.parseEther(
                parseFloat(this.state.depositAmount * 10 ** this.state.decimal).toFixed(2)
            ),
            this.state.currentToken
        );
        if(result){
            this.setState({txSuccess : true,depositModalVisible : false});
            this.forceUpdate()
        }
        else{
            this.setState({error : true});
        }
    }

    render() {
        const { depositModalVisible, txSuccess, txHash, error, depositAmount } = this.state;
        return (
            (this.state.ticker !== "" && this.state.icon !== "") || !this.state.loading ? 
            <div>
                <Navbar
                    active="stake"
					modalVisible={this.props.modalVisible}
					onModalToggle={this.props.onModalToggle}
					theme={this.props.theme}
					onThemeToggle={this.props.onThemeToggle}
					walletConnected={this.props.walletConnected}
					walletAddress = {this.props.walletAddress}
					ethBalance = {this.props.ethBalance}
					vrapBalance = {this.props.vrapBalance}
				/>
                <div style={{display: 'flex', flexDirection: 'column', alignItems : 'center', justifyContent:'center', marginLeft : window.innerWidth < 720 ? '2%' : '0' ,width: window.innerWidth < 720 ? '96%' : '100%', paddingTop: window.innerWidth < 600 ? '30px' : '100px',paddingBottom : window.innerWidth < 600 ? '20px' : '0px', alignItems: 'center', flex: '1 1 0%', zIndex: 1, overflow : 'scroll auto'}}>
                    <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '24px', justifyItems: 'center', maxWidth: '640px', width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', margin: 0, padding: 0, minWidth: 0, width: '100%', gap: '24px'}}>
                            <div className="heading" style={{margin: 0}}>
                                {this.state.ticker} Liquidity Mining
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                                <img width="30px" height="100%" alt={this.state.ticker + " logo"} src={this.state.icon} />
                            </div>
                        </div>
                        <PoolInfo ticker={this.state.ticker} currentToken={this.state.currentToken} setAPY={this.setAPY} />
                        <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '24px', justifyItems: 'center', position: 'relative', maxWidth: '640px', width: '100%', opacity: 1}}>
                            <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '24px', justifyItems: 'center', borderRadius: '12px', width: '100%', position: 'relative'}}>
                                <div className="sale-block-2-outer-container">
                                    <span className="sale-rotation"></span>
                                    <span className="noise"></span>
                                    <LiquidityDeposits walletAddress={this.props.walletAddress} ticker={this.state.ticker} currentToken={this.state.currentToken} setLiquidity={this.setLiquidity} />
                                    <span className="sale-rotation"></span>
                                    <span className="noise"></span>
                                </div>
                                <div className="shaded-container">
                                    <span className="sale-rotation"></span>
                                    <span className="noise"></span>
                                    <Unclaimed ticker={this.state.ticker} currentToken={this.state.currentToken} walletAddress={this.props.walletAddress} liquidity={this.state.liquidity} apy={this.state.apy} />
                                </div>
                            </div>
                            <div className="text-semibold shaded-text" style={{textAlign: 'center', fontSize: '14px'}}>
                                <span role="img" aria-label="wizard-icon" style={{marginRight: '8px'}}>⭐️</span>
                                Your APY is calculated for every second. You can claim your rewards every second.
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', width: '100%', minWidth: 0, margin: '0 0 1rem 0', padding: 0, gap: '12px'}}>
                                {
                                    parseFloat(this.state.liquidity) > 0 && !this.state.claiming ?
                                    <button className="buy-button" onClick={this.props.walletConnected ? () => this.handleClaim() : this.props.onModalOpenRequest}>Claim Now</button>
                                    :
                                    parseFloat(this.state.liquidity) > 0 && this.state.claiming ?
                                    <div className="transaction-status">
                                    <svg style={{position: 'relative', right: '-13px', width: '20px', height: '20px'}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        <span>
                                            Claiming
                                        </span>
                                    </div> 
                                    :
                                    <button className="buy-button" onClick={this.props.walletConnected ? () => this.setState({depositModalVisible: true}) : this.props.onModalOpenRequest}>
                                        Stake Now
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={depositModalVisible}
                    TransitionComponent={Transition}
                    onClose={() => this.setState({depositModalVisible: false, txSuccess: false, error : false})}
                    onBackdropClick={() => this.setState({depositModalVisible: false, txSuccess: false, error : false})}
                    BackdropProps={{style: {backgroundColor: 'rgba(0, 0, 0, 0.3)'}}}
                    PaperProps={{
                        style: {
                            width: '50vw',
                            backgroundColor: '#FFF',
                            boxShadow: 'rgba(47, 128, 237, 0.05) 0px 4px 8px 0px',
                            maxWidth: '420px',
                            maxHeight: '90vh',
                            display: 'flex',
                            borderRadius: '20px',
                            margin: '0 0 2rem'
                        }
                    }}
                >
                {txSuccess ? 
                    <div className="buy-modal-grid">
                      <div className="buy-modal-header">
                        <div className="buy-modal-title">Transaction Successful</div>
                        <svg style={{cursor: 'pointer'}} onClick={() => this.setState({depositModalVisible: false, txSuccess: false})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-jnlKLf fEBVhk"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </div>
                        <p className="connected-wallet-footer-text" style={{width:'80%',marginLeft:'10%',textAlign:'center',lineHeight:'2rem'}}>
                            It takes upto 5 minutes to mine your transaction. Once done your tokens will be automatically credited to your wallet address.
                            If you wish to track your transaction <a href={`https://etherscan.io/tx/${txHash}`} target="_blank">click here</a>
                        </p>
                    </div>
                    :
                    <div className="buy-modal-grid">
                        <div className="buy-modal-header">
                            <div className="buy-modal-title">Deposit</div>
                            <svg style={{cursor: 'pointer'}} onClick={() => this.setState({depositModalVisible: false})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-jnlKLf fEBVhk"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                        {error ?
                        <p className="connected-wallet-footer-text">Error occured while depositing VRAP tokens. Please contact support.</p>
                        :
                        null
                        }
                        <div className="buy-modal-container">
                            <div className="buy-inner-container">
                                <div className="available-deposit-container">
                                    <div className="available-deposit-inner-container">
                                        <div />
                                        <div style={{display: 'inline', cursor: 'pointer'}}>{this.state.balance}</div>
                                    </div>
                                </div>
                                <div className="deposit-input-container">
                                    <input inputMode="decimal" type="text" autoComplete="off" autoCorrect="off" placeholder="0.0" pattern="^[0-9]*[.,]?[0-9]*$" minLength="1" maxLength="79" spellCheck="false" value={depositAmount} onChange={e => this.setState({depositAmount: e.target.value, error : false})} />
                                    <button onClick={()=>this.setState({depositAmount : this.state.balance})} className="max-deposit-button">MAX</button>
                                    <button className="token-select-button">
                                        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <img style={{width: '24px', height: '24px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px'}} class="sc-fZwumE evMpaO" alt="logo" src={this.state.icon} />
                                            <span style={{margin: '0px 0.25rem 0px 0.75rem', fontSize: '20px'}}>{this.state.ticker}</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '20px', paddingLeft: '20px', opacity: 1}}>
                            <div className="received-amount">Daily Rewards</div>
                            <div className="received-amount">
                                {
                                parseFloat(
                                    parseFloat(this.state.apy) * 10 ** -2 * parseFloat(this.state.depositAmount)
                                    / 365
                                ).toFixed(4)
                                } VRAP
                               <span style={{marginLeft:"0.5rem"}}>{this.props.ticker} / Day</span> 
                            </div>
                        </div>
                        
                        <div className="buy-modal-header">
                            <button 
                                disabled={(!depositAmount || parseFloat(depositAmount) === 0 || parseFloat(depositAmount) === 0. || parseFloat(depositAmount) < 0)||(this.props.sapproved || this.props.sapproving)} 
                                className="buy-action-button"
                                onClick={()=>{
                                    this.props.approveStaking(
                                        ethers.utils.parseEther(
                                            parseFloat(this.state.depositAmount * 10 ** this.state.decimal).toFixed(2)
                                        ),
                                        this.state.currentToken
                                    )
                                    }}
                                >
                                {
                                this.props.sapproving ?
                                <div className="transaction-status">
                                   <svg style={{position: 'relative', right: '-13px', width: '20px', height: '20px'}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    <span>
                                        Approving
                                    </span>
                                </div> 
                                :
                                depositAmount ? (parseFloat(depositAmount) === 0 || parseFloat(depositAmount) === 0. || parseFloat(depositAmount) < 0) ? 'Invalid amount' : "Approve" : 'Enter an amount'
                                }
                            </button>
                            <button onClick={()=>{this.handleStake()}} disabled={!this.props.sapproved || this.props.sapproving || this.props.staking} className="buy-action-button">  
                            {
                                this.props.staking ?
                                <div className="transaction-status">
                                   <svg style={{position: 'relative', right: '-13px', width: '20px', height: '20px'}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    <span>
                                        Staking
                                    </span>
                                </div>  
                                :
                                "Stake Now"
                            }
                            </button>
                        </div>
                        <div style={{display: 'grid', gridAutoRows: 'auto', justifyContent: 'center'}}>
                            <div style={{boxSizing: 'border-box', margin: 0, minWidth: 0, display: 'flex', padding: 0, alignItems: 'center', justifyContent: 'space-between', width: '200px'}}>
                                <div style={{width: 'calc(100% - 20px)', display: 'flex', alignItems: 'center'}}>
                                    <div className={`step ${this.props.approved && 'step-active'}`}>1</div>
                                    <div className="step-bar"></div>
                                </div>
                                <div className={`step ${txSuccess && 'step-active'}`}>2</div>
                            </div>
                        </div>
                    </div>}
                </Dialog>
            </div> : null
        )
    }
}
