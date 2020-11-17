import React,{useContext, useEffect} from 'react';

import GlobalStyles from './GlobalStyles';

import { SeatContext } from './SeatContext';

import TicketWidget from './TicketWidget';

function App() {
  const {actions:{receiveSeatInfoFromServer}, state} = useContext(SeatContext);
  console.log(state)
  useEffect(() =>{
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        receiveSeatInfoFromServer(data)
      })
  }, [])
  return (
    <>
      <GlobalStyles />
     <TicketWidget/>
      
    </>
  );
}

export default App;
