import { Icon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import dashbordIcon from "../../components/dashbordIcon.svg";
//Activités
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/gerants/app",
    icon: <img src={dashbordIcon} alt="" srcSet="" />,
  },
  {
    title: "Utilisateurs",
    path: "/gerants/employers",
    icon: getIcon(peopleFill),
  },
  {
    title: "Pompistes",
    path: "/gerants/pompistes",
    icon: getIcon(peopleFill),
  },
  {
    title: "Gestion clients",
    path: "/gerants/clients",
    icon: getIcon(fileTextFill),
  },
  {
    title: "Tableau dépenses",
    path: "/gerants/TabDepenses",
    icon: getIcon(fileTextFill),
  },
  {
    title: "Inventaires",
    path: "/gerants/Tableau",
    icon: getIcon(fileTextFill),
  },
  /* {
    title: "Rapports",
    path: "/gerants/rapports",
    icon: getIcon(fileTextFill),
  }, */
];

export default sidebarConfig;
