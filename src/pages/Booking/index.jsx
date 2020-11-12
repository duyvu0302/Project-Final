import React, { useEffect, useState } from "react";
import history from "../../util/history";
import { connect } from "react-redux";
import { getRoomDetail, getHotelDetailList } from "../../redux/actions";
import { Rate, Form, Input, Radio, Checkbox, Select, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./style.css";
import map from "../../images/map.png";
import plus from "../../images/plus.png";
import minus from "../../images/minus.png";
import visa from "../../images/visa.png";
import ucb from "../../images/ucb.png";
import master from "../../images/master.png";
import untonpay from "../../images/untonpay.png";
import checked from "../../images/checked.png";
import allAtm from "../../images/allAtm.jpg";

function Booking({
  match,
  hotelDetailList,
  getHotelDetailList,
  roomDetail,
  getRoomDetail,
}) {
  const roomId = match.params.idRoom;
  const hotelId = match.params.idHotel;

  useEffect(() => {
    getRoomDetail({
      idRoom: roomId,
      idHotel: hotelId,
    });
  }, [roomId]);
  const [amountRoom, setAmountRoom] = useState(1);
  const [codeDiscount, setCodeDiscount] = useState();
  const [isShowDiscount, setIsShowDiscount] = useState(false);
  const [checkDiscount, setCheckDiscount] = useState(false);
  const [isCheckedPay, setIsCheckedPay] = useState(1);

  const handleCheckDiscount = () => {
    if (codeDiscount === "KS2020") {
      setCheckDiscount(true);
      setIsShowDiscount(false);
    } else {
      setCheckDiscount(false);
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    if(value>0){
      setAmountRoom(value);
    }
  };
  const handleDiscount = (e) => {
    const { value } = e.target;
    setCodeDiscount(value);
  };

  const handleShowDiscount = () => {
    setIsShowDiscount(!isShowDiscount);
  };
  const handleCheckedPay = (e) => {
    const { value } = e.target;
    setIsCheckedPay(value);
    console.log("handleCheckedPay -> value", value);
  };
  const hotelDetail = roomDetail.slice(0, 1);
  const roomDetailHotel = roomDetail.slice(1);
  const dateTime = JSON.parse(sessionStorage.getItem("datePicker"));
  const diffDays = () => {
    const dateCheckIn = new Date(dateTime.checkIn);
    const dateCheckOut = new Date(dateTime.checkOut);
    const diffTime = Math.abs(dateCheckOut - dateCheckIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  console.log("roomDetail", roomDetail);
  const [form] = Form.useForm();
  const { Option } = Select;
  const renderHotelDetail = () => {
    return hotelDetail.map((item, index) => (
      <>
        <div key={`booking-${item.id}-${index}`} >
          <div className="address-wrapper-room">
            <div>
              <strong>
                {item.name} <Rate disabled value={item.rate} />
              </strong>
            </div>
            <div className="address-detail-room">
              <img src={map} alt="" /> {item.address}
            </div>
            <div>
              <div className="checkIn-booking">
                <span> Nhận phòng:</span>
                <span> 15:00 {dateTime.checkIn}</span>
              </div>
              <div className="checkIn-booking">
                <span> Trả phòng:</span>
                <span> 12:00 {dateTime.checkOut}</span>
              </div>
              <div className="checkIn-booking">
                <span>Số đêm:</span> <span>{diffDays()} đêm</span>
              </div>
              <div className=" checkIn-booking number-booking">
                <div style={{ paddingTop: 4 }}>Số phòng:</div>
                <Form>
                <Form.Item
                    name="content"
                    rules={[
                      {
                        validator: (_, value) =>
                          value > 0
                            ? Promise.resolve()
                            : Promise.reject("Bạn phải nhập số phòng lớn hơn 0"),
                      },
                    ]}
                  >
                    <Input
                      defaultValue="1"
                      type='number'
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div>
            <div className="note-booking-room">
              <div className="note1-booking-room note-booking">
                Giá tốt nhất dành cho bạn
              </div>
              <div className="note2-booking-room note-booking">
                Giữ phòng ngay cho kì nghỉ sắp tới
              </div>
            </div>
          </div>
          <div className="info-contact-container">
            <div className="info-contact-wrapper">Thông Tin Liên Hệ</div>
            <div>
              <div>
                <Form form={form} layout="vertical" initialValues={{}}>
                  <div className="info-email-phone">
                    <Form.Item
                      label="Email"
                      name="Email"
                      rules={[
                        {
                          required: true,
                          message: "Điền email của bạn vào đây !",
                        },
                        {
                          type: "email",
                          message: "Email không hợp lệ",
                        },
                      ]}
                    >
                      <Input placeholder="Nhập email của bạn" />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[
                        {
                          required: true,
                          message: "Nhập số điện thoại của bạn ở đây!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>

                  <div className="info-name-address">
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Bạn phải điền tên vào mục này",
                        },
                      ]}
                      label="Họ và tên"
                    >
                      <Input placeholder="Nhập tên của bạn" />
                    </Form.Item>
                    <Form.Item
                      name="Address"
                      label="Address"
                      rules={[
                        {
                          required: true,
                          message: "Chọn thành phố bạn ở !",
                        },
                      ]}
                    >
                      <Select placeholder="Chọn tỉnh/Thành phố" allowClear>
                        <Option value="male">Hà Nội</Option>
                        <Option value="female">TP.Hồ Chí Minh</Option>
                        <Option value="other">Đà Nẵng</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                "Bạn phải đồng ý trước khi chọn thanh toán"
                              ),
                      },
                    ]}
                  >
                    <Checkbox>
                      <small>
                        Tôi đồng ý nhận các thông tin khuyến mại được nêu chi
                        tiết trong chính sách bảo mật như thông báo, bản tin,
                        khuyến mại, các ưu đãi khác liên quan đến sản phẩm và
                        dịch vụ của MyTour và các đối tác của MyTour.vn
                      </small>
                    </Checkbox>
                  </Form.Item>
                  <div className="pay-way-booking">
                    <Radio.Group
                      defaultValue="1"
                      buttonStyle="solid"
                      onChange={(e) => handleCheckedPay(e)}
                    >
                      <Radio.Button value="1">Thẻ tín dụng</Radio.Button>
                      <Radio.Button value="2">Thẻ ATM nội địa</Radio.Button>
                      <Radio.Button value="3">Chuyển khoản</Radio.Button>
                    </Radio.Group>
                  </div>
                  <div className="pay-booking-room">
                    {isCheckedPay == 1 ? (
                      <div className="pay-booking-room-wrapper">
                        <div className="card-booking">
                          <span>Loại thẻ : </span>
                          <img src={visa} alt="" />
                          <img src={master} alt="" />
                          <img src={untonpay} alt="" />
                          <img src={ucb} alt="" />
                        </div>
                        <div className="pay-booking-room-safe">
                          <img src={checked} alt="" />
                          <span>
                            Thanh toán an toàn qua cổng Onepay, miễn phí giao
                            dịch.
                          </span>
                        </div>
                        <div className="pay-booking-room-safe">
                          <img src={checked} alt="" />
                          <span>Xác nhận ngay qua email và sms</span>
                        </div>
                        <div className="pay-booking-button">
                          <Button danger type="primary" htmlType="submit">
                            Thanh toán
                          </Button>
                          <div>
                            <small>
                              Bằng cách nhấp nút Thanh toán, bạn đồng ý với Điều
                              kiện và điều khoản của chúng tôi
                            </small>
                          </div>
                        </div>
                      </div>
                    ) : isCheckedPay == 2 ? (
                      <>
                        <div className="pay-booking-room-wrapper pay-booking-room-wrapper1">
                          <div className="card-booking">
                            <img
                              style={{ width: "100%" }}
                              src={allAtm}
                              alt=""
                            />
                          </div>
                          <div className="pay-booking-room-safe">
                            <img src={checked} alt="" />
                            <span>
                              Thanh toán an toàn qua cổng Onepay, miễn phí giao
                              dịch.
                            </span>
                          </div>
                          <div className="pay-booking-room-safe">
                            <img src={checked} alt="" />
                            <span>Xác nhận ngay qua email và sms</span>
                          </div>
                          <div className="pay-booking-button">
                            <Button danger type="primary" htmlType="submit">
                              Thanh toán
                            </Button>
                            <div>
                              <small>
                                Bằng cách nhấp nút Thanh toán, bạn đồng ý với
                                Điều kiện và điều khoản của chúng tôi
                              </small>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="pay-booking-room-wrapper pay-booking-room-wrapper2">
                          <div className="pay-booking-room-child">
                            <div>
                              Hướng dẫn thanh toán sẽ gửi tới email đặt phòng.
                            </div>
                            <div>
                              Vui lòng thanh toán trước 02:30:25 Thứ ba, ngày
                              27/10/2020.
                            </div>
                            <div>
                              Quá thời hạn thanh toán trên, đơn phòng sẽ tự động
                              bị hủy.
                            </div>
                          </div>
                          <div className="pay-booking-button">
                            <Button danger type="primary" htmlType="submit">
                              Thanh toán
                            </Button>
                            <div>
                              <small>
                                Bằng cách nhấp nút Thanh toán, bạn đồng ý với
                                Điều kiện và điều khoản của chúng tôi
                              </small>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </>
    ));
  };
  const renderBookingRoom = () => {
    return roomDetailHotel.map((roomItem, roomIndex) => (
      <>
        <div className="bill-booking-room-container">
          <div className="title-room-detail-booking">
            Đặt Ngay Có Phòng Trong Giây Lát
          </div>
          <div className="content-bill-head-room">
            <div className="name-room-detail-booking">{roomItem.name}</div>
            <div>
              <span>Số phòng:</span>
              <span>{amountRoom}</span>
              <div>
                <div className="price-raw-room">
                  <div style={{ marginLeft: "2rem" }}>
                    <div>&curren; Bao gồm bửa sáng</div>
                    <div>&curren; Có điều kiện hoàn huỷ</div>
                  </div>
                  <div className="price">
                    {Math.ceil(
                      roomItem.price * amountRoom * diffDays()
                    ).toLocaleString()}
                    <div>
                      <small>đ /{diffDays()} đêm</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="price-room-other">
            <div className="price-room-tax">
              <div>10% thuế</div>
              <div className="price">
                {(
                  (roomItem.price * amountRoom * diffDays()) /
                  10
                ).toLocaleString()}{" "}
                <small>đ</small>{" "}
              </div>
            </div>
            <div style={{ margin: "unset" }}>
              <div>Phí giao dịch tại Mytour</div>
              <div className="price">Miễn phí</div>
            </div>
          </div>
          <div className="total-bill">
            <div>Tổng tiền</div>
            <div className="price">
              <div></div>
              {checkDiscount === false
                ? Math.ceil(
                    roomItem.price * amountRoom * diffDays() +
                      (roomItem.price * amountRoom * diffDays()) / 10
                  ).toLocaleString()
                : Math.ceil(
                    ((roomItem.price * amountRoom * diffDays() +
                      (roomItem.price * amountRoom * diffDays()) / 10) *
                      80) /
                      100
                  ).toLocaleString()}
              <small>đ</small>
            </div>
          </div>
          <div className="code-discount-container">
            <div onClick={() => handleShowDiscount()}>
              <img src={isShowDiscount == true ? minus : plus} alt="" /> Bạn có
              mã giảm giá ?
            </div>
            <div className="code-discount-room">
              {isShowDiscount === true && (
                <Form form={form} layout="vertical" initialValues={{}}>
                  <Form.Item
                    name="content"
                    rules={[
                      {
                        validator: (_, value) =>
                          value === "KS2020"
                            ? Promise.resolve()
                            : Promise.reject("Mã giảm giá không tồn tại"),
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => handleDiscount(e)}
                      placeholder="Nhập mã giảm giá của bạn"
                    />
                  </Form.Item>

                  <Button
                    onClick={() => handleCheckDiscount()}
                    type="primary"
                    htmlType="submit"
                  >
                    Áp dụng
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </div>
      </>
    ));
  };
  return (
    <>
      <div className="booking-container">
        <div className="info-user-booking">{renderHotelDetail()}</div>
        <div className="bill-booking">{renderBookingRoom()}</div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const { roomDetail } = state.hotelDetailReducer;
  console.log("mapStateToProps -> roomDetail", roomDetail);
  return {
    roomDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRoomDetail: (params) => dispatch(getRoomDetail(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Booking);
