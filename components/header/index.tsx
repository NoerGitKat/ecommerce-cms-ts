import { FC } from "react";

interface HeaderProps {
  title: string;
  description: string;
}

const Header: FC<HeaderProps> = ({ title, description }): JSX.Element => {
  return (
    <header>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </header>
  );
};

export default Header;
