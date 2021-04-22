import React from "react";
import { Box, CircularProgress } from "@chakra-ui/react";

export const Loading = () => {
    return (
        <Box py="8">
            <CircularProgress
                isIndeterminate
                color="green.600"
                size="120px"
                thickness="4px"
            />
        </Box>
    );
};
