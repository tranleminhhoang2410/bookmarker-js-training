import { SORT } from "../constants"

export const sortArray = (arr, key, order) => {
  const sortedArray = [...arr]

  sortedArray.sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]

    if (aValue === undefined || bValue === undefined || typeof aValue === 'object' || typeof bValue === 'object') {
      return 0;
    }

    const positiveComparison = aValue > bValue ? 1 : 0;
    const comparison = aValue < bValue ? -1 : positiveComparison;

    return order === SORT.STATUS.ASCENDING ? comparison : -comparison;
  })

  return sortedArray
}