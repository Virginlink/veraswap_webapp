import { Dialog, Fade } from '@material-ui/core'
import { Tooltip } from 'antd';
import React, { Component } from 'react'
import Countdown from 'react-countdown'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{enter: 1000, exit: 2000}} ref={ref} {...props} />;
});

export default class Sale extends Component {

    constructor() {
        super()
        this.state = {
            walletConnected: false,
            buyModalVisible: false,
            depositAmount: '',
            tokensModalVisible: false,
            fetchingBalance: false,
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.walletConnected !== nextProps.walletConnected) {
    //         return {
    //             walletConnected: nextProps.walletConnected
    //         }
    //     }
    //     return null
    // }

    returnDate = ({days, hours, minutes, seconds}) => {
        return (
            <code style={{fontFamily: 'monospace', marginLeft: '5px'}}>{days.toString().length > 1 ? days : `0${days}`}:{hours.toString().length > 1 ? hours : `0${hours}`}:{minutes.toString().length > 1 ? minutes : `0${minutes}`}:{seconds.toString().length > 1 ? seconds : `0${seconds}`}</code>
        )
    }

    render() {
        const {walletConnected, buyModalVisible, depositAmount, tokensModalVisible, fetchingBalance} = this.state;
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
                                            Veraswap token sale
                                        </div>
                                    </div>
                                    <div className="sale-block-content-container">
                                        <div className="sale-block-content">
                                            The VRAP Public Crowdsale will consist of 3 rounds with different prices ranging from $0.05 to $0.12 to allow more community members to participate in the sale. When the first round is sold out, the second round will begin immediately. Your tokens are distributed immediately to your wallet.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="sale-rotation"></span>
                            <span className="noise"></span>
                        </div>
                    </div>
                    <div className="countdown-container">
                        <div className="countdown">
                            Public Sale Round 1 ($0.05 per VRAP) ends in <Countdown date={new Date(1612119600000)} renderer={this.returnDate} />
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
                                            _
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
                        <button className="buy-button" onClick={walletConnected ? () => this.setState({buyModalVisible: true}) : this.props.onModalOpenRequest}>Buy Now</button>
                    </div>
                </div>
                <Dialog
                    open={buyModalVisible}
                    TransitionComponent={Transition}
                    onClose={() => this.setState({buyModalVisible: false})}
                    onBackdropClick={() => this.setState({buyModalVisible: false})}
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
                    <div className="buy-modal-grid">
                        <div className="buy-modal-header">
                            <div className="buy-modal-title">Buy MOON with USDT</div>
                            <svg style={{cursor: 'pointer'}} onClick={() => this.setState({buyModalVisible: false})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-jnlKLf fEBVhk"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                        <div className="buy-modal-container">
                            <div className="buy-inner-container">
                                <div className="available-deposit-container">
                                    <div className="available-deposit-inner-container">
                                        <div />
                                        <div style={{display: 'inline', cursor: 'pointer'}}>Available to deposit: 0.000</div>
                                    </div>
                                </div>
                                <div className="deposit-input-container">
                                    <input inputMode="decimal" type="text" autoComplete="off" autoCorrect="off" placeholder="0.0" pattern="^[0-9]*[.,]?[0-9]*$" minLength="1" maxLength="79" spellCheck="false" value={depositAmount} onChange={e => this.setState({depositAmount: e.target.value})} />
                                    <button className="max-deposit-button">MAX</button>
                                    <button className="token-select-button" onClick={() => this.setState({tokensModalVisible: true, buyModalVisible: false})}>
                                        <span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <img style={{width: '24px', height: '24px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px'}} class="sc-fZwumE evMpaO" alt="USDT logo" src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png" />
                                            <span style={{margin: '0px 0.25rem 0px 0.75rem', fontSize: '20px'}}>USDT</span>
                                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" style={{margin: '0px 0.25rem 0px 0.5rem', height: '35%'}}><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingRight: '20px', paddingLeft: '20px', opacity: 1}}>
                            <div className="received-amount">MOON receive</div>
                            <div className="received-amount">0 MOON</div>
                        </div>
                        <div className="buy-modal-header">
                            <button disabled className="buy-action-button">Approve</button>
                            <button disabled className="buy-action-button">Enter an amount</button>
                        </div>
                        <div style={{display: 'grid', gridAutoRows: 'auto', justifyContent: 'center'}}>
                            <div style={{boxSizing: 'border-box', margin: 0, minWidth: 0, display: 'flex', padding: 0, alignItems: 'center', justifyContent: 'space-between', width: '200px'}}>
                                <div style={{width: 'calc(100% - 20px)', display: 'flex', alignItems: 'center'}}>
                                    <div className="step">1</div>
                                    <div className="step-bar"></div>
                                </div>
                                <div className="step">2</div>
                            </div>
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    open={tokensModalVisible}
                    TransitionComponent={Transition}
                    onClose={() => this.setState({tokensModalVisible: false, buyModalVisible: true})}
                    onBackdropClick={() => this.setState({tokensModalVisible: false, buyModalVisible: true})}
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
                                            <div className="individual-token">
                                                <img style={{width: '24px', height: '24px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px'}} alt="USDT logo" src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png" />
                                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                                                    <div className="token-title">USDT</div>
                                                </div>
                                                <span></span>
                                                <div style={{display: 'flex', justifyContent: 'flex-end', margin: 0, padding: 0, minWidth: 0, boxSizing: 'border-box', alignItems: 'center', width: 'fit-content'}}>
                                                    {
                                                        fetchingBalance ?

                                                        <div className="connection-status">
                                                            <svg style={{position: 'relative', right: '-22px', width: '20px', height: '20px'}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                        </div>

                                                        :

                                                        <div className="token-title" style={{whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '5rem', textOverflow: 'ellipsis', textAlign: 'right', position: 'relative', right: '-22px'}}>0.000</div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="individual-token token-disabled">
                                                <img style={{width: '24px', height: '24px', borderRadius: '24px', boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px'}} alt="USDC logo" src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" />
                                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                                                    <div className="token-title">USDC</div>
                                                </div>
                                                <span></span>
                                                <div style={{display: 'flex', justifyContent: 'flex-end', margin: 0, padding: 0, minWidth: 0, boxSizing: 'border-box', alignItems: 'center', width: 'fit-content'}}>
                                                    {
                                                        fetchingBalance ?

                                                        <div className="connection-status">
                                                            <svg style={{position: 'relative', right: '-22px', width: '20px', height: '20px'}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                                        </div>

                                                        :

                                                        <div className="token-title" style={{whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '5rem', textOverflow: 'ellipsis', textAlign: 'right', position: 'relative', right: '-22px'}}>0.000</div>
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
