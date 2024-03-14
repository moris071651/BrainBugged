import { useEffect, useState } from "react";

const useCheckSession = ({ token, needRedirect = true, notLoggedUrl = "/login" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  
  useEffect(() => {
    if (token !== null) {
      fetch('/api/register', {
        method: "GET",
        headers: {
          'Cookie': `${token}`
        },
      }).then((response) => {
        return response.json()
      }).then((response) => {
        console.log(response)
        debugger
        if (response.logged == true) {
          setIsLoggedIn(true);
        } else if (location.href.indexOf("/login") === -1 && location.href.indexOf("/signup") === -1) {
          location.href = '/login'

          setIsLoggedIn(false);
          // localStorage.removeItem('session')
        }
      })
    }
  }, [token]);


  return {
    isLoggedIn
  };
};

export default useCheckSession;