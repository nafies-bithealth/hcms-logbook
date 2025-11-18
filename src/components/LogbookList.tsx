import { Menu } from "lucide-react";
import { useState } from "react";
import { AllPerformanceIndicators } from "./AllPerformanceIndicators";

interface LogbookEntry {
  id: string;
  title: string;
  currentLog: number;
  totalLog: number;
  percentage: number;
  level: string;
  levelType: "current" | "target";
}

interface LogbookListProps {
  onMenuClick: () => void;
  onCardClick: (entry: LogbookEntry) => void;
  onAddLogbook: () => void;
  onViewIndicator?: (indicator: { id: string; name: string; package: string; competency: string }) => void;
  onAddLogbookWithData?: (prefilledData: { name: string; package: string; competency: string }) => void;
}

const logbookEntries: LogbookEntry[] = [
  {
    id: "1",
    title: "Senior Clinical Nurse/Specialist - Medical Surgical Basic - Level 1",
    currentLog: 1,
    totalLog: 25,
    percentage: 10,
    level: "Current Level",
    levelType: "current",
  },
  {
    id: "2",
    title: "Senior Clinical Nurse/Specialist - Medical Surgical Basic - Level 2",
    currentLog: 1,
    totalLog: 25,
    percentage: 10,
    level: "Target Level",
    levelType: "target",
  },
  {
    id: "3",
    title: "Critical Care Nursing - ICU Competency - Level 1",
    currentLog: 5,
    totalLog: 20,
    percentage: 25,
    level: "Current Level",
    levelType: "current",
  },
  {
    id: "4",
    title: "Emergency Department - Trauma Care - Level 2",
    currentLog: 0,
    totalLog: 30,
    percentage: 0,
    level: "Target Level",
    levelType: "target",
  },
];

export function LogbookList({ onMenuClick, onCardClick, onAddLogbook, onViewIndicator, onAddLogbookWithData }: LogbookListProps) {
  const tabs = ["Dashboard", "Performance Indicator"];
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="bg-white relative size-full flex flex-col">
      {/* Title Bar */}
      <div className="bg-[#fcfcfd] shrink-0 w-full border-b-2 border-[#e4e7ec]">
        <div className="flex flex-row items-center h-[60px] px-[16px] gap-[12px]">
          <button
            onClick={onMenuClick}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-[#344054]" />
          </button>
          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#344054] text-[20px]">
            Logbook
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative shrink-0 w-full border-b-2 border-[#e4e7ec]">
        <div className="flex flex-row items-center overflow-x-auto px-[16px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`box-border flex items-center justify-center px-[16px] py-[8px] relative ${
                tab === activeTab
                  ? "border-b-2 border-[#7f56d9]"
                  : ""
              }`}
            >
              <p
                className={`font-['Inter:${
                  tab === activeTab ? "Semi_Bold" : "Regular"
                }',sans-serif] text-[14px] whitespace-nowrap ${
                  tab === activeTab ? "text-[#7f56d9]" : "text-[#344054]"
                }`}
              >
                {tab}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "Dashboard" ? (
        <>
          {/* Cards Container */}
          <div className="flex-1 overflow-y-auto pb-[100px] bg-gradient-to-br from-[#fafbfc] via-[#f9fafb] to-[#f4f5f7]">
            {/* Welcome Section */}
            <div className="px-[16px] pt-[20px] pb-[12px]">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[18px]">
                Welcome Back! 👋
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[14px] mt-1">
                Track your progress and achievements
              </p>
            </div>

            <div className="flex flex-col gap-[16px] px-[16px] pb-[16px]">
              {logbookEntries.slice(0, 2).map((entry, index) => (
                <button
                  key={entry.id}
                  onClick={() => onCardClick(entry)}
                  className={`relative overflow-hidden rounded-[16px] p-[16px] w-full text-left card-shadow transition-transform transform hover:-translate-y-1 ${
                    entry.levelType === "current"
                      ? "bg-gradient-to-br from-white via-white to-[#f9f5ff]"
                      : "bg-gradient-to-br from-white via-white to-[#fffaeb]"
                  }`}
                >
                  {/* Subtle accent line */}
                  <div 
                    className={`absolute top-0 left-0 w-full h-[3px] ${
                      entry.levelType === "current"
                        ? "bg-gradient-to-r from-[#7f56d9] to-[#9e77ed]"
                        : "bg-gradient-to-r from-[#f79009] to-[#fdb022]"
                    }`}
                  />
                  
                  <div className="flex flex-col gap-[12px]">
                    {/* Level Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div 
                        className={`inline-flex px-3 py-1 rounded-full text-[11px] font-['Inter:Medium',sans-serif] ${
                          entry.levelType === "current"
                            ? "bg-[#f9f5ff] text-[#7f56d9] border border-[#e9d7fe]"
                            : "bg-[#fffaeb] text-[#f79009] border border-[#fedf89]"
                        }`}
                      >
                        {entry.level}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <p className="font-['Inter:Medium',sans-serif] text-[#1d2939] text-[14px] leading-[20px]">
                        {entry.title}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex gap-[6px] items-baseline">
                        <span 
                          className={`font-['Inter:Semi_Bold',sans-serif] text-[36px] leading-[1] bg-gradient-to-br ${
                            entry.levelType === "current"
                              ? "from-[#7f56d9] to-[#6941c6] text-transparent bg-clip-text"
                              : "from-[#f79009] to-[#dc6803] text-transparent bg-clip-text"
                          }`}
                        >
                          {entry.currentLog}
                        </span>
                        <span className="font-['Inter:Regular',sans-serif] text-[#98a2b3] text-[16px]">
                          / {entry.totalLog}
                        </span>
                      </div>
                      <div 
                        className={`px-3 py-2 rounded-xl ${
                          entry.levelType === "current"
                            ? "bg-gradient-to-br from-[#f9f5ff] to-[#f4ebff]"
                            : "bg-gradient-to-br from-[#fffaeb] to-[#fef0c7]"
                        }`}
                      >
                        <span
                          className={`font-['Inter:Semi_Bold',sans-serif] text-[18px] ${
                            entry.levelType === "current"
                              ? "text-[#7f56d9]"
                              : "text-[#f79009]"
                          }`}
                        >
                          {entry.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#f2f4f7] rounded-full h-[6px] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          entry.levelType === "current"
                            ? "bg-gradient-to-r from-[#7f56d9] to-[#9e77ed]"
                            : "bg-gradient-to-r from-[#f79009] to-[#fdb022]"
                        }`}
                        style={{ width: `${entry.percentage}%` }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Button */}
          <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur backdrop-filter bg-gray-50 p-[16px] border-t border-[#e4e7ec]">
            <button 
              onClick={onAddLogbook}
              className="block bg-[#6172f3] rounded-[12px] h-[40px] w-full flex items-center justify-center hover:bg-[#4e5fd6] transition-colors"
            >
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#fcfcfd] text-[16px]">
                Add New Logbook
              </p>
            </button>
          </div>
        </>
      ) : (
        <AllPerformanceIndicators 
          onViewIndicator={onViewIndicator}
          onAddLogbook={onAddLogbookWithData}
        />
      )}
    </div>
  );
}
