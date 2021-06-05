import BNB from "../assets/images/eth.png";
import SWINGBY from "../assets/images/empty-token.webp";
import LIT from "../assets/images/lit.webp";
import SFP from "../assets/images/sfp.webp";
import DAI from "../assets/images/dai.webp";
import VRAP from "../assets/images/vrap-red.svg";

const TWT =
	"https://github.com/trustwallet/assets/blob/master/blockchains/binance/assets/TWT-8C2/logo.png?raw=true";
const CAKE =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png?raw=true";
const BUSD =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png?raw=true";
const DODO =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2/logo.png?raw=true";

export const LIQUIDITY_TOKENS = [
	{
		icons: [VRAP, BNB],
		ticker: "VRAP-BNB",
		version: 2,
		tokenContract: "0xcd01316afcafe8acfc59f4d9236bfcd8345f8f12",
	},
	{
		icons: [VRAP, BNB],
		ticker: "VRAP-BNB",
		version: 2,
		tokenContract: "0x3916ed70733272bc885211e6acc368f2da8b6258",
		exchange: "PancakeSwap",
	},
	{
		icons: [VRAP, BUSD],
		ticker: "VRAP-BUSD",
		version: 2,
		tokenContract: "0xd2b68b555d8b20bb5e2199b2376e9395a742cdb1",
		exchange: "PancakeSwap",
	},
	{
		icons: [VRAP, CAKE],
		ticker: "VRAP-CAKE",
		version: 2,
		tokenContract: "0x6f3d7312af49ff1052355ffe490e3d9ae93eb420",
		exchange: "PancakeSwap",
	},
	{
		icons: [TWT, BNB],
		ticker: "TWT-BNB",
		version: 2,
		tokenContract: "0x610e7a287c27dfFcaC0F0a94f547Cc1B770cF483",
	},
	{
		icons: [CAKE, BNB],
		ticker: "CAKE-BNB",
		version: 2,
		tokenContract: "0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6",
	},
	{
		icons: [DODO, BNB],
		ticker: "DODO-BNB",
		version: 2,
		tokenContract: "0x9e642d174B14fAEa31D842Dc83037c42b53236E6",
	},
	{
		icons: [SWINGBY, BNB],
		ticker: "SWINGBY-BNB",
		version: 2,
		tokenContract: "0x4576C456AF93a37a096235e5d83f812AC9aeD027",
	},
	{
		icons: [SFP, BNB],
		ticker: "SFP-BNB",
		version: 2,
		tokenContract: "0xcBe2cF3bd012e9C1ADE2Ee4d41DB3DaC763e78F3",
	},
	{
		icons: [LIT, BNB],
		ticker: "LIT-BNB",
		version: 2,
		tokenContract: "0x60bB03D1010b99CEAdD0dd209b64bC8bd83da161",
	},
	{
		icons: [DAI, BNB],
		ticker: "DAI-BNB",
		version: 2,
		tokenContract: "0x3aB77e40340AB084c3e23Be8e5A6f7afed9D41DC",
	},
];
