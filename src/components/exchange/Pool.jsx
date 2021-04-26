import React, { Component } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { IoArrowBackSharp, IoChevronForwardSharp } from 'react-icons/io5'
import { MdAdd, MdRefresh } from 'react-icons/md'
import CurrencySelectModal from './CurrencySelectModal'
import { Tooltip } from 'antd'
import LPCard from './LPCard'

export default class Pool extends Component {
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
        const { liquiditySectionVisible, onSectionToggle, tokenA, tokenABalance, tokenB, tokenBBalance, walletConnected, walletAddress, onTokenAUpdate, onTokenBUpdate, tokenAIcon, tokenBIcon, tokenAAmount, tokenBAmount, onAmountChange, pools, onMax, onAddLiquidity, onRefresh, theme, fetchingLiquidity } = this.props
        const { tokenAModalVisible, tokenBModalVisible } = this.state
        return (
            liquiditySectionVisible ? 
                <div className="pool-details">
                    <div style={{padding: '0 1rem'}}>
                        <button className="add-liquidity-button" onClick={onSectionToggle}>Add Liquidity</button>
                    </div>
                    <div className="flex-spaced-container" style={{color: '#FFF'}}>
                        <div>Your Liquidity</div>
                        {/* <div>                            
                            <AiOutlineQuestionCircle size={16} />
                        </div> */}
                    </div>
                    <div className="liquidity-section">
                        {(walletConnected && walletAddress) ? (
                            pools.length === 0 ? (
                                <span>Your liquidity will appear here.</span>
                            ) : (
                                pools.map((pool) => {
                                    return (
                                        <LPCard
                                            theme={theme}
                                            walletAddress={walletAddress}
                                            tokenA={pool.tokenA}
                                            tokenB={pool.tokenB}
                                            tokenAIcon={pool.tokenAIcon}
                                            tokenBIcon={pool.tokenBIcon}
                                            tokenAAddress={pool.tokenAAddress}
                                            tokenBAddress={pool.tokenBAddress}
                                            tokenADecimals={pool.tokenADecimals}
                                            tokenBDecimals={pool.tokenBDecimals}
                                            lpAddress={pool.lpAddress}
                                            onAddLiquidity={onAddLiquidity}
                                        />
                                    )
                                })
                            )
                        ) : (
                            <span>Connect to a wallet to view your liquidity.</span>
                        )}
                    </div>
                </div>
            : 
            
            <>
                <div className="pool-form">
                    <div className="flex-spaced-container" style={{marginBottom: '1.5rem', color: '#FFF'}}>
                        <IoArrowBackSharp size={16} style={{cursor: 'pointer'}} onClick={onSectionToggle}  />
                        <span>Add Liquidity</span>
                        <Tooltip title="When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time." placement="bottom">
                            <AiOutlineQuestionCircle size={16} />
                        </Tooltip>
                    </div>
                    <div className="form-control">
                        <div className="flex-spaced-container">
                            <div style={{color: theme === 'dark' ? '#FFF' : '#000', textTransform: 'none', opacity: 0.7, fontFamily: 'PT Sans Caption'}}>Input</div>
                            {(walletConnected && walletAddress && tokenABalance) && (
                                <div style={{fontSize: '12px'}}><MdRefresh style={{cursor: 'pointer', position: 'relative', top: '1px'}} onClick={() => onRefresh(tokenA, 'A')} /> balance: <span style={{fontFamily: 'PT Sans Caption', fontSize: '12px'}}>{parseFloat(tokenABalance).toFixed(6)}</span></div>
                            )}
                        </div>
                        <div className="input-container without-max">
                            <input
                                placeholder="0.0"
                                value={tokenAAmount}
                                inputMode="numeric"
                                onChange={(e) => {
                                    if (!fetchingLiquidity && e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
                                        onAmountChange(e.target.value, 'A')
                                    }
                                }}
                            />
                            <div>
                                {(walletConnected && tokenA && parseFloat(tokenABalance) > 0) && (
                                    <button className="max-button" onClick={() => onMax('A')}>max</button>
                                )}
                                <button
                                    className="asset-select-button"
                                    style={!tokenA ? {
                                        backgroundColor: theme === 'light' ? '#DE0102' : '#DEB501',
                                        color: '#FFF',
                                        padding: '0 11px'
                                    } : {}}
                                    onClick={this.toggleModalA}
                                >
                                    {tokenAIcon && <img src={tokenAIcon} alt="token-logo" />}
                                    <span style={{textTransform: 'none'}}>{tokenA || 'Select'}</span>
                                    {!tokenA && <IoChevronForwardSharp size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="action">
                        <MdAdd />
                    </div>
                    <div className="form-control">
                        <div className="flex-spaced-container">
                            <div style={{color: theme === 'dark' ? '#FFF' : '#000', textTransform: 'none', opacity: 0.7, fontFamily: 'PT Sans Caption'}}>Input</div>
                            {(walletConnected && walletAddress && tokenBBalance) && (
                                <div style={{fontSize: '10px'}}><MdRefresh style={{cursor: 'pointer', position: 'relative', top: '1px'}} onClick={() => onRefresh(tokenB, 'B')} /> balance: <span style={{fontFamily: 'PT Sans Caption', fontSize: '12px'}}>{parseFloat(tokenBBalance).toFixed(6)}</span></div>
                            )}
                        </div>
                        <div className="input-container without-max">
                            <input
                                placeholder="0.0"
                                value={tokenBAmount}
                                onChange={(e) => {
                                    if (!fetchingLiquidity && e.target.value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
                                        onAmountChange(e.target.value, 'B')
                                    }
                                }}
                            />
                            <div>
                                {(walletConnected && tokenB && parseFloat(tokenBBalance) > 0) && (
                                    <button className="max-button" onClick={() => onMax('B')}>max</button>
                                )}
                                <button
                                    className="asset-select-button"
                                    style={!tokenB ? {
                                        backgroundColor: theme === 'light' ? '#DE0102' : '#DEB501',
                                        color: '#FFF',
                                        padding: '0 11px'
                                    } : {}}
                                    onClick={this.toggleModalB}
                                >
                                    {tokenBIcon && <img src={tokenBIcon} alt="token-logo" />}
                                    <span style={{textTransform: 'none'}}>{tokenB || 'Select'}</span>
                                    {!tokenB && <IoChevronForwardSharp size={14} />}
                                </button>
                            </div>
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
                        // commonBases
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
                        // commonBases
                    />
                )}
            </>
        )
    }
}
