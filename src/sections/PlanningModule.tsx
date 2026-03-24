import { useEffect, useRef, useState } from 'react';
import { 
  Package, 
  Lightbulb, 
  Tags, 
  DollarSign,
  Plus,
  Check,
  ArrowRight,
  Sparkles,
  Coffee,
  Croissant,
  Sandwich
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PlanningModule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [selectedCombo, setSelectedCombo] = useState<number | null>(null);
  const [showNewProduct, setShowNewProduct] = useState(false);

  const features = [
    {
      icon: <Package className="w-5 h-5" />,
      title: '组品策略',
      desc: '智能分析销售数据，推荐最佳产品组合',
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: '新品研发',
      desc: '基于趋势预测，生成新品创意方案',
    },
    {
      icon: <Tags className="w-5 h-5" />,
      title: '套餐设计',
      desc: '优化套餐搭配，提升客单价',
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: '定价优化',
      desc: '动态定价策略，最大化利润',
    },
  ];

  const combos = [
    {
      name: '早餐组合',
      items: [
        { name: '美式咖啡', icon: <Coffee className="w-4 h-4" />, price: 15 },
        { name: '可颂面包', icon: <Croissant className="w-4 h-4" />, price: 12 },
      ],
      comboPrice: 22,
      originalPrice: 27,
      savings: 5,
      match: 92,
    },
    {
      name: '下午茶组合',
      items: [
        { name: '拿铁咖啡', icon: <Coffee className="w-4 h-4" />, price: 19 },
        { name: '三明治', icon: <Sandwich className="w-4 h-4" />, price: 18 },
      ],
      comboPrice: 29,
      originalPrice: 37,
      savings: 8,
      match: 88,
    },
    {
      name: '加班组合',
      items: [
        { name: '浓缩咖啡', icon: <Coffee className="w-4 h-4" />, price: 12 },
        { name: '能量棒', icon: <Croissant className="w-4 h-4" />, price: 8 },
      ],
      comboPrice: 16,
      originalPrice: 20,
      savings: 4,
      match: 85,
    },
  ];

  const newProducts = [
    {
      name: '燕麦桂花拿铁',
      concept: '秋季限定 · 健康轻食',
      description: '融合燕麦奶的醇厚与桂花的清香，打造健康轻负担的秋季饮品',
      target: '健康意识强的年轻女性',
      price: '22-26元',
      confidence: 89,
      tags: ['健康', '季节限定', '植物基'],
    },
    {
      name: '柚子气泡美式',
      concept: '夏日清爽 · 创意特调',
      description: '清新柚子搭配气泡水与浓缩咖啡，带来层次丰富的口感体验',
      target: '追求新鲜感的Z世代',
      price: '18-22元',
      confidence: 84,
      tags: ['清爽', '创意', '夏日'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.planning-feature',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
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

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="order-2 lg:order-1">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              第二步
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              货品<span className="text-gradient-red">规划</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              智能组品与新品研发，打造完美产品矩阵
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="planning-feature flex items-center gap-4 p-4 rounded-xl bg-gray-50 
                    hover:bg-red-50 transition-colors duration-300 group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-white shadow-sm group-hover:bg-red-100 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>

            {/* Combo Showcase */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">智能组品推荐</h4>
                <Badge variant="secondary" className="bg-luckin-blue/10 text-luckin-blue">
                  AI 推荐
                </Badge>
              </div>
              
              <div className="space-y-3">
                {combos.map((combo, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                      ${selectedCombo === index 
                        ? 'border-luckin-blue bg-luckin-blue/5' 
                        : 'border-white bg-white hover:border-gray-200'}`}
                    onClick={() => setSelectedCombo(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {combo.items.map((item, i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white">
                              {item.icon}
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{combo.name}</p>
                          <p className="text-xs text-gray-500">
                            {combo.items.map(i => i.name).join(' + ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-luckin-blue">¥{combo.comboPrice}</p>
                        <p className="text-xs text-gray-400 line-through">¥{combo.originalPrice}</p>
                      </div>
                    </div>
                    {selectedCombo === index && (
                      <div className="mt-3 pt-3 border-t border-luckin-blue/20 flex items-center justify-between text-sm">
                        <span className="text-green-600">省 ¥{combo.savings}</span>
                        <span className="text-luckin-blue">匹配度 {combo.match}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* New Product CTA */}
            <Dialog open={showNewProduct} onOpenChange={setShowNewProduct}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-2 border-dashed border-gray-300 hover:border-luckin-blue hover:text-luckin-blue w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  查看新品策划方案
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-amber-500" />
                    新品策划方案
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  {newProducts.map((product, index) => (
                    <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{product.name}</h4>
                          <p className="text-amber-600 text-sm">{product.concept}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-luckin-blue">{product.confidence}%</p>
                          <p className="text-xs text-gray-500">成功概率</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">目标人群</p>
                          <p className="text-sm font-medium text-gray-700">{product.target}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">建议定价</p>
                          <p className="text-sm font-medium text-gray-700">{product.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {product.tags.map((tag, tIndex) => (
                          <Badge key={tIndex} variant="secondary" className="bg-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right - Image */}
          <div className="order-1 lg:order-2" ref={imageRef}>
            <div className="relative">
              <img 
                src="/product-combo.jpg" 
                alt="产品组合" 
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              
              {/* Floating Labels */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">最佳搭配</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-luckin-blue text-white rounded-xl p-3 shadow-lg">
                <p className="text-2xl font-bold">+35%</p>
                <p className="text-xs opacity-80">客单价提升</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanningModule;
