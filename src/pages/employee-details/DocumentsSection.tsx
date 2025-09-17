import React, { useState, useRef } from 'react';
import { 
  Upload, 
  MoreHorizontal, 
  Download, 
  Trash2, 
  FolderPlus,
  FileText,
  Image,
  File,
  ChevronDown,
  X
} from 'lucide-react';
import { useEmployeeDetailsStore } from '../../stores/employeeDetailsStore';

interface DocumentsSectionProps {
  employee: any;
}


interface Folder {
  id: string;
  name: string;
  count: number;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ employee: _employee }) => {
  const { selectedEmployee, addDocument, updateDocument, removeDocument } = useEmployeeDetailsStore();
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All Documents');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);
  const [showMoveMenu, setShowMoveMenu] = useState<string | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Upload modal state
  const [uploadData, setUploadData] = useState({
    name: '',
    folder: 'Identity Information'
  });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const actionsMenuRef = useRef<HTMLDivElement>(null);
  const moveMenuRef = useRef<HTMLDivElement>(null);

  // Get documents from store
  const documents = selectedEmployee?.documents || [];

  // Calculate folder counts
  const folders: Folder[] = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'identity', name: 'Identity Information', count: documents.filter(doc => doc.folder === 'Identity Information').length },
    { id: 'contracts', name: 'Contracts', count: documents.filter(doc => doc.folder === 'Contracts').length },
    { id: 'reviews', name: 'Reviews', count: documents.filter(doc => doc.folder === 'Reviews').length },
    { id: 'certificates', name: 'Certificates', count: documents.filter(doc => doc.folder === 'Certificates').length }
  ];

  // Filter documents based on search and folder
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'All Documents' || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + rowsPerPage);

  // File type icon
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <Image className="w-4 h-4 text-blue-500" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadData(prev => ({ ...prev, name: file.name }));
    }
  };

  // Handle document upload
  const handleUpload = () => {
    if (uploadFile && uploadData.name) {
      const newDocument = {
        id: Date.now().toString(),
        name: uploadData.name,
        type: uploadFile.type.split('/')[1].toUpperCase(),
        createdBy: { name: 'Current User', avatar: 'U' },
        creationDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        folder: uploadData.folder,
        size: `${(uploadFile.size / 1024 / 1024).toFixed(1)} MB`
      };
      
      addDocument(newDocument);
      setShowUploadModal(false);
      setUploadData({ name: '', folder: 'Identity Information' });
      setUploadFile(null);
    }
  };

  // Handle document actions
  const handleDownload = (documentId: string) => {
    console.log('Download document:', documentId);
  };

  const handleDelete = (documentId: string) => {
    removeDocument(documentId);
    setShowActionsMenu(null);
  };

  const handleMove = (documentId: string, newFolder: string) => {
    updateDocument(documentId, { folder: newFolder });
    setShowMoveMenu(null);
  };

  // Handle checkbox selection
  const handleSelectDocument = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === paginatedDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(paginatedDocuments.map(doc => doc.id));
    }
  };

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target as Node)) {
        setShowActionsMenu(null);
      }
      if (moveMenuRef.current && !moveMenuRef.current.contains(event.target as Node)) {
        setShowMoveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Documents</h2>
        <p className="text-sm text-gray-600">Manage employee documents and files</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-4 flex items-center justify-between">
        {/* Left side - Search and Upload */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center justify-center bg-[#4b45e5] text-white p-3 rounded-lg hover:bg-[#4b45e5]/90 transition-colors w-9 h-9"
          >
            <Upload className="w-4 h-4" />
          </button>
        </div>

        {/* Right side - Folder Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-950 whitespace-nowrap flex items-center">Folder:</span>
          <div className="relative flex items-center">
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="appearance-none bg-white border border-zinc-200 rounded-md px-3 py-1.5 pr-8 h-8 text-sm text-zinc-950 focus:ring-1 focus:ring-blue-500 focus:border-transparent shadow-sm min-w-[120px] leading-none"
            >
              {folders.map(folder => (
                <option key={folder.id} value={folder.name} className="py-1">
                  {folder.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none opacity-50" />
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-visible">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-1 px-2 py-1 h-10 items-center">
            <div className="col-span-1 flex items-center justify-center">
              <input
                type="checkbox"
                checked={selectedDocuments.length === paginatedDocuments.length && paginatedDocuments.length > 0}
                onChange={handleSelectAll}
                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-3 flex items-center text-xs font-normal text-zinc-500 text-left whitespace-nowrap overflow-hidden">Name</div>
            <div className="col-span-1 flex items-center justify-center text-xs font-normal text-zinc-500 whitespace-nowrap overflow-hidden">Type</div>
            <div className="col-span-2 flex items-center text-xs font-normal text-zinc-500 text-left whitespace-nowrap overflow-hidden">Created By</div>
            <div className="col-span-2 flex items-center justify-end text-xs font-normal text-zinc-500 whitespace-nowrap overflow-hidden">Creation Date</div>
            <div className="col-span-2 flex items-center justify-end text-xs font-normal text-zinc-500 whitespace-nowrap overflow-hidden">Last Updated</div>
            <div className="col-span-1 flex items-center justify-center"></div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {paginatedDocuments.map((document) => (
            <div key={document.id} className="grid grid-cols-12 gap-1 px-2 py-2 h-10 items-center hover:bg-gray-50">
              <div className="col-span-1 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedDocuments.includes(document.id)}
                  onChange={() => handleSelectDocument(document.id)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-3 flex items-center gap-1 min-w-0">
                {getFileIcon(document.type)}
                <span className="text-xs text-zinc-950 whitespace-nowrap overflow-hidden text-ellipsis flex-1">{document.name}</span>
              </div>
              <div className="col-span-1 flex items-center justify-center gap-1 min-w-0">
                {getFileIcon(document.type)}
                <span className="text-xs text-zinc-950 whitespace-nowrap overflow-hidden text-ellipsis">{document.type}</span>
              </div>
              <div className="col-span-2 flex items-center gap-1.5 min-w-0">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-zinc-950">{document.createdBy.avatar}</span>
                </div>
                <span className="text-xs text-zinc-950 whitespace-nowrap overflow-hidden text-ellipsis flex-1">{document.createdBy.name}</span>
              </div>
              <div className="col-span-2 flex items-center justify-end min-w-0">
                <span className="text-xs text-zinc-950 whitespace-nowrap overflow-hidden text-ellipsis">{document.creationDate}</span>
              </div>
              <div className="col-span-2 flex items-center justify-end min-w-0">
                <span className="text-xs text-zinc-950 whitespace-nowrap overflow-hidden text-ellipsis">{document.lastUpdated}</span>
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <div className="relative" ref={actionsMenuRef}>
                  <button
                    onClick={() => setShowActionsMenu(showActionsMenu === document.id ? null : document.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                  
                  {showActionsMenu === document.id && (
                    <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]">
                      <div className="py-1">
                        <button
                          onClick={() => handleDownload(document.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button
                          onClick={() => setShowMoveMenu(showMoveMenu === document.id ? null : document.id)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <FolderPlus className="w-4 h-4" />
                          Move to
                        </button>
                        <button
                          onClick={() => handleDelete(document.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-0 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-zinc-500">
              {selectedDocuments.length} of {filteredDocuments.length} row(s) selected.
            </div>
            
            <div className="flex items-center gap-2">
              {/* Rows per page */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-zinc-950">Rows per page</span>
                <div className="relative">
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="appearance-none bg-white border border-zinc-200 rounded-md px-3 py-2 pr-8 h-8 text-sm text-zinc-950 focus:ring-1 focus:ring-blue-500 focus:border-transparent shadow-sm w-[70px]"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none opacity-50" />
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-950">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-200 bg-white w-8 h-8"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-200 bg-white w-8 h-8"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-200 bg-white w-8 h-8"
                  >
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-200 bg-white w-8 h-8"
                  >
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white relative rounded-lg w-full max-w-md mx-4 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
            {/* Close Button */}
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-2.5 right-2.5 p-1.5 rounded hover:bg-gray-100 z-10"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            
            {/* Header */}
            <div className="px-6 pt-6 pb-1.5">
              <h3 className="text-lg font-semibold text-slate-950 tracking-[-0.45px]">
                Upload Document
              </h3>
            </div>
            
            {/* Content */}
            <div className="px-6 py-2 pb-8 space-y-8">
              {/* Document Name Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-slate-950 w-1/4">
                    Name
                  </label>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={uploadData.name}
                      onChange={(e) => setUploadData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Name of document"
                    />
                  </div>
                </div>
              </div>
              
              {/* File Upload Area */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1/4">
                    <label className="text-sm font-medium text-slate-950">
                      Upload Doc
                    </label>
                    <p className="text-xs text-slate-500">(Max size: 20MB)</p>
                  </div>
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm text-slate-500 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      Drag/Click here to upload
                    </button>
                    {uploadFile && (
                      <p className="text-xs text-slate-600 mt-1">
                        Selected: {uploadFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-6 pb-6 flex justify-end">
              <button
                onClick={handleUpload}
                className="px-3 py-2 bg-[#4b45e5] text-slate-50 text-sm font-medium rounded-md hover:bg-[#3d37d4] focus:outline-none focus:ring-2 focus:ring-[#4b45e5] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!uploadFile || !uploadData.name}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move to Folder Menu */}
      {showMoveMenu && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-sm mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Move to Folder</h3>
              <div className="space-y-2">
                {folders.filter(f => f.id !== 'all').map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => handleMove(showMoveMenu, folder.name)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    {folder.name}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowMoveMenu(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsSection;