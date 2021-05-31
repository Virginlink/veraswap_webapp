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
const JULD =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x5A41F637C3f7553dBa6dDC2D3cA92641096577ea/logo.png?raw=true";
const BAKE =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5/logo.png?raw=true";
const JULB =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x32dFFc3fE8E3EF3571bF8a72c0d0015C5373f41D/logo.png?raw=true";
const BURGER =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f/logo.png?raw=true";
const BUSD =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/logo.png?raw=true";
const BUSDT =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x55d398326f99059fF775485246999027B3197955/logo.png?raw=true";
const XVS =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63/logo.png?raw=true";
const DODO =
	"https://github.com/trustwallet/assets/blob/master/blockchains/smartchain/assets/0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2/logo.png?raw=true";

export const STAKED_TOKENS = [
	{
		icons: [VRAP],
		ticker: "VRAP",
		version: 2,
		tokenContract: "0x271C418B045d05A1D52c6bF849d47b5B5B4d769e",
	},
	// {
	// 	icons: [VRAP],
	// 	ticker: "VRAP",
	// 	version: 1,
	// 	tokenContract: "0x271C418B045d05A1D52c6bF849d47b5B5B4d769e",
	// },
	{
		icons: [VRAP, BNB],
		ticker: "VRAP-BNB",
		version: 2,
		tokenContract: "0xcd01316afcafe8acfc59f4d9236bfcd8345f8f12",
	},
	{
		icons: [TWT],
		ticker: "TWT",
		version: 2,
		tokenContract: "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
	},
	{
		icons: [CAKE],
		ticker: "CAKE",
		version: 2,
		tokenContract: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
	},
	{
		icons: [BAKE],
		ticker: "BAKE",
		version: 2,
		tokenContract: "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5",
	},
	{
		icons: [JULD],
		ticker: "JULD",
		version: 2,
		tokenContract: "0x5A41F637C3f7553dBa6dDC2D3cA92641096577ea",
	},
	{
		icons: [JULB],
		ticker: "JULB",
		version: 2,
		tokenContract: "0x32dFFc3fE8E3EF3571bF8a72c0d0015C5373f41D",
	},
	{
		icons: [BURGER],
		ticker: "BURGER",
		version: 2,
		tokenContract: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
	},
	{
		icons: [BUSD],
		ticker: "BUSD",
		version: 2,
		tokenContract: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
	},
	{
		icons: [BUSDT],
		ticker: "BUSDT",
		version: 2,
		tokenContract: "0x55d398326f99059ff775485246999027b3197955",
	},
	{
		icons: [XVS],
		ticker: "XVS",
		version: 2,
		tokenContract: "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",
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
