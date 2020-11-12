import React from "react";
import logo from "../../images/logo.webp";
import notiFooter from "../../images/notiFooter.webp";
import hasRegister from "../../images/has-register.webp";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/twitter.png";
import appStore from "../../images/appStore.png";
import chPlay from "../../images/chPlay.webp";
import "./styles.css";

function Footer() {
  return (
    <div className="container-footer">
      <div className="logo-footer">
        <img src={logo} alt="" />
      </div>
      <div className="footer-wrapper">
        <div className="footer-address-company">
          <div>
            <h5 className="footer-title">Công ty TNHH Mytour Việt Nam</h5>
            <ul>
              <li>Hà Nội: 024 7109 9999</li>
              <li>Hồ Chí Minh: 028 7109 9998</li>
              <li>Email: admin@mytour.vn</li>
              <li>
                Văn phòng Hà Nội: Tầng 11, Tòa Peakview, 36 Hoàng Cầu, Đống Đa
              </li>
              <li>
                Văn phòng HCM: Tầng 6, Tòa Nhà Central Park, 117 Nguyễn Du, Q.1
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-rule">
          <h5 className="footer-title">
            QUY ĐỊNH DÀNH CHO WEBSITE TMĐT BÁN HÀNG –<br /> DỊCH VỤ ĐẶT PHÒNG
          </h5>
          <ul>
            <li>Chính sách và quy định chung</li>
            <li>Quy định về thanh toán</li>
            <li>Chính sách về hủy đặt phòng và hoàn trả tiền</li>
          </ul>
          <div className="noti-footer">
            <img src={notiFooter} alt="" />
            <img src={hasRegister} alt="" />
          </div>
        </div>
        <div className="footer-connect-app">
          <h5 className="footer-title">TẢI MOBILE APP: MYTOUR.VN</h5>
          <div className="app-connect">
            <img src={appStore} alt="" />
            <img src={chPlay} alt="" />
          </div>
          <hf5 className="footer-title">KẾT NỐI VỚI MYTOUR.VN</hf5>
          <div className="social-network">
            <a target="_bland" href="https://www.facebook.com/">
              <img src={facebook} alt="" />
            </a>
            <a target="_bland" href="https://www.twitter.com/">
              <img src={twitter} alt="" />
            </a>
            <a target="_bland" href="https://www.instagram.com/">
              <img src={instagram} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
