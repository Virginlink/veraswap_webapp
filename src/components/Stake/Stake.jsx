import React, { Component } from 'react'

export default class Stake extends Component {
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
                                            Veraswap liquidity mining
                                        </div>
                                    </div>
                                    <div className="sale-block-content-container">
                                        <div className="sale-block-content">
                                            Deposit your Liquidity Provider tokens to receive VRAP, the Veraswap protocol governance token.
                                        </div>
                                    </div>
                                    <a style={{color: '#FFF', fontSize: '14px', textDecoration: 'underline'}}>Read more about VRAP</a>
                                </div>
                            </div>
                            <span className="sale-rotation"></span>
                            <span className="noise"></span>
                        </div>
                    </div>
                </div>
                <div className="grid" style={{width: '100%', maxWidth: '640px'}}>
                    <div>
                        <p className="heading" style={{marginTop: '1.75rem'}}>Participating pools</p>
                    </div>
                </div>
            </div>
        )
    }
}
