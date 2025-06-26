import React, { Children } from 'react'


const Modal = ({isModalOpen, setIsModalOpen, children}) => {

    if (!isModalOpen) return null;
  return (
    <div className='fixed inset-0 bg-gray bg-opacity-75 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <button className='absolute top-4 right-4 text-gray-300 text-3xl' onClick={() => setIsModalOpen(false)}>&times;</button>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
