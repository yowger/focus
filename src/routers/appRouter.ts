import { createBrowserRouter } from "react-router-dom"

const appRouter = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                lazy: () => import("../features/photos/pages/HomePage"),
            },
            {
                path: "search/:query",
                lazy: () => import("../features/photos/pages/SearchPage"),
            },
            {
                path: "likes",
                lazy: () => import("../features/photos/pages/LikedPage"),
            },
        ],
    },
    {
        path: "*",
        lazy: () => import("../features/misc/pages/NotFound"),
    },
])

export default appRouter
