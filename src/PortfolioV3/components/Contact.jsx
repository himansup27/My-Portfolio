import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile } from '../data';

// --- How the form sends ---
// The form sends through EmailJS straight from the browser, so there is no
// backend: the message lands in your inbox and the visitor sees a real
// success or failure message.
//
// One-time setup (free plan is fine):
//   1. npm install @emailjs/browser
//   2. https://dashboard.emailjs.com -> Email Services -> Add New Service
//      (connect your Gmail). Copy its Service ID.
//   3. Email Templates -> Create New Template. Use these variables:
//        Subject:   Portfolio contact from {{from_name}}
//        Content:   {{message}}
//                   — {{from_name}} ({{from_email}})
//        To Email:  your own address (himansu72001@gmail.com)
//        Reply To:  {{from_email}}      <- so "Reply" goes to the visitor
//      Copy the Template ID.
//   4. Account -> General -> Public Key. Copy it.
//   5. Paste the three values below.
//
// The public key is designed to be exposed in frontend code; it can only
// send through your own template. In the EmailJS dashboard, under
// Account -> Security, restrict it to your site's domain.
//
// Until the three values are filled in, the form falls back to opening the
// visitor's email app with a pre-filled draft (mailto:), so it never breaks.
const EMAILJS_SERVICE_ID = 'service_llh9sjh';
const EMAILJS_TEMPLATE_ID = 'template_lsecdjb';
const EMAILJS_PUBLIC_KEY = 'iCmajpQutj6gGOg0c';

const isConfigured = ![EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY].some(
  (v) => !v || v.startsWith('YOUR_')
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: '', email: '', message: '' };

export const buildMailto = ({ name, email, message }, to = profile.email) => {
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  return `mailto:${to}?subject=${subject}&body=${body}`;
};

const validate = ({ name, email, message }) => ({
  name: name.trim().length === 0,
  email: !EMAIL_RE.test(email.trim()),
  message: message.trim().length === 0
});

const Contact = () => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // idle | sending | mailto | sent | error
  const [status, setStatus] = useState('idle');
  const fieldRefs = useRef({});
  const honeypotRef = useRef(null);

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((er) => (er[field] ? { ...er, [field]: false } : er));
    // an old status message is stale once they start editing again
    setStatus((s) => (s === 'mailto' || s === 'sent' || s === 'error' ? 'idle' : s));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Spam bots fill every input, including the hidden one. Pretend it
    // worked and send nothing.
    if (honeypotRef.current && honeypotRef.current.value) {
      setValues(EMPTY);
      setStatus('sent');
      return;
    }

    const found = validate(values);
    setErrors(found);
    const firstBad = ['name', 'email', 'message'].find((f) => found[f]);
    if (firstBad) {
      fieldRefs.current[firstBad]?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim()
    };

    if (!isConfigured) {
      // EmailJS not set up yet: open the visitor's email app instead.
      // Deliberately NOT clearing the form, so nothing typed is lost.
      window.location.href = buildMailto(payload);
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      // The keys here must match the {{variables}} in your EmailJS template.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: payload.name,
          from_email: payload.email,
          reply_to: payload.email,
          message: payload.message
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setValues(EMPTY);
      setStatus('sent');
    } catch (err) {
      // EmailJS rejects with { status, text }; keep it in the console so
      // a wrong Service/Template ID or a blocked domain is easy to spot.
      console.error('EmailJS send failed:', err);
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <section className="contact" id="contact">
      <div className="contact-grid">
        <div className="contact-head">
          <div className="eyebrow"><span className="dot" />CONTACT</div>
          <h2>Got something worth building?</h2>
          <p>Open to fullstack roles and freelance work. Fill in the form, or reach out directly below.</p>
          <div className="contact-quicklinks">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn →</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot: invisible to people, tempting to bots. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            ref={honeypotRef}
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />

          <div className={`form-row${errors.name ? ' error' : ''}`}>
            <label htmlFor="pv3-cf-name">Name</label>
            <input
              id="pv3-cf-name"
              type="text"
              name="name"
              placeholder="Your name"
              autoComplete="name"
              value={values.name}
              onChange={handleChange('name')}
              ref={(el) => { fieldRefs.current.name = el; }}
              aria-invalid={!!errors.name}
              aria-describedby="pv3-cf-name-err"
            />
            <div className="form-error-msg" id="pv3-cf-name-err">Please enter your name.</div>
          </div>

          <div className={`form-row${errors.email ? ' error' : ''}`}>
            <label htmlFor="pv3-cf-email">Email</label>
            <input
              id="pv3-cf-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={values.email}
              onChange={handleChange('email')}
              ref={(el) => { fieldRefs.current.email = el; }}
              aria-invalid={!!errors.email}
              aria-describedby="pv3-cf-email-err"
            />
            <div className="form-error-msg" id="pv3-cf-email-err">Please enter a valid email address.</div>
          </div>

          <div className={`form-row${errors.message ? ' error' : ''}`}>
            <label htmlFor="pv3-cf-message">Message</label>
            <textarea
              id="pv3-cf-message"
              name="message"
              rows={5}
              placeholder="What are you building?"
              value={values.message}
              onChange={handleChange('message')}
              ref={(el) => { fieldRefs.current.message = el; }}
              aria-invalid={!!errors.message}
              aria-describedby="pv3-cf-message-err"
            />
            <div className="form-error-msg" id="pv3-cf-message-err">Please enter a message.</div>
          </div>

          <button type="submit" className={`form-submit${sending ? ' loading' : ''}`} disabled={sending}>
            <span className="spinner" />
            <span className="btn-label">{sending ? 'Sending...' : 'Send message'}</span>
          </button>

          <div role="status" aria-live="polite">
            {status === 'mailto' && (
              <div className="form-success show">
                <span>
                  ✓ Opening your email app with this message filled in. Nothing opened? Write to{' '}
                  <a href={`mailto:${profile.email}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{profile.email}</a>
                  {' '}directly — your message is still in the form.
                </span>
              </div>
            )}
            {status === 'sent' && (
              <div className="form-success show">✓ Thanks — your message is on its way. I'll reply soon.</div>
            )}
            {status === 'error' && (
              <div className="form-success show" style={{ background: '#fdeeee', color: '#c0392b' }}>
                <span>
                  Something went wrong sending that. Your message is still here — try again, or email{' '}
                  <a href={`mailto:${profile.email}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{profile.email}</a>.
                </span>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;