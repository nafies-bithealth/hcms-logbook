import { ArrowLeft, ChevronDown, Calendar as CalendarIcon, Search, X, Check } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import svgPaths from "../imports/svg-23831zkl2v";

interface AddLogbookProps {
  onBack: () => void;
  prefilledData?: {
    name: string;
    package: string;
    competency: string;
  } | null;
}

interface PerformanceIndicatorOption {
  id: string;
  name: string;
  package: string;
  competency: string;
}

const performanceIndicators: PerformanceIndicatorOption[] = [
  {
    id: "1",
    name: "Melakukan pemeriksaan pada pasien",
    package: "Senior Clinical Nurse - Medical Surgical Basic Level 2",
    competency: "Airway Management",
  },
  {
    id: "2",
    name: "Patient Assessment & Documentation",
    package: "Senior Clinical Nurse - Medical Surgical Basic Level 1",
    competency: "Clinical Assessment",
  },
  {
    id: "3",
    name: "Medication Administration",
    package: "Senior Clinical Nurse - Medical Surgical Basic Level 1",
    competency: "Clinical Skills",
  },
  {
    id: "4",
    name: "IV Insertion & Management",
    package: "Critical Care Nursing - ICU Competency Level 1",
    competency: "Technical Skills",
  },
  {
    id: "5",
    name: "Emergency Response Protocol",
    package: "Emergency Department - Trauma Care Level 2",
    competency: "Emergency Care",
  },
];

interface PreceptorOption {
  id: string;
  name: string;
  employeeId: string;
  position: string;
}

const preceptors: PreceptorOption[] = [
  { id: "1", name: "Dr. Sarah Johnson", employeeId: "1268166502", position: "Senior Consultant" },
  { id: "2", name: "Lisa Chen", employeeId: "1268166503", position: "Nurse Manager" },
  { id: "3", name: "Dr. Michael Rodriguez", employeeId: "1268166504", position: "Head of Department" },
  { id: "4", name: "Emma Williams", employeeId: "1268166505", position: "Senior Clinical Nurse" },
  { id: "5", name: "Dr. James Anderson", employeeId: "1268166506", position: "Consultant Physician" },
  { id: "6", name: "Maria Garcia", employeeId: "1268166507", position: "Clinical Instructor" },
  { id: "7", name: "Dr. Robert Chen", employeeId: "1268166508", position: "Medical Director" },
  { id: "8", name: "Patricia Brown", employeeId: "1268166509", position: "Staff Nurse Specialist" },
];

