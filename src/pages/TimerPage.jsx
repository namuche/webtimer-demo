// src/pages/TimerPage.jsx
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function TimerPage() {
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerId = window.location.pathname.split('/')[2];

  useEffect(() => {
    loadTimer();
    const interval = setInterval(loadTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  async function loadTimer() {
    const { data, error } = await supabase
      .from('timers')
      .select('*')
      .eq('id', timerId)
      .single();

    if (error) {
      console.error('Timer not found:', error.message);
      setTimer(null);
      return;
    }

    setTimer(data);
    const now = new Date();
    const end = new Date(data.end_time);
    const diffSec = Math.max(0, Math.floor((end - now) / 1000));
    setTimeLeft(diffSec);
  }

  if (!timer) return <div style={loadingStyle}>Loading timer...</div>;

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  const display = `${mins}:${secs}`;

  let bg = '#000';
  if (timeLeft > 60) bg = '#00aa00';
  else if (timeLeft > 10) bg = '#aaaa00';
  else bg = '#aa0000';

  return (
    <div style={{
      background: bg,
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20vmin',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
    }}>
      {display}
      <div style={{
        fontSize: '24px',
        position: 'absolute',
        top: '20px',
        opacity: 0.9,
      }}>
        {timer.name}
      </div>
    </div>
  );
}

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  fontFamily: 'Arial',
  fontSize: '18px',
};