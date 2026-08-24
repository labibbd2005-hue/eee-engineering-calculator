/* =========================================================
   EEE ENGINEERING CALCULATOR
   JavaScript Calculations
   ========================================================= */


/* ---------------------------------------------------------
   Utility Functions
   --------------------------------------------------------- */

function getValue(id) {
    return parseFloat(document.getElementById(id).value);
}


function showResult(id, message) {
    document.getElementById(id).textContent = message;
}


function isInvalid(...values) {
    return values.some(value => Number.isNaN(value));
}


/* ---------------------------------------------------------
   Ohm's Law
   --------------------------------------------------------- */

function calculateOhm() {

    const mode = document.getElementById("ohmMode").value;

    const V = getValue("ohmV");
    const I = getValue("ohmI");
    const R = getValue("ohmR");

    let result;

    if (mode === "voltage") {

        if (isInvalid(I, R)) {
            showResult("ohmResult", "Enter current and resistance.");
            return;
        }

        result = I * R;

        showResult(
            "ohmResult",
            `Voltage = ${result.toFixed(4)} V`
        );

    }

    else if (mode === "current") {

        if (isInvalid(V, R) || R === 0) {
            showResult(
                "ohmResult",
                "Enter valid voltage and resistance."
            );
            return;
        }

        result = V / R;

        showResult(
            "ohmResult",
            `Current = ${result.toFixed(4)} A`
        );

    }

    else if (mode === "resistance") {

        if (isInvalid(V, I) || I === 0) {
            showResult(
                "ohmResult",
                "Enter valid voltage and current."
            );
            return;
        }

        result = V / I;

        showResult(
            "ohmResult",
            `Resistance = ${result.toFixed(4)} Ω`
        );
    }
}


/* ---------------------------------------------------------
   Electrical Power
   --------------------------------------------------------- */

function calculatePower() {

    const V = getValue("powerV");
    const I = getValue("powerI");

    if (isInvalid(V, I)) {
        showResult(
            "powerResult",
            "Enter voltage and current."
        );
        return;
    }

    const power = V * I;

    showResult(
        "powerResult",
        `Power = ${power.toFixed(4)} W`
    );
}


/* ---------------------------------------------------------
   Series Resistors
   --------------------------------------------------------- */

function calculateSeries() {

    const input =
        document.getElementById("seriesResistors").value;

    const values = input
        .split(",")
        .map(Number);

    if (
        values.length === 0 ||
        values.some(value => Number.isNaN(value))
    ) {
        showResult(
            "seriesResult",
            "Enter resistor values separated by commas."
        );
        return;
    }

    const total = values.reduce(
        (sum, value) => sum + value,
        0
    );

    showResult(
        "seriesResult",
        `Equivalent Resistance = ${total.toFixed(4)} Ω`
    );
}


/* ---------------------------------------------------------
   Parallel Resistors
   --------------------------------------------------------- */

function calculateParallel() {

    const input =
        document.getElementById("parallelResistors").value;

    const values = input
        .split(",")
        .map(Number);

    if (
        values.length === 0 ||
        values.some(value => Number.isNaN(value)) ||
        values.some(value => value <= 0)
    ) {
        showResult(
            "parallelResult",
            "Enter positive resistor values."
        );
        return;
    }

    const reciprocal = values.reduce(
        (sum, value) => sum + (1 / value),
        0
    );

    const equivalent = 1 / reciprocal;

    showResult(
        "parallelResult",
        `Equivalent Resistance = ${equivalent.toFixed(4)} Ω`
    );
}


/* ---------------------------------------------------------
   Capacitor
   --------------------------------------------------------- */

function calculateCapacitor() {

    const mode =
        document.getElementById("capMode").value;

    const f = getValue("capFrequency");
    const C = getValue("capCapacitance");
    const V = getValue("capVoltage");

    if (mode === "reactance") {

        if (
            isInvalid(f, C) ||
            f <= 0 ||
            C <= 0
        ) {
            showResult(
                "capResult",
                "Enter valid frequency and capacitance."
            );
            return;
        }

        const Xc =
            1 / (2 * Math.PI * f * C);

        showResult(
            "capResult",
            `Capacitive Reactance = ${Xc.toFixed(4)} Ω`
        );
    }

    else {

        if (
            isInvalid(C, V) ||
            C < 0
        ) {
            showResult(
                "capResult",
                "Enter valid capacitance and voltage."
            );
            return;
        }

        const energy =
            0.5 * C * Math.pow(V, 2);

        showResult(
            "capResult",
            `Stored Energy = ${energy.toFixed(4)} J`
        );
    }
}


