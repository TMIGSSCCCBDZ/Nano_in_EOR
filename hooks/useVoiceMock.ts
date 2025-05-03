
import { useState } from 'react';

type Status = {
  value: 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';
  message?: string;
};

export const useVoiceMock = () => {
  const [status, setStatus] = useState<Status>({ value: 'idle' });

  const connect = async () => {
    setStatus({ value: 'connecting' });
    
    // Simulate connection delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setStatus({ value: 'connected' });
        resolve();
      }, 1500);
    });
  };

  const disconnect = async () => {
    setStatus({ value: 'disconnected' });
    return Promise.resolve();
  };

  return {
    status,
    connect,
    disconnect,
  };
};