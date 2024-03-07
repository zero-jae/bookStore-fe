import { styled } from "styled-components";
import { ButtonScheme, ButtonSize } from "../../style/theme";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: 'submit'|'button'|'reset';
}

function Button({children, size, scheme, 
  disabled, isLoading, onClick, type}: Props) {
  return (
    <ButtonStyle size={size} scheme={scheme} disabled={disabled} 
    isLoading={isLoading} onClick={onClick} type={type ? type : "button"}>
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
  font-size: ${({theme, size}) => theme.button[size].fontSize};
  padding: ${({theme, size}) => theme.button[size].padding};
  color: ${({theme, scheme}) => theme.buttonScheme[scheme].color};
  background-color: ${({theme, scheme}) => theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${({theme}) => theme.borderRadius.default};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  pointer-events: ${({disabled}) => (disabled ? "none" : "auto")};
  cursor: ${({disabled}) => (disabled ? "none" : "pointer")};
`;

export default Button;