/* ---------------------------------------------------------
   Inductor
   --------------------------------------------------------- */

function calculateInductor() {

    const mode =
        document.getElementById("indMode").value;

    const f = getValue("indFrequency");
    const L = getValue("indInductance");
    const I = getValue("indCurrent");

    if (mode === "reactance") {

        if (
            isInvalid(f, L) ||
            f <= 0 ||
            L <= 0
        ) {
            showResult(
                "indResult",
                "Enter valid frequency and inductance."
            );
            return;
        }

        const Xl =
            2 * Math.PI * f * L;

        showResult(
            "indResult",
            `Inductive Reactance = ${Xl.toFixed(4)} Ω`
        );
    }

    else {

        if (
            isInvalid(L, I) ||
            L < 0
        ) {
            showResult(
                "indResult",
                "Enter valid inductance and current."
            );
            return;
        }

        const energy =
            0.5 * L * Math.pow(I, 2);

        showResult(
            "indResult",
            `Stored Energy = ${energy.toFixed(4)} J`
        );
    }
}


/* ---------------------------------------------------------
   AC Impedance
   --------------------------------------------------------- */

function calculateImpedance() {

    const R = getValue("impResistance");
    const X = getValue("impReactance");

    if (isInvalid(R, X)) {
        showResult(
            "impResult",
            "Enter resistance and reactance."
        );
        return;
    }

    const magnitude =
        Math.sqrt(
            Math.pow(R, 2) +
            Math.pow(X, 2)
        );

    const phase =
        Math.atan2(X, R) * 180 / Math.PI;

    showResult(
        "impResult",
        `|Z| = ${magnitude.toFixed(4)} Ω | Phase = ${phase.toFixed(4)}°`
    );
}


/* ---------------------------------------------------------
   Power Factor
   --------------------------------------------------------- */

function calculatePowerFactor() {

    const P = getValue("realPower");
    const S = getValue("apparentPower");

    if (
        isInvalid(P, S) ||
        S <= 0
    ) {
        showResult(
            "pfResult",
            "Enter valid power values."
        );
        return;
    }

    const pf = P / S;

    showResult(
        "pfResult",
        `Power Factor = ${pf.toFixed(4)}`
    );
}


/* ---------------------------------------------------------
   Ideal Transformer
   --------------------------------------------------------- */

function calculateTransformer() {

    const Vp = getValue("primaryVoltage");
    const Np = getValue("primaryTurns");
    const Ns = getValue("secondaryTurns");

    if (
        isInvalid(Vp, Np, Ns) ||
        Np <= 0
    ) {
        showResult(
            "transformerResult",
            "Enter valid transformer values."
        );
        return;
    }

    const Vs =
        Vp * (Ns / Np);

    const ratio =
        Ns / Np;

    showResult(
        "transformerResult",
        `Secondary Voltage = ${Vs.toFixed(4)} V | Turns Ratio = ${ratio.toFixed(4)}`
    );
}


/* ---------------------------------------------------------
   Frequency & Wavelength
   --------------------------------------------------------- */

function calculateWavelength() {

    const f = getValue("waveFrequency");

    if (
        isInvalid(f) ||
        f <= 0
    ) {
        showResult(
            "waveResult",
            "Enter a valid frequency."
        );
        return;
    }

    const speedOfLight = 299792458;

    const wavelength =
        speedOfLight / f;

    showResult(
        "waveResult",
        `Wavelength = ${wavelength.toFixed(6)} m`
    );
}


/* ---------------------------------------------------------
   Decibels
   --------------------------------------------------------- */

function calculateDB() {

    const mode =
        document.getElementById("dbMode").value;

    const input = getValue("dbInput");
    const output = getValue("dbOutput");

    if (
        isInvalid(input, output) ||
        input <= 0 ||
        output <= 0
    ) {
        showResult(
            "dbResult",
            "Enter positive input and output values."
        );
        return;
    }

    let db;

    if (mode === "power") {

        db =
            10 * Math.log10(output / input);

    } else {

        db =
            20 * Math.log10(output / input);
    }

    showResult(
        "dbResult",
        `Gain/Loss = ${db.toFixed(4)} dB`
    );
}
