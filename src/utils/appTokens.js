import { TBLK_ABI, TBLK_ADDRESS, DONUT_ABI, DONUT_ADDRESS, WBNB_ADDRESS, WBNB_ABI, BUSD_ADDRESS, BUSD_ABI } from "./contracts";
import Empty from '../assets/icons/Empty.png';

export const TOKENS = [
    {
        name: 'Test DonutSwap Token',
        symbol: 'tDonut',
        contractAddress: DONUT_ADDRESS,
        contractABI: DONUT_ABI,
        icon: Empty,
    },
    {
        name: 'Test BlockSwap Token',
        symbol: 'tBLK',
        contractAddress: TBLK_ADDRESS,
        contractABI: TBLK_ABI,
        icon: Empty,
    },
    {
        name: 'Wrapped BNB',
        symbol: 'WBNB',
        contractAddress: WBNB_ADDRESS,
        contractABI: WBNB_ABI,
        icon: Empty,
    },
    {
        name: 'BUSD',
        symbol: 'BUSD',
        contractAddress: BUSD_ADDRESS,
        contractABI: BUSD_ABI,
        icon: Empty,
    },
]