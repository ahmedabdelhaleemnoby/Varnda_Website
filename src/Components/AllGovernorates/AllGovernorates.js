import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import api from "../../API/ApiLink";
import { Link } from "react-router-dom";

export default function AllGovernorates() {
  const [allGov, setAllGov] = useState([]);
  const [selectedGovUrl, setSelectedGovUrl] = useState(null);

  const mockDetails = {
    // e.g. "cairo" is the URL, then we have an array (or nested data) of sections
    cairo: {
      "Find apartments": [
        "Apartments for rent in Cairo",
        "Apartments for rent in Hay El Maadi",
        "Apartments for rent in Nasr City",
      ],
      "Find villas": [
        "Villas for rent in Cairo",
        "Villas for rent in Mokattam",
        "Villas for rent in Shorouk City",
      ],
      "Find Duplexes": [
        "Duplexes for rent in Cairo",
        "Duplexes for rent in Hay El Maadi",
        "Duplexes for rent in Shorouk City",
      ],
      "Advanced searches": [
        "Apartments for Rent in Cairo for 1500 L.E",
        "Unfurnished Apartments For Rent in Cairo",
        "Apartments for Rent in Cairo for 2000 L.E",
      ],
    },
    alexandria: {
      "Find apartments": [
        "Apartments for rent in Alexandria",
        "Apartments for rent in Alexandria",
        "Apartments for rent in Alexandria",
      ],
      "Find villas": [
        "Villas for rent in Alexandria",
        "Villas for rent in Alexandria",
        "Villas for rent in Alexandria",
      ],
      "Find Duplexes": [
        "Duplexes for rent in Alexandria",
        "Duplexes for rent in Alexandria",
        "Duplexes for rent in Alexandria",
      ],
      "Advanced searches": [
        "Apartments for Rent in Alexandria for 1500 L.E",
        "Unfurnished Apartments For Rent in Alexandria",
        "Apartments for Rent in Alexandria for 2000 L.E",
      ],
    },
    giza: {
      "Find apartments": [
        "Apartments for rent in Giza",
        "Apartments for rent in Giza",
        "Apartments for rent in Giza",
      ],
      "Find villas": [
        "Villas for rent in Giza",
        "Villas for rent in Giza",
        "Villas for rent in Giza",
      ],
      "Find Duplexes": [
        "Duplexes for rent in Giza",
        "Duplexes for rent in Giza",
        "Duplexes for rent in Giza",
      ],
      "Advanced searches": [
        "Apartments for Rent in Giza for 1500 L.E",
        "Unfurnished Apartments For Rent in Giza",
        "Apartments for Rent in Giza for 2000 L.E", 
      ],
    },
    aswan: {
      "Find apartments": [
        "Apartments for rent in Sharm El Sheikh",
        "Apartments for rent in Sharm El Sheikh",
        "Apartments for rent in Sharm El Sheikh",
      ],
      "Find villas": [
        "Villas for rent in Sharm El Sheikh",
        "Villas for rent in Sharm El Sheikh",
        "Villas for rent in Sharm El Sheikh",
      ],
      "Find Duplexes": [
        "Duplexes for rent in Sharm El Sheikh",
        "Duplexes for rent in Sharm El Sheikh",
        "Duplexes for rent in Sharm El Sheikh",
      ],
      "Advanced searches": [
        "Apartments for Rent in Sharm El Sheikh for 1500 L.E",
        "Unfurnished Apartments For Rent in Sharm El Sheikh",
        "Apartments for Rent in Sharm El Sheikh for 2000 L.E",
      ],
    },
    assiut: {
      "Find apartments": [
        "Apartments for rent in Asyut",
        "Apartments for rent in Asyut",
        "Apartments for rent in Asyut",
      ],
      "Find villas": [
        "Villas for rent in Asyut",
        "Villas for rent in Asyut",
        "Villas for rent in Asyut",
      ],
      "Find Duplexes": [
        "Duplexes for rent in Asyut",
        "Duplexes for rent in Asyut",
        "Duplexes for rent in Asyut",
      ],
      "Advanced searches": [
        "Apartments for Rent in Asyut for 1500 L.E",
        "Unfurnished Apartments For Rent in Asyut",
        "Apartments for Rent in Asyut for 2000 L.E",
      ],
    },
    luxor: {
      "Find apartments": [
        "Apartments for rent in Luxor",
        "Apartments for rent in Luxor",
        "Apartments for rent in Luxor",
      ],
      "Find villas": [
        "Villas for rent in Luxor",
        "Villas for rent in Luxor",
        "Villas for rent in Luxor",
      ],
      "Find Duplexes": [
        "Duplexes for rent in Luxor",
        "Duplexes for rent in Luxor",
        "Duplexes for rent in Luxor",
      ],
      "Advanced searches": [
        "Apartments for Rent in Luxor for 1500 L.E",
        "Unfurnished Apartments For Rent in Luxor",
        "Apartments for Rent in Luxor for 2000 L.E",
      ],
    },
    ismailia: {
      "Find apartments": [
        "Apartments for rent in Ismailia",
        "Apartments for rent in Ismailia",
        "Apartments for rent in Ismailia",
      ],
      "Find villas": [
        "Villas for rent in Ismailia",
        "Villas for rent in Ismailia",
        "Villas for rent in Ismailia",
      ],
      "Find Duplexes": [
        "Duplexes for rent in Ismailia",
        "Duplexes for rent in Ismailia",
        "Duplexes for rent in Ismailia",
      ],
      "Advanced searches": [
        "Apartments for Rent in Ismailia for 1500 L.E",
        "Unfurnished Apartments For Rent in Ismailia",
        "Apartments for Rent in Ismailia for 2000 L.E",
      ],
    },
    "red-sea": {
      "Find apartments": [
        "Apartments for rent in Red Sea",
        "Apartments for rent in Red Sea",
        "Apartments for rent in Red Sea",
      ],
      "Find villas": [
        "Villas for rent in Red Sea",
        "Villas for rent in Red Sea",
        "Villas for rent in Red Sea",
      ],
      "Find Duplexes": [
        "Duplexes for rent in Red Sea",
        "Duplexes for rent in Red Sea",
        "Duplexes for rent in Red Sea",
      ],
      "Advanced searches": [
        "Apartments for Rent in Red Sea for 1500 L.E",
        "Unfurnished Apartments For Rent in Red Sea",
        "Apartments for Rent in Red Sea for 2000 L.E",
      ],
    },
    beheira: {
      "Find apartments": [
        "Apartments for rent in Beheira",
        "Apartments for rent in Beheira",
        "Apartments for rent in Beheira",
      ],
      "Find villas": [
        "Villas for rent in Beheira",
        "Villas for rent in Beheira",
        "Villas for rent in Beheira",
      ],
      "Find Duplexes": [
        "Duplexes for rent in Beheira",
        "Duplexes for rent in Beheira",
        "Duplexes for rent in Beheira",
      ],
      "Advanced searches": [
        "Apartments for Rent in Beheira for 1500 L.E",
        "Unfurnished Apartments For Rent in Beheira",
        "Apartments for Rent in Beheira for 2000 L.E",
      ],
    },
  };

  useEffect(() => {
    const fetchAllGov = async () => {
      try {
        const response = await api.get("/getAllGovernoratesForHomepage");
        setAllGov(response.data.data);
      } catch (err) {
        console.error("Error fetching governorates:", err);
      }
    };
    fetchAllGov();
  }, []);

  const handleSelect = (govUrl) => {
    setSelectedGovUrl((prev) => (prev === govUrl ? null : govUrl));
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
              <h5 style={{ color: "#007bff", marginBottom: "1rem" }}>{sectionName}</h5>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {items.map((item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <Link
                      to={`/${selectedGovUrl}`}
                      style={{ textDecoration: "none", color: "#333" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
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
