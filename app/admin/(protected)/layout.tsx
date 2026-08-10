'use client';

import { logout } from '../login/actions';

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream font-sans text-textDark">
      <header className="bg-white border-b border-creamDark shadow-sm sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <img
              src="/images/reggi-logo.jpg"
              alt="REGGI Logo"
              className="h-[24px] object-contain"
            />
          </div>
          <h1 className="font-bold text-greenDark text-[18px]">Admin Dashboard</h1>
        </div>
        <button
          onClick={() => logout()}
          className="text-[14px] font-medium text-textMid hover:text-redAccent transition-colors px-3 py-1.5 rounded-full hover:bg-redAccent/5 cursor-pointer"
        >
          Logout
        </button>
      </header>
      <main className="max-w-[1200px] mx-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
