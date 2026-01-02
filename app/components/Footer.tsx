'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - you can add your API call here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <footer className="bg-[#1a1a1a] text-white/90">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          
          {/* About Us Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
              About Us: DERMAGREAT PHARMA
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Dermagreat pharma is a innovative driven speciality Dermatology company in India offering high quality products in medical dermatology for skin as well hair care.
            </p>
            
            <h4 className="font-semibold mb-4 text-white">Follow On</h4>
            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/dermagreat_pharma23?igsh=Y200Zm81ZnpnbjI5&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">
              Write Us Query or Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5C518]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5C518]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5C518]"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5C518]"
                />
              </div>
              <textarea
                name="message"
                placeholder="Write a Message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 bg-white text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5C518] resize-none"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#F5C518] text-[#1a1a1a] font-semibold rounded-md hover:bg-[#e0b416] transition-colors"
              >
                Send a Message
              </button>
            </form>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Address</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Smart Avenue Unit FO-02, 4th Floor, 28/A, 80 FT Road, Michael Palaya, Indiranagar, Bengaluru, Karnataka – 560038
            </p>
            
            {/* Additional Contact Info */}
            <div className="mt-6 space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#F5C518] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@dermagreatpharma.com</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#F5C518] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>8690964141</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} Dermagreat Pharma. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/50">
              <a href="#" className="hover:text-[#F5C518] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#F5C518] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#F5C518] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
