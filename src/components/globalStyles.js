import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: 100vh;
        background-position: 0px -30vh !important;
        background-repeat: no-repeat;
        background-color: ${({theme}) => theme.bodyBackgroundColor};
        ${({theme}) => theme.bodyBackground === 'radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 122, 0.1) 0%, rgba(255, 255, 255, 0) 100%)' ? 'background: radial-gradient(50% 50% at 50% 50%, rgba(223, 0, 4, 0.18) 0%, rgba(255, 255, 255, 0) 100%);' : ''}
    }

    .navbar-pages-container a {
        display: flex;
        flex-flow: row nowrap;
        border-radius: 3rem;
        outline: none;
        cursor: pointer;
        text-decoration: none;
        color: ${({theme}) => theme.pageLinkText};
        font-size: 1rem;
        width: fit-content;
        margin: 0px 12px;
        font-weight: 500;
    }
    
    .navbar-pages-container a:hover {
        color: ${({theme}) => theme.pageLinkTextonHover};
    }
    
    .navbar-pages-container a:nth-child(1) {
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

    .active-wallet-button {
        background-color: ${({theme}) => theme.activeWalletButtonBackgroundColor} !important;
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
        font-family: 'Inter var', sans-serif;
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
        font-family: 'Inter var', sans-serif;
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
        font-family: 'Inter var';
        font-size: 16px;
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
        font-family: 'Inrer var', 'sans-serif';
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
        font-family: 'Inter var', 'sans-serif';
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
        font-family: 'Inter var', sans-serif;
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

    @media only screen and (max-width: 960px) {
        .navbar-actions-main-container {
            flex-direction: row;
            -webkit-box-pack: justify;
            justify-content: space-between;
            justify-self: center;
            max-width: 960px;
            padding: 1rem;
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100%;
            z-index: 99;
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

    @media only screen and (max-width: 500px) {
        .navbar-actions-main-container {
            flex-direction: column;
            align-items: flex-end;
            height: 122px;
        }

        .settings-menu {
            top: -26rem;
        }
    
        .links-container {
            top: -19.25rem;
        }
    }
    
`