# Image Comparison Tool

A modern, intelligent web application for comparing design variants with AI-powered analysis and recommendations. Perfect for A/B testing social media posts, advertisements, and design iterations.

## ✨ Features

### 🎯 Core Functionality
- **Drag & Drop Upload** - Intuitive file upload with drag-and-drop support
- **Side-by-Side Comparison** - Clean, responsive comparison view
- **AI-Powered Analysis** - Intelligent recommendations based on multiple factors
- **Detailed Specifications** - Comprehensive technical analysis of both variants
- **Full-Screen Preview** - Click to view images in full resolution

### 🧠 AI Analysis Engine
The tool analyzes designs based on:
- **File Size Optimization** - Smaller files for better web performance
- **Aspect Ratio Analysis** - Evaluates proportional composition and design standards
- **Resolution Quality** - Higher resolution for better detail
- **Format Efficiency** - WebP > JPEG > PNG optimization scoring

### 🎨 User Experience
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Polished micro-interactions and transitions
- **Navigation Pills** - Easy switching between upload, compare, and details views
- **Visual Indicators** - Clear recommendation badges and scoring system

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd image-comparison-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📁 Project Structure

```
src/
├── components/
│   ├── ImageUpload.jsx      # Drag & drop upload component
│   ├── ImageComparison.jsx  # Side-by-side comparison with AI analysis
│   └── ImageSummary.jsx     # Detailed specifications view
├── utils/
│   └── imageUtils.js        # Image processing utilities
├── types/
│   └── index.js            # Type definitions and data structures
├── App.jsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles with Tailwind CSS
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: JavaScript/JSX with TypeScript support
- **Linting**: ESLint with TypeScript support

## 📖 Usage Guide

### 1. Upload Images
- Click or drag and drop images into the upload areas
- Supports PNG, JPG, GIF formats up to 10MB
- Upload Variant A and Variant B for comparison

### 2. Compare Variants
- Automatically transitions to comparison view when both images are uploaded
- View AI-powered recommendation with confidence level
- See factor-by-factor analysis breakdown
- Click images for full-screen preview

### 3. View Details
- Access comprehensive technical specifications
- Compare dimensions, file sizes, and formats
- View device optimization recommendations
- Analyze aspect ratios and resolution quality

### 4. Navigation
- Use the bottom navigation pills to switch between views
- Upload: Add or replace images
- Compare: Side-by-side analysis
- Details: Technical specifications

## 🎯 AI Analysis Factors

### File Size (Weight: 2 points)
- Smaller files load faster and improve user experience
- Critical for web performance optimization

### Aspect Ratio (Weight: 1 point)
- Evaluates proximity to golden ratio (1.618)
- Checks against common standards (16:9, 4:3, 3:2, 1:1)
- Better composition leads to higher engagement

### Resolution Quality (Weight: 1 point)
- Higher pixel count generally means better detail
- Balanced against file size considerations

### Format Optimization (Weight: 1 point)
- WebP: 3 points (most efficient)
- JPEG: 2 points (good compression)
- PNG: 1 point (lossless but larger)

## 🎨 Design Philosophy

The application follows modern design principles:
- **Clean Interface** - Minimal, focused design that doesn't distract from content
- **Responsive Layout** - Optimized for all screen sizes and devices
- **Smooth Interactions** - Thoughtful animations and hover states
- **Accessibility** - Proper contrast ratios and keyboard navigation
- **Performance** - Optimized loading and rendering

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration can be modified in `tailwind.config.js`.

### Vite Configuration
Build settings and optimizations are configured in `vite.config.ts`.

### ESLint
Code quality rules are defined in `eslint.config.js`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Made with ❤️ for designers and developers who care about visual quality and performance.**
