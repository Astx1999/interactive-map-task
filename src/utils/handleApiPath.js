const handleApiPath = (pathName)  => {
    if (!process.env[pathName]) {
        // eslint-disable-next-line no-console
        console.warn(`${pathName} is not defined`);
    }

    if (!!process.env[pathName]) {
        return `${process.env[pathName]}`;
    }
    return "";
};

export default handleApiPath;
