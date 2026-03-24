import { useEffect, useRef, useState } from 'react';
import { 
  Users, 
  BarChart3, 
  Target, 
  FileText,
  TrendingUp,
  Coffee,
  Heart,
  MessageCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InsightModule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showReport, setShowReport] = useState(false);

  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: '潜在用户洞察',
      desc: '基于10万+用户数据，深度分析消费者画像',
      stats: '10万+',
      label: '用户样本',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: '媒体数据分析',
      desc: '社交媒体舆情监测，捕捉饮品趋势',
      stats: '50+',
      label: '数据源',
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: '竞品分析',
      desc: '全面对标竞品口味、价格、营销策略',
      stats: '20+',
      label: '竞品品牌',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: '需求报告',
      desc: 'AI自动生成完整的需求分析报告',
      stats: '100%',
      label: '自动化',
    },
  ];

  const tasteData = [
    { name: '拿铁', value: 45, color: '#005BAC', icon: <Coffee className="w-4 h-4" /> },
    { name: '美式', value: 25, color: '#C20E0E', icon: <Coffee className="w-4 h-4" /> },
    { name: '生椰拿铁', value: 20, color: '#10B981', icon: <Heart className="w-4 h-4" /> },
    { name: '其他', value: 10, color: '#F59E0B', icon: <MessageCircle className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image 3D reveal
      gsap.fromTo(
        imageRef.current,
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Features stagger
      gsap.fromTo(
        '.insight-feature',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div 
            ref={imageRef}
            className="relative"
            style={{ perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          >
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-200"
              style={{
                transform: `rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`,
              }}
            >
              <img 
                src="/insight-report.jpg" 
                alt="需求报告" 
                className="w-full h-auto"
              />
              
              {/* Shine Effect */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${50 + mousePos.x * 50}% ${50 + mousePos.y * 50}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                }}
              />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-luckin-blue/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-luckin-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">+32%</p>
                  <p className="text-sm text-gray-500">口味偏好匹配度</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              第一步
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              洞察<span className="text-gradient">调研</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              深度挖掘用户需求，精准把握市场脉搏
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="insight-feature group p-4 rounded-xl bg-white border border-gray-100 
                    hover:border-luckin-blue/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-luckin-blue/10 transition-colors">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{feature.label}</span>
                      <span className="text-lg font-bold text-luckin-blue">{feature.stats}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Taste Preference Preview */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
              <h4 className="font-semibold text-gray-800 mb-4">用户口味偏好分布</h4>
              <div className="space-y-3">
                {tasteData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 w-24">
                      <span style={{ color: item.color }}>{item.icon}</span>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${item.value}%`, 
                          backgroundColor: item.color,
                          animation: 'slide-up 1s ease-out forwards',
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-10">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Dialog open={showReport} onOpenChange={setShowReport}>
              <DialogTrigger asChild>
                <Button className="bg-luckin-blue hover:bg-luckin-blue/90 text-white">
                  查看完整报告
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">需求洞察报告</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">核心发现</h4>
                    <ul className="space-y-2 text-blue-800">
                      <li>• 拿铁类产品占据45%市场份额，是核心品类</li>
                      <li>• 年轻用户（18-30岁）偏好果味和创意饮品</li>
                      <li>• 社交媒体热议关键词：生椰、燕麦、低糖</li>
                      <li>• 竞品新品发布频率：平均每周2.5款</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">用户画像</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-luckin-blue">68%</p>
                        <p className="text-sm text-gray-500">女性用户</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-luckin-blue">26岁</p>
                        <p className="text-sm text-gray-500">平均年龄</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-luckin-blue">3.2次</p>
                        <p className="text-sm text-gray-500">周均购买</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">口味趋势预测</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      基于社交媒体数据和竞品分析，预计未来三个月内，
                      燕麦拿铁、生椰系列将继续保持高增长趋势。
                      建议加大相关产品研发投入，并关注低糖、健康概念饮品。
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightModule;
