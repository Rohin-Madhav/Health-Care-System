import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import {
  XCircle,
  Download,
  FileText,
  Calendar,
  User,
  Stethoscope,
  Pill,
  ClipboardList,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function GetMedicalRecord({ userId }) {
  const [medicalRecord, setMedicalRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async (id) => {
      try {
        setLoading(true);
        const res = await api.get(`/users/medicalRecord/${id}`);
        setMedicalRecord(res.data);
        console.log(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords(userId);
  }, [userId]);

  const handleDownloadPDF = () => {
    if (!medicalRecord || medicalRecord.length === 0) return;

    const doc = new jsPDF();

    doc.text("Medical Records Report", 14, 15);
    doc.text(`Patient: ${medicalRecord[0].patient.username}`, 14, 25);
    doc.text(`Total Records: ${medicalRecord.length}`, 14, 32);

    const tableData = medicalRecord.map((m) => [
      m.doctor.username,
      m.diagnosis,
      m.treatment,
      m.notes,
      new Date(m.date).toLocaleDateString(),
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["Doctor", "Diagnosis", "Treatment", "Notes", "Date"]],
      body: tableData,
      styles: { cellWidth: "wrap" },
      headStyles: { fillColor: [41, 128, 185] },
    });

    const fileName = medicalRecord[0].patient?.username || "unknown";
    doc.save(`MedicalRecord_${fileName}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-slate-600 font-medium">
            Loading medical records...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <p className="text-rose-600 text-center font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-3 rounded-lg">
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Medical Records
                </h1>
                {medicalRecord.length > 0 && (
                  <p className="text-slate-600 text-sm mt-1">
                    Patient:{" "}
                    <span className="font-semibold">
                      {medicalRecord[0].patient.username}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {medicalRecord.length > 0 && (
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            )}
          </div>

          {medicalRecord.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Total Records:{" "}
                <span className="font-semibold text-teal-600">
                  {medicalRecord.length}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Records Section */}
        {medicalRecord.length > 0 ? (
          <div className="space-y-4">
            {medicalRecord.map((m) => (
              <div
                key={m._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Patient Info */}
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        Patient
                      </p>
                      <p className="text-slate-800 font-semibold">
                        {m.patient.username}
                      </p>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Stethoscope className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        Doctor
                      </p>
                      <p className="text-slate-800 font-semibold">
                        {m.doctor.username}
                      </p>
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div className="flex items-start gap-3">
                    <div className="bg-rose-100 p-2 rounded-lg">
                      <ClipboardList className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        Diagnosis
                      </p>
                      <p className="text-slate-800">{m.diagnosis}</p>
                    </div>
                  </div>

                  {/* Treatment */}
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Pill className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        Treatment
                      </p>
                      <p className="text-slate-800">{m.treatment}</p>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                {m.notes && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                      Additional Notes
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg">
                      {m.notes}
                    </p>
                  </div>
                )}

                {/* Date */}
                {m.date && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(m.date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-600 text-lg font-medium">
                No medical records found
              </p>
              <p className="text-slate-500 text-sm mt-2">
                There are no records available for this patient.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default GetMedicalRecord;
