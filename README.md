# MedLens AI – Intelligent Medical Report Management
**TENSORA 2026 | Healthcare Track | Problem ID: HLT-03**

> *"Your medical records, organized intelligently."*  
> *"Turn scattered medical reports into one intelligent health timeline."*

---

## 🌟 Overview & Problem Statement

Patients collect medical documents from diverse hospitals, pathology laboratories, outpatient clinics, and imaging centers across multiple years. Older reports are lost in paper folders, phone gallery screenshots, or fragmented patient portals. Comparing past results (e.g., hemoglobin or thyroid levels) requires tedious manual effort.

**MedLens AI** transforms unstructured, scattered medical reports (scanned PDFs, photos, clinic notes) into a structured, searchable personal health record companion with:
1. **Multi-Modal Document OCR** with adaptive enhancement & deskewing
2. **Medical Named Entity Recognition (NER)** for biomarkers, dosages, pharmaceuticals, ICD diagnoses, physicians, and facilities
3. **Lab Value Normalization & LOINC Mapping** with source reference ranges and status indicators
4. **Smart Longitudinal Health Timeline** anchoring clinical episodes chronologically
5. **Conversational Semantic Search** powered by NLP intent breakdown
6. **Zero-Knowledge Privacy Vault** with client audit logging

---

## 🚀 Live Demo Quick Flow (2–3 Minutes for Judges)

1. **Landing Page (`/`)**: Overview of the HLT-03 solution, clinical feature cards, interactive 6-stage AI pipeline, and privacy architecture. Click **"Explore Demo"**.
2. **Patient Dashboard (`/dashboard`)**:
   - Pre-populated with realistic fictional patient **Alex Morgan** (34 y.o., MRN: `ML-2026-8942`).
   - Interactive **Recharts** biomarker trends (Hemoglobin rising from `11.2` g/dL in Jan 2026 to `13.4` g/dL in Sep 2026, Blood Glucose, Blood Pressure).
   - Summary cards: 12 reports, 16 lab biomarkers, 5 active medications, 5 diagnoses.
   - Recent Reports table with clinical metadata and status indicators.
3. **Report Upload & AI Processing (`/upload` → `/processing`)**:
   - Drag & drop local medical files (PDF / PNG / JPG) or click **"Sample 1: Complete Blood Count (CBC)"** for 1-click test flow.
   - Watch the animated 6-stage AI pipeline (Document Ingestion → Image Enhancement → Clinical OCR → Medical NER → LOINC Normalization → Timeline Builder).
4. **Split-Screen OCR Results & Verification (`/ocr-results`)**:
   - Left side: High-fidelity simulated document with visual neural bounding box highlights.
   - Right side: Extracted entity category chips (Biomarkers, Medications, Dosages, Diagnoses, Providers, Facilities).
   - Editable inline values before committing to the timeline. Click **"Verify & Save to Timeline"**.
5. **Smart Health Timeline (`/timeline`)**:
   - Chronological vertical timeline with category filters (Lab Tests, Prescriptions, Diagnoses, Consultations, Radiology).
   - Correlated metrics and direct links to source hospital files.
6. **Lab Value Normalization Tracker (`/labs`)**:
   - LOINC-standardized test table with numeric values, reference ranges, status badges (Normal, Attention, Abnormal), and category tabs.
7. **Semantic Search (`/search`)**:
   - Ask natural language questions:
     - *"Find all reports where my hemoglobin was low"*
     - *"Show my blood tests from August"*
     - *"When was my last thyroid test?"*
     - *"Which medications were prescribed in 2026?"*
   - Displays query intent breakdown, extracted concepts, relevance score, AI explanation, and highlighted matched entity chips.
8. **AI Architecture & Judge Guide (`/architecture`)**:
   - Complete technical pipeline walkthrough, innovation pillars, and hackathon presentation guide.
9. **Privacy Center (`/privacy`) & Settings (`/settings`)**:
   - Zero-knowledge storage architecture, client audit ledger, and 1-click demo data reset button.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Medical Teal / Deep Navy SaaS theme
- **Routing**: React Router 7 (SPA architecture)
- **Charts**: Recharts (Longitudinal AreaChart, LineChart with reference thresholds)
- **Icons**: Lucide React
- **State Management**: React Context (`HealthRecordContext`) with session persistence & toast notifications

---

## 💻 Local Development

```bash
# Navigate to the project directory
cd medlens-ai

# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

Local server runs on: `http://127.0.0.1:5173/`

---

## ⚖️ Disclaimer

*MedLens AI is a research and engineering prototype built for **TENSORA 2026 (Problem ID: HLT-03)**. All patient data (Alex Morgan) is completely synthetic. Extracted clinical information is for personal organization and reference only and does not constitute medical advice or diagnosis.*
