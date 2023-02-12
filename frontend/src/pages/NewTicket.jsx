import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, getTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import { useParams } from 'react-router-dom'
import { updateTicket } from '../features/tickets/ticketSlice'

function NewTicket() {
  const { user } = useSelector((state) => state.auth)
  const { ticket } = useSelector((state) => state.tickets)
console.log(ticket)

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  // const [product, setProduct] = useState(ticket?.product)
  // const [description, setDescription] = useState(ticket?.description)
  const [product, setProduct] = useState("")
  const [description, setDescription] = useState("")


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { ticketId } = useParams()

  // const selectedTicket = dispatch(getTicket(ticketId)).unwrap().then((response) => {
  //   console.log(response);
  // })
  // .catch(toast.error)
  

  
useEffect(() => {
   
    if(!ticketId) return
  dispatch(getTicket(ticketId))
  }, [dispatch, ticketId])
 

  useEffect(() => {
   setDescription(ticket.description)
   setProduct(ticket.product)
  
  }, [ticket])
  const onSubmit = (e) => {
    e.preventDefault()
    const updateTicketData = {
      product,
      description,
      _id: ticketId,
    }
    if (ticketId) {
      dispatch(updateTicket(updateTicketData))
        .unwrap()
        .then(() => {
          navigate('/tickets')
          // setNewticketProduct('')
          // setNewticketDescription('')
        })
        .catch(toast.error)
    } else {
      dispatch(createTicket({ product, description }))
        .unwrap()
        .then(() => {
          // We got a good response so navigate the user
          navigate('/tickets')
          toast.success('New ticket created!')
        })
        .catch(toast.error)
    }
  }

  return (
    <>
      <BackButton />
      <section className='heading'>
        {ticketId ? <h1>Update Ticket</h1> : <h1>Create New Ticket</h1>}
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
