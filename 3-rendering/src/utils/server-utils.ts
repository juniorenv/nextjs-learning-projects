import "server-only";

export const serverSideFunction = () => {
  console.log(
    `multiple libraries,
       environment variables,
       interact with a database,
       process confidential information`,
  );
  return "server result";
};
