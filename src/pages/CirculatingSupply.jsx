import React from "react";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import { STAKING_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS, PROVIDER } from "../utils/contracts";
export default class CirculatingSupply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stakingBalance: 0,
      totalSupply: 100000000,
      adminWallet: 86000000,
      loading: true,
    };
  }

  componentDidMount = () => {
    this.fetch();
  };

  fetch = async () => {
    let contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, PROVIDER);
    let balance = await contract.balanceOf(STAKING_ADDRESS);
    balance = ethers.utils.formatEther(balance);
    this.setState({
      stakingBalance: parseFloat(balance),
      loading: false,
    });
  };

  render() {
    const { totalSupply, adminWallet, stakingBalance } = this.state;
    return this.state.loading ? null : (
      <div>
        <Navbar
          active="total-supply"
          modalVisible={this.props.modalVisible}
          onModalToggle={this.props.onModalToggle}
          theme={this.props.theme}
          onThemeToggle={this.props.onThemeToggle}
          walletConnected={this.props.walletConnected}
          walletAddress={this.props.walletAddress}
          ethBalance={this.props.ethBalance}
          vrapBalance={this.props.vrapBalance}
        />
        <div className="stats-wrapper">
          <div className="stats-card">
            <h3 className="stats-text-heading">Circulating Supply</h3>
            <p className="stats-text">
              {new Intl.NumberFormat("en-US").format(
                parseFloat(totalSupply - (adminWallet + stakingBalance)).toFixed(4)
              )}{" "}
              VRAP
            </p>
          </div>
        </div>
      </div>
    );
  }
}
