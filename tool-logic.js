/**
 * Business rules: which questions are visible for the current filters and prior answers.
 * Keeps rendering dumb — UI only asks getVisibleQuestions(state).
 */

export function allFiltersSelected(state) {
  return !!state.filters.assetType &&
    !!state.filters.assetSubtype &&
    !!state.filters.projectPhase;
}

export function getAssetTypeOptions(state) {
  return state.data.filters.assetTypes || [];
}

export function getAssetSubtypeOptionsForSelection(state) {
  if (!state.filters.assetType) return [];
  return state.data.filters.assetSubtypesByAssetType[state.filters.assetType] || [];
}

export function getProjectPhaseOptions(state) {
  return state.data.filters.projectPhases || [];
}

export function getVisibleQuestions(state) {
  if (!state.data || !allFiltersSelected(state)) return [];
  return state.data.questions.filter(function (q) {
    return matchesFilters(state, q) && matchesCondition(state, q);
  });
}

/**
 * Drop answers for questions that are no longer visible (filter/conditional change).
 */
export function clearAnswersForHiddenQuestions(state) {
  var visibleIds = {};
  getVisibleQuestions(state).forEach(function (q) {
    visibleIds[q.id] = true;
  });

  Object.keys(state.answers).forEach(function (id) {
    if (!visibleIds[id]) delete state.answers[id];
  });
}

/**
 * Filter dimensions are ANDed. Empty filter arrays mean “no restriction” on that axis.
 * Use ["ALL"] in data to mean “any value on this axis”.
 */
function matchesFilters(state, question) {
  var filters = question.filters || {};
  return filterMatch(filters.assetType, state.filters.assetType) &&
    filterMatch(filters.assetSubtype, state.filters.assetSubtype) &&
    filterMatch(filters.projectPhase, state.filters.projectPhase);
}

function filterMatch(allowedValues, currentValue) {
  if (!Array.isArray(allowedValues) || !allowedValues.length) return true;
  return allowedValues.indexOf("ALL") >= 0 || allowedValues.indexOf(currentValue) >= 0;
}

/**
 * MVP conditional rules: depends on one prior question; operators equals | in.
 */
function matchesCondition(state, question) {
  if (!question.condition) return true;
  var cond = question.condition;
  var sourceAnswer = state.answers[cond.sourceQuestionId];
  if (!sourceAnswer) return false;

  if (cond.operator === "equals") {
    return cond.values && cond.values[0] === sourceAnswer;
  }
  if (cond.operator === "in") {
    return Array.isArray(cond.values) && cond.values.indexOf(sourceAnswer) >= 0;
  }
  return false;
}
