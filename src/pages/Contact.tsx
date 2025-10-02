import { useState } from 'react';
import axios from 'axios';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const url = 'http://localhost:5000/api/create'; 
      await axios.post(url, formData, { headers: { 'Content-Type': 'application/json' } });

      setSuccessMsg('Message sent. Thank you!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      let serverMsg = '';
      if (axios.isAxiosError(err)) {
        serverMsg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message;
      }
      setErrorMsg(serverMsg || 'Failed to send message. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-slate-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-10">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info + Map */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Get in touch</h2>
            <p className="mb-1">📍 Kigali, Rwanda</p>
            <p className="mb-1">📞 +256 783020971</p>
            <p className="mb-4">✉️ kbusije@gmail.com</p>
          </div>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99517.55815886513!2d30.142643699999997!3d-2.01636135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca869eaf9a351%3A0x1bce7ea69ee733ab!2sKicukiro%2C%20Kigali!5e1!3m2!1sen!2srw!4v1758836967096!5m2!1sen!2srw"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg shadow"
            />
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 space-y-4"
        >
          {successMsg && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded">{successMsg}</div>
          )}
          {errorMsg && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded">{errorMsg}</div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-slate-600 rounded p-2 bg-white dark:bg-slate-700 text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-slate-600 rounded p-2 bg-white dark:bg-slate-700 text-sm"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-slate-600 rounded p-2 bg-white dark:bg-slate-700 text-sm"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-slate-600 rounded p-2 bg-white dark:bg-slate-700 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
