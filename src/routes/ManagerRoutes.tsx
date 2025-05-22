import { Routes, Route } from "react-router";

import { Dashboard } from "../pages/Dashbord";

import { NotFound } from "../pages/NotFound";

import { Refund } from "../pages/Refund";

import { AppLayout } from "../components/AppLayout";

export function ManagerRoutes() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route path="/" element={<Dashboard />} />
				<Route path="/refund/:id" element={<Refund />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
