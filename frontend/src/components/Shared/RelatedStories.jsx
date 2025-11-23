// ***********************************************************************
// File: frontend/src/components/Shared/RelatedStories.jsx
// Shared component để hiển thị stories theo category
// ***********************************************************************

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import publicApi from '../../services/publicApi';

const RelatedStories = ({ category, categoryLabel, categoryColor = 'blue' }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadStories();
  }, [category]);

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await publicApi.getStories(category, 10, 0);
      setStories(data.stories || []);
    } catch (error) {
      console.error('Failed to load stories:', error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (storyId) => {
    try {
      const result = await publicApi.likeStory(storyId);
      setStories(stories.map(story => 
        story.id === storyId 
          ? { ...story, likes_count: result.likes_count }
          : story
      ));
    } catch (error) {
      console.error('Failed to like story:', error);
    }
  };

  // Show first 3 stories by default, all if showAll is true
  const displayedStories = showAll ? stories : stories.slice(0, 3);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3 text-gray-800">
          <span className="text-3xl md:text-4xl">📖</span>
          <span>Câu chuyện từ bạn bè</span>
        </h2>
        
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-gray-600 mb-4">
            Chưa có câu chuyện nào về <strong className={`text-${categoryColor}-600`}>{categoryLabel}</strong>
          </p>
          <Link
            to="/tam-su"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            ✍️ Chia sẻ câu chuyện của bạn
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border-2 border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-gray-800">
          <span className="text-3xl md:text-4xl">📖</span>
          <span>Câu chuyện từ bạn bè</span>
        </h2>
        
        <Link
          to="/tam-su"
          className="text-sm md:text-base text-primary-600 hover:text-primary-700 font-semibold hover:underline"
        >
          Xem tất cả →
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-6">
        <p className="text-xs md:text-sm text-amber-800">
          <strong>⚠️ Lưu ý:</strong> Đây là trải nghiệm cá nhân từ các bạn học sinh, 
          không thay thế tư vấn chuyên nghiệp. Nếu bạn cần hỗ trợ ngay, hãy liên hệ 
          <a href="tel:111" className="font-bold underline ml-1">111</a>.
        </p>
      </div>

      {/* Stories List */}
      <div className="space-y-4">
        {displayedStories.map((story) => (
          <div 
            key={story.id} 
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-5 md:p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
          >
            {/* Story Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <span className={`inline-block bg-${categoryColor}-100 text-${categoryColor}-700 text-xs font-semibold px-3 py-1 rounded-full mb-2`}>
                  {categoryLabel}
                </span>
                <h3 className="text-base md:text-lg font-bold text-gray-800 leading-tight">
                  {story.title}
                </h3>
              </div>
              <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                {new Date(story.created_at).toLocaleDateString('vi-VN', {
                  day: 'numeric',
                  month: 'short'
                })}
              </span>
            </div>

            {/* Story Excerpt */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
              {story.excerpt}
            </p>

            {/* Story Actions */}
            <div className="flex items-center justify-between">
              <Link
                to={`/tam-su/${story.id}`}
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm hover:underline transition flex items-center gap-1"
              >
                <span>Đọc thêm</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <button
                onClick={() => handleLike(story.id)}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition group"
                aria-label={`Like câu chuyện: ${story.title}`}
              >
                <span className="group-hover:scale-110 transition-transform">❤️</span>
                <span className="text-sm font-medium">{story.likes_count}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {stories.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            {showAll ? '← Ẩn bớt' : `Xem thêm ${stories.length - 3} câu chuyện →`}
          </button>
        </div>
      )}

      {/* CTA to Write Story */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 border-2 border-blue-200 text-center">
        <p className="text-gray-700 mb-3">
          💙 Bạn cũng muốn chia sẻ câu chuyện về <strong>{categoryLabel}</strong>?
        </p>
        <Link
          to="/tam-su"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          ✍️ Viết câu chuyện của bạn
        </Link>
      </div>
    </div>
  );
};

export default RelatedStories;