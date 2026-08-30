import { Bell, Menu } from "lucide-react";

interface NavbarComponenteProps {
  label: string;
  bell?: boolean;
}

function NavbarComponent({ label, bell = false }: NavbarComponenteProps) {
  return (
    <div className="">
      {" "}
      <div className="flex justify-between items-center">
        <Menu className="opacity-0" />{" "}
        <h1 className="text-lg font-medium border-b border-gray-300">
          {label}
        </h1>{" "}
        <Bell className={bell ? "visible" : "invisible"} />
      </div>
    </div>
  );
}

export default NavbarComponent;
