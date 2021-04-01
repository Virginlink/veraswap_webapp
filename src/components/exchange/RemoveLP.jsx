import React, { Component } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { IoArrowBackSharp } from 'react-icons/io5'
import { MdArrowDownward } from 'react-icons/md'
import { Tooltip } from 'antd'
import Slider from 'rc-slider';
import { withRouter } from 'react-router'

class RemoveLP extends Component {
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
        const { tokenA, tokenB, tokenAIcon, tokenBIcon, onPercentChange, percent, history, tokenASupply, tokenBSupply, tokensInPool, theme } = this.props
        return (  
            <>
                <div className="pool-form">
                    <div className="flex-spaced-container" style={{marginBottom: '1.5rem'}}>
                        <IoArrowBackSharp size={16} style={{cursor: 'pointer'}} onClick={() => history.goBack()}  />
                        <span>Remove Liquidity</span>
                        <Tooltip title="Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive." placement="bottom">
                            <AiOutlineQuestionCircle size={16} />
                        </Tooltip>
                    </div>
                    <div className="form-control">
                        <div>amount</div>
                        <div className="text-large">{percent} %</div>
                        <Slider
                            value={percent}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(percent) => onPercentChange(percent)}
                            className="percent-slider"
                        />        
                        <div className="percent-buttons">
                            <button onClick={() => onPercentChange(25)}>25%</button>
                            <button onClick={() => onPercentChange(50)}>50%</button>
                            <button onClick={() => onPercentChange(75)}>75%</button>
                            <button onClick={() => onPercentChange(100)}>Max</button>
                        </div>
                    </div>
                    <div className="action">
                        <MdArrowDownward />
                    </div>
                    <div className="form-control" style={{textTransform: 'none'}}>
                        <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '10px'}}>
                            <div className="flex-spaced-container pool-amount-row" style={{alignItems: 'flex-start'}}>
                                <div>Liquidity: {parseFloat(parseFloat(tokensInPool) * (percent/100)).toFixed(6)}</div>
                                <div>
                                    <img src={tokenAIcon} alt="token-1" style={{marginRight: '1px'}} />
                                    <img src={tokenBIcon} alt="token-2" />
                                    <span>{tokenA}/{tokenB}</span>
                                </div>
                            </div>
                            <div className="flex-spaced-container pool-amount-row" style={{alignItems: 'flex-start'}}>
                                <div>Remaining: {parseFloat(parseFloat(tokensInPool) - (parseFloat(tokensInPool) * (percent/100))).toFixed(6)}</div>
                                <div style={{visibility: 'hidden'}}>  
                                    <img src={tokenAIcon} alt="token-1" />
                                    <img src={tokenBIcon} alt="token-2" />
                                    <span>{tokenA}/{tokenB}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-spaced-container" style={{alignItems: 'flex-start', marginTop: '1rem'}}>
                        <div>Price:</div>
                        <div style={{textAlign: 'right'}}>
                            <div style={{marginBottom: '4px'}}>1 {tokenA} = {(parseFloat(tokenBSupply)/parseFloat(tokenASupply)).toFixed(6)} {tokenB}</div>
                            <div style={{marginBottom: '4px'}}>1 {tokenB} = {(parseFloat(tokenASupply)/parseFloat(tokenBSupply)).toFixed(6)} {tokenA}</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(RemoveLP)