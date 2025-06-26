import React, { use, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Checkout = ({setOrder}) => {
  const [billingToggle, setBillingToggle] = useState(true);
  const [shippingToggle, setShippingToggle] = useState(false);
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zip: ''
  })
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();

  const handleOrder = () => {
    const newOrder = {
        products: cart.products,
        orderNumber: "12345",
        shippingInformation: shippingInfo,
        totalPrice: cart.totalPrice,
    }
    setOrder(newOrder);
    navigate('/order-confirmation', { state: { order: newOrder } });
  }

  return (
    <div className='container mx-auto px-4 min-h-96 md:px-16 lg:px-24 py-8'>
      <h3 className='text-2xl font-semibold mb-4'>CHECKOUT</h3>
      <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>
        <div className='md:w-2/3'>

          {/* Billing */}
          <div className='border p-2 mb-6'>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => setBillingToggle(!billingToggle)}
            >
              <h3 className='text-lg font-semibold mb-2'>Billing Information</h3>
              {billingToggle ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {billingToggle && (
              <div className='space-y-4 mt-2'>
                <div>
                  <label className='block text-gray-700'>Name</label>
                  <input type="text" name='name' placeholder='Enter name' className='w-full px-3 py-2 border' />
                </div>
                <div>
                  <label className='block text-gray-700'>Email</label>
                  <input type="email" name='email' placeholder='Enter mail' className='w-full px-3 py-2 border' />
                </div>
                <div>
                  <label className='block text-gray-700'>Phone</label>
                  <input type="text" name='phone' placeholder='Enter Phone #' className='w-full px-3 py-2 border' />
                </div>
              </div>
            )}
          </div>

          {/* Shipping */}
          <div className='border p-2 mb-6'>
            <div className='flex items-center justify-between cursor-pointer' onClick={() => setShippingToggle(!shippingToggle)}>
              <h3 className='text-lg font-semibold mb-2'>Shipping Information</h3>
              {shippingToggle ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {shippingToggle && (
              <div className='space-y-4 mt-2'>
                <div>
                  <label className='block text-gray-700'>Address</label>
                  <input type="text" name='address' placeholder='Enter address' className='w-full px-3 py-2 border' 
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}/>
                </div>
                <div>
                  <label className='block text-gray-700'>City</label>
                  <input type="text" name='city' placeholder='Enter city' className='w-full px-3 py-2 border' 
                  onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}/>
                </div>
                <div>
                  <label className='block text-gray-700'>Zip Code</label>
                  <input type="text" name='zip' placeholder='Enter Zip Code' className='w-full px-3 py-2 border'
                  onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})} />
                </div>
              </div>
            )}
          </div>

          {/* Payment */}
          <div className='border p-2 mb-6'>
            <div className='flex items-center justify-between cursor-pointer' onClick={() => setPaymentToggle(!paymentToggle)}>
              <h3 className='text-lg font-semibold mb-2'>Payment Information</h3>
              {paymentToggle ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {paymentToggle && (
              <div className='space-y-4 mt-2'>
                <div className='flex items-center space-x-2'>
                  <input
                    type="radio"
                    name='payment'
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <label className='text-gray-700'>Cash on Delivery</label>
                </div>
                <div className='flex items-center space-x-2'>
                  <input
                    type="radio"
                    name='payment'
                    checked={paymentMethod === 'dc'}
                    onChange={() => setPaymentMethod('dc')}
                  />
                  <label className='text-gray-700'>Debit Card</label>
                </div>
                {paymentMethod === "dc" && (
  <div className='mt-4 space-y-4'>
    <h3 className='text-md font-semibold'>Debit Card Information</h3>
    
    <div>
      <label htmlFor="cardNumber" className='block text-gray-700'>Card Number</label>
      <input
        type="text"
        id="cardNumber"
        placeholder="Enter card number"
        className='w-full px-3 py-2 border rounded'
      />
    </div>

    <div>
      <label htmlFor="cardHolder" className='block text-gray-700'>Card Holder Name</label>
      <input
        type="text"
        id="cardHolder"
        placeholder="Enter name on card"
        className='w-full px-3 py-2 border rounded'
      />
    </div>

    <div>
      <label htmlFor="expiry" className='block text-gray-700'>Expire Date</label>
      <input
        type="text"
        id="expiry"
        placeholder="MM/YY"
        className='w-full px-3 py-2 border rounded'
      />
    </div>
  </div>
)}

              </div>
            )}
            <p className='text-sm mt-2 text-gray-600'>
              Selected: <span className='font-semibold uppercase'>{paymentMethod}</span>
            </p>
          </div>
        </div>

        {/* Placeholder for Order Summary */}
       <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border">
  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
  <div className="space-y-4">
    {cart.products.map((product) => (
      <div key={product.id} className="flex justify-between">
        <div className="flex items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-contain rounded"
          />
          <div className="ml-4">
            <h4 className="text-md font-semibold">{product.name}</h4>
            <p className="text-gray-600">
              ${product.price} x {product.quantity}
            </p>
          </div>
        </div>
        <div className="text-gray-800">
          ${product.price * product.quantity}
        </div>
      </div>
    ))}
  </div>

  <div className="mt-4 border-t pt-4">
    <div className="flex justify-between">
      <span>Total Price:</span>
      <span className="font-semibold">
        ${cart.totalPrice.toFixed(2)}
      </span>
    </div>
  </div>

  <button className="w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800" onClick={handleOrder}>
    Place Order
  </button>
</div>

      </div>
    </div>
  );
};

export default Checkout;
