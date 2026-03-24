import { useEffect, useRef } from 'react';
import { 
  Search, 
  Package, 
  Megaphone, 
  CalendarClock, 
  FileSearch,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProcessFlow = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: '洞察调研',
      desc: '用户洞察 · 媒体分析 · 竞品研究',
      color: 'bg-blue-500',
      features: ['潜在用户画像', '社交媒体分析', '竞品口味研究', '需求报告生成'],
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: '货品规划',
      desc: '组品策略 · 新品研发 · 套餐设计',
      color: 'bg-red-500',
      features: ['智能组品推荐', '新品策划方案', '套餐组合优化', '定价策略'],
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: '品宣营销',
      desc: '营销方案 · 文案生成 · 视觉设计',
      color: 'bg-amber-500',
      features: ['品牌宣传方案', 'AI文案生成', '营销海报设计', '投放策略'],
    },
    {
      icon: <CalendarClock className="w-8 h-8" />,
      title: '上下架调度',
      desc: '销量预测 · 价值评估 · 自动调度',
      color: 'bg-green-500',
      features: ['销量趋势预测', '多维度价值评估', '智能上下架', '库存优化'],
    },
    {
      icon: <FileSearch className="w-8 h-8" />,
      title: '诊断归因',
      desc: '价值分析 · 趋势预测 · 改进建议',
      color: 'bg-purple-500',
      features: ['货品价值分析', '销售趋势预测', '问题归因模型', '改进动作建议'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepCards = stepsRef.current?.querySelectorAll('.step-card');
      
      if (stepCards) {
        gsap.fromTo(
          stepCards,
          { 
            x: -100, 
            opacity: 0,
            rotateY: 45,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate connecting lines
      gsap.fromTo(
        '.connector-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            货品规划<span className="text-gradient">全流程</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            从洞察到诊断，五步打造数据驱动的货品运营闭环
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-start justify-between gap-4">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-[60%] w-[80%] h-0.5 bg-gray-200 origin-left">
                    <div className="connector-line absolute inset-0 bg-gradient-to-r from-luckin-blue to-luckin-red origin-left" />
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-luckin-red" />
                  </div>
                )}
                
                {/* Step Card */}
                <div className="step-card group">
                  <div className="relative">
                    {/* Icon Circle */}
                    <div 
                      className={`w-24 h-24 rounded-2xl ${step.color} flex items-center justify-center text-white mb-6
                        shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                        mx-auto`}
                    >
                      {step.icon}
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-luckin-blue 
                      flex items-center justify-center text-sm font-bold text-luckin-blue">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{step.desc}</p>
                    
                    {/* Features */}
                    <ul className="space-y-2 text-left">
                      {step.features.map((feature, fIndex) => (
                        <li 
                          key={fIndex} 
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div 
                    className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center text-white
                      shadow-lg flex-shrink-0`}
                  >
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-luckin-blue">步骤 {index + 1}</span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{step.desc}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {step.features.map((feature, fIndex) => (
                        <span 
                          key={fIndex}
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
