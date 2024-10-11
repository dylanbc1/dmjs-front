'use client';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          margin: '10px',
          padding: '10px',
          minWidth: '250px',
          borderRadius: '5px',
          color: '#1c1c3c',
          border: '1px solid #707070'
        },
      }}
    />
  );
};
