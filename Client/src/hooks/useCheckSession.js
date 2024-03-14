import { useEffect, useState } from "react";

const useCheckSession = ({ token, needRedirect = true, notLoggedUrl = "/login" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  
  useEffect(() => {
    if (token !== null) {
      fetch('/api/signup', {
        method: "GET",
        headers: {
          'Session': `token ${token}`
        },
      }).then((response) => {
        return response.json()
      }).then((response) => {
        if (response.logged == true) {
          setIsLoggedIn(true);
        } else {
          if (needRedirect) {
            navigate(notLoggedUrl)
          }

          setIsLoggedIn(false);
          localStorage.removeItem('session')
        }
      })
    }
  }, [token]);


  return {
    isLoggedIn
  };
};

export default useCheckSession;