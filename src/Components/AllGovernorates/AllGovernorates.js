import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import api from "../../API/ApiLink";
import { Link } from "react-router-dom";

export default function AllGovernorates() {
  const [allGov, setAllGov] = useState([]);
  const [mockDetails, setMockDetails] = useState({});
  const [selectedGovUrl, setSelectedGovUrl] = useState(null);
  const [openSection, setOpenSection] = useState({}); // Tracks open sections for each governorate

  useEffect(() => {
    const fetchAllGov = async () => {
      try {
        const response = await api.get("/getAllGovernoratesForHomepage");
        const data = response.data.data;
        setAllGov(data);

        // Build mockDetails dynamically
        const details = {};
        data.forEach((gov) => {
          details[gov.url] = {
            "Find apartments": gov.apartments.map((apartment) => ({
              name: apartment.filter_name,
              url: apartment.url,
            })),
            "Find villas": gov.villas.map((villa) => ({
              name: villa.filter_name,
              url: villa.url,
            })),
            "Find shops": gov.shops.map((shop) => ({
              name: shop.filter_name,
              url: shop.url,
            })),
            "Find compounds": gov.compounds.map((compound) => ({
              name: compound.filter_name,
              url: compound.url,
            })),
          };
        });
        setMockDetails(details);

        // Set the default selected governorate and open section
        if (data.length > 0) {
          const firstGovUrl = data[0].url;
          setSelectedGovUrl(firstGovUrl);
          setOpenSection({ [firstGovUrl]: "Find apartments" }); // Open "Find apartments" by default
        }
      } catch (err) {
        console.error("Error fetching governorates:", err);
      }
    };
    fetchAllGov();
  }, []);

  const handleSelect = (govUrl) => {
    setSelectedGovUrl((prev) => (prev === govUrl ? null : govUrl));
    setOpenSection({ [govUrl]: "Find apartments" }); // Default to "Find apartments" when selecting a new governorate
  };

  const toggleSection = (govUrl, sectionName) => {
    setOpenSection((prev) => ({
      ...prev,
      [govUrl]: prev[govUrl] === sectionName ? null : sectionName,
    }));
  };

  const selectedDetails = selectedGovUrl && mockDetails[selectedGovUrl];

  return (
    <Container style={{ minHeight: "60vh", marginBottom: "2rem" }}>
      <h3 style={{ color: "#495057", marginBottom: "1rem" }}>
        تصفح المزيد من المدن و المناطق العقارية...
      </h3>
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
          {allGov.map((gov) => (
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
          {Object.entries(selectedDetails).map(([sectionName, items]) => (
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
                    transform: openSection[selectedGovUrl] === sectionName ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  ▼
                </span>
              </h5>
              {openSection[selectedGovUrl] === sectionName && (
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: "0.5rem" }}>
                      <Link
                        to={`/${item.url}`}
                        style={{ textDecoration: "none", color: "#333" }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
