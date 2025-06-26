import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EmptyCart from '../assets/images/emptycart.png' 
import { FaT } from 'react-icons/fa6'
import { FaTrashAlt } from 'react-icons/fa'
import { useState } from 'react'
import Modal from '../components/Modal'
import ChangeAddress from '../components/ChangeAddress'
import { removeFromCart , increaseQuantity, decreaseQuantity} from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const [address, setAddress] = useState('Rajasthan, India');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

  return (
    <div className='container mx-auto px-4 min-h-96 md:px-16 lg:px-24 py-8'>
      {cart.products.length > 0 ? 
      (<div>
        <h3 className='text-2xl font-semibold mb-4'>Shopping Cart</h3>
        <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>
            <div className='md:w-2/3'>
                <div className='flex justify-between items-center border-b text-xs font-bold mb-4'>
                    <p>Products</p>
                    <div className='flex space-x-8'>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                        <p>Remove</p>
                    </div>
                </div>
                <div>
                    {cart.products.map((product) => (
                        <div key={product.id} className='flex justify-between items-center border-b py-3'>
                            <div className='md:flex items-center space-x-4'>
                                <img src={product.image} alt={product.name} className='w-16 h-16 object-contain rounded'/>
                                <div className='flex-1 ml-4'>
                                    <h3 className='text-lg font-semibold'>{product.name}</h3>
                                </div>
                            </div>
                            <div className='flex items-center space-x-12'>
                                <p>${product.price}</p>
                                <div className='flex items-center justify-center border'>
                                    <button className='text-xl font-bold px-1.5 border-r' onClick={() =>dispatch(decreaseQuantity(product.id)) }>
                                        -
                                    </button>
                                    <p className='text-xl px-1 border-l'>{product.quantity}</p>
                                    <button className='text-xl font-bold  px-1.5 border-l' onClick={() =>dispatch(increaseQuantity(product.id)) }>
                                        +
                                    </button>
                                </div>
                                <p>${(product.quantity * product.price).toFixed(2)}</p>
                                <button className='text-red-600 hover:text-red-800' onClick={() => dispatch(removeFromCart(product.id))} >
                                    <FaTrashAlt/>
                                </button>
                            </div>
                        </div>
                        ))}
                </div>
            </div>
            <div className='md:w-1/3 bg-white p-6 rounded-lg shadow-md border'>
                <h3 className='text-sm font-semibold mb-5'>Cart Total</h3>
                <div className='flex justify-between mb-5 border-b pb-1'>
                    <span className='text-sm'>Total Items:</span>
                    <span>{cart.totalQuantity}</span>
                </div>
                <div className='mb-4 border-b pb-2'>
                    <p>Shipping:</p>
                    <p className='ml-2'>Shipping to {" "}
                    <span className='text-xs font-bold'>{address}</span>
                    </p>
                    <button className='text-blue-500 hover:underline mt-1 ml-2' onClick={() => setIsModalOpen(true)}>Change address</button>
                </div>
                <div className='flex justify-between mb-4'>
                    <span>Total Price:</span>
                    <span>{cart.totalPrice.toFixed(2)}</span>
                </div>
                <button className='w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 ' onClick={() => Navigate('/checkout')}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
        <Modal isModalOpen={isModalOpen}
        setIsModalOpen = {setIsModalOpen}>
            <ChangeAddress setAddress={setAddress} setIsModalOpen={setIsModalOpen}/>
        </Modal>
      </div>)
      : (<div className='flex justify-center'>
          <img src={EmptyCart} alt=""  className='h-96'/>
        </div>)}
    
    </div>
  )
}

export default Cart
