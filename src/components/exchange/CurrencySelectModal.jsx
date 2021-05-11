import React, { Component } from "react";
import { CircularProgress, Dialog } from "@material-ui/core";
import { RiCloseFill } from "react-icons/ri";
import { notification } from "antd";
import { TOKENS } from "../../utils/appTokens";
import TokenRow from "./TokenRow";
import { DebounceInput } from "react-debounce-input";
import { searchToken, fetchImportedTokens, storeImportedTokens } from "../../utils/helpers";

export default class CurrencySelectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      searching: false,
      searchedToken: null,
      importedTokens: [],
    };
  }

  componentDidMount() {
    const importedTokens = fetchImportedTokens();
    if (importedTokens) {
      this.setState({
        importedTokens: [...importedTokens.data],
      });
    }
  }

  searchToken = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({ address: value }, async () => {
      if (value) {
        this.setState({ searching: true });
        searchToken(value, this.props.walletAddress)
          .then((res) => {
            this.setState({ searching: false }, () => {
              if (res.success) {
                this.setState({ searchedToken: res.data });
              }
            });
          })
          .catch((_) => {
            this.setState({
              searching: false,
              searchedToken: null,
            });
          });
      } else {
        this.setState({ searchedToken: null });
      }
    });
  };

  importToken = (newToken) => {
    const tokenExistsinOG =
      TOKENS.filter((token) => token.contractAddress === newToken.contractAddress).length > 0;
    let importedTokens = fetchImportedTokens();
    if (importedTokens) {
      const tokenExists =
        importedTokens.data.filter((token) => token.contractAddress === newToken.contractAddress)
          .length > 0;
      if (tokenExists || tokenExistsinOG) {
        notification.info({
          message: "Token is already on your list",
        });
      } else {
        importedTokens.data.push(newToken);
        storeImportedTokens(importedTokens);
      }
    } else {
      if (tokenExistsinOG) {
        notification.info({
          message: "Token is already on your list",
        });
      } else {
        const newImportedToken = {
          data: [newToken],
        };
        storeImportedTokens(newImportedToken);
      }
    }
    this.setState({ searchedToken: null });
  };

  render() {
    const { onModalClose, walletConnected, walletAddress, onTokenSelect, selectedToken, theme } =
      this.props;
    const { address, searchedToken, importedTokens, searching } = this.state;
    let allTokens = [...TOKENS, ...importedTokens];
    return (
      <Dialog
        open
        onClose={onModalClose}
        onBackdropClick={onModalClose}
        disableScrollLock
        BackdropProps={{
          style: {
            zIndex: 0,
          },
        }}
        className="app-modal"
      >
        <div className="modal-header flex-spaced-container">
          <div>
            <h4 style={{ marginBottom: 0 }}>Select a token</h4>
          </div>
          <button className="close-modal-button" onClick={onModalClose}>
            <RiCloseFill />
          </button>
        </div>
        <div
          className="modal-content"
          style={{
            paddingBottom: 0,
            paddingTop: "15px",
            borderRadius: 0,
          }}
        >
          <div style={{ position: "relative" }}>
            <DebounceInput
              debounceTimeout={500}
              className="search-currency-input"
              placeholder="Paste token address"
              value={address}
              onChange={this.searchToken}
              style={searching ? { paddingRight: "2.25rem" } : {}}
            />
            {searching && (
              <CircularProgress
                size={16}
                thickness={5}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "0.75rem",
                  color: "var(--text)",
                }}
              />
            )}
          </div>
        </div>
        <div className="currency-rows-container">
          {!searchedToken ? (
            allTokens.map((token, index) => {
              return (
                <TokenRow
                  theme={theme}
                  key={index + 1}
                  walletConnected={walletConnected}
                  walletAddress={walletAddress}
                  token={token}
                  onTokenPress={() => {
                    onTokenSelect(token);
                    onModalClose();
                  }}
                  disabled={selectedToken === token.symbol}
                />
              );
            })
          ) : (
            <TokenRow
              theme={theme}
              walletConnected={walletConnected}
              walletAddress={walletAddress}
              token={searchedToken}
              onTokenPress={() => {
                onTokenSelect(searchedToken);
                onModalClose();
              }}
              importToken
              onImport={() => this.importToken(searchedToken)}
            />
          )}
        </div>
      </Dialog>
    );
  }
}
