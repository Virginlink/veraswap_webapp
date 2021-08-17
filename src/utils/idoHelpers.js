import { ethers } from "ethers";
import { ERC20_ABI, KOVAN_PROVIDER, TEST_TOKEN_ADDRESS } from "./contracts";
import { IDO_ABI, IDO_ADDRESS } from "./idoContracts";

const idoContract = new ethers.Contract(IDO_ADDRESS, IDO_ABI, KOVAN_PROVIDER);

export const getPlanFee = (plan) =>
	new Promise(async (resolve, reject) => {
		try {
			if (plan === "standard") {
				let fee = await idoContract.standardFee();
				fee = ethers.utils.formatUnits(fee, 18);
				resolve({
					error: false,
					fee,
				});
			} else if (plan === "premium") {
				let fee = await idoContract.premiumFee();
				fee = ethers.utils.formatUnits(fee, 18);
				resolve({
					error: false,
					fee,
				});
			}
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const approveIDO = ({ amount, signer }) =>
	new Promise(async (resolve, reject) => {
		try {
			const tokenContract = new ethers.Contract(TEST_TOKEN_ADDRESS, ERC20_ABI, signer);
			const result = await tokenContract.approve(
				IDO_ADDRESS,
				ethers.utils.parseUnits(amount.toString(), 18)
			);
			resolve({
				error: false,
				data: result,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const createProject = ({
	settlementAddress,
	ipfsHash,
	startDate,
	endDate,
	isPremium,
	contractAddress,
	costPerToken,
	projectWallet,
	signer,
}) =>
	new Promise(async (resolve, reject) => {
		try {
			const idoContract = new ethers.Contract(IDO_ADDRESS, IDO_ABI, signer);
			console.log("Tx params", [
				settlementAddress,
				ipfsHash,
				startDate,
				endDate,
				isPremium,
				contractAddress,
				ethers.utils.parseUnits(costPerToken.toString(), 18),
				projectWallet,
			]);
			const result = await idoContract.createProject(
				settlementAddress,
				ipfsHash,
				startDate,
				endDate,
				isPremium,
				contractAddress,
				ethers.utils.parseUnits(costPerToken.toString(), 18),
				projectWallet
			);
			resolve({
				error: false,
				data: result,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
