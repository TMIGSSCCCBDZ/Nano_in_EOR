"use client"

import { useState } from "react"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Beaker, Wind, BarChart4, LineChart, PieChart, ArrowUpRight, Download, Share2 } from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PieChart as RechartsPieChart,
  Pie,
  AreaChart,
  Area,
  Cell
} from "recharts"

// Updated comparison data between methods (more realistic)
const efficiencyData = [
  { month: "Month 1", nano: 18, co2: 12 },
  { month: "Month 2", nano: 28, co2: 20 },
  { month: "Month 3", nano: 38, co2: 27 },
  { month: "Month 4", nano: 45, co2: 33 },
  { month: "Month 5", nano: 50, co2: 37 },
  { month: "Month 6", nano: 54, co2: 40 },
  { month: "Month 7", nano: 57, co2: 43 },
  { month: "Month 8", nano: 60, co2: 45 },
  { month: "Month 9", nano: 62, co2: 46 },
  { month: "Month 10", nano: 63, co2: 47 },
  { month: "Month 11", nano: 64, co2: 48 },
  { month: "Month 12", nano: 65, co2: 49 },
]

const costData = [
  { name: "Setup Cost", nano: 90, co2: 70 },
  { name: "Operational Cost", nano: 50, co2: 65 },
  { name: "Maintenance", nano: 40, co2: 55 },
  { name: "Material Cost", nano: 75, co2: 45 },
  { name: "Environmental", nano: 25, co2: 50 },
]

const sustainabilityData = [
    { name: "Carbon Footprint", value: 70, fill: "#0ea5e9" }, // CO2 EOR
    { name: "Water Usage", value: 50, fill: "#0369a1" },     // CO2 EOR
    { name: "Chemical Usage", value: 35, fill: "#0c4a6e" },   // CO2 EOR
    { name: "Energy Consumption", value: 60, fill: "#075985" }, // CO2 EOR
];

const sustainabilityDataNano = [
    { name: "Carbon Footprint", value: 45, fill: "#6366f1" }, // Nano EOR
    { name: "Water Usage", value: 30, fill: "#4f46e5" },     // Nano EOR
    { name: "Chemical Usage", value: 65, fill: "#4338ca" },   // Nano EOR
    { name: "Energy Consumption", value: 50, fill: "#3730a3" }, // Nano EOR
];

const recoveryRateData = [
  {
    name: "Light Oil",
    co2: 45,
    nano: 58,
  },
  {
    name: "Medium Oil",
    co2: 40,
    nano: 53,
  },
  {
    name: "Heavy Oil",
    co2: 28,
    nano: 43,
  },
  {
    name: "Extra Heavy",
    co2: 18,
    nano: 35,
  },
]

const riskAssessmentData = [
  { name: "Technical", co2: 70, nano: 80, fullMark: 100 },
  { name: "Financial", co2: 75, nano: 65, fullMark: 100 },
  { name: "Operational", co2: 85, nano: 70, fullMark: 100 },
  { name: "Environmental", co2: 65, nano: 85, fullMark: 100 },
  { name: "Regulatory", co2: 80, nano: 70, fullMark: 100 },
]

// Updated key metrics
const keyMetrics = [
  {
    title: "Recovery Efficiency",
    nano: "65%",
    co2: "49%",
    winner: "nano",
    description: "Maximum achievable recovery from depleted reservoirs"
  },
  {
    title: "Implementation Cost",
    nano: "$400k-$550k",
    co2: "$300k-$400k",
    winner: "co2",
    description: "Average cost for a medium-sized reservoir"
  },
  {
    title: "Environmental Impact",
    nano: "Medium-High",
    co2: "Low-Medium",
    winner: "co2",
    description: "Overall environmental footprint"
  },
  {
    title: "Technical Complexity",
    nano: "High",
    co2: "Medium",
    winner: "co2",
    description: "Required technical expertise and infrastructure"
  },
  {
    title: "Long-term Performance",
    nano: "Excellent",
    co2: "Good",
    winner: "nano",
    description: "Sustained performance over reservoir lifetime"
  },
]

