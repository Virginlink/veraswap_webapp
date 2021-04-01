import React, { Component } from 'react'
import { IoChevronDownSharp } from 'react-icons/io5'
import { MdRefresh, MdSwapVert } from 'react-icons/md'
import CurrencySelectModal from './CurrencySelectModal'
import { CircularProgress } from '@material-ui/core'

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
        const { tokenA, tokenABalance, tokenB, tokenBBalance, walletConnected, walletAddress, onTokenAUpdate, onTokenBUpdate, tokenAIcon, tokenBIcon, tokenAAmount, tokenBAmount, onAmountChange, onMax, onTokenSwap, onRefresh, estimatingA, estimatingB, theme } = this.props
        const { tokenAModalVisible, tokenBModalVisible } = this.state
        return (
            <div>
                <div className="form-control">
                    <div className="flex-spaced-container">
                        <div>from{estimatingB && <CircularProgress size={9} thickness={5} style={{position: 'relative', top: '1px', color: theme === 'light' ? '#DE0102' : '#DEB501', marginLeft: '4px'}} />}</div>
                        {(walletConnected && walletAddress && tokenABalance) && (
                            <div style={{color: '#000', fontSize: '10px'}}><MdRefresh style={{cursor: 'pointer', position: 'relative', top: '1px'}} onClick={() => onRefresh(tokenA, 'A')} /> balance: <span style={{fontFamily: 'Semibold', fontSize: '10px'}}>{parseFloat(tokenABalance).toFixed(6)}</span></div>
                        )}
                    </div>
                    <div className="input-container">
                        <input
                            placeholder="0.0"
                            value={tokenAAmount}
                            inputMode="numeric"
                            onChange={(e) => {
                                if (e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
                                    onAmountChange(e.target.value, 'A')
                                }
                            }}
                            style={{
                                paddingRight: '0.25rem'
                            }}
                        />
                        <div>
                            {(tokenA && parseFloat(tokenABalance) > 0) && (
                                <button className="max-button" onClick={() => onMax('A')}>max</button>
                            )}
                            <button
                                className="asset-select-button"
                                style={!tokenA ? {
                                    backgroundColor: theme === 'light' ? '#DE0102' : '#DEB501' ,
                                    color: '#FFF',
                                    padding: '0 11px'
                                } : {}}
                                onClick={this.toggleModalA}
                            >
                                {tokenAIcon && <img src={tokenAIcon} alt="token-logo" />}
                                <span style={{textTransform: 'none'}}>{tokenA || 'Select'}</span>
                                <IoChevronDownSharp />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="action" style={{userSelect: 'none'}}>
                    <MdSwapVert style={{cursor: 'pointer'}} onClick={onTokenSwap} />
                </div>
                <div className="form-control">
                    <div className="flex-spaced-container">
                        <div>to{estimatingA && <CircularProgress size={9} thickness={5} style={{position: 'relative', top: '1px', color: theme === 'light' ? '#DE0102' : '#DEB501' , marginLeft: '4px'}} />}</div>
                        {(walletConnected && walletAddress && tokenBBalance) && (
                            <div style={{color: '#000', fontSize: '10px'}}><MdRefresh style={{cursor: 'pointer', position: 'relative', top: '1px'}} onClick={() => onRefresh(tokenB, 'B')} /> balance: <span style={{fontFamily: 'Semibold', fontSize: '10px'}}>{parseFloat(tokenBBalance).toFixed(6)}</span></div>
                        )}
                    </div>
                    <div className="input-container without-max">
                        <input
                            placeholder="0.0"
                            value={tokenBAmount}
                            inputMode="numeric"
                            onChange={(e) => {
                                if (e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
                                    onAmountChange(e.target.value, 'B')
                                }
                            }}
                            style={{
                                paddingRight: '0.25rem'
                            }}
                        />
                        <div>
                            {(tokenB && parseFloat(tokenBBalance) > 0) && (
                                <button className="max-button" onClick={() => onMax('B')}>max</button>
                            )}
                            <button 
                                className="asset-select-button"
                                style={!tokenB ? {
                                    backgroundColor: theme === 'light' ? '#DE0102' : '#DEB501' ,
                                    color: '#FFF',
                                    padding: '0 11px'
                                } : {}}
                                onClick={this.toggleModalB}
                            >
                                {tokenBIcon && <img src={tokenBIcon} alt="token-logo" />}
                                <span style={{textTransform: 'none'}}>{tokenB || 'Select'}</span>
                                <IoChevronDownSharp />
                            </button>
                        </div>
                    </div>
                </div>
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