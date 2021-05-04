import React, { Component } from 'react'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { MdRefresh, MdSwapVert } from 'react-icons/md'
import CurrencySelectModal from './CurrencySelectModal'
import { CircularProgress } from '@material-ui/core'
import { IoMdHourglass } from 'react-icons/io'
import { Image } from 'antd'
import Empty from '../../assets/icons/Empty.png'
export default class Swap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tokenAModalVisible: false,
            tokenBModalVisible: false
        }
    }

    toggleModalA = () => {
        this.setState(state => {
            return {
                tokenAModalVisible: !state.tokenAModalVisible
            }
        })
    }

    toggleModalB = () => {
        this.setState(state => {
            return {
                tokenBModalVisible: !state.tokenBModalVisible
            }
        })
    }

    render() {
        const { tokenA, tokenB, tokenABalance, tokenBBalance, walletConnected, walletAddress, onTokenAUpdate, onTokenBUpdate, tokenAIcon, tokenBIcon, tokenAAmount, tokenBAmount, onAmountChange, onTokenSwap, onRefresh, estimatingA, estimatingB, fetchingLiquidity, invalidPair, theme, onPercentChange, fetchingTokenA, fetchingTokenB } = this.props
        const { tokenAModalVisible, tokenBModalVisible } = this.state
        return (
            <div className="swap-form">
                <div className="form-control" style={{borderRadius: '10px 10px 0 0'}}>
                    <div className="flex-spaced-container">
                        <div>you pay{estimatingB && <CircularProgress size={9} thickness={5} style={{position: 'relative', top: '1px', color: theme === 'light' ? '#DE0102' : '#DEB501', marginLeft: '4px'}} />}</div>
                    </div>
                    <div className="input-container">
                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                            <input
                                placeholder="0.0"
                                value={tokenAAmount}
                                inputMode="numeric"
                                onChange={(e) => {
                                    if (!fetchingLiquidity && e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
                                        onAmountChange(e.target.value, 'A')
                                    }
                                }}
                                style={{
                                    paddingRight: '0.25rem'
                                }}
                            />
                            {(walletConnected && walletAddress && tokenABalance) && (
                                <div><MdRefresh style={{cursor: 'pointer', position: 'relative', top: '1px'}} onClick={() => onRefresh(tokenA, 'A')} /> balance: <span style={{fontFamily: 'PT Sans Caption', fontSize: '12px'}}>{parseFloat(tokenABalance).toFixed(6)}</span></div>
                            )}
                        </div>
                        <div style={fetchingTokenA ? { flex: 1, justifyContent: 'flex-end' } : {}}>
                            {/* {(tokenA && parseFloat(tokenABalance) > 0) && (
                                <button className="max-button" disabled={invalidPair} onClick={() => onMax('A')}>max</button>
                            )} */}
                            {fetchingTokenA ? (
                                <button
                                    className="asset-select-button select-button-loading"
                                    style={{position: 'relative', width: '30px', justifyContent: 'center'}}
                                    disabled
                                >
                                    <IoMdHourglass />
                                </button>
                            ) : (
                                <button
                                    className="asset-select-button"
                                    style={!tokenA ? {
                                        backgroundColor: theme === 'light' ? '#DE0102' : '#DEB501' ,
                                        color: '#FFF',
                                        padding: '0 11px'
                                    } : {}}
                                    onClick={this.toggleModalA}
                                >
                                    {tokenAIcon && (
                                        <Image
                                            fallback={Empty}
                                            src={tokenAIcon}
                                            alt="token-logo"
                                            preview={false}
                                        />
                                    )}
                                    <span style={{textTransform: 'none'}}>{tokenA || 'Select'}</span>
                                    {!tokenA && <IoChevronForwardSharp />}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="action" style={{userSelect: 'none'}}>
                    <MdSwapVert style={{cursor: 'pointer'}} onClick={onTokenSwap} />
                </div>
                <div className="form-control" style={{borderRadius: '0 0 10px 10px'}}>
                    <div className="flex-spaced-container">
                        <div>you get{estimatingA && <CircularProgress size={9} thickness={5} style={{position: 'relative', top: '1px', color: theme === 'light' ? '#DE0102' : '#DEB501' , marginLeft: '4px'}} />}</div>
                    </div>
                    <div className="input-container without-max">
                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                            <input
                                placeholder="0.0"
                                value={tokenBAmount}
                                inputMode="numeric"
                                onChange={(e) => {
                                    if (!fetchingLiquidity && e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
                                        onAmountChange(e.target.value, 'B')
                                    }
                                }}
                                style={{
                                    paddingRight: '0.25rem'
                                }}
                            />
                            {(walletConnected && walletAddress && tokenBBalance) && (
                                <div><MdRefresh style={{cursor: 'pointer', position: 'relative', top: '1px'}} onClick={() => onRefresh(tokenB, 'B')} /> balance: <span style={{fontFamily: 'PT Sans Caption', fontSize: '12px'}}>{parseFloat(tokenBBalance).toFixed(6)}</span></div>
                            )}
                        </div>
                        <div style={fetchingTokenB ? { flex: 1, justifyContent: 'flex-end' } : {}}>
                            {/* {(tokenB && parseFloat(tokenBBalance) > 0) && (
                                <button className="max-button" disabled={invalidPair} onClick={() => onMax('B')}>max</button>
                            )} */}
                            {fetchingTokenB ? (
                                <button
                                    className="asset-select-button select-button-loading"
                                    style={{position: 'relative', width: '30px', justifyContent: 'center'}}
                                    disabled
                                >
                                    <IoMdHourglass />
                                </button>
                            ) : (
                                <button 
                                    className="asset-select-button"
                                    data-empty={!tokenB ? "true" : "false"}
                                    style={!tokenB ? {
                                        color: '#FFF',
                                        padding: '0 11px'
                                    } : {}}
                                    onClick={this.toggleModalB}
                                >
                                    {tokenBIcon && (
                                        <Image
                                            fallback={Empty}
                                            src={tokenBIcon}
                                            alt="token-logo"
                                            preview={false}
                                        />
                                    )}
                                    <span style={{textTransform: 'none'}}>{tokenB || 'Select'}</span>
                                    {!tokenB && <IoChevronForwardSharp />}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {(walletConnected && (tokenABalance && tokenBBalance) && !fetchingLiquidity && !invalidPair) && (
                    <div className="percent-buttons">
                        <button disabled={!tokenABalance || fetchingLiquidity} onClick={() => onPercentChange(25)}>25%</button>
                        <button disabled={!tokenABalance || fetchingLiquidity} onClick={() => onPercentChange(50)}>50%</button>
                        <button disabled={!tokenABalance || fetchingLiquidity} onClick={() => onPercentChange(75)}>75%</button>
                        <button disabled={!tokenABalance || fetchingLiquidity} onClick={() => onPercentChange(100)}>100%</button>
                    </div>
                )}
                {tokenAModalVisible && (
                    <CurrencySelectModal
                        walletConnected={walletConnected}
                        walletAddress={walletAddress}
                        onModalClose={this.toggleModalA}
                        onTokenSelect={onTokenAUpdate}
                        selectedToken={tokenA}
                        theme={theme}
                    />
                )}
                {tokenBModalVisible && (
                    <CurrencySelectModal
                        walletConnected={walletConnected}
                        walletAddress={walletAddress}
                        onModalClose={this.toggleModalB}
                        onTokenSelect={onTokenBUpdate}
                        selectedToken={tokenB}
                        theme={theme}
                    />
                )}
            </div>
        )
    }
}