import React, { useState } from "react";
import {
  Heart,
  Calendar,
  Users,
  Clock,
  Shield,
  Award,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Easy Scheduling",
      description: "Book appointments with your preferred doctors in seconds",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Doctors",
      description: "Access to qualified healthcare professionals",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock medical assistance when you need it",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your health data is encrypted and protected",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Patients" },
    { number: "200+", label: "Expert Doctors" },
    { number: "100K+", label: "Appointments" },
    { number: "4.9/5", label: "Rating" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                HealthCare
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Contact
              </a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition">
                Sign In
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#services"
                className="block text-gray-700 hover:text-blue-600"
              >
                Services
              </a>
              <a
                href="#about"
                className="block text-gray-700 hover:text-blue-600"
              >
                About
              </a>
              <a
                href="#contact"
                className="block text-gray-700 hover:text-blue-600"
              >
                Contact
              </a>
              <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-full">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Award className="w-4 h-4" />
              <span>Trusted Healthcare Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Health, Our
              <span className="text-blue-600"> Priority</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Connect with qualified doctors, schedule appointments, and manage
              your health records all in one secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition transform hover:scale-105">
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl h-96 flex items-center justify-center shadow-2xl">
              <Heart className="w-32 h-32 text-white opacity-20" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">50K+</p>
                  <p className="text-gray-600 text-sm">Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-blue-600">
                  {stat.number}
                </p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="services"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600">
            Experience healthcare that puts you first
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients who trust us with their health
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition transform hover:scale-105">
            Create Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6" />
                <span className="text-xl font-bold">HealthCare</span>
              </div>
              <p className="text-gray-400">Your trusted healthcare partner</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <p className="hover:text-white cursor-pointer transition">
                  About Us
                </p>
                <p className="hover:text-white cursor-pointer transition">
                  Services
                </p>
                <p className="hover:text-white cursor-pointer transition">
                  Doctors
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <p className="hover:text-white cursor-pointer transition">
                  Help Center
                </p>
                <p className="hover:text-white cursor-pointer transition">
                  Privacy Policy
                </p>
                <p className="hover:text-white cursor-pointer transition">
                  Terms of Service
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>support@healthcare.com</p>
                <p>1-800-HEALTH</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HealthCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
