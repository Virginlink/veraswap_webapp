import React from 'react';
import {STAKING_ABI,STAKING_ADDRESS,STAKING_ADDRESS_V1,PROVIDER} from '../../utils/contracts';
import {TOKEN} from '../../utils/tokens';

const {ethers} = require("ethers");
export default class Unclaimed extends React.Component{

    constructor(props){
        super(props);
        this.state={
            unclaimed : 0.0,
            walletAddress : ""
        }
    }

    componentDidMount(){
        if(this.props.ticker && this.props.currentToken && this.props.walletAddress !== ""){
            this.setState({walletAddress : this.props.walletAddress})
            this.fetch(this.props.walletAddress)
        }
    }

    UNSAFE_componentWillReceiveProps(props){
        if(props.ticker && props.currentToken && props.walletAddress !== this.state.walletAddress){
            this.setState({walletAddress : props.walletAddress})
            this.fetch(props.walletAddress)
        }
    }

    fetch(walletAddress){
        let token = TOKEN.filter(data => data.contractAddress === this.props.currentToken);
        let decimal = token[0].decimal;
        let contract = new ethers.Contract(this.props.version === "1" ? STAKING_ADDRESS_V1 : STAKING_ADDRESS,STAKING_ABI,PROVIDER);
        contract.fetchUnclaimed(walletAddress,this.props.currentToken)
        .then(res=>{
            console.log(ethers.utils.formatEther(res))
            let unclaimed = ethers.utils.formatEther(res) * 10 ** decimal;
            this.setState({unclaimed : parseFloat(unclaimed).toFixed(8)});
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return(
        <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '8px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', width: '100%', margin: 0, padding: 0, minWidth: 0}}>
                <div>
                    <div className="text-semibold" style={{fontSize: '16px'}}>Your unclaimed rewards</div>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', boxSizing: 'border-box', width: '100%', margin: 0, padding: 0, minWidth: 0}}>
                <div className="text-semibold-2x" style={{fontSize: '36px'}}>{this.state.unclaimed}</div>
                <div className="text-semibold" style={{fontSize: '16px'}}>
                    <span role="img" aria-label="wizard-icon" style={{marginRight: '8px'}}>⚡</span>
                    { 
                    this.state.unclaimed
                    }
                </div>
            </div>
        </div>      
        )
    }
}