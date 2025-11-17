import { useState } from "react";
import { Suspense, lazy } from "react";
import { Sidebar } from "./components/Sidebar";
import { LogbookList } from "./components/LogbookList";
import { PerformanceIndicators } from "./components/PerformanceIndicators";
import { FilteredLogbookList } from "./components/FilteredLogbookList";
import { PreceptorEmployeeList } from "./components/PreceptorEmployeeList";
import { PreceptorLogbookList } from "./components/PreceptorLogbookList";
import { PreceptorLogbookDetail } from "./components/PreceptorLogbookDetail";
import { AcknowledgementEmployeeList } from "./components/AcknowledgementEmployeeList";
import { AcknowledgementLogbookList } from "./components/AcknowledgementLogbookList";
import { AcknowledgementLogbookDetail } from "./components/AcknowledgementLogbookDetail";
const AddLogbook = lazy(() => import("./components/AddLogbook").then(m => ({ default: m.AddLogbook })));

interface LogbookEntry {
  id: string;
  title: string;
  currentLog: number;
  totalLog: number;
  percentage: number;
  level: string;
  levelType: "current" | "target";
}

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  departmentCode: string;
  pendingCount: number;
  position: string;
}

interface PreceptorLogbook {
  id: string;
  performanceIndicator: string;
  packageLevel: string;
  competency: string;
  date: Date;
  remarks: string;
  status: "pending" | "approved" | "rejected";
}

interface AcknowledgementLogbook {
  id: string;
  performanceIndicator: string;
  packageLevel: string;
  competency: string;
  date: Date;
  remarks: string;
  status: "pending" | "acknowledged" | "rejected";
}

