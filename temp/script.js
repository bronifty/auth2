var req = {
  body: {
    user: "alice",
    scope_foo: "on",
    scope_bar: "on",
    scope_baz: "on",
    reqid: "abc123",
    approve: "true",
  },
};
var scope = Object.keys(req.body)
  .filter((s) => s.startsWith("scope_"))
  .map((s) => s.slice("scope_".length));
console.log("in server /approve logging scope", scope);
