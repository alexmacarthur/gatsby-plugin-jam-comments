module.exports = () => {
  const base =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://service.jamcomments.com"

  return `${base}/graphql`
}
