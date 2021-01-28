import React, { Component } from 'react'
import AnimatedNumber from 'react-animated-number';
import NumericLabel from 'react-pretty-numbers';
import VRAP from '../../assets/images/logo.png';
import ETH from '../../assets/images/eth.png';

const WBTC = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png';
const USDC = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png';
const DAI = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png';
const TUSD = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png';
const BUSD = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4Fabb145d64652a948d72533023f6E7A623C7C53/logo.png';
const AUSDC = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9bA00D6856a4eDF4665BcA2C2309936572473B7E/logo.png';
const PAX = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x8E870D67F660D95d5be530380D0eC0bd388289E1/logo.png';
const UNI = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png';
const LINK = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png';
const AAVE = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png';
const MKR = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png';
const COMP = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png';
const CRV = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png';
const YFI = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png';
const USDT = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png';

export default class Stake extends Component {
    constructor() {
        super();
        this.state = {
            assets: [
                {
                    icons: [VRAP],
                    ticker: 'VRAP',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [WBTC],
                    ticker: 'WBTC',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [USDC],
                    ticker: 'USDC',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [DAI],
                    ticker: 'DAI',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [TUSD],
                    ticker: 'TUSD',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(44, 68, 124) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [BUSD],
                    ticker: 'BUSD',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [AUSDC],
                    ticker: 'AUSDC',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [PAX],
                    ticker: 'PAX',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(4, 147, 211) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [UNI],
                    ticker: 'UNI',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(252, 7, 125) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [LINK],
                    ticker: 'LINK',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [AAVE],
                    ticker: 'AAVE',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(50, 162, 182) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [MKR],
                    ticker: 'MKR',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(68, 164, 148) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [COMP],
                    ticker: 'COMP',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(0, 170, 112) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [CRV],
                    ticker: 'CRV',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [YFI],
                    ticker: 'YFI',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [VRAP, WBTC],
                    ticker: 'VRAP-WBTC',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [VRAP, ETH],
                    ticker: 'VRAP-ETH',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [VRAP, DAI],
                    ticker: 'VRAP-DAI',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [VRAP, UNI],
                    ticker: 'VRAP-UNI',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [VRAP, USDC],
                    ticker: 'VRAP-USDC',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [VRAP, USDT],
                    ticker: 'VRAP-USDT',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [VRAP, LINK],
                    ticker: 'VRAP-LINK',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [WBTC, USDC],
                    ticker: 'WBTC-USDC',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [ETH, USDT],
                    ticker: 'ETH-USDT',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(36, 164, 124) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [ETH, USDC],
                    ticker: 'ETH-USDC',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(36, 116, 204) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [ETH, DAI],
                    ticker: 'ETH-DAI',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [ETH, LINK],
                    ticker: 'ETH-LINK',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(44, 94, 220) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [ETH, UNI],
                    ticker: 'ETH-UNI',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(252, 7, 125) 0%, rgb(136, 141, 155) 100%)',
                },
                {
                    icons: [ETH, WBTC],
                    ticker: 'ETH-WBTC',
                    totalDeposit: 16439700,
                    poolRate: '300.00',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(136, 141, 155) 100%)',
                },
            ]
        }
    }

    render() {
        const { assets } = this.state;
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
                    <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '15px 10px', width: '100%', justifySelf: 'center', paddingBottom: '3rem'}}>
                        {
                            assets.map(({ icons, ticker, totalDeposit, poolRate, background }) => {
                                return (
                                    <div style={{display: 'grid', gridAutoRows: 'auto', borderRadius: '12px', width: '100%', overflow: 'hidden', position: 'relative', opacity: 1, background: background}}>
                                        <span className="sale-rotation"></span>
                                        <span className="noise"></span>
                                        <div style={{display: 'grid', gridTemplateColumns: '48px 1fr 120px', gap: 0, alignItems: 'center', padding: '1rem', zIndex: 1}}>
                                            <div style={{position: 'relative',  display: 'flex', flexDirection: 'row'}}>
                                                {
                                                    icons.map((icon) => {
                                                        return (
                                                            <img width="24px" height="24px" style={{borderRadius: '24px',  boxShadow: 'rgb(0 0 0 / 8%) 0px 6px 10px'}} alt={`${ticker} logo`} src={icon} />
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div style={{marginLeft: '8px'}} className="stake-card-heading">
                                                {ticker}
                                            </div>
                                            <button className="buy-action-button" style={{height: '38px', borderRadius: '8px', fontSize: '16px'}}>Deposit</button>
                                        </div>
                                        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '12px', margin: '0 1rem 1rem 1rem'}}>
                                            <div style={{width: '100%', minWidth: 0, margin: '0 0 -5px 0', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <div style={{fontSize: '16px', color: '#FFF', fontWeight: 500}}>
                                                    Total deposited
                                                </div>
                                                <div style={{fontSize: '16px', color: '#FFF', fontWeight: 500}}>
                                                    $<AnimatedNumber 
                                                        component="text"
                                                        value={totalDeposit}
                                                        initialValue={0}
                                                        default={0}
                                                        stepPrecision={0}
                                                        style={{
                                                            transition: '0.8s ease-out',
                                                            fontSize: 16,
                                                            transitionProperty: 'background-color, color, opacity'
                                                        }}
                                                        duration={800}
                                                        formatValue={(deposit) => <NumericLabel>{deposit}</NumericLabel>}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{width: '100%', minWidth: 0, margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <div style={{fontSize: '16px', color: '#FFF', fontWeight: 500}}>
                                                    Pool rate
                                                </div>
                                                <div style={{fontSize: '16px', color: '#FFF', fontWeight: 500}}>
                                                    {poolRate} % APY
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
