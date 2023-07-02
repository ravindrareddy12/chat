import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import './App.css';

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Alan', message: 'Hello, how are you?' },
    { id: 2, sender: 'Bob', message: 'I am doing great!' },
    { id: 3, sender: 'Carol', message: 'I am doing great!' },
    { id: 4, sender: 'Dean', message: 'I am doing great!' },
    { id: 5, sender: 'Elin', message: 'I am doing great!' },
    { id: 6, sender: 'naveen', message: 'I am doing great!' },
    { id: 7, sender: 'Jane Smith', message: 'I am doing great!' },
  ]);
  const [searchInput, setSearchInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  const chatPersons = [
    { id: 1, name: 'Alan', profileIcon: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80', active: true },
    { id: 2, name: 'Bob', profileIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXg9k5fHy--R9x2Q8cuvxeQ8TriABt_HJGUQ&usqp=CAU', active: true },
    { id: 3, name: 'Carol', profileIcon: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80', active: false },
    { id: 4, name: 'Dean', profileIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICSVq9-BAcWmscgA5pQyPPxdeJGu6p6w-0Q&usqp=CAU', active: true },
    { id: 5, name: 'Elin', profileIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdI33HYMP2TxYNciaUSPdWsXiHMLtl2JOwEQ&usqp=CAU', active: false },
    { id: 6, name: 'naveen',   profileIcon: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80', active: true },
    { id: 7, name: 'Jane Smith', profileIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu6Ur2YSrHsYLbQhFX0Lmx4VnQPKkrqSAHQw&usqp=CAU', active: false },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setMessageInput(inputValue);
    if (inputValue.endsWith('@')) {
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }
  };


  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        sender: selectedUser.name,
        message: messageInput.trim(),
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput('');
    }
  };

  const handleEmojiSelect = (emoji) => {
    console.log(emoji.native)
    setMessageInput((prevInput) => prevInput + emoji.native);
  };

  const filteredChatPersons = chatPersons.filter((person) =>
    person.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="chat-app">
      <div className="left-panel" style={{ width: '25%' }}>
        <div className="search-box" style={{ width: '100%', height: '80px' }}>
          <input
            type="text"
            placeholder="Search For Friends"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="serch"
          />
        </div>
        <div className='con-heading'>
          <h3>
            CONVERSATIONS  <span className='plus-symbol'><i className="fa-regular fa-circle-plus"></i></span>
          </h3>
        </div>
        <div className="chat-persons">
          {filteredChatPersons.map((person) => (
            <div
              key={person.id}
              className={`chat-person ${selectedUser === person ? 'active' : ''}`}
              onClick={() => handleUserClick(person)}
            >
              <img src={person.profileIcon} alt="Profile Icon" />
              <div className="person-info">
                <span className="person-name">{person.name}</span>
                {person.active && <span className="active-status">Active</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right-panel">
        {selectedUser ? (
          <div className="chat-window">
            <div className="selected-user-info">
              <img src={selectedUser.profileIcon} alt="Profile Icon" />
              <span className="person-name">{selectedUser.name}</span>
              {selectedUser.active && <span className="active-status">Active</span>}
            </div>
            <div className="chat-messages">
              {chatMessages.map((message) => (
                <div key={message.id} className="message">
                  <span className="sender">{message.sender}:</span> {message.message}
                </div>
              ))}
            </div>
            {showUserList && (
                <div className="user-list">
                  {filteredChatPersons.map((person) => (
                    <div key={person.id} className="user-list-item" onClick={() => handleUserClick(person)}>
                      {person.name}
                    </div>
                  ))}
                </div>
              )}
            <div className="chat-input">
              <div className="input-container">
                <input
                  className="input-box"
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={handleInputChange}
                />
                <button className="emoji-btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  😀
                </button>
                {showEmojiPicker && (
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              )}
              </div>
              
              <button className="send-btn" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="no-user-selected">Select a user to start the conversation</div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
