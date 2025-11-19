// frontend/src/pages/Stories/StoryDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import publicApi from '../../services/publicApi';

const StoryDetailPage = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStory();
  }, [storyId]);

  const loadStory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await publicApi.getStoryDetail(storyId);
      setStory(data);
    } catch (err) {
      console.error('Failed to load story:', err);
      setError('Không thể tải câu chuyện. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!story) return;
    
    try {
      const result = await publicApi.likeStory(storyId);
      setStory({ ...story, likes_count: result.likes_count });
    } catch (error) {
      console.error('Failed to like story:', error);
    }
  };

  const getCategoryInfo = (category) => {
    const categories = {
      stress: { label: 'Stress & Áp lực', color: 'bg-orange-100 text-orange-700', emoji: '😰' },
      lonely: { label: 'Cô đơn', color: 'bg-blue-100 text-blue-700', emoji: '😔' },
      love: { label: 'Tình yêu học trò', color: 'bg-pink-100 text-pink-700', emoji: '💕' },
      exam: { label: 'Thi cử', color: 'bg-purple-100 text-purple-700', emoji: '📚' },
      family: { label: 'Gia đình', color: 'bg-green-100 text-green-700', emoji: '🏠' },
      other: { label: 'Khác', color: 'bg-gray-100 text-gray-700', emoji: '📝' }
    };
    return categories[category] || categories.other;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Đang tải câu chuyện...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
        <div className="text-6xl">😕</div>
        <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy câu chuyện</h2>
        <p className="text-gray-600">{error || 'Câu chuyện không tồn tại hoặc đã bị xóa.'}</p>
        <button
          onClick={() => navigate('/tam-su')}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          ← Quay lại danh sách
        </button>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(story.category);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 flex items-center gap-2">
        <Link to="/tam-su" className="hover:text-primary-500 hover:underline transition">
          Tâm sự
        </Link>
        <span>›</span>
        <span className="font-semibold text-gray-800">Chi tiết câu chuyện</span>
      </nav>

      {/* Story Card */}
      <article className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{categoryInfo.emoji}</span>
            <span className={`px-4 py-1 rounded-full text-sm font-semibold ${categoryInfo.color} bg-white`}>
              {categoryInfo.label}
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight">
            {story.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-primary-100">
            <span>📅 {new Date(story.created_at).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span>•</span>
            <span>👤 Ẩn danh</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {story.content}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex items-center justify-between">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-xl font-semibold transition border-2 border-gray-200 hover:border-red-300"
          >
            <span className="text-xl">❤️</span>
            <span>{story.likes_count} lượt thích</span>
          </button>

          <button
            onClick={() => navigate('/tam-su')}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition"
          >
            ← Xem câu chuyện khác
          </button>
        </div>
      </article>

      {/* Share Message */}
      <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 text-center">
        <p className="text-gray-700 font-medium mb-3">
          💙 Cảm ơn bạn đã đọc câu chuyện này
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Nếu bạn cũng muốn chia sẻ câu chuyện của mình, hãy gửi cho chúng mình nhé!
        </p>
        <Link
          to="/tam-su"
          className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          ✍️ Viết câu chuyện của bạn
        </Link>
      </div>
    </div>
  );
};

export default StoryDetailPage;