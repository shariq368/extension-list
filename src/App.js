
import React, { useState, useEffect } from 'react';
import ExtensionForm from './components/ExtensionForm';
import ExtensionList from './components/ExtensionList';
import SearchBar from './components/SearchBar';

function App() {
  const [extensions, setExtensions] = useState([]);
  const [filteredExtensions, setFilteredExtensions] = useState([]);
  const [editingExtension, setEditingExtension] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load extensions from localStorage on component mount
  useEffect(() => {
    const savedExtensions = localStorage.getItem('extensions');
    if (savedExtensions) {
      const parsed = JSON.parse(savedExtensions);
      setExtensions(parsed);
      setFilteredExtensions(parsed);
    }
  }, []);

  // Save extensions to localStorage whenever extensions change
  useEffect(() => {
    localStorage.setItem('extensions', JSON.stringify(extensions));
  }, [extensions]);

  // Filter extensions based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredExtensions(extensions);
    } else {
      const filtered = extensions.filter(ext => 
        ext.floorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ext.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ext.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ext.extensionNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExtensions(filtered);
    }
  }, [searchTerm, extensions]);

  const addExtension = (extension) => {
    const newExtension = {
      ...extension,
      id: Date.now().toString()
    };
    setExtensions(prev => [...prev, newExtension]);
  };

  const updateExtension = (updatedExtension) => {
    setExtensions(prev => 
      prev.map(ext => 
        ext.id === updatedExtension.id ? updatedExtension : ext
      )
    );
    setEditingExtension(null);
  };

  const deleteExtension = (id) => {
    if (window.confirm('Are you sure you want to delete this extension?')) {
      setExtensions(prev => prev.filter(ext => ext.id !== id));
    }
  };

  const startEdit = (extension) => {
    setEditingExtension(extension);
  };

  const cancelEdit = () => {
    setEditingExtension(null);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Extension List Management</h1>
        </div>
      </header>

      <div className="container">
        <ExtensionForm
          onSubmit={editingExtension ? updateExtension : addExtension}
          initialData={editingExtension}
          isEditing={!!editingExtension}
          onCancel={cancelEdit}
        />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <ExtensionList
          extensions={filteredExtensions}
          onEdit={startEdit}
          onDelete={deleteExtension}
        />
      </div>
    </div>
  );
}

export default App;
