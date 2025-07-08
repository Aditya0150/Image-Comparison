import React, { useState } from 'react';
import { Eye, EyeOff, Maximize2, Info, Trophy, Star, CheckCircle } from 'lucide-react';

const ImageComparison = ({ 
  variantA, 
  variantB, 
  onShowDetails 
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const analyzeDesigns = () => {
    if (!variantA || !variantB) return null;

    let scoreA = 0;
    let scoreB = 0;
    const factors = [];


    if (variantA.size < variantB.size) {
      scoreA += 2;
      factors.push({ factor: 'File Size', winner: 'A', reason: 'Smaller file size for faster loading' });
    } else if (variantB.size < variantA.size) {
      scoreB += 2;
      factors.push({ factor: 'File Size', winner: 'B', reason: 'Smaller file size for faster loading' });
    } else {
      factors.push({ factor: 'File Size', winner: 'Tie', reason: 'Equal file sizes' });
    }


    const getAspectScore = (dimensions) => {
      const ratio = dimensions.width / dimensions.height;
      const goldenRatio = 1.618;
      const commonRatios = [16/9, 4/3, 3/2, 1/1]; 
      

      if (Math.abs(ratio - goldenRatio) < 0.1) return 3;
      

      for (let commonRatio of commonRatios) {
        if (Math.abs(ratio - commonRatio) < 0.05) return 2;
      }
      
      return 1;
    };

    const aspectScoreA = getAspectScore(variantA.dimensions);
    const aspectScoreB = getAspectScore(variantB.dimensions);
    
    if (aspectScoreA > aspectScoreB) {
      scoreA += 1;
      factors.push({ factor: 'Aspect Ratio', winner: 'A', reason: 'Better proportional composition' });
    } else if (aspectScoreB > aspectScoreA) {
      scoreB += 1;
      factors.push({ factor: 'Aspect Ratio', winner: 'B', reason: 'Better proportional composition' });
    } else {
      factors.push({ factor: 'Aspect Ratio', winner: 'Tie', reason: 'Similar aspect ratios' });
    }


    const pixelsA = variantA.dimensions.width * variantA.dimensions.height;
    const pixelsB = variantB.dimensions.width * variantB.dimensions.height;
    
    if (pixelsA > pixelsB * 1.2) {
      scoreA += 1;
      factors.push({ factor: 'Resolution', winner: 'A', reason: 'Higher resolution for better detail' });
    } else if (pixelsB > pixelsA * 1.2) {
      scoreB += 1;
      factors.push({ factor: 'Resolution', winner: 'B', reason: 'Higher resolution for better detail' });
    } else {
      factors.push({ factor: 'Resolution', winner: 'Tie', reason: 'Similar resolution quality' });
    }

    // Format optimization
    const formatScore = (format) => {
      switch (format.toLowerCase()) {
        case 'webp': return 3;
        case 'jpg':
        case 'jpeg': return 2;
        case 'png': return 1;
        default: return 0;
      }
    };

    const formatScoreA = formatScore(variantA.format);
    const formatScoreB = formatScore(variantB.format);
    
    if (formatScoreA > formatScoreB) {
      scoreA += 1;
      factors.push({ factor: 'Format', winner: 'A', reason: 'More web-optimized format' });
    } else if (formatScoreB > formatScoreA) {
      scoreB += 1;
      factors.push({ factor: 'Format', winner: 'B', reason: 'More web-optimized format' });
    } else {
      factors.push({ factor: 'Format', winner: 'Tie', reason: 'Same format efficiency' });
    }


    let recommendation;
    if (scoreA > scoreB) {
      recommendation = { winner: 'A', confidence: scoreA > scoreB + 1 ? 'High' : 'Medium' };
    } else if (scoreB > scoreA) {
      recommendation = { winner: 'B', confidence: scoreB > scoreA + 1 ? 'High' : 'Medium' };
    } else {
      recommendation = { winner: 'Tie', confidence: 'Equal' };
    }

    return { recommendation, factors, scoreA, scoreB };
  };

  const analysis = analyzeDesigns();
  if (!variantA || !variantB) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Eye size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Ready to Compare
        </h3>
        <p className="text-gray-600">
          Upload both variants to start comparing
        </p>
      </div>
    );
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Comparison View
        </h2>
        <button
          onClick={onShowDetails}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Info size={16} className="mr-2" />
          View Details
        </button>
      </div>


      {analysis && (
        <div className={`rounded-xl p-6 border-2 ${
          analysis.recommendation.winner === 'A' 
            ? 'bg-blue-50 border-blue-200' 
            : analysis.recommendation.winner === 'B'
            ? 'bg-purple-50 border-purple-200'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                analysis.recommendation.winner === 'A' 
                  ? 'bg-blue-500' 
                  : analysis.recommendation.winner === 'B'
                  ? 'bg-purple-500'
                  : 'bg-gray-500'
              }`}>
                <Trophy size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {analysis.recommendation.winner === 'Tie' 
                    ? 'Both Variants Are Equally Strong' 
                    : `Variant ${analysis.recommendation.winner} Recommended`
                  }
                </h3>
                <p className="text-sm text-gray-600">
                  Confidence: {analysis.recommendation.confidence}
                  {analysis.recommendation.winner !== 'Tie' && 
                    ` • Score: ${analysis.recommendation.winner === 'A' ? analysis.scoreA : analysis.scoreB} points`
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">AI Analysis</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {analysis.factors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <CheckCircle size={14} className={`${
                  factor.winner === 'A' ? 'text-blue-500' :
                  factor.winner === 'B' ? 'text-purple-500' :
                  'text-gray-400'
                }`} />
                <span className="font-medium text-gray-700">{factor.factor}:</span>
                <span className={`${
                  factor.winner === 'A' ? 'text-blue-600' :
                  factor.winner === 'B' ? 'text-purple-600' :
                  'text-gray-600'
                }`}>
                  {factor.winner === 'Tie' ? 'Equal' : `Variant ${factor.winner}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className={`space-y-4 ${
          analysis?.recommendation.winner === 'A' ? 'ring-2 ring-blue-500 ring-opacity-50 rounded-xl p-4 bg-blue-50/30' : ''
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">Variant A</h3>
              {analysis?.recommendation.winner === 'A' && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                  <Trophy size={12} />
                  <span>Recommended</span>
                </div>
              )}
            </div>
            <button
              onClick={() => handleImageClick(variantA)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Maximize2 size={18} />
            </button>
          </div>
          
          <div className="relative group cursor-pointer" onClick={() => handleImageClick(variantA)}>
            <img
              src={variantA.url}
              alt="Variant A"
              className="w-full h-80 object-cover rounded-xl border-2 border-gray-200 shadow-md group-hover:shadow-lg transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2 shadow-lg">
                <Maximize2 size={20} className="text-gray-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Dimensions:</span>
                <p className="text-gray-600">{variantA.dimensions.width} × {variantA.dimensions.height}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Size:</span>
                <p className="text-gray-600">{(variantA.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`space-y-4 ${
          analysis?.recommendation.winner === 'B' ? 'ring-2 ring-purple-500 ring-opacity-50 rounded-xl p-4 bg-purple-50/30' : ''
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">Variant B</h3>
              {analysis?.recommendation.winner === 'B' && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                  <Trophy size={12} />
                  <span>Recommended</span>
                </div>
              )}
            </div>
            <button
              onClick={() => handleImageClick(variantB)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Maximize2 size={18} />
            </button>
          </div>
          
          <div className="relative group cursor-pointer" onClick={() => handleImageClick(variantB)}>
            <img
              src={variantB.url}
              alt="Variant B"
              className="w-full h-80 object-cover rounded-xl border-2 border-gray-200 shadow-md group-hover:shadow-lg transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2 shadow-lg">
                <Maximize2 size={20} className="text-gray-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Dimensions:</span>
                <p className="text-gray-600">{variantB.dimensions.width} × {variantB.dimensions.height}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Size:</span>
                <p className="text-gray-600">{(variantB.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Overlay */}
      {showOverlay && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closeOverlay}>
          <div className="relative max-w-4xl max-h-4xl p-4">
            <button
              onClick={closeOverlay}
              className="absolute -top-2 -right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-200 z-10"
            >
              <EyeOff size={20} />
            </button>
            <img
              src={selectedImage.url}
              alt="Full size preview"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComparison;