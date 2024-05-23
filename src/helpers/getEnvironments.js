export const getEnvironments = () => {

    // loads the env vars from VITE - only visible in the FE
    import.meta.env;

    return {
        ...import.meta.env
    }
}