export function AddLogbook({ onBack, prefilledData }: AddLogbookProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedPreceptor, setSelectedPreceptor] = useState<string>("");
  const [remarks, setRemarks] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showPreceptorSheet, setShowPreceptorSheet] = useState(false);
  const [showApprovalSheet, setShowApprovalSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [preceptorSearchQuery, setPreceptorSearchQuery] = useState("");
  const [pin, setPin] = useState("");

  // Use prefilled data if available, otherwise use selected indicator data
  const selectedIndicatorData = prefilledData || performanceIndicators.find(
    (pi) => pi.id === selectedIndicator
  );

  const filteredIndicators = performanceIndicators.filter((indicator) =>
    indicator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPreceptors = preceptors.filter((preceptor) =>
    preceptor.name.toLowerCase().includes(preceptorSearchQuery.toLowerCase()) ||
    preceptor.employeeId.toLowerCase().includes(preceptorSearchQuery.toLowerCase()) ||
    preceptor.position.toLowerCase().includes(preceptorSearchQuery.toLowerCase())
  );

  const selectedPreceptorData = preceptors.find((p) => p.id === selectedPreceptor);

  const handleSelectIndicator = (indicatorId: string) => {
    setSelectedIndicator(indicatorId);
    setShowBottomSheet(false);
    setSearchQuery("");
  };

  const handleSelectPreceptor = (preceptorId: string) => {
    setSelectedPreceptor(preceptorId);
    setShowPreceptorSheet(false);
    setPreceptorSearchQuery("");
  };

  const handleSubmitToPreceptor = () => {
    // Handle normal submission to preceptor
    console.log("Submit to Preceptor:", {
      indicator: prefilledData ? prefilledData.name : selectedIndicator,
      package: selectedIndicatorData?.package,
      competency: selectedIndicatorData?.competency,
      date: selectedDate,
      preceptor: selectedPreceptor,
      remarks,
    });
    // Show success message and navigate back
    onBack();
  };

  const handleApproveNow = () => {
    // Handle direct approval with PIN
    console.log("Approve Now:", {
      indicator: prefilledData ? prefilledData.name : selectedIndicator,
      package: selectedIndicatorData?.package,
      competency: selectedIndicatorData?.competency,
      date: selectedDate,
      preceptor: selectedPreceptor,
      remarks,
      pin,
    });
    // Show success message and navigate back
    setShowApprovalSheet(false);
    onBack();
  };

  return (
    <div className="bg-white relative size-full flex flex-col">
      {/* Title Bar */}
      <div className="bg-[#fcfcfd] shrink-0 w-full border-b-2 border-[#e4e7ec]">
        <div className="flex flex-row items-center h-[60px] px-[16px] gap-[12px]">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#344054]" />
          </button>
          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#344054] text-[20px]">
            Add Logbook
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-[16px] px-[16px] pt-[16px] pb-[100px]">
          {/* Performance Indicator Section */}
          <div className="flex flex-col gap-[16px]">
            {prefilledData ? (
              <div className="bg-[#f2f4f7] border border-[#e4e7ec] rounded-[12px] px-[16px] py-[12px]">
                <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px] leading-[22px]">
                  {prefilledData.name}
                </p>
              </div>
            ) : (
              <button
                onClick={() => setShowBottomSheet(true)}
                className="bg-[#fcfcfd] border border-[#e4e7ec] rounded-[12px] px-[16px] py-[12px] flex items-center justify-between w-full text-left"
              >
                <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[14px] leading-[22px]">
                  {selectedIndicatorData?.name || "Performance Indicator"}
                </p>
                <ChevronDown className="w-[18px] h-[18px] text-[#667085]" />
              </button>
            )}

            {/* Package Level - Auto-populated */}
            <div className="bg-[#f2f4f7] border border-[#e4e7ec] rounded-[12px] px-[16px] py-[12px]">
              <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[14px] leading-[22px]">
                {selectedIndicatorData?.package || "Package Level"}
              </p>
            </div>

            {/* Competency - Auto-populated */}
            <div className="bg-[#f2f4f7] border border-[#e4e7ec] rounded-[12px] px-[16px] py-[12px]">
              <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[14px] leading-[22px]">
                {selectedIndicatorData?.competency || "Competency"}
              </p>
            </div>
          </div>

          {/* Logbook Details Section */}
          <div className="flex flex-col gap-[16px]">
            <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[14px]">
              Logbook Details
            </p>

            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="bg-[#fcfcfd] border border-[#e4e7ec] rounded-[12px] px-[16px] py-[12px] flex items-center justify-between w-full">
                  <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[14px] leading-[22px]">
                    {selectedDate ? format(selectedDate, "PPP") : "Date"}
                  </p>
                  <svg
                    className="w-[18px] h-[18px]"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d={svgPaths.p28be1b80}
                      stroke="#667085"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Preceptor Dropdown */}
            <button
              onClick={() => setShowPreceptorSheet(true)}
              className="bg-[#fcfcfd] border border-[#e4e7ec] rounded-[12px] px-[16px] py-[12px] flex items-center justify-between w-full text-left"
            >
              <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[14px] leading-[22px]">
                {selectedPreceptorData 
                  ? `${selectedPreceptorData.name} (${selectedPreceptorData.employeeId}) | ${selectedPreceptorData.position}`
                  : "Preceptor"}
              </p>
              <ChevronDown className="w-[18px] h-[18px] text-[#667085]" />
            </button>

            {/* Remarks Textarea */}
            <Textarea
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="bg-[#fcfcfd] border-[#e4e7ec] rounded-[12px] px-[16px] py-[12px] h-[104px] resize-none font-['Inter:Regular',sans-serif] text-[14px] text-[#1d2939] placeholder:text-[#667085]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur backdrop-filter bg-gray-50 p-[16px] border-t border-[#e4e7ec]">
        <div className="flex gap-[12px]">
          <button
            onClick={() => setShowApprovalSheet(true)}
            disabled={(!selectedIndicator && !prefilledData) || !selectedDate || !selectedPreceptor}
            className="bg-[#7f56d9] rounded-[12px] h-[40px] flex-1 flex items-center justify-center hover:bg-[#6941c6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#fcfcfd] text-[16px]">
              Approve Now
            </p>
          </button>
          <button
            onClick={handleSubmitToPreceptor}
            disabled={(!selectedIndicator && !prefilledData) || !selectedDate || !selectedPreceptor}
            className="bg-[#6172f3] rounded-[12px] h-[40px] flex-1 flex items-center justify-center hover:bg-[#4e5fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#fcfcfd] text-[16px]">
              Submit to Preceptor
            </p>
          </button>
        </div>
      </div>

      {/* Bottom Sheet Overlay and Modal */}
      {showBottomSheet && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[rgba(102,112,133,0.4)] backdrop-blur-[2px] z-40"
            onClick={() => setShowBottomSheet(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] h-[736px] bg-white rounded-tl-[24px] rounded-tr-[24px] shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.15)] z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-[31px] py-[8px] h-[40px] shrink-0 mt-[8px]">
              <button
                onClick={() => setShowBottomSheet(false)}
                className="w-[24px] h-[24px] flex items-center justify-center"
              >
                <X className="w-[14px] h-[14px] text-[#1d2939]" />
              </button>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[16px]">
                Performance Indicator
              </p>
              <button
                onClick={() => setShowBottomSheet(false)}
                className="w-[24px] h-[24px] flex items-center justify-center"
              >
                <X className="w-[14px] h-[14px] text-[#1d2939]" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-[16px] py-[12px] shrink-0">
              <div className="bg-[#f2f4f7] rounded-[12px] px-[16px] py-[12px] flex items-center gap-[8px]">
                <Search className="w-[18px] h-[18px] text-[#98a2b3]" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent font-['Inter:Medium',sans-serif] text-[#98a2b3] text-[14px] outline-none flex-1 placeholder:text-[#98a2b3]"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filteredIndicators.map((indicator) => {
                const isSelected = selectedIndicator === indicator.id;
                return (
                  <button
                    key={indicator.id}
                    onClick={() => handleSelectIndicator(indicator.id)}
                    className={`w-full px-[16px] py-[12px] border-b border-[#e4e7ec] flex flex-col gap-[8px] items-start transition-colors ${
                      isSelected ? "bg-[#f9f5ff]" : "bg-[#fcfcfd] hover:bg-[#f9fafb]"
                    }`}
                  >
                    <div className="flex items-start justify-between w-full gap-2">
                      <p
                        className={`font-['Inter:Regular',sans-serif] text-[14px] leading-[22px] text-left flex-1 ${
                          isSelected ? "text-[#7f56d9]" : "text-[#667085]"
                        }`}
                      >
                        {indicator.name}
                      </p>
                      {isSelected && <Check className="w-[24px] h-[24px] text-[#7f56d9] shrink-0" />}
                    </div>
                    <p className="font-['Inter:Regular',sans-serif] text-[#6172f3] text-[12px] leading-[20px] text-left">
                      Package Level: {indicator.package}
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#6172f3] text-[12px] leading-[20px] text-left">
                      Competency: {indicator.competency}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Bottom Button */}
            <div className="backdrop-blur backdrop-filter bg-gray-50 p-[16px] border-t border-[#e4e7ec] shrink-0">
              <button
                onClick={() => {
                  if (selectedIndicator) {
                    setShowBottomSheet(false);
                    setSearchQuery("");
                  }
                }}
                disabled={!selectedIndicator}
                className="bg-[#6172f3] rounded-[4px] h-[40px] w-full flex items-center justify-center hover:bg-[#4e5fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#fcfcfd] text-[16px]">
                  Select Performance Indicator
                </p>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Preceptor Bottom Sheet Overlay and Modal */}
      {showPreceptorSheet && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[rgba(102,112,133,0.4)] backdrop-blur-[2px] z-40"
            onClick={() => setShowPreceptorSheet(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] h-[736px] bg-white rounded-tl-[24px] rounded-tr-[24px] shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.15)] z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-[31px] py-[8px] h-[40px] shrink-0 mt-[8px]">
              <button
                onClick={() => setShowPreceptorSheet(false)}
                className="w-[24px] h-[24px] flex items-center justify-center"
              >
                <X className="w-[14px] h-[14px] text-[#1d2939]" />
              </button>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[16px]">
                Select Preceptor
              </p>
              <button
                onClick={() => setShowPreceptorSheet(false)}
                className="w-[24px] h-[24px] flex items-center justify-center"
              >
                <X className="w-[14px] h-[14px] text-[#1d2939]" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-[16px] py-[12px] shrink-0">
              <div className="bg-[#f2f4f7] rounded-[12px] px-[16px] py-[12px] flex items-center gap-[8px]">
                <Search className="w-[18px] h-[18px] text-[#98a2b3]" />
                <input
                  type="text"
                  placeholder="Search"
                  value={preceptorSearchQuery}
                  onChange={(e) => setPreceptorSearchQuery(e.target.value)}
                  className="bg-transparent font-['Inter:Medium',sans-serif] text-[#98a2b3] text-[14px] outline-none flex-1 placeholder:text-[#98a2b3]"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filteredPreceptors.map((preceptor) => {
                const isSelected = selectedPreceptor === preceptor.id;
                return (
                  <button
                    key={preceptor.id}
                    onClick={() => handleSelectPreceptor(preceptor.id)}
                    className={`w-full px-[16px] py-[12px] border-b border-[#e4e7ec] flex items-center justify-between transition-colors ${
                      isSelected ? "bg-[#f9f5ff]" : "bg-[#fcfcfd] hover:bg-[#f9fafb]"
                    }`}
                  >
                    <div className="flex flex-col items-start gap-[4px] flex-1">
                      <p
                        className={`font-['Inter:Medium',sans-serif] text-[14px] leading-[22px] text-left ${
                          isSelected ? "text-[#7f56d9]" : "text-[#1d2939]"
                        }`}
                      >
                        {preceptor.name} ({preceptor.employeeId})
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] text-[#6172f3] text-[12px] leading-[20px] text-left">
                        {preceptor.position}
                      </p>
                    </div>
                    {isSelected && <Check className="w-[24px] h-[24px] text-[#7f56d9] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Bottom Button */}
            <div className="backdrop-blur backdrop-filter bg-gray-50 p-[16px] border-t border-[#e4e7ec] shrink-0">
              <button
                onClick={() => {
                  if (selectedPreceptor) {
                    setShowPreceptorSheet(false);
                    setPreceptorSearchQuery("");
                  }
                }}
                disabled={!selectedPreceptor}
                className="bg-[#6172f3] rounded-[4px] h-[40px] w-full flex items-center justify-center hover:bg-[#4e5fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#fcfcfd] text-[16px]">
                  Select Preceptor
                </p>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Approval Bottom Sheet */}
      {showApprovalSheet && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[rgba(102,112,133,0.4)] backdrop-blur-[2px] z-40"
            onClick={() => setShowApprovalSheet(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] bg-white rounded-tl-[24px] rounded-tr-[24px] shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.15)] z-50 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-[31px] py-[8px] h-[40px] shrink-0 mt-[8px]">
              <button
                onClick={() => setShowApprovalSheet(false)}
                className="w-[24px] h-[24px] flex items-center justify-center"
              >
                <X className="w-[14px] h-[14px] text-[#1d2939]" />
              </button>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[16px]">
                Approve Logbook
              </p>
              <button
                onClick={() => setShowApprovalSheet(false)}
                className="w-[24px] h-[24px] flex items-center justify-center"
              >
                <X className="w-[14px] h-[14px] text-[#1d2939]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-[16px] py-[16px]">
              <div className="flex flex-col gap-[16px]">
                {/* Summary Section */}
                <div className="flex flex-col gap-[12px]">
                  <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[14px]">
                    Logbook Summary
                  </p>

                  {/* Performance Indicator */}
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
                      Performance Indicator
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                      {prefilledData ? prefilledData.name : selectedIndicatorData?.name}
                    </p>
                  </div>

                  {/* Package Level */}
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
                      Package Level
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                      {prefilledData ? prefilledData.package : selectedIndicatorData?.package}
                    </p>
                  </div>

                  {/* Competency */}
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
                      Competency
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                      {prefilledData ? prefilledData.competency : selectedIndicatorData?.competency}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
                      Date
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                      {selectedDate ? format(selectedDate, "PPP") : "-"}
                    </p>
                  </div>

                  {/* Preceptor */}
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
                      Preceptor
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                      {selectedPreceptorData 
                        ? `${selectedPreceptorData.name} (${selectedPreceptorData.employeeId})`
                        : "-"}
                    </p>
                    {selectedPreceptorData && (
                      <p className="font-['Inter:Regular',sans-serif] text-[#6172f3] text-[12px]">
                        {selectedPreceptorData.position}
                      </p>
                    )}
                  </div>

                  {/* Remarks */}
                  {remarks && (
                    <div className="flex flex-col gap-[4px]">
                      <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
                        Remarks
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                        {remarks}
                      </p>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-[#e4e7ec]" />

                {/* PIN Section */}
                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[14px]">
                      Preceptor PIN
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[12px]">
                      Enter the preceptor's PIN to approve this logbook entry
                    </p>
                  </div>

                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="Enter PIN"
                    value={pin}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setPin(value);
                    }}
                    maxLength={6}
                    className="bg-[#fcfcfd] border border-[#e4e7ec] rounded-[12px] px-[16px] py-[12px] font-['Inter:Regular',sans-serif] text-[14px] text-[#1d2939] placeholder:text-[#667085] outline-none focus:border-[#6172f3]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="backdrop-blur backdrop-filter bg-gray-50 p-[16px] border-t border-[#e4e7ec] shrink-0">
              <button
                onClick={handleApproveNow}
                disabled={!pin || pin.length < 4}
                className="bg-[#7f56d9] rounded-[4px] h-[40px] w-full flex items-center justify-center hover:bg-[#6941c6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#fcfcfd] text-[16px]">
                  Approve Now
                </p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
