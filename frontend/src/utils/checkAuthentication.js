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
  
      if (!response.ok) {
        console.error('Error refreshing access token:', response.status);
        throw { status: response.status, error: 'Error refreshing access token' };
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };