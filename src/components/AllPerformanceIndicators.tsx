import { Search, Plus, ChevronRight } from "lucide-react";
import { useState } from "react";

interface PerformanceIndicatorItem {
  id: string;
  name: string;
  package: string;
  competency: string;
  currentCount: number;
  minimumRequired: number;
  status: "completed" | "in-progress" | "not-started";
}

interface AllPerformanceIndicatorsProps {
  onViewIndicator?: (indicator: { id: string; name: string; package: string; competency: string }) => void;
  onAddLogbook?: (prefilledData: { name: string; package: string; competency: string }) => void;
}

const allIndicators: PerformanceIndicatorItem[] = [
  {
    id: "1",
    name: "Patient Assessment & Documentation",
    package: "Senior Clinical Nurse - Medical Surgical Basic Level 1",
    competency: "Clinical Assessment",
    currentCount: 5,
    minimumRequired: 10,
    status: "in-progress",
  },
  {
    id: "2",
    name: "Medication Administration",
    package: "Senior Clinical Nurse - Medical Surgical Basic Level 1",
    competency: "Clinical Skills",
    currentCount: 8,
    minimumRequired: 15,
    status: "in-progress",
  },
  {
    id: "3",
    name: "Melakukan pemeriksaan pada pasien",
    package: "Senior Clinical Nurse - Medical Surgical Basic Level 2",
    competency: "Airway Management",
    currentCount: 3,
    minimumRequired: 8,
    status: "in-progress",
  },
  {
    id: "4",
    name: "IV Insertion & Management",
    package: "Critical Care Nursing - ICU Competency Level 1",
    competency: "Technical Skills",
    currentCount: 12,
    minimumRequired: 12,
    status: "completed",
  },
  {
    id: "5",
    name: "Patient Education",
    package: "Senior Clinical Nurse - Medical Surgical Basic Level 1",
    competency: "Communication",
    currentCount: 3,
    minimumRequired: 10,
    status: "in-progress",
  },
  {
    id: "6",
    name: "Emergency Response Protocol",
    package: "Emergency Department - Trauma Care Level 2",
    competency: "Emergency Care",
    currentCount: 2,
    minimumRequired: 5,
    status: "in-progress",
  },
  {
    id: "7",
    name: "Vital Signs Monitoring",
    package: "Senior Clinical Nurse - Medical Surgical Basic Level 1",
    competency: "Clinical Skills",
    currentCount: 15,
    minimumRequired: 15,
    status: "completed",
  },
  {
    id: "8",
    name: "Wound Care Management",
    package: "Critical Care Nursing - ICU Competency Level 1",
    competency: "Clinical Skills",
    currentCount: 0,
    minimumRequired: 8,
    status: "not-started",
  },
  {
    id: "9",
    name: "Infection Control Procedures",
    package: "Senior Clinical Nurse - Medical Surgical Basic Level 2",
    competency: "Safety",
    currentCount: 0,
    minimumRequired: 6,
    status: "not-started",
  },
  {
    id: "10",
    name: "Pain Management Assessment",
    package: "Emergency Department - Trauma Care Level 2",
    competency: "Patient Care",
    currentCount: 4,
    minimumRequired: 10,
    status: "in-progress",
  },
];

export function AllPerformanceIndicators({ onViewIndicator, onAddLogbook }: AllPerformanceIndicatorsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIndicators = allIndicators.filter((indicator) =>
    indicator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    indicator.package.toLowerCase().includes(searchQuery.toLowerCase()) ||
    indicator.competency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#d1fadf] text-[#039855]";
      case "in-progress":
        return "bg-[#fef0c7] text-[#dc6803]";
      case "not-started":
        return "bg-[#f2f4f7] text-[#344054]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "not-started":
        return "Not Started";
      default:
        return status;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f9fafb]">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white px-[16px] py-[12px] border-b border-[#e4e7ec] z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#667085]" />
          <input
            type="text"
            placeholder="Search indicators, packages, or competencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#e4e7ec] rounded-lg font-['Inter:Regular',sans-serif] text-[14px] focus:outline-none focus:border-[#7f56d9] focus:ring-1 focus:ring-[#7f56d9]"
          />
        </div>
      </div>

      {/* Indicators List */}
      <div className="flex flex-col gap-[12px] px-[16px] py-[16px]">
        <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
          {filteredIndicators.length} indicator{filteredIndicators.length !== 1 ? "s" : ""} found
        </p>
        {filteredIndicators.map((indicator) => (
          <div
            key={indicator.id}
            onClick={() => onViewIndicator?.({
              id: indicator.id,
              name: indicator.name,
              package: indicator.package,
              competency: indicator.competency
            })}
            className="bg-white rounded-[10px] p-[12px] shadow-sm hover:shadow-lg transition-all border-l-[4px] border-l-[#6172f3] cursor-pointer"
          >
            <div className="flex flex-col gap-[8px]">
              {/* Hierarchy */}
              <div className="flex items-center gap-1 text-[11px] font-['Inter:Regular',sans-serif] text-[#667085]">
                <span className="truncate">{indicator.package}</span>
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span className="truncate">{indicator.competency}</span>
              </div>

              {/* Title and Status */}
              <div className="flex items-start justify-between gap-2">
                <p className="font-['Inter:Medium',sans-serif] text-[#1d2939] text-[14px] leading-[20px] flex-1">
                  {indicator.name}
                </p>
                <span
                  className={`px-[8px] py-[2px] rounded-[6px] text-[10px] font-['Inter:Medium',sans-serif] shrink-0 ${getStatusColor(
                    indicator.status
                  )}`}
                >
                  {getStatusLabel(indicator.status)}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[20px] leading-[1]">
                    {indicator.currentCount}
                  </span>
                  <span className="font-['Inter:Regular',sans-serif] text-[#667085] text-[14px]">
                    / {indicator.minimumRequired}
                  </span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddLogbook?.({
                      name: indicator.name,
                      package: indicator.package,
                      competency: indicator.competency
                    });
                  }}
                  className="p-2 bg-[#6172f3] rounded-lg hover:bg-[#4e5fd6] transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#e4e7ec] rounded-full h-[4px]">
                <div
                  className={`h-full rounded-full transition-all ${
                    indicator.status === "completed"
                      ? "bg-[#039855]"
                      : indicator.status === "in-progress"
                      ? "bg-[#f79009]"
                      : "bg-[#667085]"
                  }`}
                  style={{
                    width: `${Math.min(
                      (indicator.currentCount / indicator.minimumRequired) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
