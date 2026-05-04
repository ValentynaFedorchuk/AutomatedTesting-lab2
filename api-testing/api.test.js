import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

describe("GET /posts", () => {
  let response;

  beforeEach(async () => {
    response = await axios.get(`${BASE_URL}/posts`);
  });

  test("status is 200", () => {
    expect(response.status).toBe(200);
  });

  test("response is array", () => {
    expect(Array.isArray(response.data)).toBe(true);
  });

  test("array is not empty", () => {
    expect(response.data.length).toBeGreaterThan(0);
  });

  test("each item has id", () => {
    expect(response.data[0]).toHaveProperty("id");
  });

  test("each item has title", () => {
    expect(response.data[0]).toHaveProperty("title");
  });
});

describe("GET /posts/1", () => {
  let response;

  beforeEach(async () => {
    response = await axios.get(`${BASE_URL}/posts/5`);
  });

  test("status is 200", () => {
    expect(response.status).toBe(200);
  });

  test("returns object", () => {
    expect(typeof response.data).toBe("object");
  });

  test("id is 1", () => {
    expect(response.data.id).toBe(1);
  });

  test("has title", () => {
    expect(response.data).toHaveProperty("title");
  });

  test("has body", () => {
    expect(response.data).toHaveProperty("body");
  });
});

describe("POST /posts", () => {
  let response;

  beforeEach(async () => {
    response = await axios.post(`${BASE_URL}/posts`, {
      title: "test",
      body: "test body",
      userId: 1,
    });
  });

  test("status is 201", () => {
    expect(response.status).toBe(201);
  });

  test("has id", () => {
    expect(response.data).toHaveProperty("id");
  });

  test("title matches", () => {
    expect(response.data.title).toBe("test");
  });

  test("body matches", () => {
    expect(response.data.body).toBe("test body");
  });

  test("userId matches", () => {
    expect(response.data.userId).toBe(1);
  });
});

describe("PUT /posts/1", () => {
  let response;

  beforeEach(async () => {
    response = await axios.put(`${BASE_URL}/posts/1`, {
      id: 1,
      title: "updated",
      body: "updated body",
      userId: 1,
    });
  });

  test("status is 200", () => {
    expect(response.status).toBe(200);
  });

  test("title updated", () => {
    expect(response.data.title).toBe("updated");
  });

  test("body updated", () => {
    expect(response.data.body).toBe("updated body");
  });

  test("id is 1", () => {
    expect(response.data.id).toBe(1);
  });

  test("userId is 1", () => {
    expect(response.data.userId).toBe(1);
  });
});

describe("DELETE /posts/1", () => {
  let response;

  beforeEach(async () => {
    response = await axios.delete(`${BASE_URL}/posts/1`);
  });

  test("status is 200", () => {
    expect(response.status).toBe(200);
  });

  test("response is empty object", () => {
    expect(response.data).toEqual({});
  });

  test("no id in response", () => {
    expect(response.data.id).toBeUndefined();
  });

  test("has headers", () => {
    expect(response.headers).toBeDefined();
  });

  test("status text is OK", () => {
    expect(response.statusText).toBe("OK");
  });
});
