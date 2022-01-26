import React from "react";

export const LinkCard = ({ link }) => {
   link = link.link
   console.log('new link  ');
   console.log(link.to);


   return (
      <>
         <h2>Ссилка</h2>

         <p>Ваша ссилка: &nbsp;
            <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
         </p>
         <p>Звідки: &nbsp;
            <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
         </p>
         <p>Кількість кліків по ссилці: &nbsp;
            <strong>{link.clicks}</strong>
         </p>
         <p>Дата створення: &nbsp;
            <strong>{new Date(link.date).toLocaleDateString()}</strong>
         </p>
      </>
   )
}