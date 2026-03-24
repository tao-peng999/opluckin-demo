import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, TrendingUp, Megaphone } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out' }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.orbit-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { z: -500, opacity: 0, rotateY: 90 },
          {
            z: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'expo.out',
            delay: 0.3,
          }
        );
      }

      // Floating animation for cards
      gsap.to('.orbit-card', {
        y: '+=10',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cards = [
    {
      title: '需求洞察',
      desc: '用户画像 · 媒体分析 · 竞品研究',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-blue-500/20 to-blue-600/10',
      borderColor: 'border-blue-400/30',
      position: 'left-[5%] top-[20%]',
      zIndex: 30,
    },
    {
      title: '货品规划',
      desc: '组品策略 · 新品研发 · 定价优化',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-red-500/20 to-red-600/10',
      borderColor: 'border-red-400/30',
      position: 'right-[5%] top-[30%]',
      zIndex: 20,
    },
    {
      title: '品宣营销',
      desc: '营销方案 · 文案生成 · 视觉设计',
      icon: <Megaphone className="w-6 h-6" />,
      color: 'from-amber-500/20 to-amber-600/10',
      borderColor: 'border-amber-400/30',
      position: 'left-[15%] bottom-[15%]',
      zIndex: 10,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl transition-transform duration-1000"
        style={{
          background: 'radial-gradient(circle, #005BAC 0%, transparent 70%)',
          left: '10%',
          top: '20%',
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl transition-transform duration-1000"
        style={{
          background: 'radial-gradient(circle, #C20E0E 0%, transparent 70%)',
          right: '15%',
          bottom: '10%',
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luckin-blue/10 border border-luckin-blue/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-luckin-blue" />
          <span className="text-sm font-medium text-luckin-blue">AI 驱动的货品规划系统</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-gradient">OpenClaw</span>
          <br />
          <span className="text-gray-800">货品规划品类应用</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
          数据驱动，精准打造每一款爆款饮品
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-luckin-blue hover:bg-luckin-blue/90 text-white px-8 py-6 text-lg rounded-xl shadow-glow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            开始规划
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-gray-300 hover:border-luckin-blue hover:text-luckin-blue px-8 py-6 text-lg rounded-xl transition-all duration-300"
          >
            <Play className="mr-2 w-5 h-5" />
            查看演示
          </Button>
        </div>
      </div>

      {/* Orbital Cards */}
      <div
        ref={cardsRef}
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          transform: `rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={`orbit-card absolute ${card.position} pointer-events-auto`}
            style={{ zIndex: card.zIndex }}
          >
            <div
              className={`glass rounded-2xl p-6 border ${card.borderColor} backdrop-blur-xl
                bg-gradient-to-br ${card.color} w-64
                hover:scale-105 transition-transform duration-300 cursor-pointer
                shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white/50">
                  {card.icon}
                </div>
                <h3 className="font-bold text-gray-800">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F5F5] to-transparent" />
    </section>
  );
};

export default Hero;
