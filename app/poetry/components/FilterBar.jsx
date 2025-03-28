export default function FilterBar({ filters, setFilters, value, onchange }) {
  const poetryTypes = [
    { id: "all", name: "All Types" },
    { id: "Love", name: "Love" },
    { id: "Nature", name: "Nature" },
    { id: "Sadness", name: "Sadness" },
    { id: "Inspiration", name: "Inspiration" },
    { id: "Humor", name: "Humor" },
    { id: "Spirituality", name: "Spirituality" },
    { id: "Friendship", name: "Friendship" },
    { id: "Life", name: "Life" },
    { id: "Romance", name: "Romance" },
    { id: "Fantasy", name: "Fantasy" },
    { id: "HeartBreak", name:"HeartBreak" },
    
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {poetryTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setFilters({ ...filters, type: type.id })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filters.type === type.id
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          name="search"
          onChange={onchange}
          placeholder="Search shayri..."
          className="px-4 py-2 pl-10 border border-gray-600 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
