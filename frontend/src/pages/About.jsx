import React from 'react'
import { Heart, Stethoscope, Users, ShieldCheck } from 'lucide-react';

function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
            alt="Healthcare background"
          />
        </div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            About HealthCare
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Your trusted partner in managing health, connecting patients with expert medical professionals seamlessly.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              To revolutionize healthcare access by building a comprehensive ecosystem that empowers patients and streamlines medical services through technology.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose lg:prose-lg max-w-none">
              <p>
                We are dedicated to creating an intuitive platform where booking appointments, managing medical records, and handling payments is simple, secure, and efficient.
              </p>
              <p>
                Our goal is to bridge the gap between patients and healthcare providers, ensuring a transparent and supportive health journey for everyone. We believe that technology can make healthcare more accessible and personalized.
              </p>
            </div>
            <div className="flex justify-center">
              <Heart className="w-48 h-48 text-blue-100" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
            <p className="text-gray-600 mt-4">Features that set us apart.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                <Stethoscope size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
              <p className="text-gray-600">Find and book appointments with a network of highly qualified and approved medical professionals.</p>
            </div>
            <div className="text-center p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your medical records and personal data are encrypted and stored securely, accessible only to you and your doctor.</p>
            </div>
            <div className="text-center p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 mx-auto mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unified Platform</h3>
              <p className="text-gray-600">A seamless experience for patients, doctors, and admins to manage healthcare efficiently.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
