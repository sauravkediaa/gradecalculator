import React, { useState, useEffect } from 'react';
import { computeGPA } from '../utils/gradeUtils';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { OverlayTrigger, Tooltip, Form, Button } from 'react-bootstrap';

export default function GPACalculator() {
    const defaultRows = [{ credits: '', grade: '' }];
    const [rows, setRows] = useState(
        () => JSON.parse(localStorage.getItem('gpaRows')) || defaultRows
    );
    const [manual, setManual] = useState(
        () => JSON.parse(localStorage.getItem('manualCalcGPA')) || false
    );
    const [result, setResult] = useState({ gpa: null, totalCredits: 0 });
    const [presetCount, setPresetCount] = useState(8);

    useEffect(() => {
        localStorage.setItem('gpaRows', JSON.stringify(rows));
        localStorage.setItem('manualCalcGPA', JSON.stringify(manual));
        if (!manual) calculate();
    }, [rows, manual]);

    const calculate = () => setResult(computeGPA(rows));

    const addRow = () => setRows([...rows, { credits: '', grade: '' }]);
    const deleteRow = i => setRows(rows.filter((_, idx) => idx !== i));
    const reset = () => {
        setRows(defaultRows);
        setResult({ gpa: null, totalCredits: 0 });
    };
    const updateCell = i => e => {
        const newRows = rows.map((r, j) =>
            j === i ? { ...r, [e.target.name]: e.target.value } : r
        );
        setRows(newRows);
    };

    const exportCSV = () => {
        const csv = Papa.unparse(rows);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'gpa.csv'; a.click();
    };

    const exportPDF = () => {
        html2canvas(document.getElementById('export-area')).then(canvas => {
            const img = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(img, 'PNG', 10, 10, 190, 0);
            pdf.save('gpa.pdf');
        });
    };

    const setRowsCount = n => {
        const blank = Array.from({ length: n }, () => ({ credits: '', grade: '' }));
        setRows(blank);
    };

    return (
        <div id="export-area">
            <h3 className="text-center mb-4">GPA Calculator</h3>

            {/* Quick Rows */}
            <div className="text-center mb-3">
                <Form.Select
                    value={presetCount}
                    onChange={e => setPresetCount(+e.target.value)}
                    className="d-inline-block w-auto me-2"
                >
                    {[4, 6, 8, 10, 12].map(n => (
                        <option key={n} value={n}>{n} Courses</option>
                    ))}
                </Form.Select>
                <Button
                    variant="outline-primary"
                    onClick={() => setRowsCount(presetCount)}
                >
                    Quick Add
                </Button>
            </div>

            {/* Manual Toggle */}
            <div className="text-center mb-3">
                <div className="form-check form-switch d-inline-block">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="manualSwitchGPA"
                        checked={manual}
                        onChange={() => setManual(m => !m)}
                    />
                    <label className="form-check-label" htmlFor="manualSwitchGPA">
                        Manual Calculation Mode
                    </label>
                </div>
            </div>

            {/* Input Rows */}
            {rows.map((row, i) => (
                <div className="row mb-2" key={i}>
                    <div className="col">
                        <select
                            name="grade"
                            value={row.grade}
                            onChange={updateCell(i)}
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
                            value={row.credits}
                            onChange={updateCell(i)}
                            placeholder="Credits"
                            className="form-control"
                        />
                    </div>
                    <div className="col-auto">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Delete this row</Tooltip>}
                        >
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => deleteRow(i)}
                            >×</button>
                        </OverlayTrigger>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <div className="text-center mb-4">
                <button className="btn btn-outline-primary me-2" onClick={addRow}>
                    + Course
                </button>
                {manual && (
                    <button className="btn btn-info me-2" onClick={calculate}>
                        📊 Calculate
                    </button>
                )}
                <button className="btn btn-warning" onClick={reset}>
                    ♻ Reset
                </button>
            </div>

            {/* Result */}
            <div className="text-center mb-4">
                <div
                    className="bg-primary text-white rounded p-3 d-inline-block"
                    style={{ fontSize: '1.6rem' }}
                >
                    GPA: {result.gpa ?? '—'} &nbsp;|&nbsp; Credits: {result.totalCredits}
                </div>
            </div>

            {/* Export */}
            <div className="text-center">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Export as CSV</Tooltip>}
                >
                    <button className="btn btn-secondary me-2" onClick={exportCSV}>
                        Export CSV
                    </button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Export as PDF/PNG</Tooltip>}
                >
                    <button className="btn btn-secondary" onClick={exportPDF}>
                        Export PDF/PNG
                    </button>
                </OverlayTrigger>
            </div>
        </div>
    );
}
