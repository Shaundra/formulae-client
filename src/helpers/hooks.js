import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_ROOT, HEADERS } from '../constants';
import { fetchJWT } from './index'

function getCurrentUser(accessToken, setterFunc) {
  // fetch current user from API, return user
  if (accessToken) {
    // console.log(`trying to get currentUser using these conditions: ${accessToken} and ${API_ROOT + '/profile'}`)

    fetchJWT({
      url: API_ROOT + '/profile',
      jwt: accessToken
    })
    .then(response => response.json())
    .then(user => {
      console.log('in getCurrentUser', user)
      setterFunc(user)
    })
  }
}

const initialState = {
  user: {},
  accessToken: '',
}

const UserContext = createContext(initialState);

export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  const [user, setUser] = useState({})

  function handleAccessTokenChange() {
    if (!user.name && accessToken) {
      // log-in
      localStorage.setItem('access_token', accessToken)
      getCurrentUser(accessToken, setUser)
    } else if (!accessToken) {
      // log-out
      localStorage.removeItem('access_token')
      setUser({})
    }
  }

  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken])

  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);
