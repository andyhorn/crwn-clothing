import "./form-input.styles.scss";

const FormInput = ({ label, ...props }) => {
  const labelClassNames = `form-input-label ${
    props.value.length ? "shrink" : ""
  }`.trim();

  return (
    <div className="group">
      <input className="form-input" {...props} />
      {label && <label className={labelClassNames}>{label}</label>}
    </div>
  );
};

export default FormInput;
