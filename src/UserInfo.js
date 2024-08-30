// UserInfo.js
import React from 'react';

function UserInfo({ showUserForm, setShowUserForm, name, email, setName, setEmail, handleSubmitUserForm, submitted }) {
  const handleUserIconClick = () => {
    setShowUserForm(!showUserForm);
  };

  return (
    <div style={{ position: 'absolute', top: '5px', left: '10px', padding: '10px' }}>
      <i
        className="fas fa-user fa-2x"
        style={{ cursor: 'pointer' }}
        onClick={handleUserIconClick}
      ></i>
      {submitted && (
        <div style={{ marginTop: '10px' }}>
          <p><strong>Username:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      )}
      {showUserForm && !submitted && (
        <form onSubmit={handleSubmitUserForm} style={{ marginTop: '10px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control mt-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default UserInfo;
