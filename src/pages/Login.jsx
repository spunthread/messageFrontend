import { useCallback, useContext } from "react";
import { loginUser } from "../utils/Auth";
import { GlobalContext } from "../GlobalContext";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { dispatch } = useContext(GlobalContext);

  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(
    async (credentials) => {
      console.log("Google login succesfull:", credentials);
      try {
        const data = await loginUser(credentials);
        dispatch({ type: "LOGIN", payload: data });
      } catch (error) {
        console.log("Login Error:", error);
      }
    },
    [dispatch]
  );

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <GoogleLogin
          useOneTap
          size="large"
          shape="pill"
          text="continue_with"
          theme="filled_blue"
          onSuccess={handleLogin}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />
        {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}
      </div>
    </div>
  );
};

export default Login;
