import { Navbar } from '@/components/navbar';
import ContactForm from '../../components/contact-form';

const ContactPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="px-3 lg:px-14 mx-auto max-w-4xl">
        <ContactForm />
      </main>
    </div>
  );
}

export default ContactPage;