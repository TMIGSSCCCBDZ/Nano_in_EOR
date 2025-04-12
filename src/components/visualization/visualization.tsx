"use client"
import { useState, useEffect } from "react"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Beaker,
  Wind,
  BarChart4,
  LineChart,
  PieChart,
  ArrowUpRight,
  Download,
  Share2,
  ChevronUp,
  Microscope,
  AlertTriangle,
  Gauge,
  Lightbulb,
} from "lucide-react"
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
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Create useIsMobile hook directly in the component file
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

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
  { name: "Carbon Footprint", value: 70, fill: "#0ea5e9" },
  { name: "Water Usage", value: 50, fill: "#0369a1" },
  { name: "Chemical Usage", value: 35, fill: "#0c4a6e" },
  { name: "Energy Consumption", value: 60, fill: "#075985" },
]

const sustainabilityDataNano = [
  { name: "Carbon Footprint", value: 45, fill: "#6366f1" },
  { name: "Water Usage", value: 30, fill: "#4f46e5" },
  { name: "Chemical Usage", value: 65, fill: "#4338ca" },
  { name: "Energy Consumption", value: 50, fill: "#3730a3" },
]

const recoveryRateData = [
  { name: "Light Oil", co2: 45, nano: 58 },
  { name: "Medium Oil", co2: 40, nano: 53 },
  { name: "Heavy Oil", co2: 28, nano: 43 },
  { name: "Extra Heavy", co2: 18, nano: 35 },
]

const riskAssessmentData = [
  { name: "Technical", co2: 70, nano: 80, fullMark: 100 },
  { name: "Financial", co2: 75, nano: 65, fullMark: 100 },
  { name: "Operational", co2: 85, nano: 70, fullMark: 100 },
  { name: "Environmental", co2: 65, nano: 85, fullMark: 100 },
  { name: "Regulatory", co2: 80, nano: 70, fullMark: 100 },
]

const keyMetrics = [
  {
    title: "Recovery Efficiency",
    nano: "65%",
    co2: "49%",
    winner: "nano",
    description: "Maximum achievable recovery from depleted reservoirs",
  },
  {
    title: "Implementation Cost",
    nano: "$400k-$550k",
    co2: "$300k-$400k",
    winner: "co2",
    description: "Average cost for a medium-sized reservoir",
  },
  {
    title: "Environmental Impact",
    nano: "Medium-High",
    co2: "Low-Medium",
    winner: "co2",
    description: "Overall environmental footprint",
  },
  {
    title: "Technical Complexity",
    nano: "High",
    co2: "Medium",
    winner: "co2",
    description: "Required technical expertise and infrastructure",
  },
  {
    title: "Long-term Performance",
    nano: "Excellent",
    co2: "Good",
    winner: "nano",
    description: "Sustained performance over reservoir lifetime",
  },
]

// Expert mode data
const reservoirFactorsData = [
  { name: "Interfacial Tension Reduction", nano: 85, co2: 60 },
  { name: "Wettability Alteration", nano: 90, co2: 45 },
  { name: "Viscosity Reduction", nano: 65, co2: 80 },
  { name: "Mobility Control", nano: 75, co2: 70 },
  { name: "Permeability Enhancement", nano: 80, co2: 50 },
]

const technicalChallengesData = [
  { name: "Nanoparticle Aggregation",nik:"NA", value: 35, fill: "#9b87f5" },
  { name: "Reservoir Heterogeneity",nik:"RH", value: 25, fill: "#7b67d5" },
  { name: "Surface Adsorption", nik:"SA",value: 20, fill: "#5b47b5" },
  { name: "Transport Limitations", nik:"TL",value: 15, fill: "#3b2795" },
  { name: "Scale Formation", nik:"SF",value: 5, fill: "#1b0775" },
]

const fieldCaseStudies = [
  {
    field: "North Sea (Norway)",
    formation: "Sandstone",
    depth: "2,450m",
    porosity: "18%",
    nanoRecovery: 64,
    co2Recovery: 47,
    challenges: "High",
  },
  {
    field: "Permian Basin (USA)",
    formation: "Carbonate",
    depth: "1,850m",
    porosity: "12%",
    nanoRecovery: 58,
    co2Recovery: 51,
    challenges: "Medium",
  },
  {
    field: "Middle East Field A",
    formation: "Limestone",
    depth: "2,100m",
    porosity: "15%",
    nanoRecovery: 62,
    co2Recovery: 48,
    challenges: "Medium-High",
  },
  {
    field: "Gulf of Mexico",
    formation: "Sandstone",
    depth: "3,200m",
    porosity: "20%",
    nanoRecovery: 59,
    co2Recovery: 45,
    challenges: "Very High",
  },
]

