// use AsyncLocalStorage
const globalAsyncContext = new AsyncLocalStorage<GlobalAppContext>();

// store your global context
export const storeGlobalContextMiddleware: unstable_MiddlewareFunction = (
  { request, context },
  next
) => {
  const ctx = {
    request,
    yourVar: "here",
  };
  return new Promise((resolve) => {
    globalAsyncContext.run(ctx, () => {
      resolve(next());
    });
  });
};

// get function that allows you to grab the context from anywhere
export function getGlobalContext() {
  const context = globalAsyncContext.getStore();
  if (!context) {
    throw new Error("Global context is not available");
  }
  return context;
}

// use it anywhere in your server functions
export const functionThatRunsInALoader = () => {
  const { request } = getGlobalContext();
};

// in a route file
export const loader = () => {
  return functionThatRunsInALoader();
};
