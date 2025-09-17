declare module '@t-one-internal/design-system' {
  import { ReactNode } from 'react';

  export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }

  export interface CardProps {
    children: ReactNode;
    className?: string;
  }

  export interface TypographyProps {
    children: ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
    component?: keyof JSX.IntrinsicElements;
    className?: string;
  }

  export interface ContainerProps {
    children: ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
  }

  export const Button: React.FC<ButtonProps>;
  export const Card: React.FC<CardProps>;
  export const Typography: React.FC<TypographyProps>;
  export const Container: React.FC<ContainerProps>;
}

