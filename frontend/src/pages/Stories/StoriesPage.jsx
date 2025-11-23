// *****************************************************
// frontend/src/pages/Stories/StoriesPage.jsx
// *****************************************************

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import publicApi from '../../services/publicApi';

const MAX_CONTENT_LENGTH = 5000;

const StoriesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'stress'
  });
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await publicApi.getStories(null, 20, 0);
      setStories(data.stories || []);
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await publicApi.submitStory(formData);
      alert('Cảm ơn bạn đã chia sẻ! Câu chuyện sẽ được kiểm duyệt trước khi hiển thị.');
      setShowForm(false);
      setFormData({ title: '', content: '', category: 'stress' });
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">📝 Tâm sự của Bạn</h1>
        <p className="opacity-90">
          Chia sẻ câu chuyện của bạn, truyền cảm hứng cho người khác
        </p>
      </div>

      {/* Write Story Button */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            Tất cả câu chuyện đều <span className="font-semibold">ẩn danh 100%</span>
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {showForm ? '← Quay lại' : '✍️ Viết câu chuyện'}
        </button>
      </div>

      {/* Story Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Chia sẻ câu chuyện của bạn</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Tiêu đề *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ví dụ: Vượt qua nỗi sợ hãi của mình"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Chủ đề *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="stress">Stress & Áp lực</option>
                <option value="lonely">Cô đơn</option>
                <option value="love">Tình yêu học trò</option>
                <option value="exam">Thi cử</option>
                <option value="family">Gia đình</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Câu chuyện của bạn *</label>
              <textarea
                required
                rows="8"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Kể câu chuyện của bạn... (Tối thiểu 100 ký tự)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.content.length} / 5000 ký tự
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-4">
              <p className="text-sm text-gray-700">
                <strong>Lưu ý:</strong> Câu chuyện sẽ được kiểm duyệt trước khi hiển thị. 
                Chúng mình sẽ ẩn thông tin cá nhân nếu có.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {submitting ? 'Đang gửi...' : 'Gửi câu chuyện'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stories List */}
      {!showForm && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Câu chuyện từ bạn bè</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải câu chuyện...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có câu chuyện nào</h3>
              <p className="text-gray-600">Hãy là người đầu tiên chia sẻ!</p>
            </div>
          ) : (
            stories.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {story.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800">
                      {story.title}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(story.created_at).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{story.excerpt}</p>
                <div className="flex items-center justify-between">
                  {/* Use Link with proper to prop */}
                  <Link
                    to={`/tam-su/${story.id}`}
                    className="text-primary-500 hover:text-primary-600 font-semibold text-sm hover:underline transition"
                  >
                    Đọc thêm →
                  </Link>
                  <button
                    onClick={() => handleLike(story.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition"
                  >
                    <span>❤️ {story.likes_count}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StoriesPage;