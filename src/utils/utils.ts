import type { Row, Cell, Distance } from "../types/matrix"

export function createMatrix(rows: number, columns: number): Row[] {
  let idCounter = 1

  return Array.from({ length: rows }).map((_, rowIndex) => {
    const cells: Cell[] = Array.from({ length: columns }).map(() => {
      return {
        id: idCounter++,
        amount: Math.floor(Math.random() * 900) + 100,
      }
    })

    return {
      rowId: rowIndex + 1,
      cells,
    }
  })
}

export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max)

export const calcMaxNearestAmount = (rows: number, columns: number) =>
  Math.max(0, rows * columns - 1)

export const totalCells = (matrix: Row[]) =>
  matrix.reduce((sum, row) => sum + row.cells.length, 0)

export const maxSelectable = (matrix: Row[]) =>
  Math.max(0, totalCells(matrix) - 1)

export function collectOtherIds(matrix: Row[], excludeId: number): number[] {
  const ids: number[] = []
  for (const row of matrix)
    for (const cell of row.cells) {
      if (cell.id !== excludeId) ids.push(cell.id)
    }
  return ids
}

export function collectDistances(
  matrix: Row[],
  targetValue: number,
  excludeId: number
): Distance[] {
  const out: Distance[] = []
  for (const row of matrix)
    for (const cell of row.cells) {
      if (cell.id !== excludeId) {
        out.push({ id: cell.id, diff: Math.abs(cell.amount - targetValue) })
      }
    }
  return out
}

export function nearestCellIds(
  matrix: Row[],
  reference: Cell,
  requestedCount: number
): Set<number> {
  const excludeId = reference.id
  const targetValue = reference.amount

  const maxCount = maxSelectable(matrix)
  const count = clamp(requestedCount, 0, maxCount)
  if (count === 0) return new Set()

  if (count === maxCount) {
    return new Set(collectOtherIds(matrix, excludeId))
  }

  const distances = collectDistances(matrix, targetValue, excludeId)
  distances.sort((a, b) => a.diff - b.diff || a.id - b.id)
  return new Set(distances.slice(0, count).map((x) => x.id))
}

export function colPercentile(
  matrix: Row[],
  percentile: number = 60
): number[] {
  if (matrix.length === 0) return []
  const columnCount = matrix[0].cells.length
  if (columnCount === 0) return []

  const results: number[] = new Array(columnCount)
  const p = percentile / 100

  for (let j = 0; j < columnCount; j++) {
    const columnValues = matrix
      .map((row) => row.cells[j].amount)
      .sort((a, b) => a - b)
    const valueCount = columnValues.length

    if (valueCount === 1) {
      results[j] = columnValues[0]
      continue
    }

    const fractionalIndex = (valueCount - 1) * p
    const lowerIndex = Math.floor(fractionalIndex)
    const upperIndex = Math.ceil(fractionalIndex)

    if (lowerIndex === upperIndex) {
      results[j] = columnValues[lowerIndex]
    } else {
      const weight = fractionalIndex - lowerIndex
      results[j] =
        columnValues[lowerIndex] +
        (columnValues[upperIndex] - columnValues[lowerIndex]) * weight
    }
  }

  return results
}

export const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 })
