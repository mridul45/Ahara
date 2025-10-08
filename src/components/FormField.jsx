
const FormField = ({ id, label, type = 'text', value, onChange, placeholder, children, rows }) => {
  const isFilled = value && value.length > 0;

  const commonProps = {
    id,
    name: id,
    value,
    onChange,
    className: `w-full bg-transparent border-2 border-dark rounded-lg p-3 pt-6 text-text-primary focus:ring-2 focus:ring-cyan-400 outline-none transition peer`,
    placeholder: ' ', // Required for the label animation to work correctly
  };

  return (
    <div className="relative">
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={rows}></textarea>
      ) : type === 'select' ? (
        <select {...commonProps}>{children}</select>
      ) : (
        <input type={type} {...commonProps} />
      )}
      <label
        htmlFor={id}
        className={`absolute left-3 top-1 transition-all duration-300 text-text-secondary peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-cyan-400 ${isFilled ? 'top-1 -translate-y-0 text-xs' : ''}`}>
        {label}
      </label>
    </div>
  );
};

export default FormField;
