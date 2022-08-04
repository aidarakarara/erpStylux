import { Icon } from "@iconify/react";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import dashbordIcon from "../../components/dashbordIcon.svg";
import bouteille from "../../components/engine-oil.svg";
import access from "../../components/acc.svg";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/pompistes/app",
    icon: <img src={dashbordIcon} alt="" srcSet="" />,
  },
  {
    title: "Caisses",
    path: "/pompistes/caisses",
    icon: getIcon(fileTextFill),
  },
/*  {
    title: "Lubrifiants",
    path: "/pompistes/ListeLub",
    icon: <img src={bouteille} alt="" srcset="" />,
  },
  {
    title: "Accessoires",
    path: "/pompistes/ListeAcc",
    icon: <img src={access} alt="" srcset="" />,
  },*/
];

export default sidebarConfig;
