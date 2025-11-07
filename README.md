# 💓 ECG Pro - Evaluación Sistemática de Electrocardiogramas

## 🎯 Descripción

Aplicación web progresiva (PWA) para evaluación estructurada y sistemática de electrocardiogramas. Diseñada específicamente para estudiantes de medicina de 6to año y médicos en formación en Medicina Interna.

## ✨ Características Principales

### 📊 Evaluación Paso a Paso

La app guía a través de 7 pasos fundamentales:

1. **Ritmo y Frecuencia Cardíaca**
   - Ritmo sinusal, fibrilación auricular, flutter
   - Taquicardia ventricular (URGENTE)
   - Bradicardia sinusal

2. **Eje Eléctrico del QRS**
   - Normal, desviación izquierda/derecha
   - Interpretación según DI y aVF

3. **Segmento ST y Onda T** ⚠️ CRÍTICO
   - **IAMCEST:** Elevación anterior, inferior, lateral, posterior
   - **IAMSEST:** Depresión difusa
   - Con derivaciones específicas para cada localización

4. **Complejo QRS**
   - Bloqueos de rama (BRDHH, BRIHH)
   - Hipertrofias ventriculares (HVI, HVD)
   - Ondas Q patológicas
   - Criterios específicos (Sokolov-Lyon, Cornell)

5. **Alteraciones de Onda T**
   - T invertida (isquemia)
   - T picuda (hiperpotasemia ⚠️)
   - Interpretación clínica

6. **Intervalo QT**
   - Calculadora de QTc (fórmula de Bazett)
   - Interpretación automática
   - Riesgo de Torsades de Pointes

7. **Hallazgos Adicionales**
   - WPW (preexcitación)
   - Patrón S1Q3T3 (TEP)
   - Síndrome de Brugada

### 🚨 Sistema de Diagnóstico Inteligente

- **Genera diagnósticos diferenciales** basados en hallazgos
- **Estratificación por urgencia:** Alta, Moderada, Baja
- **Recomendaciones clínicas específicas** para cada diagnóstico
- **Incluye más de 20 diagnósticos principales:**
  - IAMCEST (todas las localizaciones)
  - IAMSEST
  - Arritmias (FA, flutter, TV)
  - Bloqueos de rama
  - Hipertrofias ventriculares
  - Alteraciones electrolíticas
  - Síndromes específicos (WPW, Brugada, TEP)

### 🔍 Guías de Derivaciones

Para cada diagnóstico crítico, incluye:
- **Derivaciones específicas a evaluar**
- **Cambios recíprocos esperados**
- **Tips clínicos prácticos**

Ejemplo para IAM inferior:
```
🔍 Derivaciones afectadas: DII, III, aVF
Cambios recíprocos: V1-V3
Tip: Si III>II → Coronaria derecha
      Evaluar V3R-V4R para IAM de VD
```

## 🚀 Características Técnicas

### PWA (Progressive Web App)
✅ **Funciona offline** después de la primera carga
✅ **Instalable** en móvil como app nativa
✅ **Rápida** - Sin necesidad de internet
✅ **Actualizable** automáticamente

### Diseño Responsivo
- Optimizado para móviles (uso en guardia)
- También funciona en tablet y desktop
- Interfaz moderna e intuitiva

## 📱 Cómo Usar

### Instalación

1. **En el móvil:**
   - Abre `ecg-app.html` en Chrome/Safari
   - Toca el menú (⋮) → "Agregar a pantalla de inicio"
   - ¡Listo! Ahora funciona como app

2. **En desktop:**
   - Abre en Chrome
   - Click en el ícono de instalación en la barra de direcciones
   - O simplemente usa desde el navegador

### Uso Básico

1. **Completa cada paso** observando el ECG del paciente
2. **Selecciona los hallazgos** que observas
3. **Para localizaciones de IAM:** Fíjate en las derivaciones indicadas
4. **Al final:** Click en "Ver Diagnóstico"
5. **Obtendrás:**
   - Diagnósticos principales
   - Nivel de urgencia
   - Recomendaciones de manejo

## 🎯 Para Qué Sirve

### En la Práctica Clínica
- **Urgencias:** Diagnóstico rápido de IAMCEST
- **Piso:** Evaluación sistemática de ECGs rutinarios
- **Guardia:** Identificación de urgencias cardiovasculares
- **Consulta:** Interpretación estructurada

