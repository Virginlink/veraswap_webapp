import { gql } from "@apollo/client";

export const GET_ALL_UPCOMING_PROJECTS = gql`
	query GetAllApprovedUpcomingProjects($skip: Int, $date: BigInt) {
		projects(first: 6, skip: $skip, where: { isApproved: true, startDate_gt: $date }) {
			id
			tokenAddress
			tokenName
			tokenDecimals
			owner
			tokenSymbol
			tokensAllocated
			tokensDeposited
			tokensWithdrawn
			plan
			tokenCost
			startDate
			endDate
			isApproved
			maxCapInVrap
			name
			description
			website
			totalVrapRaised
			socialHandles
			tokensSold
		}
	}
`;

export const GET_ALL_ONGOING_PROJECTS = gql`
	query GetAllOngoingProjects($skip: Int, $date: BigInt) {
		projects(
			first: 6
			skip: $skip
			where: { isApproved: true, startDate_lte: $date, endDate_gte: $date }
		) {
			id
			tokenAddress
			tokenName
			tokenDecimals
			owner
			tokenSymbol
			tokensAllocated
			tokensDeposited
			tokensWithdrawn
			plan
			tokenCost
			startDate
			endDate
			isApproved
			maxCapInVrap
			name
			description
			website
			totalVrapRaised
			socialHandles
			tokensSold
		}
	}
`;

export const GET_ALL_COMPLETED_PROJECTS = gql`
	query GetAllCompletedProjects($skip: Int, $date: BigInt) {
		projects(first: 6, skip: $skip, where: { isApproved: true, endDate_lt: $date }) {
			id
			tokenAddress
			tokenName
			tokenDecimals
			owner
			tokenSymbol
			tokensAllocated
			tokensDeposited
			tokensWithdrawn
			plan
			tokenCost
			startDate
			endDate
			isApproved
			maxCapInVrap
			name
			description
			website
			totalVrapRaised
			socialHandles
			tokensSold
		}
	}
`;

export const GET_PROJECTS_BY_USER_UNDER_REVIEW = gql`
	query GetProjectsByUserUnderReview($userAddress: Bytes, $skip: Int) {
		projects(first: 6, skip: $skip, where: { owner: $userAddress, isApproved: false }) {
			id
			tokenAddress
			tokenName
			tokenDecimals
			owner
			tokenSymbol
			tokensAllocated
			tokensDeposited
			tokensWithdrawn
			plan
			tokenCost
			startDate
			endDate
			isApproved
			maxCapInVrap
			name
			description
			website
			totalVrapRaised
			socialHandles
		}
	}
`;

export const GET_UPCOMING_PROJECTS_BY_USER = gql`
	query GetProjectsByUser($userAddress: Bytes, $skip: Int, $date: BigInt) {
		projects(
			first: 6
			skip: $skip
			where: { owner: $userAddress, isApproved: true, startDate_gt: $date }
		) {
			id
			tokenAddress
			tokenName
			tokenDecimals
			owner
			tokenSymbol
			tokensAllocated
			tokensDeposited
			tokensWithdrawn
			plan
			tokenCost
			startDate
			endDate
			isApproved
			maxCapInVrap
			name
			description
			website
			totalVrapRaised
			socialHandles
			tokensSold
		}
	}
`;

export const GET_ONGOING_PROJECTS_BY_USER = gql`
	query GetProjectsByUser($userAddress: Bytes, $skip: Int, $date: BigInt) {
		projects(
			first: 6
			skip: $skip
			where: { owner: $userAddress, isApproved: true, startDate_lte: $date, endDate_gte: $date }
		) {
			id
			tokenAddress
			tokenName
			tokenDecimals
			owner
			tokenSymbol
			tokensAllocated
			tokensDeposited
			tokensWithdrawn
			plan
			tokenCost
			startDate
			endDate
			isApproved
			maxCapInVrap
			name
			description
			website
			totalVrapRaised
			socialHandles
			tokensSold
		}
	}
`;

export const GET_COMPLETED_PROJECTS_BY_USER = gql`
	query GetProjectsByUser($userAddress: Bytes, $skip: Int, $date: BigInt) {
		projects(
			first: 6
			skip: $skip
			where: { owner: $userAddress, isApproved: true, endDate_lt: $date }
		) {
			id
			tokenAddress
			tokenName
			tokenDecimals
			owner
			tokenSymbol
			tokensAllocated
			tokensDeposited
			tokensWithdrawn
			plan
			tokenCost
			startDate
			endDate
			isApproved
			maxCapInVrap
			name
			description
			website
			totalVrapRaised
			socialHandles
			tokensSold
		}
	}
`;

export const GET_PROJECT_BY_ID = gql`
	query GetProject($projectId: ID!) {
		project(id: $projectId) {
			id
			tokenAddress
			tokenName
			tokenDecimals
			owner
			tokenSymbol
			tokensAllocated
			tokensDeposited
			tokensWithdrawn
			plan
			tokenCost
			startDate
			endDate
			isApproved
			maxCapInVrap
			name
			description
			website
			totalVrapRaised
			socialHandles
			projectWallet
			settlementAddress
			tokensSold
		}
	}
`;

export const GET_AVAILABLE_TOKEN_AMOUNT = gql`
	query GetAvailableTokenAmount($projectId: ID!) {
		project(id: $projectId) {
			tokensWithdrawn
			tokensDeposited
			tokensSold
		}
	}
`;

export const GET_PURCHASE_HISTORY_BY_PROJECT = gql`
	query GetPurchaseHistoryByProject($projectId: ID!) {
		purchaseActivities(first: 8, where: { projectId: $projectId }) {
			id
			buyer
			amount
			timestamp
		}
	}
`;

export const GET_PROJECT_PARTICIPANT_COUNT = gql`
	query GetProjectParticipantCount($projectId: ID!) {
		purchaseActivities(first: 8, where: { projectId: $projectId }) {
			id
		}
	}
`;
