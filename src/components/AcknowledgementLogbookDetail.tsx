import { ArrowLeft, Calendar, User, FileText, CheckCircle, XCircle } from "lucide-react";
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
  status: "pending" | "acknowledged" | "rejected";
}

interface AcknowledgementLogbookDetailProps {
  employee: Employee;
  logbook: LogbookEntry;
  onBack: () => void;
}

export function AcknowledgementLogbookDetail({ employee, logbook, onBack }: AcknowledgementLogbookDetailProps) {
  const [showAcknowledgeSheet, setShowAcknowledgeSheet] = useState(false);
  const [showRejectSheet, setShowRejectSheet] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleAcknowledge = () => {
    console.log("Acknowledge logbook:", logbook.id);
    setShowAcknowledgeSheet(false);
    onBack();
  };

  const handleReject = () => {
    console.log("Reject logbook:", logbook.id, "Reason:", rejectionReason);
    setShowRejectSheet(false);
    setRejectionReason("");
    onBack();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#fef3c7] text-[#92400e]";
      case "acknowledged":
        return "bg-[#d1fae5] text-[#065f46]";
      case "rejected":
        return "bg-[#fee2e2] text-[#991b1b]";
      default:
        return "bg-gray-100 text-gray-700";
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
            Logbook Details
          </p>
          <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px]">
            Review and acknowledge or reject
          </p>
        </div>
        <div className={`px-[10px] py-[4px] rounded-[6px] ${getStatusColor(logbook.status)}`}>
          <span className="font-['Inter:Medium',sans-serif] text-[12px] capitalize">
            {logbook.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-[16px] pb-[100px]">
        <div className="flex flex-col gap-[20px]">
          {/* Employee Info */}
          <div className="bg-gradient-to-r from-[#6172f3] to-[#7f56d9] rounded-[12px] p-[16px]">
            <div className="flex items-center gap-[12px]">
              <div className="w-[48px] h-[48px] bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
                <User className="w-[24px] h-[24px] text-white" />
              </div>
              <div className="flex-1">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-white text-[16px]">
                  {employee.name}
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-white text-opacity-90 text-[13px]">
                  {employee.employeeId} • {employee.position}
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-white text-opacity-80 text-[12px]">
                  {employee.department}
                </p>
              </div>
            </div>
          </div>

          {/* Logbook Information */}
          <div className="bg-[#f9fafb] rounded-[12px] p-[16px] flex flex-col gap-[16px]">
            <div>
              <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px] mb-[4px]">
                Performance Indicator
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[15px]">
                {logbook.performanceIndicator}
              </p>
            </div>

            <div className="border-t border-[#e4e7ec] pt-[16px]">
              <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px] mb-[4px]">
                Package Level
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                {logbook.packageLevel}
              </p>
            </div>

            <div className="border-t border-[#e4e7ec] pt-[16px]">
              <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px] mb-[4px]">
                Competency
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                {logbook.competency}
              </p>
            </div>

            <div className="border-t border-[#e4e7ec] pt-[16px] flex items-center gap-[8px]">
              <Calendar className="w-[16px] h-[16px] text-[#475467]" />
              <div>
                <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
                  Date
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                  {format(logbook.date, "PPP")}
                </p>
              </div>
            </div>

            {logbook.remarks && (
              <div className="border-t border-[#e4e7ec] pt-[16px]">
                <div className="flex items-start gap-[8px]">
                  <FileText className="w-[16px] h-[16px] text-[#475467] mt-[2px]" />
                  <div className="flex-1">
                    <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px] mb-[4px]">
                      Remarks
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1d2939] text-[14px]">
                      {logbook.remarks}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {logbook.status === "pending" && (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur backdrop-filter bg-white p-[16px] border-t border-[#e4e7ec]">
          <div className="flex gap-[12px]">
            <button
              onClick={() => setShowRejectSheet(true)}
              className="flex-1 bg-white border-2 border-[#f04438] rounded-[12px] h-[44px] flex items-center justify-center gap-[8px] hover:bg-[#fef3f2] transition-colors"
            >
              <XCircle className="w-[18px] h-[18px] text-[#f04438]" />
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#f04438] text-[16px]">
                Reject
              </p>
            </button>
            <button
              onClick={() => setShowAcknowledgeSheet(true)}
              className="flex-1 bg-[#12b76a] rounded-[12px] h-[44px] flex items-center justify-center gap-[8px] hover:bg-[#0e9f5c] transition-colors"
            >
              <CheckCircle className="w-[18px] h-[18px] text-white" />
              <p className="font-['Inter:Semi_Bold',sans-serif] text-white text-[16px]">
                Acknowledge
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Acknowledge Bottom Sheet */}
      {showAcknowledgeSheet && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(102,112,133,0.4)] backdrop-blur-[2px] z-40"
            onClick={() => setShowAcknowledgeSheet(false)}
          />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] bg-white rounded-tl-[24px] rounded-tr-[24px] shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.15)] z-50 flex flex-col">
            <div className="flex items-center justify-between px-[31px] py-[16px] border-b border-[#e4e7ec]">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[18px]">
                Acknowledge Logbook
              </p>
              <button onClick={() => setShowAcknowledgeSheet(false)}>
                <XCircle className="w-[24px] h-[24px] text-[#475467]" />
              </button>
            </div>

            <div className="p-[16px]">
              <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[14px] mb-[24px]">
                Are you sure you want to acknowledge this logbook entry? This action will mark the entry as acknowledged.
              </p>

              <div className="flex gap-[12px]">
                <button
                  onClick={() => setShowAcknowledgeSheet(false)}
                  className="flex-1 bg-white border border-[#e4e7ec] rounded-[12px] h-[44px] flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <p className="font-['Inter:Semi_Bold',sans-serif] text-[#475467] text-[16px]">
                    Cancel
                  </p>
                </button>
                <button
                  onClick={handleAcknowledge}
                  className="flex-1 bg-[#12b76a] rounded-[12px] h-[44px] flex items-center justify-center hover:bg-[#0e9f5c] transition-colors"
                >
                  <p className="font-['Inter:Semi_Bold',sans-serif] text-white text-[16px]">
                    Confirm Acknowledgement
                  </p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Reject Bottom Sheet */}
      {showRejectSheet && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(102,112,133,0.4)] backdrop-blur-[2px] z-40"
            onClick={() => setShowRejectSheet(false)}
          />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[402px] bg-white rounded-tl-[24px] rounded-tr-[24px] shadow-[0px_-4px_8px_0px_rgba(0,0,0,0.15)] z-50 flex flex-col">
            <div className="flex items-center justify-between px-[31px] py-[16px] border-b border-[#e4e7ec]">
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[18px]">
                Reject Logbook
              </p>
              <button onClick={() => setShowRejectSheet(false)}>
                <XCircle className="w-[24px] h-[24px] text-[#475467]" />
              </button>
            </div>

            <div className="p-[16px]">
              <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[14px] mb-[16px]">
                Please provide a reason for rejecting this logbook entry.
              </p>

              <div className="mb-[16px]">
                <p className="font-['Inter:Medium',sans-serif] text-[#1d2939] text-[14px] mb-[8px]">
                  Reason for Rejection
                </p>
                <textarea
                  placeholder="Enter rejection reason..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  className="w-full bg-[#fcfcfd] border border-[#e4e7ec] rounded-[12px] px-[16px] py-[12px] font-['Inter:Regular',sans-serif] text-[14px] text-[#1d2939] placeholder:text-[#667085] outline-none focus:border-[#6172f3] resize-none"
                />
              </div>

              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="w-full bg-[#f04438] rounded-[12px] h-[44px] flex items-center justify-center hover:bg-[#d92d20] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] text-white text-[16px]">
                  Confirm Rejection
                </p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
