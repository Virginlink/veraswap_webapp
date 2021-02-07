import React from 'react';
import {STAKING_ABI,STAKING_ADDRESS,PROVIDER} from '../../utils/contracts';
import {TOKEN} from '../../utils/tokens';

const {ethers} = require("ethers");
export default class PoolInfo extends React.Component{

    constructor(props){
        super(props);
        this.state={
            totalDeposit : 0.0,
            poolRate : 0.0
        }
    }

    async componentDidMount(){
        if(this.props.ticker && this.props.currentToken){
            this.fetch()
            let token = TOKEN.filter(data => data.contractAddress === this.props.currentToken);
            let ContractABI = token[0].contractABI;
            let contract = new ethers.Contract(this.props.currentToken,ContractABI,PROVIDER);
            let balance = await contract.balanceOf(STAKING_ADDRESS);
                balance = ethers.utils.formatEther(balance) * 10 ** token[0].decimal;
            this.setState({totalDeposit : balance});
            console.log(balance)
        }
    }


    async fetch(){
        let contract = new ethers.Contract(STAKING_ADDRESS,STAKING_ABI,PROVIDER);
        let poolRate = await contract.rFactor(this.props.currentToken);
            poolRate = ethers.utils.formatEther(poolRate) * 10 ** 8;
        this.setState({poolRate : poolRate});
        this.props.setAPY(poolRate);
    }

    render(){
        return(
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', margin: 0, padding: 0, minWidth: 0, width: '100%', gap: '24px'}}>
            <div className="outlined-box">
                <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '8px'}}>
                    <div className="text-regular" style={{fontSize: '16px', marginBottom: '-5px'}}>Total deposits</div>
                    <div className="text-semibold" style={{fontSize: '24px'}}>{this.state.totalDeposit} {this.props.ticker}</div>
                </div>
            </div>
            <div className="outlined-box">
                <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '8px'}}>
                    <div className="text-regular" style={{fontSize: '16px', marginBottom: '-5px'}}>Pool Rate</div>
                    <div className="text-semibold" style={{fontSize: '24px'}}>{this.state.poolRate} %</div>
                </div>
            </div>
            </div>
        )
    }
}