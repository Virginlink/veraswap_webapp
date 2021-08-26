import { Tooltip } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";

const FormInput = ({
	label,
	name,
	type = "text",
	placeholder,
	value,
	onChange,
	error,
	multiline = false,
	tooltipText,
	maxLength,
}) => {
	return (
		<>
			<div className="input-box">
				<p className="application-desc remove-opacity">{label}</p>
				<div className="coming-soon-input-container input-div">
					{tooltipText && (
						<Tooltip placement="left" title={tooltipText}>
							<AiOutlineInfoCircle className="tooltip-icon" size={20} />
						</Tooltip>
					)}
					{multiline ? (
						<div>
							<textarea
								required
								rows="5"
								name={name}
								placeholder={placeholder}
								className="project-desc-input"
								type={type}
								value={value}
								onChange={onChange}
							/>
							<p className="error-message">{error}</p>
						</div>
					) : (
						<div>
							<input
								required
								type={type}
								name={name}
								maxLength={maxLength}
								placeholder={placeholder}
								value={value}
								onChange={onChange}
								data-with-suffix={tooltipText}
							/>
							<p className="error-message">{error}</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default FormInput;
