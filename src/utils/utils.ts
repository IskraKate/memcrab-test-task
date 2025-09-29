import type { Row, Cell, Distance } from "../types/matrix"

export function rebuildMatrixState(
  rows: number,
  columns: number,
  prevNearestAmount: number
) {
  if (rows === 0 || columns === 0) {
    return {
      matrix: [] as Row[],
      nextRowId: rows + 1,
      nextCellId: 1,
      nearestAmount: 0,
    }
  }

  const matrix = createMatrix(rows, columns)
  const nextRowId = rows + 1
  const nextCellId = countCells(matrix) + 1
  const maxX = calcMaxNearestAmount(rows, columns)

  return {
    matrix,
    nextRowId,
    nextCellId,
    nearestAmount: clamp(prevNearestAmount, 0, maxX),
  }
}

export function createMatrix(rows: number, columns: number): Row[] {
  let idCounter = 1

  return Array.from({ length: rows }).map((_, rowIndex) => {
    const cells: Cell[] = Array.from({ length: columns }).map(() => {
      return {
        id: idCounter++,
        amount: randomAmount(),
      }
    })

    return {
      rowId: rowIndex + 1,
      cells,
    }
  })
}

export function createRow(
  columns: number,
  rowId: number,
  startCellId: number
): { row: Row; nextCellId: number } {
  let id = startCellId
  const cells: Cell[] = Array.from({ length: columns }, () => ({
    id: id++,
    amount: randomAmount(),
  }))
  return { row: { rowId, cells }, nextCellId: id }
}

export const randomAmount = () => Math.floor(Math.random() * 900) + 100

export const countCells = (matrix: Row[]) =>
  matrix.reduce((sum, row) => sum + row.cells.length, 0)

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

export function applyPercentBg(
  tr: HTMLTableRowElement | null,
  cells: { amount: number }[],
  maxInRow: number,
  enable: boolean,
  className: string
) {
  if (!tr) return

  const tds = Array.from<HTMLTableCellElement>(
    tr.querySelectorAll<HTMLTableCellElement>('td[data-cell="initial-data"]')
  )

  tds.forEach((td, idx) => {
    const amt = cells[idx].amount
    const p = maxInRow > 0 ? (amt / maxInRow) * 100 : 0

    if (enable) {
      td.style.setProperty("--fill", `${Math.round(p)}%`)
      td.classList.add(className)
    } else {
      td.classList.remove(className)
      td.style.removeProperty("--fill")
    }
  })
}
