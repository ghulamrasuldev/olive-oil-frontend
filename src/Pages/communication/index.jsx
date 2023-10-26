import React from "react";
import "./Style.scss";
import NewM from "../../assets/icons/newMessage.png";
import VideoC from "../../assets/icons/videocall.png";
import AudioC from "../../assets/icons/audioCall.png";
import Profile from "../../assets/icons/profileN.png";
import Send from "../../assets/icons/send.png";
import Whatsp from "../../assets/icons/whtsap.png";
import Email from "../../assets/icons/email.png";
import TextM from "../../assets/icons/textM.png";
import { RiArrowDownSLine } from "react-icons/ri";
const Communication = () => {
  return (
    <div className="messageMain">
      <p className="p1">Messaging And Comunication</p>
      <div className="communicationDiv">
        <div className="memmbers">
          <p className="p2">Your Message</p>
          <div className="recentPeople">
            <div className="colorDiv"></div>
            <p>Recent People</p>
            {/* <img src={Arrow} alt="Arrow" height={10} /> */}
            <RiArrowDownSLine size={20} />
          </div>
          <div className="peoples">
            <p>Huraira</p>
            <p>Hamza</p>
            <p>Ismat</p>
            <p>Ishtiaq</p>
            <p>Huraira</p>
          </div>
          <div className="groupChat">
            <div className="colorDiv"></div>
            <p>Group Chats</p>
            {/* <img src={Arrow} alt="Arrow" height={10} /> */}
            <RiArrowDownSLine size={20} />
          </div>
          <div className="peoplesGroup">
            <p>Huraira,Hamza</p>
            <p>Huraira,Hamza</p>
            <p>Huraira,Hamza</p>
            <p>Huraira,Hamza</p>
            <p>Huraira,Hamza</p>
          </div>
          <div className="newMessage">
            <img src={NewM} alt="newMessage" height={20} />
            <p>New Message</p>
          </div>
        </div>
        <div className="chat">
          <div className="div1">
            <div className="insideDiv1">
              <p>Huraira</p>
              <div className="activeDiv"></div>
            </div>
            <div className="callDiv">
              <img src={VideoC} alt="VideoCall" />
              <img src={AudioC} alt="AudioCall" />
            </div>
          </div>
          <div className="messageAndprofile">
            <div className="message">
              <div className="message1">
                <img src={Profile} alt="profile" />
                <div className="mainMessage">
                  <div className="nameDate">
                    <p>Huraira</p>
                    <p className="date">11:12 pm</p>
                  </div>
                  <p className="textMessage">I have some thing to show you.</p>
                </div>
              </div>
              <div className="message1">
                <img src={Profile} alt="profile" />
                <div className="mainMessage">
                  <div className="nameDate">
                    <p>Huraira</p>
                    <p className="date">11:12 pm</p>
                  </div>
                  <p className="textMessage">I have some thing to show you.</p>
                </div>
              </div>
              <div className="message1">
                <img src={Profile} alt="profile" />
                <div className="mainMessage">
                  <div className="nameDate">
                    <p>Huraira</p>
                    <p className="date">11:12 pm</p>
                  </div>
                  <p className="textMessage">I have some thing to show you.</p>
                </div>
              </div>
              <div className="message1">
                <img src={Profile} alt="profile" />
                <div className="mainMessage">
                  <div className="nameDate">
                    <p>Huraira</p>
                    <p className="date">11:12 pm</p>
                  </div>
                  <p className="textMessage">I have some thing to show you.</p>
                </div>
              </div>
              <div className="message1">
                <img src={Profile} alt="profile" />
                <div className="mainMessage">
                  <div className="nameDate">
                    <p>Huraira</p>
                    <p className="date">11:12 pm</p>
                  </div>
                  <p className="textMessage">I have some thing to show you.</p>
                </div>
              </div>
              <div className="textArea">
                <textarea placeholder="Type New Message" rows={5} />
                <div className="sendDiv">
                  <img src={Send} alt="send" height={20} />
                </div>
              </div>
            </div>
            <div className="profile">
              <div className="imgDiv">
                <img src={Profile} alt="profile" className="proImg"/>
                <div className="activeDiv">
                  <div className="colorDiv"></div>
                  <p>active</p>
                </div>
                <div className="contact">
                  <div className="imgDivC">
                    <img src={TextM} alt="text" />
                  </div>
                  <div className="imgDivC">
                    <img src={Email} alt="email" />
                  </div>
                  <div className="imgDivC">
                    <img src={Whatsp} alt="whatsap" />
                  </div>
                </div>
              </div>
              <div className="info">
                <div className="infoDiv">
                  <p className="key">Position</p>
                  <p className="value">Assistant</p>
                  </div>
                <div className="infoDiv">
                  <p className="key">Email</p>
                  <p className="value">Sample23@gmail.com</p>
                  </div>
                <div className="infoDiv">
                  <p className="key">Phone</p>
                  <p className="value">N/A</p>
                  </div>
                <div className="infoDiv">
                  <p className="key">Local Time</p>
                  <p className="value">11:58 pm</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
