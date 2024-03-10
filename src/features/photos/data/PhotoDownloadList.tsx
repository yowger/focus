import { IButtonListItem } from "@/components/buttons/types"

export const photoDownloadItems: IButtonListItem[] = [
    {
        label: (
            <>
                Small <span className="text-gray-400 ml-1">(640 x 1139)</span>
            </>
        ),
        function: () => {},
    },
    {
        label: (
            <>
                Medium <span className="text-gray-400 ml-1">(1940 x 3417)</span>
            </>
        ),
        function: () => {},
    },
    {
        label: (
            <>
                Large <span className="text-gray-400 ml-1">(2400 x 4271)</span>
            </>
        ),
        function: () => {},
    },
    {
        label: (
            <>
                Original Size{" "}
                <span className="text-gray-400 ml-1">(2902 x 5165)</span>
            </>
        ),
        break: true,
        function: () => {},
    },
]
