import { createBrowserRouter } from "react-router-dom"

const appRouter = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                lazy: () => import("../features/photos/pages/Home"),
            },
            {
                path: "search/:query",
                lazy: () => import("../features/photos/pages/Search"),
            },
        ],
    },
    {
        path: "*",
        lazy: () => import("../features/misc/pages/NotFound"),
    },
])

export default appRouter
