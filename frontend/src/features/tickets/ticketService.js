import axios from 'axios'
const API_URL = '/api/tickets/'

const createTicket  = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData, config)
}

// Get user tickets
const getTickets = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }
  

  const getTicket = async (ticketId,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  console.log(API_URL)
    const response = await axios.get(`${API_URL}/${ticketId}`, config)
  
    return response.data
  }

  const deleteTicket = async (ticketId, token) =>{
    console.log(ticketId,'service')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(`${API_URL}${ticketId}` ,config)
return response.data
}

//ticket.product, ticket.product, ticket._id

const updateTicket = async (updateTicketData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(`${API_URL}${updateTicketData._id}/`, {
        product: updateTicketData.product,
        description: updateTicketData.description
    },config)
return response.data
}


 // Close ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + ticketId,
    { status: 'closed' },
    config
  )

  return response.data
}
const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
    updateTicket,
    deleteTicket,
}

export default ticketService