import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Logo from '../assets/images/logo.png'
import { Dialog, Fade } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{enter: 1000, exit: 2000}} ref={ref} {...props} />;
});

export default class StakeDeposit extends Component {
    constructor() {
        super()
        this.state = {
            depositModalVisible: false,
            txSuccess: false,
            error: false,
            txHash: '',
            depositAmount: '',
        }
    }

    render() {
        const { depositModalVisible, txSuccess, txHash, error, depositAmount } = this.state;
        return (
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
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '100px', alignItems: 'center', flex: '1 1 0%', overflow: 'scroll', zIndex: 1, paddingLeft: '0.5rem', paddingRight: '0.5rem'}} className="stake-deposit-container">
                    <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '24px', justifyItems: 'center', maxWidth: '640px', width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', margin: 0, padding: 0, minWidth: 0, width: '100%', gap: '24px'}}>
                            <div className="heading" style={{margin: 0}}>
                                VRAP Liquidity Mining
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                                <img width="30px" height="100%" alt="VRAP logo" src={Logo} />
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', margin: 0, padding: 0, minWidth: 0, width: '100%', gap: '24px'}}>
                            <div className="outlined-box">
                                <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '8px'}}>
                                    <div className="text-regular" style={{fontSize: '16px', marginBottom: '-5px'}}>Total deposits</div>
                                    <div className="text-semibold" style={{fontSize: '24px'}}>_</div>
                                </div>
                            </div>
                            <div className="outlined-box">
                                <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '8px'}}>
                                    <div className="text-regular" style={{fontSize: '16px', marginBottom: '-5px'}}>Pool Rate</div>
                                    <div className="text-semibold" style={{fontSize: '24px'}}>_</div>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '24px', justifyItems: 'center', position: 'relative', maxWidth: '640px', width: '100%', opacity: 1}}>
                            <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '24px', justifyItems: 'center', borderRadius: '12px', width: '100%', position: 'relative'}}>
                                <div className="sale-block-2-outer-container">
                                    <span className="sale-rotation"></span>
                                    <span className="noise"></span>
                                    <div className="sale-block-inner-grid-wrapper">
                                        <div className="sale-block-inner-grid">
                                            <div className="sale-block-title-container">
                                                <div className="sale-block-title">
                                                    Your liquidity deposits
                                                </div>
                                            </div>
                                            <div className="sale-block-content-container" style={{alignItems: 'baseline'}}>
                                                <div className="balance">
                                                    0
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
                                <div className="shaded-container">
                                    <span className="sale-rotation"></span>
                                    <span className="noise"></span>
                                    <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '8px'}}>
                                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', width: '100%', margin: 0, padding: 0, minWidth: 0}}>
                                            <div>
                                                <div className="text-semibold" style={{fontSize: '16px'}}>Your unclaimed VRAP</div>
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', boxSizing: 'border-box', width: '100%', margin: 0, padding: 0, minWidth: 0}}>
                                            <div className="text-semibold-2x" style={{fontSize: '36px'}}>0.0000</div>
                                            <div className="text-semibold" style={{fontSize: '16px'}}>
                                                <span role="img" aria-label="wizard-icon" style={{marginRight: '8px'}}>⚡</span>
                                                0 VRAP / day
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-semibold shaded-text" style={{textAlign: 'center', fontSize: '14px'}}>
                                <span role="img" aria-label="wizard-icon" style={{marginRight: '8px'}}>⭐️</span>
                                When you withdraw, the contract will automatically claim MOON on your behalf!
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', width: '100%', minWidth: 0, margin: '0 0 1rem 0', padding: 0, gap: '12px'}}>
                                <button className="buy-button" onClick={this.props.walletConnected ? () => this.setState({depositModalVisible: true}) : this.props.onModalOpenRequest}>Deposit</button>
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
                                        <div style={{display: 'inline', cursor: 'pointer'}}>_</div>
                                    </div>
                                </div>
                                <div className="deposit-input-container">
                                    <input inputMode="decimal" type="text" autoComplete="off" autoCorrect="off" placeholder="0.0" pattern="^[0-9]*[.,]?[0-9]*$" minLength="1" maxLength="79" spellCheck="false" value={depositAmount} onChange={e => this.setState({depositAmount: e.target.value, error : false})} />
                                    <button className="max-deposit-button">MAX</button>
                                    <button className="token-select-button">
                                        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <img style={{width: '24px', height: '24px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px'}} class="sc-fZwumE evMpaO" alt="ETH logo" src={Logo} />
                                            <span style={{margin: '0px 0.25rem 0px 0.75rem', fontSize: '20px'}}>VRAP</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '20px', paddingLeft: '20px', opacity: 1}}>
                            <div className="received-amount">Daily Rewards</div>
                            <div className="received-amount">
                                0
                               <span style={{marginLeft:"0.5rem"}}>VRAP / day</span> 
                            </div>
                        </div>
                        
                        <div className="buy-modal-header">
                            <button 
                                disabled={(!depositAmount || parseFloat(depositAmount) === 0 || parseFloat(depositAmount) === 0. || parseFloat(depositAmount) < 0)||(this.props.approved || this.props.approving)} 
                                className="buy-action-button"
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
                                depositAmount ? (parseFloat(depositAmount) === 0 || parseFloat(depositAmount) === 0. || parseFloat(depositAmount) < 0) ? 'Invalid amount' : "Approve" : 'Enter an amount'
                                }
                            </button>
                            <button onClick={()=>{this.handleTetherBuy()}} disabled={!this.props.approved || this.props.approving} className="buy-action-button">Buy Now</button>
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
            </div>
        )
    }
}
