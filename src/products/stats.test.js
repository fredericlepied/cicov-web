import * as stats from "./stats";

it("get stats", () => {
  const product = {
    id: 6,
    rfes: [
      {
        product_id: 4,
        result: {
          tested: true,
          result: true,
          percent: 100
        }
      },
      {
        product_id: 4,
        result: {
          tested: false,
          result: false,
          percent: 0
        }
      },
      {
        product_id: 4,
        result: {
          tested: true,
          result: false,
          percent: 50
        }
      },
      {
        product_id: 6,
        result: {
          tested: true,
          result: true,
          percent: 100
        }
      },
      {
        product_id: 6,
        result: {
          tested: false,
          result: false,
          percent: 0
        }
      },
      {
        product_id: 4,
        result: {
          tested: true,
          result: false,
          percent: 50
        }
      }
    ]
  };
  const expectedData = {
    regressions_not_tested: 1,
    regressions_in_success: 1,
    failed_regressions: 2,
    features_not_tested: 1,
    features_in_success: 1,
    failed_features: 0
  };
  expect(stats.getStats(product)).toEqual(expectedData);
});
