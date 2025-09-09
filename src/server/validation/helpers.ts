import { z } from 'zod';

export function getFieldErrors(zodError: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {}

  zodError.issues.forEach((issue) => {
    if (issue.path.length === 1) {
      const fieldName = issue.path[0] as string
      if (!fieldErrors[fieldName]) {
        fieldErrors[fieldName] = issue.message
      }
    }
    else if (issue.path.length > 1) {
      const fieldPath = issue.path.join('.')
      if (!fieldErrors[fieldPath]) {
        fieldErrors[fieldPath] = issue.message
      }
    }
  })

  return fieldErrors
}