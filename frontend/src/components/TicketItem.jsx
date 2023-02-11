import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { deleteTicket } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import {  useState } from 'react'

function TicketItem({ ticket }) {
  const { user } = useSelector((state) => state.auth)
  const [newTicketProduct, setNewTicketProduct] = useState(ticket.product)
  const [newTicketDescription, setNewTicketDescription] = useState(ticket.description)

  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // const { notes } = useSelector((state) => state.notes)

  const handelDeleteNote = () =>{
    console.log('delete', ticket)
    dispatch(deleteTicket(ticket)).unwrap().catch(toast.error)
  }


  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/tickets/${ticket._id}/`} className='btn btn-reverse btn-sm'>
        View
      </Link>
      <Link to={`/update-ticket/${ticket._id}/`}  className='btn '>
        Update
      </Link>
      <button onClick={handelDeleteNote} className='btn '>
        Delete
      </button>
    </div>
  )
}

export default TicketItem
