import { Routes, Route } from "react-router";

import { Dashboard } from "../pages/Dashbord";

import { NotFound } from "../pages/NotFound";

import { AppLayout } from "../components/AppLayout";

export function ManagerRoutes() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route path="/" element={<Dashboard />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
