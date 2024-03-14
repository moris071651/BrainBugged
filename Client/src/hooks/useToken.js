import { useEffect, useState } from "react";

const useToken = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    let docToken = localStorage.getItem('session') || null

    setToken(docToken);
  }, [localStorage.getItem('session')]);

  return {
    token: localStorage.getItem('session') || null
  };
};

export default useToken;