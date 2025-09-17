import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components';
import { TopNavigation } from './components';
import WorkforceOverview from './pages/WorkforceOverview';
import PeopleChart from './pages/PeopleChart';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Fixed Sidebar */}
        <div className="fixed left-0 top-0 h-screen w-64 z-10">
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-64 overflow-hidden">
          <TopNavigation />
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/workforce" element={<WorkforceOverview />} />
              <Route path="/people" element={<PeopleChart />} />
              <Route path="/" element={<WorkforceOverview />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;