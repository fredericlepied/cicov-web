import { schema } from "normalizr";

export const testid = new schema.Entity('testids', { idAttribute: 'id' });
export const testids = [testid];

export const rfe = new schema.Entity('rfes', { idAttribute: 'id' });
export const rfes = [rfe];

export const product = new schema.Entity('products', { idAttribute: 'id' });
export const products = [product];

export const job_result = new schema.Entity('job_results', { idAttribute: 'id' });
export const job_results = [job_result];

export const test_result = new schema.Entity('test_results', { idAttribute: 'id' });
export const test_results = [test_result];

export const rfe_result = new schema.Entity('rfe_results', { idAttribute: 'id' });
export const rfe_results = [rfe_result];

product.define({
  inherit: product,
  rfes: rfes,
});

rfe.define({
  product: product,
  testid: testid,
});

job_result.define({
  product: product
});

test_result.define({
  job: job_result
});

rfe_result.define({
  job: job_result,
  rfe: rfe
});
