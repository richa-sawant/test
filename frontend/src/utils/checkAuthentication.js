export const checkAuthentication = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/isAuth`, {
            method: 'GET',
            credentials: 'include',
        });

        return response;
    } catch (err) {
        console.error(err);
        throw new Error({ status: 500, error: err.message });
    }
};

export const refreshAccessToken = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/refreshToken`, {
            method: 'POST',
            credentials: 'include',
        });

        return response;
    } catch (err) {
        console.error(err);
        throw new Error({ status: 500, error: err.message });
    }
};
