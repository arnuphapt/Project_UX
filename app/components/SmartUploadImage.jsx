import React, { useState, useEffect } from 'react';
import { HiArrowUpCircle } from 'react-icons/hi2';
import { Button, CircularProgress, Chip } from "@heroui/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { RxCross1 } from "react-icons/rx";

// Logo characteristics
const LOGO_CHARACTERISTICS = [
  'wordmark', 'symbol', 'combination mark', 'emblem',
  'minimalist', 'modern', 'vintage', 'geometric',
  'abstract', 'mascot', 'lettermark', 'pictorial'
];

// Website components
const WEBSITE_COMPONENTS = [
  // Layout elements
  'header', 'navbar', 'sidebar', 'footer', 'hero section',
  'content area', 'grid layout', 'flex layout',
  
  // Interactive elements
  'search bar', 'menu', 'dropdown', 'button', 'form',
  'input field', 'checkbox', 'radio button',
  
  // Content elements
  'card', 'carousel', 'slider', 'modal', 'popup',
  'image gallery', 'video player', 'blog post',
  
  // Navigation
  'breadcrumb', 'pagination', 'menu bar', 'tab navigation',
  
  // Common sections
  'about section', 'contact form', 'pricing table',
  'testimonial', 'feature section', 'CTA section'
];

// UI elements
const UI_ELEMENTS = [
  'button', 'input', 'form', 'menu', 'navigation', 'sidebar', 'footer', 'header',
  'card', 'modal', 'dropdown', 'table', 'list', 'grid', 'carousel', 'slider',
  'chart', 'graph', 'icon', 'image', 'video', 'audio', 'map'
];

// Basic colors
const BASIC_COLORS = [
  'white', 'black', 'gray', 'red', 'blue', 'green', 'yellow', 'purple',
  'pink', 'orange', 'brown', 'teal', 'cyan', 'indigo'
];

// Design types
const DESIGN_TYPES = [
  'minimalist', 'modern', 'classic', 'flat', 'material', 'neumorphism',
  'glassmorphism', 'skeuomorphism', 'responsive', 'mobile', 'desktop', 'web'
];

