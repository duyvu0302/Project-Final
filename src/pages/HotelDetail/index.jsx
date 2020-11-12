/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import history from "../../util/history";
import moment from "moment";
import {
  getHotelDetailList,
  createComment,
  getCommentDetail,
} from "../../redux/actions";
import {
  DatePicker,
  Space,
  Input,
  Progress,
  Rate,
  Button,
  Slider,
  Form,
  Pagination,
  Select,
  message
} from "antd";
import checker from "../../images/checked.png";
import { CarOutlined, SearchOutlined } from "@ant-design/icons";

import home from "../../images/home.png";
import map from "../../images/map.png";
import expand from "../../images/expand.png";
import bed from "../../images/bed.png";
import Wifi from "../../images/wifi-signal.png";
import mountain from "../../images/mountain.png";
import Laundry from "../../images/washing-machine.png";
import Restaurant from "../../images/restaurant.png";
import Pool from "../../images/swimming-pool.png";
import motorbike from "../../images/motorbike.png";
import reception from "../../images/reception.png";
import elevator from "../../images/elevator.png";
import clean from "../../images/clean.png";
import chat from "../../images/chat (2).png";
import breakfast from "../../images/breakfast.png";
import userProfile from "../../images/user-profile.png";
import up from "../../images/up-arrow-angle.png";
import down from "../../images/angle-arrow-down.png";
import ca from "../../images/ico_dam_bao_hoan_tien.webp";

import "./style.css";
import { formatCountdown } from "antd/lib/statistic/utils";

const { RangePicker } = DatePicker;