export default function EORComparisonVisualizations() {
  const [activeTab, setActiveTab] = useState("efficiency");

    const pieChartColors = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#a8328e'
    ];

  return (
    <section className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-950/50 px-4 py-1 rounded-full mb-4">
            <span className="text-blue-300 text-sm font-medium">Advanced Comparison</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comparative Analysis: CO₂ vs Nano EOR
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            Quantitative assessment of performance metrics across different recovery methods based on
            field studies and laboratory data.
          </p>
        </div>

        {/* Top summary cards with key comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm text-white shadow-xl shadow-blue-950/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-blue-300">
                <Beaker className="mr-2 h-5 w-5" />
                Nano EOR
              </CardTitle>
              <CardDescription className="text-slate-400">
                Engineered nanoparticles for enhanced recovery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">65%</div>
              <p className="text-sm text-slate-400">Maximum recovery efficiency</p>
              <div className="mt-4 flex items-center text-emerald-400 text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>41% higher than conventional methods</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm text-white shadow-xl">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-white">Key Advantages</CardTitle>
                <CardDescription className="text-slate-400">
                  Comparative strengths of each method
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-sm text-slate-300">Higher viscosity reduction (Nano)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                  <span className="text-sm text-slate-300">Carbon sequestration potential (CO₂)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-sm text-slate-300">Wettability modification (Nano)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                  <span className="text-sm text-slate-300">Lower initial investment (CO₂)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm text-white shadow-xl shadow-blue-950/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-indigo-300">
                <Wind className="mr-2 h-5 w-5" />
                CO₂ Injection
              </CardTitle>
              <CardDescription className="text-slate-400">
                Supercritical carbon dioxide flooding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-400">49%</div>
              <p className="text-sm text-slate-400">Maximum recovery efficiency</p>
              <div className="mt-4 flex items-center text-emerald-400 text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>0.6 tonnes CO₂ sequestered per barrel</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed visualization content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-slate-800/50 backdrop-blur-sm p-1 border border-slate-700">
              <TabsTrigger
                value="efficiency"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
              >
                <BarChart4 className="mr-2 h-4 w-4" />
                Recovery Efficiency
              </TabsTrigger>
              <TabsTrigger
                value="costs"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
              >
                <LineChart className="mr-2 h-4 w-4" />
                Economic Analysis
              </TabsTrigger>
              <TabsTrigger
                value="sustainability"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
              >
                <PieChart className="mr-2 h-4 w-4" />
                Sustainability
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl backdrop-blur-sm p-6 shadow-xl">
            <TabsContent value="efficiency" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-4">Recovery Efficiency Over Time</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={efficiencyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" unit="%" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                          labelStyle={{ color: '#e2e8f0' }}
                          itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Legend
                            wrapperStyle={{
                                color: '#94a3b8',
                                fontSize: '12px'
                            }}
                        />
                        <Line
                          type="monotone"
                          dataKey="nano"
                          name="Nano EOR"
                          stroke="#38bdf8"
                          strokeWidth={3}
                          dot={{ stroke: '#38bdf8', strokeWidth: 2, r: 4, fill: '#0c4a6e' }}
                          activeDot={{ r: 8, fill: '#38bdf8' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="co2"
                          name="CO₂ Injection"
                          stroke="#818cf8"
                          strokeWidth={3}
                          dot={{ stroke: '#818cf8', strokeWidth: 2, r: 4, fill: '#312e81' }}
                          activeDot={{ r: 8, fill: '#818cf8' }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <h3 className="text-xl font-semibold text-white mb-4">Recovery by Oil Type</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={recoveryRateData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis type="number" stroke="#94a3b8" unit="%" />
                        <YAxis dataKey="name" type="category" stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                          labelStyle={{ color: '#e2e8f0' }}
                          itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Legend
                            wrapperStyle={{
                                color: '#94a3b8',
                                fontSize: '12px'
                            }}
                        />
                        <Bar
                          dataKey="nano"
                          name="Nano EOR"
                          fill="#38bdf8"
                          radius={[0, 4, 4, 0]}
                        />
                        <Bar
                          dataKey="co2"
                          name="CO₂ Injection"
                          fill="#818cf8"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="costs" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Cost Comparison by Category</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={costData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" unit="k$" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                          labelStyle={{ color: '#e2e8f0' }}
                          itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Legend
                            wrapperStyle={{
                                color: '#94a3b8',
                                fontSize: '12px'
                            }}
                        />
                        <Bar
                          dataKey="nano"
                          name="Nano EOR"
                          fill="#38bdf8"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="co2"
                          name="CO₂ Injection"
                          fill="#818cf8"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Return on Investment Over Time</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { year: '2023', nano: -100, co2: -80 },
                          { year: '2024', nano: -40, co2: -30 },
                          { year: '2025', nano: 20, co2: 10 },
                          { year: '2026', nano: 60, co2: 40 },
                          { year: '2027', nano: 110, co2: 65 },
                          { year: '2028', nano: 160, co2: 85 },
                          { year: '2029', nano: 200, co2: 100 },
                          { year: '2030', nano: 250, co2: 110 },
                        ]}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="nanoGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="year" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" unit="%" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                          labelStyle={{ color: '#e2e8f0' }}
                          itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Legend
                            wrapperStyle={{
                                color: '#94a3b8',
                                fontSize: '12px'
                            }}
                        />
                        <Area
                          type="monotone"
                          dataKey="nano"
                          name="Nano EOR ROI"
                          stroke="#38bdf8"
                          fillOpacity={1}
                          fill="url(#nanoGradient)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="co2"
                          name="CO₂ Injection ROI"
                          stroke="#818cf8"
                          fillOpacity={1}
                          fill="url(#co2Gradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sustainability" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-4">Environmental Impact Comparison</h3>
                  <div className="bg-slate-950/50 rounded-lg p-8 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                      <div className="mb-4 md:mb-0">
                        <h4 className="font-medium text-white">Sustainability Score</h4>
                        <p className="text-sm text-slate-400">Lower scores indicate better environmental performance</p>
                      </div>
                      <div className="flex pb-3 space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm text-slate-300">Nano EOR</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                          <span className="text-sm text-slate-300">CO₂ Injection</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="20%"
                            outerRadius="80%"
                            barSize={20}
                            data={sustainabilityData}
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar
                              label={{ fill: '#fff', position: 'insideStart' }}
                              background
                              dataKey="value"
                              cornerRadius={8}
                            />
                            <Legend
                                iconSize={10}
                                layout="vertical"
                                className="absolute"
                                verticalAlign="middle"
                                align="left"
                                wrapperStyle={{
                                    color: '#94a3b8',
                                    fontSize: '12px',
                                    marginTop:'3rem',
                                }}
                            />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                              labelStyle={{ color: '#e2e8f0' }}
                              formatter={(value) => [`${value}`, 'Score']}
                          
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-2 text-indigo-300 text-sm font-medium">CO₂ Injection</div>
                      </div>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="20%"
                            outerRadius="80%"
                            barSize={20}
                            data={sustainabilityDataNano}
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar
                              label={{ fill: '#fff', position: 'insideStart' }}
                              background
                              dataKey="value"
                              cornerRadius={8}
                            />
                            <Legend
                                iconSize={10}
                                layout="vertical"
                                verticalAlign="middle"

                                align="left"
                                wrapperStyle={{
                                    color: '#94a3b8',
                                    fontSize: '12px',
                                    marginTop:'3rem',
                                }}
                            />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                              labelStyle={{ color: '#e2e8f0' }}
                              formatter={(value) => [`${value}`, 'Score']}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-2 text-blue-300 text-sm font-medium">Nano EOR</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <h3 className="text-xl font-semibold text-white mb-4">Carbon Balance</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                            data={[
                                { name: 'Sequestration', value: 60 },
                                { name: 'Process Emissions', value: 15 },
                                { name: 'Net Impact', value: 45 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            dataKey="value"
                            label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                index
                            }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        fill="#fff"
                                        textAnchor={x > cx ? "start" : "end"}
                                        dominantBaseline="central"
                                    >
                                        {riskAssessmentData[index].name} ({value})
                                    </text>
                                );
                            }}
                        >
                            {riskAssessmentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                          labelStyle={{ color: '#e2e8f0' }}
                          itemStyle={{ color: '#e2e8f0' }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg mt-4">
                    <h4 className="text-white font-medium mb-2">CO₂ Carbon Advantage</h4>
                    <p className="text-slate-300 text-sm">
                      CO₂ injection provides a significant carbon offset that can be credited against production emissions, resulting
                      in lower overall carbon intensity per barrel compared to other EOR methods.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Key metrics comparison table */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Key Performance Metrics</h3>
          <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl backdrop-blur-sm p-6 shadow-xl overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-4 py-3 text-left text-slate-300 font-medium">Metric</th>
                  <th className="px-4 py-3 text-center text-blue-300 font-medium">Nano EOR</th>
                  <th className="px-4 py-3 text-center text-indigo-300 font-medium">CO₂ Injection</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {keyMetrics.map((metric, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    <td className="px-4 py-3 text-white font-medium">{metric.title}</td>
                    <td className={`px-4 py-3 text-center ${metric.winner === 'nano' ? 'text-blue-400 font-medium' : 'text-slate-300'}`}>
                      {metric.nano}
                      {metric.winner === 'nano' && (
                        <div className="flex justify-center mt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-900/40 text-blue-300">
                            Preferred
                          </span>
                        </div>
                      )}
                    </td>
                    <td className={`px-4 py-3 text-center ${metric.winner === 'co2' ? 'text-indigo-400 font-medium' : 'text-slate-300'}`}>
                      {metric.co2}
                      {metric.winner === 'co2' && (
                        <div className="flex justify-center mt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-900/40 text-indigo-300">
                            Preferred
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{metric.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Download Full Report
          </Button>
          <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-950/50">
            <Share2 className="mr-2 h-4 w-4" />
            Share Comparison Data
          </Button>
        </div>
      </div>
    </section>
  )
}

