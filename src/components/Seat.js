import React,{useContext} from 'react';
import styled from 'styled-components';
import {ReactComponent as SingleSeat} from '../assets/seat-available.svg';

import Tippy from '@tippyjs/react';

import {BookingContext} from './BookingContext';

const Seat = ({rowIndex, seatId, width, height, price, status}) =>{
    const {actions:{startBooking}, state} = useContext(BookingContext);

    const data ={
        seatId: seatId,
        price: price
    }
    return (
    <Wrapper isBooked={status} width={width} height={height} >
        <BlackTippy arrow={true} content={`Row ${rowIndex}, seat ${seatId.slice(2)} - $${price}`}>
            <Clickable onClick={() => startBooking(data)} disabled={status}>
                <SingleSeat/>
            </Clickable>
        </BlackTippy>
    </Wrapper>
    )

}
const Wrapper = styled.div`
  padding: 0px;
  margin: 5px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  filter: ${props => props.isBooked ? 'grayscale(100%)' : 'grayscale(0%)'};
`;

const Clickable = styled.button`
    border: none;
    :focus{
        outline:none;
        }
`;

const BlackTippy = styled(Tippy)`
  background: black;
  padding: 5px;
  border-radius: 5px;
  
`;

export default Seat