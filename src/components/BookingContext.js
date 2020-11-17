import React, { useReducer } from 'react';

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
  };

const reducer = (state, action) =>{
    console.log(`booking context reducer: `, action)
switch(action.type) {

    case "begin-booking-process":
  
       return {
           ...state,
           status:'seat-selected',
           selectedSeatId: action.seatId,
           price: action.price,
           
       }
       case "cancel-booking-process":
  
       return {
           ...state,
          ... action.payload,
       }
       case "purchase-ticket-request":
  
       return {
           ...state,
            status: action.status,
       }
       case "purchase-ticket-failure":
  
       return {
           ...state,
            status: action.status,
            error: action.error
       }
       case "purchase-ticket-success":
  
       return {
           ...state,
            status: action.status,
            selectedSeatId: action.selectedSeatId,
            price: action.price
       }
    default:
        throw new Error(`Unrecognized action: ${action.type}`)
  
   }
   
    
}

export const BookingProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const startBooking = (data) => {
        dispatch({
          type: "begin-booking-process",
          ...data,
        });
      };

    const cancelBooking = () =>{
        dispatch({
            type:"cancel-booking-process",
            payload: initialState
        })
    }
    const makePurchase = () =>{
      dispatch({
        type:"purchase-ticket-request",
        status: "awaiting-response",
    })
    }
    const requestFailure = (msg) =>{
      dispatch({
        type:"purchase-ticket-failure",
        status: "error",
        error: msg
    })
    }
    const requestSuccess = (msg) =>{
      dispatch({
        type:"purchase-ticket-success",
        status: "purchased",
        selectedSeatId: null,
        price: null,
  
    })
    }

      return (
        <BookingContext.Provider
          value={{
            state,
            actions: {
              startBooking,
              cancelBooking,
              makePurchase,
              requestFailure,
              requestSuccess,
            },
          }}
        >
          {children}
        </BookingContext.Provider>
      );
    
}