const EORComparisonVisualizations = () => {
  const [activeTab, setActiveTab] = useState("efficiency")
  const [expertMode, setExpertMode] = useState(false)
  const isMobile = useIsMobile()

  const pieChartColors = [
    "#9b87f5", // Primary Purple
    "#0EA5E9", // Ocean Blue
    "#33C3F0", // Sky Blue
    "#E5DEFF", // Soft Purple
    "#aaadb0", // Cool Gray
    "#1A1F2C", // Dark Purple
  ]

  return (
    <section className="w-full bg-gradient-to-b from-[#1A1F2C] to-[#0f1623] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#9b87f5]/10 px-4 py-1 rounded-full mb-4">
            <span className="text-[#9b87f5] text-sm font-medium">Advanced Comparison</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">CO₂ vs Nano EOR Analysis</h2>
          <p className="text-[#aaadb0] max-w-3xl mx-auto text-lg">
            Quantitative assessment of performance metrics across different recovery methods based on field studies and
            laboratory data.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => setExpertMode(!expertMode)}
              variant={expertMode ? "default" : "outline"}
              className={`
                mt-4 transition-all duration-300
                ${
                  expertMode
                    ? "bg-[#9b87f5] hover:bg-[#8a74e8] text-white"
                    : "border-[#9b87f5]/30 text-[#9b87f5] hover:bg-[#9b87f5]/10"
                }
              `}
            >
              {expertMode ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Standard View
                </>
              ) : (
                <>
                  <Microscope className="mr-2 h-4 w-4" />
                  Are you an Expert?
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-[#1A1F2C]/80 border-[#0000001a] backdrop-blur-md text-white shadow-lg hover:shadow-[#9b87f5]/5 transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#9b87f5]">
                <Beaker className="mr-2 h-5 w-5" />
                Nano EOR
              </CardTitle>
              <CardDescription className="text-[#aaadb0]">
                Engineered nanoparticles for enhanced recovery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#9b87f5]">65%</div>
              <p className="text-sm text-[#aaadb0]">Maximum recovery efficiency</p>
              <div className="mt-4 flex items-center text-[#33C3F0] text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>41% higher than conventional methods</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/60 border-[#0000001a] backdrop-blur-md text-white shadow-lg hover:shadow-[#9b87f5]/5 transition-shadow duration-300">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-white">Key Advantages</CardTitle>
                <CardDescription className="text-[#aaadb0]">Comparative strengths of each method</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#9b87f5] mr-3"></div>
                  <span className="text-sm text-[#aaadb0]">Higher viscosity reduction (Nano)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></div>
                  <span className="text-sm text-[#aaadb0]">Carbon sequestration potential (CO₂)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#9b87f5] mr-3"></div>
                  <span className="text-sm text-[#aaadb0]">Wettability modification (Nano)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></div>
                  <span className="text-sm text-[#aaadb0]">Lower initial investment (CO₂)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 border-[#0000001a] backdrop-blur-md text-white shadow-lg hover:shadow-[#9b87f5]/5 transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#0EA5E9]">
                <Wind className="mr-2 h-5 w-5" />
                CO₂ Injection
              </CardTitle>
              <CardDescription className="text-[#aaadb0]">Supercritical carbon dioxide flooding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#0EA5E9]">49%</div>
              <p className="text-sm text-[#aaadb0]">Maximum recovery efficiency</p>
              <div className="mt-4 flex items-center text-[#33C3F0] text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>0.6 tonnes CO₂ sequestered per barrel</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expert Mode Section */}
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out mb-12
            ${expertMode ? "max-h-[2000px] opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-10"}
          `}
        >
          {expertMode && (
            <div className="bg-[#1A1F2C]/40 border border-[#0000001a] rounded-xl backdrop-blur-md p-6 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-[#9b87f5]/20 px-4 py-1 rounded-full mb-2">
                  <Microscope className="mr-2 h-4 w-4 text-[#9b87f5]" />
                  <span className="text-[#9b87f5] text-sm font-medium">Expert Analysis</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Technical Performance Indicators</h3>
                <p className="text-[#aaadb0] max-w-2xl mx-auto mt-2">
                  Detailed technical analysis of recovery mechanisms and performance factors for petroleum engineers and
                  researchers
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Gauge className="mr-2 h-5 w-5 text-[#9b87f5]" />
                    Reservoir Performance Factors
                  </h4>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={reservoirFactorsData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis type="number" stroke="#aaadb0" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" stroke="#aaadb0" width={150} tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#0000001a",
                            borderRadius: "8px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                          }}
                          labelStyle={{ color: "#ffffff" }}
                          itemStyle={{ color: "#ffffff" }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: "#aaadb0",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="nano" name="Nano EOR" fill="#9b87f5" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="co2" name="CO₂ Injection" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-[#9b87f5]" />
                    Risk Assessment
                  </h4>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={isMobile ? 100 : 150} width={500} height={400} data={riskAssessmentData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: "#aaadb0" }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#aaadb0" }} />
                        <Radar name="Nano EOR" dataKey="nano" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.5} />
                        <Radar name="CO₂ Injection" dataKey="co2" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.5} />
                        <Legend
                          wrapperStyle={{
                            color: "#aaadb0",
                            fontSize: "12px",
                          }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#0000001a",
                            borderRadius: "8px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                          }}
                          labelStyle={{ color: "#ffffff" }}
                          itemStyle={{ color: "#ffffff" }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-[#9b87f5]" />
                    Technical Challenges (Nano EOR)
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={technicalChallengesData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ nik,percent}) => `${nik} ${(percent * 100).toFixed(0)}%`}
                          labelLine={{ stroke: "#aaadb0", strokeWidth: 1 }}
                        >
                          {technicalChallengesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#0000001a",
                            borderRadius: "8px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                          }}
                          
                          labelStyle={{ color: "#ffffff" }}
                          itemStyle={{ color: "#ffffff" }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h4 className="text-xl font-semibold text-white mb-4">Field Case Studies</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr className="border-b border-[#0000001a]">
                          <th className="px-3 py-3 text-left text-[#aaadb0] font-medium text-sm">Field</th>
                          <th className="px-3 py-3 text-left text-[#aaadb0] font-medium text-sm">Formation</th>
                          <th className="px-3 py-3 text-center text-[#9b87f5] font-medium text-sm">Nano Recovery</th>
                          <th className="px-3 py-3 text-center text-[#0EA5E9] font-medium text-sm">CO₂ Recovery</th>
                          <th className="px-3 py-3 text-center text-[#aaadb0] font-medium text-sm">Challenges</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fieldCaseStudies.map((study, i) => (
                          <tr key={i} className="border-b border-[#0000001a]/20">
                            <td className="px-3 py-3 text-white text-sm">
                              <div className="font-medium">{study.field}</div>
                              <div className="text-xs text-[#aaadb0]">
                                {study.depth}, {study.porosity} porosity
                              </div>
                            </td>
                            <td className="px-3 py-3 text-[#aaadb0] text-sm">{study.formation}</td>
                            <td className="px-3 py-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="text-[#9b87f5] font-medium">{study.nanoRecovery}%</span>
                                <div className="w-16 bg-[#1A1F2C] rounded-full h-1.5 mt-1">
                                  <div
                                    className="bg-[#9b87f5] h-1.5 rounded-full"
                                    style={{ width: `${study.nanoRecovery}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="text-[#0EA5E9] font-medium">{study.co2Recovery}%</span>
                                <div className="w-16 bg-[#1A1F2C] rounded-full h-1.5 mt-1">
                                  <div
                                    className="bg-[#0EA5E9] h-1.5 rounded-full"
                                    style={{ width: `${study.co2Recovery}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-3 text-center">
                              <span
                                className={`
                                inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                                ${
                                  study.challenges === "High" || study.challenges === "Very High"
                                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                }
                              `}
                              >
                                {study.challenges}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#1A1F2C]/70 flex md:flex-row md:space-y-0 space-y-3 mt-5 mb-5 flex-col w-full  backdrop-blur-md p-1 border border-[#0000001a]">
              <TabsTrigger
                value="efficiency"
                className="data-[state=active]:bg-[#9b87f5] w-full  data-[state=active]:text-white text-[#aaadb0] min-w-[180px] transition-colors"
              >
                <BarChart4 className="mr-2 h-4 w-4" />
                Recovery Efficiency
              </TabsTrigger>
              <TabsTrigger
                value="costs"
                className="data-[state=active]:bg-[#9b87f5] w-full data-[state=active]:text-white text-[#aaadb0] min-w-[180px] transition-colors"
              >
                <LineChart className="mr-2 h-4 w-4" />
                Economic Analysis
              </TabsTrigger>
              <TabsTrigger
                value="sustainability"
                className="data-[state=active]:bg-[#9b87f5] w-full data-[state=active]:text-white text-[#aaadb0] min-w-[180px] transition-colors"
              >
                <PieChart className="mr-2 h-4 w-4" />
                Sustainability
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-[#1A1F2C]/30 border border-[#0000001a] rounded-xl backdrop-blur-md p-8 shadow-xl">
            <TabsContent value="efficiency" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-6">Recovery Efficiency Over Time</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={efficiencyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="month" stroke="#aaadb0" />
                        <YAxis stroke="#aaadb0" unit="%" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#0000001a",
                            borderRadius: "8px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                          }}
                          labelStyle={{ color: "#ffffff" }}
                          itemStyle={{ color: "#ffffff" }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: "#aaadb0",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="nano"
                          name="Nano EOR"
                          stroke="#9b87f5"
                          strokeWidth={3}
                          dot={{ stroke: "#9b87f5", strokeWidth: 2, r: 4, fill: "#1A1F2C" }}
                          activeDot={{ r: 8, fill: "#9b87f5" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="co2"
                          name="CO₂ Injection"
                          stroke="#0EA5E9"
                          strokeWidth={3}
                          dot={{ stroke: "#0EA5E9", strokeWidth: 2, r: 4, fill: "#1A1F2C" }}
                          activeDot={{ r: 8, fill: "#0EA5E9" }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <h3 className="text-xl font-semibold text-white mb-6">Recovery by Oil Type</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={recoveryRateData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis type="number" stroke="#aaadb0" unit="%" />
                        <YAxis dataKey="name" type="category" stroke="#aaadb0" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#0000001a",
                            borderRadius: "8px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                          }}
                          labelStyle={{ color: "#ffffff" }}
                          itemStyle={{ color: "#ffffff" }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: "#aaadb0",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="nano" name="Nano EOR" fill="#9b87f5" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="co2" name="CO₂ Injection" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="costs" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Cost Comparison by Category</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#aaadb0" />
                        <YAxis stroke="#aaadb0" unit="k$" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#0000001a",
                            borderRadius: "8px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                          }}
                          labelStyle={{ color: "#ffffff" }}
                          itemStyle={{ color: "#ffffff" }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: "#aaadb0",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="nano" name="Nano EOR" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="co2" name="CO₂ Injection" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Return on Investment Over Time</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { year: "2023", nano: -100, co2: -80 },
                          { year: "2024", nano: -40, co2: -30 },
                          { year: "2025", nano: 20, co2: 10 },
                          { year: "2026", nano: 60, co2: 40 },
                          { year: "2027", nano: 110, co2: 65 },
                          { year: "2028", nano: 160, co2: 85 },
                          { year: "2029", nano: 200, co2: 100 },
                          { year: "2030", nano: 250, co2: 110 },
                        ]}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="nanoGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="year" stroke="#aaadb0" />
                        <YAxis stroke="#aaadb0" unit="%" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#0000001a",
                            borderRadius: "8px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                          }}
                          labelStyle={{ color: "#ffffff" }}
                          itemStyle={{ color: "#ffffff" }}
                        />
                        <Legend
                          wrapperStyle={{
                            color: "#aaadb0",
                            fontSize: "12px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="nano"
                          name="Nano EOR ROI"
                          stroke="#9b87f5"
                          fillOpacity={1}
                          fill="url(#nanoGradient)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="co2"
                          name="CO₂ Injection ROI"
                          stroke="#0EA5E9"
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-6">Environmental Impact Comparison</h3>
                  <div className="bg-[#0f1623]/70 rounded-lg p-4 sm:p-8 mb-6 border border-[#0000001a] backdrop-blur-md">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                      <div className="mb-4 md:mb-0">
                        <h4 className="font-medium text-white">Sustainability Score</h4>
                        <p className="text-sm text-[#aaadb0]">Lower scores indicate better environmental performance</p>
                      </div>
                      <div className="flex pb-3 space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-2"></div>
                          <span className="text-sm text-[#aaadb0]">Nano EOR</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#0EA5E9] mr-2"></div>
                          <span className="text-sm text-[#aaadb0]">CO₂ Injection</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className={`${isMobile ? "h-[250px]" : "h-[300px]"} w-full`}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius={isMobile ? "30%" : "20%"}
                            outerRadius={isMobile ? "90%" : "80%"}
                            barSize={isMobile ? 15 : 20}
                            data={sustainabilityData}
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar
                              label={{
                                fill: "#fff",
                                position: "insideStart",
                                fontSize: isMobile ? 10 : 12,
                              }}
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
                                color: "#aaadb0",
                                fontSize: isMobile ? "10px" : "12px",
                                marginTop: isMobile ? "1rem" : "3rem",
                              }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1A1F2C",
                                borderColor: "#0000001a",
                                borderRadius: "8px",
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                              }}
                              labelStyle={{ color: "#ffffff" }}
                              formatter={(value) => [`${value}`, "Score"]}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-2 text-[#0EA5E9] text-sm font-medium">CO₂ Injection</div>
                      </div>
                      <div className={`${isMobile ? "h-[250px]" : "h-[300px]"} w-full`}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius={isMobile ? "30%" : "20%"}
                            outerRadius={isMobile ? "90%" : "80%"}
                            barSize={isMobile ? 15 : 20}
                            data={sustainabilityDataNano}
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar
                              label={{
                                fill: "#fff",
                                position: "insideStart",
                                fontSize: isMobile ? 10 : 12,
                              }}
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
                                color: "#aaadb0",
                                fontSize: isMobile ? "10px" : "12px",
                                marginTop: isMobile ? "1rem" : "3rem",
                              }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#1A1F2C",
                                borderColor: "#0000001a",
                                borderRadius: "8px",
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                              }}
                              labelStyle={{ color: "#ffffff" }}
                              formatter={(value) => [`${value}`, "Score"]}
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-2 text-[#9b87f5] text-sm font-medium">Nano EOR</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <h3 className="text-xl font-semibold text-white mb-6">Carbon Balance</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: "Sequestration", value: 60 },
                            { name: "Process Emissions", value: 15 },
                            { name: "Net Impact", value: 45 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          dataKey="value"
                          label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                            const RADIAN = Math.PI / 180
                            const radius = 25 + innerRadius + (outerRadius - innerRadius)
                            const x = cx + radius * Math.cos(-midAngle * RADIAN)
                            const y = cy + radius * Math.sin(-midAngle * RADIAN)

                            return (
                              <text
                                x={x}
                                y={y}
                                fill="#fff"
                                textAnchor={x > cx ? "start" : "end"}
                                dominantBaseline="central"
                              >
                                {["Sequestration", "Process Emissions", "Net Impact"][index]} ({value})
                              </text>
                            )
                          }}
                        >
                          {[0, 1, 2].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1F2C",
                            borderColor: "#0000001a",
                            borderRadius: "8px",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                          }}
                          labelStyle={{ color: "#ffffff" }}
                          itemStyle={{ color: "#ffffff" }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-[#1A1F2C]/60 p-6 rounded-lg mt-4 border border-[#0000001a] backdrop-blur-md shadow-lg">
                    <h4 className="text-white font-medium mb-2">CO₂ Carbon Advantage</h4>
                    <p className="text-[#aaadb0] text-sm">
                      CO₂ injection provides a significant carbon offset that can be credited against production
                      emissions, resulting in lower overall carbon intensity per barrel compared to other EOR methods.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">Key Performance Metrics</h3>
          <div className="bg-[#1A1F2C]/30 border border-[#0000001a] rounded-xl backdrop-blur-md p-6 shadow-xl overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#0000001a]">
                  <th className="px-6 py-4 text-left text-[#aaadb0] font-medium">Metric</th>
                  <th className="px-6 py-4 text-center text-[#9b87f5] font-medium">Nano EOR</th>
                  <th className="px-6 py-4 text-center text-[#0EA5E9] font-medium">CO₂ Injection</th>
                  <th className="px-6 py-4 text-left text-[#aaadb0] font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {keyMetrics.map((metric, i) => (
                  <tr key={i} className="border-b border-[#0000001a]/20">
                    <td className="px-6 py-4 text-white font-medium">{metric.title}</td>
                    <td
                      className={`px-6 py-4 text-center ${metric.winner === "nano" ? "text-[#9b87f5] font-medium" : "text-[#aaadb0]"}`}
                    >
                      {metric.nano}
                      {metric.winner === "nano" && (
                        <div className="flex justify-center mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#9b87f5]/10 text-[#9b87f5] border border-[#9b87f5]/20">
                            Preferred
                          </span>
                        </div>
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 text-center ${metric.winner === "co2" ? "text-[#0EA5E9] font-medium" : "text-[#aaadb0]"}`}
                    >
                      {metric.co2}
                      {metric.winner === "co2" && (
                        <div className="flex justify-center mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20">
                            Preferred
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#aaadb0] text-sm">{metric.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-[#9b87f5] hover:bg-[#8a74e8] text-white border-none shadow-lg shadow-[#9b87f5]/20">
            <Download className="mr-2 h-4 w-4" />
            Download Full Report
          </Button>
          <Button
            variant="outline"
            className="border-[#9b87f5]/30 text-[#9b87f5] hover:bg-[#9b87f5]/10 backdrop-blur-sm"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Comparison Data
          </Button>
        </div>
      </div>
    </section>
  )
}

export default EORComparisonVisualizations

// "use client"
// import { useState } from "react";
// import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Beaker, Wind, BarChart4, LineChart, PieChart, ArrowUpRight, Download, Share2 } from "lucide-react";
// import { useIsMobile } from "@/../hooks/use-mobile";
// import {
//   LineChart as RechartsLineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   RadialBarChart,
//   RadialBar,
//   PieChart as RechartsPieChart,
//   Pie,
//   AreaChart,
//   Area,
//   Cell
// } from "recharts";

// const efficiencyData = [
//   { month: "Month 1", nano: 18, co2: 12 },
//   { month: "Month 2", nano: 28, co2: 20 },
//   { month: "Month 3", nano: 38, co2: 27 },
//   { month: "Month 4", nano: 45, co2: 33 },
//   { month: "Month 5", nano: 50, co2: 37 },
//   { month: "Month 6", nano: 54, co2: 40 },
//   { month: "Month 7", nano: 57, co2: 43 },
//   { month: "Month 8", nano: 60, co2: 45 },
//   { month: "Month 9", nano: 62, co2: 46 },
//   { month: "Month 10", nano: 63, co2: 47 },
//   { month: "Month 11", nano: 64, co2: 48 },
//   { month: "Month 12", nano: 65, co2: 49 },
// ];

// const costData = [
//   { name: "Setup Cost", nano: 90, co2: 70 },
//   { name: "Operational Cost", nano: 50, co2: 65 },
//   { name: "Maintenance", nano: 40, co2: 55 },
//   { name: "Material Cost", nano: 75, co2: 45 },
//   { name: "Environmental", nano: 25, co2: 50 },
// ];

// const sustainabilityData = [
//   { name: "Carbon Footprint", value: 70, fill: "#0ea5e9" },
//   { name: "Water Usage", value: 50, fill: "#0369a1" },
//   { name: "Chemical Usage", value: 35, fill: "#0c4a6e" },
//   { name: "Energy Consumption", value: 60, fill: "#075985" },
// ];

// const sustainabilityDataNano = [
//   { name: "Carbon Footprint", value: 45, fill: "#6366f1" },
//   { name: "Water Usage", value: 30, fill: "#4f46e5" },
//   { name: "Chemical Usage", value: 65, fill: "#4338ca" },
//   { name: "Energy Consumption", value: 50, fill: "#3730a3" },
// ];

// const recoveryRateData = [
//   { name: "Light Oil", co2: 45, nano: 58 },
//   { name: "Medium Oil", co2: 40, nano: 53 },
//   { name: "Heavy Oil", co2: 28, nano: 43 },
//   { name: "Extra Heavy", co2: 18, nano: 35 },
// ];

// const riskAssessmentData = [
//   { name: "Technical", co2: 70, nano: 80, fullMark: 100 },
//   { name: "Financial", co2: 75, nano: 65, fullMark: 100 },
//   { name: "Operational", co2: 85, nano: 70, fullMark: 100 },
//   { name: "Environmental", co2: 65, nano: 85, fullMark: 100 },
//   { name: "Regulatory", co2: 80, nano: 70, fullMark: 100 },
// ];

// const keyMetrics = [
//   {
//     title: "Recovery Efficiency",
//     nano: "65%",
//     co2: "49%",
//     winner: "nano",
//     description: "Maximum achievable recovery from depleted reservoirs"
//   },
//   {
//     title: "Implementation Cost",
//     nano: "$400k-$550k",
//     co2: "$300k-$400k",
//     winner: "co2",
//     description: "Average cost for a medium-sized reservoir"
//   },
//   {
//     title: "Environmental Impact",
//     nano: "Medium-High",
//     co2: "Low-Medium",
//     winner: "co2",
//     description: "Overall environmental footprint"
//   },
//   {
//     title: "Technical Complexity",
//     nano: "High",
//     co2: "Medium",
//     winner: "co2",
//     description: "Required technical expertise and infrastructure"
//   },
//   {
//     title: "Long-term Performance",
//     nano: "Excellent",
//     co2: "Good",
//     winner: "nano",
//     description: "Sustained performance over reservoir lifetime"
//   },
// ];

// const EORComparisonVisualizations = () => {
//   const [activeTab, setActiveTab] = useState("efficiency");
//   const isMobile = useIsMobile();

//   const pieChartColors = [
//     "#9b87f5", // Primary Purple
//     "#0EA5E9", // Ocean Blue
//     "#33C3F0", // Sky Blue
//     "#E5DEFF", // Soft Purple
//     "#aaadb0", // Cool Gray
//     "#1A1F2C", // Dark Purple
//   ];

//   return (
//     <section className="w-full bg-gradient-to-b from-[#1A1F2C] to-[#0f1623] py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-16">
//           <div className="inline-block bg-[#9b87f5]/10 px-4 py-1 rounded-full mb-4">
//             <span className="text-[#9b87f5] text-sm font-medium">Advanced Comparison</span>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
//             CO₂ vs Nano EOR Analysis
//           </h2>
//           <p className="text-[#aaadb0] max-w-3xl mx-auto text-lg">
//             Quantitative assessment of performance metrics across different recovery methods based on
//             field studies and laboratory data.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <Card className="bg-[#1A1F2C]/80 border-[#0000001a] backdrop-blur-md text-white shadow-lg hover:shadow-[#9b87f5]/5 transition-shadow duration-300">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center text-[#9b87f5]">
//                 <Beaker className="mr-2 h-5 w-5" />
//                 Nano EOR
//               </CardTitle>
//               <CardDescription className="text-[#aaadb0]">
//                 Engineered nanoparticles for enhanced recovery
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-4xl font-bold text-[#9b87f5]">65%</div>
//               <p className="text-sm text-[#aaadb0]">Maximum recovery efficiency</p>
//               <div className="mt-4 flex items-center text-[#33C3F0] text-sm">
//                 <ArrowUpRight className="mr-1 h-4 w-4" />
//                 <span>41% higher than conventional methods</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-[#1A1F2C]/60 border-[#0000001a] backdrop-blur-md text-white shadow-lg hover:shadow-[#9b87f5]/5 transition-shadow duration-300">
//             <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
//               <div>
//                 <CardTitle className="text-white">Key Advantages</CardTitle>
//                 <CardDescription className="text-[#aaadb0]">
//                   Comparative strengths of each method
//                 </CardDescription>
//               </div>
//             </CardHeader>
//             <CardContent className="pt-0">
//               <div className="space-y-3">
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 rounded-full bg-[#9b87f5] mr-3"></div>
//                   <span className="text-sm text-[#aaadb0]">Higher viscosity reduction (Nano)</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></div>
//                   <span className="text-sm text-[#aaadb0]">Carbon sequestration potential (CO₂)</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 rounded-full bg-[#9b87f5] mr-3"></div>
//                   <span className="text-sm text-[#aaadb0]">Wettability modification (Nano)</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 rounded-full bg-[#0EA5E9] mr-3"></div>
//                   <span className="text-sm text-[#aaadb0]">Lower initial investment (CO₂)</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-[#1A1F2C]/80 border-[#0000001a] backdrop-blur-md text-white shadow-lg hover:shadow-[#9b87f5]/5 transition-shadow duration-300">
//             <CardHeader className="pb-2">
//               <CardTitle className="flex items-center text-[#0EA5E9]">
//                 <Wind className="mr-2 h-5 w-5" />
//                 CO₂ Injection
//               </CardTitle>
//               <CardDescription className="text-[#aaadb0]">
//                 Supercritical carbon dioxide flooding
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-4xl font-bold text-[#0EA5E9]">49%</div>
//               <p className="text-sm text-[#aaadb0]">Maximum recovery efficiency</p>
//               <div className="mt-4 flex items-center text-[#33C3F0] text-sm">
//                 <ArrowUpRight className="mr-1 h-4 w-4" />
//                 <span>0.6 tonnes CO₂ sequestered per barrel</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <div className="flex justify-center mb-8">
//             <TabsList className="bg-[#1A1F2C]/70 flex md:flex-row md:space-y-0 space-y-3 mt-5 mb-5 flex-col w-full  backdrop-blur-md p-1 border border-[#0000001a]">
//               <TabsTrigger
//                 value="efficiency"
//                 className="data-[state=active]:bg-[#9b87f5] w-full  data-[state=active]:text-white text-[#aaadb0] min-w-[180px] transition-colors"
//               >
//                 <BarChart4 className="mr-2 h-4 w-4" />
//                 Recovery Efficiency
//               </TabsTrigger>
//               <TabsTrigger
//                 value="costs"
//                 className="data-[state=active]:bg-[#9b87f5] w-full data-[state=active]:text-white text-[#aaadb0] min-w-[180px] transition-colors"
//               >
//                 <LineChart className="mr-2 h-4 w-4" />
//                 Economic Analysis
//               </TabsTrigger>
//               <TabsTrigger
//                 value="sustainability"
//                 className="data-[state=active]:bg-[#9b87f5] w-full data-[state=active]:text-white text-[#aaadb0] min-w-[180px] transition-colors"
//               >
//                 <PieChart className="mr-2 h-4 w-4" />
//                 Sustainability
//               </TabsTrigger>
//             </TabsList>
//           </div>

//           <div className="bg-[#1A1F2C]/30 border border-[#0000001a] rounded-xl backdrop-blur-md p-8 shadow-xl">
//             <TabsContent value="efficiency" className="mt-0">
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//                 <div className="lg:col-span-2">
//                   <h3 className="text-xl font-semibold text-white mb-6">Recovery Efficiency Over Time</h3>
//                   <div className="h-[400px] w-full">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <RechartsLineChart data={efficiencyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
//                         <XAxis dataKey="month" stroke="#aaadb0" />
//                         <YAxis stroke="#aaadb0" unit="%" />
//                         <Tooltip
//                           contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#0000001a', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}
//                           labelStyle={{ color: '#ffffff' }}
//                           itemStyle={{ color: '#ffffff' }}
//                         />
//                         <Legend
//                           wrapperStyle={{
//                             color: '#aaadb0',
//                             fontSize: '12px'
//                           }}
//                         />
//                         <Line
//                           type="monotone"
//                           dataKey="nano"
//                           name="Nano EOR"
//                           stroke="#9b87f5"
//                           strokeWidth={3}
//                           dot={{ stroke: '#9b87f5', strokeWidth: 2, r: 4, fill: '#1A1F2C' }}
//                           activeDot={{ r: 8, fill: '#9b87f5' }}
//                         />
//                         <Line
//                           type="monotone"
//                           dataKey="co2"
//                           name="CO₂ Injection"
//                           stroke="#0EA5E9"
//                           strokeWidth={3}
//                           dot={{ stroke: '#0EA5E9', strokeWidth: 2, r: 4, fill: '#1A1F2C' }}
//                           activeDot={{ r: 8, fill: '#0EA5E9' }}
//                         />
//                       </RechartsLineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 <div className="lg:col-span-1">
//                   <h3 className="text-xl font-semibold text-white mb-6">Recovery by Oil Type</h3>
//                   <div className="h-[400px] w-full">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={recoveryRateData}
//                         layout="vertical"
//                         margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
//                         <XAxis type="number" stroke="#aaadb0" unit="%" />
//                         <YAxis dataKey="name" type="category" stroke="#aaadb0" />
//                         <Tooltip
//                           contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#0000001a', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}
//                           labelStyle={{ color: '#ffffff' }}
//                           itemStyle={{ color: '#ffffff' }}
//                         />
//                         <Legend
//                           wrapperStyle={{
//                             color: '#aaadb0',
//                             fontSize: '12px'
//                           }}
//                         />
//                         <Bar
//                           dataKey="nano"
//                           name="Nano EOR"
//                           fill="#9b87f5"
//                           radius={[0, 4, 4, 0]}
//                         />
//                         <Bar
//                           dataKey="co2"
//                           name="CO₂ Injection"
//                           fill="#0EA5E9"
//                           radius={[0, 4, 4, 0]}
//                         />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="costs" className="mt-0">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//                 <div>
//                   <h3 className="text-xl font-semibold text-white mb-6">Cost Comparison by Category</h3>
//                   <div className="h-[400px] w-full">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={costData}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
//                         <XAxis dataKey="name" stroke="#aaadb0" />
//                         <YAxis stroke="#aaadb0" unit="k$" />
//                         <Tooltip
//                           contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#0000001a', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}
//                           labelStyle={{ color: '#ffffff' }}
//                           itemStyle={{ color: '#ffffff' }}
//                         />
//                         <Legend
//                           wrapperStyle={{
//                             color: '#aaadb0',
//                             fontSize: '12px'
//                           }}
//                         />
//                         <Bar
//                           dataKey="nano"
//                           name="Nano EOR"
//                           fill="#9b87f5"
//                           radius={[4, 4, 0, 0]}
//                         />
//                         <Bar
//                           dataKey="co2"
//                           name="CO₂ Injection"
//                           fill="#0EA5E9"
//                           radius={[4, 4, 0, 0]}
//                         />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-white mb-6">Return on Investment Over Time</h3>
//                   <div className="h-[400px] w-full">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart
//                         data={[
//                           { year: '2023', nano: -100, co2: -80 },
//                           { year: '2024', nano: -40, co2: -30 },
//                           { year: '2025', nano: 20, co2: 10 },
//                           { year: '2026', nano: 60, co2: 40 },
//                           { year: '2027', nano: 110, co2: 65 },
//                           { year: '2028', nano: 160, co2: 85 },
//                           { year: '2029', nano: 200, co2: 100 },
//                           { year: '2030', nano: 250, co2: 110 },
//                         ]}
//                         margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
//                       >
//                         <defs>
//                           <linearGradient id="nanoGradient" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
//                             <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
//                           </linearGradient>
//                           <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
//                             <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1} />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
//                         <XAxis dataKey="year" stroke="#aaadb0" />
//                         <YAxis stroke="#aaadb0" unit="%" />
//                         <Tooltip
//                           contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#0000001a', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}
//                           labelStyle={{ color: '#ffffff' }}
//                           itemStyle={{ color: '#ffffff' }}
//                         />
//                         <Legend
//                           wrapperStyle={{
//                             color: '#aaadb0',
//                             fontSize: '12px'
//                           }}
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="nano"
//                           name="Nano EOR ROI"
//                           stroke="#9b87f5"
//                           fillOpacity={1}
//                           fill="url(#nanoGradient)"
//                           strokeWidth={2}
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="co2"
//                           name="CO₂ Injection ROI"
//                           stroke="#0EA5E9"
//                           fillOpacity={1}
//                           fill="url(#co2Gradient)"
//                           strokeWidth={2}
//                         />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="sustainability" className="mt-0">
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//                 <div className="lg:col-span-2">
//                   <h3 className="text-xl font-semibold text-white mb-6">Environmental Impact Comparison</h3>
//                   <div className="bg-[#0f1623]/70 rounded-lg p-4 sm:p-8 mb-6 border border-[#0000001a] backdrop-blur-md">
//                     <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//                       <div className="mb-4 md:mb-0">
//                         <h4 className="font-medium text-white">Sustainability Score</h4>
//                         <p className="text-sm text-[#aaadb0]">Lower scores indicate better environmental performance</p>
//                       </div>
//                       <div className="flex pb-3 space-x-4">
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-2"></div>
//                           <span className="text-sm text-[#aaadb0]">Nano EOR</span>
//                         </div>
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 rounded-full bg-[#0EA5E9] mr-2"></div>
//                           <span className="text-sm text-[#aaadb0]">CO₂ Injection</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//                       <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'} w-full`}>
//                         <ResponsiveContainer width="100%" height="100%">
//                           <RadialBarChart
//                             cx="50%"
//                             cy="50%"
//                             innerRadius={isMobile ? "30%" : "20%"}
//                             outerRadius={isMobile ? "90%" : "80%"}
//                             barSize={isMobile ? 15 : 20}
//                             data={sustainabilityData}
//                             startAngle={180}
//                             endAngle={0}
//                           >
//                             <RadialBar
//                               label={{ 
//                                 fill: '#fff', 
//                                 position: 'insideStart',
//                                 fontSize: isMobile ? 10 : 12
//                               }}
//                               background
//                               dataKey="value"
//                               cornerRadius={8}
//                             />
//                             <Legend
//                               iconSize={10}
//                               layout="vertical"
//                               className="absolute"
//                               verticalAlign="middle"
//                               align="left"
//                               wrapperStyle={{
//                                 color: '#aaadb0',
//                                 fontSize: isMobile ? '10px' : '12px',
//                                 marginTop: isMobile ? '1rem' : '3rem',
//                               }}
//                             />
//                             <Tooltip
//                               contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#0000001a', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}
//                               labelStyle={{ color: '#ffffff' }}
//                               formatter={(value) => [`${value}`, 'Score']}
//                             />
//                           </RadialBarChart>
//                         </ResponsiveContainer>
//                         <div className="text-center mt-2 text-[#0EA5E9] text-sm font-medium">CO₂ Injection</div>
//                       </div>
//                       <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'} w-full`}>
//                         <ResponsiveContainer width="100%" height="100%">
//                           <RadialBarChart
//                             cx="50%"
//                             cy="50%"
//                             innerRadius={isMobile ? "30%" : "20%"}
//                             outerRadius={isMobile ? "90%" : "80%"}
//                             barSize={isMobile ? 15 : 20}
//                             data={sustainabilityDataNano}
//                             startAngle={180}
//                             endAngle={0}
//                           >
//                             <RadialBar
//                               label={{ 
//                                 fill: '#fff', 
//                                 position: 'insideStart',
//                                 fontSize: isMobile ? 10 : 12
//                               }}
//                               background
//                               dataKey="value"
//                               cornerRadius={8}
//                             />
//                             <Legend
//                               iconSize={10}
//                               layout="vertical"
//                               verticalAlign="middle"
//                               align="left"
//                               wrapperStyle={{
//                                 color: '#aaadb0',
//                                 fontSize: isMobile ? '10px' : '12px',
//                                 marginTop: isMobile ? '1rem' : '3rem',
//                               }}
//                             />
//                             <Tooltip
//                               contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#0000001a', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}
//                               labelStyle={{ color: '#ffffff' }}
//                               formatter={(value) => [`${value}`, 'Score']}
//                             />
//                           </RadialBarChart>
//                         </ResponsiveContainer>
//                         <div className="text-center mt-2 text-[#9b87f5] text-sm font-medium">Nano EOR</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="lg:col-span-1">
//                   <h3 className="text-xl font-semibold text-white mb-6">Carbon Balance</h3>
//                   <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <RechartsPieChart>
//                         <Pie
//                           data={[
//                             { name: 'Sequestration', value: 60 },
//                             { name: 'Process Emissions', value: 15 },
//                             { name: 'Net Impact', value: 45 },
//                           ]}
//                           cx="50%"
//                           cy="50%"
//                           labelLine={false}
//                           outerRadius={80}
//                           dataKey="value"
//                           label={({
//                             cx,
//                             cy,
//                             midAngle,
//                             innerRadius,
//                             outerRadius,
//                             value,
//                             index
//                           }) => {
//                             const RADIAN = Math.PI / 180;
//                             const radius = 25 + innerRadius + (outerRadius - innerRadius);
//                             const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                             const y = cy + radius * Math.sin(-midAngle * RADIAN);

//                             return (
//                               <text
//                                 x={x}
//                                 y={y}
//                                 fill="#fff"
//                                 textAnchor={x > cx ? "start" : "end"}
//                                 dominantBaseline="central"
//                               >
//                                 {['Sequestration', 'Process Emissions', 'Net Impact'][index]} ({value})
//                               </text>
//                             );
//                           }}
//                         >
//                           {[0, 1, 2].map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip
//                           contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#0000001a', borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}
//                           labelStyle={{ color: '#ffffff' }}
//                           itemStyle={{ color: '#ffffff' }}
//                         />
//                       </RechartsPieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="bg-[#1A1F2C]/60 p-6 rounded-lg mt-4 border border-[#0000001a] backdrop-blur-md shadow-lg">
//                     <h4 className="text-white font-medium mb-2">CO₂ Carbon Advantage</h4>
//                     <p className="text-[#aaadb0] text-sm">
//                       CO₂ injection provides a significant carbon offset that can be credited against production emissions, resulting
//                       in lower overall carbon intensity per barrel compared to other EOR methods.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
//           </div>
//         </Tabs>

//         <div className="mt-16">
//           <h3 className="text-2xl font-semibold text-white mb-8 text-center">Key Performance Metrics</h3>
//           <div className="bg-[#1A1F2C]/30 border border-[#0000001a] rounded-xl backdrop-blur-md p-6 shadow-xl overflow-x-auto">
//             <table className="w-full min-w-[600px]">
//               <thead>
//                 <tr className="border-b border-[#0000001a]">
//                   <th className="px-6 py-4 text-left text-[#aaadb0] font-medium">Metric</th>
//                   <th className="px-6 py-4 text-center text-[#9b87f5] font-medium">Nano EOR</th>
//                   <th className="px-6 py-4 text-center text-[#0EA5E9] font-medium">CO₂ Injection</th>
//                   <th className="px-6 py-4 text-left text-[#aaadb0] font-medium">Notes</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {keyMetrics.map((metric, i) => (
//                   <tr key={i} className="border-b border-[#0000001a]/20">
//                     <td className="px-6 py-4 text-white font-medium">{metric.title}</td>
//                     <td className={`px-6 py-4 text-center ${metric.winner === 'nano' ? 'text-[#9b87f5] font-medium' : 'text-[#aaadb0]'}`}>
//                       {metric.nano}
//                       {metric.winner === 'nano' && (
//                         <div className="flex justify-center mt-1">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#9b87f5]/10 text-[#9b87f5] border border-[#9b87f5]/20">
//                             Preferred
//                           </span>
//                         </div>
//                       )}
//                     </td>
//                     <td className={`px-6 py-4 text-center ${metric.winner === 'co2' ? 'text-[#0EA5E9] font-medium' : 'text-[#aaadb0]'}`}>
//                       {metric.co2}
//                       {metric.winner === 'co2' && (
//                         <div className="flex justify-center mt-1">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20">
//                             Preferred
//                           </span>
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-[#aaadb0] text-sm">{metric.description}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
//           <Button className="bg-[#9b87f5] hover:bg-[#8a74e8] text-white border-none shadow-lg shadow-[#9b87f5]/20">
//             <Download className="mr-2 h-4 w-4" />
//             Download Full Report
//           </Button>
//           <Button variant="outline" className="border-[#9b87f5]/30 text-[#9b87f5] hover:bg-[#9b87f5]/10 backdrop-blur-sm">
//             <Share2 className="mr-2 h-4 w-4" />
//             Share Comparison Data
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EORComparisonVisualizations;