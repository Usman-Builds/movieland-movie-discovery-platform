export function filterByRequiredFields<T extends Record<string, any>>(
  items: T[],
  requiredFields: (keyof T)[],
  numericFieldMinValues?: Record<keyof T, number>
): T[] {
  return items.filter((item) => {
    // 1️⃣ Check required fields exist
    const hasRequiredFields = requiredFields.every(
      (field) =>
        item[field] !== null && item[field] !== undefined && item[field] !== ""
    );

    // 2️⃣ Check numeric minimum values if provided
    const meetsNumericRequirements = numericFieldMinValues
      ? Object.entries(numericFieldMinValues).every(
          ([field, min]) => (item[field as keyof T] ?? 0) > min
        )
      : true;

    return hasRequiredFields && meetsNumericRequirements;
  });
}