### Como Herramienta Educativa
- **Aprender** interpretación sistemática
- **Repasar** criterios diagnósticos
- **Practicar** con ECGs reales
- **No olvidar** ningún paso importante

## ⚠️ Advertencias Importantes

### ⚡ NO Sustituye el Criterio Clínico
- Esta es una **herramienta de apoyo**
- El **contexto clínico es fundamental**
- Siempre **correlacionar con síntomas**
- En urgencias: **Activar protocolos institucionales**

### 🚨 Urgencias Cardiovasculares
Si identificas:
- **IAMCEST** → Código infarto inmediato
- **TV sostenida** → Evaluar estabilidad, cardioversión
- **Patrón de Brugada** → Referencia a electrofisiología
- **TEP** → Anticoagulación, considerar trombolisis

**NUNCA retrasar atención por usar la app**

## 📚 Fundamentos Clínicos

### Criterios Incluidos

**Hipertrofia VI:**
- Sokolov-Lyon: S(V1) + R(V5/V6) ≥35mm
- Cornell: R(aVL) >11mm♀ o >12mm♂

**Criterios de Sgarbossa (IAM con BRIHH):**
- Elevación ST concordante ≥1mm = 5 pts
- Depresión ST V1-V3 ≥1mm = 3 pts
- Elevación ST discordante ≥5mm = 2 pts
- ≥3 pts sugiere IAM

**QTc (Bazett):**
- QTc = QT / √RR
- Normal: <440ms (♂), <460ms (♀)
- Prolongado: Riesgo de Torsades

## 🔄 Actualizaciones

**Versión actual: 1.0**

Próximas características planeadas:
- Más arritmias (BAV 2° y 3°)
- Patrones específicos (pericarditis, miocarditis)
- Modo "examen" para practicar
- Galería de ECGs de ejemplo

## 📞 Soporte

Esta app fue desarrollada específicamente para tu rotación de Medicina Interna. 

**Conforme avances en tu práctica**, podremos:
- Agregar diagnósticos específicos que veas
- Ajustar criterios según protocolos locales
- Incluir casos complejos que encuentres

## 🎓 Para Recordar

### Método RIPA (Ritmo-Eje-Intervalo-Patrón-Alteraciones)
Esta app te guía sistemáticamente para que **nunca olvides ningún paso**.

### Lo Más Importante
1. **Identificar IAMCEST** (minutos cuentan)
2. **Reconocer TV** (puede ser mortal)
3. **No pasar por alto** hiperpotasemia severa
4. **Correlacionar siempre** con clínica

## 🏥 Uso en Guardia

**Flujo recomendado:**
1. Paciente con dolor torácico → ECG inmediato
2. Mientras evalúas → Usa la app en paralelo
3. ¿IAMCEST? → Código infarto (no esperes la app)
4. ¿Dudas? → La app te ayuda con diagnóstico diferencial

## 💡 Tips Clínicos

### IAM
- **Elevación ST ≥1mm** en 2 derivaciones contiguas = IAMCEST
- **IAM inferior:** SIEMPRE buscar compromiso de VD (V3R-V4R)
- **IAM con BRIHH:** Usar Sgarbossa

### Arritmias
- **FA de novo:** Buscar hipertiroidismo, isquemia
- **TV monomórfica estable:** Amiodarona
- **TV polimórfica (Torsades):** Mg²⁺ IV, cardioversión

### Electrolitos
- **K⁺ >7:** Gluconato Ca²⁺ primero (cardioprotección)
- **T picuda + QRS ancho:** URGENCIA extrema

---

## ✅ Checklist Pre-Guardia

Antes de tu guardia, asegúrate de:
- [ ] App instalada en el móvil
- [ ] Funciona offline
- [ ] Repasaste criterios de IAMCEST
- [ ] Sabes activar código infarto en tu hospital

---

**¡Mucho éxito en tu rotación de Medicina Interna!** 🩺

Esta herramienta está diseñada para ayudarte a sistematizar la interpretación de ECGs y no olvidar hallazgos importantes. Úsala como apoyo, pero **confía en tu criterio clínico** y en la enseñanza de tus adjuntos.

*Desarrollado para estudiantes de medicina en práctica preprofesional*
