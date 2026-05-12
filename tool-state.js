/**
 * Single mutable application state object (mock v2). Keeps answers and filter selections together.
 */

export function createState() {
  return {
    data: null,
    module: "",
    filters: {
      assetType: "",
      assetSubtype: "",
      projectPhase: "",
      countryCode: ""
    },
    answers: {}
  };
}

/** Clears filters and answers — used when switching module tab (phase options change per module). */
export function resetFiltersAndAnswers(state) {
  state.filters.assetType = "";
  state.filters.assetSubtype = "";
  state.filters.projectPhase = "";
  state.filters.countryCode = "";
  state.answers = {};
}
