// Estado de la aplicación
let data = {
    hr: null,
    rhythm: null,
    axis: null,
    st: null,
    qrs: [],
    t: [],
    qt_status: null,
    qt_measured: null,
    qtc: null,
    other: []
};

// Navegación
function goStep(n) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + n).classList.add('active');
    
    // Progress
    for (let i = 1; i <= 7; i++) {
        const p = document.getElementById('p' + i);
        if (i < n) p.className = 'progress-step completed';
        else if (i === n) p.className = 'progress-step active';
        else p.className = 'progress-step';
    }
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Selección
function select(name, value) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
        r.parentElement.classList.remove('selected');
        r.checked = false;
    });
    
    const selected = document.getElementById(value === 'sinusal' ? 'r1' : 
                                             value === 'fibrilacion' ? 'r2' :
                                             value === 'taquicardia_v' ? 'r3' :
                                             value === 'normal' && name === 'axis' ? 'a1' :
                                             value === 'izq' ? 'a2' :
                                             value === 'der' ? 'a3' :
                                             value === 'normal' && name === 'st' ? 'st1' :
                                             value === 'elev_ant' ? 'st2' :
                                             value === 'elev_inf' ? 'st3' :
                                             value === 'elev_lat' ? 'st4' :
                                             value === 'post' ? 'st5' :
                                             value === 'dep_dif' ? 'st6' :
                                             value === 'normal' && name === 'qt_status' ? 'qt1' :
                                             value === 'largo' ? 'qt2' : null);
    
    if (selected) {
        selected.checked = true;
        selected.parentElement.classList.add('selected');
        data[name] = value;
    }
}

// Toggle checkboxes
function toggle(id) {
    const cb = document.getElementById(id);
    const card = cb.parentElement;
    cb.checked = !cb.checked;
    cb.checked ? card.classList.add('selected') : card.classList.remove('selected');
}

// Calcular QTc
function calcQTc() {
    const qt = parseFloat(document.getElementById('qt').value);
    const hr = parseFloat(document.getElementById('hr').value);
    
    if (qt && hr) {
        const rr = 60 / hr;
        const qtc = qt / Math.sqrt(rr);
        data.qt_measured = qt;
        data.qtc = qtc;
        
        document.getElementById('qtc_result').style.display = 'block';
        document.getElementById('qtc_val').textContent = Math.round(qtc);
        
        let interp = '';
        if (qtc > 460) interp = '⚠️ <strong>Prolongado.</strong> Riesgo de Torsades. Revisar causas.';
        else if (qtc < 340) interp = '⚠️ <strong>Acortado.</strong> Considerar hipercalcemia.';
        else interp = '✅ <strong>Normal.</strong>';
        
        document.getElementById('qtc_interp').innerHTML = interp;
    }
}

