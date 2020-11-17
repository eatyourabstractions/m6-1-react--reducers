import React,{ useContext} from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import {SeatContext} from './SeatContext';

import {ReactComponent as Seat} from '../assets/seat-available.svg';



import Tippy from '@tippyjs/react'

const TicketWidget = () => {
  // TODO: use values from Context
  const {state} = useContext(SeatContext);
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;
 

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
      <Wrapper>
   { state.hasLoaded ?
      range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              return (
                <SeatWrapper key={seatId} isBooked={state.seats[seatId].isBooked}>
                  {/* TODO: Render the actual <Seat /> */}
                  <BlackTippy arrow={true} content={`Row ${rowIndex}, ${seatId} - ${state.seats[seatId].price}`}>
                    <Seat/>
                  </BlackTippy>
                </SeatWrapper>
              );
            })}
          </Row>
        );
      }) : <CircularProgress/>

      }
    </Wrapper>
    
  );
};

const BlackTippy = styled(Tippy)`
  background: black;
  padding: 5px;
  border-radius: 5px;
  
`;

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  filter: ${props => props.isBooked ? 'grayscale(100%)' : 'grayscale(0%)'};
`;

export default TicketWidget;
