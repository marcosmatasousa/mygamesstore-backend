export const getGamesQueryParams = {
  page: {
    in: ["query"],
    isInt: {
      options: {
        min: 1,
        errorMessage: "Page parameter must be at least 1.",
      },
    },
    notEmpty: {
      errorMessage: "Page parameter must not be empty.",
    },
    optional: true,
  },
  count: {
    in: ["query"],
    isInt: {
      options: {
        min: 1,
        errorMessage: "Count parameter must be at least 1. ",
      },
    },
    notEmpty: {
      errorMessage: "Count parameter must not be empty.",
    },
    optional: true,
  },
};
