import React from 'react'
import './style.scss'
import PartsForm from './addparts'
import ProductTable from './ProductTable'

const Setting = () => {
  return (
      <div className='mainSetting'>
      <PartsForm />
      <div className='productTable'>
        <ProductTable/>
      </div>
    </div>
  )
}

export default Setting