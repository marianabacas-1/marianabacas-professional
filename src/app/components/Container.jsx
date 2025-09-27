import { useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';
export default function Container({ children }) {
    const { webAccount, fetchWebUser } = useContext(Context);

    useEffect(() => {
      if(!webAccount) {        
          if(JSON.parse(localStorage.getItem('webUserInfo'))) {
              const userInfo = JSON.parse(localStorage.getItem('webUserInfo'));
              fetchWebUser(userInfo.sub);
          }
      }
    }, [])
  return (
    <div className="py-8 md:py-16 px-5 md:px-10">
      <div>{children}</div>
    </div>
  )
}
