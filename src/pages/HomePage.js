import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import articles from '../data/articlesData';

const HomePage = () => {
  // State for category filtering and "More" categories dropdown
  const [selectedCategory, setSelectedCategory] = useState('Latest');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [displayedArticles, setDisplayedArticles] = useState([]);

  // Extract unique categories from all articles
  const getAllCategories = () => {
    const categoriesSet = new Set();
    articles.forEach(article => {
      if (article.categories && Array.isArray(article.categories)) {
        article.categories.forEach(category => categoriesSet.add(category));
      }
    });
    return Array.from(categoriesSet);
  };

  const allCategories = getAllCategories();
  const primaryCategories = ['Latest', ...allCategories.slice(0, 4)]; // Latest + first 4 categories
  const moreCategories = allCategories.slice(4); // Remaining categories for dropdown

  // Update displayed articles when category changes
  useEffect(() => {
    let filtered = [];

    if (selectedCategory === 'Latest') {
      // Sort by date (newest first) for Latest
      filtered = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      // Filter by selected category
      filtered = articles.filter(article =>
        article.categories && article.categories.includes(selectedCategory)
      );
    }

    setDisplayedArticles(filtered);
  }, [selectedCategory]);

  // Sort articles by PostType priority within the filtered articles
  const sortedByPriority = [...displayedArticles].sort((a, b) => {
    const priorityOrder = { "Important": 1, "Medium": 2, "None": 3 };

    // Get priority level (defaulting to lowest priority if not specified)
    const priorityA = priorityOrder[a.PostType] || 3;
    const priorityB = priorityOrder[b.PostType] || 3;

    // Sort by priority, then by date (newest first) for same priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  // Handle clicking outside of More dropdown
  const handleClickOutside = (event) => {
    if (!event.target.closest('.more-dropdown') && isMoreOpen) {
      setIsMoreOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMoreOpen]);

  // Get the featured article (most recent Important article)
  const featuredArticle = sortedByPriority.find(article => article.PostType === "Important");

  // Remaining important articles (exclude the featured one)
  const remainingImportantArticles = sortedByPriority
    .filter(article => article.PostType === "Important" && article !== featuredArticle);

  // Medium and regular articles
  const mediumArticles = sortedByPriority.filter(article => article.PostType === "Medium");
  const regularArticles = sortedByPriority.filter(article => 
    article.PostType !== "Important" && article.PostType !== "Medium");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex items-center space-x-6 overflow-x-auto hide-scrollbar pb-3">
          {primaryCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap font-medium ${
                selectedCategory === category 
                ? 'text-red-600 border-b-2 border-red-600' 
                : 'text-gray-600 hover:text-red-600'
              }`}
            >
              {category}
            </button>
          ))}
          
          {/* More dropdown if we have more categories */}
          {moreCategories.length > 0 && (
            <div className="relative more-dropdown">
              <button 
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center text-gray-600 hover:text-red-600 whitespace-nowrap"
              >
                More {isMoreOpen ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
              </button>
              
              {/* Dropdown menu */}
              {isMoreOpen && (
                <div className="absolute left-0 top-8 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-40">
                  {moreCategories.map((category, index) => (
                    <button
                      key={index}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedCategory === category 
                        ? 'bg-red-50 text-red-600' 
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                      }`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsMoreOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* No articles message */}
      {sortedByPriority.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No articles available in this category at the moment.</p>
        </div>
      )}

      {sortedByPriority.length > 0 && (
        <>
          {/* Featured Article Section (Large) */}
          {featuredArticle && (
            <div className="mb-8">
              <Link to={`/article/${featuredArticle.slug}`}>
                <div className="grid md:grid-cols-2 gap-6 bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-red-600">
                  <img 
                    src={featuredArticle.thumbnail} 
                    alt={featuredArticle.title} 
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-3">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded mr-2">
                          BREAKING
                        </span>
                        {featuredArticle.categories && featuredArticle.categories[0] && (
                          <span className="text-red-600 text-sm font-medium">
                            {featuredArticle.categories[0]}
                          </span>
                        )}
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        {featuredArticle.title}
                      </h1>
                      <p className="text-gray-700 mb-4">
                        {featuredArticle.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <img 
                        src={featuredArticle.author.avatar} 
                        alt={featuredArticle.author.name} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{featuredArticle.author.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(featuredArticle.date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content area (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Important Articles Section (excluding featured) */}
              {remainingImportantArticles.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-2">
                    {selectedCategory === 'Latest' ? 'Important Articles' : `Important ${selectedCategory} Articles`}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {remainingImportantArticles.map(article => (
                      <div key={article.id} className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-red-500">
                        <Link to={`/article/${article.slug}`}>
                          <img 
                            src={article.thumbnail} 
                            alt={article.title} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded mb-2">
                              Important
                            </span>
                            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                            <p className="text-gray-600 mb-2 text-sm line-clamp-2">{article.excerpt}</p>
                            <div className="flex items-center mt-3">
                              <img 
                                src={article.author.avatar} 
                                alt={article.author.name} 
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span className="text-sm text-gray-700">{article.author.name}</span>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-sm text-gray-500">
                                {new Date(article.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Medium Articles Section */}
              {mediumArticles.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Analysis & Theory</h2>
                  <div className="space-y-4">
                    {mediumArticles.map(article => (
                      <div key={article.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
                        <Link to={`/article/${article.slug}`} className="grid sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <div className="flex items-center mb-2">
                              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded mr-2">
                                Analysis
                              </span>
                              {article.categories && article.categories[0] && (
                                <span className="text-gray-600 text-sm">
                                  {article.categories[0]}
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{article.author.name}</span>
                              <span className="mx-1">•</span>
                              <span>{new Date(article.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="hidden sm:block">
                            <img 
                              src={article.thumbnail} 
                              alt={article.title}
                              className="w-full h-32 object-cover rounded"
                            />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            
              {/* Regular Articles Section */}
              {regularArticles.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Latest Updates</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {regularArticles.map(article => (
                      <div key={article.id} className="bg-white p-4 rounded border">
                        <Link to={`/article/${article.slug}`}>
                          <h3 className="text-lg font-medium mb-1">{article.title}</h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{article.excerpt}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{article.author.name}</span>
                            <span className="mx-1">•</span>
                            <span>{new Date(article.date).toLocaleDateString()}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar (1 col) */}
            <div className="space-y-8">
              {/* Most Popular Section */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Most Popular</h3>
                <div className="space-y-4">
                  {sortedByPriority.slice(0, 4).map((article, index) => (
                    <Link key={article.id} to={`/article/${article.slug}`} className="flex gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-red-600">
                        {article.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Related Articles */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-lg font-bold mb-4 pb-2 border-b">Related Articles</h3>
                <div className="space-y-4">
                  {sortedByPriority.slice(0, 3).map(article => (
                    <div key={article.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <Link to={`/article/${article.slug}`}>
                        <h4 className="font-medium text-gray-800 hover:text-red-600 mb-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{article.author.name}</span>
                          <span className="mx-1">•</span>
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </>
      )}
    </div>
  );
};

export default HomePage;