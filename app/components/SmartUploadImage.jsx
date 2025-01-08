import React, { useState, useEffect } from 'react';
import { HiArrowUpCircle } from 'react-icons/hi2';
import { Button, CircularProgress, Chip } from '@nextui-org/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";
import { RxCross1 } from "react-icons/rx";

// ประเภทของ UI elements ที่เราสนใจ
const UI_ELEMENTS = [
  'button', 'input', 'form', 'menu', 'navigation', 'sidebar', 'footer', 'header',
  'card', 'modal', 'dropdown', 'table', 'list', 'grid', 'carousel', 'slider',
  'chart', 'graph', 'icon', 'image', 'video', 'audio', 'map'
];

// สีพื้นฐานที่เราสนใจ
const BASIC_COLORS = [
  'white', 'black', 'gray', 'red', 'blue', 'green', 'yellow', 'purple',
  'pink', 'orange', 'brown', 'teal', 'cyan', 'indigo'
];

// โทนสีที่เราสนใจ
const COLOR_TONES = [
  'dark', 'light', 'bright', 'pale', 'muted', 'vibrant', 'pastel', 'neutral',
  'warm', 'cool', 'monochrome'
];

// ประเภทของการออกแบบ
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
    tones: [],
    elements: [],
    designType: [],
    text: []
  });
  const { data: session } = useSession();

  const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error('Missing Google Cloud API Key');
      setError('API key not configured');
    }
  }, []);

  const categorizeTag = (tag) => {
    tag = tag.toLowerCase();
    
    // Check UI elements
    if (UI_ELEMENTS.some(element => tag.includes(element))) {
      return 'elements';
    }
    
    // Check colors
    if (BASIC_COLORS.some(color => tag.includes(color))) {
      return 'colors';
    }
    
    // Check color tones
    if (COLOR_TONES.some(tone => tag.includes(tone))) {
      return 'tones';
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
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
              { type: 'IMAGE_PROPERTIES', maxResults: 5 },
              { type: 'TEXT_DETECTION' }
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
      
      // Process labels and objects
      const labels = data.responses[0]?.labelAnnotations?.map(label => label.description) || [];
      const objects = data.responses[0]?.localizedObjectAnnotations?.map(obj => obj.name) || [];
      
      // Process colors
      const colors = data.responses[0]?.imagePropertiesAnnotation?.dominantColors?.colors || [];
      const colorNames = colors.map(color => {
        const { red, green, blue } = color.color;
        // Simple color naming logic
        if (red > 200 && green < 100 && blue < 100) return 'red';
        if (red < 100 && green > 200 && blue < 100) return 'green';
        if (red < 100 && green < 100 && blue > 200) return 'blue';
        if (red > 200 && green > 200 && blue < 100) return 'yellow';
        if (red > 200 && green > 200 && blue > 200) return 'white';
        if (red < 100 && green < 100 && blue < 100) return 'black';
        return 'neutral';
      });

      // Process text
      const texts = data.responses[0]?.textAnnotations?.[0]?.description?.split('\n') || [];
      
      // Combine all tags
      const allTags = [...new Set([...labels, ...objects, ...colorNames, ...texts])];
      
      // Categorize tags
      const categorizedTags = {
        colors: [],
        tones: [],
        elements: [],
        designType: [],
        text: []
      };

      allTags.forEach(tag => {
        const category = categorizeTag(tag);
        if (!categorizedTags[category].includes(tag)) {
          categorizedTags[category].push(tag);
        }
      });

      setGeneratedTags(categorizedTags);
      
      if (onTagsGenerated) {
        // Flatten tags for parent component
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

    if (file && file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5 MB.');
      return;
    }

    if (file && !file.type.startsWith('image/')) {
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
        tones: [],
        elements: [],
        designType: [],
        text: []
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
      
      {/* Generated Tags Section */}
      {Object.keys(generatedTags).some(category => generatedTags[category].length > 0) && (
        <div className='mt-4 space-y-3'>
          {generatedTags.elements.length > 0 && (
            <div>
              <p className='text-sm font-medium text-gray-700 mb-2'>UI Elements:</p>
              <div className='flex flex-wrap gap-2'>
                {generatedTags.elements.map((tag, index) => (
                  <Chip key={index} variant="flat" color="primary">{tag}</Chip>
                ))}
              </div>
            </div>
          )}
          
          {generatedTags.colors.length > 0 && (
            <div>
              <p className='text-sm font-medium text-gray-700 mb-2'>Colors:</p>
              <div className='flex flex-wrap gap-2'>
                {generatedTags.colors.map((tag, index) => (
                  <Chip key={index} variant="flat" color="secondary">{tag}</Chip>
                ))}
              </div>
            </div>
          )}
          
          {generatedTags.tones.length > 0 && (
            <div>
              <p className='text-sm font-medium text-gray-700 mb-2'>Color Tones:</p>
              <div className='flex flex-wrap gap-2'>
                {generatedTags.tones.map((tag, index) => (
                  <Chip key={index} variant="flat" color="warning">{tag}</Chip>
                ))}
              </div>
            </div>
          )}
          
          {generatedTags.designType.length > 0 && (
            <div>
              <p className='text-sm font-medium text-gray-700 mb-2'>Design Style:</p>
              <div className='flex flex-wrap gap-2'>
                {generatedTags.designType.map((tag, index) => (
                  <Chip key={index} variant="flat" color="success">{tag}</Chip>
                ))}
              </div>
            </div>
          )}

          {generatedTags.text.length > 0 && (
            <div>
              <p className='text-sm font-medium text-gray-700 mb-2'>Detected Text:</p>
              <div className='flex flex-wrap gap-2'>
                {generatedTags.text.slice(0, 5).map((tag, index) => (
                  <Chip key={index} variant="flat" color="default">{tag}</Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SmartUploadImage;