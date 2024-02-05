export const checkAuthentication = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/isAuth`, {
            method: 'GET',
            credentials: 'include',
        });

        return response;  // Updated line
    } catch (err) {
        console.error(err);
        return { status: 500, error: err.message };  // Updated line
    }
};
