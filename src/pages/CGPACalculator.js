import React, { useState, useEffect } from 'react';
import { computeCGPA } from '../utils/gradeUtils';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { OverlayTrigger, Tooltip, Form, Button } from 'react-bootstrap';

export default function CGPACalculator() {
    const defaultRows = [{ credits: '', gpa: '' }];
    const [rows, setRows] = useState(
        () => JSON.parse(localStorage.getItem('cgpaRows')) || defaultRows
    );
    const [manual, setManual] = useState(
        () => JSON.parse(localStorage.getItem('manualCalc')) || false
    );
    const [computed, setComputed] = useState({ cgpa: null, totalCredits: 0 });
    const [presetCount, setPresetCount] = useState(8);

    useEffect(() => {
        localStorage.setItem('cgpaRows', JSON.stringify(rows));
        localStorage.setItem('manualCalc', JSON.stringify(manual));
        if (!manual) calculate();
    }, [rows, manual]);

    const calculate = () => setComputed(computeCGPA(rows));
    const addRow = () => setRows([...rows, { credits: '', gpa: '' }]);
    const deleteRow = i => setRows(rows.filter((_, idx) => idx !== i));
    const reset = () => {
        setRows(defaultRows);
        setComputed({ cgpa: null, totalCredits: 0 });
    };
    const updateCell = i => e => {
        const newRows = rows.map((r, j) =>
            j === i ? { ...r, [e.target.name]: e.target.value } : r
        );
        setRows(newRows);
    };
    const setRowsCount = n => {
        setRows(Array.from({ length: n }, () => ({ credits: '', gpa: '' })));
    };

    const exportCSV = () => {
        const csv = Papa.unparse(rows);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'cgpa.csv'; a.click();
    };
    const exportPDF = () => {
        html2canvas(document.getElementById('export-area')).then(canvas => {
            const img = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(img, 'PNG', 10, 10, 190, 0);
            pdf.save('cgpa.pdf');
        });
    };

    return (
        <div id="export-area" className="px-2">
            <h3 className="text-center mb-4">CGPA Calculator</h3>

            {/* Quick-add */}
            <div className="text-center mb-3">
                <Form.Select
                    value={presetCount}
                    onChange={e => setPresetCount(+e.target.value)}
                    className="d-inline-block w-auto me-2"
                >
                    {[4, 6, 8, 10, 12].map(n => <option key={n} value={n}>{n} Semesters</option>)}
                </Form.Select>
                <Button variant="outline-primary" onClick={() => setRowsCount(presetCount)}>
                    Quick Add
                </Button>
            </div>

            {/* Manual toggle */}
            <div className="text-center mb-3">
                <div className="form-check form-switch d-inline-block">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="manualSwitchCGPA"
                        checked={manual}
                        onChange={() => setManual(m => !m)}
                    />
                    <label className="form-check-label" htmlFor="manualSwitchCGPA">
                        Manual Calculation Mode
                    </label>
                </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
                <div className="row mb-4 align-items-center" key={i}>
                    <div className="col-auto">
                        <span className="fw-bold">Semester {i + 1}</span>
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            name="credits"
                            value={row.credits}
                            onChange={updateCell(i)}
                            placeholder={`Credit ${i + 1}`}
                            className="form-control text-center"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            name="gpa"
                            value={row.gpa}
                            onChange={updateCell(i)}
                            placeholder={`GPA ${i + 1}`}
                            className="form-control text-center"
                        />
                    </div>
                    <div className="col-auto">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Delete this row</Tooltip>}>
                            <button className="btn btn-outline-danger" onClick={() => deleteRow(i)}>×</button>
                        </OverlayTrigger>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <div className="text-center mb-4">
                <button className="btn btn-outline-primary me-2" onClick={addRow}>+ Semester</button>
                {manual && <button className="btn btn-info me-2" onClick={calculate}>📊 Calculate</button>}
                <button className="btn btn-warning" onClick={reset}>♻ Reset</button>
            </div>

            {/* Result */}
            <div className="text-center mb-4">
                <div className="bg-primary text-white rounded p-3 d-inline-block" style={{ fontSize: '1.6rem' }}>
                    CGPA: {computed.cgpa ?? '—'} &nbsp;|&nbsp; Credits: {computed.totalCredits}
                </div>
            </div>

            {/* Export */}
            <div className="text-center mb-4">
                <OverlayTrigger placement="top" overlay={<Tooltip>Export as CSV</Tooltip>}>
                    <button className="btn btn-secondary me-2" onClick={exportCSV}>Export CSV</button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Export as PDF/PNG</Tooltip>}>
                    <button className="btn btn-secondary" onClick={exportPDF}>Export PDF/PNG</button>
                </OverlayTrigger>
            </div>
        </div>
    );
}
