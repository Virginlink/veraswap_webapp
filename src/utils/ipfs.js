import IPFS from "ipfs-api";

const ipfs = new IPFS({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
});

export const uploadJSONToIPFS = async (data) => {
	try {
		const result = await ipfs.files.add(Buffer.from(JSON.stringify(data)));
		return result[0].hash;
	} catch (_) {
		return null;
	}
};

export const getFileFromIPFS = async (hash) => {
	const data = await ipfs.get(hash);
	const bufferData = await JSON.parse(data[0].content.toString());
	return bufferData;
};
