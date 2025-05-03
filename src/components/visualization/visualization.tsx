"use client"
import { useState, useEffect } from "react"
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

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
// ]
const efficiencyData = [
  { month: "Month 1", nano: 18, co2: 12, polymer: 14, surfactant: 16 },
  { month: "Month 2", nano: 28, co2: 20, polymer: 23, surfactant: 25 },
  { month: "Month 3", nano: 38, co2: 27, polymer: 33, surfactant: 36 },
  { month: "Month 4", nano: 45, co2: 33, polymer: 39, surfactant: 42 },
  { month: "Month 5", nano: 50, co2: 37, polymer: 45, surfactant: 47 },
  { month: "Month 6", nano: 54, co2: 40, polymer: 48, surfactant: 51 },
  { month: "Month 7", nano: 57, co2: 43, polymer: 51, surfactant: 54 },
  { month: "Month 8", nano: 60, co2: 45, polymer: 54, surfactant: 57 },
  { month: "Month 9", nano: 62, co2: 46, polymer: 56, surfactant: 59 },
  { month: "Month 10", nano: 63, co2: 47, polymer: 58, surfactant: 60 },
  { month: "Month 11", nano: 64, co2: 48, polymer: 59, surfactant: 61 },
  { month: "Month 12", nano: 65, co2: 49, polymer: 60, surfactant: 62 },
]
const costData = [
  { name: "Setup Cost", nano: 90, co2: 70, polymer: 60, surfactant: 75 },
  { name: "Operational Cost", nano: 50, co2: 65, polymer: 55, surfactant: 68 },
  { name: "Maintenance", nano: 40, co2: 55, polymer: 50, surfactant: 52 },
  { name: "Material Cost", nano: 75, co2: 45, polymer: 60, surfactant: 78 },
  { name: "Environmental", nano: 25, co2: 50, polymer: 40, surfactant: 35 },
]

// Update the sustainability data to make Nano EOR have the lowest environmental impact
const sustainabilityDataNano = [
  { name: "Carbon Footprint", value: 35, fill: "#6366f1" },
  { name: "Water Usage", value: 25, fill: "#4f46e5" },
  { name: "Chemical Usage", value: 40, fill: "#4338ca" },
  { name: "Energy Consumption", value: 30, fill: "#3730a3" },
]

const sustainabilityDataCO2 = [
  { name: "Carbon Footprint", value: 70, fill: "#0ea5e9" },
  { name: "Water Usage", value: 50, fill: "#0369a1" },
  { name: "Chemical Usage", value: 35, fill: "#0c4a6e" },
  { name: "Energy Consumption", value: 60, fill: "#075985" },
]

const sustainabilityDataPolymer = [
  { name: "Carbon Footprint", value: 45, fill: "#4ade80" },
  { name: "Water Usage", value: 65, fill: "#22c55e" },
  { name: "Chemical Usage", value: 70, fill: "#16a34a" },
  { name: "Energy Consumption", value: 55, fill: "#15803d" },
]

const sustainabilityDataSurfactant = [
  { name: "Carbon Footprint", value: 50, fill: "#fcd34d" },
  { name: "Water Usage", value: 60, fill: "#fbbf24" },
  { name: "Chemical Usage", value: 75, fill: "#f59e0b" },
  { name: "Energy Consumption", value: 65, fill: "#d97706" },
]

const recoveryRateData = [
  { name: "Light Oil", co2: 45, nano: 58, polymer: 52, surfactant: 55 },
  { name: "Medium Oil", co2: 40, nano: 53, polymer: 48, surfactant: 50 },
  { name: "Heavy Oil", co2: 28, nano: 43, polymer: 40, surfactant: 38 },
  { name: "Extra Heavy", co2: 18, nano: 35, polymer: 32, surfactant: 30 },
]