// Generar diagnósticos
function showResults() {
    // Recopilar datos
    data.hr = document.getElementById('hr').value;
    
    data.qrs = [];
    if (document.getElementById('qrs_ancho')?.checked) data.qrs.push('qrs_ancho');
    if (document.getElementById('brdhh')?.checked) data.qrs.push('brdhh');
    if (document.getElementById('brihh')?.checked) data.qrs.push('brihh');
    if (document.getElementById('hvi')?.checked) data.qrs.push('hvi');
    if (document.getElementById('hvd')?.checked) data.qrs.push('hvd');
    if (document.getElementById('q_pat')?.checked) data.qrs.push('q_pat');
    
    data.t = [];
    if (document.getElementById('t_normal')?.checked) data.t.push('t_normal');
    if (document.getElementById('t_inv')?.checked) data.t.push('t_inv');
    if (document.getElementById('t_picuda')?.checked) data.t.push('t_picuda');
    
    data.other = [];
    if (document.getElementById('wpw')?.checked) data.other.push('wpw');
    if (document.getElementById('tep_s1q3t3')?.checked) data.other.push('tep');
    if (document.getElementById('brugada')?.checked) data.other.push('brugada');
    
    // Generar diagnósticos
    const dx = [];
    let urgency = 'low';
    
    // 1. IAMCEST - MÁXIMA PRIORIDAD
    if (data.st === 'elev_ant') {
        dx.push({
            t: '🚨 IAMCEST ANTERIOR',
            d: '<strong>EMERGENCIA CARDIOLÓGICA.</strong> Oclusión de descendente anterior. <strong>CÓDIGO INFARTO:</strong> Activar cateterismo urgente (&lt;90min). ASA 300mg, clopidogrel 600mg, anticoagulación. Monitorización UCI. Alto riesgo de shock y arritmias ventriculares.',
            u: 'high'
        });
        urgency = 'high';
    }
    
    if (data.st === 'elev_inf') {
        dx.push({
            t: '🚨 IAMCEST INFERIOR',
            d: '<strong>EMERGENCIA CARDIOLÓGICA.</strong> Oclusión de coronaria derecha o circunfleja. <strong>CÓDIGO INFARTO:</strong> Cateterismo urgente. <strong>CRÍTICO:</strong> Evaluar derivaciones derechas (V3R-V4R) para IAM VD. Si hay compromiso VD: EVITAR nitratos (hipotensión severa), líquidos IV agresivos.',
            u: 'high'
        });
        urgency = 'high';
    }
    
    if (data.st === 'elev_lat') {
        dx.push({
            t: '🚨 IAMCEST LATERAL',
            d: '<strong>EMERGENCIA CARDIOLÓGICA.</strong> Oclusión de circunfleja. <strong>CÓDIGO INFARTO:</strong> Reperfusión urgente. Puede ser oligosintomático.',
            u: 'high'
        });
        urgency = 'high';
    }
    
    if (data.st === 'post') {
        dx.push({
            t: '🚨 IAM POSTERIOR',
            d: '<strong>EMERGENCIA CARDIOLÓGICA.</strong> Cambios recíprocos en V1-V3 (depresión ST, R alta) indican IAM posterior. <strong>Confirmar:</strong> Colocar V7-V9 posteriores. Manejo como IAMCEST.',
            u: 'high'
        });
        urgency = 'high';
    }
    
    if (data.st === 'dep_dif') {
        dx.push({
            t: '⚠️ Síndrome Coronario Agudo sin Elevación del ST',
            d: 'Probable <strong>IAMSEST o Angina Inestable.</strong> Requiere: <strong>Ingreso hospitalario inmediato,</strong> monitorización continua, troponinas seriadas (0h, 3h, 6h), estratificación de riesgo (GRACE/TIMI). Antiagregación dual (ASA + clopidogrel/ticagrelor), anticoagulación (enoxaparina/fondaparinux). Cateterismo precoz si alto riesgo o troponinas elevadas.',
            u: 'high'
        });
        urgency = 'high';
    }
    
    // 2. TV
    if (data.rhythm === 'taquicardia_v') {
        dx.push({
            t: '🚨 TAQUICARDIA VENTRICULAR',
            d: '<strong>URGENCIA MÉDICA.</strong> Evaluar estabilidad hemodinámica INMEDIATAMENTE. <strong>Inestable:</strong> Cardioversión eléctrica sincronizada. <strong>Estable:</strong> Amiodarona 150mg IV en 10min. Buscar cardiopatía estructural. Riesgo de degeneración a FV.',
            u: 'high'
        });
        urgency = 'high';
    }
    
    // 3. Arritmias
    if (data.rhythm === 'fibrilacion') {
        dx.push({
            t: '🫀 Fibrilación Auricular',
            d: 'Arritmia supraventricular más frecuente. Pérdida de contracción auricular efectiva. <strong>Manejo:</strong> (1) Anticoagulación según CHA₂DS₂-VASc, (2) Control de frecuencia (beta-bloqueadores, diltiazem) o ritmo (cardioversión si <48h o tras anticoagulación), (3) Buscar causas: hipertiroidismo, valvulopatías, HTA, alcohol.',
            u: 'moderate'
        });
        if (urgency === 'low') urgency = 'moderate';
    }
    
    // 4. Bloqueos
    if (data.qrs.includes('brihh')) {
        dx.push({
            t: '⚡ Bloqueo Completo de Rama Izquierda (BRIHH)',
            d: 'Retraso en conducción por rama izquierda del His. <strong>IMPORTANTE:</strong> El BRIHH "enmascara" el diagnóstico de IAM. Si hay clínica sugestiva, usar <strong>Criterios de Sgarbossa</strong> (elevación ST concordante ≥1mm = 5 pts, depresión ST ≥1mm en V1-V3 = 3 pts, elevación ST discordante ≥5mm = 2 pts; ≥3 pts sugiere IAM). Buscar cardiopatía estructural subyacente. Puede requerir marcapasos si sintomático o con PR prolongado.',
            u: 'moderate'
        });
        if (urgency === 'low') urgency = 'moderate';
    }
    
    if (data.qrs.includes('brdhh')) {
        dx.push({
            t: '⚡ Bloqueo de Rama Derecha (BRDHH)',
            d: 'Patrón RSR\' en V1-V2. Puede ser variante normal o asociado a cardiopatía. <strong>Si es de nueva aparición:</strong> considerar TEP, IAM, miocarditis. No interfiere con diagnóstico de IAM.',
            u: 'low'
        });
    }
    
    // 5. Hipertrofias
    if (data.qrs.includes('hvi')) {
        dx.push({
            t: '💪 Hipertrofia Ventricular Izquierda (HVI)',
            d: 'Hipertrofia del VI por sobrecarga crónica de presión/volumen. <strong>Causas principales:</strong> HTA (más común), estenosis aórtica, miocardiopatía hipertrófica. <strong>Manejo:</strong> Control estricto de PA, ecocardiograma para evaluar función VI y grosor parietal. <strong>Riesgo:</strong> Arritmias, muerte súbita, insuficiencia cardíaca.',
            u: 'low'
        });
    }
    
    if (data.qrs.includes('hvd')) {
        dx.push({
            t: '💪 Hipertrofia Ventricular Derecha (HVD)',
            d: 'Hipertrofia del VD. <strong>Evaluar:</strong> Hipertensión pulmonar (primaria o secundaria a EPOC, apnea del sueño, valvulopatía izquierda), cardiopatías congénitas, TEP crónico. Ecocardiograma con estimación de presión sistólica pulmonar.',
            u: 'moderate'
        });
        if (urgency === 'low') urgency = 'moderate';
    }
    
    // 6. Q patológicas
    if (data.qrs.includes('q_pat')) {
        dx.push({
            t: '📉 Ondas Q Patológicas',
            d: 'Ondas Q anchas y profundas sugieren <strong>IAM antiguo transmural con necrosis cicatrizada.</strong> Correlacionar con historia clínica de evento coronario previo. Ecocardiograma para evaluar: acinesia/discinesia segmentaria, función VI global, aneurisma ventricular. Optimizar tratamiento post-IAM: beta-bloqueadores, IECA, estatinas, antiagregantes.',
            u: 'low'
        });
    }
    
    // 7. Onda T
    if (data.t.includes('t_inv')) {
        dx.push({
            t: '📊 Inversión de Onda T',
            d: 'T negativas profundas pueden indicar: (1) <strong>Isquemia miocárdica</strong> (aguda o crónica), (2) <strong>IAM en evolución</strong> (fase subaguda), (3) Miocardiopatía, (4) TEP, (5) Pericarditis. <strong>La localización ayuda:</strong> T invertidas profundas V1-V4 → isquemia anterior; T invertidas V1-V3 → TEP; T invertidas difusas → miocardiopatía. Correlacionar con troponinas y clínica.',
            u: 'low'
        });
    }
    
    if (data.t.includes('t_picuda')) {
        dx.push({
            t: '⚠️ Ondas T Picudas - HIPERPOTASEMIA',
            d: '<strong>URGENCIA:</strong> T altas, simétricas, estrechas sugieren hiperpotasemia. También puede ser IAM hiperagudo (primeras horas). <strong>ACCIÓN INMEDIATA:</strong> Solicitar K⁺ sérico urgente. <strong>Si K⁺ >6.5 mEq/L:</strong> (1) Gluconato de calcio 10% 10ml IV (cardioprotección), (2) Insulina regular 10U + dextrosa 50% 25ml IV, (3) Salbutamol nebulizado, (4) Resinas de intercambio, (5) Diálisis si refractario o K⁺ >7. <strong>Monitorización ECG continua</strong> (riesgo de asistolia).',
            u: 'moderate'
        });
        if (urgency === 'low') urgency = 'moderate';
    }
    
    // 8. QT
    if (data.qt_status === 'largo') {
        dx.push({
            t: '⏱️ Intervalo QT Prolongado',
            d: 'QTc prolongado aumenta riesgo de <strong>Torsades de Pointes</strong> (taquicardia ventricular polimórfica) y muerte súbita. <strong>Causas adquiridas:</strong> Fármacos (antiarrítmicos clase IA y III, antipsicóticos, macrólidos, antifúngicos, antieméticos), hipopotasemia, hipomagnesemia, hipocalcemia, bradicardia. <strong>Manejo:</strong> Suspender fármacos causales, corregir electrolitos (objetivo K⁺ >4, Mg²⁺ >2), Mg²⁺ IV profiláctico. <strong>Congénito:</strong> Historia familiar, beta-bloqueadores, considerar DAI.',
            u: 'moderate'
        });
        if (urgency === 'low') urgency = 'moderate';
    }
    
    // 9. WPW
    if (data.other.includes('wpw')) {
        dx.push({
            t: '⚡ Síndrome de Wolff-Parkinson-White (WPW)',
            d: 'Vía accesoria AV (haz de Kent) que conduce bypass del nodo AV. <strong>Riesgos:</strong> (1) Taquicardias por reentrada, (2) <strong>FA con conducción rápida por vía accesoria</strong> que puede degenerar en FV. <strong>Manejo:</strong> Referir a electrofisiología para estudio y ablación por radiofrecuencia (curativa) si sintomático o alto riesgo. <strong>EVITAR:</strong> Adenosina, digoxina, verapamilo, diltiazem en FA preexcitada (favorecen conducción por vía accesoria).',
            u: 'moderate'
        });
        if (urgency === 'low') urgency = 'moderate';
    }
    
    // 10. TEP
    if (data.other.includes('tep')) {
        dx.push({
            t: '🫁 Patrón Sugestivo de TEP (S1Q3T3)',
            d: '<strong>Tríada clásica:</strong> S en DI, Q en DIII, T invertida en DIII. Indica sobrecarga aguda de VD. Otros hallazgos ECG en TEP: BRDHH, taquicardia sinusal, inversión T en precordiales derechas (V1-V4). <strong>Correlacionar con clínica:</strong> Disnea súbita, dolor torácico pleurítico, taquipnea, factores de riesgo (inmovilización, cirugía, cáncer, trombofilia). <strong>Dx:</strong> Dímero D (si probabilidad baja-intermedia), angio-TC pulmonar (gold standard). <strong>Tratamiento:</strong> Anticoagulación inmediata (heparina/enoxaparina). Trombolisis si inestabilidad hemodinámica o disfunción VD severa.',
            u: 'high'
        });
        urgency = 'high';
    }
    
    // 11. Brugada
    if (data.other.includes('brugada')) {
        dx.push({
            t: '⚠️ Patrón de Brugada',
            d: '<strong>CANALOPATÍA DE ALTO RIESGO.</strong> Elevación ST "en silla de montar" en V1-V2 con BRDHH. Mutación en canales de Na⁺. <strong>Riesgo de arritmias ventriculares malignas y muerte súbita</strong> (especialmente durante sueño o fiebre). <strong>ACCIÓN:</strong> Referencia urgente a electrofisiología. <strong>Factores de alto riesgo:</strong> Historia de síncope, arritmias ventriculares documentadas, historia familiar de muerte súbita <45 años. <strong>Puede requerir DAI</strong> (cardiodesfibrilador implantable). Evitar fármacos que bloquean canales Na⁺.',
            u: 'high'
        });
        urgency = 'high';
    }
    
    // 12. Frecuencia
    const hr = parseFloat(data.hr);
    if (hr && hr < 50) {
        dx.push({
            t: '🐌 Bradicardia Severa',
            d: `FC: ${hr} lpm. <strong>Evaluar:</strong> Síntomas (mareo, síncope, fatiga), fármacos (beta-bloqueadores, digoxina, amiodarona), enfermedad del nodo sinusal, hipotiroidismo. <strong>Si sintomática:</strong> Atropina 0.5mg IV (puede repetir), marcapasos transcutáneo si no responde. Considerar marcapasos permanente si bradicardia sintomática sin causa reversible.`,
            u: 'moderate'
        });
        if (urgency === 'low') urgency = 'moderate';
    }
    
    if (hr && hr > 140 && data.rhythm === 'sinusal') {
        dx.push({
            t: '🏃 Taquicardia Sinusal Severa',
            d: `FC: ${hr} lpm. Taquicardia sinusal es <strong>respuesta fisiológica</strong>, no enfermedad primaria. <strong>Investigar causas:</strong> Dolor, ansiedad, fiebre, hipovolemia/deshidratación, anemia, TEP, sepsis, hipertiroidismo, insuficiencia cardíaca descompensada, shock. <strong>TRATAR LA CAUSA SUBYACENTE,</strong> no la taquicardia per se. Beta-bloqueadores solo si contraindicado por causa.`,
            u: 'moderate'
        });
        if (urgency === 'low') urgency = 'moderate';
    }
    
    // ECG normal
    if (dx.length === 0) {
        dx.push({
            t: '✅ Electrocardiograma Normal',
            d: 'No se identificaron alteraciones significativas. Ritmo sinusal, frecuencia normal, ejes dentro de límites, intervalos normales, sin evidencia de isquemia, hipertrofias, bloqueos ni alteraciones de la repolarización. <strong>Recuerde:</strong> Un ECG normal no descarta completamente cardiopatía. Correlacionar siempre con clínica.',
            u: 'low'
        });
    }
    
    // Mostrar resultados
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('results').classList.add('show');
    
    // Banner de urgencia
    let banner = '';
    if (urgency === 'high') {
        banner = '<div class="urgency-high">🚨 URGENCIA ALTA - Requiere atención médica inmediata</div>';
    } else if (urgency === 'moderate') {
        banner = '<div class="urgency-moderate">⚠️ Requiere evaluación y seguimiento médico</div>';
    }
    document.getElementById('urgency_banner').innerHTML = banner;
    
    // Lista de diagnósticos
    let html = '';
    dx.forEach(d => {
        html += `<div class="diagnosis">
            <div class="diagnosis-title">${d.t}</div>
            <div style="font-size:14px;line-height:1.6;color:#495057">${d.d}</div>
        </div>`;
    });
    document.getElementById('diagnosis_list').innerHTML = html;
    
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Reset
function reset() {
    location.reload();
}
