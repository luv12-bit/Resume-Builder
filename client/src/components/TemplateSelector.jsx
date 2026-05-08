import React, { useState } from "react";
import { Layout, Check } from "lucide-react"; 

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview: "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "Sleek design with strategic use of color and modern font choices",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra clean designs that puts your content front and center",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal design with a single image and clean typography",
    },
    {
      id: "professional",
      name: "Elite Professional",
      preview: "Sophisticated banner-style layout with a modern two-column body (Screenshot 2)",
    },
    {
      id: "creative",
      name: "Modern Sidebar",
      preview: "Sleek dark-contrast sidebar layout with a circular profile picture (Screenshot 1)",
    },
    {
      id: "executive",
      name: "Pure ATS",
      preview: "Industry-standard single-column academic layout optimized for bot parsing (Screenshot 3)",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="max-sm:hidden">Template</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-80 p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm overflow-y-auto max-h-[400px] custom-scrollbar">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <p className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                  {template.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;