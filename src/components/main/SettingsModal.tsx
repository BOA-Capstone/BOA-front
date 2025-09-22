import React from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-black rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-blue-700">설정</h2>
        <div className="mb-6 text-white">설정 내용이 여기에 들어갑니다.</div>
        <button
          className="absolute top-4 right-4 text-white bg-black hover:text-blue-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="닫기"
        >×</button>
        <button
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >닫기</button>
      </div>
    </div>
  );
};

export default SettingsModal;
