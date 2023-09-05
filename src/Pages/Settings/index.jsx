import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import "./Style.scss"
import  AccessControlTable  from './../Settings/Table/index'
import Employeetable from './Table/employeetable'
import Search from "../../assets/icons/search.png";
const Settings = () => {
    const [searchBar, setSearchBar] = useState();
  return (
    <div>
<Helmet>
    <title>Settings</title>
    <meta name="Settings" content="This is a Settings page" />
  </Helmet>
  <div>
 <div className="settingMain">
      <p className='p1'>Language</p>
       <div className='englishAndArabic'>  
        <button>English</button>
          <button>عربي</button>
            </div>
              <p className='p2'>Loyalty Program</p>
               <div className='cardDivs'>
                <div className='card'>
                   <p>Silver</p> {/* Update the key */}
                      </div>
                <div className='card'>
                  <p>Gold</p> {/* Update the key */}
            
                    <li>
                        discount
                    </li>
                
                </div>
                <div className='card'>
                 <p>Platinum</p> {/* Update the key */}
               </div>  
               
      </div> 
      <div className="accessControlDiv">
          <p className="p3">Access Control</p>
          <div className="accessBtn">
            <button>+ Add New</button>
            <div className="searchDiv">
              <img src={Search}  alt="search" height={20} />
              <input
                type="text"
                placeholder="search"
                onChange={(e) => setSearchBar(e.target.value)}
              />
            </div>
          </div>
        </div>  
        <div className="tableDiv">
          <div className="mainTable">
            <AccessControlTable searchVal={searchBar}/>
          </div>
        </div>
        <div className="accessControlDiv">
          <p className="p3">Access Control</p>
          <div className="accessBtn">
            <button>+ Add New</button>
            <div className="searchDiv">
              <img src={Search}  alt="search" height={20} />
              <input
                type="text"
                placeholder="search"
                onChange={(e) => setSearchBar(e.target.value)}
              />
            </div>
          </div>
        </div>  
        <div className="tableDiv">
          <div className="mainTable">
            <Employeetable searchVal={searchBar}/>
          </div>
        </div>

 </div>        
   </div>
  
 
</div>
  
    
  )
}

export default Settings