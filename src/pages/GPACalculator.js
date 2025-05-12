import React, { useState, useEffect } from 'react';
import { computeGPA } from '../utils/gradeUtils';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function GPACalculator() {
    const [rows, setRows] = useState(
        () => JSON.parse(localStorage.getItem('gpaRows')) || [{ credits: '', grade: '' }]
    );
    const { gpa, totalCredits } = computeGPA(rows);

    useEffect(() => {
        localStorage.setItem('gpaRows', JSON.stringify(rows));
    }, [rows]);

    const addRow = () => setRows([...rows, { credits: '', grade: '' }]);
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
        a.href = url; a.download = 'gpa.csv'; a.click();
    };

    const exportPDF = () => {
        html2canvas(document.getElementById('export-area')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save('gpa.pdf');
        });
    };

    return (
        <div id="export-area">
            <h3>GPA Calculator</h3>
            {rows.map((r, i) => (
                <div className="row mb-2" key={i}>
                    <div className="col">
                        <select
                            name="grade"
                            value={r.grade}
                            onChange={update(i)}
                            className="form-select"
                        >
                            <option value="">Grade</option>
                            {['S', 'A', 'B', 'C', 'D', 'E', 'F'].map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
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
                    <div className="col-auto">
                        <button className="btn btn-outline-danger" onClick={() => delRow(i)}>×</button>
                    </div>
                </div>
            ))}
            <button className="btn btn-outline-primary mb-3" onClick={addRow}>+ Course</button>

            <div className="mb-3">
                <strong>Total Credits:</strong> {totalCredits} &nbsp;|&nbsp;
                <strong>GPA:</strong> {gpa ?? '—'}
            </div>

            <button className="btn btn-secondary me-2" onClick={exportCSV}>Export CSV</button>
            <button className="btn btn-secondary" onClick={exportPDF}>Export PDF/PNG</button>
        </div>
    );
}
