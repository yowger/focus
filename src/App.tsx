import { QueryClientProvider } from "@tanstack/react-query"

import Home from "./features/photos/pages/Home"
import { queryClient } from "./lib/reactQuery"

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
    )
}
