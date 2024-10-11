'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './contact-form.module.css';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Feedback enviado.');
        setFormData({ name: '', email: '', subject: '', message: '' }); 
      } else {
        toast.error('Error al enviar feedback.');
      }
    } catch (error) {
      toast.error('Error al enviar feedback.');
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <label htmlFor="name" className="text-white">Nombre</label>
      <input type="text" id="name" name="name" placeholder="Ingresar nombre" value={formData.name} onChange={handleChange} required />

      <label htmlFor="email" className="text-white">Digita tu email</label>
      <input type="email" id="email" name="email" placeholder="Ingresar email" value={formData.email} onChange={handleChange} required />

      <label htmlFor="subject" className="text-white">Asunto</label>
      <input type="text" id="subject" name="subject" placeholder="Ingresar asunto" value={formData.subject} onChange={handleChange} required />

      <label htmlFor="message" className="text-white">Mensaje</label>
      <textarea id="message" name="message" placeholder="Ingresar mensaje" value={formData.message} onChange={handleChange} required />

      <button type="submit" className='mt-3'>Enviar</button>
    </form>
  );
}

export default ContactForm;
