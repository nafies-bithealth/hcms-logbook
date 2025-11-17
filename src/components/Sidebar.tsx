import React from 'react'
import { BookOpen, FileText, CheckCircle, LogOut, X } from "lucide-react";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentMenu: string;
  onMenuSelect: (menu: string) => void;
  mode?: "overlay" | "static";
}

export function Sidebar({ isOpen, onClose, currentMenu, onMenuSelect, mode = "overlay" }: SidebarProps) {
  const menuItems = [
    { id: "logbook", label: "Logbook Employee", icon: BookOpen },
    { id: "preceptor", label: "Logbook Preceptor", icon: FileText },
    { id: "acknowledgement", label: "Logbook Acknowledgement", icon: CheckCircle },
  ];

  const handleMenuClick = (menuId: string) => {
    onMenuSelect(menuId);
    onClose();
  };

  return (
    <>
      {mode === "overlay" && isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-51" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`${
          mode === "overlay"
            ? `fixed top-0 left-0 h-full w-[280px] bg-white z-52 transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-[280px] h-full bg-white"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#e4e7ec]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6172f3] to-[#7f56d9] rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[16px]">
                  Nurse Portal
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[12px]">
                  Clinical System
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#475467]" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-[#e4e7ec]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9e77ed] to-[#f79009] rounded-full flex items-center justify-center">
                <span className="font-['Inter:Semi_Bold',sans-serif] text-white text-[16px]">
                  JD
                </span>
              </div>
              <div className="flex-1">
                <p className="font-['Inter:Semi_Bold',sans-serif] text-[#1d2939] text-[14px]">
                  Jane Doe
                </p>
                <p className="font-['Inter:Regular',sans-serif] text-[#475467] text-[12px]">
                  Senior Clinical Nurse
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#f9f5ff] text-[#7f56d9]"
                      : "text-[#344054] hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-['Inter:Medium',sans-serif] text-[14px]">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#e4e7ec]">
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-[#f04438] hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-['Inter:Medium',sans-serif] text-[14px]">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
