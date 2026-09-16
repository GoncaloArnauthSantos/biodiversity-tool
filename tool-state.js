/**
 * Single mutable application state object.
 * Keeps answers and filter selections together.
 */

export function createState() {
  return {
    data: null,
    filters: {
      assetType: "",
      assetSubtype: "",
      projectPhase: ""
    },
    answers: {},
    /** Recommendation cards expanded via “See more” (keyed by question id). */
    expandedRecommendations: {}
  };
}

/** Clears filters, answers, and recommendation expand state. */
export function resetFiltersAndAnswers(state) {
  state.filters.assetType = "";
  state.filters.assetSubtype = "";
  state.filters.projectPhase = "";
  state.answers = {};
  state.expandedRecommendations = {};
}
