import { QueryClient } from "@tanstack/react-query"

import type {
    DefaultOptions,
    UndefinedInitialDataInfiniteOptions,
    UseQueryOptions,
} from "@tanstack/react-query"

const queryConfig: DefaultOptions = {
    queries: {
        refetchOnWindowFocus: false,
        retry: false,
    },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type QueryConfig<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">

export type InfiniteQueryConfig<T> = Omit<
    UndefinedInitialDataInfiniteOptions<T>,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
>
