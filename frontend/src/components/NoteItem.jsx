import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateNote, deleteNote } from '../features/notes/noteSlice'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}
function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth)
  const [newNoteText, setNewNoteText] = useState('')

  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { notes } = useSelector((state) => state.notes)

  const handelDeleteNote = () =>{
    dispatch(deleteNote(note)).unwrap().catch(toast.error)
console.log(note.ticket, note._id)
  }
  const onNoteSubmit = (e) =>{
    e.preventDefault()
console.log(e)
    dispatch(updateNote(note,e)).unwrap().catch(toast.error)
      .unwrap()
      .then(() => {
        setNewNoteText('')
        closeModal()
      })
      .catch(toast.error)
  } 

 

// Open/close modal
const openModal = () => setModalIsOpen(true)
const closeModal = () => setModalIsOpen(false)

  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
      {note.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Update Note
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
      <h1 >
        Edit
      </h1>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={note.text}
              onChange={(e) => setNewNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>
     
      <button onClick={handelDeleteNote} note={note} className='btn '>
        Delete
      </button>
    </div>
  )
}

export default NoteItem
