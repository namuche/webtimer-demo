// src/App.jsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import QRCode from 'qrcode.react';

// 🔢 Replace with your Supabase project details
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function App() {
  const [user, setUser] = useState(null);
  const [timers, setTimers] = useState([]);
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState(5);
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    checkUser();
    getTimers();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getSession();
    if (data.session) setUser(data.session.user);
    else window.location.href = '/auth.html';
  }

  async function getTimers() {
    const { data, error } = await supabase
      .from('timers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading timers:', error);
    } else {
      setTimers(data);
    }
  }

  async function createTimer() {
    if (!name || !startTime) {
      alert('Please fill name and start time');
      return;
    }

    const start = new Date(startTime).toISOString();
    const durationSec = parseInt(minutes) * 60;
    const end = new Date(new Date(start).getTime() + durationSec * 1000).toISOString();

    const { data, error } = await supabase
      .from('timers')
      .insert([
        {
          user_id: user.id,
          name,
          duration_sec: durationSec,
          start_time: start,
          end_time: end,
        },
      ])
      .select();

    if (error) {
      alert('Error: ' + error.message);
    } else {
      setTimers([data[0], ...timers]);
      setName('');
      setMinutes(5);
      setStartTime('');
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>⏱️ WebTimer</h1>
      <p><strong>User:</strong> {user?.email}</p>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = '/auth.html';
        }}
        style={{
          background: '#ccc',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Logout
      </button>

      <h2>Create Timer</h2>
      <div style={{ marginBottom: '15px' }}>
        <input
          placeholder="Timer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          style={inputStyle}
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={inputStyle}
        />
        <button onClick={createTimer} style={btnStyle}>
          Create Timer
        </button>
      </div>

      <h2>Your Timers</h2>
      {timers.length === 0 ? (
        <p>No timers yet. Create one above!</p>
      ) : (
        timers.map((t) => {
          const publicUrl = `https://webtimer-demo.vercel.app/t/${t.id}`;
          return (
            <div key={t.id} style={cardStyle}>
              <h3>{t.name}</h3>
              <p>
                <strong>Start:</strong> {new Date(t.start_time).toLocaleString()}<br />
                <strong>Duration:</strong> {Math.floor(t.duration_sec / 60)} min
              </p>
              <a href={`/t/${t.id}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Open Timer
              </a>
              <div style={{ marginTop: '10px' }}>
                <QRCode value={publicUrl} size={100} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

const inputStyle = {
  display: 'block',
  margin: '8px 0',
  padding: '10px',
  width: '100%',
  boxSizing: 'border-box',
};

const btnStyle = {
  background: '#0055ff',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  cursor: 'pointer',
  fontSize: '16px',
};

const cardStyle = {
  border: '1px solid #ddd',
  padding: '15px',
  margin: '15px 0',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const linkStyle = {
  color: '#0055ff',
  textDecoration: 'underline',
};


export default App;
