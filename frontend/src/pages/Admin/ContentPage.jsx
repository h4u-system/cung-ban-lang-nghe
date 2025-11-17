// frontend/src/pages/Admin/ContentPage.jsx

import React, { useState, useEffect } from 'react';
import adminService from '../../services/admin';

const ContentPage = () => {
  const [stories, setStories] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('stories');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (activeTab === 'stories') {
      loadStories();
    } else {
      loadContacts();
    }
  }, [activeTab]);

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPendingStories();
      setStories(data.stories || []);
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await adminService.getContactForms();
      setContacts(data.forms || []);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveStory = async (storyId) => {
    try {
      await adminService.approveStory(storyId);
      alert('Đã duyệt câu chuyện!');
      loadStories();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRejectStory = async (storyId) => {
    try {
      await adminService.rejectStory(storyId);
      alert('Đã từ chối câu chuyện!');
      loadStories();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMarkContactRead = async (contactId) => {
    try {
      await adminService.markContactRead(contactId);
      loadContacts();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <span>✅</span>
          Duyệt nội dung
        </h1>
        <p className="text-gray-600 mt-1">Kiểm duyệt câu chuyện và tin nhắn liên hệ</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setActiveTab('stories')}
          className={`flex-1 py-3 rounded-xl font-semibold transition ${
            activeTab === 'stories'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📝 Câu chuyện ({stories.length})
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex-1 py-3 rounded-xl font-semibold transition ${
            activeTab === 'contacts'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📧 Liên hệ ({contacts.length})
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stories Tab */}
          {activeTab === 'stories' && (
            <div className="space-y-4">
              {stories.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Không có câu chuyện chờ duyệt</h3>
                  <p className="text-gray-600">Tất cả đã được xử lý</p>
                </div>
              ) : (
                stories.map((story) => (
                  <div key={story.id} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
                          {story.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800">{story.title}</h3>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(story.created_at).toLocaleString('vi-VN')}
                      </span>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                      {story.content}
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApproveStory(story.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition shadow-lg"
                      >
                        ✅ Duyệt & Xuất bản
                      </button>
                      <button
                        onClick={() => handleRejectStory(story.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition shadow-lg"
                      >
                        ❌ Từ chối
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Không có tin nhắn mới</h3>
                  <p className="text-gray-600">Inbox trống</p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`bg-white rounded-2xl p-6 shadow-lg ${
                      !contact.is_read ? 'border-2 border-green-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        {!contact.is_read && (
                          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
                            ✉️ Mới
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {contact.subject}
                        </h3>
                        {contact.name && (
                          <p className="text-sm text-gray-600">
                            <strong>Từ:</strong> {contact.name}
                          </p>
                        )}
                        {contact.email && (
                          <p className="text-sm text-gray-600">
                            <strong>Email:</strong> {contact.email}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(contact.created_at).toLocaleString('vi-VN')}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {contact.message}
                      </p>
                    </div>

                    {!contact.is_read && (
                      <button
                        onClick={() => handleMarkContactRead(contact.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition shadow-lg"
                      >
                        ✅ Đánh dấu đã đọc
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContentPage;