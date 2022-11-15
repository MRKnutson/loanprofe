import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../api/api";
import PaginatedTable from "../components/PaginatedTable";
import { AuthContext } from "../providers/AuthProvider";

const Records = () => {
  const [records, setRecords] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getUserRecords();
  }, []);

  const getUserRecords = async () => {
    try {
      let token = localStorage.getItem("token");
      let response = await api.get(`/${auth.ID}/records`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(response.data);
    } catch (err) {
      alert("error obtaining records");
    }
  };

  const filterRecords = (id) => {
    return records.filter((record) => {
      return record.ID !== id;
    });
  };

  const deleteRecord = async (record) => {
    try {
      let token = localStorage.getItem("token");
      let response = await api.delete(`/${auth.ID}/records/${record.ID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setRecords(filterRecords(record.ID));
    } catch (err) {
      alert("Unable to delete record at this time");
    }
  };

  return (
    <Container style={{ marginTop: "1rem" }}>
      {records && (
        <PaginatedTable records={records} deleteRecord={deleteRecord} />
      )}
      {!records && <p>No Records to Show</p>}
    </Container>
  );
};

export default Records;
