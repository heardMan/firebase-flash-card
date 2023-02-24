import React, { useEffect, useState } from 'react';

import './CardSetListItem.css';

const CardSetListItem = () => {

    return (
      
            <div className='cardset'>
                <div>{cardset.name}</div>
                
                <div>
                    {/* <TextInput label={'name'} value={fName} onChange={cardset.name} disabled={fNameActive === true ? false : true} /> */}
                </div>
                <div>{cardset.description}</div>
                <div>{cardset.description}</div>
            </div>
    
    );
};

export default CardSetListItem;