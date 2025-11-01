import React, { useState } from 'react';

const QAPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const qaData = [
    {
      category: "Về dịch vụ",
      questions: [
        {
          q: "Dịch vụ này có miễn phí không?",
          a: "Có! Cùng Bạn Lắng Nghe hoàn toàn miễn phí 100%."
        },
        {
          q: "Có cần đăng ký tài khoản không?",
          a: "Không cần! Bạn có thể chat ngay lập tức mà không cần đăng ký, hoàn toàn ẩn danh."
        },
        {
          q: "Thông tin của mình có bị lưu lại không?",
          a: "Tất cả cuộc trò chuyện được mã hóa và tự động xóa sau 30 ngày. Chúng mình không lưu thông tin cá nhân."
        }
      ]
    },
    {
      category: "Về AI tư vấn",
      questions: [
        {
          q: "AI có thay thế được chuyên gia tâm lý không?",
          a: "Không. AI là công cụ hỗ trợ ban đầu, giúp bạn hiểu cảm xúc. Với vấn đề nghiêm trọng, bạn nên gặp chuyên gia thật."
        },
        {
          q: "AI được huấn luyện như thế nào?",
          a: "AI được huấn luyện trên dữ liệu tâm lý học đường Việt Nam, tài liệu chính thống từ Bộ GD&ĐT và khảo sát thực tế."
        },
        {
          q: "Nếu AI phát hiện khủng hoảng thì sao?",
          a: "Hệ thống sẽ hiển thị thông tin khẩn cấp (111, 115) và khuyến nghị liên hệ người lớn ngay lập tức."
        }
      ]
    },
    {
      category: "An toàn & Bảo mật",
      questions: [
        {
          q: "Ai có thể đọc được tin nhắn của mình?",
          a: "Không ai! Tin nhắn được mã hóa AES-256, chỉ bạn và AI có thể đọc. Ngay cả đội ngũ phát triển cũng không thể."
        },
        {
          q: "Nếu mình muốn xóa cuộc trò chuyện?",
          a: "Bạn có thể xóa bất cứ lúc nào. Đóng tab/app cũng sẽ xóa session sau 30 phút không hoạt động."
        },
        {
          q: "Có bị theo dõi vị trí không?",
          a: "Không! Chúng mình không thu thập vị trí, không cần số điện thoại, email hay bất kỳ thông tin cá nhân nào."
        }
      ]
    },
    {
      category: "Sử dụng",
      questions: [
        {
          q: "Có giới hạn số tin nhắn không?",
          a: "Không giới hạn! Bạn có thể chat bao nhiêu tùy thích, 24/7."
        },
        {
          q: "Có thể dùng trên điện thoại không?",
          a: "Có! Website được tối ưu cho mobile. App riêng đang được phát triển."
        },
        {
          q: "Nếu AI không hiểu câu hỏi?",
          a: "Hãy thử diễn đạt lại bằng cách khác. Hoặc chọn chủ đề cụ thể ở phần 'Chủ đề cảm xúc'."
        }
      ]
    }
  ];

  const filteredQA = searchQuery
    ? qaData.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.questions.length > 0)
    : qaData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">❓ Hỏi & Đáp</h1>
        <p className="opacity-90">
          Câu hỏi thường gặp về dịch vụ Cùng Bạn Lắng Nghe
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      {/* Q&A Sections */}
      {filteredQA.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Không tìm thấy câu hỏi phù hợp
        </div>
      ) : (
        filteredQA.map((category, catIndex) => (
          <div key={catIndex} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.questions.map((qa, qaIndex) => (
                <details key={qaIndex} className="group">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start justify-between bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition">
                      <h3 className="font-semibold text-gray-800 pr-4">
                        {qa.q}
                      </h3>
                      <svg
                        className="w-5 h-5 text-gray-500 flex-shrink-0 transform group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </summary>
                  <div className="mt-3 pl-4 pr-4 pb-2 text-gray-600 leading-relaxed">
                    {qa.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Still Have Questions */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
        <h3 className="font-bold text-gray-800 mb-2">
          Vẫn còn thắc mắc?
        </h3>
        <p className="text-gray-600 mb-4">
          Hãy chat với AI hoặc liên hệ với chúng mình
        </p>
        <div className="flex justify-center space-x-3">
          <a
            href="/"
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            💬 Chat với AI
          </a>
          
          <a
            href="/lien-he"
            className="bg-white hover:bg-gray-50 text-purple-600 border border-purple-300 px-6 py-3 rounded-lg font-semibold transition"
          >
            📧 Liên hệ
          </a>
        </div>
      </div>
    </div>
  );
};

export default QAPage;