// const riskAssessmentData = [
//   { name: "Technical", co2: 70, nano: 80, fullMark: 100 },
//   { name: "Financial", co2: 75, nano: 65, fullMark: 100 },
//   { name: "Operational", co2: 85, nano: 70, fullMark: 100 },
//   { name: "Environmental", co2: 65, nano: 85, fullMark: 100 },
//   { name: "Regulatory", co2: 80, nano: 70, fullMark: 100 },
// ]
// Revised risk assessment data
const riskAssessmentData = [
  { name: "Technical", co2: 70, nano: 85, polymer: 65, surfactant: 75, fullMark: 100 },
  { name: "Financial", co2: 75, nano: 85, polymer: 70, surfactant: 68, fullMark: 100 },
  { name: "Operational", co2: 85, nano: 80, polymer: 75, surfactant: 70, fullMark: 100 },
  { name: "Environmental", co2: 85, nano: 60, polymer: 70, surfactant: 75, fullMark: 100 },
  { name: "Regulatory", co2: 80, nano: 75, polymer: 65, surfactant: 60, fullMark: 100 },
]

// const keyMetrics = [
//   {
//     title: "Recovery Efficiency",
//     nano: "65%",
//     co2: "49%",
//     winner: "nano",
//     description: "Maximum achievable recovery from depleted reservoirs",
//   },
//   {
//     title: "Implementation Cost",
//     nano: "$400k-$550k",
//     co2: "$300k-$400k",
//     winner: "co2",
//     description: "Average cost for a medium-sized reservoir",
//   },
// {
//   title: "Environmental Impact",
//   nano: "Low-Medium",
//   co2: "Medium-High",
//   winner: "nano",
//   description: "Overall environmental footprint",
// },
//   {
//     title: "Technical Complexity",
//     nano: "High",
//     co2: "Medium",
//     winner: "co2",
//     description: "Required technical expertise and infrastructure",
//   },
//   {
//     title: "Long-term Performance",
//     nano: "Excellent",
//     co2: "Good",
//     winner: "nano",
//     description: "Sustained performance over reservoir lifetime",
//   },
// ]
// Update the key metrics to reflect the new environmental impact data
const keyMetrics = [
  {
    title: "Recovery Efficiency",
    nano: "65%",
    co2: "49%",
    polymer: "60%",
    surfactant: "62%",
    winner: "nano",
    description: "Maximum achievable recovery from depleted reservoirs",
  },
  {
    title: "Implementation Cost",
    nano: "$400k-$550k",
    co2: "$300k-$400k",
    polymer: "$350k-$450k",
    surfactant: "$420k-$500k",
    winner: "co2",
    description: "Average cost for a medium-sized reservoir",
  },
  {
    title: "Environmental Impact",
    nano: "Low",
    co2: "Medium-High",
    polymer: "Medium",
    surfactant: "Medium-High",
    winner: "nano",
    description: "Overall environmental footprint",
  },
  {
    title: "Technical Complexity",
    nano: "High",
    co2: "Medium",
    polymer: "Medium",
    surfactant: "High",
    winner: "co2",
    description: "Required technical expertise and infrastructure",
  },
  {
    title: "Long-term Performance",
    nano: "Excellent",
    co2: "Good",
    polymer: "Very Good",
    surfactant: "Good",
    winner: "nano",
    description: "Sustained performance over reservoir lifetime",
  },
]

// // Expert mode data
// const reservoirFactorsData = [
//   { name: "Interfacial Tension Reduction", nano: 85, co2: 60 },
//   { name: "Wettability Alteration", nano: 90, co2: 45 },
//   { name: "Viscosity Reduction", nano: 65, co2: 80 },
//   { name: "Mobility Control", nano: 75, co2: 70 },
//   { name: "Permeability Enhancement", nano: 80, co2: 50 },
// ]
const reservoirFactorsData = [
  { name: "Interfacial Tension Reduction", nano: 85, co2: 60, polymer: 65, surfactant: 90 },
  { name: "Wettability Alteration", nano: 90, co2: 45, polymer: 60, surfactant: 88 },
  { name: "Viscosity Reduction", nano: 65, co2: 80, polymer: 85, surfactant: 70 },
  { name: "Mobility Control", nano: 75, co2: 70, polymer: 90, surfactant: 65 },
  { name: "Permeability Enhancement", nano: 80, co2: 50, polymer: 55, surfactant: 75 },
]

