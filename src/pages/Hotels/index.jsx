import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../util/history';
import Restaurant from '../../images/restaurant.png';
import Pool from '../../images/swimming-pool.png';
import parking from '../../images/car-insurance.png';
import Laundry from '../../images/washing-machine.png';
import checker from '../../images/checked.png';
import Wifi from '../../images/wifi-signal.png';
import rate from '../../images/rate.png';
import map from '../../images/map.png';

import { getHotelList, getSearchList } from '../../redux/actions';
import { Rate,Checkbox,Pagination,Button,Slider, Input,DatePicker,Radio  } from 'antd';
import { CarOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";



import './style.css';

const { RangePicker } = DatePicker;

function Hotels({
  match,
   hotelList,
   getList,
   listSearch,
   getSearchList
}) {
  const [searchKey, setSearchKey] = useState('');
  const [isChecked, setIschecked] = useState(false);
  const [isChecked1, setIschecked1] = useState(false);
  const [isChecked2, setIschecked2] = useState(false);
  const [current,setCurrent] = useState(1);
  const [bundleList,setBundleList] = useState();
  const place = match.params.place

  useEffect(() => {
    getList({
      page: current,
      limit: 10,
      place:place
    })
    getSearchList();
  }, []);

  const { Search } = Input;

  function onChangeService(e){
    console.log('service = ', e);
  
  }
  const onChangePrice = (value)=>{
    console.log("price:",value);
    if(value.length>0){
      let rangePrice
      if(value[0]==="1"){
        rangePrice = ["0","500000"]
      }
      else if(value[0]==="2"){
        rangePrice = ["500000","1000000"]
      }
      else if(value[0]==="3"){
        rangePrice = ["1000000","2000000"]
      }
      else if(value[0]==="4"){
        rangePrice = ["2000000","10000000"]
      }
      getSearchList({
        rangePrice: rangePrice,
        page: 1
      })
        setCurrent(1)
        setBundleList({
          ...bundleList,
          rangePrice: rangePrice
        })
        
        setIschecked(true)
      }
    else setIschecked(false)
  }

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
    if(checkedValues!==0){
      getSearchList({
        rate: checkedValues,
        page: 1
      });
      setCurrent(1)
      setBundleList({
        ...bundleList,
        rate: checkedValues,
      })
      setIschecked(true)
    }
    else{
      setIschecked(false)
    }
  }
  function onChangeRadio(e) {
    const radioValue = e.target.value;
    if(radioValue=="a"){
      getSearchList({
        softRate:"desc"
      })
      setCurrent(1)
      setBundleList({
        ...bundleList,
        softRate:"desc"
      })
      setIschecked(true)
    }
    else if(radioValue=="b"){
      getSearchList({
        softPoint:"desc"
      })
      setCurrent(1)
      setBundleList({
        ...bundleList,
        softPoint:"desc"
      })
      setIschecked(true)
    }
    else if(radioValue=="c"){
      getSearchList({
        softAsc:"asc"
      })
      setCurrent(1)
      setBundleList({
        ...bundleList,
        softAsc:"asc"
      })
      setIschecked(true)
    }
    else if(radioValue=="d"){
      getSearchList({
        soft:"desc"
      })
      setCurrent(1)
      setBundleList({
        ...bundleList,
        soft:"desc"
      })
      setIschecked(true)
    }
    else{

      setIschecked(false)
    }
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  }
  const dateFormat = ["MM/DD/YYYY"];

  // function onChangeRange(defaultValue) {
  //   console.log("onChangeRange -> defaultValue", defaultValue[0])
  //   if(onAfterChange()===true){
  //     getSearchList({ 
  //       defaultPrice: defaultValue
  //     }
  //     )
  //     setIschecked(true)
  //   }
  //   setIschecked(false)
  // }

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchKey(value);
  }
 
  const filterTodoListData = (isChecked===true ? listSearch : hotelList).filter((hotelItem,hotelItemIndex) => {
    return (hotelItem.name.toLowerCase()).indexOf(searchKey.toLowerCase()) !== -1
  });
  

  const renderHotelList = () => {
    return filterTodoListData.map((hotelItem, hotelItemIndex) => (
      <>
        <div key={hotelItemIndex} className='products-item' >
          <div className='hotel-header'>
              <div className='content-title-hotel'>
                <div>
                  <strong>
                  {hotelItem.name} <Rate disabled value={hotelItem.rate} />
                  </strong>
                </div>
                  <img src={map} alt=""/> {hotelItem.address}
              </div>
          </div> 
          <div className='data-hotels'>
                <div onClick={()=>history.push(`/hotel/${place}/${hotelItem.id}`)} className='avatar-img'>
                    <img src={hotelItem.url[0].src}/>
                </div>
                <div className='hotel-service'>
                    <span>
                          <img src={Wifi} alt=""/>
                    </span>
                    <span>
                        {(hotelItem.restaurant===true)&&
                              <img src={Restaurant} alt=""/>
                        }
                    </span>
                    <span>
                      {(hotelItem.pool===true)&&
                          <img src={Pool} alt=""/>
                      } 
                    </span>
                    <span>
                      {(hotelItem.laundry===true)&&
                          <img src={Laundry} alt=""/>
                      } 
                    </span>
                    <span>
                      {(hotelItem.parking===true)&&
                          <img src={parking} alt=""/>
                      } 
                    </span>
                    <ul>
                      <li><img src={checker} alt=""/> Đảm bảo hoàn tiền</li>
                      <li> <img src={checker} alt=""/> Đảm bảo giá tốt nhất</li>
                      <li></li>
                    </ul>
              </div>
              <div className='price-content'>
                <div className='point'>
                  <div>
                      {(hotelItem.point)>8?'Xuất sắc':'Tốt'}
                     <span> {hotelItem.point} </span> 
                  </div>
                </div>
                  <div className='oldPrice'>
                      {hotelItem.oldPrice}
                      <span>
                       <small> đ</small>
                      </span>
                  </div>
                  <div>
                      Giảm giá {Math.ceil(-hotelItem.defaultPrice*100/hotelItem.oldPrice)} &#37;
                  </div>
                  <div>
                      {(hotelItem.defaultPrice).toLocaleString()}
                        <span>
                          <small> đ</small>
                        </span>
                  </div>
                    <Button type="primary" onClick={()=>history.push(`/hotel/${place}/${hotelItem.id}`)}>Xem phòng</Button>
                   </div>
              </div>
            </div>
      </>
    ))
  }

  return (
    <>
      <div className="headed-detail">
          <div className="header-hotel-detail-search">
            <div className="">
              <Input
                size="large"
                onChange={(e)=>handleSearch(e)}
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
                  moment(moment().add(1,"day"), dateFormat),
                ]}
                format={dateFormat}
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
        <div className='sort-up-down-hotels' >
          <Radio.Group onChange={(e)=>onChangeRadio(e)} >
            <Radio.Button value="a">Hạng khách sạn</Radio.Button>
            <Radio.Button value="b">Đánh giá cao nhất</Radio.Button>
            <Radio.Button value="c">Giá tiền thấp đến cao</Radio.Button>
            <Radio.Button value="d">Giá tiền cao đến thấp</Radio.Button>
          </Radio.Group>
        </div>
      <div className='hotels-container'>
        <div className='page-hotels-list'>
      
          <div className='listing-sidebar-container'>
              <div>
                <div className='input-search-hotels'>
                    <h3>Lọc khách sạn theo</h3> 
                    <Search
                      placeholder="Nhập tên khách sạn"
                      onChange={(e)=>handleSearch(e)}
                      style={{ width: 200,height:'40px !important'}}
                    />
                </div>
               <div className='filter-checkbox-star'>
                  <div className="title-filter-checkbox-star "style={{marginLeft:7,marginBottom:7}} >
                    <strong>Hạng sao</strong>
                  </div>
                <Checkbox.Group onChange={onChange}>
                  <div className='checkbox-star'>
                      <Checkbox  value='1'  ><img src={rate} alt=""/></Checkbox>
                  </div>
                  <div className='checkbox-star'>
                        <Checkbox value='2'>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        </Checkbox>
                  </div>
                  <div className='checkbox-star'>
                        <Checkbox value='3'>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        </Checkbox>
                  </div>
                  <div className='checkbox-star'>
                        <Checkbox value='4'>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        </Checkbox>
                  </div>
                  <div className='checkbox-star'>
                        <Checkbox value='5'>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        <img src={rate} alt=""/>
                        </Checkbox>
                  </div>
                </Checkbox.Group>
               </div>
              {/* <div className='filter-checkbox-service'>
                  <div className="title-filter-checkbox-star "style={{marginLeft:7,marginBottom:7}} >
                    <strong>Tiện nghi khách sạn</strong>
                  </div>
                  <Checkbox.Group onChange={(e)=>onChangeService(e)}>
                  <div className='checkbox-service'>
                        <Checkbox value='1' >
                          Hồ bơi
                        </Checkbox>
                    </div>
                    <div className='checkbox-service'>
                          <Checkbox  value='2'>
                            Bãi đỗ xe
                          </Checkbox>
                    </div>
                    <div className='checkbox-service'>
                          <Checkbox  value='3'>
                            Giặt ủi
                          </Checkbox>
                    </div>
                    <div className='checkbox-service'>
                          <Checkbox value='4'>
                            Nhà hàng
                          </Checkbox>
                    </div>
                  </Checkbox.Group>
                </div> */}
                <div className='filter-checkbox-address'>
                  <div className="title-filter-checkbox-star "style={{marginLeft:7,marginBottom:7}} >
                    <strong>Sắp xếp theo giá</strong>
                  </div>
                  <Checkbox.Group onChange={onChangePrice}>
                  <div className='checkbox-service'>
                        <Checkbox value='1'>
                          Nhỏ hơn 500.000 đ
                        </Checkbox>
                    </div>
                    <div className='checkbox-service'>
                          <Checkbox value='2'>
                           Từ 500.000 đ - 1000.0000 đ
                          </Checkbox>
                    </div>
                    <div className='checkbox-service'>
                          <Checkbox value='3'>
                          Từ 1000.000 đ - 2000.0000 đ
                          </Checkbox>
                    </div>
                    <div className='checkbox-service'>
                          <Checkbox value='4'>
                          Lớn hơn 2000.000 đ
                          </Checkbox>
                    </div>
                  </Checkbox.Group>
                </div>
              </div>
              {/* <div>
              <Slider
                range
                step={500000}
                max={3000000}
                defaultValue={[0, 3000000]}
                min={0}
              />
              </div> */}
          </div>
          <div className="render-hotels-list" >
            {renderHotelList()}
          </div>
        </div>
        <div>
            <Pagination 
            current={current} 
            total={40}
            onChange={(page) =>{
              return(
                setCurrent(page),
                (isChecked !== true
                ?getList({page,limit:10})
                :getSearchList({page,
                  rate: bundleList.rate, 
                  soft: bundleList.soft, 
                  rangePrice: bundleList.rangePrice,
                  softAsc:bundleList.softAsc,
                  softPoint:bundleList.softPoint,
                  softRate:bundleList.softRate
                }))
              )
            }}
            />
          </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { hotelList,listSearch } = state.hotelReducer;
  return {
    hotelList,
    listSearch
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    getList: (params) => dispatch(getHotelList(params)),
    getSearchList: (params) => dispatch(getSearchList(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Hotels);
