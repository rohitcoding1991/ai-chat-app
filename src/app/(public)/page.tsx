"use client";

import GoogleSignIn from "@/components/Authentication/GoogleSignin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-purple-900/30 via-slate-800 to-blue-900/40 text-white relative">
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 50%)`,
        }}
      />

      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-yellow-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse delay-4000"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none -z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full animate-ping`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10 min-h-screen flex flex-col">
        <div className="container mx-auto px-6 py-8 flex-1 flex flex-col">
          <nav className="flex items-center justify-between mb-16 animate-fadeInDown">
            <div className="text-3xl font-bold group cursor-pointer">
              <span className="transition-all duration-300 group-hover:scale-110 inline-block">
                AI
              </span>
              <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text animate-pulse">
                Hub
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-white/90 hover:text-cyan-400 transition-all duration-300 hover:scale-105 relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("models")}
                className="text-white/90 hover:text-purple-400 transition-all duration-300 hover:scale-105 relative group"
              >
                AI Models
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("getting-started")}
                className="text-white/90 hover:text-pink-400 transition-all duration-300 hover:scale-105 relative group"
              >
                Get Started
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            <button
              className="md:hidden text-white/90 hover:text-cyan-400 transition-all duration-300 p-2"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </nav>

          <div
            className={`md:hidden fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900/30 via-slate-800 to-blue-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-500 ease-in-out transform ${
              isMobileMenuOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full pointer-events-none"
            }`}
            onClick={closeMobileMenu}
          >
            <button
              className="absolute top-6 right-6 text-white/90 hover:text-cyan-400 transition-all duration-300 p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-cyan-400/50"
              onClick={closeMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div
              className="flex flex-col items-center justify-center h-full space-y-10"
              onClick={(e) => e.stopPropagation()}
            >
              {[
                {
                  label: "Features",
                  section: "features",
                  color: "cyan-400",
                  gradient: "from-cyan-400 to-purple-400",
                  delay: "delay-100",
                },
                {
                  label: "AI Models",
                  section: "models",
                  color: "purple-400",
                  gradient: "from-purple-400 to-pink-400",
                  delay: "delay-200",
                },
                {
                  label: "Get Started",
                  section: "getting-started",
                  color: "pink-400",
                  gradient: "from-pink-400 to-cyan-400",
                  delay: "delay-300",
                },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.section)}
                  className={`text-3xl font-bold text-white/90 hover:text-${item.color} transition-all duration-500 hover:scale-110 relative group animate-slideInRight ${item.delay}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
                  ></span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center max-w-6xl mx-auto flex-1 flex flex-col justify-center">
            <div className="mb-8 animate-fadeInUp">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm font-medium text-cyan-300 mb-6 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                🚀 Access Any AI Model with Your API Key
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fadeInUp delay-200">
              <span className="inline-block hover:scale-105 transition-all duration-500">
                Your
              </span>{" "}
              <span className="inline-block hover:scale-105 transition-all duration-500 delay-100">
                Universal
              </span>
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 to-orange-400 bg-clip-text animate-gradient-x bg-300% mt-4">
                AI Gateway
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto animate-fadeInUp delay-400 font-light">
              Connect to{" "}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold">
                OpenAI, Claude, Gemini, Llama
              </span>{" "}
              and dozens of other AI models. One platform, unlimited
              possibilities.
            </p>

            <div className="flex justify-center mb-12 animate-fadeInUp delay-600">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-2 rounded-3xl hover:shadow-cyan-500/25 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-gradient-to-r from-white to-cyan-200 bg-clip-text">
                      Start Your AI Journey
                    </h3>
                    <p className="text-white/80 text-lg">
                      Join thousands using multiple AI models in one place
                    </p>
                  </div>
                  <GoogleSignIn />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col items-center animate-fadeInUp delay-800">
              <p className="text-white/70 text-lg mb-4 font-medium">
                Discover powerful features below
              </p>
              <button
                onClick={() => scrollToSection("features")}
                className="animate-bounce hover:animate-none hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-white/10"
              >
                <svg
                  className="w-8 h-8 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="py-8 lg:py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Powerful</span>
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text animate-gradient-x bg-300%">
                Features
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Everything you need to harness the power of multiple AI models
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "🔑",
                title: "API Key Management",
                description:
                  "Securely store and manage API keys for multiple AI providers in one place",
                gradient: "from-yellow-400 to-orange-500",
                delay: "delay-100",
              },
              {
                icon: "🤖",
                title: "Multi-Model Support",
                description:
                  "Access GPT-4, Claude, Gemini, Llama, and 20+ other AI models seamlessly",
                gradient: "from-purple-400 to-pink-500",
                delay: "delay-200",
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description:
                  "Optimized connections ensure the fastest response times from any AI model",
                gradient: "from-cyan-400 to-blue-500",
                delay: "delay-300",
              },
              {
                icon: "💬",
                title: "Unified Chat Interface",
                description:
                  "Switch between AI models mid-conversation without losing context",
                gradient: "from-green-400 to-emerald-500",
                delay: "delay-400",
              },
              {
                icon: "📊",
                title: "Usage Analytics",
                description:
                  "Track API usage, costs, and performance across all your AI models",
                gradient: "from-indigo-400 to-purple-500",
                delay: "delay-500",
              },
              {
                icon: "🛡️",
                title: "Enterprise Security",
                description:
                  "End-to-end encryption and SOC 2 compliance for your API keys and data",
                gradient: "from-pink-400 to-red-500",
                delay: "delay-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-700 hover:-translate-y-4 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 animate-fadeInUp ${feature.delay} hover:bg-white/10`}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 text-3xl shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-lg group-hover:text-white/90 transition-all duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="models" className="py-8 lg:py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text animate-gradient-x bg-300%">
                Supported AI Models
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Connect your API keys and access the world&apos;s most powerful AI
              models
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "OpenAI GPT-4",
                provider: "OpenAI",
                color: "from-green-400 to-emerald-500",
                delay: "delay-100",
              },
              {
                name: "Claude 3",
                provider: "Anthropic",
                color: "from-orange-400 to-red-500",
                delay: "delay-200",
              },
              {
                name: "Gemini Pro",
                provider: "Google",
                color: "from-blue-400 to-cyan-500",
                delay: "delay-300",
              },
              {
                name: "Llama 2",
                provider: "Meta",
                color: "from-purple-400 to-pink-500",
                delay: "delay-400",
              },
              {
                name: "Mistral AI",
                provider: "Mistral",
                color: "from-indigo-400 to-purple-500",
                delay: "delay-500",
              },
              {
                name: "PaLM 2",
                provider: "Google",
                color: "from-cyan-400 to-blue-500",
                delay: "delay-600",
              },
              {
                name: "Claude Instant",
                provider: "Anthropic",
                color: "from-pink-400 to-red-500",
                delay: "delay-700",
              },
              {
                name: "GPT-3.5 Turbo",
                provider: "OpenAI",
                color: "from-yellow-400 to-orange-500",
                delay: "delay-800",
              },
            ].map((model, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 animate-fadeInUp ${model.delay} hover:bg-white/10`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${model.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <span className="text-white font-bold text-xl">AI</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {model.name}
                  </h3>
                  <p className="text-white/60 text-sm group-hover:text-white/80 transition-all duration-300">
                    {model.provider}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="getting-started" className="py-8 lg:py-24 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto animate-fadeInUp">
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Ready to Access
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text animate-gradient-x bg-300%">
                Any AI Model?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
              Start using multiple AI models today. Just add your API keys and
              begin chatting with the world&apos;s most advanced AI systems.
            </p>

            <div className="flex justify-center mb-12">
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-cyan-500/25 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-gradient-to-r from-white to-cyan-200 bg-clip-text">
                      Join the AI Revolution
                    </h3>
                    <p className="text-white/80 text-lg">
                      Get started in seconds with your Google account
                    </p>
                  </div>
                  <GoogleSignIn />
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  desc: "Create your account with Google",
                },
                {
                  step: "2",
                  title: "Add API Keys",
                  desc: "Securely store your AI provider keys",
                },
                {
                  step: "3",
                  title: "Start Chatting",
                  desc: "Access any AI model instantly",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`animate-fadeInUp delay-${
                    (index + 1) * 200
                  } group`}
                >
                  <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white group-hover:scale-110 transition-all duration-300 border border-white/20">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-all duration-300">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 relative z-10 border-t border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-3xl font-bold mb-4 md:mb-0 group cursor-pointer">
              <span className="transition-all duration-300 group-hover:scale-110 inline-block">
                AI
              </span>
              <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text animate-pulse">
                Hub
              </span>
            </div>
            <div className="flex space-x-8 text-white/70">
              <a
                href="#"
                className="hover:text-cyan-400 transition-all duration-300 hover:scale-105"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-cyan-400 transition-all duration-300 hover:scale-105"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-cyan-400 transition-all duration-300 hover:scale-105"
              >
                Support
              </a>
            </div>
          </div>
          <div className="text-center text-white/50 mt-8">
            <p>&copy; 2024 AIHub. Your gateway to the AI universe.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }

        .bg-300\% {
          background-size: 300% 300%;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
}
