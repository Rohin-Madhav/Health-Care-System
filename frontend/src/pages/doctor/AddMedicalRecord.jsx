import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/Api";

function AddMedicalRecord() {
  const [patient, setPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [doctors, setDoctors] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    useEffect(async () => {
      try {
        const res = await api.post("/users/medicalRecord", {
          patient,
          diagnosis,
          treatment,
          date,
          notes,
          doctors,
        });
        setPatient("");
        setDiagnosis("");
        setDoctors("");
        setTreatment("");
        setDate("");
        setNotes("");
      } catch (error) {
        alert("Error adding medical record:", error);
      }
    }, []);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patient}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Doctor Name"
          value={doctors}
          onChange={(e) => setDoctors(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />
        <input
          type="text"
          placeholder="Treatment"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />

        <textarea
          placeholder="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button type="submit">Add Record</button>
      </form>
    </div>
  );
}

export default AddMedicalRecord;
