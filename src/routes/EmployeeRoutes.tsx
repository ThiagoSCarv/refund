import { Routes, Route } from "react-router";

import { Refund } from "../pages/Refund";

import { AppLayout } from "../components/AppLayout";

import { Confirm } from "../pages/Confirm";

import { NotFound } from "../pages/NotFound";

export function EmployeeRoutes() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route path="/" element={<Refund />} />
				<Route path="/confirm" element={<Confirm />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
