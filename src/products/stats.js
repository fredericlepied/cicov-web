function count(result, stats, key) {
  const tested = result.tested;
  const not_tested = !tested;
  const successful = result.result;
  return {
    ...stats,
    [`${key}_not_tested`]: not_tested
      ? stats[`${key}_not_tested`] + 1
      : stats[`${key}_not_tested`],
    [`${key}_in_success`]:
      tested && successful
        ? stats[`${key}_in_success`] + 1
        : stats[`${key}_in_success`],
    [`failed_${key}`]:
      tested && !successful
        ? stats[`failed_${key}`] + 1
        : stats[`failed_${key}`]
  };
}
export function getStats(product) {
  return product.rfes.reduce(
    (acc, rfe) => {
      if (rfe.product_id === product.id) {
        acc = count(rfe.result, acc, "features");
      } else {
        acc = count(rfe.result, acc, "regressions");
      }
      return acc;
    },
    {
      regressions_not_tested: 0,
      regressions_in_success: 0,
      failed_regressions: 0,
      features_not_tested: 0,
      features_in_success: 0,
      failed_features: 0
    }
  );
}
