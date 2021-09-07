import { ethers } from "ethers";
import { ERC20_ABI, KOVAN_PROVIDER, TEST_TOKEN_ADDRESS } from "./contracts";
import { IDO_ABI, IDO_ADDRESS } from "./idoContracts";
import Empty from "../assets/icons/Empty.png";
import BUSD from "../assets/images/busd.png";

export const IDO_PURCHASE_TOKENS = [
	{
		id: "veraswap",
		ticker: "VRAP",
		icon: Empty,
		address: TEST_TOKEN_ADDRESS,
	},
	{
		id: "binancecoin",
		ticker: "ETH",
		icon: Empty,
		address: "",
	},
	{
		id: "busd",
		ticker: "BUSD",
		icon: BUSD,
		address: "0x5F11885107AA0d6aF62D8B32ab6D416bc41764ae",
	},
];

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
	new Promise((resolve, reject) => {
		try {
			const idoContract = new ethers.Contract(IDO_ADDRESS, IDO_ABI, signer);
			process.env.NODE_ENV === "development" &&
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
			const tokenContract = new ethers.Contract(contractAddress, ERC20_ABI, KOVAN_PROVIDER);
			tokenContract
				.decimals()
				.then(async () => {
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
				})
				.catch((_) =>
					reject({
						error: true,
						message: "Invalid token address",
					})
				);
		} catch (err) {
			reject({
				error: true,
				message: "Something went wrong. Please try again",
			});
		}
	});

export const depositToken = ({ projectId, amount, decimals, signer }) =>
	new Promise(async (resolve, reject) => {
		try {
			const idoContract = new ethers.Contract(IDO_ADDRESS, IDO_ABI, signer);
			const result = await idoContract.depositTokens(
				projectId,
				ethers.utils.parseUnits(amount, decimals)
			);
			resolve({
				error: false,
				data: result,
			});
		} catch (err) {
			console.log(err);
			reject({
				error: true,
				message: "Something went wrong. Please try again",
			});
		}
	});

export const purchaseTokens = ({
	from = "VRAP",
	projectId,
	purchaseAmount,
	amount,
	decimals,
	signer,
}) =>
	new Promise(async (resolve, reject) => {
		process.env.NODE_ENV === "development" &&
			console.log({ from, projectId, purchaseAmount, amount, decimals });
		const idoContract = new ethers.Contract(IDO_ADDRESS, IDO_ABI, signer);
		switch (from) {
			case "VRAP":
				idoContract
					.buyTokensWithVrap(projectId, ethers.utils.parseUnits(amount, decimals))
					.then((result) => {
						resolve({
							error: false,
							data: result,
						});
					})
					.catch((err) => {
						console.log(err);
						reject({
							error: true,
							message: "Something went wrong. Please try again",
						});
					});
				break;

			case "BUSD":
				idoContract
					.buyTokensWithBUSD(projectId, ethers.utils.parseUnits(amount, decimals))
					.then((result) => {
						resolve({
							error: false,
							data: result,
						});
					})
					.catch((err) => {
						console.log(err);
						reject({
							error: true,
							message: "Something went wrong. Please try again",
						});
					});
				break;

			case "ETH":
				idoContract
					.buyTokensWithBNB(projectId, ethers.utils.parseUnits(amount, decimals), {
						value: ethers.utils.parseEther(purchaseAmount.toString()),
					})
					.then((result) => {
						resolve({
							error: false,
							data: result,
						});
					})
					.catch((err) => {
						console.log(err);
						reject({
							error: true,
							message: "Something went wrong. Please try again",
						});
					});
				break;

			default:
				reject({
					error: true,
					message: "Invalid purchase token",
				});
				break;
		}
	});

export const withdrawTokens = ({ projectId, amount, decimals, signer }) =>
	new Promise(async (resolve, reject) => {
		// console.log(projectId, amount, decimals);
		try {
			const idoContract = new ethers.Contract(IDO_ADDRESS, IDO_ABI, signer);
			const result = await idoContract.emergencyWithdraw(
				projectId,
				ethers.utils.parseUnits(amount, decimals)
			);
			resolve({
				error: false,
				data: result,
			});
		} catch (err) {
			console.log(err);
			reject({
				error: true,
				message: "Something went wrong. Please try again",
			});
		}
	});

export const removeProject = ({ projectId, signer }) =>
	new Promise(async (resolve, reject) => {
		console.log(projectId, signer);
		try {
			const idoContract = new ethers.Contract(IDO_ADDRESS, IDO_ABI, signer);
			const result = await idoContract.removeProject(projectId);
			resolve({
				error: false,
				data: result,
			});
		} catch (err) {
			console.log(err);
			reject({
				error: true,
				message: "Something went wrong. Please try again",
			});
		}
	});
