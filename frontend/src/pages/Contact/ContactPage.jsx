import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'feedback',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'feedback', message: '' });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Liên hệ và Góp ý</h1>
        <p className="opacity-90">Chúng mình luôn lắng nghe ý kiến của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-4xl mb-3">📧</div>
          <h3 className="font-semibold mb-2">Email</h3>
          <a href="mailto:support@cungbanlangnghe.vn" className="text-primary-500 hover:underline">
            support@cungbanlangnghe.vn
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-semibold mb-2">Facebook</h3>
          <a href="https://fb.com/cungbanlangnghe" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
            fb.com/cungbanlangnghe
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="font-semibold mb-2">Chat AI</h3>
          <a href="/" className="text-primary-500 hover:underline">Trò chuyện ngay</a>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn cho chúng mình</h2>
        
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Cảm ơn bạn đã liên hệ!</h3>
            <p className="text-gray-700">Chúng mình sẽ phản hồi trong vòng 24-48 giờ.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Tên của bạn (tùy chọn)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="VD: Nguyễn Văn A"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email (tùy chọn)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Chủ đề *</label>
              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="feedback">Góp ý / Phản hồi</option>
                <option value="bug">Báo lỗi kỹ thuật</option>
                <option value="feature">Đề xuất tính năng</option>
                <option value="partnership">Hợp tác</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Nội dung *</label>
              <textarea
                required
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Chia sẻ ý kiến, câu hỏi hoặc đề xuất của bạn..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Gửi tin nhắn
            </button>
          </form>
        )}
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-2">Trước khi liên hệ</h3>
        <p className="text-gray-700 mb-4">Có thể câu hỏi của bạn đã được trả lời trong phần Hỏi đáp</p>
        <a href="/hoi-dap" className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          Xem câu hỏi thường gặp
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Kết nối với chúng mình</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition">
            <div className="text-3xl mb-2">📘</div>
            <div className="text-sm font-semibold">Facebook</div>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-4 text-center transition">
            <div className="text-3xl mb-2">📷</div>
            <div className="text-sm font-semibold">Instagram</div>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 text-center transition">
            <div className="text-3xl mb-2">🎵</div>
            <div className="text-sm font-semibold">TikTok</div>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-red-50 hover:bg-red-100 rounded-lg p-4 text-center transition">
            <div className="text-3xl mb-2">📹</div>
            <div className="text-sm font-semibold">YouTube</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;