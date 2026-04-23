import { useMemo } from 'react';
import { archetypes } from '../data/archetypes';
import { badges } from '../data/badges';
import type { Archetype, Badge, Axis, Question } from '../data/types';

export const useResultCalculation = (answers: Record<number, number>, activeQuestions: Question[]) => {
  return useMemo(() => {
    // 1. Calculate Scores
    // We calculate raw scores first, then normalize
    const axisTotals: Record<Axis, { raw: number; max: number }> = {
      paradigm: { raw: 0, max: 0 },
      system: { raw: 0, max: 0 },
      copyright: { raw: 0, max: 0 },
      evolution: { raw: 0, max: 0 }
    };

    activeQuestions.forEach((q) => {
      const answerValue = answers[q.id];
      // answerValue is expected to be between -1.0 (Strongly Disagree) and 1.0 (Strongly Agree)
      // 0.0 is Neutral
      if (answerValue !== undefined) {
        const effect = q.effect.value; // e.g. 10 or -10
        const axis = q.effect.axis;
        
        if (axis && axisTotals[axis as Axis]) {
          // Add to raw score
          axisTotals[axis as Axis].raw += effect * answerValue;
          // Add to max possible score (absolute value)
          axisTotals[axis as Axis].max += Math.abs(effect);
        }
      }
    });

    // Normalize to 0-100
    const scores: Record<Axis, number> = {
      paradigm: 50,
      system: 50,
      copyright: 50,
      evolution: 50
    };

    (Object.keys(scores) as Axis[]).forEach((axis) => {
      const { raw, max } = axisTotals[axis];
      if (max > 0) {
        // Map [-max, max] to [0, 100]
        // Example: max=100. raw=-100 -> 0. raw=0 -> 50. raw=100 -> 100.
        scores[axis] = ((raw + max) / (2 * max)) * 100;
      } else {
        scores[axis] = 50;
      }
    });

    // 2. Find Archetype (Euclidean distance)
    let closestArchetype: Archetype = archetypes[0];
    let minDistance = Infinity;

    archetypes.forEach((archetype) => {
      const dist = Math.sqrt(
        Math.pow(scores.paradigm - archetype.coordinates.paradigm, 2) +
        Math.pow(scores.system - archetype.coordinates.system, 2) +
        Math.pow(scores.copyright - archetype.coordinates.copyright, 2) +
        Math.pow(scores.evolution - archetype.coordinates.evolution, 2)
      );

      if (dist < minDistance) {
        minDistance = dist;
        closestArchetype = archetype;
      }
    });

    // 3. Check Badges
    const earnedBadges: Badge[] = [];
    badges.forEach((badge) => {
      // Find question with this triggerId
      const triggerQuestion = activeQuestions.find(q => q.triggerId === badge.id);
      if (triggerQuestion) {
        const val = answers[triggerQuestion.id];
        // Condition: Strongly Agree (1.0)
        // We use a small epsilon for float comparison just in case, though usually exact match is fine for 1.0
        if (val !== undefined && val >= 0.9) {
          earnedBadges.push(badge);
        }
      }
    });

    return {
      archetype: closestArchetype,
      scores,
      badges: earnedBadges
    };
  }, [answers]);
};
