import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const SearchBar = () => {

  //const onSearch = value => console.log(value);

  return (
    <div >
        <label className='searchBar'>
          <input placeholder='Search Topic' />
          <Button><SearchOutlined/></Button>
        </label>
    </div>
  )
}

export default SearchBar