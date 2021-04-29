import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        height : 110vh;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: 100vh;
        background-position: 0px -30vh !important;
        background-repeat: no-repeat;
        background-color: ${({theme}) => theme.bodyBackgroundColor};
        ${({theme}) => theme.bodyBackground === 'radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 122, 0.1) 0%, rgba(255, 255, 255, 0) 100%)' ? 'background: radial-gradient(50% 50% at 50% 50%, rgba(223, 0, 4, 0.18) 0%, rgba(255, 255, 255, 0) 100%);' : ''}
    }

    .loading-container {
      background-color: ${({theme}) => theme.bodyBackgroundColor};
      ${({theme}) => theme.bodyBackground === 'radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 122, 0.1) 0%, rgba(255, 255, 255, 0) 100%)' ? 'background: radial-gradient(50% 50% at 50% 50%, rgba(223, 0, 4, 0.18) 0%, rgba(255, 255, 255, 0) 100%);' : ''}
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      color: ${({theme}) => theme.formControlText};
      font-family: 'PT Sans Caption', sans-serif;
    }

    .loading-container > div {
      position: relative;
    }

    .loading-container img + div {
      position: absolute;
      left: -1rem;
      top: -1.25rem;
    }

    .loading-container img {
      width: 67px;
      height: auto;
    }

    .loading-container svg {
      color: ${({theme}) => theme.primary};
    }

    .loading-container p {
      margin-top: 1rem;
      font-size: 16px;
    }

    .navbar-pages-container a {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        border-radius: 3rem;
        outline: none;
        cursor: pointer;
        text-decoration: none;
        color: ${({theme}) => theme.pageLinkText};
        font-size: 1rem;
        width: fit-content;
        margin: 0px 14px;
        font-weight: 500;
    }
    
    .navbar-pages-container a:hover {
        color: ${({theme}) => theme.pageLinkTextonHover};
    }
    
    .navbar-pages-container .active-page {
        font-weight: bold;
        color: ${({theme}) => theme.pageLinkTextPrimary};
    }

    .connect-to-wallet-button {
        text-align: center;
        outline: none;
        text-decoration: none;
        -webkit-box-pack: center;
        justify-content: center;
        position: relative;
        z-index: 1;
        font-size: 16px;
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        -webkit-box-align: center;
        align-items: center;
        padding: 0.35rem 0.5rem;
        border-radius: 12px;
        cursor: pointer;
        user-select: none;
        font-weight: 500;
        background-color: ${({theme}) => theme.connectToWalletBackgroundColor};
        border: 1px solid ${({theme}) => theme.connectToWalletBorderColor};
        color: ${({theme}) => theme.connectToWalletText};
    }

    .modal-content-button-title {
        position: relative;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        align-items: center;
        color: ${({theme}) => theme.modalContentColor};
    }

    .modal-footer span {
        color: ${({theme}) => theme.modalContentColor};
    }

    .modal-close-button {
        cursor: pointer;
        position: absolute;
        right: 1rem;
        top: 14px;
        color: ${({theme}) => theme.modalContentColor};
    }
    
    .connect-to-wallet-container:hover .connect-to-wallet-button {
        border: 1px solid ${({theme}) => theme.connectToWalletonHover};
    }

    .modal-header {
        font-family: 'PT Sans Caption', sans-serif;
        display: flex;
        flex-flow: row nowrap;
        padding: 1rem;
        font-size: 16px;
        font-weight: 500;
        background-color: ${({theme}) => theme.modalHeaderBackgroundColor};
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .modal-back-header {
        display: flex;
        flex-flow: row nowrap;
        padding: 1rem;
        font-size: 16px;
        font-weight: 500;
        background-color: ${({theme}) => theme.modalHeaderBackgroundColor};
        color: ${({theme}) => theme.primary};
    }
    
    .modal-content {
        background-color: ${({theme}) => theme.modalContentBackgroundColor};
        padding: 2rem;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .modal-content-button {
        cursor: pointer;
        background-color: ${({theme}) => theme.modalButtonBackgroundColor};
        outline: none;
        border: 1px solid ${({theme}) => theme.modalButtonBorderColor};
        border-radius: 12px;
        display: flex;
        flex-direction: row;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 1rem;
        margin-top: 0px;
        opacity: 1;
        width: 100% !important;
    }

    .swap-confirmation-header {
      padding: 1rem 1.25rem 1rem 1rem;
      background-color: ${({theme}) => theme.modalHeaderBackgroundColor};
      max-width: 400px;
      font-family: 'PT Sans Caption', sans-serif;
    }

    .swap-confirmation-token-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${({theme}) => theme.formControlText};
      font-size: 1.5rem;
    }

    .swap-confirmation-header svg {
      position: relative;
      left: 0.5rem;
      color: ${({theme}) => theme.formControlText};
      margin: 0.75rem 0;
      filter: contrast(0.7);
      font-size: 16px;
    }

    .swap-confirmation-token-row img {
      width: 35px;
      height: auto;
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    .swap-confirmation-header p {
      font-style: italic;
      font-size: 12px;
      color: ${({theme}) => theme.formControlText};
      margin: 2rem 0 0;
      filter: contrast(0.7);
    }

    .swap-confirmation-details {
      display: grid;
      grid-auto-rows: auto;
      row-gap: 0.35rem;
      padding: 1rem;
      margin-bottom: 0.5rem;
    }

    .swap-confirmation-details > div {
      display: flex;
      justify-content: space-between;
      font-family: 'PT Sans Caption', sans-serif;
      font-size: 14px;
    }

    .swap-confirmation-details > div > div:nth-child(1) {
      color: ${({theme}) => theme.formControlText};
      filter: contrast(0.7);
    }
    
    .swap-confirmation-details > div > div:nth-child(2) {
      color: ${({theme}) => theme.formControlText};
    }

    .active-wallet-button {
      background-color: ${({theme}) => theme.activeWalletButtonBackgroundColor} !important;
    }

    [data-high-impact=true] {
      color: #fd761f !important;
    }

    .modal-content-button-disabled {
        display: flex;
        flex-flow: row nowrap;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: start;
        justify-content: flex-start;
        border-radius: 12px;
        margin-bottom: 20px;
        color: inherit;
        width: 100%;
        border: 1px solid ${({theme}) => theme.modalButtonDisabledBorderColor};
    }

    .connection-status {
        display: flex;
        flex-flow: row nowrap;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding: 1rem;
        font-size: 16px;
        font-family: 'PT Sans Caption';
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .connection-status svg {
        margin-right: 1rem;
        color: ${({theme}) => theme.primary};
        animation: rotation 2s infinite linear;
        -webkit-animation: rotation 2s infinite linear;
        height: 16px;
        width: 16px;
    }

    .connection-status svg path {
        stroke: ${({theme}) => theme.primary};
    }

    .transaction-status {
        display: flex;
        flex-flow: row nowrap;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding: 0.1rem;
        font-size: 16px;
        font-family: 'PT Sans Caption';
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .transaction-status svg {
        margin-right: 1rem;
        color: ${({theme}) => theme.primary};
        animation: rotation 2s infinite linear;
        -webkit-animation: rotation 2s infinite linear;
        height: 16px;
        width: 16px;
    }
    

    .transaction-status svg path {
        stroke: ${({theme}) => theme.primary};
    }

    .white-loader {
        color: #FFF;
    }

    .white-loader svg {
        color: #FFF;
    }

    .white-loader svg path {
        stroke: #FFF;
    }

    .wallet-main-container {
        background-color: ${({theme}) => theme.connectionWalletBackgroundColor};
        padding: 0rem;
    }

    .connected-wallet-container {
        padding: 1rem;
        border: 1px solid ${({theme}) => theme.modalButtonBorderColor};
        border-radius: 20px;
        position: relative;
        display: grid;
        row-gap: 12px;
        margin: 0 0 20px 0;
    }

    .connected-wallet-title-container {
        display: flex;
        flex-flow: row nowrap;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        font-weight: 400;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .connected-wallet-title {
        width: initial;
        font-size: 0.825rem;
        font-weight: 500;
        color: ${({theme}) => theme.connectedWalletTextColor};
    }

    .change-wallet-button {
        cursor: pointer;
        text-align: center;
        outline: none;
        text-decoration: none;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        flex-wrap: nowrap;
        -webkit-box-align: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
        border: 1px solid ${({theme}) => theme.changeWalletButtonBorderColor};
        color: ${({theme}) => theme.primary};
        background-color: transparent;
        border-radius: 12px;
        width: fit-content;
        font-weight: 400;
        margin-left: 8px;
        font-size: 13px !important;
        padding: 4px 6px;
    }

    .change-wallet-button:hover {
        text-decoration: underline;
        border: 1px solid ${({theme}) => theme.changeWalletButtonBorderColoronHover};
    }

    .wallet-address-container {
        display: flex;
        flex-flow: row nowrap;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
        font-weight: 400;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .wallet-icon-wrapper {
        height: 1rem;
        width: 1rem;
        border-radius: 1.125rem;
    }

    .connected-wallet-footer-container {
        flex-flow: column nowrap;
        padding: 1.5rem;
        -webkit-box-flex: 1;
        flex-grow: 1;
        overflow: scroll !important;
        background-color: ${({theme}) => theme.connectedWalletFooterBackgroundColor};
        border-radius: 20px;
        min-height: 80px !important;
    }

    .connected-wallet-footer-text {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 400;
        font-size: 16px;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .copy-address-button {
        outline: none;
        border: none;
        background: none;
        cursor: pointer;
        font-weight: 500;
        color: ${({theme}) => theme.connectedWalletTextColor};
        flex-shrink: 0;
        display: flex;
        text-decoration: none;
        font-size: 0.825rem;
    }

    .copy-address-button:hover {
        color: ${({theme}) => theme.connectedWalletTextColoronHover};
    }

    .wallet-address-link {
        text-decoration: none;
        color: ${({theme}) => theme.connectedWalletTextColor};
        margin-left: 1rem;
        font-size: 0.825rem;
        display: flex;
    }

    .wallet-address-link:hover {
        text-decoration: underline;
        color: ${({theme}) => theme.connectedWalletTextColoronHover};
    }

    .wallet-details-container {
        display: flex;
        flex-direction: row;
        -webkit-box-align: center;
        align-items: center;
        background-color: ${({theme}) => theme.navbarButtonBackgroundColor};
        border-radius: 12px;
        white-space: nowrap;
        width: 100%;
        cursor: pointer;
    }

    .wallet-balance {
        color: ${({theme}) => theme.pageLinkTextPrimary};
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        padding-left: 0.75rem;
        padding-right: 0.5rem;
        font-weight: 500;   
    }

    .wallet-address-button {
        text-align: center;
        outline: none;
        text-decoration: none;
        -webkit-box-pack: center;
        justify-content: center;
        position: relative;
        z-index: 1;
        font-size: 16px;
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        -webkit-box-align: center;
        align-items: center;
        padding: 0.5rem;
        border-radius: 12px;
        cursor: pointer;
        user-select: none;
        background-color: ${({theme}) => theme.settingsMenuBackgroundColor};
        border: 1px solid ${({theme}) => theme.navbarButtonBackgroundColor};
        color: ${({theme}) => theme.pageLinkTextPrimary};
        font-weight: 500;
    }

    .wallet-address-button:hover {
        background-color: ${({theme}) => theme.walletAddressButtonBackgroundColoronHover});
        border: 1px solid ${({theme}) => theme.primary};
    }

    @-webkit-keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(359deg);
		}
    }

    @keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
    }

    .retry-button {
        cursor: pointer;
        border-radius: 8px;
        font-size: 12px;
        color: ${({theme}) => theme.modalHeaderTextColor};
        background-color: ${({theme}) => theme.retryButtonBackgroundColor};
        margin-left: 1rem;
        padding: 0.5rem;
        font-weight: 600;
        user-select: none;
    }

    .retry-button:hover {
        background-color: ${({theme}) => theme.retryButtonBackgroundColoronHover};
    }

    .wallet-description {
        background-color: ${({theme}) => theme.settingsMenuBackgroundColor};
        outline: none;
        border: 1px solid ${({theme}) => theme.modalButtonBorderColor};
        border-radius: 12px;
        display: flex;
        flex-direction: row;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 1rem;
        margin-top: 0px;
        opacity: 1;
        width: 100% !important;
    }

    .wallet-title {
        display: flex;
        flex-flow: row nowrap;
        color: ${({theme}) => theme.modalHeaderTextColor};
        font-size: 1rem;
        font-weight: 500;
    }

    .wallet-caption {
        color: ${({theme}) => theme.modalHeaderTextColor};
        margin-top: 10px;
        font-size: 12px;
    }
    
    .modal-content-button:hover {
        border-color: ${({theme}) => theme.modalButtonBorderColoronHover};
    }

    .modal-footer {
        display: flex;
        flex-flow: row wrap;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        margin-top: 2rem;
        font-size: 16px;
        color: ${({theme}) => theme.modalFooterText};
    }
    
    .modal-footer-link {
        text-decoration: none;
        cursor: pointer;
        color: ${({theme}) => theme.modalFooterLinkText};
        font-weight: 500;
        margin-left: 5px;
    }
    
    .modal-footer-link:hover {
        text-decoration: underline;
        color: ${({theme}) => theme.modalFooterLinkText};
    }

    .navbar-action-button {
        outline: none;
        cursor: pointer;
        position: relative;
        width: 100%;
        border: none;
        margin: 0px;
        height: 35px;
        background-color: ${({theme}) => theme.navbarButtonBackgroundColor};
        padding: 0.15rem 0.5rem;
        border-radius: 0.5rem;
        color: ${({theme}) => theme.navbarButtonIconColor};
    }
    
    .navbar-action-button:hover {
        background-color: ${({theme}) => theme.navbarButtonBackgroundColoronHover};
    }

    .network {
        color: ${({theme}) => theme.networkColor};
        background-color: ${({theme}) => theme.networkBackgroundColor};
    }

    .network:hover {
        background-color: ${({theme}) => theme.navbarButtonBackgroundColor};
    }

    .navbar-action-button svg{
        margin-top: 5px;
        height: 20px;
        width: 20px;
        stroke: ${({theme}) => theme.modalContentColor};
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .settings-menu {
        min-width: 20.125rem;
        background-color: ${({theme}) => theme.settingsMenuBackgroundColor};
        box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        position: absolute;
        top: 4rem;
        right: 0rem;
        z-index: 200 !important;
    }

    .settings-title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 600;
        font-size: 14px;
        color: ${({theme}) => theme.settingsTitleText};
    }

    .settings-option-title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 400;
        color: ${({theme}) => theme.settingsOptionTitleText};
        font-size: 14px;
    }
    
    .info-icon {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding: 0.2rem;
        border: none;
        background: none ${({theme}) => theme.settingsInfoIconBackground};
        outline: none;
        cursor: default;
        border-radius: 36px;
        color: ${({theme}) => theme.settingsInfoIconColor};
    }

    .ant-tooltip-inner {
        background-color: ${({theme}) => theme.tooltipBackgroundColor} !important;
        color: ${({theme}) => theme.tooltipTextColor} !important;
        box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px !important;
        padding: 0.9rem !important;
        font-family: 'PT Sans Caption';
        font-size: 14px;
        border-radius: 12px !important;
        line-height: 1.6rem;
    }
    
    .ant-tooltip-arrow-content {
        background-color: ${({theme}) => theme.tooltipArrowBackgroundColor} !important;
    }

    .tolerance-button {
        cursor: pointer;
        -webkit-box-align: center;
        align-items: center;
        height: 2rem;
        border-radius: 36px;
        font-size: 1rem;
        width: auto;
        min-width: 3.5rem;
        border: 1px solid ${({theme}) => theme.toleranceButtonBorderColor};
        outline: none;
        background: ${({theme}) => theme.toleranceButtonBackgroundColor};
        margin-right: 8px;
        color: ${({theme}) => theme.toleranceButtonTextColor};
    }
    
    .tolerance-button:hover, .tolerance-input-button:hover {
        border-color: ${({theme}) => theme.toleranceButtonBorderColoronHover};
    }
    
    .tolerance-active {
        background: ${({theme}) => theme.toleranceButtonActiveBackgroundColor};
        color: #FFF;
    }

    .tolerance-input-button {
        color: rgb(0, 0, 0);
        -webkit-box-align: center;
        align-items: center;
        border-radius: 36px;
        font-size: 1rem;
        width: auto;
        min-width: 3.5rem;
        border: 1px solid ${({theme}) => theme.toleranceButtonInputBorderColor};
        outline: none;
        background: ${({theme}) => theme.toleranceButtonInputBackgroundColor};
        height: 2rem;
        position: relative;
        padding: 0px 0.75rem;
        flex: 1 1 0%;
    }
    
    .tolerance-input {
        width: 100%;
        height: 100%;
        border: 0px;
        border-radius: 2rem;
        background: ${({theme}) => theme.toleranceInputBackgroundColor};
        font-size: 16px;
        outline: none;
        color: ${({theme}) => theme.toleranceInputTextColor};
        text-align: right;
        font-family: 'Inrer var';
    }
    
    .tolerance-input:focus .tolerance-input-button{
        border: 1px solid rgb(255, 0, 122);
    }

    .tolerance-input-container span {
        color: ${({theme}) => theme.deadlineTextColor};
    }

    .toggle-button {
        border-radius: 12px;
        border: none;
        background: ${({theme}) => theme.toggleButtonBackgroundColor};
        display: flex;
        width: fit-content;
        cursor: pointer;
        outline: none;
        padding: 0px;
        user-select: none;
    }
    
    .toggle-on {
        padding: 0.35rem 0.6rem;
        border-radius: 12px;
        background: none;
        color: ${({theme}) => theme.toggleButtonOnTextColor};
        font-size: 1rem;
        font-weight: 500;
    }
    
    .toggle-on:hover {
        opacity: ${({theme}) => theme.toggleButtonOnOpacityonHover};
    }

    .toggle-off {
        padding: 0.35rem 0.6rem;
        border-radius: 12px;
        background: ${({theme}) => theme.toggleButtonOffBackgroundColor};
        color: ${({theme}) => theme.toggleButtonOffTextColor};
        font-size: 1rem;
        font-weight: 400;
    }
    
    .toggle-off:hover {
        background: ${({theme}) => theme.toggleButtonOffBackgroundColoronHover};
    }
    
    .toggle-active {
        padding: 0.35rem 0.6rem;
        border-radius: 12px;
        background: ${({theme}) => theme.toggleActiveBackgroundColor};
        color: #FFF;
        font-size: 1rem;
        font-weight: 500;
    }

    .confirmation-modal-container {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding: 2rem 0px;
        background-color: ${({theme}) => theme.confirmationModalBackgroundColor};
        border-radius: 20px;
    }

    .confirmation-modal-header {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        width: 100%;
        display: flex;
        padding: 0 2rem;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        color: ${({theme}) => theme.modalContentColor};
    }

    .modal-divider {
        width: 100%;
        background-color: ${({theme}) => theme.modalDividerColor};
        height: 1px;
    }

    .confirmation-modal-title {
        box-sizing: border-box;
        margin: 0px auto;
        min-width: 0px;
        font-family: 'PT Sans Caption';
        font-weight: 500;
        font-size: 20px;
        color: ${({theme}) => theme.modalContentColor};
    }

    .confirmation-modal-content {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 20px;
        color: ${({theme}) => theme.modalContentColor};
        padding: 0 2rem;
    }
    
    .confirmation-modal-content-bold {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 600;
        font-size: 20px;
        color: ${({theme}) => theme.modalContentBoldColor};
        padding: 0 2rem;
    }

    .buy-modal-grid {
        display: grid;
        grid-auto-rows: auto;
        row-gap: 24px;
        width: 100%;
        padding: 1rem;
        background-color: ${({theme}) => theme.buyModalBackgroundColor};
    }

    .buy-modal-header {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        width: 100%;
        display: flex;
        padding: 0;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        color: ${({theme}) => theme.modalContentColor};
    }

    .buy-modal-title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-family: 'PT Sans Caption';
        font-weight: 600;
        font-size: 20px;
        color: ${({theme}) => theme.modalContentColor};
    }

    .buy-modal-container {
        display: flex;
        flex-flow: column nowrap;
        position: relative;
        border-radius: 20px;
        background-color: ${({theme}) => theme.modalContentBackgroundColor};
        z-index: 1;
    }

    .tokens-modal-container {
        background-color: ${({theme}) => theme.tokensModalBackgroundColor};
    }

    .buy-inner-container {
        border-radius: 20px;
        width: 100%;
        border: 1px solid ${({theme}) => theme.modalContentBackgroundColor};
        background-color: ${({theme}) => theme.modalHeaderBackgroundColor};
    }

    .available-deposit-container {
        display: flex;
        flex-flow: row nowrap;
        -webkit-box-align: center;
        align-items: center;
        color: ${({theme}) => theme.modalHeaderTextColor};
        font-size: 0.75rem;
        line-height: 1rem;
        padding: 0.75rem 1rem 0px;
    }

    .available-deposit-inner-container {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 14px;
        color: ${({theme}) => theme.settingsOptionTitleText};
    }

    .deposit-input-container input {
        color: ${({theme}) => theme.settingsTitleText};
        width: 0px;
        position: relative;
        font-weight: 500 !important;
        outline: none;
        border: none;
        flex: 1 1 auto;
        background-color: ${({theme}) => theme.buyModalBackgroundColor};
        font-size: 24px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0px;
        appearance: textfield;
    }

    .max-deposit-button {
        outline: none;
        height: 28px;
        background-color: ${({theme}) => theme.connectToWalletBackgroundColor};
        border: 1px solid ${({theme}) => theme.connectToWalletBackgroundColor};
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        margin-right: 0.5rem;
        color: ${({theme}) => theme.primary};
    }

    .max-deposit-button:hover {
        border: 1px solid ${({theme}) => theme.primary};
    }

    .token-select-button {
        -webkit-box-align: center;
        align-items: center;
        height: 2.2rem;
        font-size: 20px;
        font-weight: 600;
        background-color: ${({theme}) => theme.buyModalBackgroundColor};
        color: ${({theme}) => theme.modalHeaderTextColor};
        border-radius: 12px;
        box-shadow: none;
        outline: none;
        cursor: pointer;
        user-select: none;
        border: none;
        padding: 0px 0.5rem;
    }

    .token-select-button:hover, .token-select-button:focus {
        background-color: ${({theme}) => theme.modalContentBackgroundColor};
    }

    .received-amount {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-size: 16px;
        font-weight: 600;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .buy-action-button {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        background-color: ${({theme}) => theme.buyModalButtonBackgroundColor};
        color: ${({theme}) => theme.buyModalButtonTextColor};
        cursor: pointer;
        box-shadow: none;
        border: 1px solid transparent;
        outline: none;
        opacity: 1;
        padding: 18px;
        margin: 0px 0.5rem 0px 0px;
        width: 100%;
        font-weight: 500;
        text-align: center;
        border-radius: 12px;
    }

    .buy-action-button:hover {
        background-color: ${({theme}) => theme.buyModalButtonBackgroundColoronHover};
    }

    .buy-action-button:disabled {
        cursor: auto;
        background-color: ${({theme}) => theme.buyModalInactiveButtonBackgroundColor};
        color: ${({theme}) => theme.buyModalInactiveButtonTextColor};
    }

    .step {
        min-width: 20px;
        min-height: 20px;
        background-color: ${({theme}) => theme.stepBackgroundColor};
        border-radius: 50%;
        color: rgb(255, 255, 255);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        line-height: 8px;
        font-size: 12px;
    }

    .step-active {
        background-color: ${({theme}) => theme.primary};
    }

    .step-bar {
        width: 100%;
        height: 2px;
        background: ${({theme}) => theme.stepBarBackgroundColor};
        opacity: 0.6;
    }

    .tokens-modal-title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 16px;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .individual-token {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        width: 100%;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 4px 20px;
        height: 56px;
        display: grid;
        grid-template-columns: auto minmax(auto, 1fr) auto minmax(0px, 72px);
        gap: 16px;
        cursor: pointer;
        opacity: 1;
    }

    .individual-token:hover {
        background-color: ${({theme}) => theme.tokenHoverBackgroundColor};
    }

    .token-title {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 16px;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .links-container {
        min-width: 9.125rem;
        background-color: ${({theme}) => theme.linksContainerBackgroundColor};
        box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
        border-radius: 12px;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        position: absolute;
        top: 4rem;
        right: 0rem;
        z-index: 100;
    }
    
    .link {
        flex: 1 1 0%;
        padding: 0.5rem;
        color: ${({theme}) => theme.linkTextColor};
    }
    
    .link:hover {
        color: ${({theme}) => theme.linkTextColoronHover};
    }

    .countdown {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 400;
        text-align: center;
        color: ${({theme}) => theme.countdownTextColor};
        font-size: 16px;
    }
    
    .countdown code {
        color: ${({theme}) => theme.countdownTextColor};
    }

    .buy-button {
        padding: 8px;
        width: 160px;
        font-weight: 500;
        text-align: center;
        border-radius: 8px;
        outline: none;
        border: 1px solid transparent;
        text-decoration: none;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        flex-wrap: nowrap;
        -webkit-box-align: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
        background-color: ${({theme}) => theme.buyButtonBackgroundColor};
        color: white;
    }
    
    .buy-button:hover {
        background-color: ${({theme}) => theme.buyButtonBackgroundColoronHover};
    }

    .claim-moon-button {
        padding: 8px 16px;
        width: 100%;
        font-weight: 500;
        text-align: center;
        border-radius: 12px;
        outline: none;
        border: 1px solid transparent;
        text-decoration: none;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        flex-wrap: nowrap;
        -webkit-box-align: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
        background-color: ${({theme}) => theme.buyModalButtonBackgroundColor};
        color: ${({theme}) => theme.buyModalButtonTextColor};
    }

    .claim-moon-button:hover {
        background-color: ${({theme}) => theme.buyModalButtonBackgroundColoronHover};
    }

    .claim-modal-container {
        background-color: ${({theme}) => theme.tokensModalBackgroundColor};
    }

    .claim-description {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        font-size: 14px;
        color: ${({theme}) => theme.countdownTextColor};
    }

    .claim-input-outer-container {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1.25rem;
        width: 100%;
        border: 1px solid ${({theme}) => theme.modalContentBackgroundColor};
        background-color: ${({theme}) => theme.modalHeaderBackgroundColor};
        transition: border-color 300ms step-start 0s, color 500ms step-start 0s;
    }

    .input-label {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        color: ${({theme}) => theme.pageLinkText};
        font-size: 14px;
    }

    .claim-input {
        font-size: 1.25rem !important;
        outline: none;
        border: none;
        flex: 1 1 auto;
        transition: color 300ms step-start 0s;
        color: ${({theme}) => theme.primary};
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 500;
        width: 100%;
        padding: 0px;
        background-color: ${({theme}) => theme.tokensModalBackgroundColor};
        appearance: textfield;
    }

    .external-link {
        font-size: 14px !important;
        color: ${({theme}) => theme.primary};
        text-decoration: none;
        font-weight: 500;
    }

    .external-link:hover {
        color: ${({theme}) => theme.primary};
        text-decoration: underline;
    }

    .ant-notification-notice {
        top: 3.25rem;
        padding: 1rem !important;
        border-radius: 8px !important;
        background-color: ${({theme}) => theme.notificationBackgroundColor};
    }

    .ant-notification-notice-message, .ant-notification-close-icon {
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .heading {
        box-sizing: border-box;
        margin: 0.5rem 0 0 0;
        min-width: 0px;
        font-weight: 500;
        font-size: 20px;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .stake-card-heading {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 600;
        color: white;
        font-size: 18px;
    }

    .outlined-box {
        display: grid;
        grid-auto-rows: auto;
        border-radius: 12px;
        width: 100%;
        position: relative;
        overflow: hidden;
        background: none;
        border: 1px solid ${({theme}) => theme.outlinedBoxBorderColor};
        padding: 1rem;
        z-index: 1;
    }

    .stats-wrapper{
        display : flex;
        flex-direction : row;
        justify-content : center;
        align-items :center;
        height : 70vh;   
    }

    .stats-card{
        background : ${({theme}) => theme.buyModalBackgroundColor};
        padding : 3rem;
        border-radius : 12px;
        display : flex;
        flex-direction : column;
        justify-content : center;
        align-items : center;
    }

    .stats-text-heading{
        color : ${({theme})=>theme.deadlineTextColor} !important;
        font-size : 1.3rem;
        font-weight : 600;
        font-family: 'PT Sans Caption', sans-serif; 
    }

    .stats-text{
        color : ${({theme})=>theme.deadlineTextColor};
        font-size : 1.2rem;
        font-weight : 500;
        padding-top : 2rem;
        font-family: 'PT Sans Caption', sans-serif;
    }

    .text-regular {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 400;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .text-semibold {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 500;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .text-semibold-2x {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        font-weight: 600;
        color: ${({theme}) => theme.modalHeaderTextColor};
    }

    .shaded-container {
        display: grid;
        grid-auto-rows: auto;
        border-radius: 12px;
        width: 100%;
        position: relative;
        overflow: hidden;
        background: ${({theme}) => theme.shadedContainerBackgroundColor};
        opacity: 0.4;
        margin-top: -40px;
        padding: 32px 1.25rem 1rem;
        z-index: -5;
    }

    .header-lp{
        display : flex;
        flex-direction : row;
        justify-content : space-between;
        align-items : center;
    }

    .total-liquidity{
        color: ${({theme}) => theme.modalHeaderTextColor};
        font-size: 14px;
        font-weight : 500;
    }

    .shaded-text {
        color: ${({theme}) => theme.shadedTextColor};
    }

    .container {
        padding: 100px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index : 1;
        overflow: hidden;
    }

    .tabs {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1rem;
    }
    
    .tabs a {
      font-family: "PT Sans Caption", sans-serif;
      font-size: 15px;
      // color: ${({theme}) => theme.formControlText};
      color: #FFF;
      opacity: 0.7;
      transition: all 0.3s ease;
    }
    
    .tabs a:hover,
    .tabs a:focus,
    .tab-active {
      opacity: 1 !important;
    }

    .exchange-card {
        position: relative;
        max-width: 400px;
        width: 100%;
        border-radius: 20px;
        // background-color: ${({theme}) => theme.exchangeCardBackgroundColor};
        background: ${({theme}) => theme.exchangeCardBackground};
        padding: 20px 18px;
      }
    
    .exchange-card .noise {
      border-radius: 20px;
    }
      
      .form-control {
        padding: 12px 13px;
        // background-color: ${({theme}) => theme.formControlBackgroundColor};
        border-radius: 10px;
        // border: 1px solid ${({theme}) => theme.exchangeCardBackgroundColor};
        background-color: ${({theme}) => theme.swapFormControlBackgroundColor};
        border: 1px solid ${({theme}) => theme.swapFormControlBackgroundColor};
        font-size: 12px;
        text-transform: uppercase;
        color: ${({theme}) => theme.formControlText} !important;
      }

      .swap-form .form-control {
        background-color: ${({theme}) => theme.swapFormControlBackgroundColor};
        border: 1px solid ${({theme}) => theme.swapFormControlBackgroundColor};
      }

      .swap-form .input-container input {
        font-size: 22px;
      }

      .swap-form .input-container input + div {
        opacity: 0.7;
        font-size: 12px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 8px;
      }

      .swap-form .input-container {
        align-items: flex-start;
      }
      
      .form-control > .flex-spaced-container > div:nth-child(2) {
        color: ${({theme}) => theme.formControlText} !important;
        font-family : "PT Sans Caption" !important;
        font-size : 12px !important;
      }
      
      .swap-form .form-control .flex-spaced-container > div {
        opacity: 0.7;
        text-transform: capitalize;
      }
      
      .input-container {
        margin-top: 8px;
        width: 100%;
        display: inline-flex;
      }
      
      .input-container input {
        width: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        box-shadow: none;
        font-family: "PT Sans Caption";
        font-size: 19px;
        padding: 0 0.5rem 0 0;
      }
      
      .input-container input::placeholder {
        opacity: 0.4;
      }
      
      .input-container > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      
      .max-button {
        cursor: pointer;
        height: 30px;
        border: none;
        border-radius: 10px;
        background-color: ${({theme}) => theme.primary};
        color: #fff;
        box-shadow: none;
        text-transform: uppercase;
        margin-right: 5px;
        font-size: 13px;
        font-weight: 600;
        padding: 0 10px;
      }
      
      .asset-select-button {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 32px;
        border: none;
        border-radius: 10px;
        background-color: ${({theme}) => theme.assetSelectBackgroundColor};
        box-shadow: none;
        padding: 0 9px;
        color: ${({theme}) => theme.formControlText};
        font-family: "PT Sans Caption";
        font-size: 14px;
      }

      .swap-form .asset-select-button {
        background-color: ${({theme}) => theme.assetSelectBackgroundColor};;
        font-size: 14px;
      }

      .swap-form .asset-select-button span {
        position: relative;
      }

      .swap-form .asset-select-button img {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        border-radius: 50%;
      }

      .swap-form .asset-select-button svg {
        margin-left: 0.5rem;
        font-size: 15px;
      }

      .swap-form .asset-select-button[data-empty=true] svg {
        margin-left: 8px;
      }

      .asset-select-button[data-empty=true] {
        background-color: ${({theme}) => theme.primary};
      }
      
      .asset-select-button img {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        border-radius: 50%;
      }
      
      .asset-select-button span {
        position: relative;
      }
      
      .asset-select-button svg {
        margin-left: 8px;
        font-size: 10px;
      }
      
      .max-button:hover,
      .asset-select-button:hover {
        opacity: 0.65;
      }

      .max-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .details-section:not(:empty) {
        margin-top: 1rem;
        display: grid;
        grid-auto-rows: auto;
        row-gap: 0.75rem;
        font-family: "PT Sans Caption", sans-serif;
        background-color: ${({theme}) => theme.swapFormControlBackgroundColor};
        color: ${({theme}) => theme.formControlText};
        border-radius: 10px;
        padding: 10px;
      }
      
      .invert-button {
        position: relative;
        top: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        color: ${({theme}) => theme.navbarButtonIconColor} !important;
        border-radius: 50%;
        height: 23px;
        width: 23px;
        cursor: pointer;
        box-shadow: none;
        margin-left: 5px;
        outline: none;
      }
      
      .invert-button:focus, .invert-button:hover {
        border-color: ${({theme}) => theme.primary};
      }

      .swap-form .action {
        position: relative;
        height: 1px;
        background-color: ${({theme}) => theme.swapDividerColor};
        border-radius: 0;
        width: 100%;
        margin: 0;
        font-size: 26px;
      }

      .swap-form .action svg {
        position: absolute;
        background-color: ${({theme}) => theme.swapDividerColor};
        border: 1px solid transparent;
        height: 25px;
        width: 25px;
        padding: 4px;
        border-radius: 50%;
        margin: auto;
      }

      .swap-form .action svg:hover {
        border-color: ${({theme}) => theme.primary};
      }
      
      .action {
        width: 26px;
        height: 26px;
        background-color: ${({theme}) => theme.swapFormControlBackgroundColor};
        color: ${({theme}) => theme.actionIconColor};
        margin: 0.75rem auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 16px;
      }
      
      .exchange-button-container {
        font-family: "PT Sans Caption";
        z-index: 5;
        margin-top: 20px;
        max-width: 400px;
        width: 100%;
        border-radius: 0 0 10px 10px;
      }
      
      .exchange-button-container a {
        color: ${({theme}) => theme.primary};
        font-size: 13px;
      }
      
      .exchange-button-container a:hover {
        text-decoration: underline;
      }
      
      .exchange-button-container p {
        // color: ${({theme}) => theme.formControlText};
        color: #FFF;
        text-align: center;
        margin: 0.45rem 0;
        font-size: 13px;
      }
      
      .exchange-button-container button {
        cursor: pointer;
        width: 100%;
        height: 41px;
        border: none;
        border-radius: 10px;
        background-color: ${({theme}) => theme.primary};
        color: #FFF;
        margin-top: 1rem;
        font-weight : 600;
        outline : none;
        font-size: 14px;
      }
      
      .exchange-button-container button:disabled, .remove-liquidity-actions button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      
      .add-liquidity-button {
        cursor: pointer;
        box-shadow: none;
        width: 100%;
        margin: 2rem 0 1.5rem;
        height: 45px;
        border: none;
        border-radius: 10px;
        background-color: ${({theme}) => theme.primary};
        color: #fff;
        font-weight : bold;
      }
      
      .add-liquidity-button:hover {
        opacity: 0.75;
      }
      
      .pool-details .flex-spaced-container > div {
        font-size: 15px;
        font-family: "PT Sans Caption";
      }
      
      .liquidity-section {
        margin-top: 0.75rem;
        background-color: ${({theme}) => theme.formControlBackgroundColor};
        border-radius: 10px;
        border: 2px solid ${({theme}) => theme.formControlBorderColor};
        max-height: 260px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
      }
      
      .liquidity-section > span {
        opacity: 0.5;
        margin: 50px auto;
        font-size: 14px;
        color: ${({theme}) => theme.formControlText};
      }
      
      .pool-form .flex-spaced-container {
        // color: ${({theme}) => theme.formControlText};
        color: #FFF;
      }
      
      .pool-form .flex-spaced-container span {
        font-family: "PT Sans Caption";
        font-size: 16px;
      }
      
      .search-currency-input {
        font-family: "PT Sans Caption", sans-serif;
        border-radius: 15px;
        color: ${({theme}) => theme.formControlText};
        border: 1px solid ${({theme}) => theme.formControlBorderColor};
        outline: none;
        padding: 5px 10px;
        height: 40px;
        width: 100%;
        margin-bottom: 15px;
        background-color: ${({theme}) => theme.formControlBackgroundColor};
      }

      .search-currency-input + div {
        font-family: "PT Sans Caption", sans-serif;
        color: ${({theme}) => theme.primary} !important;
      }
      
      .ant-tooltip {
        z-index: 1302;
      }
      
      .ant-tooltip-arrow {
        display: none;
      }
      
      .ant-tooltip-inner {
        background-color: #eee;
        border-radius: 10px;
        color: #6e6e6e;
        padding: 0.75rem;
      }

      .ant-notification-notice-description {
        color: ${({theme}) => theme.formControlText} !important;
      }
      
      .common-base {
        cursor: pointer;
        display: flex;
        padding: 6px;
        margin: 4px;
        border-radius: 10px;
        border: 1px solid rgb(237, 238, 242);
        background-color: #FFF;
      }
      
      .common-base:hover, .currency-row:hover {
        background-color:  ${({theme}) => theme.rowHoverBackgroundColor};
      }
      
      .common-base img {
        width: 24px;
        height: 24px;
        box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
        border-radius: 24px;
        margin-right: 8px;
      }
      
      .common-base div {
        font-weight: 500;
        font-size: 16px;
      }
      
      .currency-rows-container::before {
        content: '';
        height: 1px;
        width: 360px;
        position: absolute;
        left: 0;
        background-color: ${({theme}) => theme.modalContentBackgroundColor};
      }
      
      .currency-rows-container {
        height: 328px;
        width: 100%;
        overflow: auto;
        background-color: ${({theme}) => theme.modalContentBackgroundColor};
      }
      
      .currency-row {
        font-family: "PT Sans Caption", sans-serif;
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 4px 24px;
        height: 56px;
        display: grid;
        grid-template-columns: auto minmax(auto, 1fr) auto minmax(0px, 72px);
        gap: 16px;
        cursor: pointer;
        opacity: 1;
        color: ${({theme}) => theme.formControlText};
      }
      
      .currency-row img{
        width: 24px;
        height: 24px;
        box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
        border-radius: 24px;
      }
      
      [data-disabled="true"] {
        opacity: 0.2;
        cursor: not-allowed;
      }

      [data-disabled="true"]:hover {
        opacity: 0.2;
      }
      
      .lp-card {
        width: 100%;
        background-color: ${({theme}) => theme.poolCardBackgroundColor};
        border-radius: 10px;
        padding: 10px;
      }
      
      .lp-card:not(:nth-last-child(1)) {
        margin-bottom: 8px;
      }
      
      .lp-card img {
        width: 15px;
        height: 15px;
        box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
        border-radius: 15px;
      }
      
      .lp-card-heading {
        color: ${({theme}) => theme.formControlText};
        font-family: "PT Sans Caption";
        display: flex;
      }
      
      .lp-card-heading span {
        font-weight: 500;
      }
      
      .lp-icons {
        margin-right: 4px;
      }
      
      .lp-card-heading + a {
        color: ${({theme}) => theme.primary};
        font-family: "PT Sans Caption";
        font-size: 13px;
        text-decoration: underline;
      }
      
      .lp-card .flex-spaced-container {
        margin: 5px 0;
        color: ${({theme}) => theme.formControlText};
      }
      
      .lp-card .flex-spaced-container > div:nth-child(1) {
        font-family: 'PT Sans Caption';
      }
      
      .lp-card .flex-spaced-container > div:nth-child(2) {
        display: flex;
        align-items: center;
      }
      
      .lp-card .flex-spaced-container > div:nth-child(2) img{
        margin-left: 5px;
      }
      
      .lp-card-buttons {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: 1fr 1fr;
        column-gap: 8px;
        width: 100%;
        margin-top: 12px;
      }
      
      .lp-card-buttons button {
        cursor: pointer;
        width: 100%;
        border: none;
        border-radius: 10px;
        background-color: ${({theme}) => theme.primary};
        color: #FFF;
        height: 30px;
        font-size: 13px;
      }

      .lp-card-buttons button:hover {
        opacity: 0.8;
      }
      
      .text-large {
        margin: 5px 0;
        font-family: 'PT Sans Caption';
        font-weight: bold;
        font-size: 2.8rem;
      }

      .percent-slider {
        width: 90%;
        margin: auto;
      }
      
      .percent-slider .rc-slider-handle, .percent-slider .rc-slider-handle-click-focused:focus {
        border-color: ${({theme}) => theme.primary};
      }
      
      .percent-slider .rc-slider-track {
        background-color: ${({theme}) => theme.primary};
      }
      
      .percent-slider .rc-slider-handle:active, .percent-slider .rc-slider-handle:focus {
        box-shadow: 0 0 5px ${({theme}) => theme.primary};
      }
      
      .percent-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 1.15rem 0 0.5rem;
      }
      
      .percent-buttons button {
        padding: 0.25rem 0.5rem;
        background-color: ${({theme}) => theme.exchangeButtonBackgroundColor};
        border: 1px solid ${({theme}) => theme.exchangeButtonBackgroundColor};
        border-radius: 0.5rem;
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
        margin: 0.25rem;
        overflow: hidden;
        // color: ${({theme}) => theme.pageLinkTextPrimary};
        color: #FFF;
        width: 20%;
        outline: none;
      }
      
      .percent-buttons button:hover, .percent-buttons button:focus {
        border-color: ${({theme}) => theme.primary};
      }
      
      .pool-amount-row > div:nth-child(1) {
        color: ${({theme}) => theme.formControlText};
        font-family: 'PT Sans Caption';
        font-size: 0.9rem;
      }
      
      .pool-amount-row > div:nth-child(2) {
        display: flex;
        align-items: center;
      }
      
      .pool-amount-row > div:nth-child(2) img {
        width: 20px;
        height: 20px;
        box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
        border-radius: 20px;
        margin-right: 6px;
      }
      
      .remove-liquidity-actions {
        position: relative;
        z-index: 1;
        top: 1px;
        max-width: 400px;
        width: 100%;
        padding: 20px 0 0;
        background-color: transparent;
        border-radius: 0 0 10px 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 5px;
      }
      
      .remove-liquidity-actions button {
        cursor: pointer;
        width: 100%;
        height: 45px;
        border: none;
        border-radius: 10px;
        color: #fff;
        background-color: ${({theme}) => theme.primary};
        width: 100%;
      }
      
      .import-button {
        cursor: pointer;
        width: 100%;
        height: 25px;
        border: none;
        border-radius: 10px;
        color: #fff;
        background-color: ${({theme}) => theme.primary};
      }
      
      .import-pool-select {
        padding: 18px;
        width: 100%;
        font-weight: 500;
        text-align: center;
        border-radius: 20px;
        outline: none;
        text-decoration: none;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        align-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
        border: 1px solid ${({theme}) => theme.formControlBorderColor};
        background-color: ${({theme}) => theme.formControlBackgroundColor};
        color: ${({theme}) => theme.formControlText};
      }
      
      .import-pool-select:hover, .import-pool-select:focus {
        border-color: ${({theme}) => theme.primary};
      }
      
      .import-pool-select > div {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        width: 100%;
        display: flex;
        padding: 0px;
        align-items: center;
        justify-content: space-between;
        user-select: none;
      }
      
      .import-pool-select-icon {
        width: 24px;
        height: 24px;
        box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
        border-radius: 24px;
        margin-right: 8px;
      }

      .staking-modal-footer {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 20px 0 0;
        gap: 10px;
    }
    
    .staking-modal-button {
        width: 50%;
        cursor: pointer;
        height: 45px;
        padding: 5px 0;
        border: 1px solid ${({theme}) => theme.primary};
        border-radius: 10px;
        background-color: transparent;
        color: ${({theme}) => theme.primary};
        font-family: 'PT Sans Caption';
        font-size: 14px;
    }
    
    .staking-modal-button-primary {
        width: 50%;
        cursor: pointer;
        height: 45px;
        padding: 5px 0;
        border: 1px solid ${({theme}) => theme.primary};
        border-radius: 10px;
        background-color: ${({theme}) => theme.primary};
        color: #FFF;
        font-family: 'PT Sans Caption';
        font-size: 14px;
    }
    
    .staking-modal-button:hover, .staking-modal-button-primary:hover {
        opacity: 0.65;
    }
    
    .staking-modal-button-primary:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

      .app-modal .modal-header {
        border-radius: 20px 20px 0 0;
      }

      .close-modal-button {
          cursor: pointer;
          align-items: center;
          border: 0px;
          box-shadow: none;
          display: inline-flex;
          font-family: inherit;
          font-size: 24px;
          -webkit-box-pack: center;
          justify-content: center;
          letter-spacing: 0.03em;
          line-height: 1;
          opacity: 1;
          outline: 0px;
          background-color: transparent;
          color: ${({theme}) => theme.formControlText};
      }

      .new-pool-details h1 {
        font-family: "PT Sans Caption", sans-serif;
        color: ${({theme}) => theme.formControlText} !important;
        margin: 0;
      }

      .new-pool-title {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${({theme}) => theme.navbarButtonBackgroundColor};
        background-color: ${({theme}) => theme.newPoolBlockBackgroundColor};
        border-radius: 15px;
        padding: 1rem;
      }

      .new-pool-logos {
        display: flex;
        align-items: center;
        margin-left: 5px;
      }

      .new-pool-logos img {
        width: 26px;
        height: 26px;
        border-radius: 50%;
      }

      .new-pool-logos img:nth-child(1) {
        margin-right: 2px;
      }

      .details-grid {
        font-family: "PT Sans Caption", sans-serif;
        color: ${({theme}) => theme.formControlText};
        display: grid;
        grid-auto-rows: auto;
        row-gap: 0.75rem;
        margin: 1.75rem 0 1.25rem;
      }

      .details-grid > div {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }
      
      @-moz-document url-prefix() {
        .input-container input {
          width: 51%;
          border: none;
          outline: none;
          background-color: transparent;
          box-shadow: none;
          font-family: "PT Sans Caption";
          font-size: 19px;
          color: var(--text);
          padding: 0;
        }
      
        .without-max input {
          width: 70%;
        }

        .invert-button svg {
          transform: scale(1.8);
        }
      }      

    @media only screen and (max-width: 1280px) {
        .navbar-actions-main-container {
            flex-direction: row;
            -webkit-box-pack: justify;
            justify-content: space-between;
            justify-self: center;
            max-width: 1280px;
            padding: 1rem;
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100%;
            z-index: 111;
            height: 72px;
            border-radius: 12px 12px 0px 0px;
            background-color: ${({theme}) => theme.navbarBottomBackgroundColor} !important;
        }

        .settings-menu {
            min-width: 18.125rem;
            top: -22rem;
        }
    
        .links-container {
            top: -17.25rem;
        }
    }

    @media only screen and (max-width: 800px) {
      .container {
        padding: 100px 0 150px;
      }
    }

    @media only screen and (max-width: 520px) {

      .wallet-balance {
        display: none;
      }

      .settings-menu {
        top: -23rem;
      }

      .links-container {
        top: -16rem;
      }

    }

    @media only screen and (max-width: 600px) {
        .stake-deposit-container {
            padding-top: 30px !important;
            padding-bottom: 170px !important;
            overflow: scroll !important;
        }
        .header-lp{
            display : flex;
            flex-direction : column;
            justify-content : space-between;
            align-items : center;
        }

        .total-liquidity{
            color: ${({theme}) => theme.modalHeaderTextColor};
            font-size: 18px;
            font-weight : 500;
        }
    }

    .navbar-burger svg {
      stroke-width: 0;
    }

    .sidebar .ant-drawer-close {
      margin-top: -0.25rem;
      color: ${({theme}) => theme.formControlText};
    }

    .sidebar .ant-drawer-content {
      background-color: ${({theme}) => theme.bodyBackgroundColor};
    }

    .sidebar .ant-drawer-body {
      display: flex;
      flex-direction: column;
    }

    .sidebar {
      display: flex;
      justify-content: flex-end;
      height: 0px;
      display: block;
      overflow: hidden;
      transition: 0.25s all ease-in;
    }

    .expanded[data-accordion-expanded=false] {
      height: 330px;
    }

    .expanded[data-accordion-expanded=true] {
      height: 445px;
    }

    .sidebar ul {
      list-style-type: none;
      padding: 0;
      margin: 0.25rem 1.5rem 0 1rem;
      text-align: right;
    }

    .sidebar ul li {
      padding: 12px 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .navbar-pages-container svg {
      color: ${({theme}) => theme.pageLinkText};
      margin-right: 8px;
    }

    .sidebar ul li svg {
      color: ${({theme}) => theme.pageLinkText};
      margin-left: 4px;
    }

    .sidebar ul li a {
      outline: none;
      cursor: pointer;
      text-decoration: none;
      color: ${({theme}) => theme.pageLinkText};
      font-size: 1rem;
      width: fit-content;
      font-weight: 500;
    }

    .sidebar ul li a.active-page, .sidebar ul li a.active-page svg, .navbar-pages-container a.active-page svg {
      font-weight: bold;
      color: ${({theme}) => theme.pageLinkTextPrimary};
    }

    @media only screen and (min-width: 821px) {
      .navbar-burger, .sidebar {
        display: none;
      }
    }

    @media only screen and (max-width: 820px) {

      .navbar-pages-main-container {
        justify-content: space-between;
      }
    }

    .navbar-dropdown {
      position: relative;
      top: 0.5rem;
    }

    .navbar-dropdown a {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      outline: none;
      cursor: pointer;
      text-decoration: none;
      color: ${({theme}) => theme.pageLinkText};
      width: fit-content;
      font-weight: 500;
    }

    .navbar-dropdown a.active-page, .navbar-dropdown a.active-page svg {
      font-weight: bold;
      color: ${({theme}) => theme.pageLinkTextPrimary};
    }

    .navbar-dropdown svg {
      margin-right: 8px;
      color: ${({theme}) => theme.pageLinkText};
    }

    .navbar-dropdown li {
      padding: 12px 15px;
    }

    .ant-dropdown-menu {
      background-color: ${({theme}) => theme.navbarDropdownBackgroundColor};
      border-radius: 10px;
    }

    .ant-dropdown-menu-item:hover {
      background-color: ${({theme}) => theme.navbarDropdownBackgroundColoronHover};
    }

    .ant-dropdown-menu-item > a:hover, .ant-dropdown-menu-submenu-title > a:hover {
      color: ${({theme}) => theme.pageLinkTextonHover};
    }

    .exchange-accordion {
      display: grid;
      grid-auto-rows: auto;
      row-gap: 0.75rem;
      height: 0px;
      margin-top: -0.25rem;
      overflow: hidden;
      transition: 0.25s all ease-in;
    }

    .exchange-accordion-expanded {
      display: grid;
      grid-auto-rows: auto;
      row-gap: 0.9rem;
      margin-top: 1rem;
      height: 100px;
      overflow: hidden;
      transition: 0.25s all ease-in;
    }

    .exchange-accordion svg, .exchange-accordion-expanded svg {
      margin-right: 8px;
      position: relative;
      top: 2px !important;
    }
`