function hotelDetail({
  match,
  getHotelDetail,
  hotelDetailList,
  createComment,
  commentList,
  getComments,
  getCommentDetail,
}) {
  const { Option } = Select;
  const productId = match.params.id;
  const place = match.params.place;
  const [form] = Form.useForm();
  let hotelDetailId = JSON.stringify(productId);
  sessionStorage.setItem("hotelDetailId", hotelDetailId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value1, setValue1] = useState(10);
  const [value2, setValue2] = useState(10);
  const [value3, setValue3] = useState(10);
  const [value4, setValue4] = useState(10);
  const [value5, setValue5] = useState(10);
  const [totalEvaluate, setTotalEvaluate] = useState(10);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    getHotelDetail({
      id: productId,
      place: place
    });
    getCommentDetail({
      id: productId,
      page: current,
    });
    let dateTime = {
      checkIn : moment().startOf("day").format(dateFormat),
      checkOut : moment().add(1,"day").format(dateFormat),
    }
    let rangeDateTime = JSON.stringify(dateTime);
    sessionStorage.setItem("datePicker",rangeDateTime)
  }, [productId]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowDetail1, setIsShowDetail1] = useState(false);
  const [isChangeDay, setIsChangeDay] = useState(false);
  console.log("isChangeDay", isChangeDay)
  const handleShowDetail = () => {
    setIsShowDetail(!isShowDetail);
  };
  const handleShowDetail1 = () => {
    setIsShowDetail1(!isShowDetail1);
  };
  const handleOnchangeSlider = (value, itemIndex) => {
    switch (itemIndex) {
      case 0:
        setValue1(value);
        break;
      case 1:
        setValue2(value);
        break;
      case 2:
        setValue3(value);
        break;
      case 3:
        setValue4(value);
        break;
      case 4:
        setValue5(value);
        break;
    }
    
    const values = (value1 + value2 + value3 + value4 + value5) / 5;
    setTotalEvaluate(values.toFixed(1));
  };
 
  const handleSubmitForm = (value) => {
    console.log("handleSubmitForm -> value", value.content)
    form.resetFields();
    if (JSON.parse(localStorage.getItem("user"))) {
      createComment({
        email: value.email,
        commentId: Number(productId),
        content: value.content,
        totalEvaluate: totalEvaluate,
        nickname: JSON.parse(localStorage.getItem("user")).nickname,
      });
      setCurrent(1);
    }
     else message.error("Bạn phải đăng nhập");
  };

  const onFinishFailed = (errorInfo) => {};
  const listService = ["Vệ sinh", "Giá tiền", "Dịch vụ", "Vị trí", "Phục vụ"];
  const hotelDetail = hotelDetailList.slice(0, 1);
  const roomHotel = hotelDetailList.filter((item) => item.hotelId == productId);
  const commentHotel = hotelDetailList.filter(
    (item) => item.commentId == productId
  );

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  }
  const dateFormat = ["MM/DD/YYYY"];
  const getDataPicker = (value, date) => {
    setIsChangeDay(true);
    let datePicker = JSON.stringify(date);
    sessionStorage.setItem("datePicker", datePicker);
  };
  const renderHotelDetail = () => {
    return hotelDetail.map((hotelItem, hotelIndex) => (
      <>
        <div key={`hotelDetailHead-${hotelIndex}-${hotelItem.id}`} className="content-detail-hotel">
          <div className="content-title-hotel-detail">
            <div>
              <strong>
                {hotelItem.name} <Rate disabled value={hotelItem.rate} />
              </strong>
            </div>
            <div>
              <img src={map} alt="" /> {hotelItem.address}
            </div>
            <div style={{ width: 90 }} className="point-evaluate-hotel-detail">
              <div style={{ textAlign: "center", fontSize: "150%" }}>
                <strong>{hotelItem.point}</strong>
              </div>
              <div style={{display:"flex",justifyContent:"center"}}>
                {commentHotel != 0 && (
                  <span className="number-vote pointer">
                    &#40;
                    <span>
                    {commentHotel.length} đánh giá
                    </span>
                     &#41;
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="content-title-hotel-detail-right">
            <div className="icon-book-evaluate-point-hotel-detail">
              <div className="icon-evaluate-point-hotel-detail">
                <div>
                  <img
                    style={{ width: 100, height: "auto" }}
                    src={ca}
                    alt="icon-hoan-tien"
                  />
                </div>
              </div>
              <div className="book-hotel-detail">
                <Button style={{ width: "100%" }} type="primary">
                  Đặt phòng ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="item1">
            <img src={hotelItem.url[0].src} />
          </div>
          <div>
            <img src={hotelItem.url[2].src} />
          </div>
          <div>
            <img src={hotelItem.url[4].src} />
          </div>
          <div>
            <img src={hotelItem.url[7].src} />
          </div>
          <div>
            <img src={hotelItem.url[8].src} />
          </div>
        </div>
      </>
    ));
  };
  const renderRoomDetail = () => {
    return roomHotel.map((roomItem, roomIndex) => (
      <>
        <div key={`hotelDetailMain-${roomItem.id}-${roomIndex}`} >
          <div className="name-hotel-detail">{roomItem.name}</div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td className="item1-detail-hotel">
                    <div className="img-hotel-detail">
                      <img src={roomItem.src} />
                    </div>
                    <div>
                      <img src={expand} />
                      <span>{roomItem.description.roomArea}</span>
                    </div>
                    <div>
                      <img src={bed} /> <span>{roomItem.description.bed}</span>
                    </div>
                  </td>
                  <th className="item2-detail-hotel">
                    <div>
                      <span>
                        <img src={userProfile} alt="" /> x{" "}
                      </span>{" "}
                      {roomItem.capacity}
                      <br />
                      Người
                    </div>
                  </th>
                  <th className="item3-detail-hotel">
                    <div>
                      <img src={breakfast} alt="" />{" "}
                      <span>Bao gồm bửa sáng</span>
                      <br />
                      <img src={chat} alt="" /> <span>Điều kiện hoàn huỷ</span>
                    </div>
                  </th>
                  <th className="item4-detail-hotel">
                    <div className="discount-detail-hotel">
                      <div>
                        Khuyến mãi đặc biệt -{" "}
                        {Math.ceil(
                          100 - (roomItem.price * 100) / roomItem.oldPrice
                        )}{" "}
                        &#37;
                      </div>
                      <div className="oldPrice">
                        {roomItem.oldPrice.toLocaleString()}
                        <span>
                          <small> đ</small>
                        </span>
                      </div>
                      <div>
                        {roomItem.price.toLocaleString()}
                        <span>
                          <small> đ</small>
                        </span>
                      </div>
                      <div className="code-discount">
                        <div className="title-code-discount">
                          -20% Nhập mã KS2020
                        </div>
                        <div className="price-discount">
                          Giá chỉ còn
                          <br />
                          {((roomItem.price * 80) / 100).toLocaleString()}
                          <span>
                            <small> đ</small>
                          </span>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="item5-detail-hotel">
                    <Button
                      onClick={() =>
                        {if (JSON.parse(localStorage.getItem("user"))){

                          history.push(`/booking/${place}/${productId}/${roomItem.id}`)
                        }
                        else{
                          message.error("Bạn phải đăng nhập")
                        }
                        }
                      }
                      type="primary"
                    >
                      Đặt ngay
                    </Button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    ));
  };
  return (
    <>
      <div className="detail-container">
        <div className="headed-detail">
          <div className="header-hotel-detail-search">
            <div className="">
              <Input
                size="large"
                style={{ width: 300, height: 40, borderRadius: "0.2rem" }}
                placeholder="Nhập tên khách sạn"
                prefix={<CarOutlined />}
              />
            </div>
            <div className="">
              <RangePicker
                disabledDate={disabledDate}
                defaultValue={[
                  moment(moment().startOf("day"), dateFormat),
                  moment(moment().add(1,"day"), dateFormat ),
                ]}
                format={dateFormat}
                onChange={getDataPicker}
              />
            </div>
            <div className="">
              <Button
                type="primary"
                style={{ width: 300, height: 40, borderRadius: "0.2rem" }}
                danger
                icon={<SearchOutlined />}
              >
                Tìm khách sạn
              </Button>
            </div>
          </div>
        </div>
        
        <div className="main-detail">
          <div>{renderHotelDetail()}</div>
          <div className="box-detail-hotel">
            <div style={{ marginTop: 16 }} className="box-title-detail">
              <div style={{ marginLeft: 10 }}>Chọn Phòng Khách Sạn</div>
              <div style={{ marginRight: 10 }}>
                <div style={{ textAlign: "center" }}>
                  <img style={{ margin: "0 3px 3px" }} src={checker} alt="" />
                  <span>Đảm bảo giá tốt nhất</span>
                </div>
                <div>
                  <small>Giá ưu đải chỉ giành cho khách nội địa</small>
                </div>
              </div>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th className="item1-detail-hotel">LOẠI PHÒNG</th>
                    <th className="item2-detail-hotel">TỐI ĐA</th>
                    <th className="item3-detail-hotel">TUỲ CHỌN</th>
                    <th className="item4-detail-hotel">
                      <span>GIÁ 1 ĐÊM</span>
                      <br />
                      <span>
                        <small>Chưa bao gồm thuế,phí</small>
                      </span>
                    </th>
                    <th className="item5-detail-hotel">ĐẶT PHÒNG</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div>{renderRoomDetail()}</div>
          <div
            className={`${
              isShowDetail === true
                ? "headed-service-detail-room"
                : "service-detail-room-content"
            }`}
            onClick={() => handleShowDetail()}
          >
            <div>Tiện Nghi Khách Sạn</div>
            <div>
              <img src={isShowDetail === true ? up : down} alt="" />
            </div>
          </div>
          <div>
            {isShowDetail === true && (
              <div className="service-item-detail-room">
                <div>
                  <div>
                    <img src={Pool} alt="" /> Hồ bơi ngoài trời
                  </div>
                  <div>
                    <img src={elevator} alt="" /> Thang máy
                  </div>
                  <div>
                    <img src={Wifi} alt="" /> Wifi miễn phí
                  </div>
                </div>
                <div>
                  <div>
                    <img src={mountain} alt="" /> Hỗ trợ đặt tour
                  </div>
                  <div>
                    <img src={Restaurant} alt="" /> Nhà hàng
                  </div>
                  <div>
                    <img src={reception} alt="" /> Lễ tân 24/24
                  </div>
                </div>
                <div>
                  <div>
                    <img src={Laundry} alt="" /> Giặt ủi
                  </div>
                  <div>
                    <img src={clean} alt="" /> Dọn phòng hàng ngày
                  </div>
                  <div>
                    <img src={motorbike} alt="" /> Cho thuê xe máy
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`${
              isShowDetail1 === true
                ? "headed-service-detail-room"
                : "service-detail-room-content"
            }`}
            onClick={() => handleShowDetail1()}
          >
            <div>Chính Sách Khách Sạn</div>
            <div>
              <img src={isShowDetail1 === true ? up : down} alt="" />
            </div>
          </div>
          <div>
            {isShowDetail1 === true && (
              <div className="time-work-detail-room">
                <strong>
                  <div>Giờ nhận phòng: 15:00</div>
                  <div>Giờ trả phòng: 12:00</div>
                </strong>
                <p>
                  Hỗ trợ dời ngày của booking trong giai đoạn giãn cách do dịch
                  sang giai đoạn khác (trong vòng 6 -12 tháng tính từ ngày nhận
                  phòng của booking ban đầu).
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="evaluate-detail-room">
              <div className="title-evaluate-detail-content">
                Đánh giá khách sạn
              </div>
              <div className="display-evaluate-detail-room"></div>
              <div className="evaluate-item-detail-room">
                <div className="point-evaluate-detail-room">
                  <div className="evaluate-content-detail-room">
                    {totalEvaluate > 9
                      ? "Xuất sắc"
                      : totalEvaluate > 8
                      ? "Tốt"
                      : "Khá"}
                  </div>
                  <Progress
                    width={160}
                    format={(percent) => percent}
                    type="circle"
                    percent={totalEvaluate * 10}
                  />
                </div>

                <div className="slider-evaluate-point-detail">
                  {listService.map((item, itemIndex) => (
                    <>
                      <div>{item}</div>
                      <Slider
                        step={0.1}
                        max={10}
                        min={1}
                        onChange={(value) =>
                          handleOnchangeSlider(value, itemIndex)
                        }
                        value={
                          itemIndex === 0
                            ? value1
                            : itemIndex === 1
                            ? value2
                            : itemIndex === 2
                            ? value3
                            : itemIndex === 3
                            ? value4
                            : value5
                        }
                      />
                    </>
                  ))}
                </div>
                <div style={{ alignSelf: "baseline" }}>
                  <Form
                  form={form}
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={(value) => handleSubmitForm(value)}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Nhận xét của bạn"
                      name="content"
                      rules={[
                        {
                          required: true,
                          message:
                            "Phải viết nhận xét của bạn trước khi nhấn gửi",
                          max: 1000,
                          message: "Không vượt quá 1000 kí tự",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Gửi
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <div>
                {commentList.map((value) => (
                  <>
                    <div className="comments-container">
                      <div className="nickName-user-comment">
                        <div>
                          <img src={home} alt="" />
                          <strong>{value.nickname}</strong>
                        </div>
                      </div>
                      <div className="evaluate-comment-user">
                        <div className="point-comment-user">
                          <div className="point-comment-user-wrapper">
                            <span className="point-comment-user-child">
                              {value.totalEvaluate}
                            </span>
                            <span className="evaluate-point-child">
                              {value.totalEvaluate > 9
                                ? "Xuất sắc"
                                : value.totalEvaluate > 8
                                ? "Rất Tốt"
                                : "Khá Tốt"}
                            </span>
                          </div>
                        </div>
                        <div className="content-comment-user">
                          <p style={{ wordWrap: "break-word" }}>
                            " {value.content} "
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div>
                <Pagination
                  current={current}
                  total={100}
                  onChange={(page) => {
                    return (
                      setCurrent(page),
                      getCommentDetail({ id: productId, page })
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { hotelDetailList, commentList } = state.hotelDetailReducer;
  return {
    hotelDetailList,
    commentList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCommentDetail: (params) => dispatch(getCommentDetail(params)),
    getHotelDetail: (params) => dispatch(getHotelDetailList(params)),
    createComment: (params) => dispatch(createComment(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(hotelDetail);
