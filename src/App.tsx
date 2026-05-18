import { useEffect, useState } from 'react';

declare const chrome: any;

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['profile'], (result: any) => {
      if (result.profile) {
        setName(result.profile.name || '');
        setEmail(result.profile.email || '');
      }
    });
  }, []);

  const saveProfile = () => {
    chrome.storage.local.set({
      profile: {
        name,
        email
      }
    });

    alert('Profile Saved!');
  };

  return (
    <div
      style={{
        width: '300px',
        padding: '20px',
        fontFamily: 'Arial'
      }}
    >
      <h1>AI Job Autofill</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: '100%',
          marginBottom: '10px',
          padding: '8px'
        }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: '100%',
          marginBottom: '10px',
          padding: '8px'
        }}
      />

      <button
        onClick={saveProfile}
        style={{
          width: '100%',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        Save Profile
      </button>
    </div>
  );
}

export default App;