// const technicalChallengesData = [
//   { name: "Nanoparticle Aggregation", nik: "NA", value: 35, fill: "#9b87f5" },
//   { name: "Reservoir Heterogeneity", nik: "RH", value: 25, fill: "#7b67d5" },
//   { name: "Surface Adsorption", nik: "SA", value: 20, fill: "#5b47b5" },
//   { name: "Transport Limitations", nik: "TL", value: 15, fill: "#3b2795" },
//   { name: "Scale Formation", nik: "SF", value: 5, fill: "#1b0775" },

//   // Polymer flooding challenges
//   { name: "Polymer Degradation", nik: "PD", value: 30, fill: "#16a34a" },
//   { name: "Shear Thinning", nik: "ST", value: 18, fill: "#15803d" },
//   { name: "Injection Pressure Increase", nik: "IPI", value: 22, fill: "#166534" },
//   { name: "Polymer Retention", nik: "PR", value: 28, fill: "#14532d" },

//   // Surfactant flooding challenges
//   { name: "Surfactant Adsorption", nik: "SAD", value: 32, fill: "#facc15" },
//   { name: "Low Salinity Sensitivity", nik: "LSS", value: 19, fill: "#eab308" },
//   { name: "Phase Behavior Issues", nik: "PBI", value: 17, fill: "#ca8a04" },
//   { name: "High Cost of Surfactants", nik: "HCS", value: 21, fill: "#a16207" },
// ]
// Create separate technical challenges data for each method
const nanoTechnicalChallengesData = [
  { name: "Nanoparticle Aggregation", nik: "NA", value: 35, fill: "#9b87f5" },
  { name: "Reservoir Heterogeneity", nik: "RH", value: 25, fill: "#7b67d5" },
  { name: "Surface Adsorption", nik: "SA", value: 20, fill: "#5b47b5" },
  { name: "Transport Limitations", nik: "TL", value: 15, fill: "#3b2795" },
  { name: "Scale Formation", nik: "SF", value: 5, fill: "#1b0775" },
]

const co2TechnicalChallengesData = [
  { name: "Gravity Override", nik: "GO", value: 30, fill: "#0ea5e9" },
  { name: "Corrosion Issues", nik: "CI", value: 25, fill: "#0284c7" },
  { name: "Channeling", nik: "CH", value: 20, fill: "#0369a1" },
  { name: "Miscibility Pressure", nik: "MP", value: 15, fill: "#075985" },
  { name: "Asphaltene Precipitation", nik: "AP", value: 10, fill: "#0c4a6e" },
]

const polymerTechnicalChallengesData = [
  { name: "Polymer Degradation", nik: "PD", value: 30, fill: "#16a34a" },
  { name: "Shear Thinning", nik: "ST", value: 18, fill: "#15803d" },
  { name: "Injection Pressure Increase", nik: "IPI", value: 22, fill: "#166534" },
  { name: "Polymer Retention", nik: "PR", value: 28, fill: "#14532d" },
  { name: "Permeability Reduction", nik: "PRD", value: 12, fill: "#22c55e" },
]

