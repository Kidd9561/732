import React from 'react'
import { BackTop } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, UpCircleFilled } from '@ant-design/icons';

const FooterElement = () => {
  return (
    <div>
      <div>
          <h3>FOLLOW US</h3>
          <a href='https://www.facebook.com/'><FacebookOutlined /></a>
          <a href='https://twitter.com/'><TwitterOutlined/></a>
          <a href='https://www.instagram.com/'><InstagramOutlined /></a>
      </div>
      <h3>News Timeline ©2022 Created by Dazzling Dragonfish</h3>
      <BackTop>
          <UpCircleFilled className='backTop'/>
      </BackTop>
    </div>
  )
}

export default FooterElement