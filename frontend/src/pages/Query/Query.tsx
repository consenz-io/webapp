function getHasura() {
  console.log("click get hasura");
}

function createUser() {
  console.log("create user");
}

const Query = function () {
  return (
    <div>
      <h1>Query</h1>
      <main>
        <button onClick={getHasura}>GET from Hasura</button>
        <button onClick={createUser}>create user</button>
      </main>
    </div>
  );
};

export default Query;
