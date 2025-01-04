import React, { useEffect, useState } from "react";
import { Container, Button, Tabs, Tab } from "react-bootstrap";
import api from "../../API/ApiLink";
import { Link } from "react-router-dom";

export default function AllGovernorates() {
  const [allGov, setAllGov] = useState([]);
  const [mockDetails, setMockDetails] = useState({});
  const [selectedGovUrl, setSelectedGovUrl] = useState(null);
  const [selectedTab, setSelectedTab] = useState("sale"); // Track selected tab (sale/rent)
  const [filteredGovs, setFilteredGovs] = useState([]); // Filtered governorates based on the selected tab
  const [openSection, setOpenSection] = useState({}); // Tracks open sections for each governorate

  useEffect(() => {
    const fetchAllGov = async () => {
      try {
        const response = await api.get("/getAllGovernoratesForHomepage");
        const data = response.data.data;

        setAllGov(data);

        // Build mockDetails dynamically for both sale and rent
        const details = {};
        data.forEach((gov) => {
          details[gov.url] = {
            sale: {
              "شقق": gov.sale.apartments.map((apartment) => ({
                name: apartment.filter_name,
                url: apartment.url,
              })),
              "فيلات": gov.sale.villas.map((apartment) => ({
                name: apartment.filter_name,
                url: apartment.url,
              })),
              "عقار تجاري": gov.sale.shops.map((apartment) => ({
                name: apartment.filter_name,
                url: apartment.url,
              })),
              "كمبوندات": gov.sale.compounds.map((apartment) => ({
                name: apartment.filter_name,
                url: apartment.url,
              })),
            },
            rent: {
              "شقق": gov.rent.apartments.map((apartment) => ({
                name: apartment.filter_name,
                url: apartment.url,
              })),
              "فيلات": gov.rent.villas.map((apartment) => ({
                name: apartment.filter_name,
                url: apartment.url,
              })),
              "عقار تجاري": gov.rent.shops.map((apartment) => ({
                name: apartment.filter_name,
                url: apartment.url,
              })),
              "كمبوندات": gov.rent.compounds.map((apartment) => ({
                name: apartment.filter_name,
                url: apartment.url,
              })),
            },
          };
        });
        setMockDetails(details);

        if (data.length > 0) {
          const firstGovUrl = data[0].url;
          setSelectedGovUrl(firstGovUrl);
          // Open all sections by default for the first governorate in "sale" tab
          setOpenSection({
            [firstGovUrl]: Object.keys(details[firstGovUrl]?.sale || {}),
          });
        }
      } catch (err) {
        console.error("Error fetching governorates:", err);
      }
    };
    fetchAllGov();
  }, []);

  // Filter governorates dynamically based on the selected tab
  useEffect(() => {
    const filtered = allGov.filter(
      (gov) =>
        gov[selectedTab].apartments.length > 0 ||
        gov[selectedTab].villas.length > 0 ||
        gov[selectedTab].shops.length > 0 ||
        gov[selectedTab].compounds.length > 0
    );
    setFilteredGovs(filtered);
  }, [allGov, selectedTab]);

  const handleSelect = (govUrl) => {
    setSelectedGovUrl((prev) => (prev === govUrl ? null : govUrl));
    setOpenSection((prev) => ({
      ...prev,
      [govUrl]: Object.keys(mockDetails[govUrl]?.[selectedTab] || {}),
    }));
  };

  const toggleSection = (govUrl, sectionName) => {
    setOpenSection((prev) => {
      const currentSections = prev[govUrl] || [];
      return {
        ...prev,
        [govUrl]: currentSections.includes(sectionName)
          ? currentSections.filter((section) => section !== sectionName) // Remove section if already open
          : [...currentSections, sectionName], // Add section if not open
      };
    });
  };

  const selectedDetails =
    selectedGovUrl && mockDetails[selectedGovUrl]?.[selectedTab];

  return (
    <Container style={{ minHeight: "60vh", marginBottom: "2rem" }}>
      <h3 style={{ color: "#495057", marginBottom: "1rem" }}>
        تصفح المزيد من المدن و المناطق العقارية...
      </h3>
      {/* Tabs for Sale and Rent */}
      <Tabs
        id="sale-rent-tabs"
        activeKey={selectedTab}
        onSelect={(tab) => {
          setSelectedTab(tab);
          if (selectedGovUrl) {
            setOpenSection((prev) => ({
              ...prev,
              [selectedGovUrl]: Object.keys(mockDetails[selectedGovUrl]?.[tab] || {}),
            }));
          }
        }}
        className="mb-3"
      >
        <Tab eventKey="sale" title="بيع"></Tab>
        <Tab eventKey="rent" title="إيجار"></Tab>
      </Tabs>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {/* Governorate Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
          }}
        >
          {filteredGovs.map((gov) => (
            <Button
              key={gov.url}
              variant={selectedGovUrl === gov.url ? "primary" : "outline-primary"}
              onClick={() => handleSelect(gov.url)}
              style={{ minWidth: "100px" }}
            >
              {gov.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Selected Governorate Details */}
      {selectedDetails ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            marginTop: "1rem",
            overflowX: "auto",
          }}
        >
          {Object.entries(selectedDetails).map(
            ([sectionName, items]) =>
              items.length > 0 && ( // Only render sections with items
                <div key={sectionName} style={{ minWidth: "250px" }}>
                  <h5
                    style={{
                      color: "#007bff",
                      marginBottom: "1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => toggleSection(selectedGovUrl, sectionName)}
                  >
                    {sectionName}
                    {/* Arrow */}
                    <span
                      style={{
                        display: "inline-block",
                        transform:
                          openSection[selectedGovUrl]?.includes(sectionName)
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      ▼
                    </span>
                  </h5>
                  {openSection[selectedGovUrl]?.includes(sectionName) && (
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {items.map((item, index) => (
                        <li key={index} style={{ marginBottom: "0.5rem" }}>
                          <Link
                            to={`/filter/${item.url}`}
                            style={{ textDecoration: "none", color: "#333" }}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
          )}
        </div>
      ) : (
        selectedGovUrl && (
          <div style={{ marginTop: "1rem" }}>
            <h5 style={{ color: "red" }}>لا توجد بيانات</h5>
            <Link to={`/${selectedGovUrl}`} style={{ textDecoration: "none", color: "#007bff" }}>
              الذهاب إلى المحافظة
            </Link>
          </div>
        )
      )}
    </Container>
  );
}
