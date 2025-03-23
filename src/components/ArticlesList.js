import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const ArticlesList = ({ articles }) => {
  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
          <Link 
            to={`/article/${article.slug}`} 
            className="md:w-1/3 flex-shrink-0"
          >
            <img 
              src={article.thumbnail} 
              alt={article.title} 
              className="w-full h-48 md:h-full object-cover"
            />
          </Link>
          
          <div className="p-6 md:w-2/3">
            <div className="flex flex-wrap gap-2 mb-2">
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
            
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              <Link 
                to={`/article/${article.slug}`} 
                className="hover:text-red-600 transition-colors"
              >
                {article.title}
              </Link>
            </h2>
            
            <p className="text-gray-700 mb-4">{article.excerpt}</p>
            
            <div className="flex items-center text-gray-500 text-sm mt-auto">
              <span className="flex items-center">
                <User size={16} className="mr-1" />
                {article.author.name}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Clock size={16} className="mr-1" />
                {format(parseISO(article.date), 'MMM d, yyyy')}
              </span>
              <span className="mx-2">•</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticlesList;