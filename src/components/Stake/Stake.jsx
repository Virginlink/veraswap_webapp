import React, { Component } from 'react'
import VRAP from '../../assets/images/logo.png';
import {withRouter} from 'react-router-dom';
import AssetCard from './components/assetCard';
import BNB from '../../assets/images/eth.png';
import SWINGBY from '../../assets/images/empty-token.webp';
import LIT from '../../assets/images/lit.webp';
import SFP from '../../assets/images/sfp.webp';
import DAI from '../../assets/images/dai.webp';

const TWT = 'https://github.com/trustwallet/assets/blob/master/blockchains/binance/assets/TWT-8C2/logo.png?raw=true';
const CAKE = 'https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png?raw=true';
const JULD = 'https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x5A41F637C3f7553dBa6dDC2D3cA92641096577ea/logo.png?raw=true';
const BAKE = 'https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5/logo.png?raw=true';
const JULB = 'https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x32dFFc3fE8E3EF3571bF8a72c0d0015C5373f41D/logo.png?raw=true';
const BURGER = 'https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f/logo.png?raw=true';
const BUSD = 'https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png?raw=true';
const BUSDT = 'https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x55d398326f99059fF775485246999027B3197955/logo.png?raw=true';
const XVS = 'https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63/logo.png?raw=true';
const DODO = 'https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2/logo.png?raw=true';

class Stake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [
                {
                    icons: [VRAP],
                    ticker: 'VRAP',
                    tokenContract: "0x271C418B045d05A1D52c6bF849d47b5B5B4d769e",
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)'
                },
                {
                    icons: [TWT],
                    ticker: 'TWT',
                    tokenContract: "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(44, 68, 124) 0%, rgb(108, 114, 132) 100%)'
                },
                {
                    icons: [CAKE],
                    ticker: 'CAKE',
                    tokenContract : '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(108, 114, 132) 100%)'
                },
                {
                    icons: [BAKE],
                    ticker: 'BAKE',
                    tokenContract : '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
                },
                {
                    icons: [JULD],
                    ticker: 'JULD',
                    tokenContract: '0x5A41F637C3f7553dBa6dDC2D3cA92641096577ea',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(108, 114, 132) 100%)',
                },
                {
                    icons: [JULB],
                    ticker: 'JULB',
                    tokenContract: '0x32dFFc3fE8E3EF3571bF8a72c0d0015C5373f41D',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(252, 7, 125) 0%, rgb(108, 114, 132) 100%)'                },
                {
                    icons: [BURGER],
                    ticker: 'BURGER',
                    tokenContract : '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(108, 114, 132) 100%)',
                },
                {
                    icons: [BUSD],
                    ticker: 'BUSD',
                    tokenContract : '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
                },
                {
                    icons: [BUSDT],
                    ticker: 'BUSDT',
                    tokenContract: '0x55d398326f99059ff775485246999027b3197955',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(4, 147, 211) 0%, rgb(108, 114, 132) 100%)',
                },
                {
                    icons: [XVS],
                    ticker: 'XVS',
                    tokenContract: '0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(252, 7, 125) 0%, rgb(108, 114, 132) 100%)',
                },
                {
                    icons : [TWT,BNB],
                    ticker : 'TWT-BNB',
                    tokenContract : '0x610e7a287c27dfFcaC0F0a94f547Cc1B770cF483',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)'
                },
                {
                    icons : [CAKE,BNB],
                    ticker : 'CAKE-BNB',
                    tokenContract : '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)'
                },
                {
                    icons : [DODO,BNB],
                    ticker : 'DODO-BNB',
                    tokenContract : '0x9e642d174B14fAEa31D842Dc83037c42b53236E6',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)'
                },
                {
                    icons : [SWINGBY,BNB],
                    ticker : 'SWINGBY-BNB',
                    tokenContract : '0x4576C456AF93a37a096235e5d83f812AC9aeD027',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)'
                },
                {
                    icons : [SFP,BNB],
                    ticker : 'SFP-BNB',
                    tokenContract : '0xcBe2cF3bd012e9C1ADE2Ee4d41DB3DaC763e78F3',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)'
                },
                {
                    icons : [LIT,BNB],
                    ticker : 'LIT-BNB',
                    tokenContract : '0x60bB03D1010b99CEAdD0dd209b64bC8bd83da161',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)'
                },
                {
                    icons : [DAI,BNB],
                    ticker : 'DAI-BNB',
                    tokenContract : '0x3aB77e40340AB084c3e23Be8e5A6f7afed9D41DC',
                    background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)'
                }
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
                                    <a href="https://certik.org/projects/veraswap" target="_blank" rel="no-opener no-referrer" style={{color: '#FFF', fontSize: '14px', textDecoration: 'underline'}}>Audit By <b>CERTIK</b></a>
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
                            assets.map(data => {
                                return (
                                    <AssetCard {...this.props} data={data} routeTo={this.routeTo} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Stake);


// {
    // {
    //     icons: [WBTC],
    //     ticker: 'WBTC',
    //     totalDeposit: 16439700,
    //     poolRate: '300.00',
    //     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)',
    // },
//     icons: [USDC],
//     ticker: 'USDC',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [DAI],
//     ticker: 'DAI',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [TUSD],
//     ticker: 'TUSD',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(44, 68, 124) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [BUSD],
//     ticker: 'BUSD',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [AUSDC],
//     ticker: 'AUSDC',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [PAX],
//     ticker: 'PAX',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(4, 147, 211) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [UNI],
//     ticker: 'UNI',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(252, 7, 125) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [LINK],
//     ticker: 'LINK',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [AAVE],
//     ticker: 'AAVE',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(50, 162, 182) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [MKR],
//     ticker: 'MKR',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(68, 164, 148) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [COMP],
//     ticker: 'COMP',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(0, 170, 112) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [CRV],
//     ticker: 'CRV',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [YFI],
//     ticker: 'YFI',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [VRAP, WBTC],
//     ticker: 'VRAP-WBTC',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [VRAP, ETH],
//     ticker: 'VRAP-ETH',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [VRAP, DAI],
//     ticker: 'VRAP-DAI',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [VRAP, UNI],
//     ticker: 'VRAP-UNI',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [VRAP, USDC],
//     ticker: 'VRAP-USDC',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [VRAP, USDT],
//     ticker: 'VRAP-USDT',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [VRAP, LINK],
//     ticker: 'VRAP-LINK',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, #22162C 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [WBTC, USDC],
//     ticker: 'WBTC-USDC',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [ETH, USDT],
//     ticker: 'ETH-USDT',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(36, 164, 124) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [ETH, USDC],
//     ticker: 'ETH-USDC',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(36, 116, 204) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [ETH, DAI],
//     ticker: 'ETH-DAI',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(187, 141, 0) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [ETH, LINK],
//     ticker: 'ETH-LINK',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(44, 94, 220) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [ETH, UNI],
//     ticker: 'ETH-UNI',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(252, 7, 125) 0%, rgb(108, 114, 132) 100%)',
// },
// {
//     icons: [ETH, WBTC],
//     ticker: 'ETH-WBTC',
//     totalDeposit: 16439700,
//     poolRate: '300.00',
//     background: 'radial-gradient(91.85% 100% at 1.84% 0%, rgb(124, 118, 136) 0%, rgb(108, 114, 132) 100%)',
// },