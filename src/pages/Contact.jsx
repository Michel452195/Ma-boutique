import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = '24382122119'; // ton numéro WhatsApp
    const textMessage = `Bonjour, je m'appelle ${form.name} (${form.email}) : ${form.message}`;
    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');

    // Réinitialiser le formulaire
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container">
      <h1>Contactez-nous</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card">
          <div className="card-content">
            <p style={{ marginBottom: '30px', textAlign: 'center' }}>
              Vous avez une question ? N'hésitez pas à nous contacter. Notre équipe vous répondra rapidement via WhatsApp.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>Envoyer via WhatsApp</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
