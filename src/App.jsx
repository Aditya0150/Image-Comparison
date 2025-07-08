import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ImageComparison from './components/ImageComparison';
import ImageSummary from './components/ImageSummary';

function App() {
  const [viewMode, setViewMode] = useState('upload');
  const [comparisonData, setComparisonData] = useState({
    variantA: null,
    variantB: null,
  });

  const handleImageUpload = (variant, imageData) => {
    setComparisonData(prev => ({
      ...prev,
      [`variant${variant}`]: imageData
    }));
    
    if (variant === 'A' && comparisonData.variantB) {
      setViewMode('comparison');
    } else if (variant === 'B' && comparisonData.variantA) {
      setViewMode('comparison');
    }
  };

  const handleRemoveImage = (variant) => {
    setComparisonData(prev => ({
      ...prev,
      [`variant${variant}`]: null
    }));
    

    if (viewMode === 'comparison' || viewMode === 'summary') {
      setViewMode('upload');
    }
  };

  const handleShowDetails = () => {
    setViewMode('summary');
  };

  const handleBackToComparison = () => {
    setViewMode('comparison');
  };

  const renderHeader = () => (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Design Variant Comparison
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Upload two design variants to compare their visual impact and technical specifications. 
        Perfect for A/B testing social media posts, advertisements, and design iterations.
      </p>
    </div>
  );

  const renderContent = () => {
    switch (viewMode) {
      case 'upload':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageUpload
                variant="A"
                onImageUpload={(imageData) => handleImageUpload('A', imageData)}
                currentImage={comparisonData.variantA}
                onRemoveImage={() => handleRemoveImage('A')}
              />
              <ImageUpload
                variant="B"
                onImageUpload={(imageData) => handleImageUpload('B', imageData)}
                currentImage={comparisonData.variantB}
                onRemoveImage={() => handleRemoveImage('B')}
              />
            </div>
            
            {comparisonData.variantA && comparisonData.variantB && (
              <div className="text-center">
                <button
                  onClick={() => setViewMode('comparison')}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Compare Variants
                </button>
              </div>
            )}
          </div>
        );
      
      case 'comparison':
        return (
          <ImageComparison
            variantA={comparisonData.variantA}
            variantB={comparisonData.variantB}
            onShowDetails={handleShowDetails}
          />
        );
      
      case 'summary':
        return (
          <ImageSummary
            variantA={comparisonData.variantA}
            variantB={comparisonData.variantB}
            onBack={handleBackToComparison}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'upload' && renderHeader()}
        
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
        
        {/* Navigation Pills */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg border">
            <button
              onClick={() => setViewMode('upload')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                viewMode === 'upload' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upload
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              disabled={!comparisonData.variantA || !comparisonData.variantB}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                viewMode === 'comparison' 
                  ? 'bg-blue-600 text-white' 
                  : comparisonData.variantA && comparisonData.variantB
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              Compare
            </button>
            <button
              onClick={() => setViewMode('summary')}
              disabled={!comparisonData.variantA || !comparisonData.variantB}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                viewMode === 'summary' 
                  ? 'bg-blue-600 text-white' 
                  : comparisonData.variantA && comparisonData.variantB
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;