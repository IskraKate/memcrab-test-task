import { useId } from "react"

type NumberFieldProps = {
  label: string
  value: number
  onChange: (value: number) => void
  id?: string
  helpText?: string
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "id"
>

const NumberField = ({
  label,
  value,
  onChange,
  helpText,
  id,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: NumberFieldProps) => {
  const autoId = useId()
  const inputId = id ?? autoId
  const helpId = helpText ? `${inputId}-help` : undefined

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="number"
        inputMode="numeric"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const v = e.currentTarget.valueAsNumber
          if (!Number.isNaN(v)) onChange(v)
        }}
        aria-describedby={helpId}
        {...props}
      />
      {helpText && <small id={helpId}>{helpText}</small>}
    </div>
  )
}

export default NumberField
