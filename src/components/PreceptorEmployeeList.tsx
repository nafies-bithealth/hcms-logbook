import { Menu, Search, ChevronDown, User, LayoutGrid, List } from "lucide-react";
import { useState } from "react";

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  departmentCode: string;
  pendingCount: number;
  position: string;
}

interface PreceptorEmployeeListProps {
  onBack: () => void;
  onSelectEmployee: (employee: Employee) => void;
  openSidebar: () => void;
}

export function PreceptorEmployeeList({ onBack, onSelectEmployee, openSidebar }: PreceptorEmployeeListProps) {  
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Mock data - employees who have pending logbooks with this preceptor
  const employees: Employee[] = [
    { id: "1", name: "Geraldi Jonathan", employeeId: "24001254", department: "General Ward Nursing", departmentCode: "SHKJ", pendingCount: 5, position: "Staff Nurse" },
    { id: "2", name: "Mason Olivia", employeeId: "24001255", department: "Pediatric Care", departmentCode: "PLMK", pendingCount: 3, position: "Clinical Nurse" },
    { id: "3", name: "Nguyen Ethan", employeeId: "24001256", department: "Cardiac Rehabilitation", departmentCode: "QWXE", pendingCount: 8, position: "Staff Nurse" },
    { id: "4", name: "Smith Ava", employeeId: "24001257", department: "Emergency Services", departmentCode: "YUIO", pendingCount: 2, position: "Senior Nurse" },
    { id: "5", name: "Patel Aiden", employeeId: "24001258", department: "Surgical Unit", departmentCode: "ASDF", pendingCount: 6, position: "Clinical Nurse" },
    { id: "6", name: "Johnson Mia", employeeId: "24001259", department: "Maternity Care", departmentCode: "RTYU", pendingCount: 4, position: "Staff Nurse" },
    { id: "7", name: "Lee Noah", employeeId: "24001260", department: "Intensive Care Unit", departmentCode: "FGHJ", pendingCount: 7, position: "Senior Nurse" },
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = searchQuery === "" || 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.includes(searchQuery) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPosition = positionFilter === "" || employee.position === positionFilter;
    const matchesStatus = statusFilter === "" || 
      (statusFilter === "pending" && employee.pendingCount > 0);
    
    return matchesSearch && matchesPosition && matchesStatus;
  });

  const positions = Array.from(new Set(employees.map(e => e.position)));

  return (
    <div className="bg-white relative size-full flex flex-col">
      {/* Title Bar */}
      <div className="bg-white border-b border-[#e4e7ec] px-[16px] py-[12px] flex items-center gap-[12px] shrink-0">
        <button
          onClick={openSidebar}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-[20px] h-[20px] text-[#1d2939]" />
        </button>
        <div className="flex-1">
          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[18px]">
            Review Employee Logbook
          </p>
          <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px]">
            Review and approve employee logbook submissions
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-[#e4e7ec] px-[16px] py-[12px] flex flex-col gap-[12px] shrink-0">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#667085]" />
          <input
            type="text"
            placeholder="Search employee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#fcfcfd] border border-[#e4e7ec] rounded-[8px] pl-[38px] pr-[14px] py-[10px] font-['Inter:Regular',sans-serif] text-[14px] text-[#1d2939] placeholder:text-[#667085] outline-none focus:border-[#6172f3]"
          />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex gap-[12px]">
          <div className="flex-1 relative">
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="w-full appearance-none bg-[#fcfcfd] border border-[#e4e7ec] rounded-[8px] px-[14px] py-[10px] font-['Inter:Regular',sans-serif] text-[14px] text-[#1d2939] outline-none focus:border-[#6172f3] cursor-pointer"
            >
              <option value="">All Positions</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#667085] pointer-events-none" />
          </div>
          
          <div className="flex-1 relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-[#fcfcfd] border border-[#e4e7ec] rounded-[8px] px-[14px] py-[10px] font-['Inter:Regular',sans-serif] text-[14px] text-[#1d2939] outline-none focus:border-[#6172f3] cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="pending">Has Pending</option>
            </select>
            <ChevronDown className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#667085] pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex gap-[4px] bg-[#f9fafb] rounded-[8px] p-[4px] shrink-0">
            <button
              onClick={() => setViewMode("card")}
              className={`w-[32px] h-[32px] flex items-center justify-center rounded-[6px] transition-colors ${
                viewMode === "card"
                  ? "bg-white text-[#6172f3] shadow-sm"
                  : "text-[#667085] hover:text-[#1d2939]"
              }`}
            >
              <LayoutGrid className="w-[16px] h-[16px]" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`w-[32px] h-[32px] flex items-center justify-center rounded-[6px] transition-colors ${
                viewMode === "table"
                  ? "bg-white text-[#6172f3] shadow-sm"
                  : "text-[#667085] hover:text-[#1d2939]"
              }`}
            >
              <List className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === "card" ? (
          <div className="p-[16px]">
            <div className="flex flex-col gap-[12px]">
              {filteredEmployees.map((employee) => (
                <button
                  key={employee.id}
                  onClick={() => onSelectEmployee(employee)}
                  className="bg-white border border-[#e4e7ec] rounded-[12px] p-[16px] flex items-center gap-[12px] hover:border-[#6172f3] hover:shadow-sm transition-all text-left"
                >
                  {/* Avatar */}
                  <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#6172f3] to-[#7f56d9] rounded-full flex items-center justify-center shrink-0">
                    <User className="w-[24px] h-[24px] text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[16px] truncate">
                      {employee.name} - {employee.employeeId}
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px] truncate">
                      {employee.departmentCode} - {employee.department}
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[12px] mt-[2px]">
                      {employee.position}
                    </p>
                  </div>

                  {/* Pending Badge */}
                  {employee.pendingCount > 0 && (
                    <div className="bg-[#6172f3] rounded-full px-[12px] py-[6px] shrink-0">
                      <p className="font-['Inter:Semi_Bold',sans-serif] text-white text-[14px]">
                        {employee.pendingCount}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {filteredEmployees.length === 0 && (
              <div className="flex flex-col items-center justify-center py-[48px]">
                <div className="w-[64px] h-[64px] bg-[#f9fafb] rounded-full flex items-center justify-center mb-[16px]">
                  <User className="w-[32px] h-[32px] text-[#98a2b3]" />
                </div>
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[16px] mb-[4px]">
                  No employees found
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[14px] text-center">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-[16px]">
            {filteredEmployees.length > 0 ? (
              <div className="bg-white border border-[#e4e7ec] rounded-[12px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#f9fafb]">
                      <tr>
                        <th className="px-[12px] py-[10px] text-left">
                          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#475467] text-[12px]">
                            Employee
                          </p>
                        </th>
                        <th className="px-[12px] py-[10px] text-left">
                          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#475467] text-[12px]">
                            Department
                          </p>
                        </th>
                        <th className="px-[12px] py-[10px] text-left">
                          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#475467] text-[12px]">
                            Position
                          </p>
                        </th>
                        <th className="px-[12px] py-[10px] text-center">
                          <p className="font-['Inter:Semi_Bold',sans-serif] text-[#475467] text-[12px]">
                            Pending
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e4e7ec]">
                      {filteredEmployees.map((employee) => (
                        <tr
                          key={employee.id}
                          onClick={() => onSelectEmployee(employee)}
                          className="hover:bg-[#f9fafb] cursor-pointer transition-colors"
                        >
                          <td className="px-[12px] py-[12px]">
                            <div className="flex items-center gap-[12px]">
                              <div className="w-[32px] h-[32px] bg-gradient-to-br from-[#6172f3] to-[#7f56d9] rounded-full flex items-center justify-center shrink-0">
                                <User className="w-[16px] h-[16px] text-white" />
                              </div>
                              <div>
                                <p className="font-['Inter:Medium',sans-serif] text-[#1d2939] text-[14px]">
                                  {employee.name}
                                </p>
                                <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[12px]">
                                  {employee.employeeId}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-[12px] py-[12px]">
                            <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px]">
                              {employee.departmentCode}
                            </p>
                            <p className="font-['Inter:Regular',sans-serif] text-[#667085] text-[12px]">
                              {employee.department}
                            </p>
                          </td>
                          <td className="px-[12px] py-[12px]">
                            <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[13px]">
                              {employee.position}
                            </p>
                          </td>
                          <td className="px-[12px] py-[12px]">
                            <div className="flex justify-center">
                              {employee.pendingCount > 0 ? (
                                <div className="bg-[#6172f3] rounded-full px-[12px] py-[4px]">
                                  <p className="font-['Inter:Semi_Bold',sans-serif] text-white text-[13px]">
                                    {employee.pendingCount}
                                  </p>
                                </div>
                              ) : (
                                <p className="font-['Inter:Regular',sans-serif] text-[#98a2b3] text-[13px]">
                                  -
                                </p>
                              )}
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
                  <User className="w-[32px] h-[32px] text-[#98a2b3]" />
                </div>
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[16px] mb-[4px]">
                  No employees found
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[14px] text-center">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
