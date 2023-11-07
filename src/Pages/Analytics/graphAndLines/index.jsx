import React from 'react'
import ProductionGraph from '../../../Components/Common/ProductionGraphs'
import Lines from './ProductionLineGraph/index'


const GraphAndLines = () => {
  return (
      <div style={{width:'70%'}}>
      {/* <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}> */}
      <ProductionGraph />
      
          <Lines/>
    </div>
  )
}

export default GraphAndLines