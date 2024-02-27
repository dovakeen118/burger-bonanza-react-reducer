const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development:
        "postgres://postgres:postgres@localhost:5432/burger-bonanza-react-reducer_development",
      test: "postgres://postgres:postgres@localhost:5432/burger-bonanza-react-reducer_test",
      e2e: "postgres://postgres:postgres@localhost:5432/burger-bonanza-react-reducer_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
