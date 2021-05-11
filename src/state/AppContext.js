import { Component, createContext } from "react";
import { getValue, storeValue } from "../utils/helpers";

const AppContext = createContext();

class AppProvider extends Component {
  state = {
    deadline: 1,
    slippage: "20",
  };

  componentDidMount() {
    const slippage = getValue("ST");
    if (slippage) {
      this.setState({ slippage });
    }
  }

  updateDeadline = (newDeadline) => {
    this.setState({
      deadline: parseFloat(newDeadline) > 0 ? parseInt(newDeadline) : 1,
    });
  };

  updateSlippage = (newSlippage) => {
    this.setState({ slippage: parseFloat(newSlippage) > 0 ? newSlippage : "20" }, () => {
      storeValue("ST", this.state.slippage);
    });
  };

  render() {
    const { children } = this.props;
    const { deadline, slippage } = this.state;
    const { updateDeadline, updateSlippage } = this;

    return (
      <AppContext.Provider
        value={{
          deadline,
          updateDeadline,
          slippage,
          updateSlippage,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export { AppProvider };

export default AppContext;
