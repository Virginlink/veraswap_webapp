import React from 'react';
import AnimatedNumber from 'react-animated-number';
import NumericLabel from 'react-pretty-numbers';
import {TOKEN} from '../../../utils/tokens';
import {PROVIDER,STAKING_ADDRESS,STAKING_ABI} from '../../../utils/contracts';
const {ethers} = require('ethers');
class AssetCard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            totalDeposit : 0.0,
            poolRate : 0.0
        }
    }

    async componentDidMount(){
        if(this.props.data){
            this.fetch()
            try{
            let token = TOKEN.filter(data => data.contractAddress === this.props.data.tokenContract);
            let ContractABI = token[0].contractABI;
            let contract = new ethers.Contract(this.props.data.tokenContract,ContractABI,PROVIDER);
            let balance = await contract.balanceOf(STAKING_ADDRESS);
                balance = ethers.utils.formatEther(balance) * 10 ** token[0].decimal;
            this.setState({totalDeposit : balance})
            }catch(e){
                console.log(e,this.props.data)
            }
        }
    }

    async fetch(){
        let contract = new ethers.Contract(STAKING_ADDRESS,STAKING_ABI,PROVIDER);
        let poolRate = await contract.rFactor(this.props.data.tokenContract);
            poolRate = ethers.utils.formatEther(poolRate) * 3154 * 10 ** 6;
        this.setState({poolRate : parseFloat(poolRate).toFixed(2)})
    }

    render(){
        const { icons, ticker , background } = this.props.data;
        let { totalDeposit,poolRate } = this.state;
        return(
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
                <button disabled onClick={() => this.props.history.push(`/stake/${this.props.data.tokenContract}`)} className="buy-action-button" style={{height: '38px', borderRadius: '8px', fontSize: '16px'}}>Deposit</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: '12px', margin: '0 1rem 1rem 1rem'}}>
                <div style={{width: '100%', minWidth: 0, margin: '0 0 -5px 0', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{fontSize: '16px', color: '#FFF', fontWeight: 500}}>
                        Total deposited
                    </div>
                    <div style={{fontSize: '16px', color: '#FFF', fontWeight: 500}}>
                        <AnimatedNumber 
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
                        /> {ticker}
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
    }
}

export default AssetCard;