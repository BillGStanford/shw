import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, User, Calendar, ArrowLeft, Share2, BookmarkPlus, Facebook, Twitter } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import articles from '../data/articlesData';
import DOMPurify from 'dompurify'; // You'll need to install this package

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Find the article with the matching slug
  useEffect(() => {
    const foundArticle = articles.find(a => a.slug === slug);
    setArticle(foundArticle);
    setLoading(false);
    
    if (!foundArticle) {
      navigate('/');
    }
  }, [slug, navigate]);
  
  // Set meta tags for social sharing
  useEffect(() => {
    if (article) {
      // Set document title
      document.title = `${article.title} | Red Social`;
      
      // Get existing meta tags or create new ones
      let metaDescription = document.querySelector('meta[name="description"]');
      let metaOgTitle = document.querySelector('meta[property="og:title"]');
      let metaOgDescription = document.querySelector('meta[property="og:description"]');
      let metaOgImage = document.querySelector('meta[property="og:image"]');
      let metaOgUrl = document.querySelector('meta[property="og:url"]');
      
      // If they don't exist, create them
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      
      if (!metaOgTitle) {
        metaOgTitle = document.createElement('meta');
        metaOgTitle.setAttribute('property', 'og:title');
        document.head.appendChild(metaOgTitle);
      }
      
      if (!metaOgDescription) {
        metaOgDescription = document.createElement('meta');
        metaOgDescription.setAttribute('property', 'og:description');
        document.head.appendChild(metaOgDescription);
      }
      
      if (!metaOgImage) {
        metaOgImage = document.createElement('meta');
        metaOgImage.setAttribute('property', 'og:image');
        document.head.appendChild(metaOgImage);
      }
      
      if (!metaOgUrl) {
        metaOgUrl = document.createElement('meta');
        metaOgUrl.setAttribute('property', 'og:url');
        document.head.appendChild(metaOgUrl);
      }
      
      // Set content
      metaDescription.content = article.excerpt;
      metaOgTitle.content = `${article.title} | Red Social`;
      metaOgDescription.content = article.excerpt;
      metaOgImage.content = article.thumbnail;
      metaOgUrl.content = `${window.location.origin}/article/${article.slug}`;
    }
    
    // Cleanup function to reset meta tags
    return () => {
      document.title = 'Red Social';
    };
  }, [article]);
  
  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-center text-gray-600">Loading article...</p>
      </div>
    );
  }
  
  // If article not found
  if (!article) {
    return null; // This will never render as navigate redirects, but satisfies ESLint
  }
  
  // Process article content - converts markdown to HTML
  const processContent = (content) => {
    // First handle markdown-style formatting
    let processedContent = content
      // Handle headings (## Heading)
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      
      // Handle lists (- Item or 1. Item)
      .replace(/^\s*- (.*$)/gim, '<li>$1</li>')
      .replace(/^\s*\d+\. (.*$)/gim, '<li>$1</li>')
      
      // Handle images with captions ![alt](url) *caption*
      .replace(/!\[(.*?)\]\((.*?)\)[\s\n]*\*(.*?)\*/gim, 
        '<figure><img src="$2" alt="$1" class="w-full h-auto rounded-lg shadow-md"><figcaption class="text-center text-gray-600 mt-2 text-sm italic">$3</figcaption></figure>')
      
      // Handle images without captions ![alt](url)
      .replace(/!\[(.*?)\]\((.*?)\)/gim, 
        '<figure><img src="$2" alt="$1" class="w-full h-auto rounded-lg shadow-md"></figure>')
      
      // Handle paragraphs
      .replace(/^([^<].*)/gim, (match) => {
        // Ignore lines that already contain HTML tags or are empty
        if (match.trim() === '' || match.match(/<[^>]*>/)) return match;
        return `<p>${match}</p>`;
      })
      
      // Handle line breaks (convert double line breaks to proper paragraphs)
      .replace(/\n\n/gim, '</p><p>');
    
    // Clean up any empty paragraphs
    processedContent = processedContent.replace(/<p>\s*<\/p>/gim, '');
    
    return processedContent;
  };
  
  // Function to render HTML content safely
  const renderArticleContent = (content) => {
    // Process markdown to HTML first
    const processedContent = processContent(content);
    
    // Then sanitize the HTML
    const sanitizedContent = DOMPurify.sanitize(processedContent, {
      ADD_TAGS: ['figure', 'figcaption'], // Allow these additional tags
      ADD_ATTR: ['class'], // Allow class attributes
    });
    
    return (
      <div 
        className="article-content" 
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
      />
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb navigation */}
        <div className="mb-8 flex items-center text-gray-600">
          <Link to="/" className="flex items-center hover:text-red-600">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        {/* Article categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.categories.map((category) => (
            <Link 
              key={category} 
              to={`/category/${category.toLowerCase()}`} 
              className="text-sm text-red-600 font-semibold hover:text-red-700"
            >
              {category}
            </Link>
          ))}
        </div>
        
        {/* Article title */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          {article.title}
        </h1>
        
        {/* Article meta info */}
        <div className="flex flex-wrap items-center text-gray-600 mb-8">
          <div className="flex items-center mr-6 mb-2">
            <img 
              src={article.author.avatar} 
              alt={article.author.name} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-medium">{article.author.name}</span>
          </div>
          
          <div className="flex items-center mr-6 mb-2">
            <Calendar size={18} className="mr-2" />
            <span>{format(parseISO(article.date), 'MMMM d, yyyy')}</span>
          </div>
          
          <div className="flex items-center mb-2">
            <Clock size={18} className="mr-2" />
            <span>{article.readTime} min read</span>
          </div>
        </div>
        
        {/* Article featured image */}
        <div className="mb-10">
          <img 
            src={article.thumbnail} 
            alt={article.title} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        {/* Social share buttons */}
        <div className="flex items-center justify-between mb-8 py-4 border-t border-b border-gray-200">
          <div className="text-gray-700 font-medium">Share this article</div>
          <div className="flex space-x-4">
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
              aria-label="Share on Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-sky-500 hover:bg-sky-50 rounded-full transition"
              aria-label="Share on Twitter"
            >
              <Twitter size={20} />
            </a>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
              aria-label="Copy link"
            >
              <Share2 size={20} />
            </button>
            <button 
              className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-full transition"
              aria-label="Save article"
            >
              <BookmarkPlus size={20} />
            </button>
          </div>
        </div>
        
        {/* Article content */}
        {renderArticleContent(article.content)}
        
        {/* Author bio */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start">
            <img 
              src={article.author.avatar} 
              alt={article.author.name} 
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold text-lg mb-2">About {article.author.name}</h3>
              <p className="text-gray-700">{article.author.bio}</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ArticlePage;