import { ArrowLeft, Search, Filter, Plus } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface PerformanceIndicator {
  id: string;
  name: string;
  category: string;
  currentCount: number;
  minimumRequired: number;
  status: "completed" | "in-progress" | "not-started";
}

interface PerformanceIndicatorsProps {
  logbookTitle: string;
  onBack: () => void;
  onAddIndicator?: (indicator: { name: string; package: string; competency: string }) => void;
  onAddNewLogbook?: () => void;
  onViewIndicator?: (indicator: { id: string; name: string; package: string; competency: string }) => void;
}

const mockIndicators: PerformanceIndicator[] = [
  {
    id: "1",
    name: "Patient Assessment & Documentation",
    category: "Clinical Skills",
    currentCount: 5,
    minimumRequired: 10,
    status: "in-progress",
  },
  {
    id: "2",
    name: "Medication Administration",
    category: "Clinical Skills",
    currentCount: 8,
    minimumRequired: 15,
    status: "in-progress",
  },
  {
    id: "3",
    name: "Wound Care Management",
    category: "Clinical Skills",
    currentCount: 0,
    minimumRequired: 8,
    status: "not-started",
  },
  {
    id: "4",
    name: "IV Insertion & Management",
    category: "Technical Skills",
    currentCount: 12,
    minimumRequired: 12,
    status: "completed",
  },
  {
    id: "5",
    name: "Patient Education",
    category: "Communication",
    currentCount: 3,
    minimumRequired: 10,
    status: "in-progress",
  },
  {
    id: "6",
    name: "Emergency Response Protocol",
    category: "Emergency Care",
    currentCount: 2,
    minimumRequired: 5,
    status: "in-progress",
  },
  {
    id: "7",
    name: "Vital Signs Monitoring",
    category: "Clinical Skills",
    currentCount: 15,
    minimumRequired: 15,
    status: "completed",
  },
  {
    id: "8",
    name: "Infection Control Procedures",
    category: "Safety",
    currentCount: 0,
    minimumRequired: 6,
    status: "not-started",
  },
];

export function PerformanceIndicators({
  logbookTitle,
  onBack,
  onAddIndicator,
  onAddNewLogbook,
  onViewIndicator,
}: PerformanceIndicatorsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(mockIndicators.map((i) => i.category))),
  ];

  const statusOptions = ["All", "completed", "in-progress", "not-started"];

  const filteredIndicators = mockIndicators.filter((indicator) => {
    const matchesSearch = indicator.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || indicator.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || indicator.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#d1fadf] text-[#039855] border-[#039855]";
      case "in-progress":
        return "bg-[#fef0c7] text-[#dc6803] border-[#dc6803]";
      case "not-started":
        return "bg-[#f2f4f7] text-[#344054] border-[#344054]";
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
    <div className="bg-white relative size-full flex flex-col">
      {/* Header */}
      <div className="bg-[#fcfcfd] shrink-0 w-full border-b-2 border-[#e4e7ec]">
        <div className="flex flex-col px-[16px] py-[12px] gap-[12px]">
          <div className="flex items-center gap-[12px]">
            <button
              onClick={onBack}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#344054]" />
            </button>
            <div className="flex-1">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#344054] text-[16px]">
                Performance Indicators
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[12px] line-clamp-1">
                {logbookTitle}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#667085]" />
            <input
              type="text"
              placeholder="Search indicators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e4e7ec] rounded-lg font-['Inter:Regular',sans-serif] text-[14px] focus:outline-none focus:border-[#7f56d9] focus:ring-1 focus:ring-[#7f56d9]"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 self-start px-3 py-2 border border-[#e4e7ec] rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4 text-[#344054]" />
            <span className="font-['Inter:Medium',sans-serif] text-[#344054] text-[14px]">
              Filters
            </span>
            {(selectedCategory !== "All" || selectedStatus !== "All") && (
              <div className="w-2 h-2 bg-[#7f56d9] rounded-full" />
            )}
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="flex flex-col gap-3 p-3 bg-[#f9fafb] rounded-lg border border-[#e4e7ec]">
              <div>
                <p className="font-['Inter:Medium',sans-serif] text-[#344054] text-[12px] mb-2">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-[12px] font-['Inter:Medium',sans-serif] transition-colors ${
                        selectedCategory === category
                          ? "bg-[#7f56d9] text-white"
                          : "bg-white text-[#344054] border border-[#e4e7ec] hover:border-[#7f56d9]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-['Inter:Medium',sans-serif] text-[#344054] text-[12px] mb-2">
                  Status
                </p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 rounded-full text-[12px] font-['Inter:Medium',sans-serif] transition-colors ${
                        selectedStatus === status
                          ? "bg-[#7f56d9] text-white"
                          : "bg-white text-[#344054] border border-[#e4e7ec] hover:border-[#7f56d9]"
                      }`}
                    >
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Indicators List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-[12px] px-[16px] py-[16px] pb-[80px]">
          <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
            {filteredIndicators.length} indicator
            {filteredIndicators.length !== 1 ? "s" : ""} found
          </p>
          {filteredIndicators.map((indicator) => (
            <div
              key={indicator.id}
              onClick={() => onViewIndicator?.({
                id: indicator.id,
                name: indicator.name,
                package: logbookTitle,
                competency: indicator.category
              })}
              className="bg-[#fcfcfd] border border-[#e4e7ec] rounded-[8px] p-[12px] hover:border-[#7f56d9] card-shadow cursor-pointer"
            >
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-['Inter:Medium',sans-serif] text-[#1d2939] text-[14px] leading-[20px] flex-1">
                    {indicator.name}
                  </p>
                  <div
                    className={`px-2 py-1 rounded-full text-[10px] font-['Inter:Medium',sans-serif] border ${getStatusColor(
                      indicator.status
                    )}`}
                  >
                    {getStatusLabel(indicator.status)}
                  </div>
                </div>
                <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[12px]">
                  {indicator.category}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[20px]">
                      {indicator.currentCount}
                    </span>
                    <span className="font-['Inter:Regular',sans-serif] text-[#475467] text-[14px]">
                      / {indicator.minimumRequired}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddIndicator?.({
                        name: indicator.name,
                        package: logbookTitle,
                        competency: indicator.category
                      });
                    }}
                    className="p-2 bg-[#6172f3] rounded-lg hover:bg-[#4e5fd6] transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="w-full bg-[#e4e7ec] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      indicator.status === "completed"
                        ? "bg-[#039855]"
                        : "bg-[#f79009]"
                    }`}
                    style={{
                      width: `${Math.min(
                        (indicator.currentCount / indicator.minimumRequired) *
                          100,
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

      {/* Add New Logbook Button */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur backdrop-filter bg-gray-50 p-[16px] border-t border-[#e4e7ec]">
        <button
          onClick={onAddNewLogbook}
          className="bg-[#6172f3] rounded-[12px] h-[40px] w-full flex items-center justify-center hover:bg-[#4e5fd6] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2 text-white" />
          <p className="font-['Inter:Semi_Bold',sans-serif] text-white text-[16px]">
            Add New Logbook
          </p>
        </button>
      </div>
    </div>
  );
}
