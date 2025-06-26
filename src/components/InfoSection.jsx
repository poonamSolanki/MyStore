import React from 'react'
import { FaHeadset, FaMoneyBillWave, FaShippingFast , FaLock, FaTag} from 'react-icons/fa'

const InfoSection = () => {
    const infoItems = [
        {
            icon: <FaShippingFast className='text-2xl text-red-500' />,
            title: 'Free Shipping',
            description: 'Get your orders delivered with no extra cost',
        },
        {
            icon: <FaHeadset className='text-2xl text-red-500' />,
            title: '24/7 Support',
            description: 'We are here to help you anytime, anywhere',
        },
        {
            icon: <FaMoneyBillWave className='text-2xl text-red-500' />,
            title: 'Easy Returns',
            description: 'Hassle-free returns within 30 days of purchase',
        },
        {
            icon: <FaLock className='text-2xl text-red-500' />,
            title: 'Secure Payment',
            description: 'Your payment information is safe with us',
        },
        {
            icon: <FaTag className='text-2xl text-red-500' />,
            title: 'Exclusive Offers',
            description: 'Sign up for exclusive deals and discounts',
        },
    ];
  return (
    <div className='bg-white pb-8 pt-12'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
         {infoItems.map((item, index) => (
        <div key={index} className='flex flex-col items-center text-center p-4 border rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer'>
            {item.icon}
            <h3 className='mt-4 text-xl font-semibold'>{item.title}</h3>
            <p className='mt-2  text-gray-600'>{item.description}</p>
        </div>
        ))}
      </div>
    </div>
  )
}

export default InfoSection
