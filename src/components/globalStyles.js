import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
		body {
			margin: 0;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			min-height: 100vh;
		}

		.loading-container {
			background-color: ${({ theme }) => theme.bodyBackgroundColor};
			height: 100vh;
			width: 100vw;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			color: ${({ theme }) => theme.formControlText};
			font-family: 'normal', sans-serif;
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
			color: ${({ theme }) => theme.primary};
		}

		.loading-container p {
			margin-top: 1rem;
			font-size: 16px;
		}

		.app-container {
			width: 100%;
			padding-left: 230px;
			background-color: ${({ theme }) => theme.bodyBackgroundColor};
			min-height: 100vh;
			transition: 0.3s all ease;
		}

		@media only screen and (max-width: 1200px) {
			.app-container {
				padding-left: 0;
			}
		}

		.navbar-pages-container a {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				border-radius: 3rem;
				outline: none;
				cursor: pointer;
				text-decoration: none;
				color: ${({ theme }) => theme.pageLinkText};
				font-size: 1rem;
				width: fit-content;
				margin: 0px 14px;
				font-weight: 500;
		}
		
		.navbar-pages-container a:hover {
				color: ${({ theme }) => theme.pageLinkTextonHover};
		}
		
		.navbar-pages-container .active-page {
				font-weight: bold;
				color: ${({ theme }) => theme.pageLinkTextPrimary};
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
				background-color: ${({ theme }) => theme.connectToWalletBackgroundColor};
				border: 1px solid ${({ theme }) => theme.connectToWalletBorderColor};
				color: ${({ theme }) => theme.connectToWalletText};
		}

		.modal-content-button-title {
				position: relative;
				display: flex;
				-webkit-box-pack: center;
				justify-content: center;
				align-items: center;
				color: ${({ theme }) => theme.modalContentColor};
				font-size: 16px;
		}

		.modal-footer span {
				color: ${({ theme }) => theme.modalContentColor};
		}

		.modal-close-button {
				cursor: pointer;
				position: absolute;
				right: 1rem;
				top: 14px;
				color: ${({ theme }) => theme.modalContentColor};
		}
		
		.connect-to-wallet-container:hover .connect-to-wallet-button {
				border: 1px solid ${({ theme }) => theme.connectToWalletonHover};
		}

		.modal-header {
				font-family: 'normal', sans-serif;
				display: flex;
				flex-flow: row nowrap;
				padding: 1rem;
				font-size: 16px;
				font-weight: 500;
				background-color: ${({ theme }) => theme.modalHeaderBackgroundColor};
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.modal-back-header {
				display: flex;
				flex-flow: row nowrap;
				padding: 1rem;
				font-size: 16px;
				font-weight: 500;
				background-color: ${({ theme }) => theme.modalHeaderBackgroundColor};
				color: ${({ theme }) => theme.primary};
		}
		
		.modal-content {
				background-color: ${({ theme }) => theme.modalContentBackgroundColor};
				padding: 1rem;
				border-bottom-left-radius: 20px;
				border-bottom-right-radius: 20px;
		}

		.modal-content-button {
				cursor: pointer;
				background-color: ${({ theme }) => theme.swapFormControlBackgroundColor};
				outline: none;
				border: 1px solid ${({ theme }) => theme.swapFormControlBorderColor};
				border-radius: 12px;
				display: flex;
				flex-direction: row;
				-webkit-box-align: center;
				align-items: center;
				-webkit-box-pack: justify;
				justify-content: space-between;
				padding: 1.35rem 1.5rem;
				margin-top: 0px;
				opacity: 1;
				width: 100% !important;
		}

		.swap-confirmation-header {
			padding: 1rem 1.25rem 1rem 1rem;
			background-color: ${({ theme }) => theme.modalHeaderBackgroundColor};
			max-width: 400px;
			font-family: 'normal', sans-serif;
		}

		.swap-confirmation-token-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: ${({ theme }) => theme.formControlText};
			font-size: 1.5rem;
		}

		.swap-confirmation-header svg {
			position: relative;
			left: 0.5rem;
			color: ${({ theme }) => theme.formControlText};
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
			color: ${({ theme }) => theme.formControlText};
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
			font-family: 'normal', sans-serif;
			font-size: 14px;
		}

		.swap-confirmation-details > div > div:nth-child(1) {
			color: ${({ theme }) => theme.formControlText};
			filter: contrast(0.7);
		}
		
		.swap-confirmation-details > div > div:nth-child(2) {
			color: ${({ theme }) => theme.formControlText};
		}

		.active-wallet-button {
			background-color: ${({ theme }) => theme.activeWalletButtonBackgroundColor} !important;
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
				border: 1px solid ${({ theme }) => theme.modalButtonDisabledBorderColor};
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
				font-family: 'normal';
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.connection-status svg {
				margin-right: 1rem;
				color: ${({ theme }) => theme.primary};
				animation: rotation 2s infinite linear;
				-webkit-animation: rotation 2s infinite linear;
				height: 16px;
				width: 16px;
		}

		.connection-status svg path {
				stroke: ${({ theme }) => theme.primary};
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
				font-family: 'normal';
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.transaction-status svg {
				margin-right: 1rem;
				color: ${({ theme }) => theme.primary};
				animation: rotation 2s infinite linear;
				-webkit-animation: rotation 2s infinite linear;
				height: 16px;
				width: 16px;
		}
		

		.transaction-status svg path {
				stroke: ${({ theme }) => theme.primary};
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
				background-color: ${({ theme }) => theme.connectionWalletBackgroundColor};
				padding: 0rem;
		}

		.connected-wallet-container {
				padding: 1rem;
				border: 1px solid ${({ theme }) => theme.modalButtonBorderColor};
				background-color: ${({ theme }) => theme.connectedWalletBackgroundColor};
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
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.connected-wallet-title {
				width: initial;
				font-size: 0.825rem;
				font-weight: 500;
				color: ${({ theme }) => theme.connectedWalletTextColor};
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
				border: 1px solid ${({ theme }) => theme.changeWalletButtonBorderColor};
				color: ${({ theme }) => theme.primary};
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
				border: 1px solid ${({ theme }) => theme.changeWalletButtonBorderColoronHover};
		}

		.wallet-address-container {
				display: flex;
				flex-flow: row nowrap;
				-webkit-box-pack: justify;
				justify-content: space-between;
				-webkit-box-align: center;
				align-items: center;
				font-weight: 400;
				color: ${({ theme }) => theme.modalHeaderTextColor};
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
				background-color: ${({ theme }) => theme.connectedWalletFooterBackgroundColor};
				border-radius: 20px;
				min-height: 80px !important;
		}

		.connected-wallet-footer-text {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 400;
				font-size: 16px;
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.copy-address-button {
				outline: none;
				border: none;
				background: none;
				cursor: pointer;
				font-weight: 500;
				color: ${({ theme }) => theme.connectedWalletTextColor};
				flex-shrink: 0;
				display: flex;
				text-decoration: none;
				font-size: 0.825rem;
		}

		.copy-address-button:hover {
				color: ${({ theme }) => theme.connectedWalletTextColoronHover};
		}

		.wallet-address-link {
				text-decoration: none;
				color: ${({ theme }) => theme.connectedWalletTextColor};
				margin-left: 1rem;
				font-size: 0.825rem;
				display: flex;
		}

		.wallet-address-link:hover {
				text-decoration: underline;
				color: ${({ theme }) => theme.connectedWalletTextColoronHover};
		}

		.wallet-details-container {
				display: flex;
				flex-direction: row;
				-webkit-box-align: center;
				align-items: center;
				background-color: ${({ theme }) => theme.navbarButtonBackgroundColor};
				border-radius: 12px;
				white-space: nowrap;
				width: 100%;
				cursor: pointer;
		}

		.wallet-balance {
				color: ${({ theme }) => theme.pageLinkTextPrimary};
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
				background-color: ${({ theme }) => theme.settingsMenuBackgroundColor};
				border: 1px solid ${({ theme }) => theme.navbarButtonBackgroundColor};
				color: ${({ theme }) => theme.pageLinkTextPrimary};
				font-weight: 500;
		}

		.wallet-address-button:hover {
				background-color: ${({ theme }) => theme.walletAddressButtonBackgroundColoronHover});
				border: 1px solid ${({ theme }) => theme.primary};
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
				color: ${({ theme }) => theme.modalHeaderTextColor};
				background-color: ${({ theme }) => theme.retryButtonBackgroundColor};
				margin-left: 1rem;
				padding: 0.5rem;
				font-weight: 600;
				user-select: none;
		}

		.retry-button:hover {
				background-color: ${({ theme }) => theme.retryButtonBackgroundColoronHover};
		}

		.wallet-description {
				background-color: ${({ theme }) => theme.settingsMenuBackgroundColor};
				outline: none;
				border: 1px solid ${({ theme }) => theme.modalButtonBorderColor};
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
				color: ${({ theme }) => theme.modalHeaderTextColor};
				font-size: 1rem;
				font-weight: 500;
		}

		.wallet-caption {
				color: ${({ theme }) => theme.modalHeaderTextColor};
				margin-top: 10px;
				font-size: 12px;
		}
		
		.modal-content-button:hover {
				border-color: ${({ theme }) => theme.modalButtonBorderColoronHover};
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
				color: ${({ theme }) => theme.modalFooterText};
		}
		
		.modal-footer-link {
				text-decoration: underline;
				cursor: pointer;
				font-weight: 500;
				margin-left: 5px;
				color: ${({ theme }) => theme.modalFooterText};
		}

		.modal-footer-link:hover {
			color: ${({ theme }) => theme.modalFooterText};
			text-decoration: underline;
			opacity: 0.6;
		}

		.navbar-action-button {
				outline: none;
				cursor: pointer;
				position: relative;
				width: 100%;
				border: none;
				margin: 0px;
				height: 35px;
				background-color: ${({ theme }) => theme.navbarButtonBackgroundColor};
				padding: 0.15rem 0.5rem;
				border-radius: 0.5rem;
				color: ${({ theme }) => theme.navbarButtonIconColor};
		}
		
		.navbar-action-button:hover {
				background-color: ${({ theme }) => theme.navbarButtonBackgroundColoronHover};
		}

		.network {
				color: ${({ theme }) => theme.networkColor};
				background-color: ${({ theme }) => theme.networkBackgroundColor};
		}

		.network:hover {
				background-color: ${({ theme }) => theme.navbarButtonBackgroundColor};
		}

		.navbar-action-button svg{
				margin-top: 5px;
				height: 20px;
				width: 20px;
				stroke: ${({ theme }) => theme.modalContentColor};
				stroke-width: 2;
				stroke-linecap: round;
				stroke-linejoin: round;
		}

		.settings-menu {
				min-width: 20.125rem;
				background-color: ${({ theme }) => theme.settingsMenuBackgroundColor};
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
				color: ${({ theme }) => theme.settingsTitleText};
		}

		.settings-option-title {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 400;
				color: ${({ theme }) => theme.settingsOptionTitleText};
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
				background: none ${({ theme }) => theme.settingsInfoIconBackground};
				outline: none;
				cursor: default;
				border-radius: 36px;
				color: ${({ theme }) => theme.settingsInfoIconColor};
		}

		.ant-tooltip-inner {
				background-color: ${({ theme }) => theme.tooltipBackgroundColor} !important;
				color: ${({ theme }) => theme.tooltipTextColor} !important;
				box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px !important;
				padding: 0.9rem !important;
				font-family: 'normal';
				font-size: 14px;
				border-radius: 12px !important;
				line-height: 1.6rem;
		}
		
		.ant-tooltip-arrow-content {
				background-color: ${({ theme }) => theme.tooltipArrowBackgroundColor} !important;
		}

		.tolerance-button {
				cursor: pointer;
				-webkit-box-align: center;
				align-items: center;
				height: 2rem;
				border-radius: 5px;
				font-size: 1rem;
				width: auto;
				min-width: 3.6rem;
				border: 1px solid ${({ theme }) => theme.toleranceButtonBorderColor};
				outline: none;
				background: ${({ theme }) => theme.toleranceButtonBackgroundColor};
				margin-right: 8px;
				color: ${({ theme }) => theme.toleranceButtonTextColor};
		}
		
		.tolerance-button:hover, .tolerance-input-button:hover {
				border-color: ${({ theme }) => theme.toleranceButtonBorderColoronHover};
		}
		
		.tolerance-active {
				background: ${({ theme }) => theme.toleranceButtonActiveBackgroundColor};
				color: #FFF;
		}

		.tolerance-input-button {
				color: rgb(0, 0, 0);
				-webkit-box-align: center;
				align-items: center;
				border-radius: 5px;
				font-size: 1rem;
				width: auto;
				min-width: 3.5rem;
				border: 1px solid ${({ theme }) => theme.toleranceButtonInputBorderColor};
				outline: none;
				background: ${({ theme }) => theme.toleranceButtonInputBackgroundColor};
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
				background: ${({ theme }) => theme.toleranceInputBackgroundColor};
				font-size: 16px;
				outline: none;
				color: ${({ theme }) => theme.formControlText};
				text-align: right;
				font-family: 'Inrer var';
		}

		.settings-button-group .tolerance-input {
			border: 1px solid ${({ theme }) => theme.toleranceButtonInputBorderColor};
		}
		
		.tolerance-input:focus .tolerance-input-button{
				border: 1px solid rgb(255, 0, 122);
		}

		.tolerance-input-container span {
				color: ${({ theme }) => theme.deadlineTextColor};
		}

		.toggle-button {
				border-radius: 12px;
				border: none;
				background: ${({ theme }) => theme.toggleButtonBackgroundColor};
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
				color: ${({ theme }) => theme.toggleButtonOnTextColor};
				font-size: 1rem;
				font-weight: 500;
		}
		
		.toggle-on:hover {
				opacity: ${({ theme }) => theme.toggleButtonOnOpacityonHover};
		}

		.toggle-off {
				padding: 0.35rem 0.6rem;
				border-radius: 12px;
				background: ${({ theme }) => theme.toggleButtonOffBackgroundColor};
				color: ${({ theme }) => theme.toggleButtonOffTextColor};
				font-size: 1rem;
				font-weight: 400;
		}
		
		.toggle-off:hover {
				background: ${({ theme }) => theme.toggleButtonOffBackgroundColoronHover};
		}
		
		.toggle-active {
				padding: 0.35rem 0.6rem;
				border-radius: 12px;
				background: ${({ theme }) => theme.toggleActiveBackgroundColor};
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
				background-color: ${({ theme }) => theme.modalBackgroundColor};
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
				color: ${({ theme }) => theme.modalContentColor};
		}

		.confirmation-modal-button {
			border: none;
			background-color: ${({ theme }) => theme.buttonBackgroundColor};
			background: ${({ theme }) => theme.buttonBackground};
		}

		.modal-divider {
				width: 100%;
				background-color: ${({ theme }) => theme.modalDividerColor};
				height: 1px;
		}

		.confirmation-modal-title {
				box-sizing: border-box;
				margin: 0px auto;
				min-width: 0px;
				font-family: 'normal';
				font-weight: 500;
				font-size: 20px;
				color: ${({ theme }) => theme.modalContentColor};
		}

		.confirmation-modal-content {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 500;
				font-size: 20px;
				color: ${({ theme }) => theme.modalContentColor};
				padding: 0 2rem;
		}
		
		.confirmation-modal-content-bold {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 600;
				font-size: 20px;
				color: ${({ theme }) => theme.modalContentBoldColor};
				padding: 0 2rem;
		}

		.buy-modal-grid {
				display: grid;
				grid-auto-rows: auto;
				row-gap: 24px;
				width: 100%;
				padding: 1rem;
				background-color: ${({ theme }) => theme.buyModalBackgroundColor};
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
				color: ${({ theme }) => theme.modalContentColor};
		}

		.buy-modal-title {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-family: 'normal';
				font-weight: 600;
				font-size: 20px;
				color: ${({ theme }) => theme.modalContentColor};
		}

		.buy-modal-container {
				display: flex;
				flex-flow: column nowrap;
				position: relative;
				border-radius: 20px;
				background-color: ${({ theme }) => theme.modalContentBackgroundColor};
				z-index: 1;
		}

		.tokens-modal-container {
				background-color: ${({ theme }) => theme.tokensModalBackgroundColor};
		}

		.buy-inner-container {
			border-radius: 20px;
			width: 100%;
			border: 1px solid ${({ theme }) => theme.modalContentBackgroundColor};
			background-color: ${({ theme }) => theme.buyInputBackgroundColor};
		}

		.available-deposit-container {
				display: flex;
				flex-flow: row nowrap;
				-webkit-box-align: center;
				align-items: center;
				color: ${({ theme }) => theme.modalHeaderTextColor};
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
				color: ${({ theme }) => theme.settingsOptionTitleText};
		}

		.deposit-input-container input {
				color: ${({ theme }) => theme.settingsTitleText};
				width: 0px;
				position: relative;
				font-weight: 500 !important;
				outline: none;
				border: none;
				flex: 1 1 auto;
				background-color: ${({ theme }) => theme.buyInputBackgroundColor};
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
				background-color: ${({ theme }) => theme.connectToWalletBackgroundColor};
				border: 1px solid ${({ theme }) => theme.connectToWalletBackgroundColor};
				border-radius: 0.5rem;
				font-size: 0.875rem;
				font-weight: 500;
				cursor: pointer;
				margin-right: 0.5rem;
				color: ${({ theme }) => theme.primary};
		}

		.max-deposit-button:hover {
				border: 1px solid ${({ theme }) => theme.primary};
		}

		.token-select-button {
				-webkit-box-align: center;
				align-items: center;
				height: 2.2rem;
				font-size: 20px;
				font-weight: 600;
				background-color: ${({ theme }) => theme.buyModalBackgroundColor};
				color: ${({ theme }) => theme.modalHeaderTextColor};
				border-radius: 12px;
				box-shadow: none;
				outline: none;
				cursor: pointer;
				user-select: none;
				border: none;
				padding: 0px 0.5rem;
		}

		.token-select-button:hover, .token-select-button:focus {
				background-color: ${({ theme }) => theme.modalContentBackgroundColor};
		}

		.received-amount {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-size: 16px;
				font-weight: 600;
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.buy-action-button {
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 1;
				background-color: ${({ theme }) => theme.buttonBackgroundColor};
				background: ${({ theme }) => theme.buttonBackground};
				color: #FFF;
				cursor: pointer;
				box-shadow: none;
				border: 1px solid transparent;
				outline: none;
				opacity: 1;
				padding: 8px;
				font-family: 'bold', sans-serif !important;
				margin: 0px 0.5rem 0px 0px;
				width: 100%;
				text-align: center;
				border-radius: 7px;
		}

		.buy-action-button:hover {
				// background-color: ${({ theme }) => theme.buyModalButtonBackgroundColoronHover};
				background-color: #333;
		}

		.buy-action-button:disabled {
				cursor: auto;
				background-color: ${({ theme }) => theme.buyModalInactiveButtonBackgroundColor};
				color: ${({ theme }) => theme.buyModalInactiveButtonTextColor};
		}

		.step {
				min-width: 20px;
				min-height: 20px;
				background-color: ${({ theme }) => theme.stepBackgroundColor};
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
				background-color: ${({ theme }) => theme.primary};
		}

		.step-bar {
				width: 100%;
				height: 2px;
				background: ${({ theme }) => theme.stepBarBackgroundColor};
				opacity: 0.6;
		}

		.tokens-modal-title {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 500;
				font-size: 16px;
				color: ${({ theme }) => theme.modalHeaderTextColor};
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
				background-color: ${({ theme }) => theme.tokenHoverBackgroundColor};
		}

		.token-title {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 500;
				font-size: 16px;
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.links-container {
				min-width: 9.125rem;
				background-color: ${({ theme }) => theme.linksContainerBackgroundColor};
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
				color: ${({ theme }) => theme.linkTextColor};
		}
		
		.link:hover {
				color: ${({ theme }) => theme.linkTextColoronHover};
		}

		.countdown {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 400;
				text-align: center;
				color: ${({ theme }) => theme.countdownTextColor};
				font-size: 16px;
		}
		
		.countdown code {
				color: ${({ theme }) => theme.countdownTextColor};
		}

		.buy-button {
				font-size: 15px;
				padding: 8px;
				width: 160px;
				font-family: 'bold', sans-serif !important;
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
				background-color: ${({ theme }) => theme.buttonBackgroundColor};
				background: ${({ theme }) => theme.buttonBackground};
				color: #FFF;
				transition: 0.3s all ease;
		}
		
		.buy-button:hover {
			opacity: 0.8;
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
				background-color: ${({ theme }) => theme.buyModalButtonBackgroundColor};
				color: ${({ theme }) => theme.buyModalButtonTextColor};
		}

		.claim-moon-button:hover {
				background-color: ${({ theme }) => theme.buyModalButtonBackgroundColoronHover};
		}

		.claim-modal-container {
				background-color: ${({ theme }) => theme.tokensModalBackgroundColor};
		}

		.claim-description {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 500;
				font-size: 14px;
				color: ${({ theme }) => theme.countdownTextColor};
		}

		.claim-input-outer-container {
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 1.25rem;
				width: 100%;
				border: 1px solid ${({ theme }) => theme.modalContentBackgroundColor};
				background-color: ${({ theme }) => theme.modalHeaderBackgroundColor};
				transition: border-color 300ms step-start 0s, color 500ms step-start 0s;
		}

		.input-label {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 500;
				color: ${({ theme }) => theme.pageLinkText};
				font-size: 14px;
		}

		.claim-input {
				font-size: 1.25rem !important;
				outline: none;
				border: none;
				flex: 1 1 auto;
				transition: color 300ms step-start 0s;
				color: ${({ theme }) => theme.primary};
				overflow: hidden;
				text-overflow: ellipsis;
				font-weight: 500;
				width: 100%;
				padding: 0px;
				background-color: ${({ theme }) => theme.tokensModalBackgroundColor};
				appearance: textfield;
		}

		.external-link {
				font-size: 14px !important;
				color: ${({ theme }) => theme.primary};
				text-decoration: none;
				font-weight: 500;
		}

		.external-link:hover {
				color: ${({ theme }) => theme.primary};
				text-decoration: underline;
		}

		.ant-notification-notice {
				top: 3.25rem;
				padding: 1rem !important;
				border-radius: 8px !important;
				background-color: ${({ theme }) => theme.notificationBackgroundColor};
		}

		.ant-notification-notice-message, .ant-notification-close-icon, .ant-drawer-close {
			color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.heading {
				box-sizing: border-box;
				margin: 0.5rem 0 0 0;
				min-width: 0px;
				font-size: 17px;
				font-family: 'bold', sans-serif;
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.stake-card-heading {
			box-sizing: border-box;
			margin: 0px;
			min-width: 0px;
			font-family: 'bold', sans-serif;
			color: #333;
			font-size: 18px;
		}

		.stake-deposits-info-banner {
			width: 100%;
			background-color: ${({ theme }) => theme.assetCardBackgroundColor};
			padding: 30px 35px;
			box-shadow: 4px 4px 25px #0000001F;
			border: 1px solid #7070704D;
			border-radius: 17px;
		}

		@media only screen and (max-width: 768px) {
			.stake-deposits-container {
				flex-direction: column;
			}
		}

		.outlined-box {
				display: grid;
				grid-auto-rows: auto;
				border-radius: 12px;
				width: 100%;
				position: relative;
				overflow: hidden;
				background-color: ${({ theme }) => theme.outlinedBoxBackgroundColor};
				border: 1px solid ${({ theme }) => theme.outlinedBoxBorderColor};
				padding: 1rem 2rem;
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
				background : ${({ theme }) => theme.appDrawerBackgroundColor};
				padding : 3rem;
				border-radius : 12px;
				display : flex;
				flex-direction : column;
				justify-content : center;
				align-items : center;
		}

		.stats-text-heading{
				color : ${({ theme }) => theme.deadlineTextColor} !important;
				font-size : 1.3rem;
				font-weight : 600;
				font-family: 'normal', sans-serif; 
		}

		.stats-text{
				color : ${({ theme }) => theme.deadlineTextColor};
				font-size : 1.2rem;
				font-weight : 500;
				padding-top : 2rem;
				font-family: 'normal', sans-serif;
		}

		.text-regular {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: 400;
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.text-semibold {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-family: 'bold', sans-serif;;
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.text-semibold-2x {
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				font-weight: bolder;
				color: ${({ theme }) => theme.modalHeaderTextColor};
		}

		.shaded-container {
				display: grid;
				grid-auto-rows: auto;
				border: 1px solid ${({ theme }) => theme.outlinedBoxBorderColor};
				border-radius: 20px;
				width: 100%;
				position: relative;
				overflow: hidden;
				background-color: ${({ theme }) => theme.outlinedBoxBackgroundColor};
				padding: 1rem 2rem;
		}

		@media only screen and (max-width: 500px) {
			.shaded-container div > div:nth-child(2)  {
				flex-direction: column;
			}
		}

		.header-lp{
				display : flex;
				flex-direction : row;
				justify-content : space-between;
				align-items : center;
				padding: 0 50px;
		}

		.total-liquidity{
			color: ${({ theme }) => theme.modalHeaderTextColor};
			font-size: 17px;
			font-family: 'bold', sans-serif;
		}

		.shaded-text {
				color: ${({ theme }) => theme.shadedTextColor};
		}

		.container {
				padding: 100px 0 0;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				z-index : 1;
		}

		.tabs {
			display: flex;
			margin-bottom: 2rem;
		}
		
		.tabs a {
			padding: 10px 0;
			font-family: 'bold', sans-serif !important;
			background-color: ${({ theme }) => theme.tabBackgroundColor};
			color: ${({ theme }) => theme.tabTextColor};
			border: 1px solid ${({ theme }) => theme.tabBorderColor};
			border-radius: 10px;
			box-shadow: none;
			width: 50%;
			text-align: center;
		}

		.tabs a:first-child {
			z-index: 1;
			position: relative;
			left: 3px;
			border-right: none;
			border-radius: 10px 0 0 10px;
		}

		.tabs a:last-child {
			z-index: 1;
			position: relative;
			right: 3px;
			border-left: none;
			border-radius: 0 10px 10px 0;
		}
		
		.tabs a[data-enabled=true] {
			z-index: 2;
			border-radius: 10px;
			border: 1px solid ${({ theme }) => theme.activeTabBackgroundColor};
			background-color: ${({ theme }) => theme.activeTabBackgroundColor};
			color: ${({ theme }) => theme.activeTabTextColor};
			box-shadow: 0px 0px 20px #00000033;
		}

		.tabs a:hover,
		.tabs a:focus,
		.tab-active {
			opacity: 1 !important;
		}

		@media only screen and (max-width: 500px) {
			.tabs a[data-enabled=true], .tabs a:first-child, .tabs a:last-child{
				background-color: transparent;
				color: ${({ theme }) => theme.mobileTabTextColor};
				box-shadow: none;
				border-radius: 0;
				border: none;
				border-bottom: 1px solid ${({ theme }) => theme.mobileTabTextColor};
			}

			.tabs a[data-enabled=true] {
				color: ${({ theme }) => theme.formControlText};
				border-bottom: 2px solid ${({ theme }) => theme.formControlText};
			}
		}

		.exchange-card {
				position: relative;
				max-width: 550px;
				width: 100%;
				border-radius: 20px;
				background-color: ${({ theme }) => theme.exchangeCardBackgroundColor};
				border: 1px solid #7070704D;
				box-shadow: 4px 4px 25px #0000001F;
				padding: 31px 35px 56px;
				margin-bottom: 2rem;
			}
		
		.exchange-card .noise {
			border-radius: 20px;
		}
			
			.form-control {
				padding: 20px;
				border-radius: 10px;
				background-color: ${({ theme }) => theme.swapFormControlBackgroundColor};
				border: 1px solid ${({ theme }) => theme.swapFormControlBorderColor};
				font-size: 12px;
				text-transform: uppercase;
				color: ${({ theme }) => theme.formControlText} !important;
			}

			.swap-form .form-control {
				background-color: ${({ theme }) => theme.swapFormControlBackgroundColor};
				border: 1px solid ${({ theme }) => theme.swapFormControlBorderColor};
			}

			.swap-form .input-container input {
				font-size: 22px;
			}

			.swap-form .input-container input + div {
				opacity: 0.7;
				font-size: 13px !important;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.swap-form .input-container {
				align-items: flex-start;
			}
			
			.form-control > .flex-spaced-container > div:nth-child(2) {
				color: ${({ theme }) => theme.formControlText} !important;
				font-family : "normal" !important;
				font-size : 12px !important;
			}
			
			.swap-form .form-control .flex-spaced-container > div {
				font-size: 16px;
				opacity: 0.5;
				text-transform: capitalize;
				margin-bottom: 0.5rem;
			}
			
			.input-container {
				margin-top: 8px;
				width: 100%;
				display: inline-flex;
			}
			
			.input-container input {
				flex: 1 1 0%;
				width: 75%;
				border: none;
				outline: none;
				background-color: transparent;
				box-shadow: none;
				font-family: "normal";
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

			.input-container > div:nth-child(1) {
				flex: 1 1 0%;
			}

			@media only screen and (max-width: 550px) {
				.input-container input {
					flex: auto;
					width: 100%;
				}

				.swap-form .input-container input + div {
					overflow: visible;
					margin-top: 0;
				}
			}
			
			.max-button {
				cursor: pointer;
				height: 30px;
				border: none;
				border-radius: 10px;
				background: transparent linear-gradient(180deg,#E60000 0%,#730000 100%) 0% 0% no-repeat padding-box;
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
				height: 34px;
				border: none;
				border-radius: 8px;
				background-color: ${({ theme }) => theme.assetSelectBackgroundColor};
				box-shadow: none;
				padding: 0 1rem;
				color: ${({ theme }) => theme.buttonText};
				font-size: 14px;
			}

			.swap-form .asset-select-button {
				background-color: ${({ theme }) => theme.assetSelectBackgroundColor};;
				font-size: 14px;
			}

			.swap-form .asset-select-button span {
				position: relative;
				font-family: 'bold', sans-serif !important;
				color: #FFF;
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
				font-family: "normal", sans-serif;
				background-color: ${({ theme }) => theme.swapFormControlBackgroundColor};
				color: ${({ theme }) => theme.formControlText};
				border: 1px solid ${({ theme }) => theme.swapFormControlBorderColor};
				border-radius: 10px;
				padding: 10px 23px;
			}
			
			.invert-button {
				position: relative;
				top: -1px;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid transparent;
				color: ${({ theme }) => theme.navbarButtonIconColor} !important;
				border-radius: 50%;
				height: 23px;
				width: 23px;
				cursor: pointer;
				box-shadow: none;
				margin-left: 5px;
				outline: none;
			}
			
			.invert-button:focus, .invert-button:hover {
				opacity: 0.8;
			}

			.swap-form .action {
				position: relative;
				height: 1px;
				background-color: ${({ theme }) => theme.swapDividerColor};
				border-radius: 0;
				width: 100%;
				margin: 0;
				font-size: 26px;
			}

			.swap-form .action svg {
				position: absolute;
				background-color: ${({ theme }) => theme.actionBackgroundColor};
				border: 1px solid transparent;
				height: 45px;
				width: 45px;
				padding: 8px;
				border-radius: 50%;
				margin: auto;
				color: #FFF;
			}

			.swap-form .action svg:hover {
				border-color: ${({ theme }) => theme.swapFormControlBorderColor};
			}
			
			.action {
				width: 26px;
				height: 26px;
				background-color: ${({ theme }) => theme.swapFormControlBackgroundColor};
				color: ${({ theme }) => theme.actionIconColor};
				margin: 0.75rem auto;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				font-size: 16px;
			}
			
			.exchange-button-container {
				font-family: "normal";
				z-index: 5;
				margin-top: 20px;
				// max-width: 400px;
				width: 100%;
				border-radius: 0 0 10px 10px;
			}
			
			.exchange-button-container a {
				color: #DE0102;
				font-size: 13px;
			}
			
			.exchange-button-container a:hover {
				text-decoration: underline;
			}
			
			.exchange-button-container p {
				color: ${({ theme }) => theme.formControlText};
				text-align: center;
				margin: 0.45rem 0;
				font-size: 13px;
			}
			
			.exchange-button-container button {
				cursor: pointer;
				width: 100%;
				height: 45px;
				border: none;
				border-radius: 10px;
				background-color: ${({ theme }) => theme.buttonBackgroundColor};
				background: ${({ theme }) => theme.buttonBackground};
				color: #FFF;
				margin-top: 1rem;
				font-weight: 600;
				outline: none;
				font-size: 14px;
				transition: 0.3s all ease;
			}
			
			.exchange-button-container button:disabled, .remove-liquidity-actions button:disabled {
				cursor: not-allowed;
				opacity: 0.5;
			}
			
			.add-liquidity-button {
				cursor: pointer;
				box-shadow: none;
				width: 100%;
				margin: 0 0 1.5rem;
				height: 45px;
				border: none;
				border-radius: 10px;
				background-color: ${({ theme }) => theme.buttonBackgroundColor};
				background: ${({ theme }) => theme.buttonBackground};
				color: #fff;
				font-weight : bold;
			}
			
			.add-liquidity-button:hover {
				opacity: 0.75;
			}
			
			.pool-details .flex-spaced-container > div {
				color: ${({ theme }) => theme.formControlText};
				font-size: 15px;
				font-family: "normal";
			}
			
			.liquidity-section {
				margin-top: 0.75rem;
				background-color: ${({ theme }) => theme.swapFormControlBackgroundColor};
				border-radius: 10px;
				border: 1px solid ${({ theme }) => theme.swapFormControlBorderColor};
				max-height: 260px;
				overflow: auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0.5rem;
			}
			
			.liquidity-section > span {
				margin: 50px auto;
				font-size: 14px;
				color: ${({ theme }) => theme.formControlText};
			}
			
			.pool-form .flex-spaced-container {
				// color: ${({ theme }) => theme.formControlText};
				color: #FFF;
			}
			
			.pool-form .flex-spaced-container span {
				font-family: "normal";
				font-size: 18px;
			}
			
			.search-currency-input {
				font-family: "normal", sans-serif;
				border-radius: 15px;
				color: ${({ theme }) => theme.formControlText};
				border: 1px solid ${({ theme }) => theme.swapFormControlBorderColor};
				outline: none;
				padding: 5px 10px;
				height: 45px;
				width: 100%;
				margin-bottom: 15px;
				background-color: ${({ theme }) => theme.swapFormControlBackgroundColor};
			}

			.search-currency-input + div {
				font-family: "normal", sans-serif;
				color: ${({ theme }) => theme.primary} !important;
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
				color: ${({ theme }) => theme.formControlText} !important;
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
				background-color:  ${({ theme }) => theme.rowHoverBackgroundColor};
			}
			
			.common-base img {
				width: auto;
				height: 24px;
				box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
				border-radius: 24px;
				margin-right: 8px;
			}
			
			.common-base div {
				font-weight: 500;
				font-size: 16px;
			}
			
			.currency-rows-container {
				height: 328px;
				width: 90%;
				margin: 0 auto 1.5rem;
				overflow: auto;
				background-color: ${({ theme }) => theme.currencyContainerBackgroundColor};
				border: 1px solid ${({ theme }) => theme.swapFormControlBorderColor};
				border-radius: 20px;
			}
			
			.currency-row {
				font-family: "normal", sans-serif;
				box-sizing: border-box;
				margin: 0px;
				min-width: 0px;
				width: 100%;
				align-items: center;
				justify-content: space-between;
				padding: 4px 16px;
				height: 56px;
				display: grid;
				grid-template-columns: auto minmax(auto, 1fr) auto;
				gap: 16px;
				cursor: pointer;
				opacity: 1;
				color: ${({ theme }) => theme.formControlText};
			}
			
			.currency-row img{
				width: auto;
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
				background-color: ${({ theme }) => theme.poolCardBackgroundColor};
				border: 1px solid ${({ theme }) => theme.swapFormControlBorderColor};
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
				color: ${({ theme }) => theme.formControlText};
				font-family: "normal";
				display: flex;
			}
			
			.lp-card-heading span {
				font-weight: 500;
			}
			
			.lp-icons {
				margin-right: 4px;
			}
			
			.lp-card-heading + a {
				color: #DE0102;
				font-family: "normal";
				font-size: 13px;
				text-decoration: underline;
			}
			
			.lp-card .flex-spaced-container {
				margin: 5px 0;
				color: ${({ theme }) => theme.formControlText};
			}
			
			.lp-card .flex-spaced-container > div:nth-child(1) {
				font-family: 'normal';
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
				background-color: ${({ theme }) => theme.buttonBackgroundColor};
				background: ${({ theme }) => theme.buttonBackground};
				color: #FFF;
				height: 40px;
				font-size: 13px;
			}

			.lp-card-buttons button:hover {
				opacity: 0.8;
			}
			
			.text-large {
				margin: 5px 0;
				font-family: 'normal';
				font-weight: bold;
				font-size: 2.8rem;
			}

			.percent-slider {
				width: 90%;
				margin: auto;
			}
			
			.percent-slider .rc-slider-handle, .percent-slider .rc-slider-handle-click-focused:focus {
				border-color: #DE0102;
			}
			
			.percent-slider .rc-slider-track {
				background-color: #DE0102;
			}
			
			.percent-slider .rc-slider-handle:active, .percent-slider .rc-slider-handle:focus {
				box-shadow: 0 0 5px #DE0102;
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
				background-color: ${({ theme }) => theme.exchangeButtonBackgroundColor};
				border: 1px solid ${({ theme }) => theme.exchangeButtonBackgroundColor};
				border-radius: 0.5rem;
				font-size: 0.75rem;
				font-weight: 500;
				cursor: pointer;
				margin: 0.25rem;
				overflow: hidden;
				// color: ${({ theme }) => theme.pageLinkTextPrimary};
				color: #FFF;
				width: 20%;
				outline: none;
			}
			
			.percent-buttons button:hover, .percent-buttons button:focus {
				border-color: ${({ theme }) => theme.primary};
			}
			
			.pool-amount-row > div:nth-child(1) {
				color: ${({ theme }) => theme.formControlText};
				font-family: 'normal';
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
				background-color: ${({ theme }) => theme.buttonBackgroundColor};
				background: ${({ theme }) => theme.buttonBackground};
				width: 100%;
			}
			
			.import-button {
				cursor: pointer;
				width: 100%;
				height: 25px;
				border: none;
				border-radius: 10px;
				color: #fff;
				background-color: ${({ theme }) => theme.primary};
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
				border: 1px solid ${({ theme }) => theme.swapFormControlBorderColor};
				background-color: ${({ theme }) => theme.swapFormControlBackgroundColor};
				color: ${({ theme }) => theme.formControlText};
			}
			
			.import-pool-select:hover, .import-pool-select:focus {
				border-color: #DE0102;
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
				border: none;
				border-radius: 10px;
				background-color: transparent;
				background-color: ${({ theme }) => theme.buttonBackgroundColor};
				background: ${({ theme }) => theme.buttonBackground};
				font-family: 'normal';
				font-size: 14px;
				color: #FFF;
		}
		
		.staking-modal-button-primary {
				width: 50%;
				cursor: pointer;
				height: 45px;
				padding: 5px 0;
				border: none;
				border-radius: 10px;
				background-color: ${({ theme }) => theme.buttonBackgroundColor};
				background: ${({ theme }) => theme.buttonBackground};
				color: #FFF;
				font-family: 'normal';
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
					color: ${({ theme }) => theme.formControlText};
			}

			.new-pool-details h1 {
				font-family: "normal", sans-serif;
				color: ${({ theme }) => theme.formControlText} !important;
				margin: 0;
			}

			.new-pool-title {
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid ${({ theme }) => theme.navbarButtonBackgroundColor};
				background-color: ${({ theme }) => theme.newPoolBlockBackgroundColor};
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
				font-family: "normal", sans-serif;
				color: ${({ theme }) => theme.formControlText};
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
					font-family: "normal";
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
						background-color: ${({ theme }) => theme.navbarBottomBackgroundColor} !important;
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
			.settings-menu {
				left: -15.5rem;
			}
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

		.asset-card {
			display: grid;
			grid-auto-rows: auto;
			border-radius: 20px;
			width: 100%;
			overflow: hidden;
			position: relative;
			opacity: 1;
			background-color: ${({ theme }) => theme.assetCardBackgroundColor};
			box-shadow: 4px 4px 25px #0000001F;
			padding: 20px 20px 40px 50px;
			border: 1px solid #7070704D;
			transition: 0.3s all ease;
		}

		.asset-card .stake-card-heading {
			color: ${({ theme }) => theme.formControlText} !important;
		}

		.asset-card > div:nth-child(2) > div > * {
			color: ${({ theme }) => theme.formControlText} !important;
			opacity: 0.8;
			transition: 0.3s all ease;
		}

		@media only screen and (max-width: 600px) {
				.stake-deposit-container {
						padding-top: 30px !important;
						padding-bottom: 170px !important;
						overflow: scroll !important;
				}
				.header-lp{
					padding: 0;
				}

				.total-liquidity{
						color: ${({ theme }) => theme.modalHeaderTextColor};
						font-size: 18px;
						font-weight : 500;
				}
				
				.sale-block-outer-container, .asset-card {
					padding: 1rem 1.5rem;
				}
		}

		@media only screen and (max-width: 500px) {
			.header-lp {
				flex-direction: column;
				margin: 1rem auto;
				text-align: center;
			}
		}

		@media only screen and (max-width: 450px) {
			.asset-card > div:nth-child(1) {
				display: flex !important;
				flex-direction: column !important;
			}

			.asset-card > div:nth-child(2) > div > div:nth-child(2) {
				text-align: right;
			}

			.asset-card .stake-card-heading {
				margin: 0.5rem 0 1rem !important;
			}
		}

		.sidebar .ant-drawer-close {
			margin-top: -0.25rem;
			color: ${({ theme }) => theme.formControlText};
		}

		.sidebar .ant-drawer-content {
			background-color: ${({ theme }) => theme.bodyBackgroundColor};
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
			color: ${({ theme }) => theme.pageLinkText};
			margin-right: 8px;
		}

		.sidebar ul li svg {
			color: ${({ theme }) => theme.pageLinkText};
			margin-left: 4px;
		}

		.sidebar ul li a {
			outline: none;
			cursor: pointer;
			text-decoration: none;
			color: ${({ theme }) => theme.pageLinkText};
			font-size: 1rem;
			width: fit-content;
			font-weight: 500;
		}

		.sidebar ul li a.active-page, .sidebar ul li a.active-page svg, .navbar-pages-container a.active-page svg {
			font-weight: bold;
			color: ${({ theme }) => theme.pageLinkTextPrimary};
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
			color: ${({ theme }) => theme.pageLinkText};
			width: fit-content;
			font-weight: 500;
		}

		.navbar-dropdown a.active-page, .navbar-dropdown a.active-page svg {
			font-weight: bold;
			color: ${({ theme }) => theme.pageLinkTextPrimary};
		}

		.navbar-dropdown svg {
			margin-right: 8px;
			color: ${({ theme }) => theme.pageLinkText};
		}

		.navbar-dropdown li {
			padding: 12px 15px;
		}

		.ant-dropdown-menu {
			background-color: ${({ theme }) => theme.navbarDropdownBackgroundColor};
			border-radius: 10px;
		}

		.ant-dropdown-menu-item:hover {
			background-color: ${({ theme }) => theme.navbarDropdownBackgroundColoronHover};
		}

		.ant-dropdown-menu-item > a:hover, .ant-dropdown-menu-submenu-title > a:hover {
			color: ${({ theme }) => theme.pageLinkTextonHover};
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

		.swap-form .select-button-loading svg {
			margin-left: 0;
			color: ${({ theme }) => theme.primary};
			-webkit-animation: spin 1.5s ease-in-out infinite;
			-moz-animation: spin 1.5s ease-in-out infinite;
			animation: spin 1.5s ease-in-out infinite;
		}

		@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
		@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
		@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

		.swap-form .form-control > div .pool-balance {
			font-size: 14px !important;
		}

		.app-sidebar {
			position: fixed;
			left: 0;
			height: 100vh;
			overflow-y: scroll;
			width: 230px;
			background-color: ${({ theme }) => theme.sidebarBackgroundColor};
			padding-top: 30px;
			border-right: 1px solid ${({ theme }) => theme.sidebarBorderColor};
			transition: 0.25s all ease;
		}

		@media only screen and (max-width: 1200px) {
			.app-sidebar {
				display: none;
			}
		}

		.app-links {
			padding: 30px 22px;
			background-color: transparent;
			font-size: 17px;
			margin: 0 38px;
			list-style-type: none;
			border-bottom: 1px solid #D9D9D9;
		}

		.app-links a{
			color: ${({ theme }) => theme.formControlText};
			display: flex;
			align-items: center;
			transition: 0.3s all ease;
		}

		.app-links li a svg {
			fill: ${({ theme }) => theme.formControlText};
			width: 22px;
			height: 22px;
			margin-right: 20px;
			transition: 0.3s all ease;
		}

		.app-links a:hover, .app-links a.active {
			color: #E60000;
		}

		.app-links a:hover svg, .app-links a.active svg {
			fill: #E60000;
		}

		.interface-settings span {
			color: ${({ theme }) => theme.formControlText};
			font-size: 12px;
			margin-left: 3px;
			padding: 0 38px;
		}

		.interface-settings button {
			cursor: pointer;
			padding: 4px 0;
			background-color: ${({ theme }) => theme.tabBackgroundColor};
			color: ${({ theme }) => theme.tabTextColor};
			border: 1px solid ${({ theme }) => theme.tabBorderColor};
			border-radius: 5px;
			box-shadow: none;
			text-transform: uppercase;
			width: 50%;
		}

		.interface-settings button:first-child {
			z-index: 1;
			position: relative;
			left: 3px;
			border-right: none;
			border-radius: 5px 0 0 5px;
		}

		.interface-settings button:last-child {
			z-index: 1;
			position: relative;
			right: 3px;
			border-left: none;
			border-radius: 0 5px 5px 0;
		}

		.interface-settings button[data-enabled=true] {
			z-index: 2;
			border-radius: 5px;
			border: 1px solid ${({ theme }) => theme.tabBorderColor};
			background-color: ${({ theme }) => theme.activeTabBackgroundColor};
			color: ${({ theme }) => theme.activeTabTextColor};
		}

		.sidebar-social-links a{
			color: ${({ theme }) => theme.formControlText};
		}

		.app-sidebar-footer {
			background-color: transparent;
			padding: 3rem 38px 0;
			z-index: 10;
		}

		.sidebar-copyrights {
			color: ${({ theme }) => theme.formControlText};
			text-align: center;
			letter-spacing: 2px;
			font-size: 13px;
			margin-bottom: 0.5rem;
		}

		.app-bar {
			padding: 24px 54px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			transition: 0.3s all ease;
		}

		@media only screen and (max-width: 960px) {
			.app-bar {
				padding: 24px;
			}
		}

		.app-bar > div {
			display: flex;
			align-items: center;
		}

		.app-bar svg {
			color: ${({ theme }) => theme.formControlText};
		}

		.app-bar > div > *:not(:last-child) {
			margin-right: 35px;
		}

		.app-bar .connect-wallet-button {
			cursor: pointer;
			color: #FFF;
			background-color: ${({ theme }) => theme.connectToWalletBackgroundColor};
			background: ${({ theme }) => theme.connectToWalletBackground};
			padding: 0.75rem 2rem;
			border: none;
			border-radius: 7px;
			box-shadow: none;
			font-family: 'bold', sans-serif !important;
			font-size: 15px;
		}

		.app-bar .vrap-button {
			cursor: pointer;
			background: transparent linear-gradient(180deg, #E60000 0%, #730000 100%) 0% 0% no-repeat padding-box;
			color: #FFF;
			border: none;
			border-radius: 7px;
			box-shadow: none;
			font-size: 15px;
			padding: 0.75rem;
		}

		@media only screen and (max-width: 960px) {
			.app-bar .vrap-button {
				display: none;
			}

			.app-bar .wallet-mobile-button {
				margin-right: 0 !important;
			}
		}

		.app-bar .settings-dropdown {
			position: absolute;
			z-index: 100;
			top: 3rem;
			right: 0;
			min-width: 0;
			width: 300px;
			padding: 12px;
			border-radius: 7px;
			background-color: ${({ theme }) => theme.dropdownBackgroundColor};
			box-shadow: 0px 0px 20px #00000033;
			transition: 0.3s all ease;
		}

		@media only screen and (max-width: 400px) {
			.app-bar .settings-dropdown {
				right: -5rem;
			}
		}

		.app-bar .category {
			font-family: 'bold', sans-serif;
			text-align: center;
			margin-bottom: 14px;
			color: ${({ theme }) => theme.formControlText};
		}

		.app-bar .wallet-details-container > * {
			padding: 0.75rem;
		}

		.app-bar .details-dropdown {
			position: absolute;
			z-index: 100;
			top: 4rem;
			right: 0;
			min-width: 0;
			padding: 12px 30px;
			min-width: 250px;
			border-radius: 7px;
			background-color: ${({ theme }) => theme.dropdownBackgroundColor};
			box-shadow: 0px 0px 20px #00000033;
			transition: 0.3s all ease;
		}

		.app-bar .details-dropdown .detail {
			text-align: center;
			padding: 12px 0;
			border-top: 1px solid #D9D9D9;
		}

		.app-bar .details-dropdown .detail p, .landing-main .detail p {
			font-family: 'bold', sans-serif;
			font-size: 20px;
			color: #E60000;
			margin-bottom: 0;
		}

		.app-bar .details-dropdown .detail span, .landing-main .detail span {
			font-family: 'bold', sans-serif;
			color: ${({ theme }) => theme.formControlText};
			font-size: 12px;
		}

		.landing-main .detail:not(:last-child) {
			margin-bottom: 1.5rem;
		}

		.app-bar .burger, .app-bar .burger + img, .landing-logo {
			display: none;
		}

		@media only screen and (max-width: 1200px) {
			.app-bar {
				align-items: center;
				justify-content: space-between;
			}

			.app-bar .burger, .app-bar .burger + img, .landing-logo {
				display: block;
			}
		}

		.app-bar .wallet-mobile-button {
			display: none;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			color: #FFF;
			background-color: #333;
			border: none;
			border-radius: 7px;
			box-shadow: none;
			font-size: 15px;
			padding: 0.75rem;
		}

		.app-bar .wallet-mobile-button svg {
			color: #FFF;
		}

		@media only screen and (max-width: 1200px) {
			.app-bar .wallet-mobile-button {
				display: flex;
			}

			.app-bar .connect-wallet-button, .app-bar .wallet-details-container {
				display: none;
			}
		}

		.app-drawer .ant-drawer-body {
			padding: 3.5rem 0 0;
			background-color: ${({ theme }) => theme.appDrawerBackgroundColor};
		}

		.landing-section h1 {
			color: ${({ theme }) => theme.formControlText} !important;
		}

		.landing-section-inverted h1, .landing-section-centered h1 {
			color: ${({ theme }) => theme.landingHeading} !important;
		}

		.landing-main h1 span {
			color: #E60000;
		}

		.landing-main p {
			color: ${({ theme }) => theme.landingParagraph};
			opacity: 0.8;
		}

		.landing-section button {
			margin-top: 4rem;
			border: none;
			border-radius: 7px;
			background-color: ${({ theme }) => theme.buttonBackgroundColor};
			background: ${({ theme }) => theme.buttonBackground};
			color: #FFF;
			box-shadow: none;
			cursor: pointer;
			font-size: 0.9rem;
			font-family: 'bold', sans-serif !important;
			padding: 0.75rem 2rem;
			display: flex;
			align-items: center;
			transition: 0.3s all ease;
		}

		.landing-section button svg {
			position: relative;
			left: 1rem;
			transition: 0.3s all ease;
		}

		.landing-section button:hover svg {
			left: 1.45rem;
		}

		.landing-card {
			text-align: center;
			margin: 1rem;
			padding: 28px 21px;
			max-width: 26%;
			min-width: 26%;
			background-color: ${({ theme }) => theme.landingCardBackgroundColor};
			border-radius: 20px;
			box-shadow: 4px 4px 30px #00000029;
			transition: 0.3s all ease;
		}

		.landing-card .icon {
			border-radius: 20px;
			padding: 24px;
			width: 85px;
			height: 85px;
			margin: 0 auto 1rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(230, 0, 0, 0.7);
		}

		.landing-card h2 {
			font-size: 1.65rem;
			color: ${({ theme }) => theme.landingHeading} !important;
			transition: 0.3s all ease;
		}

		.landing-card p {
			color: ${({ theme }) => theme.landingParagraph};
			transition: 0.3s all ease;
		}

		.MuiPaper-root {
			background-color: ${({ theme }) => theme.modalBackgroundColor};
		}

		.app-footer {
			display: none;
			align-items: center;
			justify-content: space-between;
			padding: 1rem 2rem;
			background-color: ${({ theme }) => theme.bodyBackgroundColor};
		}

		.app-footer > div:nth-child(1) {
			color: ${({ theme }) => theme.formControlText};
			text-align: center;
			letter-spacing: 2px;
			font-size: 13px;
		}

		.app-footer > div:nth-child(2) a {
			color: ${({ theme }) => theme.formControlText};
		}

		.app-footer > div:nth-child(2) a:not(:last-child) {
			margin-right: 2.5rem;
		}

		.ant-drawer {
			display: none;
		}
		
		@media only screen and (max-width: 1200px) {
			.app-footer {
				display: flex;
			}

			.ant-drawer {
				display: block;
			}
		}

		@media only screen and (max-width: 400px) {
			.app-footer {
				flex-direction: column;
			}

			.app-footer > div:nth-child(1) {
				margin-bottom: 1.25rem;
			}

			.app-footer > div:nth-child(2) a:not(:last-child) {
				margin-right: 2.25rem;
			}
		} 
`;
