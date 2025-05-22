import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./AuthRoutes";

import { EmployeeRoutes } from "./EmployeeRoutes";

import { ManagerRoutes } from "./ManagerRoutes";

import { Loading } from "../components/Loading";

const isLoading = false;

export function Routes() {
	if (isLoading) {
		return <Loading />;
	}
	return (
		<BrowserRouter>
			<AuthRoutes />
		</BrowserRouter>
	);
}
