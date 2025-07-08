import React from 'react';
import { ArrowLeft, FileImage, Monitor, Smartphone, Download } from 'lucide-react';
import { formatFileSize } from '../utils/imageUtils';

const ImageSummary = ({ variantA, variantB, onBack }) => {
  if (!variantA || !variantB) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Both variants are required for detailed analysis</p>
      </div>
    );
  }

  const getAspectRatio = (dimensions) => {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(dimensions.width, dimensions.height);
    return `${dimensions.width / divisor}:${dimensions.height / divisor}`;
  };

  const getDeviceOptimization = (dimensions) => {
    const { width, height } = dimensions;
    const aspectRatio = width / height;
    
    if (aspectRatio > 1.7) return { device: 'Desktop', icon: Monitor, score: 'Excellent' };
    if (aspectRatio > 1.2) return { device: 'Tablet', icon: Monitor, score: 'Good' };
    if (aspectRatio < 0.8) return { device: 'Mobile', icon: Smartphone, score: 'Excellent' };
    return { device: 'Universal', icon: Monitor, score: 'Good' };
  };

  const variantAOptimization = getDeviceOptimization(variantA.dimensions);
  const variantBOptimization = getDeviceOptimization(variantB.dimensions);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">
          Detailed Analysis
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Variant A</h3>
            <p className="text-blue-100 text-sm">{variantA.name}</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={variantA.url}
                alt="Variant A"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileImage size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Format</span>
                </div>
                <p className="text-gray-900">{variantA.format}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Download size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">File Size</span>
                </div>
                <p className="text-gray-900">{formatFileSize(variantA.size)}</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Dimensions</span>
                <p className="text-gray-900">{variantA.dimensions.width} × {variantA.dimensions.height}</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Aspect Ratio</span>
                <p className="text-gray-900">{getAspectRatio(variantA.dimensions)}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <variantAOptimization.icon size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Optimized For</span>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">{variantAOptimization.device}</p>
                  <p className="text-xs text-green-600">{variantAOptimization.score}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Variant B</h3>
            <p className="text-purple-100 text-sm">{variantB.name}</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={variantB.url}
                alt="Variant B"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileImage size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Format</span>
                </div>
                <p className="text-gray-900">{variantB.format}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Download size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">File Size</span>
                </div>
                <p className="text-gray-900">{formatFileSize(variantB.size)}</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Dimensions</span>
                <p className="text-gray-900">{variantB.dimensions.width} × {variantB.dimensions.height}</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Aspect Ratio</span>
                <p className="text-gray-900">{getAspectRatio(variantB.dimensions)}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <variantBOptimization.icon size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Optimized For</span>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">{variantBOptimization.device}</p>
                  <p className="text-xs text-green-600">{variantBOptimization.score}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {((variantA.size / variantB.size) * 100).toFixed(0)}%
            </div>
            <p className="text-sm text-gray-600">Size Ratio (A/B)</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {Math.abs(variantA.dimensions.width - variantB.dimensions.width)}px
            </div>
            <p className="text-sm text-gray-600">Width Difference</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {variantA.format === variantB.format ? 'Same' : 'Different'}
            </div>
            <p className="text-sm text-gray-600">Format Match</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSummary;