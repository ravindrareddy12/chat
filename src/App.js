import React, { useState } from 'react';
import './App.css';

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Ravindra Reddy', message: 'Hello, how are you?' },
    { id: 2, sender: 'priyanka', message: 'I am doing great!' },
    { id: 3, sender: 'mouniksa', message: 'I am doing great!' },
    { id: 4, sender: 'Haribabu', message: 'I am doing great!' },
    { id: 5, sender: 'siddu', message: 'I am doing great!' },
    { id: 6, sender: 'naveen', message: 'I am doing great!' },
    { id: 7, sender: 'Jane Smith', message: 'I am doing great!' },

    
    // Add more chat messages here
  ]);
  const [searchInput, setSearchInput] = useState('');

  const chatPersons = [
    { id: 1, name: 'Ravindra Reddy', profileIcon: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80', active: true },
    // Add more chat persons here
    { id: 2, name: 'priyanka', profileIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXg9k5fHy--R9x2Q8cuvxeQ8TriABt_HJGUQ&usqp=CAU', active: true },
    { id: 3, name: 'mouniksa', profileIcon: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80', active: false },
    { id: 4, name: 'Haribabu', profileIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICSVq9-BAcWmscgA5pQyPPxdeJGu6p6w-0Q&usqp=CAU', active: true },
    { id: 5, name: 'siddu', profileIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdI33HYMP2TxYNciaUSPdWsXiHMLtl2JOwEQ&usqp=CAU', active: false },
    { id: 6, name: 'naveen',   profileIcon: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80', active: true },
    { id: 7, name: 'Jane Smith', profileIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu6Ur2YSrHsYLbQhFX0Lmx4VnQPKkrqSAHQw&usqp=CAU', active: false },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
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
            className='serch'
          />
        </div>
        <div className='con-heading'>
          <h3>
            CONVERSATIONS  <span className='plus-symbol'><i class="fa-regular fa-circle-plus"></i></span>
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
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={handleInputChange}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <div className="no-user-selected">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
