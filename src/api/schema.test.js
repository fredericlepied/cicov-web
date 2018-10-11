import { normalize, denormalize } from "normalizr";
import * as schema from "./schema";

it("products normalize", () => {
  const data = [{id: "2", name: "p2", inherit: {id: "1", name: "p1"}, rfes: [{id: "1", name: 'rfe1'}]}];
  const dataNormalized = {"entities": {"products": {"1": {"id": "1", name: "p1"},
                                                    "2": {"id": "2", name: "p2", inherit: "1",
                                                          rfes: ["1"]}},
                                       "rfes": {"1": {id: "1", name: "rfe1"}}
                                      },
                          "result": ["2"]};
  
  expect(normalize(data, schema.products)).toEqual(dataNormalized);
});
