import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Sale from '../components/Sale/Sale'

export default class SalePage extends Component {
    render() {
        return (
            <div>
                <Navbar
                    active="sale"
					modalVisible={this.props.modalVisible}
					onModalToggle={this.props.onModalToggle}
					theme={this.props.theme}
					onThemeToggle={this.props.onThemeToggle}
					walletConnected={this.props.walletConnected}
					walletAddress = {this.props.walletAddress}
					ethBalance = {this.props.ethBalance}
					vrapBalance = {this.props.vrapBalance}
				/>
                <Sale
					onModalOpenRequest={this.props.onModalOpenRequest} 
					walletConnected={this.props.walletConnected} 
					vrapBalance={this.props.vrapBalance}
					ethBalance = {this.props.ethBalance}
					usdtBalance = {this.props.usdtBalance}
					address = {this.props.address}
					fetchBalance={this.props.fetchBalance}
					buyWithEther = {this.props.buyWithEther}
					approved = {this.props.approved}
					approving = {this.props.approving}
					approveTether={this.props.approveTether}
					buyWithTether = {this.props.buyWithTether}
					onResetBuyStatus={this.props.onResetBuyStatus}
					ethBuying={this.props.ethBuying}
				/>
            </div>
        )
    }
}

