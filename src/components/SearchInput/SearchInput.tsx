import { Input } from 'antd';
import { FC } from 'react';

import styles from './SearchInput.module.scss';

const { Search } = Input;

interface SearchInputProps {
  placeholder?: string;
  onSearch: (text: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  return (
    <div className={styles.searchInputContainer}>
      <Search
        placeholder={placeholder || 'Input search text'}
        allowClear
        enterButton='Search'
        size='large'
        onSearch={onSearch}
      />
    </div>
  );
};
