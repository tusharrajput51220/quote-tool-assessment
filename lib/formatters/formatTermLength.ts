export function formatTermLength(term: string) {
  switch (term) {
    case "MONTHLY":
      return "Monthly";

    case "ANNUAL":
      return "Annual (12 months, 15% discount applies)";

    case "TWO_YEAR":
      return "Two Year (24 months, 25% discount applies)";

    default:
      return term;
  }
}
