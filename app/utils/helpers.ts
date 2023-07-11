export function validateLength(
  field: string,
  length: number,
  response: string
) {
  if (field.length < length) {
    return response;
  }
}
