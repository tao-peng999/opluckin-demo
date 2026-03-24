import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './sections/Hero';
import ProcessFlow from './sections/ProcessFlow';
import InsightModule from './sections/InsightModule';
import PlanningModule from './sections/PlanningModule';
import MarketingModule from './sections/MarketingModule';
import SchedulerModule from './sections/SchedulerModule';
import DiagnosisModule from './sections/DiagnosisModule';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-luckin-blue flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-bold text-gray-800">OpenClaw</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#process" className="text-sm text-gray-600 hover:text-luckin-blue transition-colors">流程</a>
              <a href="#insight" className="text-sm text-gray-600 hover:text-luckin-blue transition-colors">洞察</a>
              <a href="#planning" className="text-sm text-gray-600 hover:text-luckin-blue transition-colors">规划</a>
              <a href="#marketing" className="text-sm text-gray-600 hover:text-luckin-blue transition-colors">营销</a>
              <a href="#scheduler" className="text-sm text-gray-600 hover:text-luckin-blue transition-colors">调度</a>
              <a href="#diagnosis" className="text-sm text-gray-600 hover:text-luckin-blue transition-colors">诊断</a>
            </div>

            {/* CTA */}
            <button className="px-4 py-2 bg-luckin-blue text-white text-sm font-medium rounded-lg hover:bg-luckin-blue/90 transition-colors">
              开始使用
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <Hero />
        
        <div id="process">
          <ProcessFlow />
        </div>
        
        <div id="insight">
          <InsightModule />
        </div>
        
        <div id="planning">
          <PlanningModule />
        </div>
        
        <div id="marketing">
          <MarketingModule />
        </div>
        
        <div id="scheduler">
          <SchedulerModule />
        </div>
        
        <div id="diagnosis">
          <DiagnosisModule />
        </div>
        
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
