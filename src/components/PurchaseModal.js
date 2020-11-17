import React,{useContext} from 'react';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {BookingContext} from './BookingContext';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const SeatInfoDisplay = ({row, seat, price}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Row</TableCell>
                    <TableCell align="center">Seat</TableCell>
                    <TableCell align="right">Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>{row}</TableCell>
                    <TableCell align="center">{seat}</TableCell>
                    <TableCell align="right">{`$${price}`}</TableCell>
                </TableRow>
            </TableBody>
            
            </Table>
        </TableContainer>
    )
}

const PurchaseModal = () =>{
    const {actions:{cancelBooking, makePurchase,requestFailure, requestSuccess},
     state} = useContext(BookingContext);
    const row = state.selectedSeatId !== null ? state.selectedSeatId[0] : '';
    const seat = state.selectedSeatId !== null ? state.selectedSeatId.slice(2) : '';
    const price = state.price !== null ? state.price : '';
    const [creditCard, setCreditCard] = React.useState("");
    const [expiration, setExpiration] = React.useState(""); 
    const [error, setError] = React.useState(""); 
    const [waiting, setWaiting] = React.useState(false); 

    const sID = state.selectedSeatId

    const bookSeatRequest =  (id, cc, exp) =>{
        setError('')
        setWaiting(true);
        makePurchase();
        setTimeout( () =>{
                fetch('api/book-seat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'seatId': id,
                    'creditCard': cc,
                    'expiration': exp,
                }),
            })
        .then((res) => res.json())
        .then((data) => {
            // Do some stuff ...
            console.log(data)
            if(data.status !== 200){
                setError(data.message)
                requestFailure(data.message)
            } else{
                requestSuccess()
               
            }
            setWaiting(false)
        })
    }, 2000)
    }
    return (
        <Dialog
        open={state.selectedSeatId !== null}
        onClose={cancelBooking}
        TransitionComponent={Transition}
        >
            <DialogContent>
            <h1>Purchase Ticket</h1>
                <DialogContentText>
                    
                    <p>You're purchasing <b>1</b> ticket for the price <b>{`$${price}`}</b></p>
                    <SeatInfoDisplay row={row} seat={seat} price={price}/>
                </DialogContentText>
                <h2>Enter payment details</h2>
                <MyForm>
                    
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Credit Card"
                    value={creditCard}
                    onChange={e => setCreditCard(e.target.value)}
                    />
                    <TextField
                    style={{marginLeft: '5px'}}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Expiration"
                    size="small"
                    value={expiration}
                    onChange={e => setExpiration(e.target.value)}
                />
                <Button onClick={() =>bookSeatRequest(sID, creditCard, expiration)}
                    variant="contained"
                    color="primary"
                    style={{padding: '20px', marginLeft:'7px'}}>
                            {waiting ? <CircularProgress/> : 'Purchase' }
                    </Button>
                <Err err={error.length > 0 }>{error}</Err>
                </MyForm>
            </DialogContent>
            

        </Dialog>

    )

}

const MyForm = styled.div`
    background: whitesmoke;
    padding: 25px;
    border-radius: 10px;
`;

const Err = styled.p`
    color: red;
    display: ${props => props.err ? 'block' : 'none'}
`;

export default PurchaseModal;