function SmartUploadImage({ setFile, currentImageUrl, postId, onUploadComplete, onTagsGenerated }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [generatedTags, setGeneratedTags] = useState({
    colors: [],
    elements: [],
    designType: [],
    text: [],
    logoStyle: [],
    webComponents: []
  });
  const [logoAnalysis, setLogoAnalysis] = useState({
    type: null,
    metrics: null,
    confidence: 0
  });
  const [websiteAnalysis, setWebsiteAnalysis] = useState({
    layout: [],
    components: [],
    styleGuide: {
      colors: [],
      typography: [],
      spacing: []
    }
  });
  const [visibleTags, setVisibleTags] = useState({
    colors: [],
    elements: [],
    designType: [],
    text: [],
    logoStyle: [],
    webComponents: []
  });
  const getChipColor = (tag) => {
    tag = tag.toLowerCase();
    if (LOGO_CHARACTERISTICS.some(char => tag.includes(char))) return "warning";
    if (WEBSITE_COMPONENTS.some(component => tag.includes(component))) return "info";
    if (UI_ELEMENTS.some(element => tag.includes(element))) return "primary";
    if (BASIC_COLORS.some(color => tag.includes(color))) return "secondary";
    if (DESIGN_TYPES.some(type => tag.includes(type))) return "success";
    return "default";
  };

  // Get all unique tags across all categories
  const getAllTags = () => {
    const allCategories = [
      'elements', 'colors', 'designType', 'text', 'logoStyle', 'webComponents'
    ];
    
    return allCategories.reduce((acc, category) => {
      return [...acc, ...(visibleTags[category] || [])];
    }, []);
  };
  useEffect(() => {
    setVisibleTags(generatedTags);
  }, [generatedTags]);

  // Add handler for tag removal
  const handleRemoveTag = (category, tagToRemove) => {
    setVisibleTags(prev => ({
      ...prev,
      [category]: prev[category].filter(tag => tag !== tagToRemove)
    }));
    
    // Update parent component if onTagsGenerated is provided
    if (onTagsGenerated) {
      const updatedTags = Object.values({
        ...visibleTags,
        [category]: visibleTags[category].filter(tag => tag !== tagToRemove)
      }).flat();
      onTagsGenerated(updatedTags);
    }
  };
  const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error('Missing Google Cloud API Key');
      setError('API key not configured');
    }
  }, []);

  const processWebDetection = (webDetection) => {
    if (!webDetection) return [];
    
    const results = [];
    
    // Process web entities
    if (webDetection.webEntities) {
      results.push(...webDetection.webEntities
        .filter(entity => entity.score > 0.5)
        .map(entity => ({
          type: 'web_entity',
          description: entity.description,
          score: entity.score
        }))
      );
    }
    
    // Process full matched images
    if (webDetection.fullMatchingImages) {
      results.push(...webDetection.fullMatchingImages.map(match => ({
        type: 'full_match',
        url: match.url
      })));
    }
    
    // Process partial matched images
    if (webDetection.partialMatchingImages) {
      results.push(...webDetection.partialMatchingImages.map(match => ({
        type: 'partial_match',
        url: match.url
      })));
    }
    
    return results;
  };

  const analyzeLogo = (logoAnnotations) => {
    if (!logoAnnotations || !Array.isArray(logoAnnotations)) return null;

    const logoMetrics = {
      hasText: false,
      isSymbolic: false,
      complexity: 'simple',
      style: [],
      dominantColors: []
    };
    
    logoAnnotations.forEach(logo => {
      if (!logo) return;

      // Check for text presence
      if (logo.description) {
        logoMetrics.hasText = true;
      }
      
      // Determine complexity based on description and bounds
      if (logo.boundingPoly?.vertices?.length > 8) {
        logoMetrics.complexity = 'complex';
      } else if (logo.boundingPoly?.vertices?.length > 4) {
        logoMetrics.complexity = 'medium';
      }
      
      // Add confidence score
      logoMetrics.confidence = logo.score || 0;
      
      // Determine if symbolic based on specific keywords
      const symbolicKeywords = ['symbol', 'icon', 'emblem', 'pictorial'];
      if (symbolicKeywords.some(keyword => 
        logo.description?.toLowerCase().includes(keyword))) {
        logoMetrics.isSymbolic = true;
      }
    });
    
    return logoMetrics;
  };

  const processLogoDetection = (logoAnnotations) => {
    if (!logoAnnotations || !Array.isArray(logoAnnotations)) return [];
    
    return logoAnnotations
      .filter(logo => logo.score > 0.5)
      .map(logo => ({
        description: logo.description,
        confidence: logo.score,
        boundingBox: logo.boundingPoly,
        properties: analyzeLogo([logo])
      }));
  };

  const categorizeTag = (tag) => {
    if (!tag) return 'text';
    tag = tag.toLowerCase();
    
    // Check Logo characteristics
    if (LOGO_CHARACTERISTICS.some(char => tag.includes(char))) {
      return 'logoStyle';
    }
    
    // Check Website components
    if (WEBSITE_COMPONENTS.some(component => tag.includes(component))) {
      return 'webComponents';
    }
    
    // Check UI elements
    if (UI_ELEMENTS.some(element => tag.includes(element))) {
      return 'elements';
    }
    
    // Check colors
    if (BASIC_COLORS.some(color => tag.includes(color))) {
      return 'colors';
    }
    
    // Check design types
    if (DESIGN_TYPES.some(type => tag.includes(type))) {
      return 'designType';
    }
    
    // If none of the above, consider it as text
    return 'text';
  };

  const analyzeImage = async (imageUrl) => {
    if (!API_KEY) {
      setError('API key not configured');
      return;
    }

    setAnalyzing(true);
    try {
      const response = await fetch(`${VISION_API_URL}?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
          requests: [{
            image: {
              source: { imageUri: imageUrl }
            },
            features: [
              { type: 'LABEL_DETECTION', maxResults: 15 },
              { type: 'OBJECT_LOCALIZATION', maxResults: 15 },
              { type: 'IMAGE_PROPERTIES', maxResults: 10 },
              { type: 'TEXT_DETECTION', maxResults: 15 },
              { type: 'LOGO_DETECTION', maxResults: 10 },
              { type: 'WEB_DETECTION', maxResults: 10 }
            ]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Vision API returned status ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.responses || !data.responses[0]) {
        throw new Error('Invalid response format from Vision API');
      }
      
      const visionResponse = data.responses[0];
      
      // Process labels and objects
      const labels = visionResponse?.labelAnnotations?.map(label => label.description) || [];
      const objects = visionResponse?.localizedObjectAnnotations?.map(obj => obj.name) || [];
      
      // Process colors
      const colors = visionResponse?.imagePropertiesAnnotation?.dominantColors?.colors || [];
      const colorNames = colors.map(color => {
        const { red, green, blue } = color.color;
        if (red > 200 && green < 100 && blue < 100) return 'red';
        if (red < 100 && green > 200 && blue < 100) return 'green';
        if (red < 100 && green < 100 && blue > 200) return 'blue';
        if (red > 200 && green > 200 && blue < 100) return 'yellow';
        if (red > 200 && green > 200 && blue > 200) return 'white';
        if (red < 100 && green < 100 && blue < 100) return 'black';
        return 'neutral';
      });

      // Process text
      const texts = visionResponse?.textAnnotations?.[0]?.description?.split('\n') || [];
      
      // Process web detection
      const webResults = processWebDetection(visionResponse.webDetection);
      
      // Process logo detection
      const logoResults = processLogoDetection(visionResponse.logoAnnotations);
      
      // Combine all tags
      const allTags = [...new Set([
        ...labels, 
        ...objects, 
        ...colorNames, 
        ...texts,
        ...logoResults.map(r => r.description),
        ...webResults.map(r => r.description)
      ])].filter(Boolean);
      
      // Categorize tags
      const categorizedTags = {
        colors: [],
        elements: [],
        designType: [],
        text: [],
        logoStyle: [],
        webComponents: []
      };

      allTags.forEach(tag => {
        const category = categorizeTag(tag);
        if (tag && !categorizedTags[category].includes(tag)) {
          categorizedTags[category].push(tag);
        }
      });

      setGeneratedTags(categorizedTags);
      
      // Set logo analysis if available
      if (logoResults.length > 0) {
        setLogoAnalysis({
          type: 'logo',
          metrics: logoResults[0].properties,
          confidence: Math.max(...logoResults.map(l => l.confidence || 0))
        });
      }
      
      // Set website analysis
      setWebsiteAnalysis({
        layout: categorizedTags.webComponents.filter(tag => 
          tag.includes('layout') || tag.includes('section')),
        components: categorizedTags.webComponents.filter(tag => 
          !tag.includes('layout') && !tag.includes('section')),
        styleGuide: {
          colors: categorizedTags.colors,
          typography: texts.filter(text => text && text.length > 2),
          spacing: []
        }
      });
      
      if (onTagsGenerated) {
        const flatTags = Object.values(categorizedTags).flat();
        onTagsGenerated(flatTags);
      }

    } catch (error) {
      console.error('Error analyzing image:', error);
      if (error.message.includes('API key')) {
        setError('Invalid API key. Please check your configuration.');
      } else if (error.message.includes('PERMISSION_DENIED')) {
        setError('API access denied. Please check your API permissions.');
      } else if (error.message.includes('Vision API returned status')) {
        setError('Failed to connect to Vision API. Please try again.');
      } else {
        setError('Failed to analyze image. Please try again later.');
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5 MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
      return;
    }

    setError('');
    setSelectedFile(file);
    setFile(file);

    const storage = getStorage();
    const storageRef = ref(storage, `pinterest/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setLoading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading image:', error);
        setError('Error uploading image');
        setLoading(false);
        setUploadProgress(0);
      },
      async () => {
        try {
          const newImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(newImageUrl);
          onUploadComplete(newImageUrl);
          
          // After successful upload, analyze the image
          await analyzeImage(newImageUrl);
        } catch (error) {
          console.error('Error getting download URL:', error);
          setError('Failed to get image URL after upload');
        } finally {
          setLoading(false);
          setUploadProgress(0);
        }
      }
    );
  };

  const handleRemoveImage = () => {
    try {
      setSelectedFile(null);
      setFile(null);
      setImageUrl(null);
      setGeneratedTags({
        colors: [],
        elements: [],
        designType: [],
        text: [],
        logoStyle: [],
        webComponents: []
      });
      setLogoAnalysis({
        type: null,
        metrics: null,
        confidence: 0
      });
      setWebsiteAnalysis({
        layout: [],
        components: [],
        styleGuide: {
          colors: [],
          typography: [],
          spacing: []
        }
      });
      onUploadComplete(null);
      if (onTagsGenerated) {
        onTagsGenerated([]);
      }
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 bg-[#f5f5f5] border-[2px] border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4'>
      {!imageUrl ? (
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center cursor-pointer h-full w-full'
          >
            {loading ? (
              <CircularProgress
                aria-label="Uploading..."
                label={analyzing ? 'Analyzing...' : 'Uploading...'}
                size="lg"
                value={uploadProgress}
                color="primary"
                className="max-w-md mt-4"
              />
            ) : (
              <div className='flex flex-col items-center text-gray-600'>
                <HiArrowUpCircle className='text-[40px] mb-4' />
                <p className='text-center text-gray-500 font-medium'>Upload image here</p>
                <p className='text-gray-500 my-2'>image (5MB)</p>
              </div>
            )}
            <input
              id='dropzone-file'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className='relative h-full w-full'>
            <img
              src={imageUrl}
              alt='selected'
              className='object-contain w-full h-full rounded-lg'
            />
            <Button
              type='button'
              onPress={handleRemoveImage}
              color='danger'
              className='absolute top-2 right-2 text-white'
              aria-label='Remove image'
              radius='md'
              isIconOnly
            >
              <RxCross1/>
            </Button>
          </div>
        )}
        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </div>
      
      {Object.values(visibleTags).some(category => category.length > 0) && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {getAllTags().map((tag, index) => (
              <Chip 
                key={`${tag}-${index}`}
                variant="flat"
                color={getChipColor(tag)}
                onClose={() => {
                  // Find which category the tag belongs to
                  const category = Object.keys(visibleTags).find(cat => 
                    visibleTags[cat].includes(tag)
                  );
                  if (category) {
                    handleRemoveTag(category, tag);
                  }
                }}
                isCloseable
              >
                {tag}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartUploadImage;