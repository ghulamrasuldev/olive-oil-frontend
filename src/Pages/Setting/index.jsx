import React, { useEffect } from 'react'
import './style.scss'
import PartsForm from './addparts'
import ProductTable from './ProductTable'
import ProductionLines from './ProductionLine'
import ProductionLineTable from './ProductionLineTable'
import { Fade } from 'react-awesome-reveal'


const Setting = () => {
  
  return (
      <div className='mainSetting'>
      <div className='btnDiv'>
      <PartsForm /> 
      <ProductionLines/>
      </div>
        <p className='pt'>Product Table</p>
      <div className='productTable'>
        <ProductTable/>
      </div>
      <Fade>
        <p className='pt'>Production Lines Table</p>
      <div className='productTable'>
        <ProductionLineTable/>
      </div>
      </Fade>
    </div>
  )
}

export default Setting