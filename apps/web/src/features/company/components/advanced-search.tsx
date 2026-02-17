"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import en from "@/app/languages/en.json";
import si from "@/app/languages/si.json";
import ta from "@/app/languages/ta.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BriefcaseIcon, MapPinIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

// --- Google Maps type declarations ---
declare global {
  namespace google {
    namespace maps {
      namespace places {
        interface AutocompletePrediction {
          description: string;
          place_id: string;
        }
        class AutocompleteService {
          getPlacePredictions(
            request: { input: string; types?: string[]; fields?: string[] },
            callback: (
              predictions: AutocompletePrediction[] | null,
              status: string
            ) => void
          ): void;
        }
        enum PlacesServiceStatus {
          OK = "OK",
        }
      }
    }
  }
}

const SearchComponent = () => {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = lang === "en" ? en.Search : lang === "si" ? si.Search : ta.Search;

  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [isDestinationFocused, setIsDestinationFocused] = useState(false);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  // Load Google Maps API
  React.useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps?.places) {
        autocompleteService.current =
          new google.maps.places.AutocompleteService();
        setIsGoogleMapsLoaded(true);
        return;
      }
      if (document.querySelector('script[src*="maps.googleapis.com"]')) return;
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google?.maps?.places) {
          autocompleteService.current =
            new google.maps.places.AutocompleteService();
          setIsGoogleMapsLoaded(true);
        }
      };
      document.head.appendChild(script);
    };
    loadGoogleMaps();
  }, []);

  // Handle destination input
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length > 2 && autocompleteService.current && isGoogleMapsLoaded) {
      autocompleteService.current.getPlacePredictions(
        { input: value, types: ["(cities)", "establishment"] },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (
    suggestion: google.maps.places.AutocompletePrediction
  ) => {
    setDestination(suggestion.description);
    setSuggestions([]);
    setIsDestinationFocused(false);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      inputRef.current?.focus();
      return;
    }

    const query = new URLSearchParams({
      destination,
      guests: guests.toString(),
      rooms: rooms.toString(),
    }).toString();
    router.push(`/search?${query}`);
  };

  return (
    <div className="min-h-[500px] flex items-center justify-center p-6">
      <div className="w-full max-w-[1800px] mx-auto">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-xl px-20 py-9 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6 h-18"
        >
          {/* Destination */}
          <div className="w-full md:w-2/5 relative">
            <div className="flex items-center mr-2">
              <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
              <Input
                ref={inputRef}
                type="text"
                placeholder={t.destinationPlaceholder}
                value={destination}
                onChange={handleDestinationChange}
                onFocus={() => setIsDestinationFocused(true)}
                onBlur={() =>
                  setTimeout(() => setIsDestinationFocused(false), 200)
                }
                className="w-full border-none shadow-none focus:ring-0 text-sm md:text-base text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
            {suggestions.length > 0 && isDestinationFocused && (
              <div className="absolute top-full left-0 right-0 bg-white border rounded-xl shadow-lg z-30 mt-1 max-h-64 overflow-y-auto">
                {suggestions.map((s) => (
                  <div
                    key={s.place_id}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                  >
                    {s.description}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Select */}
          <div className="w-full md:w-1/4 mr-6">
            <Select>
              <SelectTrigger className="flex items-center cursor-pointer data-[placeholder]:text-gray-700">
                <SelectValue placeholder={t.locationPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.locations).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Category Select */}
          <div className="w-full md:w-1/4">
            <Select>
              <SelectTrigger className="flex items-center cursor-pointer ">
                <BriefcaseIcon className="h-5 w-5 text-gray-700 mr-2" />
                <SelectValue placeholder={t.jobCategoryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(t.categories).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto">
            <Button
              type="submit"
              className="w-full md:w-auto bg-[#61D700] hover:bg-[#52c100] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center shadow-lg"
            >
              {t.searchButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchComponent;
