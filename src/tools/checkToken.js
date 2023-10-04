import axios from "axios";
import { createRefresh } from "react-auth-kit";

export const checkToken = createRefresh({
  interval: 8000, // Refreshs the token in every 10 minutes
  refreshApiCallback: async ({ authToken, authUserState }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/checktoken.php`,
        { token: authToken },
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: response.data.tokentime_string,
        authState: {
          id: response.data.id,
          fio: response.data.fio,
          token: response.data.token,
        },
        // newRefreshTokenExpiresIn: 60
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});
