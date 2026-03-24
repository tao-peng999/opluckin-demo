import { useEffect, useRef, useState } from 'react';
import { 
  PenTool, 
  Image, 
  Target,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Share2,
  TrendingUp,
  Eye,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MarketingModule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [currentCopy, setCurrentCopy] = useState(0);

  const features = [
    {
      icon: <PenTool className="w-5 h-5" />,
      title: '营销方案',
      desc: 'AI生成完整营销策略',
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: '投放策略',
      desc: '精准渠道与预算分配',
    },
    {
      icon: <Image className="w-5 h-5" />,
      title: '视觉设计',
      desc: '自动生成营销素材',
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      title: '社媒运营',
      desc: '多平台内容一键分发',
    },
  ];

  const copyVariations = [
    {
      title: '新品上市文案',
      content: '「燕麦桂花拿铁」秋日限定上市！\n\n🍂 桂花香 × 燕麦奶，一口秋天的味道\n🥛 0乳糖 · 轻负担 · 更健康\n\n限时特惠 ¥19.9（原价¥26）\n快来品尝这杯秋天的温柔～\n\n#瑞幸咖啡 #秋季限定 #燕麦拿铁',
      tags: ['小红书风格', 'emoji丰富'],
      engagement: { views: '12.5K', likes: '2.3K' },
    },
    {
      title: '促销文案',
      content: '☕ 周三会员日，全场饮品买一送一！\n\n⏰ 限时：今日 10:00-22:00\n📍 全国门店通用\n\n美式、拿铁、生椰...你爱喝的都在！\n叫上闺蜜/同事，一起薅羊毛～\n\n打开瑞幸APP下单 →',
      tags: ['促销感强', '行动导向'],
      engagement: { views: '28.1K', likes: '5.6K' },
    },
    {
      title: '品牌文案',
      content: '每一杯，都是用心\n\n从选豆到萃取，从调配到出品\n我们坚持：\n✓ 100%阿拉比卡咖啡豆\n✓ 新鲜烘焙，14天最佳赏味\n✓ 专业咖啡师品质把控\n\n因为你值得一杯好咖啡。\n\n#瑞幸 #品质咖啡',
      tags: ['品牌调性', '情感共鸣'],
      engagement: { views: '8.9K', likes: '1.8K' },
    },
  ];

  const marketingPlans = [
    {
      name: '新品上市方案',
      budget: '50万',
      duration: '2周',
      channels: ['小红书', '抖音', '微博', '朋友圈'],
      kpi: '曝光500万+，转化5万+',
    },
    {
      name: '会员日活动',
      budget: '30万',
      duration: '1天',
      channels: ['APP推送', '短信', '社群'],
      kpi: 'DAU提升30%，订单10万+',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.marketing-card',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyVariations[currentCopy].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextCopy = () => {
    setCurrentCopy((prev) => (prev + 1) % copyVariations.length);
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            第三步
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            品宣<span className="text-gradient">营销</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI驱动创意生成，打造 viral 营销内容
          </p>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="marketing-card p-6 rounded-2xl bg-white border border-gray-100 
                hover:border-amber-300 hover:shadow-lg transition-all duration-300 text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3
                group-hover:bg-amber-500 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Poster Showcase */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">营销海报生成</h3>
              <Badge className="bg-amber-500 text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                AI 生成
              </Badge>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <img 
                src="/marketing-poster.jpg" 
                alt="营销海报" 
                className="w-full h-auto"
              />
              
              {/* Overlay Stats */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                <div className="flex-1 bg-white/90 backdrop-blur rounded-xl p-3 text-center">
                  <Eye className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                  <p className="text-lg font-bold text-gray-800">50万+</p>
                  <p className="text-xs text-gray-500">预计曝光</p>
                </div>
                <div className="flex-1 bg-white/90 backdrop-blur rounded-xl p-3 text-center">
                  <ThumbsUp className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                  <p className="text-lg font-bold text-gray-800">8.5%</p>
                  <p className="text-xs text-gray-500">互动率</p>
                </div>
                <div className="flex-1 bg-white/90 backdrop-blur rounded-xl p-3 text-center">
                  <TrendingUp className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                  <p className="text-lg font-bold text-green-600">+25%</p>
                  <p className="text-xs text-gray-500">转化提升</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                重新生成
              </Button>
              <Button className="flex-1 bg-luckin-blue hover:bg-luckin-blue/90">
                <Share2 className="w-4 h-4 mr-2" />
                一键分发
              </Button>
            </div>
          </div>

          {/* Right - Copy Generator */}
          <div className="space-y-6">
            {/* Copy Generator */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">AI文案生成</h3>
                <div className="flex gap-2">
                  {copyVariations[currentCopy].tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4 relative">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {copyVariations[currentCopy].content}
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {copyVariations[currentCopy].engagement.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {copyVariations[currentCopy].engagement.likes}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={nextCopy}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  换一换
                </Button>
              </div>
            </div>

            {/* Marketing Plans */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">营销方案</h3>
              <Tabs defaultValue="0">
                <TabsList className="grid grid-cols-2 mb-4">
                  {marketingPlans.map((plan, index) => (
                    <TabsTrigger key={index} value={String(index)}>
                      {plan.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {marketingPlans.map((plan, index) => (
                  <TabsContent key={index} value={String(index)}>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">预算</span>
                        <span className="font-semibold">{plan.budget}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">周期</span>
                        <span className="font-semibold">{plan.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">渠道</span>
                        <span className="font-semibold">{plan.channels.join('、')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">目标</span>
                        <span className="font-semibold text-luckin-blue">{plan.kpi}</span>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingModule;