const surfactantTechnicalChallengesData = [
  { name: "Surfactant Adsorption", nik: "SAD", value: 32, fill: "#facc15" },
  { name: "Low Salinity Sensitivity", nik: "LSS", value: 19, fill: "#eab308" },
  { name: "Phase Behavior Issues", nik: "PBI", value: 17, fill: "#ca8a04" },
  { name: "High Cost of Surfactants", nik: "HCS", value: 21, fill: "#a16207" },
  { name: "Thermal Stability", nik: "TS", value: 11, fill: "#fbbf24" },
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

// Add ROI data for polymer and surfactant
const roiData = [
  { year: "2023", nano: -100, co2: -80, polymer: -90, surfactant: -95 },
  { year: "2024", nano: -40, co2: -30, polymer: -35, surfactant: -45 },
  { year: "2025", nano: 20, co2: 10, polymer: 15, surfactant: 5 },
  { year: "2026", nano: 60, co2: 40, polymer: 50, surfactant: 45 },
  { year: "2027", nano: 110, co2: 65, polymer: 90, surfactant: 85 },
  { year: "2028", nano: 160, co2: 85, polymer: 130, surfactant: 120 },
  { year: "2029", nano: 200, co2: 100, polymer: 160, surfactant: 150 },
  { year: "2030", nano: 250, co2: 110, polymer: 190, surfactant: 180 },
]
const technicalChallengesData = [
  { name: "Nanoparticle Aggregation", nik: "NA", value: 35, fill: "#9b87f5" },
  { name: "Reservoir Heterogeneity", nik: "RH", value: 25, fill: "#7b67d5" },
  { name: "Surface Adsorption", nik: "SA", value: 20, fill: "#5b47b5" },
  { name: "Transport Limitations", nik: "TL", value: 15, fill: "#3b2795" },
  { name: "Scale Formation", nik: "SF", value: 5, fill: "#1b0775" },
]

// Polymer-specific challenges
const polymerChallengesData = [
  { name: "Mechanical Degradation", nik: "MD", value: 30, fill: "#16a34a" },
  { name: "Shear Sensitivity", nik: "SS", value: 25, fill: "#15803d" },
  { name: "Injectivity Issues", nik: "II", value: 22, fill: "#166534" },
  { name: "Thermal Stability", nik: "TS", value: 15, fill: "#14532d" },
  { name: "High Salinity Impact", nik: "HS", value: 8, fill: "#052e16" },
]

// Surfactant-specific challenges
const surfactantChallengesData = [
  { name: "Adsorption Loss", nik: "AL", value: 32, fill: "#eab308" },
  { name: "High Salinity Issues", nik: "HS", value: 28, fill: "#ca8a04" },
  { name: "Temperature Limitations", nik: "TL", value: 18, fill: "#a16207" },
  { name: "Micelle Formation", nik: "MF", value: 12, fill: "#854d0e" },
  { name: "Chemical Retention", nik: "CR", value: 10, fill: "#713f12" },
]


const EORComparisonVisualizations = () => {
  const [activeTab, setActiveTab] = useState("efficiency")
  const [expertMode, setExpertMode] = useState(false)
    const [activeMethod, setActiveMethod] = useState("all")

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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">EOR Methods Comparison</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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

          <Card className="bg-[#1A1F2C]/80 border-[#0000001a] backdrop-blur-md text-white shadow-lg hover:shadow-[#0EA5E9]/5 transition-shadow duration-300">
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

          <Card className="bg-[#1A1F2C]/80 border-[#0000001a] backdrop-blur-md text-white shadow-lg hover:shadow-[#15803d]/5 transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#15803d]">
                <Beaker className="mr-2 h-5 w-5" />
                Polymer
              </CardTitle>
              <CardDescription className="text-[#aaadb0]">Polymer flooding for mobility control</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#15803d]">60%</div>
              <p className="text-sm text-[#aaadb0]">Maximum recovery efficiency</p>
              <div className="mt-4 flex items-center text-[#33C3F0] text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>Excellent for heavy oil reservoirs</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C]/80 border-[#0000001a] backdrop-blur-md text-white shadow-lg hover:shadow-[#eab308]/5 transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-[#eab308]">
                <Beaker className="mr-2 h-5 w-5" />
                Surfactant
              </CardTitle>
              <CardDescription className="text-[#aaadb0]">Surfactant flooding for IFT reduction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#eab308]">62%</div>
              <p className="text-sm text-[#aaadb0]">Maximum recovery efficiency</p>
              <div className="mt-4 flex items-center text-[#33C3F0] text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>Superior interfacial tension reduction</span>
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
                        <Bar dataKey="polymer" name="Polymer" fill="#15803d" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="surfactant" name="Surfactant" fill="#eab308" radius={[0, 4, 4, 0]} />
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
                        <Radar name="Polymer" dataKey="polymer" stroke="#15803d" fill="#15803d" fillOpacity={0.5} />
                        <Radar
                          name="Surfactant"
                          dataKey="surfactant"
                          stroke="#eab308"
                          fill="#eab308"
                          fillOpacity={0.5}
                        />
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-[#9b87f5]" />
                    Technical Challenges by EOR Method
                  </h4>
                     <div>
               
                  <div className="flex justify-center space-x-4 mb-4">
                    <Button 
                      onClick={() => setActiveMethod("nano")}
                      variant="outline"
                      className={`text-xs px-2 py-1 h-auto ${activeMethod === "nano" ? "bg-[#9b87f5]/20 text-[#9b87f5] border-[#9b87f5]" : "text-gray-400"}`}>
                      Nano
                    </Button>
                    <Button 
                      onClick={() => setActiveMethod("polymer")}
                      variant="outline"
                      className={`text-xs px-2 py-1 h-auto ${activeMethod === "polymer" ? "bg-[#16a34a]/20 text-[#16a34a] border-[#16a34a]" : "text-gray-400"}`}>
                      Polymer
                    </Button>
                    <Button 
                      onClick={() => setActiveMethod("surfactant")}
                      variant="outline"
                      className={`text-xs px-2 py-1 h-auto ${activeMethod === "surfactant" ? "bg-[#eab308]/20 text-[#eab308] border-[#eab308]" : "text-gray-400"}`}>
                      Surfactant
                    </Button>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={
                            activeMethod === "polymer" 
                              ? polymerChallengesData 
                              : activeMethod === "surfactant" 
                              ? surfactantChallengesData 
                              : technicalChallengesData
                          }
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ nik, percent }) => `${nik} ${(percent * 100).toFixed(0)}%`}
                          labelLine={{ stroke: "#aaadb0", strokeWidth: 1 }}
                        >
                          {(activeMethod === "polymer" 
                            ? polymerChallengesData 
                            : activeMethod === "surfactant" 
                            ? surfactantChallengesData 
                            : technicalChallengesData).map((entry, index) => (
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
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#9b87f5] font-medium mb-3 text-center">Nano EOR Challenges</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={nanoTechnicalChallengesData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ nik, percent }) => `${nik} ${(percent * 100).toFixed(0)}%`}
                              labelLine={{ stroke: "#aaadb0", strokeWidth: 1 }}
                            >
                              {nanoTechnicalChallengesData.map((entry, index) => (
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
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#0EA5E9] font-medium mb-3 text-center">CO₂ Injection Challenges</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={co2TechnicalChallengesData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ nik, percent }) => `${nik} ${(percent * 100).toFixed(0)}%`}
                              labelLine={{ stroke: "#aaadb0", strokeWidth: 1 }}
                            >
                              {co2TechnicalChallengesData.map((entry, index) => (
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
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#15803d] font-medium mb-3 text-center">Polymer Flooding Challenges</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={polymerTechnicalChallengesData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ nik, percent }) => `${nik} ${(percent * 100).toFixed(0)}%`}
                              labelLine={{ stroke: "#aaadb0", strokeWidth: 1 }}
                            >
                              {polymerTechnicalChallengesData.map((entry, index) => (
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
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#eab308] font-medium mb-3 text-center">Surfactant Flooding Challenges</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={surfactantTechnicalChallengesData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ nik, percent }) => `${nik} ${(percent * 100).toFixed(0)}%`}
                              labelLine={{ stroke: "#aaadb0", strokeWidth: 1 }}
                            >
                              {surfactantTechnicalChallengesData.map((entry, index) => (
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
                  </div> */}
                </div>

                <div className="">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-[#9b87f5]" />
                    Risk Assessment by EOR Method
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isMobile ? (
 <ScrollArea className="h-80">
<div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">

                      <h5 className="text-[#9b87f5] font-medium mb-3 text-center">Nano EOR Risk Profile</h5>
                    
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={80} width={500} height={400} data={riskAssessmentData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: "#aaadb0", fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#aaadb0" }} />
                            <Radar name="Nano EOR" dataKey="nano" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.6} />
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
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#0EA5E9] font-medium mb-3 text-center">CO₂ Injection Risk Profile</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={80} width={500} height={400} data={riskAssessmentData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: "#aaadb0", fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#aaadb0" }} />
                            <Radar
                              name="CO₂ Injection"
                              dataKey="co2"
                              stroke="#0EA5E9"
                              fill="#0EA5E9"
                              fillOpacity={0.6}
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
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#15803d] font-medium mb-3 text-center">Polymer Flooding Risk Profile</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={80} width={500} height={400} data={riskAssessmentData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: "#aaadb0", fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#aaadb0" }} />
                            <Radar name="Polymer" dataKey="polymer" stroke="#15803d" fill="#15803d" fillOpacity={0.6} />
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
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#eab308] font-medium mb-3 text-center">Surfactant Flooding Risk Profile</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={80} width={500} height={400} data={riskAssessmentData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: "#aaadb0", fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#aaadb0" }} />
                            <Radar
                              name="Surfactant"
                              dataKey="surfactant"
                              stroke="#eab308"
                              fill="#eab308"
                              fillOpacity={0.6}
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
                      </ScrollArea>
                  ): (
                    <>
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
  
                      <h5 className="text-[#9b87f5] font-medium mb-3 text-center">Nano EOR Risk Profile</h5>
                    
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={80} width={500} height={400} data={riskAssessmentData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: "#aaadb0", fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#aaadb0" }} />
                            <Radar name="Nano EOR" dataKey="nano" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.6} />
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
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#0EA5E9] font-medium mb-3 text-center">CO₂ Injection Risk Profile</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={80} width={500} height={400} data={riskAssessmentData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: "#aaadb0", fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#aaadb0" }} />
                            <Radar
                              name="CO₂ Injection"
                              dataKey="co2"
                              stroke="#0EA5E9"
                              fill="#0EA5E9"
                              fillOpacity={0.6}
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
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#15803d] font-medium mb-3 text-center">Polymer Flooding Risk Profile</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={80} width={500} height={400} data={riskAssessmentData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: "#aaadb0", fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#aaadb0" }} />
                            <Radar name="Polymer" dataKey="polymer" stroke="#15803d" fill="#15803d" fillOpacity={0.6} />
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
                    <div className="bg-[#1A1F2C]/60 p-4 rounded-lg border border-[#0000001a]">
                      <h5 className="text-[#eab308] font-medium mb-3 text-center">Surfactant Flooding Risk Profile</h5>
                      <div className="h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={80} width={500} height={400} data={riskAssessmentData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: "#aaadb0", fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#aaadb0" }} />
                            <Radar
                              name="Surfactant"
                              dataKey="surfactant"
                              stroke="#eab308"
                              fill="#eab308"
                              fillOpacity={0.6}
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
                    </div></>
                ) } 
                  
                    
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
                        <Line
                          type="monotone"
                          dataKey="polymer"
                          name="Polymer"
                          stroke="#15803d"
                          strokeWidth={3}
                          dot={{ stroke: "#15803d", strokeWidth: 2, r: 4, fill: "#1A1F2C" }}
                          activeDot={{ r: 8, fill: "#15803d" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="surfactant"
                          name="Surfactant"
                          stroke="#eab308"
                          strokeWidth={3}
                          dot={{ stroke: "#eab308", strokeWidth: 2, r: 4, fill: "#1A1F2C" }}
                          activeDot={{ r: 8, fill: "#eab308" }}
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
                        <Bar dataKey="polymer" name="Polymer" fill="#15803d" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="surfactant" name="Surfactant" fill="#eab308" radius={[0, 4, 4, 0]} />
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
                        <Bar dataKey="polymer" name="Polymer" fill="#15803d" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="surfactant" name="Surfactant" fill="#eab308" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Return on Investment Over Time</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={roiData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="nanoGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="polymerGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#15803d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#15803d" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="surfactantGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#eab308" stopOpacity={0.1} />
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
                        <Area
                          type="monotone"
                          dataKey="polymer"
                          name="Polymer ROI"
                          stroke="#15803d"
                          fillOpacity={1}
                          fill="url(#polymerGradient)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="surfactant"
                          name="Surfactant ROI"
                          stroke="#eab308"
                          fillOpacity={1}
                          fill="url(#surfactantGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sustainability" className="mt-0">
              <div className="grid grid-cols-1 gap-10">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Environmental Impact Comparison</h3>
                  <div className="bg-[#0f1623]/70 rounded-lg p-4 sm:p-8 mb-6 border border-[#0000001a] backdrop-blur-md">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                      <div className="mb-4 md:mb-0">
                        <h4 className="font-medium text-white">Sustainability Score</h4>
                        <p className="text-sm text-[#aaadb0]">Lower scores indicate better environmental performance</p>
                      </div>
                      <div className="flex flex-wrap gap-3 pb-3">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-2"></div>
                          <span className="text-sm text-[#aaadb0]">Nano EOR</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#0EA5E9] mr-2"></div>
                          <span className="text-sm text-[#aaadb0]">CO₂ Injection</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#15803d] mr-2"></div>
                          <span className="text-sm text-[#aaadb0]">Polymer</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-[#eab308] mr-2"></div>
                          <span className="text-sm text-[#aaadb0]">Surfactant</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <div className="h-[300px]">
                        <h5 className="text-center text-[#9b87f5] text-sm font-medium mb-2">Nano EOR</h5>
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
                              label={{
                                fill: "#fff",
                                position: "insideStart",
                                fontSize: 12,
                              }}
                              background
                              dataKey="value"
                              cornerRadius={8}
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
                      </div>
                      <div className="h-[300px]">
                        <h5 className="text-center text-[#0EA5E9] text-sm font-medium mb-2">CO₂ Injection</h5>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="20%"
                            outerRadius="80%"
                            barSize={20}
                            data={sustainabilityDataCO2}
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar
                              label={{
                                fill: "#fff",
                                position: "insideStart",
                                fontSize: 12,
                              }}
                              background
                              dataKey="value"
                              cornerRadius={8}
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
                      </div>
                      <div className="h-[300px]">
                        <h5 className="text-center text-[#15803d] text-sm font-medium mb-2">Polymer</h5>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="20%"
                            outerRadius="80%"
                            barSize={20}
                            data={sustainabilityDataPolymer}
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar
                              label={{
                                fill: "#fff",
                                position: "insideStart",
                                fontSize: 12,
                              }}
                              background
                              dataKey="value"
                              cornerRadius={8}
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
                      </div>
                      <div className="h-[300px]">
                        <h5 className="text-center text-[#eab308] text-sm font-medium mb-2">Surfactant</h5>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="20%"
                            outerRadius="80%"
                            barSize={20}
                            data={sustainabilityDataSurfactant}
                            startAngle={180}
                            endAngle={0}
                          >
                            <RadialBar
                              label={{
                                fill: "#fff",
                                position: "insideStart",
                                fontSize: 12,
                              }}
                              background
                              dataKey="value"
                              cornerRadius={8}
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
                      </div>
                    </div>
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
                  <th className="px-6 py-4 text-center text-[#15803d] font-medium">Polymer</th>
                  <th className="px-6 py-4 text-center text-[#eab308] font-medium">Surfactant</th>
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
                    <td
                      className={`px-6 py-4 text-center ${metric.winner === "polymer" ? "text-[#15803d] font-medium" : "text-[#aaadb0]"}`}
                    >
                      {metric.polymer}
                      {metric.winner === "polymer" && (
                        <div className="flex justify-center mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#15803d]/10 text-[#15803d] border border-[#15803d]/20">
                            Preferred
                          </span>
                        </div>
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 text-center ${metric.winner === "surfactant" ? "text-[#eab308] font-medium" : "text-[#aaadb0]"}`}
                    >
                      {metric.surfactant}
                      {metric.winner === "surfactant" && (
                        <div className="flex justify-center mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20">
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

      </div>

    </section>
  )
}

export default EORComparisonVisualizations
