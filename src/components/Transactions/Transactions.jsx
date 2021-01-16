import React, { Component } from 'react'
import Transaction from './Transaction'

export default class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            transactions: [],
        }
    }

    componentDidMount() {
        const hashArrayString = localStorage.getItem('hashData')
        if (hashArrayString) {
            const hashArray = JSON.parse(hashArrayString)
            this.setState({transactions: hashArray.data})
        }
    }

    render() {
        const {transactions} = this.state;
        return (
            <>
                {
                    transactions.length > 0 ?

                    <div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
                            <div style={{fontSize: '20px'}}>Recent transactions</div>
                            <a style={{fontSize: '13px'}}>(clear all)</a>
                        </div>
                        {
                            transactions.map((hash) => <Transaction hash={hash} />)
                        }
                    </div>

                    :

                    'Your transactions will appear here...'
                }
            </>
        )
    }
}
