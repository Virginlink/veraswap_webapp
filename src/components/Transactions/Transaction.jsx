import React, { Component } from 'react'
import { PROVIDER } from '../../utils/contracts'

export default class Transaction extends Component {

    constructor() {
        super()
        this.state = {
            txSuccess: false
        }
    }

    componentDidMount() {
        let txInterval = setInterval(
            () => {
                PROVIDER.getTransaction(this.props.tx.hash)
                    .then((res) => {
                        //console.log(res)
                        if (res.blockNumber) {
                            this.setState({
                                txSuccess: true
                            }, () => clearInterval(txInterval))
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }, 1000
        )
    }

    render() {
        const {txSuccess} = this.state;
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    Buy 0.001 ETH
                </div>
                {
                    !txSuccess ?

                    <div className="connection-status" style={{padding: 0}}>
                        <svg style={{marginRight: 0}} className="connection-loader" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-bYSBpT fhfZBu sc-gqPbQI dCfdPK"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>

                    :

                    <div style={{color: 'rgb(39, 174, 96)'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" color="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                }
            </div>
        )
    }
}
