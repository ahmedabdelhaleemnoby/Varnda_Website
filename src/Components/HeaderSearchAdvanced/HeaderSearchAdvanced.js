import React, { useEffect, useState } from "react";
import "./HeaderSearchAdvanced.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import {Container,Col} from 'react-bootstrap';
import Search from "../Search/Search.js";
import queryString from "query-string";
import { useParams } from "react-router-dom";

export default function HeaderSearchAdvanced({query,navigate,setProperties,setLoading,setSendfilter}) {
  let { gov } = useParams();
  const token = Cookies.get("token");
  // const [searchText, setSearchText] = useState(query.get("searchText") ? query.get("searchText").split(',') : []);
  // const [searchText, setSearchText] = useState([]);
  const [selectedOption, setSelectedOption] = useState(query.get("selectedOption") || "");
  const [subCategory, setSubCategory] = useState(query.get("subCategory") || "");
  const [propertyType, setPropertyType] = useState(query.get("propertyType") || "سكنى");
  const [rooms, setRooms] = useState(query.get("rooms") ? query.get("rooms").split(',') : []);
  const [bathrooms, setBathrooms] = useState(query.get("bathrooms") ? query.get("bathrooms").split(',') : []);
  const [price, setPrice] = useState({ min: query.get("minPrice") || "", max: query.get("maxPrice") || "" });
  const [area, setArea] = useState({ min: query.get("minArea") || "", max: query.get("maxArea") || "" });
  const [radioValue, setRadioValue] = useState(query.get("status") || '');
  const [address, setAddress] = useState({
    governorate: query.get("governorate") 
    ? [...new Set([...query.get("governorate").split(','), gov])] 
    : gov 
      ? [gov] 
      : [],
    // governorate: query.get("governorate") ? query.get("governorate").split(',') : [],
    city: query.get("city") ? query.get("city").split(',') : [],
    street: query.get("street") ? query.get("street").split(',') : [],
    region: query.get("region") ? query.get("region").split(',') : []
  });
  const [sortBy,setSortBy]=useState(query.get("sortBy") || "الاحدث")
  
  useEffect(() => {
    // Add gov to governorate if it's not already included
    if(gov){
      setAddress(prevAddress => {
        if (!prevAddress.governorate.includes(gov)) {
          return {
            ...prevAddress,
            governorate: [...prevAddress.governorate, gov]
          };
        }
        return prevAddress;
      });
    }

  }, [gov]);

  const updateURL = () => {
    const currentParams = {
      sortBy,
      selectedOption,
      subCategory,
      rooms: rooms.join(','),
      bathrooms: bathrooms.join(','),
      minPrice: price.min,
      maxPrice: price.max,
      minArea: area.min,
      maxArea: area.max,
      status: radioValue,
    };
    let filterCurrentParams = Object.fromEntries(
      Object.entries(currentParams).filter(
        ([key, value]) =>
          value != null && value !== "" && !(Array.isArray(value) && value.length === 0)
      )
    );
    if (Array.isArray(address.governorate) && address.governorate.length > 0) {
      // استبعاد العنصر الأول من المصفوفة
      const governoratesExcludingFirst = address.governorate.slice(1);
      // إذا كانت المصفوفة بعد الاستبعاد تحتوي على عناصر
      if (governoratesExcludingFirst.length > 0) {
        filterCurrentParams.governorate = governoratesExcludingFirst.join(',');
      }
    }
    
    if (Array.isArray(address.city) && address.city.length > 0) {
      filterCurrentParams.city = address.city.join(',');
    }
    if (Array.isArray(address.street) && address.street.length > 0) {
      filterCurrentParams.street = address.street.join(',');
    }
    if (Array.isArray(address.region) && address.region.length > 0) {
      filterCurrentParams.region = address.region.join(',');
    }


    if (Array.isArray(address.governorate) && address.governorate.length > 0) {
      gov = address.governorate[0];
    }
    navigate({
      pathname: `/search/${gov?gov:""}`,
      search: queryString.stringify(filterCurrentParams),
    });
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] =
    useState(false);

    const residentialOptions = [
      "شقة", "فيلا منفصلة", "دوبلكس", "بنتهاوس", "شاليه", "تاون هاوس", "توين هاوس", "أرض سكنية","ستوديو" ];
  
    const commercialOptions = [
      "زراعية","تجارية","صناعية","محل تجارى","مكتب ادارى","عيادة طبية","معمل تحاليل","صيدلية","مطعم","مخزن","كافيه","جراج",
    ];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "rent") {
      setShowDropdown(true);
    }
  };

  const handleSubCategoryChange = (duration) => {
    setSubCategory(duration);
  };

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
  };

  const handleReset = () => {
    setSelectedOption("");
    setSubCategory("");
    setPropertyType("سكنى");
    setShowDropdown(false);
    setShowPropertyTypeDropdown(false);
    setPrice({ min: "", max: "" });
    setArea({ min: "", max: "" });
  };

  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  


  const roomValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8","9","10"];
  const bathroomValues = ["1", "2", "3", "4", "5", "6"];

  const handleRoomChange = (room) => {
    setRooms((prevRooms) =>
      prevRooms.includes(room)
        ? prevRooms.filter((item) => item !== room)
        : [...prevRooms, room]
    );
  };

  const handleBathRoomChange = (bathroom) => {
    setBathrooms((prevBathrooms) =>
      prevBathrooms.includes(bathroom)
        ? prevBathrooms.filter((item) => item !== bathroom)
        : [...prevBathrooms, bathroom]
    );
  };



  const [doSearch, setDoSearch] = useState(true)

  
  const radios = [
    { name: 'قيد الانشاء', value: 'under construction' },
    { name: 'جاهز', value: 'done' },
    { name: 'الجميع', value: '' },
  ];
  /////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setDoSearch(!doSearch)
    updateURL()
  }, [address, selectedOption, subCategory, rooms, bathrooms, area, price, radioValue,sortBy]);

  // API
  useEffect(() => {
    const handelSearch = async () => {
      try {
        setLoading(true)
        const params = {
          governorate: address.governorate,
          city: address.city,
          street: address.street,
          region: address.region,
          type: selectedOption,
          sub_category: subCategory,
          rooms: rooms,
          bathrooms: bathrooms,
          max_price: price.max,
          min_price: price.min,
          max_area: area.max,
          min_area: area.min,
          status: radioValue,
        };
        setSendfilter({
          type: selectedOption,
          gov:
            address.governorate && address.governorate.length > 0
              ? address.governorate[0]
              : "",
          city: address.city && address.city.length > 0 ? address.city[0] : "",
          region:
            address.region && address.region.length > 0
              ? address.region[0]
              : "",
          compound: "",
        });
        // Filter out parameters with null, undefined, empty string, or empty arrays
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(
            ([key, value]) =>
              value != null && value !== "" && !(Array.isArray(value) && value.length === 0)
          )
        );
        const response = await api.get(`/searchAds?sortBy=${sortBy}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: filteredParams,
        });
        setProperties(response.data.data)
      } catch (err) {
        console.log(err);
      }finally{
        setLoading(false)
      }
    };
    handelSearch();
  }, [doSearch]);

  // Filter search result
  const searchFilter=["الأحدث","الاقل سعر","الاعلى سعر"]
  const handleFilterChange = (option) => {
    setSortBy(option);
  };


  return (
    <>
      <div id="basic-navbar-nav" className="justify-content-between show mt-2">
        <Form dir="rtl" className="w-100">
          <Row className="d-flex align-items-center justify-content-start formInfoAdvanced m-0 mb-3 ">
            <Col lg="2" md="3" className="mb-2">
              <Form.Group className="inputSelectAdvanced">
                <Dropdown
                  show={showDropdown}
                  onToggle={(isOpen) => setShowDropdown(isOpen)}
                  align="end"
                >
                  <Button
                    variant="light"
                    id="dropdown-basic"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-100"
                  >
                    {selectedOption === "rent"
                      ? "للايجار"
                      : selectedOption === "sale"
                      ? "للبيع"
                      : "بيع و ايجار"}
                  </Button>

                  <Dropdown.Menu
                    className="dropdown-menu-right menu-sale w-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 p-md-2">
                      <h5 className="mb-3 type-ofer">نوع العرض</h5>
                      <div className="d-flex justify-content-around text-center">
                        <Dropdown.Item
                          key="1"
                          className="btn mx-1"
                          style={{border:'1px solid #0d6efd'}}
                          onClick={(e) => {
                            e.preventDefault();
                            handleOptionChange("sale");
                          }}
                          active={selectedOption === "sale"}
                        >
                          للبيع
                        </Dropdown.Item>
                        <Dropdown.Item
                          key="2"
                          className="btn mx-1"
                          style={{border:'1px solid #0d6efd'}}
                          onClick={(e) => {
                            e.preventDefault();
                            handleOptionChange("rent");
                          }}
                          active={selectedOption === "rent"}
                        >
                          للايجار
                        </Dropdown.Item>
                      </div>
                      {/* <div className="d-flex justify-content-between mt-3">
                            <Button variant="secondary" onClick={handleReset}>
                              إعادة ضبط
                            </Button>
                            <Button
                              className="me-2"
                              variant="primary"
                              onClick={handleDone}
                            >
                              تم
                            </Button>
                          </div> */}
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>

            <Col lg="4" md="6" className="mb-2">
              <Search className="search" setAddress={setAddress} />
            </Col>

            <Col lg="1" md="2" className="mb-2">
              <Form.Group className="inputSelectAdvanced">
                <Dropdown
                  show={showPropertyTypeDropdown}
                  onToggle={(isOpen) => setShowPropertyTypeDropdown(isOpen)}
                  align="end"
                >
                  <Button
                    variant="light"
                    id="dropdown-basic"
                    onClick={() =>
                      setShowPropertyTypeDropdown(!showPropertyTypeDropdown)
                    }
                    className="w-100"
                  >
                    {propertyType}
                  </Button>

                  <Dropdown.Menu
                    className="menu-sale"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3">
                      <div className="d-flex justify-content-around">
                        <Button
                          className="btn btn-primary select-option"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePropertyTypeChange("سكنى");
                          }}
                          active={propertyType === "سكنى"}
                        >
                          سكنى
                        </Button>
                        <Button
                          className="btn btn-primary select-option"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePropertyTypeChange("تجارى");
                          }}
                          active={propertyType === "تجارى"}
                        >
                          تجارى
                        </Button>
                      </div>

                      {propertyType === "سكنى" && (
                        <div className="menu-option">
                          <h5 className="mt-3 mb-3">خيارات السكنى</h5>
                          {residentialOptions.map((option) => (
                            <Dropdown.Item
                              key={option}
                              onClick={() => handleSubCategoryChange(option)}
                              active={subCategory === option}
                            >
                              {option}
                            </Dropdown.Item>
                          ))}
                        </div>
                      )}

                      {propertyType === "تجارى" && (
                        <div className="menu-option">
                          <h5 className="mt-3 mb-3">خيارات التجارى</h5>
                          {commercialOptions.map((option) => (
                            <Dropdown.Item
                              key={option}
                              onClick={() => handleSubCategoryChange(option)}
                              active={subCategory === option}
                            >
                              {option}
                            </Dropdown.Item>
                          ))}
                        </div>
                      )}

                      {/* <div className="d-flex justify-content-between mt-3">
                            <Button variant="secondary" onClick={handleReset}>
                              إعادة ضبط
                            </Button>
                            <Button
                              className="me-2"
                              variant="primary"
                              onClick={handleDone}
                            >
                              تم
                            </Button>
                          </div> */}
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>

            <Col lg="2" md="3" xs={6} className="mb-2">
              <Form.Group className="inputSelectAdvanced">
                <Dropdown
                  show={showRoomsDropdown}
                  onToggle={(isOpen) => setShowRoomsDropdown(isOpen)}
                  align="end"
                >
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="الغرف | الحمامات"
                    onClick={() => setShowRoomsDropdown(!showRoomsDropdown)}
                    variant="light"
                  >
                    <div className="p-3 numRoomsAndBath">
                      <h5>عدد الغرف</h5>
                      <div className="d-flex align-items-center justify-content-center mb-3 flex-wrap">
                        {roomValues.map((room, idx) => (
                          <div key={idx} className="me-2">
                            <Form.Check
                              type="checkbox"
                              label={
                                room === "0"
                                  ? "استوديو"
                                  : room === "10"
                                  ? `+10`
                                  : room
                              }
                              checked={rooms.includes(room)}
                              onChange={() => handleRoomChange(room)}
                            />
                          </div>
                        ))}
                      </div>
                      <h5>عدد الحمامات</h5>
                      <div className="d-flex align-items-center justify-content-start">
                        {bathroomValues.map((bathroom, idx) => (
                          <div key={idx} className="me-2 roomAndBath">
                            <Form.Check
                              type="checkbox"
                              label={
                                bathroom === "6" ? `+${bathroom}` : bathroom
                              }
                              checked={bathrooms.includes(bathroom)}
                              onChange={() => handleBathRoomChange(bathroom)}
                            />
                          </div>
                        ))}
                      </div>
                      {/* <div className="d-flex justify-content-end mt-3">
                            <Button variant="primary" onClick={resetSelections}>
                              إعادة ضبط
                            </Button>
                          </div> */}
                    </div>
                  </DropdownButton>
                </Dropdown>
              </Form.Group>
            </Col>

            <Col lg="1" md="3" xs={6} className="mb-2">
              <Form.Group className="inputSelectAdvanced">
                <Dropdown
                  show={showPriceDropdown}
                  onToggle={(isOpen) => setShowPriceDropdown(isOpen)}
                  align="end"
                >
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="بحث متقدم"
                    onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                    variant="light"
                    // style={{ width: "300px" }}
                  >
                    <div className="p-3 menuValue w-200 style-menu-h5">
                      <h5>السعر ( ج.م )</h5>
                      <div className="d-flex align-items-center justify-content-between">
                        <Form.Group className="minAndMaxValue ms-3">
                          <Form.Label className="heading-value">
                            الحد الأدنى
                          </Form.Label>
                          <Form.Select
                            value={price.min}
                            onChange={(e) =>
                              setPrice({ ...price, min: e.target.value })
                            }
                          >
                            <option>100</option>
                            <option>200</option>
                            <option>300</option>
                            <option>400</option>
                            <option>500</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="minAndMaxValue me-3">
                          <Form.Label className="heading-value">
                            الحد الأعلى
                          </Form.Label>
                          <Form.Select
                            value={price.max}
                            onChange={(e) =>
                              setPrice({ ...price, max: e.target.value })
                            }
                          >
                            <option>1000</option>
                            <option>2000</option>
                            <option>2000</option>
                            <option>50000</option>
                            <option>100000</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                      <h5>المساحة ( متر مربع )</h5>
                      <div className="d-flex align-items-center justify-content-between">
                        <Form.Group className="minAndMaxValue ms-3">
                          <Form.Label className="heading-value">
                            أقل مساحة
                          </Form.Label>
                          <Form.Select
                            value={area.min}
                            onChange={(e) =>
                              setArea({ ...area, min: e.target.value })
                            }
                          >
                            <option>100</option>
                            <option>200</option>
                            <option>300</option>
                            <option>400</option>
                            <option>500</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="minAndMaxValue me-3">
                          <Form.Label className="heading-value">
                            أكبر مساحة
                          </Form.Label>
                          <Form.Select
                            value={area.max}
                            onChange={(e) =>
                              setArea({ ...area, max: e.target.value })
                            }
                          >
                            <option>1000</option>
                            <option>2000</option>
                            <option>3000</option>
                            <option>4000</option>
                            <option>5000</option>
                          </Form.Select>
                        </Form.Group>
                      </div>
                      {/* <div className="d-flex align-items-center justify-content-between">
                            <Button variant="secondary" onClick={handleReset}>
                              إعادة الضبط
                            </Button>
                          </div> */}
                    </div>
                  </DropdownButton>
                </Dropdown>
              </Form.Group>
            </Col>

            <Col>
              <div className="d-flex flex-row-reverse pr-3">
                <Button variant="secondary" onClick={handleReset}>
                  إعادة ضبط
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      <hr />
      <Container>
        <Row className="d-flex justify-content-between">
          <Col md={8} dir="rtl">
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 style={{ color: "#0d6efd" }}>عقارات سكنية للبيع في مَصر</h5>
              <Dropdown>
                <Dropdown.Toggle variant="primary">{sortBy}</Dropdown.Toggle>
                <Dropdown.Menu style={{ textAlign: "right" }}>
                  {searchFilter.map((option) => (
                    <Dropdown.Item
                      key={option}
                      onClick={() => handleFilterChange(option)}
                      active={sortBy === option}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
