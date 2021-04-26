import React, { Component } from 'react'
import { CircularProgress } from '@material-ui/core'
import { getBNBBalance, getTokenBalance } from '../../utils/helpers'

export default class TokenRow extends Component {
    constructor() {
        super()
        this.state = {
            balance: ''
        }
    }

    componentDidMount() {
        if (this.props.walletConnected && this.props.walletAddress && !this.props.importToken ) {
            if (this.props.token.symbol !== 'BNB') {
                this.fetchBalance()
            } else {
                this.fetchBNBBalance()
            }
        }
    }

    fetchBalance = () => {
		const { walletAddress, token: { contractAddress, contractABI, decimals } } = this.props
        getTokenBalance(walletAddress, contractAddress, contractABI, decimals)
            .then((res) => {
                if (res.success) {
                    this.setState({
                        balance: parseFloat(res.balance).toFixed(6),
                    })
                }
            })
            .catch((err) => {
                console.log('Unable to fetch balance', err.message)
            })
	}

    fetchBNBBalance = () => {
		getBNBBalance(this.props.walletAddress)
			.then((res) => {
				if (res.success) {
                    this.setState({
                        balance: parseFloat(res.balance).toFixed(6)
                    })
                }
			})
			.catch((err) => {
                console.log('Unable to fetch balance', err.message)
            })
	}

    render() {
        const { onTokenPress, token, walletConnected, walletAddress, disabled, importToken, theme } = this.props;
        const { balance } = this.state;
        return (
            <div className="currency-row" data-disabled={disabled ? "true" : "false"} onClick={!disabled ? onTokenPress : () => false}>
                <img src={token.icon} alt="token-icon" />
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <div>{token.symbol}</div>
                    <div style={{fontSize: '12px', color: 'rgb(136, 141, 155)'}}>{token.name}</div>
                </div>
                <span />
                {(walletConnected && walletAddress) && (
                    <div style={{justifySelf: 'flex-end'}}>
                        {importToken ? (
                            <button className="import-button" onClick={this.props.onImport}>Import</button>
                        ) : (
                            <div>
                                {balance || <CircularProgress size={16} thickness={5} style={{color: theme === 'light' ? '#DE0102' : '#DEB501'}}/>}
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}