import React from 'react';
import { Menu } from 'antd';

const HeaderElement = () => {

    const label = ['Business' , 'Health', 'Sports', 'Entertainment', 'Travel', 'Politics'];

  return (
    <div>
        <div className="logo"><a href="/" style={{color:'#fff'}}>Dazzling Dragonfish</a></div>
        <Menu theme="dark" mode="horizontal" className='menu'>
            {new Array(6).fill(null).map((_, index) => {
                const key = index + 1;
                return <Menu.Item key={key}>{label[index]}</Menu.Item>;
            })}
        </Menu>
    </div>
  )
}

export default HeaderElement
