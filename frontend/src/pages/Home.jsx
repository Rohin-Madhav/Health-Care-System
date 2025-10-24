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
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <Award className="w-4 h-4" />
              <span>Trusted Healthcare Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Your Health, Our
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"> Priority</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Connect with qualified doctors, schedule appointments, and manage
              your health records all in one secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate("/patientLogin")}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg shadow-teal-500/30"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate("/about")} 
                className="border-2 border-slate-300 hover:border-teal-600 hover:bg-teal-50 text-slate-700 hover:text-teal-700 px-8 py-4 rounded-full font-semibold transition-all"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 rounded-3xl h-96 flex items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <Heart className="w-32 h-32 text-white opacity-30 relative z-10" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">50K+</p>
                  <p className="text-slate-600 text-sm">Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <p className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.number}
                </p>
                <p className="text-slate-600 mt-2 group-hover:text-teal-600 transition-colors">{stat.label}</p>
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
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-slate-600">
            Experience healthcare that puts you first
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-slate-100 group"
            >
              <div className="bg-gradient-to-br from-teal-100 to-cyan-100 w-16 h-16 rounded-full flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of patients who trust us with their health
            </p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;