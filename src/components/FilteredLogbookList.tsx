import { ArrowLeft, Calendar, MapPin, User, CheckCircle2, AlertCircle } from "lucide-react";

interface LogbookEntry {
  id: string;
  date: string;
  location: string;
  supervisor: string;
  notes: string;
  status: "approved" | "pending" | "revision";
}

interface FilteredLogbookListProps {
  indicatorName: string;
  packageName: string;
  competency: string;
  onBack: () => void;
  onAddLogbook?: (prefilledData: { name: string; package: string; competency: string }) => void;
}

const mockLogbookEntries: LogbookEntry[] = [
  {
    id: "1",
    date: "2024-01-15",
    location: "ICU - Room 302",
    supervisor: "Dr. Sarah Johnson",
    notes: "Patient showed improvement after airway management. All procedures followed correctly.",
    status: "approved",
  },
  {
    id: "2",
    date: "2024-01-18",
    location: "Emergency Department",
    supervisor: "Dr. Michael Chen",
    notes: "Emergency intubation performed successfully. Documentation complete.",
    status: "approved",
  },
  {
    id: "3",
    date: "2024-01-22",
    location: "Ward 3B",
    supervisor: "Sr. Linda Martinez",
    notes: "Routine airway assessment completed. Patient stable.",
    status: "pending",
  },
  {
    id: "4",
    date: "2024-01-25",
    location: "ICU - Room 405",
    supervisor: "Dr. James Wilson",
    notes: "Need to add more details about the assessment procedure.",
    status: "revision",
  },
  {
    id: "5",
    date: "2024-01-28",
    location: "Operating Theater 2",
    supervisor: "Dr. Emily Brown",
    notes: "Pre-operative airway assessment performed according to protocol.",
    status: "approved",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-[#ecfdf3] text-[#039855] border-[#abefc6]";
    case "pending":
      return "bg-[#fef6ee] text-[#f79009] border-[#fed7aa]";
    case "revision":
      return "bg-[#fef3f2] text-[#f04438] border-[#fecdca]";
    default:
      return "bg-gray-100 text-gray-600 border-gray-300";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "approved":
      return "Approved";
    case "pending":
      return "Pending";
    case "revision":
      return "Needs Revision";
    default:
      return status;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export function FilteredLogbookList({
  indicatorName,
  packageName,
  competency,
  onBack,
  onAddLogbook,
}: FilteredLogbookListProps) {
  const minimumRequired = 5;
  const approvedCount = mockLogbookEntries.filter(entry => entry.status === "approved").length;
  const isRequirementMet = approvedCount >= minimumRequired;

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
                Logbook Entries
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[12px] line-clamp-1">
                {indicatorName}
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-br from-[#f9fafb] via-[#faf5ff] to-[#f4ebff] border border-[#e9d7fe] rounded-[12px] p-[14px] shadow-sm">
            <div className="flex flex-col gap-[4px]">
              <p className="font-['Inter:Medium',sans-serif] text-[#6941c6] text-[12px]">
                Package
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#344054] text-[14px]">
                {packageName}
              </p>
            </div>
            <div className="flex flex-col gap-[4px] mt-3">
              <p className="font-['Inter:Medium',sans-serif] text-[#6941c6] text-[12px]">
                Competency
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[#344054] text-[14px]">
                {competency}
              </p>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#e9d7fe]">
              <div className="flex items-center gap-2">
                <p className="font-['Inter:Medium',sans-serif] text-[#6941c6] text-[12px]">
                  Minimum Logbook
                </p>
                {isRequirementMet ? (
                  <CheckCircle2 className="w-4 h-4 text-[#12b76a]" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-[#f79009]" />
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`font-['Inter:Semi_Bold',sans-serif] text-[18px] ${
                  isRequirementMet ? "text-[#12b76a]" : "text-[#f79009]"
                }`}>
                  {approvedCount}
                </span>
                <span className="font-['Inter:Regular',sans-serif] text-[#667085] text-[12px]">
                  / {minimumRequired}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Entries List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-[12px] px-[16px] py-[16px]">
          <p className="font-['Inter:Medium',sans-serif] text-[#475467] text-[12px]">
            {mockLogbookEntries.length} entry
            {mockLogbookEntries.length !== 1 ? "s" : ""} found
          </p>

          {mockLogbookEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-[#fcfcfd] border border-[#e4e7ec] rounded-[8px] p-[12px] hover:border-[#7f56d9] hover:shadow-md transition-all"
            >
              <div className="flex flex-col gap-[8px]">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`px-2 py-1 rounded-full text-[10px] font-['Inter:Medium',sans-serif] border ${getStatusColor(
                      entry.status
                    )}`}
                  >
                    {getStatusLabel(entry.status)}
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#667085]" />
                  <p className="font-['Inter:Medium',sans-serif] text-[#1d2939] text-[14px]">
                    {formatDate(entry.date)}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#667085]" />
                  <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[12px]">
                    {entry.location}
                  </p>
                </div>

                {/* Supervisor */}
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#667085]" />
                  <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[12px]">
                    {entry.supervisor}
                  </p>
                </div>

                {/* Notes */}
                <div className="mt-2 p-3 bg-[#f9fafb] rounded-lg border border-[#e4e7ec]">
                  <p className="font-['Inter:Medium',sans-serif] text-[#344054] text-[12px] mb-1">
                    Notes
                  </p>
                  <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[12px] leading-relaxed">
                    {entry.notes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      {onAddLogbook && (
        <div className="backdrop-blur backdrop-filter bg-gray-50 box-border p-[16px] w-full border-t border-[#e4e7ec]">
          <button 
            onClick={() => onAddLogbook({ 
              name: indicatorName, 
              package: packageName, 
              competency: competency 
            })}
            className="bg-[#6172f3] rounded-[12px] h-[40px] w-full flex items-center justify-center hover:bg-[#4e5fd6] transition-colors"
          >
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[#fcfcfd] text-[16px]">
              Add New Logbook
            </p>
          </button>
        </div>
      )}
    </div>
  );
}