type AppView = "logbook-list" | "performance-indicators" | "add-logbook" | "filtered-logbook-list" | "preceptor-employee-list" | "preceptor-logbook-list" | "preceptor-logbook-detail" | "acknowledgement-employee-list" | "acknowledgement-logbook-list" | "acknowledgement-logbook-detail";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("logbook");
  const [currentView, setCurrentView] = useState<AppView>("logbook-list");
  const [selectedLogbook, setSelectedLogbook] = useState<LogbookEntry | null>(
    null
  );
  const [prefilledIndicator, setPrefilledIndicator] = useState<{
    name: string;
    package: string;
    competency: string;
  } | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<{
    id: string;
    name: string;
    package: string;
    competency: string;
  } | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedPreceptorLogbook, setSelectedPreceptorLogbook] = useState<PreceptorLogbook | null>(null);
  const [selectedAcknowledgementEmployee, setSelectedAcknowledgementEmployee] = useState<Employee | null>(null);
  const [selectedAcknowledgementLogbook, setSelectedAcknowledgementLogbook] = useState<AcknowledgementLogbook | null>(null);

  const handleCardClick = (entry: LogbookEntry) => {
    setSelectedLogbook(entry);
    setCurrentView("performance-indicators");
  };

  const handleBackToList = () => {
    setCurrentView("logbook-list");
    setSelectedLogbook(null);
  };

  const handleAddLogbook = () => {
    setPrefilledIndicator(null);
    setCurrentView("add-logbook");
  };

  const handleAddIndicator = (indicator: { name: string; package: string; competency: string }) => {
    setPrefilledIndicator(indicator);
    setCurrentView("add-logbook");
  };

  const handleBackFromAdd = () => {
    setPrefilledIndicator(null);
    if (selectedLogbook) {
      setCurrentView("performance-indicators");
    } else {
      setCurrentView("logbook-list");
    }
  };

  const handleViewIndicator = (indicator: { id: string; name: string; package: string; competency: string }) => {
    setSelectedIndicator(indicator);
    setCurrentView("filtered-logbook-list");
  };

  const handleBackFromFiltered = () => {
    setSelectedIndicator(null);
    if (selectedLogbook) {
      setCurrentView("performance-indicators");
    } else {
      setCurrentView("logbook-list");
    }
  };

  const handleAddLogbookFromFiltered = (prefilledData: { name: string; package: string; competency: string }) => {
    setPrefilledIndicator(prefilledData);
    setCurrentView("add-logbook");
  };

  const handleMenuSelect = (menu: string) => {
    setCurrentMenu(menu);
    if (menu === "logbook") {
      setCurrentView("logbook-list");
      setSelectedLogbook(null);
      setSelectedEmployee(null);
      setSelectedPreceptorLogbook(null);
      setSelectedAcknowledgementEmployee(null);
      setSelectedAcknowledgementLogbook(null);
    } else if (menu === "preceptor") {
      setCurrentView("preceptor-employee-list");
      setSelectedLogbook(null);
      setSelectedEmployee(null);
      setSelectedPreceptorLogbook(null);
      setSelectedAcknowledgementEmployee(null);
      setSelectedAcknowledgementLogbook(null);
    } else if (menu === "acknowledgement") {
      setCurrentView("acknowledgement-employee-list");
      setSelectedLogbook(null);
      setSelectedEmployee(null);
      setSelectedPreceptorLogbook(null);
      setSelectedAcknowledgementEmployee(null);
      setSelectedAcknowledgementLogbook(null);
    }
  };

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setCurrentView("preceptor-logbook-list");
  };

  const handleBackToEmployeeList = () => {
    setSelectedEmployee(null);
    setSelectedPreceptorLogbook(null);
    setCurrentView("preceptor-employee-list");
  };

  const handleViewLogbookDetails = (logbook: PreceptorLogbook) => {
    setSelectedPreceptorLogbook(logbook);
    setCurrentView("preceptor-logbook-detail");
  };

  const handleBackToLogbookList = () => {
    setSelectedPreceptorLogbook(null);
    setCurrentView("preceptor-logbook-list");
  };

  const handleSelectAcknowledgementEmployee = (employee: Employee) => {
    setSelectedAcknowledgementEmployee(employee);
    setCurrentView("acknowledgement-logbook-list");
  };

  const handleBackToAcknowledgementEmployeeList = () => {
    setSelectedAcknowledgementEmployee(null);
    setSelectedAcknowledgementLogbook(null);
    setCurrentView("acknowledgement-employee-list");
  };

  const handleViewAcknowledgementLogbookDetails = (logbook: AcknowledgementLogbook) => {
    setSelectedAcknowledgementLogbook(logbook);
    setCurrentView("acknowledgement-logbook-detail");
  };

  const handleBackToAcknowledgementLogbookList = () => {
    setSelectedAcknowledgementLogbook(null);
    setCurrentView("acknowledgement-logbook-list");
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="md:grid md:grid-cols-[280px_1fr] md:min-h-screen">
        {/* <div className="hidden md:block border-r border-[#e4e7ec]">
          <Sidebar
            isOpen={true}
            onClose={() => void 0}
            currentMenu={currentMenu}
            onMenuSelect={handleMenuSelect}
            mode="static"
          />
        </div> */}
        <div className="md:hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            currentMenu={currentMenu}
            onMenuSelect={handleMenuSelect}
            mode="overlay"
          />
        </div>
        <main className="w-full">
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            {currentView === "logbook-list" && (
              <LogbookList
                onMenuClick={() => setSidebarOpen(true)}
                onCardClick={handleCardClick}
                onAddLogbook={handleAddLogbook}
                onViewIndicator={handleViewIndicator}
                onAddLogbookWithData={handleAddIndicator}
              />
            )}

            {currentView === "performance-indicators" && selectedLogbook && (
              <PerformanceIndicators
                logbookTitle={selectedLogbook.title}
                onBack={handleBackToList}
                onAddIndicator={handleAddIndicator}
                onAddNewLogbook={handleAddLogbook}
                onViewIndicator={handleViewIndicator}
              />
            )}

            {currentView === "add-logbook" && (
              <AddLogbook 
                onBack={handleBackFromAdd}
                prefilledData={prefilledIndicator}
              />
            )}

            {currentView === "filtered-logbook-list" && selectedIndicator && (
              <FilteredLogbookList
                indicatorName={selectedIndicator.name}
                packageName={selectedIndicator.package}
                competency={selectedIndicator.competency}
                onBack={handleBackFromFiltered}
                onAddLogbook={handleAddLogbookFromFiltered}
              />
            )}

            {currentView === "preceptor-employee-list" && (
              <PreceptorEmployeeList
                onBack={() => setSidebarOpen(true)}
                onSelectEmployee={handleSelectEmployee}
              />
            )}

            {currentView === "preceptor-logbook-list" && selectedEmployee && (
              <PreceptorLogbookList
                employee={selectedEmployee}
                onBack={handleBackToEmployeeList}
                onViewDetails={handleViewLogbookDetails}
              />
            )}

            {currentView === "preceptor-logbook-detail" && selectedEmployee && selectedPreceptorLogbook && (
              <PreceptorLogbookDetail
                employee={selectedEmployee}
                logbook={selectedPreceptorLogbook}
                onBack={handleBackToLogbookList}
              />
            )}

            {currentView === "acknowledgement-employee-list" && (
              <AcknowledgementEmployeeList
                onBack={() => setSidebarOpen(true)}
                onSelectEmployee={handleSelectAcknowledgementEmployee}
              />
            )}

            {currentView === "acknowledgement-logbook-list" && selectedAcknowledgementEmployee && (
              <AcknowledgementLogbookList
                employee={selectedAcknowledgementEmployee}
                onBack={handleBackToAcknowledgementEmployeeList}
                onViewDetails={handleViewAcknowledgementLogbookDetails}
              />
            )}

            {currentView === "acknowledgement-logbook-detail" && selectedAcknowledgementEmployee && selectedAcknowledgementLogbook && (
              <AcknowledgementLogbookDetail
                employee={selectedAcknowledgementEmployee}
                logbook={selectedAcknowledgementLogbook}
                onBack={handleBackToAcknowledgementLogbookList}
              />
            )}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
