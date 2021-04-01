import { TBLK_ABI, TBLK_ADDRESS, DONUT_ABI, DONUT_ADDRESS } from "./contracts";
import Empty from '../assets/icons/Empty.png';

export const TOKENS = [
    {
        name: 'Test DonutSwap Token',
        symbol: 'tDonut',
        contractAddress: DONUT_ADDRESS,
        contractABI: DONUT_ABI,
        totalSupply: "1000000",
        icon: Empty,
    },
    {
        name: 'Test BlockSwap Token',
        symbol: 'tBLK',
        contractAddress: TBLK_ADDRESS,
        contractABI: TBLK_ABI,
        totalSupply: "1000000",
        icon: Empty,
    }
]