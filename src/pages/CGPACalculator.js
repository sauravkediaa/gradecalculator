import React, { useState, useEffect } from 'react';
import { computeCGPA } from '../utils/gradeUtils';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function CGPACalculator() {
    const [rows, setRows] = useState(
        () => JSON.parse(localStorage.getItem('cgpaRows')) || [{ credits: '', gpa: '' }]
    );
    const { cgpa, totalCredits } = computeCGPA(rows);

    useEffect(() => {
        localStorage.setItem('cgpaRows', JSON.stringify(rows));
    }, [rows]);

    const addRow = () => setRows([...rows, { credits: '', gpa: '' }]);
    const delRow = i => setRows(rows.filter((_, j) => j !== i));
    const update = i => e => {
        const copy = [...rows];
        copy[i][e.target.name] = e.target.value;
        setRows(copy);
    };

    const exportCSV = () => {
        const csv = Papa.unparse(rows);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'cgpa.csv'; a.click();
    };

    const exportPDF = () => {
        html2canvas(document.getElementById('export-area')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save('cgpa.pdf');
        });
    };

    return (
        <div id="export-area">
            <h3>CGPA Calculator</h3>
            {rows.map((r, i) => (
                <div className="row mb-2" key={i}>
                    <div className="col">
                        <input
                            type="number"
                            name="credits"
                            value={r.credits}
                            onChange={update(i)}
                            placeholder="Credits"
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            name="gpa"
                            value={r.gpa}
                            onChange={update(i)}
                            placeholder="GPA"
                            className="form-control"
                        />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-outline-danger" onClick={() => delRow(i)}>×</button>
                    </div>
                </div>
            ))}
            <button className="btn btn-outline-primary mb-3" onClick={addRow}>+ Semester</button>

            <div className="mb-3">
                <strong>Total Credits:</strong> {totalCredits} &nbsp;|&nbsp;
                <strong>CGPA:</strong> {cgpa ?? '—'}
            </div>

            <button className="btn btn-secondary me-2" onClick={exportCSV}>Export CSV</button>
            <button className="btn btn-secondary" onClick={exportPDF}>Export PDF/PNG</button>
        </div>
    );
}
