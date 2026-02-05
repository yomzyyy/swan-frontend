import Search from '@mui/icons-material/Search';
import Close from '@mui/icons-material/Close';
import Instagram from '@mui/icons-material/Instagram';
import Twitter from '@mui/icons-material/Twitter';
import Facebook from '@mui/icons-material/Facebook';
import LinkedIn from '@mui/icons-material/LinkedIn';

const NewsSidebar = ({ searchQuery, setSearchQuery, allTags }) => (
  <aside className="w-full lg:w-64 flex-shrink-0">
    {/* Search Bar */}
    <div className="flex mb-4 items-stretch">
      <div className="flex-1 relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full h-full px-4 py-2 pr-10 border border-gray-300 outline-none focus:outline-none focus:ring-0 focus:border-gray-300 focus-visible:outline-none text-sm"
          style={{ outline: 'none', boxShadow: 'none' }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <Close fontSize="small" />
          </button>
        )}
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 px-4 text-white transition-colors flex items-center justify-center">
        <Search fontSize="small" />
      </button>
    </div>

    {/* Tags Section */}
    {allTags.length > 0 && (
      <div className="bg-white border border-gray-300 p-4 mb-4">
        <h3 className="text-base font-bold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 6).map(tag => (
            <span
              key={tag}
              className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Follow Us Section */}
    <div className="bg-white border border-gray-300 p-4">
      <h3 className="text-base font-bold mb-3">Follow Us</h3>
      <div className="flex gap-3">
        <a
          href="#"
          className="text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Instagram"
        >
          <Instagram fontSize="small" />
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Twitter"
        >
          <Twitter fontSize="small" />
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Facebook"
        >
          <Facebook fontSize="small" />
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="LinkedIn"
        >
          <LinkedIn fontSize="small" />
        </a>
      </div>
    </div>
  </aside>
);

export default NewsSidebar;
