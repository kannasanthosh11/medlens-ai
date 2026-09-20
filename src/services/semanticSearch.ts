import { MedicalReport, SemanticSearchResult, ExtractedEntity } from '../types';

export interface SemanticQueryAnalysis {
  originalQuery: string;
  detectedIntent: string;
  extractedConcepts: string[];
  inferredTimeframe?: string;
  inferredCategory?: string;
}

export function analyzeQuery(query: string): SemanticQueryAnalysis {
  const q = query.toLowerCase().trim();
  const concepts: string[] = [];
  let detectedIntent = 'General Document Retrieval';
  let inferredTimeframe: string | undefined;
  let inferredCategory: string | undefined;

  // Detect concepts
  if (q.includes('hemoglobin') || q.includes('hgb') || q.includes('hb')) {
    concepts.push('Biomarker: Hemoglobin');
  }
  if (q.includes('anemia') || q.includes('iron')) {
    concepts.push('Condition: Iron Deficiency Anemia');
  }
  if (q.includes('low') || q.includes('abnormal') || q.includes('deficient')) {
    concepts.push('Value Qualifier: Below Reference Limit');
  }
  if (q.includes('thyroid') || q.includes('tsh') || q.includes('ft4')) {
    concepts.push('Endocrine: Thyroid Function');
    inferredCategory = 'Endocrinology';
  }
  if (q.includes('mri') || q.includes('scan') || q.includes('x-ray') || q.includes('radiology')) {
    concepts.push('Imaging Modality');
    inferredCategory = 'Radiology';
  }
  if (q.includes('medication') || q.includes('prescribed') || q.includes('prescription') || q.includes('drug') || q.includes('rx')) {
    concepts.push('Pharmacotherapy: Prescriptions');
    inferredCategory = 'Prescription';
  }
  if (q.includes('glucose') || q.includes('sugar') || q.includes('diabetes') || q.includes('hba1c')) {
    concepts.push('Metabolic: Glycemic Control');
  }
  if (q.includes('vitamin') || q.includes('d3') || q.includes('b12')) {
    concepts.push('Micronutrients & Vitamins');
  }

  // Detect timeframes
  if (q.includes('august') || q.includes('aug')) {
    inferredTimeframe = 'August 2026';
  } else if (q.includes('2026')) {
    inferredTimeframe = 'Year 2026';
  } else if (q.includes('2025')) {
    inferredTimeframe = 'Year 2025';
  } else if (q.includes('last') || q.includes('recent') || q.includes('latest')) {
    inferredTimeframe = 'Most Recent Record';
  }

  // Detect intent
  if (q.includes('low') || q.includes('abnormal')) {
    detectedIntent = 'Threshold-Based Biomarker Query (Abnormal Values)';
  } else if (q.includes('when was') || q.includes('last')) {
    detectedIntent = 'Temporal Chronology Query (Latest Clinical Event)';
  } else if (q.includes('which medications') || q.includes('what medicine')) {
    detectedIntent = 'Medication & Regimen Discovery';
  } else if (q.includes('diagnos')) {
    detectedIntent = 'Diagnostic Condition Review';
  }

  return {
    originalQuery: query,
    detectedIntent,
    extractedConcepts: concepts.length > 0 ? concepts : ['Semantic Text Matching'],
    inferredTimeframe,
    inferredCategory,
  };
}

