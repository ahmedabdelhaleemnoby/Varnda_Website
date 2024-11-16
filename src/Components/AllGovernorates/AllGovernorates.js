import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import api from "../../API/ApiLink";
import { Link } from "react-router-dom";

export default function AllGovernorates() {
  const [allGov, setAllGov] = useState([]);
  useEffect(() => {
    const fetchAllGov = async () => {
      try {
        const response = await api.get("/getAllGovernoratesForHomepage");
        setAllGov(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllGov();
  }, []);

  return (
    <Container className="mb-3">
      <h3 style={{ color: "#495057" }} className="mb-3">
        تصفح المزيد من المدن و المناطق العقارية...
      </h3>
      {allGov.length > 0 && (
        <div
          style={{
            gap: "10px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {allGov.map(
            (gov) =>
              gov.url && (
                <Link to={`/${gov.url}`} key={gov.url}>
                  <Button variant="outline-primary" size="md">
                    {gov.name}
                  </Button>
                </Link>
              )
          )}
        </div>
      )}
    </Container>
  );
}
