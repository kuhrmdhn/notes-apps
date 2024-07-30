import { Skeleton, Stack } from "@chakra-ui/react"

function LazyCard() {
    return (
        <Stack className="w-40 sm:w-60 lg:w-80 h-56 sm:h-64 lg:h-72 p-3 flex flex-col justify-around gap-4 border border-dark-green rounded-md">
            <div className="h-1/3 flex flex-col justify-center gap-3">
                <Skeleton height={"30%"} width={"75%"} />
                <Skeleton height={"15%"} width={"20%"} />
            </div>
            <Skeleton height={"68%"} />
        </Stack>
    )
}

export default LazyCard
