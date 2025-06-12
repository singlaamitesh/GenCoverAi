"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { toast } from "sonner"

export interface PhoneModel {
  id: string;
  name: string;
  image: string;
  cases: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
  brand?: string;
  model?: string;
  modelName?: string;
  caseType?: string;
}

const PHONE_BRANDS = [
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'oneplus', name: 'OnePlus' },
  { id: 'xiaomi', name: 'Xiaomi' },
  { id: 'google', name: 'Google' },
  { id: 'other', name: 'Other' },
]

const CASE_TYPES = [
  { id: 'slim', name: 'Slim Case', description: 'Ultra-thin, minimal protection' },
  { id: 'tough', name: 'Tough Case', description: 'Heavy-duty protection' },
  { id: 'wallet', name: 'Wallet Case', description: 'With card slots' },
  { id: 'battery', name: 'Battery Case', description: 'With extra battery' },
  { id: 'clear', name: 'Clear Case', description: 'Show off your design' },
]

const PHONE_MODELS = {
  apple: [
    { id: 'iphone-15-pro', name: 'iPhone 15 Pro' },
    { id: 'iphone-15', name: 'iPhone 15' },
    { id: 'iphone-14-pro', name: 'iPhone 14 Pro' },
    { id: 'iphone-14', name: 'iPhone 14' },
    { id: 'iphone-se', name: 'iPhone SE' },
  ],
  samsung: [
    { id: 'galaxy-s23', name: 'Galaxy S23' },
    { id: 'galaxy-s23-ultra', name: 'Galaxy S23 Ultra' },
    { id: 'galaxy-z-fold5', name: 'Galaxy Z Fold 5' },
    { id: 'galaxy-z-flip5', name: 'Galaxy Z Flip 5' },
    { id: 'galaxy-a54', name: 'Galaxy A54' },
  ],
  oneplus: [
    { id: 'oneplus-11', name: 'OnePlus 11' },
    { id: 'oneplus-nord-3', name: 'OnePlus Nord 3' },
    { id: 'oneplus-10t', name: 'OnePlus 10T' },
  ],
  xiaomi: [
    { id: 'xiaomi-13-pro', name: 'Xiaomi 13 Pro' },
    { id: 'redmi-note-12', name: 'Redmi Note 12' },
    { id: 'poco-f5', name: 'POCO F5' },
  ],
  google: [
    { id: 'pixel-7-pro', name: 'Pixel 7 Pro' },
    { id: 'pixel-7a', name: 'Pixel 7a' },
    { id: 'pixel-6a', name: 'Pixel 6a' },
  ],
  other: [
    { id: 'other', name: 'Other Model' },
  ]
}

export function PhoneModelSelector({
  isOpen,
  onClose,
  onSelect,
  currentSelection
}: {
  isOpen: boolean
  onClose: () => void
  onSelect: (model: PhoneModel) => void
  currentSelection?: PhoneModel
}) {
  const [selectedBrand, setSelectedBrand] = useState<string>(currentSelection?.brand || '');
  const [selectedModel, setSelectedModel] = useState<PhoneModel | null>(
    currentSelection || null
  );
  const [selectedCaseType, setSelectedCaseType] = useState<string>(
    currentSelection?.caseType || ''
  );

  // Initialize with default values if currentSelection is provided
  useEffect(() => {
    if (currentSelection) {
      setSelectedBrand(currentSelection.brand || '');
      setSelectedModel(currentSelection);
      setSelectedCaseType(currentSelection.caseType || '');
    }
  }, [currentSelection]);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedModel(null);
    setSelectedCaseType('standard');
  };

  const handleCaseTypeSelect = (caseType: string) => {
    setSelectedCaseType(caseType);
    if (selectedModel) {
      const updatedModel: PhoneModel = {
        ...selectedModel,
        caseType,
      };
      setSelectedModel(updatedModel);
      onSelect(updatedModel);
    }
  };

  const handleModelSelect = (model: { id: string; name: string }) => {
    if (!selectedBrand) return;
    
    const newModel: PhoneModel = {
      id: model.id,
      name: model.name,
      image: `/phones/${model.id}.png`,
      cases: [],
      brand: selectedBrand,
      model: model.id,
      modelName: model.name,
      caseType: selectedCaseType || 'standard',
    };
    
    setSelectedModel(newModel);
    onSelect(newModel);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrand && selectedModel) {
      const modelToSubmit = {
        ...selectedModel,
        caseType: selectedCaseType || 'standard',
      };
      onSelect(modelToSubmit);
      onClose();
    } else {
      toast.error("Please select a phone model");
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Select Phone Model</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Brand
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PHONE_BRANDS.map((brand) => (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => handleBrandSelect(brand.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        selectedBrand === brand.id
                          ? 'text-white bg-indigo-600'
                          : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedBrand && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Model
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PHONE_MODELS[selectedBrand as keyof typeof PHONE_MODELS]?.map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => handleModelSelect(model)}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          selectedModel?.id === model.id
                            ? 'text-white bg-indigo-600'
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedModel && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Case Type
                  </label>
                  <div className="space-y-2">
                    {CASE_TYPES.map((caseType) => (
                      <div
                        key={caseType.id}
                        onClick={() => handleCaseTypeSelect(caseType.id)}
                        className={`p-3 border rounded-md cursor-pointer ${
                          selectedCaseType === caseType.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 w-4 h-4 mr-3 border rounded-full ${
                              selectedCaseType === caseType.id
                                ? 'border-indigo-500 bg-indigo-500'
                                : 'border-gray-300'
                            }`}
                          />
                          <div>
                            <div className="font-medium">{caseType.name}</div>
                            <div className="text-sm text-gray-500">
                              {caseType.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedBrand || !selectedModel || !selectedCaseType}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm ${
                  !selectedBrand || !selectedModel || !selectedCaseType
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Select
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
