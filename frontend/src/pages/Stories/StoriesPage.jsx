
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StoriesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'stress'
  });

  // Mock stories data
  const stories = [
    {
      id: 1,
      title: "Vượt qua kỳ thi THPT",
      category: "Thi cử",
      excerpt: "Mình đã rất căng thẳng trước kỳ thi, nhưng nhờ những phương pháp thư giãn...",
      date: "2025-10-30",
      likes: 45
    },
    {
      id: 2,
      title: "Hòa giải với bố mẹ",
      category: "Gia đình",
      excerpt: "Sau nhiều lần cãi vã, mình đã học cách lắng nghe và thấu hiểu...",
      date: "2025-10-29",
      likes: 32
    },
    {
      id: 3,
      title: "Tìm lại niềm vui",
      category: "Cô đơn",
      excerpt: "Từ chỗ cảm thấy cô đơn, mình đã tìm thấy nhóm bạn cùng sở thích...",
      date: "2025-10-28",
      likes: 28
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit story:', formData);
    alert('Cảm ơn bạn đã chia sẻ! Câu chuyện của bạn sẽ được kiểm duyệt trước khi hiển thị.');
    setShowForm(false);
    setFormData({ title: '', content: '', category: 'stress' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">📝 Tâm sự học sinh</h1>
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
              <label className="block text-sm font-semibold mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="VD: Vượt qua nỗi sợ hãi của mình"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Chủ đề *
              </label>
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
              <label className="block text-sm font-semibold mb-2">
                Câu chuyện của bạn *
              </label>
              <textarea
                required
                rows="8"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Kể câu chuyện của bạn... (Tối thiểu 100 ký tự)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.content.length} / 2000 ký tự
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
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-semibold transition"
              >
                Gửi câu chuyện
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
          {stories.map((story) => (
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
                <span className="text-sm text-gray-500">{story.date}</span>
              </div>
              <p className="text-gray-600 mb-4">{story.excerpt}</p>
              <div className="flex items-center justify-between">
                <button className="text-primary-500 hover:text-primary-600 font-semibold text-sm">
                  Đọc thêm →
                </button>
                <div className="flex items-center space-x-2 text-gray-500">
                  <button className="hover:text-red-500 transition">
                    ❤️ {story.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
