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
            "شقق": gov.apartments.map((apartment) => ({
              name: apartment.filter_name,
              url: apartment.url,
            })),
            "فيلات": gov.villas.map((villa) => ({
              name: villa.filter_name,
              url: villa.url,
            })),
            "عقار تجاري": gov.shops.map((shop) => ({
              name: shop.filter_name,
              url: shop.url,
            })),
            "كمبوندات": gov.compounds.map((compound) => ({
              name: compound.filter_name,
              url: compound.url,
            })),
          };
        });
        setMockDetails(details);

        if (data.length > 0) {
          const firstGovUrl = data[0].url;
          setSelectedGovUrl(firstGovUrl);
          // Open all sections by default for the first governorate
          setOpenSection({
            [firstGovUrl]: Object.keys(details[firstGovUrl]),
          });
        }
      } catch (err) {
        console.error("Error fetching governorates:", err);
      }
    };
    fetchAllGov();
  }, []);

  const handleSelect = (govUrl) => {
    setSelectedGovUrl((prev) => (prev === govUrl ? null : govUrl));
    setOpenSection((prev) => ({
      ...prev,
      [govUrl]: Object.keys(mockDetails[govUrl] || {}), // Open all sections for the selected governorate
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
