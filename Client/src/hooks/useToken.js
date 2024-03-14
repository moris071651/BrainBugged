import { useEffect, useState } from "react";

const useToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let docToken = localStorage.getItem('session') || null

    setToken(docToken);
  }, [localStorage.getItem('session')]);

  return {
    token
  };
};

export default useToken;