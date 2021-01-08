import React, { Component } from 'react'
import Countdown from 'react-countdown'

export default class Sale extends Component {

    returnDate = ({days, hours, minutes, seconds}) => {
        return (
            <code style={{fontFamily: 'monospace', marginLeft: '5px'}}>{days.toString().length > 1 ? days : `0${days}`}:{hours.toString().length > 1 ? hours : `0${hours}`}:{minutes.toString().length > 1 ? minutes : `0${minutes}`}:{seconds.toString().length > 1 ? seconds : `0${seconds}`}</code>
        )
    }

    render() {
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
                        <button className="buy-button" onClick={this.props.onModalOpenRequest}>Buy Now</button>
                    </div>
                </div>
            </div>
        )
    }
}
