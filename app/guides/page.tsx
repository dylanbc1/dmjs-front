'use client'
import { Navbar } from '@/components/navbar';
import FAQCard from '../../components/FAQ-card';
import { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import { CardTitle } from '@/components/ui/card';

const faqs = [
  {
    question: "¿Qué componentes necesito para armar un computador?",
    answer: "Para armar un computador, necesitas una placa madre, CPU, RAM, almacenamiento (HDD/SSD), fuente de poder, tarjeta gráfica (opcional dependiendo del uso), y un gabinete."
  },
  {
    question: "¿Qué es mejor, un HDD o un SSD?",
    answer: "Un SSD es generalmente mejor que un HDD porque es más rápido y más eficiente energéticamente. Sin embargo, los HDDs suelen ser más baratos y ofrecen mayor capacidad de almacenamiento por menor precio."
  },
  {
    question: "¿Cuánta memoria RAM debería tener mi computador?",
    answer: "Para la mayoría de los usos generales, 8 GB de RAM es suficiente. Para gaming y tareas más intensivas como edición de video, se recomiendan 16 GB o más."
  },
  {
    question: "¿Qué tarjeta gráfica es recomendable en 2024?",
    answer: "Para 2024, las tarjetas gráficas de la serie NVIDIA RTX 40 y las AMD Radeon RX 7000 son opciones recomendables, dependiendo de tu presupuesto y necesidades específicas."
  },
  {
    question: "¿Qué procesador es mejor para gaming?",
    answer: "Para gaming, los procesadores Intel Core i5/i7 de la 12ª o 13ª generación, y los AMD Ryzen 5/7 de la serie 5000 o 6000, son excelentes opciones."
  },
  {
    question: "¿Qué fuentes de poder son confiables?",
    answer: "Las fuentes de poder de marcas como Corsair, EVGA y Seasonic son conocidas por su confiabilidad y calidad. Asegúrate de elegir una con certificación 80 PLUS."
  },
  {
    question: "¿Qué monitor es recomendable para juegos?",
    answer: "Un monitor con una alta tasa de refresco (al menos 144 Hz) y un bajo tiempo de respuesta (1 ms) es ideal para juegos. Marcas como ASUS, Acer y Dell ofrecen buenas opciones."
  }
];

const FAQPage: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string; }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");

      try {
        const response = await axios.post(`/api/chatbot`, { message: input });
        const botMessage = response.data.choices[0].message.content;

        setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
      } catch (error) {
        console.error("Error al conectar con la API", error);
        setMessages([...newMessages, { text: "Error al conectar con la API", sender: "bot" }]);
      }
    }
  };

  return (
    <div className="">
      <CardTitle className='text-4xl font-bold text-center text-white'>Guías</CardTitle>
      <div className="container relative z-10 flex-grow flex justify-center items-center">
        <div className="faq-page">
          <div className="use-dmajorai">
            <h2 className='font-bold'>Usa DMAJORAI</h2>
            <p>Conoce a DMaJor AI, nuestro modelo de inteligencia artifical. Si no sabes qué se adecua a tus necesidades siéntete libre de chatear con nuestra asesora personalizada. ¡Haz todas las preguntas que necesites!</p>
          </div>
          <h2 className='font-bold'>Preguntas Frecuentes</h2>
          {faqs.map((faq, index) => (
            <FAQCard key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <div className="chatbot">
          <h1 className='font-bold m-4'>Chatea con DMAJORAI</h1>
          <div className="chat-window">
          {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`} dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
            ))}
          </div>
          <div className="chat-input flex flex-wrap gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
          <p className="powered-by">Powered by Infermatic</p>
        </div>
      </div>

      <style jsx>{`
        .relative {
          position: relative;
          z-index: 1; 
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          max-width: 1200px;
          margin: 40px auto 0 auto;
          padding: 20px;
          color: white;
        }
        .faq-page {
          flex: 1;
          margin-right: 20px;
        }
        .chatbot {
          flex: 1;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          height: 800px; 
          background-color: rgba(28, 28, 59, 0.8); 
        }
        .chat-window {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
        .chat-input {
          display: flex;
          padding: 10px;
          background-color: rgba(28, 28, 59, 0.5);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
        }
        .chat-input input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 5px;
          margin-right: 10px;
          background-color: rgba(28, 28, 59);
          color: #fff;
        }
        .chat-input button {
          padding: 10px 20px;
          border: 1px solid white;
          background-color: #1c1c3c; 
          color: white;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .chat-input button:hover {
          background-color: #14142c; 
        }
        .message {
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 5px;
          color: #fff;
        }
        .message.bot {
          background-color: transparent;
          text-align: left;
          border-color: #fff
        }
        .message.user {
          text-align: right;
          background-color: #CECECE;
          opacity: .9;
          color: #1c1c3c;
          border-color: #1c1c3c;
        }
        .powered-by {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem; 
          text-align: center;
          margin-bottom: 10px;
        }
        .guia-title {
          text-align: center;
          color: #fff;
        }
          .font-bold {
          font-size: 1.5rem;
      }
        .use-dmajorai {
          text-align: left;
          font-size: 1.5rem;
          margin-bottom: 50px;
        }

        .use-dmajorai p {
          font-size: 1rem;
        }

        h2 {
          text-align: center;
          margin-bottom: 10px;
          color: #fff;
        }
          
         @media (max-width: 768px) {
          .container {
            flex-direction: column;
            align-items: center;
          }
          .faq-page, .chatbot {
            width: 100%;
            margin: 10px 0;
          }
          .chat-window {
            min-height: 100px; 
            max-height: 400px;
          }

          .chat-input button {
            width: 100%;
          }

          .chat-input input {
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          .chat-input button {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQPage;