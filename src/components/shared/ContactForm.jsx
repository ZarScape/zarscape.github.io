import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState({ text: '', ok: true, visible: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if ((formData.get('company') || '').toString().trim() !== '') {
      setStatus({ text: 'Submission blocked.', ok: false, visible: true });
      return;
    }

    setIsSubmitting(true);
    setStatus({ text: 'Transmitting...', ok: true, visible: true });

    const payload = {
      name: (formData.get('name') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      message: (formData.get('message') || '').toString().trim(),
      page: window.location.href,
      company: (formData.get('company') || '').toString().trim()
    };

    try {
      const response = await fetch('https://contact.zarscape-abuzar.workers.dev/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 400) throw new Error('Missing fields');
        if (response.status === 403) throw new Error('Blocked');
        if (response.status === 429) throw new Error('Too many requests');
        if (response.status === 502) throw new Error('Webhook failed');
        throw new Error('Request failed');
      }

      form.reset();
      setStatus({ text: 'Request transmitted.', ok: true, visible: true });
    } catch (error) {
      const message =
        error.message === 'Missing fields'
          ? 'Missing required fields.'
          : error.message === 'Blocked'
            ? 'Submission blocked.'
            : error.message === 'Too many requests'
              ? 'Too many requests. Please wait a minute.'
              : 'Transmission failed. Try again later.';

      setStatus({ text: message, ok: false, visible: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="contact-form" className="space-y-8 md:space-y-10" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <label className="ml-1 text-[9px] font-black uppercase tracking-widest text-cyan-500 md:text-[10px]">
          Client Identity
        </label>
        <input
          type="text"
          name="name"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white transition-all focus:border-cyan-400 focus:outline-none md:px-8 md:py-6"
          placeholder="Name"
          autoComplete="name"
          required
        />
      </div>
      <div className="space-y-3">
        <label className="ml-1 text-[9px] font-black uppercase tracking-widest text-cyan-500 md:text-[10px]">
          Return Channel
        </label>
        <input
          type="email"
          name="email"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white transition-all focus:border-cyan-400 focus:outline-none md:px-8 md:py-6"
          placeholder="Email"
          autoComplete="email"
          inputMode="email"
          required
        />
      </div>
      <div className="space-y-3">
        <label className="ml-1 text-[9px] font-black uppercase tracking-widest text-cyan-500 md:text-[10px]">
          Payload Details
        </label>
        <textarea
          rows="4"
          name="message"
          className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white transition-all focus:border-cyan-400 focus:outline-none md:px-8 md:py-6"
          placeholder="Your inquiry..."
          required
        />
      </div>
      <input type="text" name="company" autoComplete="off" tabIndex="-1" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-cyan-500 py-5 text-xs font-black uppercase tracking-[0.25em] text-black shadow-xl shadow-cyan-900/40 transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70 md:py-7 md:text-sm"
      >
        {isSubmitting ? 'Transmitting...' : 'Execute Transmission'}
      </button>
      <p
        id="contact-status"
        className={`text-center text-[10px] font-bold uppercase tracking-widest md:text-xs ${
          status.visible ? '' : 'hidden'
        } ${status.ok ? 'text-cyan-400/70' : 'text-red-400/80'}`}
      >
        {status.text}
      </p>
    </form>
  );
}
