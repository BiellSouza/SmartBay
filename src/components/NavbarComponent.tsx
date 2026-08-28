import React from "react";
import { Bell, Menu } from "lucide-react";

interface NavbarComponenteProps {
  label: string;
  bell?: boolean;
}

function NavbarComponent({ label, bell = true }: NavbarComponenteProps) {
  return (
    <div>
      {" "}
      <div className="flex justify-between">
        <Menu /> <h1 className="text-lg font-medium">{label}</h1>{" "}
        <Bell className={bell ? "visible" : "invisible"} />
      </div>
    </div>
  );
}

export default NavbarComponent;
