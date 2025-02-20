import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import './index.less'

const FontConverter: React.FC = () => {
  const [text, setText] = useState('hello');
  const [inputText, setInputText] = useState('');
  const [convertText, setConvertText] = useState<Array<{name: string, text: string}>>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const FONT_MAPS = {
    boldItalic: {
      name: '粗斜体',
      upperOffset: 119912,
      lowerOffset: 119938  
    },
    scriptBold: {
      name: '花体',
      upperOffset: 120016,
      lowerOffset: 120042  
    },
    doubleStruck: {
      name: '双线体',
      upperOffset: 120120,
      lowerOffset: 120146  
    },
    sansSerifItalic: {
      name: '无衬线斜体',
      upperOffset: 120328,
      lowerOffset: 120354
    },
    fraktur: {
      name: '哥特体',
      upperOffset: 120068,
      lowerOffset: 120094
    },
    circled: {
      name: '圆圈字母',
      upperOffset: 9398,
      lowerOffset: 9398
    },
    squared: {
      name: '方框字母',
      upperOffset: 127280,
      lowerOffset: 127280
    },
  };

  useEffect(() => {
    handleConvert(text)
  },[])

  const convertToFont = (text: string, upperOffset: number, lowerOffset: number) => {
    let result = '';
    for (const char of text) {
      let codePoint = char.charCodeAt(0);
      if (codePoint >= 65 && codePoint <= 90) {
        codePoint += upperOffset -65;
        result += String.fromCodePoint(codePoint);
      } else if (codePoint >= 97 && codePoint <= 122) {
        codePoint += lowerOffset -97;
        result += String.fromCodePoint(codePoint);
      } else {
        result += char;
      }
    }
    return result;
  };

  const handleConvert = (text: string) => {
    const results = Object.values(FONT_MAPS).map(font => ({
      name: font.name,
      text: convertToFont(text, font.upperOffset, font.lowerOffset)
    }));
    setConvertText(results);
  };


  const handleReset = () => {
    setInputText('');
    setText('hello')
  };

  const handleCopy = async (text: string) => {
    try {
      // 首先尝试使用 Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // 后备方案：创建临时文本区域
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          textArea.remove();
        } catch (err) {
          textArea.remove();
          throw new Error('复制失败');
        }
      }
      
      messageApi.open({
        type: 'success',
        content: '已复制到剪贴板',
        duration: 1.5,
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: '复制失败',
        duration: 1.5,
      });
    }
  };

  return (
    <div className="fontConverter">
      {contextHolder}
      <div className="converterSection">
        <textarea
          className="inputTextarea"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
          }}
          placeholder="请输入要转换的文本"
        />
        <div className="controls">
          <button className="convertBtn" onClick={() => handleConvert(inputText)} disabled={!inputText}>生成</button>
          <button className="resetBtn" onClick={handleReset}>清空重新输入</button>
        </div>
        <div className="sampleFonts">
          {Array.isArray(convertText) && convertText.map((item, index) => (
            <div className="sampleFont" key={index}>
              <div className="sampleFontName">{item.name}</div>
              <div className="sampleFontTextContainer">
              <div className="sampleFontText">{item.text}</div>
              <Button 
                className="copyBtn" 
                onClick={() => handleCopy(item.text)}
              >
                复制
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FontConverter; 