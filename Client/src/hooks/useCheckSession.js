import { useEffect, useState } from "react";

const useCheckSession = ({ token, needRedirect = true, notLoggedUrl = "/login" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (token !== null) {
      fetch('/api/login', {
        method: "GET",
        headers: {
          'Authentication': `${token}`
        },
      }).then((response) => {
        return response.json()
      }).then((response) => {
        console.log(response)
        if (response.logged == true) {
          setIsLoggedIn(true);
        } else if (location.href.indexOf("/login") === -1 && location.href.indexOf("/signup") === -1) {
          // location.href = '/login'
          // localStorage.removeItem('session')
        }
      })
    } else if (location.href.indexOf("/login") === -1 && location.href.indexOf("/signup") === -1) {
      location.href = '/login'
    }
  }, [token]);


  return {
    isLoggedIn
  };
};

export default useCheckSession;