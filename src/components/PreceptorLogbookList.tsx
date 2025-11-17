import { ArrowLeft, Calendar, CheckCircle, Clock, XCircle, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  departmentCode: string;
  pendingCount: number;
  position: string;
}

interface LogbookEntry {
  id: string;
  performanceIndicator: string;
  packageLevel: string;
  competency: string;
  date: Date;
  remarks: string;
  status: "pending" | "approved" | "rejected";
}

interface PreceptorLogbookListProps {
  employee: Employee;
  onBack: () => void;
  onViewDetails: (logbook: LogbookEntry) => void;
}

export function PreceptorLogbookList({ employee, onBack, onViewDetails }: PreceptorLogbookListProps) {
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [viewMode, setViewMode] = useState<"card" | "table">("table");

  // Mock data - logbooks submitted to this preceptor by the employee
  const logbooks: LogbookEntry[] = [
    {
      id: "1",
      performanceIndicator: "Melakukan pemeriksaan pada pasien",
      packageLevel: "Senior Clinical Nurse - Medical Surgical Basic Level 2",
      competency: "Airway Management",
      date: new Date(2024, 10, 1),
      remarks: "Patient assessment completed successfully",
      status: "pending",
    },
    {
      id: "2",
      performanceIndicator: "Memberikan obat sesuai prosedur",
      packageLevel: "Senior Clinical Nurse - Medical Surgical Basic Level 2",
      competency: "Medication Administration",
      date: new Date(2024, 10, 2),
      remarks: "Administered medication following protocol",
      status: "pending",
    },
    {
      id: "3",
      performanceIndicator: "Melakukan dokumentasi perawatan",
      packageLevel: "Senior Clinical Nurse - Medical Surgical Basic Level 2",
      competency: "Documentation",
      date: new Date(2024, 9, 28),
      remarks: "Documentation completed",
      status: "approved",
    },
    {
      id: "4",
      performanceIndicator: "Melakukan monitoring vital signs",
      packageLevel: "Senior Clinical Nurse - Medical Surgical Basic Level 2",
      competency: "Patient Monitoring",
      date: new Date(2024, 9, 25),
      remarks: "Vital signs monitored every 2 hours",
      status: "approved",
    },
    {
      id: "5",
      performanceIndicator: "Melakukan perawatan luka",
      packageLevel: "Senior Clinical Nurse - Medical Surgical Basic Level 2",
      competency: "Wound Care",
      date: new Date(2024, 9, 20),
      remarks: "Wound care performed with sterile technique",
      status: "rejected",
    },
  ];

  const filteredLogbooks = statusFilter === "all" 
    ? logbooks 
    : logbooks.filter(log => log.status === statusFilter);

  const pendingCount = logbooks.filter(log => log.status === "pending").length;
  const approvedCount = logbooks.filter(log => log.status === "approved").length;
  const rejectedCount = logbooks.filter(log => log.status === "rejected").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#fef3c7] text-[#92400e]";
      case "approved":
        return "bg-[#d1fae5] text-[#065f46]";
      case "rejected":
        return "bg-[#fee2e2] text-[#991b1b]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-[14px] h-[14px]" />;
      case "approved":
        return <CheckCircle className="w-[14px] h-[14px]" />;
      case "rejected":
        return <XCircle className="w-[14px] h-[14px]" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white relative size-full flex flex-col">
      {/* Title Bar */}
      <div className="bg-white border-b border-[#e4e7ec] px-[16px] py-[12px] flex items-center gap-[12px] shrink-0">
        <button
          onClick={onBack}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-[20px] h-[20px] text-[#1d2939]" />
        </button>
        <div className="flex-1">
          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[18px]">
            {employee.name}
          </p>
          <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px]">
            {employee.employeeId} • {employee.department}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-[#e4e7ec] px-[16px] py-[8px] flex items-center gap-[8px] shrink-0">
        <div className="flex gap-[8px] overflow-x-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-[16px] py-[8px] rounded-[8px] font-['Inter:Medium',sans-serif] text-[14px] transition-colors whitespace-nowrap ${
              statusFilter === "all"
                ? "bg-[#f9f5ff] text-[#7f56d9]"
                : "text-[#475467] hover:bg-gray-50"
            }`}
          >
            All ({logbooks.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-[16px] py-[8px] rounded-[8px] font-['Inter:Medium',sans-serif] text-[14px] transition-colors whitespace-nowrap ${
              statusFilter === "pending"
                ? "bg-[#fef3c7] text-[#92400e]"
                : "text-[#475467] hover:bg-gray-50"
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter("approved")}
            className={`px-[16px] py-[8px] rounded-[8px] font-['Inter:Medium',sans-serif] text-[14px] transition-colors whitespace-nowrap ${
              statusFilter === "approved"
                ? "bg-[#d1fae5] text-[#065f46]"
                : "text-[#475467] hover:bg-gray-50"
            }`}
          >
            Approved ({approvedCount})
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className={`px-[16px] py-[8px] rounded-[8px] font-['Inter:Medium',sans-serif] text-[14px] transition-colors whitespace-nowrap ${
              statusFilter === "rejected"
                ? "bg-[#fee2e2] text-[#991b1b]"
                : "text-[#475467] hover:bg-gray-50"
            }`}
          >
            Rejected ({rejectedCount})
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white border-b border-[#e4e7ec] px-[16px] py-[8px] flex justify-end shrink-0">
        <div className="flex gap-[4px] bg-[#f9fafb] rounded-[8px] p-[4px]">
          <button
            onClick={() => setViewMode("card")}
            className={`px-[12px] h-[32px] flex items-center justify-center gap-[6px] rounded-[6px] transition-colors ${
              viewMode === "card"
                ? "bg-white text-[#6172f3] shadow-sm"
                : "text-[#667085] hover:text-[#1d2939]"
            }`}
          >
            <LayoutGrid className="w-[16px] h-[16px]" />
            <span className="font-['Inter:Medium',sans-serif] text-[14px]">Card View</span>
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-[12px] h-[32px] flex items-center justify-center gap-[6px] rounded-[6px] transition-colors ${
              viewMode === "table"
                ? "bg-white text-[#6172f3] shadow-sm"
                : "text-[#667085] hover:text-[#1d2939]"
            }`}
          >
            <List className="w-[16px] h-[16px]" />
            <span className="font-['Inter:Medium',sans-serif] text-[14px]">Table View</span>
          </button>
        </div>
      </div>

      {/* Logbook List */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === "card" ? (
          <div className="p-[16px]">
            <div className="flex flex-col gap-[12px]">
              {filteredLogbooks.map((logbook) => (
                <button
                  key={logbook.id}
                  onClick={() => onViewDetails(logbook)}
                  className="bg-white border border-[#e4e7ec] rounded-[12px] p-[16px] hover:border-[#6172f3] hover:shadow-sm transition-all text-left"
                >
                  <div className="flex items-start gap-[12px] mb-[12px]">
                    <div className="flex-1">
                      <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[15px] mb-[4px]">
                        {logbook.performanceIndicator}
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px] mb-[2px]">
                        {logbook.competency}
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[12px]">
                        {logbook.packageLevel}
                      </p>
                    </div>
                    <div className={`px-[10px] py-[4px] rounded-[6px] flex items-center gap-[4px] ${getStatusColor(logbook.status)}`}>
                      {getStatusIcon(logbook.status)}
                      <span className="font-['Inter:Medium',sans-serif] text-[12px] capitalize">
                        {logbook.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-[8px] text-[#667085]">
                    <Calendar className="w-[14px] h-[14px]" />
                    <p className="font-['Inter:Regular',sans-serif] text-[12px]">
                      {format(logbook.date, "PPP")}
                    </p>
                  </div>

                  {logbook.remarks && (
                    <div className="mt-[8px] pt-[8px] border-t border-[#f2f4f7]">
                      <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px] line-clamp-2">
                        {logbook.remarks}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {filteredLogbooks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-[48px]">
                <div className="w-[64px] h-[64px] bg-[#f9fafb] rounded-full flex items-center justify-center mb-[16px]">
                  <CheckCircle className="w-[32px] h-[32px] text-[#98a2b3]" />
                </div>
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[16px] mb-[4px]">
                  No logbooks found
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[14px] text-center">
                  No {statusFilter !== "all" ? statusFilter : ""} logbooks available
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-[16px]">
            {filteredLogbooks.length > 0 ? (
              <div className="bg-white border border-[#e4e7ec] rounded-[12px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#f9fafb]">
                      <tr>
                        <th className="px-[12px] py-[10px] text-left">
                          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#475467] text-[12px]">
                            Performance Indicator
                          </p>
                        </th>
                        <th className="px-[12px] py-[10px] text-left">
                          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#475467] text-[12px]">
                            Competency
                          </p>
                        </th>
                        <th className="px-[12px] py-[10px] text-left">
                          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#475467] text-[12px]">
                            Date
                          </p>
                        </th>
                        <th className="px-[12px] py-[10px] text-center">
                          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#475467] text-[12px]">
                            Status
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e4e7ec]">
                      {filteredLogbooks.map((logbook) => (
                        <tr
                          key={logbook.id}
                          onClick={() => onViewDetails(logbook)}
                          className="hover:bg-[#f9fafb] cursor-pointer transition-colors"
                        >
                          <td className="px-[12px] py-[12px]">
                            <p className="font-['Inter:Medium',sans-serif] text-[#1d2939] text-[14px] mb-[2px]">
                              {logbook.performanceIndicator}
                            </p>
                            <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[12px] line-clamp-1">
                              {logbook.packageLevel}
                            </p>
                          </td>
                          <td className="px-[12px] py-[12px]">
                            <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px]">
                              {logbook.competency}
                            </p>
                          </td>
                          <td className="px-[12px] py-[12px]">
                            <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px]">
                              {format(logbook.date, "PP")}
                            </p>
                          </td>
                          <td className="px-[12px] py-[12px]">
                            <div className="flex justify-center">
                              <div className={`px-[10px] py-[4px] rounded-[6px] flex items-center gap-[4px] ${getStatusColor(logbook.status)}`}>
                                {getStatusIcon(logbook.status)}
                                <span className="font-['Inter:Medium',sans-serif] text-[12px] capitalize">
                                  {logbook.status}
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-[48px]">
                <div className="w-[64px] h-[64px] bg-[#f9fafb] rounded-full flex items-center justify-center mb-[16px]">
                  <CheckCircle className="w-[32px] h-[32px] text-[#98a2b3]" />
                </div>
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[16px] mb-[4px]">
                  No logbooks found
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[14px] text-center">
                  No {statusFilter !== "all" ? statusFilter : ""} logbooks available
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
