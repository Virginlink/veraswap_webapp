import React, { Component } from 'react'
import { Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import { ClickAwayListener, Dialog, Fade } from '@material-ui/core';
import Logo from '../assets/images/logo.png';
import AppContext from '../state/AppContext';
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade timeout={{enter: 1000, exit: 2000}} ref={ref} {...props} />;
});

class Navbar extends Component {
    static contextType = AppContext;

    constructor() {
        super()
        this.state={
            loggedIn: false,
            moonBalance: '',
            moonModalVisible: false,
            connectModalVisible: false,
            settingsVisible: false,
            localSlippage: '',
            slippage: '',
            deadline: '',
            expertModeOn: false,
            expertModeConfirmationModalVisible: false,
            theme: 'light',
            moreLinksVisible: false,
            claimModalVisible: false,
            walletAddress: '',
            addressValid: false,
            addressError: false,
        }
    }

    componentDidMount() {
        const expertMode = localStorage.getItem('expertMode')
        if (expertMode && expertMode === 'true') {
            this.setState({expertModeOn: true})
        }
        this.setState({theme: this.props.theme})
        const { deadline, slippage } = this.context;
        this.setState({
            deadline: deadline,
            slippage: slippage
        })
    }

    componentDidUpdate() {
        const { deadline, slippage } = this.context;
        if (deadline !== this.state.deadline) {
            this.setState({
                deadline: deadline
            })
        }
        if (slippage !== this.state.slippage) {
            this.setState({
                slippage: slippage
            })
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.theme !== nextProps.theme) {
            return {
                theme: nextProps.theme
            }
        } else if (prevState.modalVisible !== nextProps.modalVisible) {
            return {
                connectModalVisible: nextProps.modalVisible
            }
        }
        return null
    }

    handleSlippageChange = e => {
        const { updateSlippage } = this.context
        if (e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
            this.setState({slippage: e.target.value, localSlippage: e.target.value}, () => updateSlippage(e.target.value))
        }
    }

    handleDeadlineChange = e => {
        if (e.target.value.match(/^[0-9]*$/)) {
            this.setState({deadline: e.target.value})
        }
    }

    handleExpertModeToggle = () => {
        if (this.state.expertModeOn) {
            this.setState({expertModeOn: false}, () => localStorage.setItem('expertMode', 'false'))
        } else {
            this.setState({
                settingsVisible: false,
                expertModeConfirmationModalVisible: true
            })
        }
    }

    turnOnExpertMode = () => {
        const promptValue = prompt('Please type the word "confirm" to enable expert mode.')
        if (promptValue === 'confirm') {
            this.setState({
                expertModeOn: true,
                expertModeConfirmationModalVisible: false
            }, () => localStorage.setItem('expertMode', 'true'))
        }
    }

    handleMenuClose = () => {
        const { updateDeadline, updateSlippage } = this.context;
        const { localDeadline, slippage, localSlippage } = this.state;
        this.setState({settingsVisible: false}, () => {
            if (localDeadline) {
                setTimeout(
                    () => {
                        updateDeadline(localDeadline)
                        this.setState({localDeadline: ''})
                    },
                    500
                )
            }
            if (parseFloat(slippage) < 0.1) {
                updateSlippage("0.5")
            }
            if (localSlippage) {
                setTimeout(
                    () => {
                        this.setState({localSlippage: ''})
                    },
                    500
                )
            }
        })
    }

