export default function Checkbox({checked, onChange, className}: { checked: boolean, onChange: () => void, className?: string }) {
    return (
        <input
            type="checkbox"
            className={`form-checkbox h-6 w-6 text-cyan-600 m-1 self-center ${className}`}
            checked={checked}
            onChange={onChange}
        />
    )
}
