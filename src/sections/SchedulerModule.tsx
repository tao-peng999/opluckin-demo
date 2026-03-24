import { useEffect, useRef, useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Sparkles,
  Package,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SchedulerModule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const salesData = [
    { name: '周一', current: 420, predicted: 450 },
    { name: '周二', current: 380, predicted: 400 },
    { name: '周三', current: 510, predicted: 520 },
    { name: '周四', current: 480, predicted: 500 },
    { name: '周五', current: 620, predicted: 650 },
    { name: '周六', current: 750, predicted: 780 },
    { name: '周日', current: 680, predicted: 700 },
  ];

  const valueData = [
    { subject: '销量', A: 120, fullMark: 150 },
    { subject: '利润', A: 98, fullMark: 150 },
    { subject: '复购', A: 86, fullMark: 150 },
    { subject: '口碑', A: 99, fullMark: 150 },
    { subject: '增长', A: 85, fullMark: 150 },
    { subject: '库存', A: 65, fullMark: 150 },
  ];

  const inventoryData = [
    { name: '拿铁', stock: 85, threshold: 30 },
    { name: '美式', stock: 45, threshold: 20 },
    { name: '生椰', stock: 25, threshold: 30 },
    { name: '燕麦', stock: 60, threshold: 25 },
    { name: '果茶', stock: 15, threshold: 20 },
  ];

  const products = [
    {
      id: '1',
      name: '经典美式',
      status: 'keep',
      sales: '+12%',
      value: 85,
      reason: '销量稳定，利润贡献高',
    },
    {
      id: '2',
      name: '季节限定果茶',
      status: 'remove',
      sales: '-35%',
      value: 32,
      reason: '季节结束，销量持续下滑',
    },
    {
      id: '3',
      name: '燕麦桂花拿铁',
      status: 'add',
      sales: '新品',
      value: 78,
      reason: '趋势预测高匹配，建议上架',
    },
    {
      id: '4',
      name: '焦糖玛奇朵',
      status: 'keep',
      sales: '+8%',
      value: 72,
      reason: '表现良好，继续观察',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.scheduler-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'keep':
        return <Badge className="bg-green-500 text-white">保持上架</Badge>;
      case 'remove':
        return <Badge className="bg-red-500 text-white">建议下架</Badge>;
      case 'add':
        return <Badge className="bg-blue-500 text-white">建议上架</Badge>;
      default:
        return null;
    }
  };

  const getSalesIndicator = (sales: string) => {
    if (sales.startsWith('+')) {
      return <span className="text-green-600 flex items-center gap-1"><ArrowUpRight className="w-4 h-4" />{sales}</span>;
    } else if (sales.startsWith('-')) {
      return <span className="text-red-600 flex items-center gap-1"><ArrowDownRight className="w-4 h-4" />{sales}</span>;
    } else {
      return <span className="text-blue-600">{sales}</span>;
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden bg-luckin-dark">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luckin-blue rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luckin-red rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            第四步
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            上下架<span className="text-blue-400">调度</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            智能调度系统，优化货品生命周期
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Prediction Chart */}
          <div className="scheduler-card lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">销量预测</h3>
                  <p className="text-sm text-gray-400">未来7天销售趋势</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-gray-400">实际</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-300" />
                  <span className="text-gray-400">预测</span>
                </span>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 0 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#93C5FD" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#93C5FD', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Value Assessment */}
          <div className="scheduler-card bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">价值评估</h3>
                <p className="text-sm text-gray-400">多维度评分</p>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={valueData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} />
                  <Radar
                    name="当前产品"
                    dataKey="A"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Product Status */}
          <div className="scheduler-card bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Package className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">上下架状态</h3>
                  <p className="text-sm text-gray-400">AI智能推荐</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新
              </Button>
            </div>
            
            <div className="space-y-3">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer
                    ${selectedProduct === product.id 
                      ? 'bg-white/10 border-white/30' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-white">{product.name}</span>
                      {getStatusBadge(product.status)}
                    </div>
                    <div className="text-right">
                      {getSalesIndicator(product.sales)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{product.reason}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">价值分</span>
                      <span className={`font-semibold ${product.value >= 70 ? 'text-green-400' : product.value >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {product.value}
                      </span>
                    </div>
                  </div>
                  {selectedProduct === product.id && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                      <Button size="sm" className="flex-1 bg-luckin-blue hover:bg-luckin-blue/90">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        确认执行
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400">
                        查看详情
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Alert */}
          <div className="scheduler-card bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">库存预警</h3>
                <p className="text-sm text-gray-400">实时监控</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {inventoryData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${item.stock <= item.threshold ? 'text-red-400' : 'text-green-400'}`}>
                        {item.stock}%
                      </span>
                      {item.stock <= item.threshold && (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500
                        ${item.stock <= item.threshold ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${item.stock}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>阈值: {item.threshold}%</span>
                    <span>{item.stock <= item.threshold ? '需补货' : '库存充足'}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-200 font-medium mb-1">智能建议</p>
                  <p className="text-sm text-gray-400">
                    生椰拿铁和果茶库存低于安全阈值，建议24小时内补货。
                    预计周五销量高峰，需提前备货。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchedulerModule;
