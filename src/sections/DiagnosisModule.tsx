import { useEffect, useRef, useState } from 'react';
import { 
  TrendingUp, 
  AlertCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Target,
  Zap
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DiagnosisModule = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [scanLine, setScanLine] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState(0);

  const trendData = [
    { day: '1日', value: 65 },
    { day: '5日', value: 78 },
    { day: '10日', value: 85 },
    { day: '15日', value: 72 },
    { day: '20日', value: 68 },
    { day: '25日', value: 75 },
    { day: '30日', value: 82 },
  ];

  const issueData = [
    { name: '价格问题', value: 35, color: '#C20E0E' },
    { name: '口味问题', value: 25, color: '#F59E0B' },
    { name: '包装问题', value: 20, color: '#3B82F6' },
    { name: '其他', value: 20, color: '#10B981' },
  ];

  const issues = [
    {
      title: '价格敏感度上升',
      severity: 'high',
      impact: '销量下降15%',
      description: '近期竞品降价促销，用户对价格敏感度明显提升',
      suggestion: '推出限时优惠活动，或开发性价比更高的替代产品',
    },
    {
      title: '口味反馈分化',
      severity: 'medium',
      impact: '复购率下降8%',
      description: '部分用户反馈新品口味偏甜，与预期不符',
      suggestion: '优化配方，推出低糖版本，满足不同口味需求',
    },
    {
      title: '包装吸引力不足',
      severity: 'low',
      impact: '社交传播-12%',
      description: '新品包装设计缺乏亮点，社交媒体曝光度低',
      suggestion: '重新设计包装，增加视觉识别度和分享属性',
    },
  ];

  const improvements = [
    {
      title: '优化产品口味配方',
      priority: 'high',
      timeline: '2周',
      impact: '+20% 满意度',
      status: 'in-progress',
    },
    {
      title: '调整价格策略',
      priority: 'high',
      timeline: '1周',
      impact: '+15% 销量',
      status: 'pending',
    },
    {
      title: '升级包装设计',
      priority: 'medium',
      timeline: '4周',
      impact: '+30% 社交传播',
      status: 'planned',
    },
    {
      title: '增加营销投入',
      priority: 'medium',
      timeline: '持续',
      impact: '+25% 曝光',
      status: 'ongoing',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { rotateY: -30, opacity: 0 },
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

      gsap.fromTo(
        '.diagnosis-card',
        { y: 30, opacity: 0 },
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

    // Scan line animation
    const scanInterval = setInterval(() => {
      setScanLine((prev) => (prev + 1) % 100);
    }, 50);

    return () => {
      ctx.revert();
      clearInterval(scanInterval);
    };
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge className="bg-blue-500 text-white">进行中</Badge>;
      case 'pending':
        return <Badge variant="secondary">待开始</Badge>;
      case 'planned':
        return <Badge variant="outline">已规划</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-500 text-white">持续中</Badge>;
      default:
        return null;
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Content */}
          <div>
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              第五步
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              诊断<span className="text-gradient">归因</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              深度分析货品表现，持续优化经营策略
            </p>

            {/* Value Trend */}
            <div className="diagnosis-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">价值趋势</h4>
                    <p className="text-sm text-gray-500">近30天销售趋势</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  <ArrowRight className="w-3 h-3 mr-1" />
                  +12.5%
                </Badge>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#999" fontSize={12} />
                    <YAxis stroke="#999" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#005BAC" 
                      strokeWidth={2}
                      dot={{ fill: '#005BAC', strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Issue Attribution */}
            <div className="diagnosis-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">问题归因</h4>
                  <p className="text-sm text-gray-500">影响销售的关键因素</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={issueData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        dataKey="value"
                      >
                        {issueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex-1 space-y-2">
                  {issueData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Issue List */}
            <div className="space-y-3">
              {issues.map((issue, index) => (
                <div 
                  key={index}
                  className={`diagnosis-card p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${selectedIssue === index 
                      ? 'border-luckin-blue bg-blue-50' 
                      : 'border-gray-100 bg-white hover:border-gray-200'}`}
                  onClick={() => setSelectedIssue(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(issue.severity)}`} />
                      <div>
                        <h5 className="font-semibold text-gray-800">{issue.title}</h5>
                        <p className="text-sm text-gray-500 mt-1">{issue.description}</p>
                        {selectedIssue === index && (
                          <div className="mt-3 p-3 bg-white rounded-lg border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="w-4 h-4 text-amber-500" />
                              <span className="text-sm font-medium text-gray-700">改进建议</span>
                            </div>
                            <p className="text-sm text-gray-600">{issue.suggestion}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-red-600 bg-red-50">
                        {issue.impact}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Report Image & Improvements */}
          <div>
            {/* Report Image with Scan Effect */}
            <div 
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl mb-6"
              style={{ perspective: '1000px' }}
            >
              <img 
                src="/diagnosis-report.jpg" 
                alt="诊断报告" 
                className="w-full h-auto"
              />
              
              {/* Scan Line */}
              <div 
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-luckin-blue to-transparent opacity-50"
                style={{ top: `${scanLine}%` }}
              />
              
              {/* Highlight Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, transparent ${scanLine - 10}%, rgba(0,91,172,0.1) ${scanLine}%, transparent ${scanLine + 10}%)`,
                }}
              />
            </div>

            {/* Improvement Actions */}
            <div className="diagnosis-card bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">改进行动</h4>
                </div>
                <Badge className="bg-luckin-blue text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  AI 推荐
                </Badge>
              </div>
              
              <div className="space-y-3">
                {improvements.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} />
                      <div>
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span>周期: {item.timeline}</span>
                          <span>预期: {item.impact}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 bg-luckin-blue hover:bg-luckin-blue/90">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                生成完整改进方案
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisModule;
