import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"

import { queryClient } from "./lib/reactQuery"
import appRouter from "./routers/appRouter"

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={appRouter} />
        </QueryClientProvider>
    )
}
