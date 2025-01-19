const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
    const handleSuggestionClick = (suggestion) => {
        const selectedDescription = suggestion.description; // Extract the description
        if (activeField === 'pickup') {
            setPickup(selectedDescription);
        } else if (activeField === 'destination') {
            setDestination(selectedDescription);
        }
    };

    if (suggestions.length === 0) {
        return <p className="text-center text-gray-500">No suggestions available.</p>;
    }

    return (
        <div>
            {suggestions.map((suggestion, idx) => (
                <div
                    key={suggestion.place_id || idx} // Use place_id if available, else fallback to index
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start hover:bg-gray-100"
                >
                    <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className="font-medium">{suggestion.description}</h4> {/* Render description */}
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;
