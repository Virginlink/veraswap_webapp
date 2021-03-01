import { Dialog, Fade } from '@material-ui/core'
import { notification, Tooltip } from 'antd';
import ETH from '../../assets/images/eth.png';
import BUSD from '../../assets/images/busd.png';
import React, { Component } from 'react'
import Countdown from 'react-countdown'
import {PRESALE_ABI,PRESALE_ADDRESS,PROVIDER} from '../../utils/contracts';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{enter: 1000, exit: 2000}} ref={ref} {...props} />;
});
const {ethers} = require('ethers');

const SuccessIcon = (
    <div style={{color: 'rgb(39, 174, 96)'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" style={{position: 'relative', top: '4px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" color="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    </div> 
)
export default class Sale extends Component {

    constructor() {
        super()
        this.state = {
            buyModalVisible: false,
            depositAmount: '',
            tokensModalVisible: false,
            fetchingBalance: false,
            phase : '',
            price : '',
            currentToken : 'ETH',
            ethPrice : '',
            txSuccess : false,
            txHash : '',
            error  : false
        }
    }

    componentDidMount(){
        this.fetchPhase()
        this.fetchPrice()
        this.props.fetchBalance()
        this.fetchEthPrice()
    }

    async fetchPhase(){
        let contract = new ethers.Contract(PRESALE_ADDRESS,PRESALE_ABI,PROVIDER);
        let phase = await contract.salePhase();
        this.setState({phase : phase})
    }

    async fetchPrice(){
        let contract = new ethers.Contract(PRESALE_ADDRESS,PRESALE_ABI,PROVIDER);
        let price = await contract.getCurrentSalePrice();
            price = ethers.utils.formatEther(price) * 10 ** 12;
        this.setState({price : price})
    }

    fetchEthPrice(){
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson)
            this.setState({ethPrice : resJson.binancecoin.usd})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    async handleEthBuy(){
       let status = await this.props.buyWithEther(this.state.depositAmount);
       if(status !== false){
            const hashArrayString = localStorage.getItem('hashData');
            const tx = {
                hash: status,
                amount: parseFloat(this.state.depositAmount).toFixed(4),
                summary: `Buy VRAP with ${parseFloat(this.state.depositAmount).toFixed(4)} BNB`
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
            notification['info']({
                message: `Buy VRAP with ${parseFloat(this.state.depositAmount).toFixed(4)} BNB`,
                duration: 0,
                icon: SuccessIcon,
                btn: (<a href={`https://bscscan.com/tx/${status}`} target="_blank" rel="noreferrer noopener">View on Explorer</a>)
            })
            this.setState({txSuccess : true, txHash : status})
       }
       else {
           this.setState({txSuccess : false, error : true})
       }
    }

    async handleTetherBuy(){
        let status = await this.props.buyWithTether(this.state.depositAmount);
        if(status !== false){
            const hashArrayString = localStorage.getItem('hashData');
            const tx = {
                hash: status,
                amount: parseFloat(this.state.depositAmount).toFixed(4),
                summary: `Buy VRAP with ${parseFloat(this.state.depositAmount).toFixed(4)} BUSD`
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
            notification['info']({
                message: `Buy VRAP with ${parseFloat(this.state.depositAmount).toFixed(4)} BUSD`,
                duration: 0,
                icon: SuccessIcon,
                btn: (<a href={`https://bscscan.com/tx/${status}`} target="_blank" rel="noreferrer noopener">View on Explorer</a>)
            })
            this.setState({txSuccess : true, txHash : status})
        }
        else {
            this.setState({txSuccess : false, error : true})
        } 
    }

    returnDate = ({days, hours, minutes, seconds}) => {
        return (
            <code style={{fontFamily: 'monospace', marginLeft: '5px'}}>{days.toString().length > 1 ? days : `0${days}`}:{hours.toString().length > 1 ? hours : `0${hours}`}:{minutes.toString().length > 1 ? minutes : `0${minutes}`}:{seconds.toString().length > 1 ? seconds : `0${seconds}`}</code>
        )
    }

    render() {
        const { buyModalVisible, depositAmount, tokensModalVisible, fetchingBalance} = this.state;
        return (
            <div className="sale-main-container">
                <div className="empty-grid"></div>
                <div className="sale-grid-container">
                    <div className="sale-block-outer-container-wrapper" style={{gap: '24px'}}>
                        <div className="sale-block-outer-container">
                            <span className="sale-rotation"></span>
                            <span className="noise"></span>
                            <div className="sale-block-inner-grid-wrapper">
                                <div className="sale-block-inner-grid">
                                    <div className="sale-block-title-container">
                                        <div className="sale-block-title">
                                            VeraSwap token sale
                                        </div>
                                    </div>
                                    <div className="sale-block-content-container">
                                        <div className="sale-block-content">
                                        The VRAP Public Crowdsale will consist of 3 rounds with different prices ranging from $0.05 to $0.075 to allow more community members to participate in the sale. When the first round is sold out, the second round will begin immediately. Your tokens are distributed immediately to your wallet.                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="sale-rotation"></span>
                            <span className="noise"></span>
                        </div>
                    </div>
                    <div className="countdown-container">
                        <div className="countdown">
                            Pre Sale Round {this.state.phase} (${parseFloat(this.state.price).toFixed(3)} per VRAP) ends in <Countdown date={new Date(1615507200000)} renderer={this.returnDate} />
                        </div>
                    </div>
                    <div className="sale-block-outer-container-wrapper" style={{gap: '24px'}}>
                        <div className="sale-block-2-outer-container">
                            <span className="sale-rotation"></span>
                            <span className="noise"></span>
                            <div className="sale-block-inner-grid-wrapper">
                                <div className="sale-block-inner-grid">
                                    <div className="sale-block-title-container">
                                        <div className="sale-block-title">
                                            Your balance
                                        </div>
                                    </div>
                                    <div className="sale-block-content-container" style={{alignItems: 'baseline'}}>
                                        <div className="balance">
                                            {this.props.vrapBalance === "" ? "-" : parseFloat(this.props.vrapBalance).toFixed(3)}
                                        </div>
                                        <div className="sale-block-title">
                                            VRAP
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="sale-rotation"></span>
                            <span className="noise"></span>
                        </div>
                    </div>
                    <div className="buy-container" style={{marginBottom: '1rem'}}>
                        <button className="buy-button" onClick={this.props.walletConnected ? () => this.setState({buyModalVisible: true}) : this.props.onModalOpenRequest}>Buy Now</button>
                        {/* <button className="buy-button" onClick={ () => notification['info']({message : 'Purchase is under maintainance. Please come back after some time.'})}>
                            Buy Now
                        </button> */}
                    </div>
                </div>
                <Dialog
                    open={buyModalVisible}
                    TransitionComponent={Transition}
                    onClose={() => this.setState({buyModalVisible: false, txSuccess: false, error : false})}
                    onBackdropClick={() => this.setState({buyModalVisible: false, txSuccess: false, error : false})}
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
                {this.state.txSuccess ? 
                    <div className="buy-modal-grid">
                      <div className="buy-modal-header">
                        <div className="buy-modal-title">Transaction Successful</div>
                        <svg style={{cursor: 'pointer'}} onClick={() => this.setState({buyModalVisible: false, txSuccess: false})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-jnlKLf fEBVhk"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </div>
                        <p className="connected-wallet-footer-text" style={{width:'80%',marginLeft:'10%',textAlign:'center',lineHeight:'2rem'}}>
                            It takes upto 5 minutes to mine your transaction. Once done your tokens will be automatically credited to your wallet address.
                            If you wish to track your transaction <a href={`https://bscscan.com/tx/${this.state.txHash}`} target="_blank">click here</a>
                        </p>
                    </div>
                    :
                    <div className="buy-modal-grid">
                        <div className="buy-modal-header">
                            <div className="buy-modal-title">Buy VRAP with {this.state.currentToken === "ETH" ? "BNB" : this.state.currentToken}</div>
                            <svg style={{cursor: 'pointer'}} onClick={() => this.setState({buyModalVisible: false})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-jnlKLf fEBVhk"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                        {this.state.error ?
                        <p className="connected-wallet-footer-text">Error occured while purchasing VRAP tokens. Please contact support.</p>
                        :
                        null
                        }
                        <div className="buy-modal-container">
                            <div className="buy-inner-container">
                                <div className="available-deposit-container">
                                    <div className="available-deposit-inner-container">
                                        <div />
                                        <div style={{display: 'inline', cursor: 'pointer'}}>Available to deposit: {this.state.currentToken === "ETH" ? parseFloat(this.props.ethBalance).toFixed(4) : parseFloat(this.props.usdtBalance).toFixed(4) }</div>
                                    </div>
                                </div>
                                <div className="deposit-input-container">
                                    <input inputMode="decimal" type="text" autoComplete="off" autoCorrect="off" placeholder="0.0" pattern="^[0-9]*[.,]?[0-9]*$" minLength="1" maxLength="79" spellCheck="false" value={depositAmount} onChange={e => this.setState({depositAmount: e.target.value, error : false})} />
                                    <button className="max-deposit-button" onClick={()=>{this.setState({depositAmount : this.state.currentToken === "ETH" ? this.props.ethBalance : this.props.usdtBalance,error : false})}}>MAX</button>
                                    <button className="token-select-button" onClick={() => this.setState({tokensModalVisible: true, buyModalVisible: false})}>
                                      {
                                        this.state.currentToken === "ETH" ?
                                        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <img style={{width: '24px', height: '24px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px'}} class="sc-fZwumE evMpaO" alt="BNB logo" src={ETH} />
                                            <span style={{margin: '0px 0.25rem 0px 0.75rem', fontSize: '20px'}}>BNB</span>
                                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{margin: '0px 0.25rem 0px 0.5rem', height: '35%'}}><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
                                        </span>
                                        :
                                        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <img style={{width: '24px', height: '24px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px'}} class="sc-fZwumE evMpaO" alt="BUSD logo" src={BUSD} />
                                            <span style={{margin: '0px 0.25rem 0px 0.75rem', fontSize: '20px'}}>BUSD</span>
                                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{margin: '0px 0.25rem 0px 0.5rem', height: '35%'}}><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
                                        </span>
                                      }
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '20px', paddingLeft: '20px', opacity: 1}}>
                            <div className="received-amount">VRAP receive</div>
                            {
                                this.state.currentToken === "ETH" ?
                                <div className="received-amount">
                                    {
                                    parseFloat(this.state.depositAmount) < 0 ?
                                    0 : parseFloat(this.state.depositAmount) === 0 ? 0 : parseFloat(this.state.depositAmount) === 0. ? 0 :
                                     isNaN(parseFloat( (parseFloat(this.state.depositAmount) * parseFloat(this.state.ethPrice)) / parseFloat(this.state.price) ).toFixed(4)) ?
                                     0.0000 :
                                     parseFloat( (parseFloat(this.state.depositAmount) * parseFloat(this.state.ethPrice)) / parseFloat(this.state.price) ).toFixed(4)
                                    }
                                   <span style={{marginLeft:"0.5rem"}}>VRAP</span> 
                                </div>
                                :
                                <div className="received-amount">
                                    {
                                        parseFloat(this.state.depositAmount) < 0 ?
                                        0 : parseFloat(this.state.depositAmount) === 0 ? 0 : parseFloat(this.state.depositAmount) === 0. ? 0 :
                                      isNaN(parseFloat(parseFloat(this.state.depositAmount) / parseFloat(this.state.price) ).toFixed(4))
                                      ?
                                      0.0000
                                      :
                                      parseFloat(parseFloat(this.state.depositAmount) / parseFloat(this.state.price) ).toFixed(4)
                                    }
                                   <span style={{marginLeft:"0.5rem"}}>VRAP</span> 
                                </div>
                            }
                        </div>
                        {this.state.currentToken === "ETH" ? 
                        <div className="buy-modal-header">
                        {this.props.ethBuying ? 
                            <button className="buy-action-button" disabled={true}>
                                <div className="transaction-status">
                                <svg style={{position: 'relative', right: '-13px', width: '20px', height: '20px'}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                <span>
                                    Purchasing
                                </span>
                                </div>  
                            </button>                           
                            :
                            <button disabled={!this.state.depositAmount || parseFloat(this.state.depositAmount) === 0 || parseFloat(this.state.depositAmount) === 0. || parseFloat(this.state.depositAmount) < 0} onClick={()=>{this.handleEthBuy()}} className="buy-action-button">{this.state.depositAmount ? (parseFloat(this.state.depositAmount) === 0 || parseFloat(this.state.depositAmount) === 0. || parseFloat(this.state.depositAmount) < 0) ? 'Invalid amount' : "Buy Now" : 'Enter an amount'}</button>
                            }
                        </div>
                        :
                        <div className="buy-modal-header">
                            <button 
                                disabled={(!this.state.depositAmount || parseFloat(this.state.depositAmount) === 0 || parseFloat(this.state.depositAmount) === 0. || parseFloat(this.state.depositAmount) < 0)||(this.props.approved || this.props.approving)} 
                                className="buy-action-button"
                                onClick={()=>{this.props.approveTether(this.state.depositAmount)}}
                                >
                                {
                                this.props.approving ?
                                <div className="transaction-status">
                                   <svg style={{position: 'relative', right: '-13px', width: '20px', height: '20px'}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                    <span>
                                        Approving
                                    </span>
                                </div> 
                                :
                                this.state.depositAmount ? (parseFloat(this.state.depositAmount) === 0 || parseFloat(this.state.depositAmount) === 0. || parseFloat(this.state.depositAmount) < 0) ? 'Invalid amount' : "Approve" : 'Enter an amount'
                                }
                            </button>
                            <button onClick={()=>{this.handleTetherBuy()}} disabled={!this.props.approved || this.props.approving} className="buy-action-button">Buy Now</button>
                        </div>
                        }
                        {
                            this.state.currentToken === "ETH" ?
                            null :
                            <div style={{display: 'grid', gridAutoRows: 'auto', justifyContent: 'center'}}>
                            <div style={{boxSizing: 'border-box', margin: 0, minWidth: 0, display: 'flex', padding: 0, alignItems: 'center', justifyContent: 'space-between', width: '200px'}}>
                                <div style={{width: 'calc(100% - 20px)', display: 'flex', alignItems: 'center'}}>
                                    <div className={`step ${this.props.approved && 'step-active'}`}>1</div>
                                    <div className="step-bar"></div>
                                </div>
                                <div className={`step ${this.state.txSuccess && 'step-active'}`}>2</div>
                            </div>
                        </div>
                        }
                    </div>}
                </Dialog>
                <Dialog
                    open={tokensModalVisible}
                    TransitionComponent={Transition}
                    onClose={() => this.setState({tokensModalVisible: false, buyModalVisible: true, error : false})}
                    onBackdropClick={() => this.setState({tokensModalVisible: false, buyModalVisible: true , error : false})}
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
                    <div className="tokens-modal-container" style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', flex: '1 1 0%'}}>
                        <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '14px'}}>
                            <div className="buy-modal-header" style={{padding: '10px 20px 0 20px'}}>
                                <div className="tokens-modal-title">
                                    Select a token
                                    <span style={{marginLeft: '4px'}}>
                                        <div style={{display: 'inline-block', paddingTop: '5px'}}>
                                            <Tooltip overlayStyle={{zIndex: 1500}} overlayClassName="tooltip-card" arrowPointAtCenter placement="bottom" title={"Find a token by searching for its name or symbol or by pasting its address below."}>
                                                <div className="info-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </span>
                                </div>
                                <svg style={{cursor: 'pointer'}} onClick={() => this.setState({buyModalVisible: true, tokensModalVisible: false})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-jnlKLf fEBVhk"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </div>
                            <div className="modal-divider" />
                            <div style={{position: 'relative', flex: '1 1 0%', marginTop: '-1rem'}}>
                                    <div style={{position: 'relative', height: '556px', width: '100%', overflow: 'auto', willChange: 'transform', direction: 'ltr'}}>
                                        <div style={{width: '100%'}}>
                                            <div onClick={()=>{this.setState({currentToken : "BUSD",tokensModalVisible : false,buyModalVisible : true})}} className={this.state.currentToken === "ETH" ? "individual-token" : "individual-token token-disabled"}>
                                                <img style={{width: '24px', height: '24px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px'}} alt="BUSD logo" src={BUSD} />
                                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                                                    <div className="token-title">BUSD</div>
                                                </div>
                                                <span></span>
                                                <div style={{display: 'flex', justifyContent: 'flex-end', margin: 0, padding: 0, minWidth: 0, boxSizing: 'border-box', alignItems: 'center', width: 'fit-content'}}>
                                                    {
                                                        fetchingBalance ?

                                                        <div className="connection-status">
                                                            <svg style={{position: 'relative', right: '-22px', width: '20px', height: '20px'}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                        </div>

                                                        :

                                                        <div className="token-title" style={{position: 'absolute', right: '10px'}}>{parseFloat(this.props.usdtBalance).toFixed(4)}</div>
                                                    }
                                                </div>
                                            </div>
                                            <div onClick={()=>{this.setState({currentToken : "ETH",tokensModalVisible : false, buyModalVisible : true})}} className={this.state.currentToken === "BUSD" ? "individual-token" : "individual-token token-disabled"}>
                                                <img style={{width: '24px', height: '24px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px'}} alt="BNB logo" src={ETH} />
                                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                                                    <div className="token-title">BNB</div>
                                                </div>
                                                <span></span>
                                                <div style={{display: 'flex', justifyContent: 'flex-end', margin: 0, padding: 0, minWidth: 0, boxSizing: 'border-box', alignItems: 'center', width: 'fit-content'}}>
                                                    {
                                                        fetchingBalance ?

                                                        <div className="connection-status">
                                                            <svg style={{position: 'relative', right: '-22px', width: '20px', height: '20px'}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                        </div>

                                                        :

                                                        <div className="token-title" style={{position: 'absolute', right: '10px'}}>{parseFloat(this.props.ethBalance).toFixed(4)}</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}
