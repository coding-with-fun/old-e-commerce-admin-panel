import type React from 'react';
import './index.css';

const OtpInput = (props: PropTypes): JSX.Element => {
    const { index, otp, setOtp, handleOtpSubmit } = props;

    const handleChangeInput = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { value } = e.target;

        const tempOtp = [...otp];
        tempOtp[index] = value;
        setOtp([...tempOtp]);

        const nextField = document.getElementById(`${index + 1}`);
        if (
            (nextField === null || tempOtp.join('').length === otp.length) &&
            value !== ''
        ) {
            handleOtpSubmit(tempOtp.join(''));
        } else if (nextField != null && value !== '') {
            nextField.focus();
        }
    };

    return (
        <input
            id={`${index}`}
            autoFocus={index === 0}
            maxLength={1}
            value={otp[index]}
            onChange={handleChangeInput}
            onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                e.preventDefault();
                return false;
            }}
            className="otp-input"
        />
    );
};

export default OtpInput;

interface PropTypes {
    otp: string[];
    setOtp: React.Dispatch<React.SetStateAction<string[]>>;
    index: number;
    handleOtpSubmit: (tempOtp: string) => void;
}
