import React from 'react';
import { ConversionHistory } from '../../types';

interface HistoryProps {
  history: ConversionHistory[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div>
      <h2>转换历史</h2>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            <p>原文: {item.originalText}</p>
            <p>字体: {item.fontFamily}</p>
            <p>时间: {item.timestamp.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History; 