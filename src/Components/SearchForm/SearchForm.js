import React, { useState } from "react";
import "./SearchForm.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import Search from "../Search/Search";

const SearchForm = ({ backgroundImage }) => {
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState("سكنى");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownArea, setShowDropdownArea] = useState(false);
  const [showDropdownPrice, setShowDropdownPrice] = useState(false);
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] =
    useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [address, setAddress] = useState({
    governorate: [],
    city: [],
    street: [],
    region: [],
  });

  const handleSubCategoryChange = (duration) => {
    setSubCategory(duration);
  };

  const roomValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const bathroomValues = ["1", "2", "3", "4", "5", "6"];
  const [selectedOption, setSelectedOption] = useState("");
  const [rooms, setRooms] = useState([]);
  const [bathrooms, setBathrooms] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "rent") {
      setShowDropdown(true);
    }
  };

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

  const resetSelections = () => {
    setRooms([]);
    setBathrooms([]);
  };
  const [price, setPrice] = useState({ min: "", max: "" });
  const [area, setArea] = useState({ min: "", max: "" });

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
  };

  const handleReset = () => {
    setSelectedOption("");
    setPropertyType("سكنى");
    setShowDropdown(false);
    setShowPropertyTypeDropdown(false);
  };

  const handleDone = () => {
    setShowDropdown(false);
    setShowPropertyTypeDropdown(false);
  };

  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const residentialOptions = [
    "شقة",
    "فيلا منفصلة",
    "دوبلكس",
    "بنتهاوس",
    "شاليه",
    "تاون هاوس",
    "توين هاوس",
    "أرض سكنية",
    "ستوديو",
  ];

  const commercialOptions = [
    "زراعية",
    "تجارية",
    "صناعية",
    "محل تجارى",
    "مكتب ادارى",
    "عيادة طبية",
    "معمل تحاليل",
    "صيدلية",
    "مطعم",
    "مخزن",
    "كافيه",
    "جراج",
  ];
  let gov;
  const handleSearch = () => {
    const currentParams = {
      selectedOption,
      subCategory,
      rooms: rooms.join(","),
      bathrooms: bathrooms.join(","),
      minPrice: price.min,
      maxPrice: price.max,
      minArea: area.min,
      maxArea: area.max,
    };
    let filterCurrentParams = Object.fromEntries(
      Object.entries(currentParams).filter(
        ([key, value]) =>
          value != null &&
          value !== "" &&
          !(Array.isArray(value) && value.length === 0)
      )
    );
    if (Array.isArray(address.governorate) && address.governorate.length > 0) {
      filterCurrentParams.governorate = address.governorate.join(",");
    }

    if (Array.isArray(address.city) && address.city.length > 0) {
      filterCurrentParams.city = address.city.join(",");
    }
    if (Array.isArray(address.street) && address.street.length > 0) {
      filterCurrentParams.street = address.street.join(",");
    }
    if (Array.isArray(address.region) && address.region.length > 0) {
      filterCurrentParams.region = address.region.join(",");
    }

    if (Array.isArray(address.governorate) && address.governorate.length > 0) {
      gov = address.governorate[0];
    }
    navigate({
      pathname: `/search/${gov ? gov : ""}`,
      search: queryString.stringify(filterCurrentParams),
    });
  };

  return (
    <div
      className="search-form-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="mb-4">اكتشف بيتك الجديد للبيع او الايجار</h1>
      <div className="search-form">
        <Form dir="rtl" className="w-100 homepageForm">
          <Row className="mb-3">
            <div className="d-flex justify-content-around align-items-center mb-3">
              <Form.Group className="w-100">
                <Dropdown
                  show={showDropdown}
                  onToggle={(isOpen) => setShowDropdown(isOpen)}
                >
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-75 custToggle"
                  >
                    {selectedOption === "rent"
                      ? "للايجار"
                      : selectedOption === "sale"
                      ? "للبيع"
                      : "بيع و ايجار"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className="dropdown-menu-right w-75"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3">
                      <h5 className="mb-3 type-ofer">نوع العرض</h5>
                      <div className="d-flex justify-content-around text-center">
                        <Dropdown.Item
                          key="1"
                          className="btn"
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
                          className="btn"
                          onClick={(e) => {
                            e.preventDefault();
                            handleOptionChange("rent");
                          }}
                          active={selectedOption === "rent"}
                        >
                          للايجار
                        </Dropdown.Item>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between mt-3">
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
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              <Form.Group className="w-100">
                <Dropdown
                  show={showPropertyTypeDropdown}
                  onToggle={(isOpen) => setShowPropertyTypeDropdown(isOpen)}
                  // align="end"
                >
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    onClick={() =>
                      setShowPropertyTypeDropdown(!showPropertyTypeDropdown)
                    }
                    // className="w-100"
                    className="w-75 custToggle"
                  >
                    {propertyType}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    // className="menu-sale"
                    className="dropdown-menu-right w-75"
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

                      <div className="d-flex justify-content-between mt-3">
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
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </div>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} xs={12}>
              {/* <Form.Control type="text" placeholder="أدخل الموقع " /> */}
              <Search setAddress={setAddress} />
              {/* <Search className="search" setSearchText={setSearchText} /> */}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {propertyType === "سكنى" && (
              <Form.Group as={Col} className="mb-3">
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
                                  ? `+${room}`
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
                      <div className="d-flex justify-content-end mt-3">
                        <Button variant="primary" onClick={resetSelections}>
                          إعادة ضبط
                        </Button>
                      </div>
                    </div>
                  </DropdownButton>
                </Dropdown>
              </Form.Group>
            )}

            <Form.Group as={Col} className="mb-3">
              <Dropdown
                show={showDropdownArea}
                onToggle={(isOpen) => setShowDropdownArea(isOpen)}
              >
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-custom-components"
                >
                  المساحة ( متر مربع)
                </Dropdown.Toggle>

                <Dropdown.Menu className="menuValue">
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <Form.Group className="minAndMaxValue ms-3">
                        <Form.Label className="heading-value">
                          الحد الأدنى متر مربع
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
                          {" "}
                          الحد الأعلى متر مربع
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

                    <div className="d-flex align-items-center justify-content-between">
                      <Button variant="secondary" onClick={() => {}}>
                        إعادة الضبط
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => setShowDropdownArea(false)}
                      >
                        تم
                      </Button>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Dropdown
                show={showDropdownPrice}
                onToggle={(isOpen) => setShowDropdownPrice(isOpen)}
              >
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-custom-components"
                >
                  السعر ( ج . م )
                </Dropdown.Toggle>
                <Dropdown.Menu className="menuValue">
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <Form.Group className="minAndMaxValue ms-3">
                        <Form.Label className="heading-value">
                          الحد الأدنى{" "}
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
                          {" "}
                          الحد الأعلى{" "}
                        </Form.Label>
                        <Form.Select
                          value={price.max}
                          onChange={(e) =>
                            setPrice({ ...price, max: e.target.value })
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

                    <div className="d-flex align-items-center justify-content-between">
                      <Button variant="secondary" onClick={() => {}}>
                        إعادة الضبط
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => setShowDropdownPrice(false)}
                      >
                        تم
                      </Button>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group as={Col}>
              <Button
                variant="primary"
                className="w-100 searchBtn"
                onClick={handleSearch}
              >
                ابحث
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SearchForm;
