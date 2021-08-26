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
					) : (
						<input
							required
							type={type}
							name={name}
							placeholder={placeholder}
							value={value}
							onChange={onChange}
							data-with-suffix={tooltipText}
						/>
					)}
				</div>
			</div>
			<p className="error-message">{error}</p>
		</>
	);
};

export default FormInput;
