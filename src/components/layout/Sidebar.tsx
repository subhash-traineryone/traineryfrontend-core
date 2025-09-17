import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Logo = () => (
  <div className="flex items-center gap-3 px-4 py-6">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
      <div className="w-4 h-4 bg-white rounded-full"></div>
    </div>
    <span className="text-xl font-semibold text-gray-900">Memric</span>
  </div>
)

interface CollapsibleSectionProps {
  title: string
  isCollapsed: boolean
  onToggle: () => void
  children: React.ReactNode
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, isCollapsed, onToggle, children }) => {
  return (
    <div className="px-4 mb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 hover:text-gray-600 transition-colors"
      >
        <span>{title}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isCollapsed ? "rotate-0" : "rotate-90"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <div className={`space-y-1 overflow-hidden transition-all duration-200 ${isCollapsed ? "max-h-0" : "max-h-96"}`}>
        {children}
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  path: string
  isActive?: boolean
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isActive = false, onClick }) => {
  const location = useLocation()
  const active = isActive || location.pathname === path

  return (
    <Link
      to={path}
      className={`w-full justify-start h-10 px-4 text-left font-normal hover:bg-blue-50/70 rounded-lg flex items-center gap-3 transition-colors ${
        active ? "font-medium" : ""
      }`}
      style={active ? { backgroundColor: '#4B45E51A', color: '#4B45E5' } : {}}
      onClick={onClick}
    >
      <div className={`w-5 h-5 ${active ? "" : "text-gray-500"}`} style={active ? { color: '#4B45E5' } : {}}>
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  )
}

interface SidebarProps {
  onNavigate?: (path: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const [companyCollapsed, setCompanyCollapsed] = useState(false)
  const [reviewCloudCollapsed, setReviewCloudCollapsed] = useState(false)
  
  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path)
    }
  }

  return (
    <div className="flex flex-col h-screen w-64 bg-gradient-to-b from-slate-50 to-blue-50/30 border-r border-gray-200">
      {/* Logo */}
      <Logo />

      {/* Company Section */}
      <CollapsibleSection
        title="COMPANY"
        isCollapsed={companyCollapsed}
        onToggle={() => setCompanyCollapsed(!companyCollapsed)}
      >
        <NavItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L6 8.44l-.97-.97a.75.75 0 00-1.06 1.06L5.44 10l-1.47 1.47a.75.75 0 001.06 1.06L6 11.56l.97.97a.75.75 0 001.06-1.06L6.56 10l1.47-1.47z" clipRule="evenodd" />
            </svg>
          }
          label="Workforce"
          path="/workforce"
          onClick={() => handleNavigate('/workforce')}
          isActive={location.pathname === '/workforce' || location.pathname === '/' || location.pathname === '/people'}
        />
        <NavItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
            </svg>
          }
          label="My Portal"
          path="/portal"
          onClick={() => handleNavigate('/portal')}
        />
        <NavItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.081 4.492 18 5.608 18 7v11a2 2 0 01-2 2H4a2 2 0 01-2-2V7c0-1.392.92-2.508 2.294-2.607A41.403 41.403 0 016 4.193V3.75zm2.25 2.445c.572.055 1.14.122 1.706.2a.75.75 0 00.088 0c.566-.078 1.134-.145 1.706-.2V3.75a1.25 1.25 0 00-1.25-1.25h-2.5a1.25 1.25 0 00-1.25 1.25v2.445z" clipRule="evenodd" />
            </svg>
          }
          label="Organisation"
          path="/organisation"
          onClick={() => handleNavigate('/organisation')}
        />
      </CollapsibleSection>

      {/* Review Cloud Section */}
      <CollapsibleSection
        title="REVIEW CLOUD"
        isCollapsed={reviewCloudCollapsed}
        onToggle={() => setReviewCloudCollapsed(!reviewCloudCollapsed)}
      >
        <NavItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002z" clipRule="evenodd" />
            </svg>
          }
          label="Cycles"
          path="/cycles"
          onClick={() => handleNavigate('/cycles')}
        />
        <NavItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
            </svg>
          }
          label="Performance"
          path="/performance"
          onClick={() => handleNavigate('/performance')}
        />
        <NavItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
          }
          label="Goals"
          path="/goals"
          onClick={() => handleNavigate('/goals')}
        />
        <NavItem
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
            </svg>
          }
          label="Talent"
          path="/talent"
          onClick={() => handleNavigate('/talent')}
        />
      </CollapsibleSection>

      {/* Spacer to push user info to bottom */}
      <div className="flex-1"></div>

      {/* User Info */}
      <div className="px-4 py-4 border-t border-gray-200 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-medium text-sm">J</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Jean Armstrong
            </p>
            <p className="text-xs text-gray-500 truncate">
              Chief Executive Officer
            </p>
          </div>
          <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
            39 People
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar