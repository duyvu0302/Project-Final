import React, { useState } from "react";
import history from "../../util/history";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import iconHotel from "../../images/hotel.png";
import { CarOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker, Space, Input, Button, Tooltip } from "antd";

import "./style.css";
import slick1 from "../../images/slick1.jpg";
import slick2 from "../../images/slick2.jpg";
import slick3 from "../../images/slick3.jpg";
import slick4 from "../../images/slick4.jpg";
import slick5 from "../../images/slick5.webp";
import slick6 from "../../images/slick6.jpg";
import slick7 from "../../images/slick7.jpg";
import slick8 from "../../images/slick8.jpg";
import checked from "../../images/checked.png";

import hanoi from "../../images/hà nội.jpg";
import hcm from "../../images/HCM.jpg";
import halong from "../../images/haj long.jpg";
import sapa from "../../images/sapa.webp";
import vungtau from "../../images/Vũng tàu.jpg";
import dalat from "../../images/đà lạt.png";
import danang from "../../images/đà nẵng.jpg";
import phuquoc from "../../images/phú quốc.jpg";
import whyLogo from "../../images/whyLogo.png";
import panner from "../../images/panner.webp";

const { RangePicker } = DatePicker;

function Home() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const place = "ha noi";
  return (
    <>
      <div className="home-container">
        <div className="home-wrapper">
          <div className="home-content">
            <div className="box-search-parent">
              <div className="box-search">
                <div className="icon-hotel">
                  <img src={iconHotel} alt="" />
                  <h2>Khách sạn</h2>
                </div>
                <div className="input-search">
                  <Input
                    size="large"
                    placeholder="Nhập tên khách sạn, địa điểm..."
                    prefix={<CarOutlined />}
                  />
                </div>
                <div className="date-picker">
                  <Space direction="vertical" size={12}>
                    <RangePicker />
                  </Space>
                  ,
                </div>
                <div className="button-search">
                  <Button type="primary" icon={<SearchOutlined />}>
                    Tìm khách sạn
                  </Button>
                </div>
              </div>
            </div>
            <div className="slick-home">
              <div className="slick-home-child">
                <Slider {...settings}>
                  <img src={slick1} alt="" />
                  <img src={slick2} alt="" />
                  <img src={slick3} alt="" />
                  <img src={slick4} alt="" />
                </Slider>
              </div>
            </div>
          </div>
          <div className="grid-home-VietNam-container">
            <div>ĐIỂM ĐẾN PHỔ BIẾN VIỆT NAM</div>
            <div className="grid-home-wrapper">
              <div onClick={() => history.push(`hotels/${"ha noi"}`)}>
                <img src={hanoi} alt="" />
                <h3 className="item-name">Hà Nội</h3>
              </div>
              <div onClick={() => history.push(`hotels/${"ha long"}`)}>
                <img src={halong} alt="" />
                <h3 className="item-name">Hạ Long</h3>
              </div>
              <div onClick={() => history.push(`hotels/${"hcm"}`)}>
                <img src={hcm} alt="" />
                <h3 className="item-name">Hồ Chí Minh</h3>
              </div>
              <div>
                <img src={dalat} alt="" />
                <h3 className="item-name">Đà Lạt</h3>
              </div>
              <div>
                <img src={danang} alt="" />
                <h3 className="item-name">Đà Nẵng</h3>
              </div>
              <div>
                <img src={sapa} alt="" />
                <h3 className="item-name">Sa Pa</h3>
              </div>
              <div>
                <img src={phuquoc} alt="" />
                <h3 className="item-name">Phú Quốc</h3>
              </div>
              <div>
                <img src={vungtau} alt="" />
                <h3 className="item-name">Vũng Tàu</h3>
              </div>
            </div>
          </div>
          <div className="grid-home-foreign-container">
            <div>ĐIỂM ĐẾN PHỔ BIẾN QUỐC TẾ</div>
            <div className="grid-home-wrapper">
              <div onClick={() => history.push(`hotels/${"ha noi"}`)}>
                <img src={hanoi} alt="" />
                <h3 className="item-name">BangKok</h3>
              </div>
              <div onClick={() => history.push(`hotels/${"ha long"}`)}>
                <img src={halong} alt="" />
                <h3 className="item-name">Singapore</h3>
              </div>
              <div onClick={() => history.push(`hotels/${"hcm"}`)}>
                <img src={hcm} alt="" />
                <h3 className="item-name">GuangZhou</h3>
              </div>
              <div>
                <img src={dalat} alt="" />
                <h3 className="item-name">KuaLa LumBua</h3>
              </div>
              <div>
                <img src={danang} alt="" />
                <h3 className="item-name">Seoul</h3>
              </div>
              <div>
                <img src={sapa} alt="" />
                <h3 className="item-name">JaPan</h3>
              </div>
              <div>
                <img src={phuquoc} alt="" />
                <h3 className="item-name">America</h3>
              </div>
              <div>
                <img src={vungtau} alt="" />
                <h3 className="item-name">Hong Kong</h3>
              </div>
            </div>
          </div>
          <div className="why-container">
            <div className="slick-home-down-child">
              <Slider {...settings}>
                <img src={slick5} alt="" />
                <img src={slick6} alt="" />
                <img src={slick7} alt="" />
                <img src={slick8} alt="" />
              </Slider>
            </div>
            <div className="why-img-content">
              <img src={whyLogo} alt="" />
              <ul>
                <li>
                  <img className='img-absolute' src={checked} alt=""/>
                  Giá tốt hơn so với đặt phòng trực tiếp tại khách sạn</li>
                <li>
                  <img className='img-absolute' src={checked} alt=""/>
                  Đảm bảo giá tốt nhất</li>
                <li>
                  <img className='img-absolute' src={checked} alt=""/>
                  Đảm bảo hoàn tiền</li>
                <li>
                  <img className='img-absolute' src={checked} alt=""/>
                  Nhân viên chăm sóc, tư vấn nhiều kinh nghiệm</li>
                <li>
                  <img className='img-absolute' src={checked} alt=""/>
                  Hơn 5000 khách sạn tại Việt Nam với đánh giá thực</li>
                <li>
                  <img className='img-absolute' src={checked} alt=""/>
                  Nhiều chương trình khuyến mãi và tích lũy điểm</li>
                <li>
                  <img className='img-absolute' src={checked} alt=""/>
                  Thanh toán dễ dàng, đa dạng</li>
              </ul>
              <img src={panner} alt="" />
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