    render() {
        const {moonModalVisible, settingsVisible, slippage, deadline, expertModeOn, expertModeConfirmationModalVisible, theme, moreLinksVisible, walletConnected, loggedIn, claimModalVisible, walletAddress, addressValid, moonBalance, addressError, localSlippage} = this.state;
        return (
            <div className="navbar-container">
                <div className="navbar">
                    <div  className="navbar-pages-main-container">
                        <a href="." className="navbar-logo-outer-container">
                            <div className="navbar-logo-inner-container">
                                <img src={Logo} alt="logo" />
                            </div>
                        </a>
                        <div className="navbar-pages-container">
                            <a className={`${this.props.active === 'sale' && 'active-page'}`} onClick={() => this.props.history.push('/sale')}>Sale</a>
                            <a className={`${this.props.active === 'stake' && 'active-page'}`} onClick={() => this.props.history.push('/stake')}>Stake</a>
                            <a className={`${this.props.active === 'swap' && 'active-page'}`} onClick={() => this.props.history.push('/swap')} id="swap-nav-link">Swap</a>
                            <a className={`${this.props.active === 'pool' && 'active-page'}`} onClick={() => this.props.history.push('/pool')} id="pool-nav-link">Pool</a>
                        </div>
                    </div>
                    <div className="navbar-actions-main-container">
                        <div className="navbar-actions-1">
                            {
                                this.props.network && 

                                <button disabled style={{cursor: 'default'}} className="navbar-action-button network">
                                    Kovan
                                </button>
                            }
                            <span className="moon-button-container" onClick={() => this.setState({moonModalVisible: true})}>
                                <div className="moon-button">
                                    {this.props.vrapBalance === '' ? "VRAP" : parseFloat(this.props.vrapBalance).toFixed(3) + " VRAP"} 
                                </div>
                                <div className="moon-button hidden-tablet">
                                    VRAP
                                </div>
                                <span className="noise" />
                            </span>
                            {
                                this.props.walletConnected ?

                                <div className="wallet-details-container">
                                    <div className="wallet-balance" style={{flexShrink: 0}}>
                                        {this.props.ethBalance === '' ? 0.00 : parseFloat(this.props.ethBalance).toFixed(3)} BNB
                                    </div>
                                    <button className="wallet-address-button" onClick={this.props.onModalToggle}>
                                        <p>{`${this.props.walletAddress}`.substring(0,6) + '...' + `${this.props.walletAddress}`.substring(37,42)}</p>
                                        <div style={{borderRadius: '50px', overflow: 'hidden', padding: 0, margin: 0, width: '16px', height: '16px', display: 'inline-block'}}>
											<svg height="100" version="1.1" width="100" xmlns="http://www.w3.org/2000/svg"  xmlnsXlink="http://www.w3.org/1999/xlink" style={{overflow: 'hidden', position: 'relative'}}><defs style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></defs><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#f91e01" stroke="none" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#c81465" stroke="none" transform="matrix(0.6111,-0.7916,0.7916,0.6111,-5.5477,11.7858)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#237fe1" stroke="none" transform="matrix(-0.7983,-0.6023,0.6023,-0.7983,1.3671,25.6874)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect><rect x="0" y="0" width="16" height="16" rx="0" ry="0" fill="#18b7f2" stroke="none" transform="matrix(0.9689,-0.2476,0.2476,0.9689,-13.2583,-0.0478)" style={{WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></rect></svg>
										</div>
                                    </button>
                                </div>

                                :

                                <div className="connect-to-wallet-container" onClick={this.props.onModalToggle}>
                                    <button className="connect-to-wallet-button">
                                        <p>Connect to a wallet</p>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="navbar-actions-2">
                            <div className="navbar-action-button-container">
                                <button className="navbar-action-button" onClick={() => this.setState({settingsVisible: true})}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-gGBfsJ gUfwRq">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                    </svg>
                                    {
                                        expertModeOn &&

                                        <div className="expert-mode-icon">
                                            <span role="img" aria-label="wizard-icon">🧙</span>
                                        </div>
                                    }
                                </button>
                                {settingsVisible && (
                                    <ClickAwayListener onClickAway={this.handleMenuClose}>
                                        <span className="settings-menu">
                                            <div className="grid" style={{padding: '1rem'}}>
                                                <div className="settings-title">Transaction Settings</div>
                                                <div className="grid">
                                                    <div className="grid-8px">
                                                        <div className="settings-option-container">
                                                            <div className="settings-option-title">Slippage tolerance</div>
                                                            <span style={{marginLeft: '4px'}}>
                                                                <div style={{display: 'inline-block'}}>
                                                                    <Tooltip overlayClassName="tooltip-card" arrowPointAtCenter placement="left" title={"Your transaction will revert if the price changes unfavorably by more than this percentage."}>
                                                                        <div className="info-icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                                                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                                                            </svg>
                                                                        </div>
                                                                    </Tooltip>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div className="settings-button-group">
                                                            <button className={`tolerance-button ${slippage === '0.1' && 'tolerance-active'}`} onClick={() => this.setState({slippage: '0.1'}, () => this.context.updateSlippage("0.1"))}>0.1%</button>
                                                            <button className={`tolerance-button ${slippage === '0.5' && 'tolerance-active'}`} onClick={() => this.setState({slippage: '0.5'}, () => this.context.updateSlippage("0.5"))}>0.5%</button>
                                                            <button className={`tolerance-button ${slippage === '1' && 'tolerance-active'}`} onClick={() => this.setState({slippage: '1'}, () => this.context.updateSlippage("1"))}>1%</button>
                                                            <button tabIndex="-1" className="tolerance-input-button">
                                                                <div className="tolerance-input-container">
                                                                    <input className="tolerance-input" onChange={this.handleSlippageChange} placeholder={slippage} value={localSlippage} />
                                                                    <span style={{position: 'relative', top: '1px'}}>%</span>
                                                                </div>
                                                            </button>
                                                        </div>
                                                        {
                                                            slippage === '0.1' &&
                                                            
                                                            <div style={{fontSize: '14px', paddingTop: '7px', color: 'rgb(243, 132, 30)'}}>
                                                                Your transaction may fail
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="grid-8px">
                                                        <div className="settings-option-container">
                                                            <div className="settings-option-title">Transaction deadline</div>
                                                            <span style={{marginLeft: '4px'}}>
                                                                <div style={{display: 'inline-block'}}>
                                                                    <Tooltip overlayClassName="tooltip-card" arrowPointAtCenter placement="left" title={"Your transaction will revert if it is pending for more than this long."}>
                                                                        <div className="info-icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                                                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                                                            </svg>
                                                                        </div>
                                                                    </Tooltip>
                                                                </div>
                                                            </span>
                                                        </div>
                                                        <div style={{width: '150px'}} className="tolerance-input-container">
                                                            <button tabIndex="-1" className="tolerance-input-button">
                                                                <input className="tolerance-input" onChange={this.handleDeadlineChange} placeholder="5" style={{color: deadline === '0' && 'red'}} value={deadline} />
                                                            </button>
                                                            <span style={{paddingLeft: '8px', fontSize: '14px'}}>minutes</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="settings-title">Transaction Settings</div>
                                                <div className="settings-toggle">
                                                    <div className="settings-option-container">
                                                        <div className="settings-option-title">Toggle Expert Mode</div>
                                                        <span style={{marginLeft: '4px'}}>
                                                            <div style={{display: 'inline-block'}}>
                                                                <Tooltip overlayClassName="tooltip-card" arrowPointAtCenter placement="left" title={"Bypasses confirmation modals and allows high slippage trades. Use at your own risk"}>
                                                                    <div className="info-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                            <circle cx="12" cy="12" r="10"></circle>
                                                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                                                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                                                        </svg>
                                                                    </div>
                                                                </Tooltip>
                                                            </div>
                                                        </span>
                                                    </div>
                                                    <div className="toggle-button" onClick={this.handleExpertModeToggle}>
                                                        <span className={`toggle-on ${expertModeOn && 'toggle-active'}`}>On</span>
                                                        <span className={expertModeOn ? 'toggle-on' : 'toggle-off'}>Off</span>
                                                    </div>
                                                </div>
                                                <div className="settings-toggle">
                                                    <div className="settings-option-container">
                                                        <div className="settings-option-title">Toggle Dark Mode</div>
                                                    </div>
                                                    <div className="toggle-button" onClick={this.props.onThemeToggle}>
                                                        <span className={`toggle-on ${theme === 'dark' && 'toggle-active'}`}>On</span>
                                                        <span className={theme === 'dark' ? 'toggle-on' : 'toggle-off'}>Off</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </ClickAwayListener>
                                )}
                            </div>
                            <div className="navbar-action-button-container">
                                <button className="navbar-action-button" onClick={() => this.setState({moreLinksVisible: true})}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="sc-feJyhm bgecyu">
                                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                {moreLinksVisible && (
                                    <ClickAwayListener onClickAway={() => this.setState({moreLinksVisible: false})}>
                                        <div className="links-container">
                                            <a className="link" target="_blank" rel="noopener noreferrer" href="https://veraswap.medium.com/about">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                                Blog
                                            </a>
                                            <a className="link" target="_blank" rel="noopener noreferrer" href="https://docs.veraswap.org/">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                                Docs
                                            </a>
                                            <a className="link" target="_blank" rel="noopener noreferrer" href="https://twitter.com/veraswap">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                                Twitter
                                            </a>
                                            <a className="link" target="_blank" rel="noopener noreferrer" href="https://t.me/veraswap">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                                Telegram
                                            </a>
                                            <Tooltip title="Coming soon">
                                                <button className="claim-moon-button">
                                                    Claim VRAP
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </ClickAwayListener>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={moonModalVisible}
                    TransitionComponent={Transition}
                    onClose={() => this.setState({moonModalVisible: false})}
                    onBackdropClick={() => this.setState({moonModalVisible: false})}
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
                    <div className="coloured-modal-outer-container">
                        <div className="coloured-modal-container">
                            <span className="rotation"></span>
                            <span className="noise"></span>
                            <div className="coloured-modal-header">
                                <div className="coloured-modal-header-inner">
                                    <div className="coloured-modal-header-title">
                                        Your VRAP Breakdown
                                        <svg onClick={() => this.setState({moonModalVisible: false})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-dTdPqK bptfJp"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </div>
                                </div>
                                <div className="coloured-modal-divider" />
                                {
                                    this.props.walletConnected && (
                                        <>
                                            {/* <div className="grid-8px" style={{padding: '1rem', zIndex: 1}}>
                                                <div className="grid" style={{justifyContent: 'center'}}>
                                                    <img width="48px" src={Logo} alt="Logo" class="spinning-logo" />
                                                    <div className="balance-large">0.00</div>
                                                </div>
                                            </div> */}
                                            <div className="coloured-modal-content-rows-container">
                                                <div className="coloured-modal-content-row">
                                                    <div className="coloured-modal-text">
                                                        Balance:
                                                    </div>
                                                    <div className="coloured-modal-text">
                                                        {this.props.vrapBalance ? parseFloat(this.props.vrapBalance).toFixed(3) : '0'} VRAP
                                                    </div>
                                                </div>
                                                {/* <div className="coloured-modal-content-row">
                                                    <div className="coloured-modal-text">
                                                        Unclaimed:
                                                    </div>
                                                    <div className="coloured-modal-text">
                                                        0.0000
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="coloured-modal-divider" />
                                        </>
                                    )
                                }
                                <div className="coloured-modal-content">
                                    <div className="coloured-modal-content-rows-container">
                                        <div className="coloured-modal-content-row">
                                            <div className="coloured-modal-text">
                                                VRAP Price:
                                            </div>
                                            <div className="coloured-modal-text">
                                                $ 0.05
                                            </div>
                                        </div>
                                        <div className="coloured-modal-content-row">
                                            <div className="coloured-modal-text">
                                                VRAP in circulation:
                                            </div>
                                            <div className="coloured-modal-text">
                                                100,000,000
                                            </div>
                                        </div>
                                        <div className="coloured-modal-content-row">
                                            <div className="coloured-modal-text">
                                                Total supply:
                                            </div>
                                            <div className="coloured-modal-text">
                                                100,000,000
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    open={expertModeConfirmationModalVisible}
                    TransitionComponent={Transition}
                    onClose={() => this.setState({expertModeConfirmationModalVisible: false})}
                    onBackdropClick={() => this.setState({expertModeConfirmationModalVisible: false})}
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
                    <div className="confirmation-modal-container">
                        <div className="confirmation-modal-grid">
                            <div className="confirmation-modal-header">
                                <div className="confirmation-modal-title">Are you sure?</div>
                                <svg onClick={() => this.setState({expertModeConfirmationModalVisible: false})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-jnlKLf fEBVhk"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </div>
                            <div className="modal-divider" />
                            <div className="confirmation-modal-content">
                                Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds.
                            </div>
                            <div className="confirmation-modal-content-bold">
                                ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.
                            </div>
                            <button className="confirmation-modal-button" onClick={this.turnOnExpertMode}>
                                <div className="confirmation-modal-button-text">
                                    Turn On Expert Mode
                                </div>
                            </button>
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    open={claimModalVisible}
                    TransitionComponent={Transition}
                    onClose={() => this.setState({claimModalVisible: false})}
                    onBackdropClick={() => this.setState({claimModalVisible: false})}
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
                    <div className="claim-modal-container">
                        <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '24px', width: '100%'}}>
                            <div className="gradient-header" style={{marginBottom: '-24px'}}>
                                <div className="rotation" />
                                <div className="noise" />
                                <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '12px', padding: '1rem', zIndex: 1}}>
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <div className="coloured-modal-header-title">
                                            Claim VRAP Token
                                        </div>
                                        <svg style={{cursor: 'pointer'}} onClick={() => this.setState({claimModalVisible: false})} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-dTdPqK bptfJp"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </div>
                                    <div style={{margin: 0, minWidth: 0, fontWeight: 700, color: '#FFF', fontSize: '36px'}}>0 VRAP</div>
                                </div>
                            </div>
                            <div className="modal-divider" />
                            <div className="grid" style={{padding: '0px 1rem 1rem'}}>
                                <div className="claim-description">
                                    Enter an address to trigger a VRAP claim. If the address has any claimable VRAP it will be sent to them on submission.
                                </div>
                                <div style={{display: 'flex', flexFlow: 'column nowrap', position: 'relative', borderRadius: '1.25rem', zIndex: 1, width: '100%'}}>
                                    <div className="claim-input-outer-container" style={{borderColor: !addressError ? 'auto' : 'rgb(255, 104, 113)'}}>
                                        <div style={{flex: '1 1 0%', padding: '1rem'}}>
                                            <div className="grid">
                                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0, width: '100%', margin: 0, minWidth: 0}}>
                                                    <div className="input-label">Recipient</div>
                                                    {
                                                        addressValid && (
                                                            <a target="_blank" rel="noopener noreferrer" href="https://etherscan.io" class="external-link">(View on Etherscan)</a>
                                                        )
                                                    }
                                                </div>
                                                <input className="claim-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Wallet Address or ENS name" pattern="^(0x[a-fA-F0-9]{40})$" value={walletAddress} onChange={e => this.setState({walletAddress: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        addressValid && moonBalance === 0 ? (
                                            <div style={{fontSize: '16px', color: 'rgb(255, 104, 113)', textAlign: 'center', fontWeight: 500, marginTop: '0.5rem'}}>Address has no available claim</div>
                                        ) : null
                                    }
                                    <button disabled className="buy-action-button" style={{marginTop: '1.75rem'}}>Claim VRAP</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(Navbar);