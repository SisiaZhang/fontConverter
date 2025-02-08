import React, { useState } from 'react';
import { Font } from '../../types';

const SAMPLE_FONTS: Font[] = [
  { id: '1', name: '草书', family: 'Cursive' },
  { id: '2', name: '楷书', family: 'KaiTi' },
  { id: '3', name: '宋体', family: 'SimSun' },
];

const FontConverter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedFont, setSelectedFont] = useState<Font>(SAMPLE_FONTS[0]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
  };

  return (
    <div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="请输入要转换的文本"
      />
      <select
        value={selectedFont.id}
        onChange={(e) => {
          const font = SAMPLE_FONTS.find(f => f.id === e.target.value);
          if (font) setSelectedFont(font);
        }}
      >
        {SAMPLE_FONTS.map(font => (
          <option key={font.id} value={font.id}>
            {font.name}
          </option>
        ))}
      </select>
      <div style={{ fontFamily: selectedFont.family }}>
        {inputText}
      </div>
      <button onClick={handleCopy}>复制文本</button>
    </div>
  );
};

export default FontConverter; 