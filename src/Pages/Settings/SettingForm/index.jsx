import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button,Container,Grid,Typography } from '@mui/material';
import Switch from '../../../Components/Common/Switch/Switch';
import Select from 'react-select';
import './Style.scss'; // Import your SCSS file

const options = [
    { value: "Gold", label: "Gold" },
    { value: "Silver", label: "Silver" },
    { value: "Platinum", label: "Platinum" },
  ];
const SettingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    currency: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notification: 'Off', // Initialize notification as 'Off'
  });
  const defaultValue = options[0];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic here
    console.log('Form submitted:', formData);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };
  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="Settings" content="This is a Settings page" />
      </Helmet>
      <div className="settingMainDiv">
        
        <p className="p1">Language</p>
        <div className="englishAndArabic">
          <button>English</button>
          <button>عربي</button>
          
        </div>
        
        <div className='formDive'>
       
        <Grid container spacing={6} >
          

          <Grid item md={12} lg={7} className='gridSize'>
            <div>
            <div>
            <p className="sectionHeading">Edit Profile</p>
            </div>
            
            <div className="formSection2">
              <div className="formContent">
            
                <div className="field">
            <p className="p3">Your Name</p>
            <input type="text" placeholder="Name" />
          </div>
        
              
         <div className="selectDivSetting">
            <p className="p3">Location</p>
            <Select
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="select"
              defaultValue={defaultValue}
            />
          </div>
                
                <div className="selectDivSetting">
            <p className="p3">Currency</p>
            <Select
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="select"
              defaultValue={defaultValue}
            />
          </div>
                
                <div className="field">
            <p className="p3">Email</p>
            <input type="Email" placeholder="Email" />
          </div>
                
                <div className="field">
            <p className="p3">Your Phone Number</p>
            <input type="text" placeholder="Phone" />
          </div>
                
                <div className="field">
            <p className="p3">Your Address</p>
            <input type="text" placeholder="Address" />
          </div>
              </div>
            </div>                        
            </div>

          </Grid>
        
            
          {/* Change Password */}
        

          <Grid item md={12} lg={5} >
          <p className="sectionHeading">Change Password</p>
            <div className="formSection3">
            
              <div className="formContent">
                {/* Current Password */} 
                <div className="field">
                <p className="p3">Current Password</p>
                  <input type="text" placeholder="Current Password" />
                </div>
                {/* New Password */}
                <div className="field">
                <p className="p3">New Password</p>
                  <input type="text" placeholder="New Password" />
                </div>
                {/* Confirm Password */}
                <div className="field">
                <p className="p3">Confirm Password</p>
                  <input type="text" placeholder="Confirm Password" />
                </div>
              </div>
            </div>
            <div>
            <p className="sectionHeading">Notification</p>
            <div className="formSection4">
       
        <div className="formContent2">
          <div className='notification'>
          <Grid>
 
 <div className='div1'>
  <p className='p1'>Enable Desktop Notification</p>
  <div className='insideDiv1'>
  <p className='p2'> Receive notification all of the messages,contacts etc</p>
  <Switch/>

  </div>


 </div>
 <div className='div1'>
  <p className='p1'>Enable Unread Notification Badge</p>
  <div className='insideDiv1'>
  <p className='p2'>Shows a red badge on the app icon</p>
  <Switch/>

  </div>


 </div>
 <div className='div1'>
  <p className='p1'> Announcement & Update</p>
  <div className='insideDiv1'>
  <p className='p2'>Receive emails about products updates etc</p>
  <Switch/>

  </div>


 </div>
 <div className='div1'>
  <p className='p1'> Disabled All Notification Sounds</p>
  <div className='insideDiv1'>
  <p className='p2'>  Mute all notification of the messages etc </p>
  <Switch/>

  </div>


 </div>
  
</Grid>
      
                </div>
                 </div>
                   </div>
            </div>
          </Grid>
       

          {/* Notification */}
 
   
  </Grid>

        {/* Single Submit Button for All Fields */}
        <div className='endDiv'>
        <button className='submitButton'>Submit</button>
        </div>
        </div>  
    </div>   
    </div>
     
  );
};

export default SettingForm;