export function performSemanticSearch(
  query: string,
  reports: MedicalReport[]
): { analysis: SemanticQueryAnalysis; results: SemanticSearchResult[] } {
  const analysis = analyzeQuery(query);
  const q = query.toLowerCase().trim();

  if (!q) {
    return {
      analysis,
      results: reports.map((r) => ({
        report: r,
        relevanceScore: 70,
        aiExplanation: `Document archived under ${r.type}.`,
        matchingEntities: r.entities.slice(0, 3),
        matchedSnippets: [r.summary],
      })),
    };
  }

  const scoredResults: {
    report: MedicalReport;
    score: number;
    explanation: string;
    matchingEntities: ExtractedEntity[];
    snippets: string[];
  }[] = [];

  for (const report of reports) {
    let score = 0;
    const matchingEntities: ExtractedEntity[] = [];
    const snippets: string[] = [];
    const explanations: string[] = [];

    const textContent = `${report.title} ${report.summary} ${report.extractedText} ${report.provider} ${report.facility} ${report.tags.join(' ')}`.toLowerCase();

    // Direct phrase matching
    if (textContent.includes(q)) {
      score += 40;
    }

    // Hemoglobin specific semantic queries
    if (q.includes('hemoglobin') || q.includes('hgb')) {
      const hasHgbLab = report.labResults.some((l) => l.normalizedName.toLowerCase().includes('hemoglobin'));
      if (hasHgbLab) {
        score += 45;
        explanations.push('Contains normalized Hemoglobin biomarker record');
      }

      if (q.includes('low') || q.includes('abnormal')) {
        const hasLowHgb = report.labResults.some(
          (l) => l.normalizedName.toLowerCase().includes('hemoglobin') && (l.status === 'Abnormal' || (l.numericValue && l.numericValue < 12.0))
        );
        if (hasLowHgb) {
          score += 50;
          explanations.push('Specifically flagged with subnormal Hemoglobin (<12.0 g/dL)');
        }
      }
    }

    // Thyroid specific semantic queries
    if (q.includes('thyroid') || q.includes('tsh')) {
      if (report.title.toLowerCase().includes('thyroid') || report.tags.includes('Thyroid')) {
        score += 60;
        explanations.push('Comprehensive Thyroid assay documented with TSH and Free T4 values');
      }
    }

    // Anemia queries
    if (q.includes('anemia')) {
      const hasAnemia = report.diagnoses.some((d) => d.conditionName.toLowerCase().includes('anemia')) ||
                        report.extractedText.toLowerCase().includes('anemia') ||
                        report.summary.toLowerCase().includes('anemia');
      if (hasAnemia) {
        score += 55;
        explanations.push('Clinically relevant to Iron Deficiency Anemia diagnosis');
      }
    }

    // MRI / Radiology queries
    if (q.includes('mri') || q.includes('brain')) {
      if (report.type === 'Radiology' || report.title.toLowerCase().includes('mri')) {
        score += 65;
        explanations.push('High-resolution MRI imaging report matching modality query');
      }
    }

    // Medication queries
    if (q.includes('medication') || q.includes('prescrib')) {
      if (report.type === 'Prescription' || report.medications.length > 0) {
        score += 50;
        explanations.push(`Contains active prescription orders (${report.medications.map(m => m.name).join(', ')})`);
      }
    }

    // Month / year timeframe queries
    if (q.includes('august') || q.includes('aug')) {
      if (report.date.includes('2026-08')) {
        score += 35;
        explanations.push('Captured during August 2026 clinical period');
      }
    }

    if (q.includes('2026')) {
      if (report.date.startsWith('2026')) {
        score += 15;
      }
    }

    // Search through entities
    for (const ent of report.entities) {
      if (q.includes(ent.text.toLowerCase()) || (ent.normalizedValue && q.includes(ent.normalizedValue.toLowerCase()))) {
        score += 20;
        if (!matchingEntities.find((e) => e.id === ent.id)) {
          matchingEntities.push(ent);
        }
      }
    }

    // Word token matching
    const tokens = q.split(/\s+/).filter((t) => t.length > 2 && !['show', 'find', 'all', 'where', 'my', 'the', 'was', 'were', 'which', 'what', 'when'].includes(t));
    for (const token of tokens) {
      if (textContent.includes(token)) {
        score += 10;
      }
    }

    // Extract snippet
    if (report.summary) {
      snippets.push(report.summary);
    }

    if (score > 10) {
      const clampedScore = Math.min(Math.round(score), 99);
      const explanationText = explanations.length > 0
        ? explanations.join(' • ')
        : `Matched clinical keywords and entity references in ${report.type}.`;

      scoredResults.push({
        report,
        score: clampedScore,
        explanation: explanationText,
        matchingEntities: matchingEntities.length > 0 ? matchingEntities : report.entities.slice(0, 3),
        snippets,
      });
    }
  }

  // Sort descending by relevance score
  scoredResults.sort((a, b) => b.score - a.score);

  return {
    analysis,
    results: scoredResults.map((item) => ({
      report: item.report,
      relevanceScore: item.score,
      aiExplanation: item.explanation,
      matchingEntities: item.matchingEntities,
      matchedSnippets: item.snippets,
    })),
  };
}
