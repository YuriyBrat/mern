import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
   //    const history = createBrowserHistory();
   //    history.push({
   //       pathname:"/users",
   //     //  state:{
   //     //  Key : response.data.user }
   // });
   const navigate = useNavigate();


   const auth = useContext(AuthContext)
   const { request } = useHttp();
   const [link, setLink] = useState('');

   useEffect(() => {
      window.M.updateTextFields() //! робить інпути активні і вони не накладаються один на один текстом
   })

   const pressHandler = async (event) => {
      if (event.key === 'Enter') {
         try {
            const data = await request('/api/link/generate', 'POST', { from: link }, {
               Authorization: `Bearer ${auth.token}`
            })
            navigate(`/detail/${data.link._id}`) // how to push url(`/detail/${data.link._id}`)
            console.log('data link is  ' + data);

         } catch (e) {
            console.log('error in create page preesHandler');

         }
      }
   }

   return (
      <div className="row">
         <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
            <div className="input-field ">
               <input
                  placeholder="Вставте ссилку"
                  id="link"
                  type="text"
                  name="email"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  onKeyPress={pressHandler}
               />
               <label htmlFor="link">Введіть ссилку</label>
            </div>
         </div>
      </div>
   )
}