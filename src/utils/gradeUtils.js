// src/utils/gradeUtils.js
export function computeCGPA(entries) {
    let totalCredits = 0, sum = 0;
    entries.forEach(({ credits, gpa }) => {
        const c = parseFloat(credits), g = parseFloat(gpa);
        if (!isNaN(c) && !isNaN(g)) {
            totalCredits += c;
            sum += c * g;
        }
    });
    if (totalCredits === 0) return { cgpa: null, totalCredits: 0 };
    return {
        cgpa: Number((sum / totalCredits).toFixed(2)),
        totalCredits
    };
}

export function computeGPA(entries) {
    const map = { S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, F: 0 };
    let totalCredits = 0, sum = 0;
    entries.forEach(({ credits, grade }) => {
        const c = parseFloat(credits), p = map[grade];
        if (!isNaN(c) && p != null) {
            totalCredits += c;
            sum += c * p;
        }
    });
    if (totalCredits === 0) return { gpa: null, totalCredits: 0 };
    return {
        gpa: Number((sum / totalCredits).toFixed(2)),
        totalCredits
    };
}

export function convertScale(original, target, current) {
    const o = parseFloat(original), n = parseFloat(target), c = parseFloat(current);
    if ([o, n, c].some(x => isNaN(x) || o <= 0 || n <= 0 || c > o)) return { converted: null };
    const factor = o / n;
    return { converted: Number((c / factor).toFixed(2)) };
}

// NEW! Quick CGPA computation
export function computeQuickCGPA(oldCgpa, oldCredits, newCredits, newGpa) {
    const oc = parseFloat(oldCredits);
    const og = parseFloat(oldCgpa);
    const nc = parseFloat(newCredits);
    const ng = parseFloat(newGpa);

    // if any input is invalid, return zeros
    if ([oc, og, nc, ng].some(x => isNaN(x))) {
        return { newCgpa: null, totalCredits: null };
    }

    const totalQp = og * oc + ng * nc;
    const totalCr = oc + nc;
    return {
        totalCredits: totalCr,
        newCgpa: Number((totalQp / totalCr).toFixed(2))
    };
}