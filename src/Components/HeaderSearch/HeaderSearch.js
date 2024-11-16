import React, { useState } from "react";
import "./HeaderSearch.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Navbar} from 'react-bootstrap';
export default function HeaderSearch() {
  const [selectedOption, setSelectedOption] = useState("sale");
  const [rentalDuration, setRentalDuration] = useState("");
  const [propertyType, setPropertyType] = useState("سكنى");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownPrice, setShowDropdownPrice] = useState(false);
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] =
    useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "للايجار") {
      setShowDropdown(true);
    }
  };

  const handleDurationChange = (duration) => {
    setRentalDuration(duration);
  };

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
  };

  const handleReset = () => {
    setSelectedOption("للبيع");
    setRentalDuration("");
    setPropertyType("سكنى");
    setShowDropdown(false);
    setShowPropertyTypeDropdown(false);
  };

  const handleDone = () => {
    setShowDropdown(false);
    setShowPropertyTypeDropdown(false);
  };

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedBathRooms, setSelectedBathRooms] = useState([]);
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);

  const handleRoomChange = (room) => {
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.includes(room)
        ? prevSelectedRooms.filter((item) => item !== room)
        : [...prevSelectedRooms, room]
    );
  };

  const handleBathRoomChange = (bathroom) => {
    setSelectedBathRooms((prevSelectedBathRooms) =>
      prevSelectedBathRooms.includes(bathroom)
        ? prevSelectedBathRooms.filter((item) => item !== bathroom)
        : [...prevSelectedBathRooms, bathroom]
    );
  };

  const [showDropdownSpeed, setShowDropdownSpeed] = useState(false);
  const [selectedTime, setSelectedTime] = useState("30 دقيقة");

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };
  const resetSelection = () => {
    setSelectedTime("30 دقيقة");
  };

  return (
    <>
<Navbar bg="light" expand="lg">
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
      <Form dir="rtl" className="w-100">
        <Row className="mb-3 d-flex align-items-center justify-content-start formInfo">
          
          <Form.Group className="inputSelect">
            <Dropdown
              show={showDropdown}
              onToggle={(isOpen) => setShowDropdown(isOpen)}
            >
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {selectedOption}
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="dropdown-menu-right menu-sale"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-3">
                  <h5 className="mb-3 type-ofer">نوع العرض</h5>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-primary select-option"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOptionChange("للبيع");
                      }}
                      active={selectedOption === "للبيع"}
                    >
                      للبيع
                    </button>
                    <button
                      className="btn btn-primary select-option"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOptionChange("للايجار");
                      }}
                      active={selectedOption === "للايجار"}
                    >
                      للايجار
                    </button>
                  </div>

                  {selectedOption === "للايجار" && (
                    <div className="menu-option">
                      <h5 className="mt-3 mb-3">مدة الايجار</h5>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("يومياً")}
                        active={rentalDuration === "يومياً"}
                      >
                        يومياً
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("أسبوعياً")}
                        active={rentalDuration === "أسبوعياً"}
                      >
                        أسبوعياً
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("شهرياً")}
                        active={rentalDuration === "شهرياً"}
                      >
                        شهرياً
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("سنويًا")}
                        active={rentalDuration === "سنويًا"}
                      >
                        سنويًا
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("الجميع")}
                        active={rentalDuration === "الجميع"}
                      >
                        الجميع
                      </Dropdown.Item>
                    </div>
                  )}

                  {selectedOption === "للبيع" && (
                    <div className="menu-option">
                      <h5 className="mt-3 mb-3"> حالة العقار</h5>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("جاهز")}
                        active={rentalDuration === "جاهز"}
                      >
                        جاهز
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("قيد الانشاء")}
                        active={rentalDuration === "قيد الانشاء"}
                      >
                        قيد الانشاء
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("الجميع")}
                        active={rentalDuration === "الجميع"}
                      >
                        الجميع
                      </Dropdown.Item>
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

          <Form.Group className="inputLocation">
            <Form.Control
              type="text"
              placeholder="أدخل الموقع الاول المفضل لديك"
            />
          </Form.Group>

          <Form.Group className="inputLocation">
            <Form.Control
              type="text"
              placeholder="أدخل الموقع الثانى المفضل لديك"
            />
          </Form.Group>

          <Form.Group className="inputSelect">
            <Dropdown
              show={showPropertyTypeDropdown}
              onToggle={(isOpen) => setShowPropertyTypeDropdown(isOpen)}
            >
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                onClick={() =>
                  setShowPropertyTypeDropdown(!showPropertyTypeDropdown)
                }
              >
                {propertyType}
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="dropdown-menu-right menu-sale"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-3">
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-primary select-option"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePropertyTypeChange("سكنى");
                      }}
                      active={propertyType === "سكنى"}
                    >
                      سكنى
                    </button>
                    <button
                      className="btn btn-primary select-option"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePropertyTypeChange("تجارى");
                      }}
                      active={propertyType === "تجارى"}
                    >
                      تجارى
                    </button>
                  </div>

                  {propertyType === "سكنى" && (
                    <div className="menu-option">
                      <h5 className="mt-3 mb-3">خيارات السكنى</h5>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("خيارات 1")}
                        active={rentalDuration === "خيارات 1"}
                      >
                        خيارات 1
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("خيارات 2")}
                        active={rentalDuration === "خيارات 2"}
                      >
                        خيارات 2
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("خيارات 3")}
                        active={rentalDuration === "خيارات 3"}
                      >
                        خيارات 3
                      </Dropdown.Item>
                    </div>
                  )}

                  {propertyType === "تجارى" && (
                    <div className="menu-option">
                      <h5 className="mt-3 mb-3">خيارات التجارى</h5>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("خيارات أ")}
                        active={rentalDuration === "خيارات أ"}
                      >
                        خيارات أ
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("خيارات ب")}
                        active={rentalDuration === "خيارات ب"}
                      >
                        خيارات ب
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDurationChange("خيارات ج")}
                        active={rentalDuration === "خيارات ج"}
                      >
                        خيارات ج
                      </Dropdown.Item>
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

          <Form.Group className="inputSelect">
            <Dropdown
              show={showDropdownPrice}
              onToggle={(isOpen) => setShowDropdownPrice(isOpen)}
            >
              <Dropdown.Toggle variant="light" id="dropdown-custom-components">
                السعر ( ج . م )
              </Dropdown.Toggle>

              <Dropdown.Menu className="menuValue">
                <div className="p-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <Form.Group className="minAndMaxValue ms-3">
                      <Form.Label className="heading-value">
                        الحد الأدنى{" "}
                      </Form.Label>
                      <Form.Select>
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
                      <Form.Select>
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

          <Form.Group className="inputSelect">
      <Dropdown show={showDropdownSpeed} onToggle={(isOpen) => setShowDropdownSpeed(isOpen)}>
        <Dropdown.Toggle variant="primary" id="dropdown-custom-components">
          اختر وقت القيادة
        </Dropdown.Toggle>

        <Dropdown.Menu className="style-text p-3">
          <h5>أقصى وقت للقيادة</h5>
          <p>يتم حساب وقت القيادة المقدر بناءً على ظروف القيادة خارج أوقات الذروة أثناء استخدام سيارة شخصية.</p>
          <ul className="list-unstyled list-btn">
            <li onClick={() => handleSelectTime("15 دقيقة")} className={selectedTime === "15 دقيقة" ? "selected" : ""}>
              15
            </li>
            <li onClick={() => handleSelectTime("30 دقيقة")} className={selectedTime === "30 دقيقة" ? "selected" : ""}>
              30
            </li>
            <li onClick={() => handleSelectTime("45 دقيقة")} className={selectedTime === "45 دقيقة" ? "selected" : ""}>
              45
            </li>
            <li onClick={() => handleSelectTime("60 دقيقة")} className={selectedTime === "60 دقيقة" ? "selected" : ""}>
              60
            </li>
          </ul>

          <div className="d-flex align-items-center justify-content-between">
            <Button variant="secondary" className="w-50" onClick={resetSelection}>
              إعادة الضبط
            </Button>
            <Button variant="primary" className="w-25" onClick={() => setShowDropdownSpeed(false)}>
              تم
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>

          <Form.Group className="inputSelect">
            <Dropdown
              show={showRoomsDropdown}
              onToggle={(isOpen) => setShowRoomsDropdown(isOpen)}
            >
              
              <DropdownButton
                id="dropdown-basic-button"
                // title={getDropdownTitle()}
                title="بحث متقدم"
                onClick={() => setShowRoomsDropdown(!showRoomsDropdown)}
                variant="light"
              >
                <div className="p-3 numRoomsAndBath">

                  
                  <h5>عدد الغرف</h5>
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    {["استوديو", "1", "2", "3", "4", "+5"].map((room, idx) => (
                      <div key={idx} className="me-2 roomAndBath">
                        <Form.Check
                          type="checkbox"
                          label={room}
                          checked={selectedRooms.includes(room)}
                          onChange={() => handleRoomChange(room)}
                        />
                      </div>
                    ))}
                  </div>
                  <h5>عدد الحمامات</h5>
                  <div className="d-flex align-items-center justify-content-start">
                    {["1", "2", "+3"].map((bathroom, idx) => (
                      <div key={idx} className="me-2 roomAndBath">
                        <Form.Check
                          type="checkbox"
                          label={bathroom}
                          checked={selectedBathRooms.includes(bathroom)}
                          onChange={() => handleBathRoomChange(bathroom)}
                        />
                      </div>
                    ))}
                  </div>
               <h4 className="headAreaSearch mt-3">المساحة ( متر مربع )</h4>
                </div>

                <div className="p-3 menuValue w-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <Form.Group className="minAndMaxValue ms-3">
                      <Form.Label className="heading-value">
                        الحد الأدنى{" "}
                      </Form.Label>
                      <Form.Select>
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
                      <Form.Select>
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
                      onClick={ () => {}}
                    >
                      تم
                    </Button>
                  </div>
                </div>
              </DropdownButton>
            </Dropdown>
          </Form.Group>
        </Row>
      </Form>
      </Navbar.Collapse>
      </Navbar>
  
    </>
  );
}
